/**
 * Prerender the built SPA into one static HTML file per route.
 *
 * Why this exists: nurea.no shipped as a client-rendered SPA, so anything that
 * does not execute JavaScript saw a 37-character document. That is every
 * crawler without a renderer, every link unfurler, and the machine readers that
 * increasingly sit between a business and the people looking for it.
 *
 * How it works: serve `dist/`, open each route in headless Chrome, and write
 * the resulting DOM back into `dist/<route>/index.html`. Vercel serves a
 * matching file from the filesystem before it applies the SPA rewrite, so each
 * route answers with its own fully written page. React still boots from the
 * same module script and takes over, so the live experience is unchanged.
 *
 * Reduced motion is forced during capture. Every reveal in this codebase is
 * gated on `prefers-reduced-motion`, so forcing it means the snapshot catches
 * the page at rest with all of its content visible, never mid-animation at
 * opacity 0. That is also why the snapshot is honest: it is the same content a
 * visitor who asks for no motion actually gets.
 *
 * Chrome comes from Puppeteer, which downloads its own build at install time.
 * That is the only reason Puppeteer is a dependency: the deploy container has
 * no browser of its own, and a prerender that only runs on one laptop is not a
 * prerender.
 */

import { createServer } from "node:http";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { extname, join, resolve } from "node:path";
import puppeteer from "puppeteer";

const DIST = resolve(import.meta.dirname, "..", "dist");
const PORT = Number(process.env.PRERENDER_PORT || 5310);
const CONCURRENCY = 4;
/** A route with less readable text than this almost certainly failed to render. */
const MIN_TEXT_CHARS = 600;

const SERVICE_SLUGS = ["merkevare", "nettsider", "innhold", "systemer", "reklamer"];
const SERVICE_SLUGS_EN = ["brand", "websites", "content", "systems", "advertising"];

/** /skjema is disallowed in robots.txt, so it is deliberately not prerendered. */
const ROUTES = [
  "/",
  "/tjenester",
  ...SERVICE_SLUGS.map((s) => `/tjenester/${s}`),
  "/arbeider",
  "/demoer",
  "/metoden",
  "/klarhetssjekk",
  "/priser",
  "/om-oss",
  "/kontakt",
  "/personvern",
  "/innsikt",
  // Create is one English page; its future domain replaces this route through VITE_CREATE_URL.
  "/create",
  "/en",
  "/en/services",
  ...SERVICE_SLUGS_EN.map((s) => `/en/services/${s}`),
  "/en/work",
  "/en/method",
  "/en/clarity-check",
  "/en/pricing",
  "/en/about",
  "/en/contact",
  "/en/insights",
  // Published articles (src/data/studioSite.ts ARTICLES with published: true)
  // are added here as /innsikt/<slug> and /en/insights/<slug> when they exist.
];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

function serveDist() {
  const server = createServer(async (req, res) => {
    const url = decodeURIComponent((req.url || "/").split("?")[0]);
    const direct = join(DIST, url);
    const target = existsSync(direct) && extname(url) ? direct : join(DIST, "index.html");
    try {
      const body = await readFile(target);
      res.writeHead(200, { "Content-Type": MIME[extname(target)] || "application/octet-stream" });
      res.end(body);
    } catch {
      res.writeHead(404).end("not found");
    }
  });
  return new Promise((ok) => server.listen(PORT, "127.0.0.1", () => ok(server)));
}

function readableText(html) {
  const body = html.split(/<body[^>]*>/i)[1] || "";
  return body
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim().length;
}

async function capture(browser, route) {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (err) => errors.push(err.message.split("\n")[0]));
  try {
    await page.emulateMediaFeatures([
      { name: "prefers-reduced-motion", value: "reduce" },
    ]);
    // A wide viewport so the capture holds the desktop layout, which is the
    // fuller one; the markup is the same at every width.
    await page.setViewport({ width: 1440, height: 1200 });
    await page.goto(`http://127.0.0.1:${PORT}${route}`, {
      waitUntil: "networkidle0",
      timeout: 45000,
    });
    // The head is written in an effect after the route's page mounts, so wait
    // for the title to stop being the shell's before serialising.
    await page.waitForFunction(() => document.querySelector("h1, h2") !== null, {
      timeout: 15000,
    });
    // Vite's preloader writes absolute modulepreload hrefs against the capture
    // server; strip the origin so the shipped page never points at localhost.
    const html = (await page.content()).replaceAll(`http://127.0.0.1:${PORT}`, "");
    return { html, errors };
  } finally {
    await page.close();
  }
}

async function main() {
  if (!existsSync(join(DIST, "index.html"))) {
    console.error("prerender: dist/index.html is missing. Run the build first.");
    process.exit(1);
  }

  const server = await serveDist();
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--hide-scrollbars"],
  });

  const failures = [];
  const written = [];
  let next = 0;

  async function worker() {
    while (next < ROUTES.length) {
      const route = ROUTES[next++];
      try {
        const { html, errors } = await capture(browser, route);
        const chars = readableText(html);
        if (errors.length) {
          failures.push(`${route} (page error: ${errors[0]})`);
          continue;
        }
        if (!/<\/html>/i.test(html) || chars < MIN_TEXT_CHARS) {
          failures.push(`${route} (only ${chars} readable characters)`);
          continue;
        }
        const dir = route === "/" ? DIST : join(DIST, route);
        await mkdir(dir, { recursive: true });
        await writeFile(join(dir, "index.html"), html, "utf8");
        written.push([route, chars]);
        console.log(`  ${route.padEnd(26)} ${String(chars).padStart(6)} chars`);
      } catch (err) {
        failures.push(`${route} (${err.message.split("\n")[0]})`);
      }
    }
  }

  console.log(`prerender: ${ROUTES.length} routes`);
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  await browser.close();
  server.close();

  if (failures.length) {
    console.error(`\nprerender: ${failures.length} route(s) failed:`);
    for (const f of failures) console.error(`  ${f}`);
    process.exit(1);
  }
  const lowest = Math.min(...written.map(([, c]) => c));
  console.log(`\nprerender: ${written.length} routes written, thinnest page ${lowest} characters`);
}

main();
