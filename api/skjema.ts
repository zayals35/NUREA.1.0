/**
 * Receives a questionnaire submission from /skjema and files it as markdown
 * in the CLAUDE.OS vault repo (NUREA.HQ/Clients/_inbox/) via the GitHub API,
 * so the onboarding machine picks it up. Needs the VAULT_GITHUB_TOKEN env var
 * in Vercel: a fine-grained PAT for zayals35/claude-os with Contents read/write.
 *
 * The email channel lives client-side in Skjema.tsx: Web3Forms' free plan
 * rejects server-side calls (confirmed 2026-08-04), so the browser sends the
 * email directly and this endpoint only handles the vault. The client treats
 * the submission as delivered if either channel succeeds.
 */

const VAULT_REPO = "zayals35/claude-os";
const INBOX_DIR = "NUREA.HQ/Clients/_inbox";

interface Question {
  text: string;
  answer: string;
}
interface Section {
  title: string;
  questions: Question[];
}
interface Submission {
  contact: { bedrift: string; navn: string; epost: string };
  /** Service titles the client picked in the form's first step. */
  services?: string[];
  sections: Section[];
  /** Honeypot: hidden field humans never see. Any value = bot. */
  website?: string;
}

// Caps: generous for a real client, tight enough that a bot can't pump
// megabytes into the vault or the inbox email.
const MAX_ANSWER = 5_000;
const MAX_QUESTION = 500;
const MAX_TITLE = 200;
const MAX_QUESTIONS_PER_SECTION = 30;

function isValid(body: unknown): body is Submission {
  const b = body as Submission;
  return (
    !!b &&
    typeof b.contact?.bedrift === "string" &&
    b.contact.bedrift.trim().length > 0 &&
    b.contact.bedrift.length <= MAX_TITLE &&
    typeof b.contact?.navn === "string" &&
    b.contact.navn.length <= MAX_TITLE &&
    typeof b.contact?.epost === "string" &&
    b.contact.epost.includes("@") &&
    b.contact.epost.length <= MAX_TITLE &&
    (b.services === undefined ||
      (Array.isArray(b.services) &&
        b.services.length <= 10 &&
        b.services.every((s) => typeof s === "string" && s.length <= MAX_TITLE))) &&
    Array.isArray(b.sections) &&
    b.sections.length > 0 &&
    b.sections.length <= 20 &&
    b.sections.every(
      (s) =>
        typeof s?.title === "string" &&
        s.title.length <= MAX_TITLE &&
        Array.isArray(s.questions) &&
        s.questions.length <= MAX_QUESTIONS_PER_SECTION &&
        s.questions.every(
          (q) =>
            typeof q?.text === "string" &&
            q.text.length <= MAX_QUESTION &&
            typeof q?.answer === "string" &&
            q.answer.length <= MAX_ANSWER
        )
    )
  );
}

/** Single-line, frontmatter-safe value: no quotes, no newlines, no `---`. */
function fmSafe(value: string): string {
  return value.replace(/["\r\n]/g, "'").replace(/-{3,}/g, "--").slice(0, MAX_TITLE);
}

function asText(sub: Submission): string {
  const lines: string[] = [];
  for (const s of sub.sections) {
    lines.push(`## ${s.title}`, "");
    for (const q of s.questions) {
      lines.push(`**${q.text}**`, q.answer.trim() ? q.answer.trim() : "(ikke besvart)", "");
    }
  }
  return lines.join("\n");
}

function slugify(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/æ/g, "ae")
      .replace(/ø/g, "o")
      .replace(/å/g, "a")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "ukjent"
  );
}

/** Commits the submission into the vault's intake inbox. Returns the file path. */
async function fileInVault(sub: Submission): Promise<string> {
  const token = process.env.VAULT_GITHUB_TOKEN;
  if (!token) throw new Error("VAULT_GITHUB_TOKEN not configured");

  const now = new Date();
  const date = now.toISOString().slice(0, 10);
  const time = now.toISOString().slice(11, 16).replace(":", "");
  const slug = slugify(sub.contact.bedrift);
  const path = `${INBOX_DIR}/${date}-${time}-${slug}.md`;

  const md = [
    "---",
    `bedrift: "${fmSafe(sub.contact.bedrift)}"`,
    `kontakt: "${fmSafe(sub.contact.navn)}"`,
    `epost: "${fmSafe(sub.contact.epost)}"`,
    `tjenester: "${fmSafe((sub.services ?? []).join(", "))}"`,
    `mottatt: ${now.toISOString()}`,
    "kilde: nurea.no/skjema",
    "status: ny",
    "---",
    "",
    `# Spørreskjema: ${fmSafe(sub.contact.bedrift)}`,
    "",
    asText(sub),
  ].join("\n");

  const res = await fetch(`https://api.github.com/repos/${VAULT_REPO}/contents/${path}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "User-Agent": "nurea-skjema",
    },
    body: JSON.stringify({
      message: `Onboarding inbox: spørreskjema fra ${sub.contact.bedrift}`,
      content: Buffer.from(md, "utf8").toString("base64"),
    }),
  });
  if (!res.ok) throw new Error(`GitHub ${res.status}: ${await res.text()}`);
  return path;
}

/**
 * Per-IP throttle. In-memory, so it only holds per warm serverless instance,
 * but that is exactly where a burst lands. Real clients submit once.
 */
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 3;
const hits = new Map<string, number[]>();

function throttled(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 1000) hits.clear();
  return recent.length > RATE_MAX;
}

export default async function handler(
  req: { method?: string; body?: unknown; headers?: Record<string, string | string[] | undefined> },
  res: {
    status: (code: number) => { json: (body: unknown) => void };
    setHeader: (key: string, value: string) => void;
  }
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }
  const forwarded = req.headers?.["x-forwarded-for"];
  const ip = (Array.isArray(forwarded) ? forwarded[0] : forwarded)?.split(",")[0]?.trim() ?? "unknown";
  if (throttled(ip)) {
    return res.status(429).json({ ok: false, error: "Too many requests" });
  }
  // Honeypot filled = bot. Report success so it moves on; deliver nothing.
  const hp = (req.body as { website?: unknown } | null)?.website;
  if (typeof hp === "string" && hp.trim().length > 0) {
    return res.status(200).json({ ok: true, filed: true });
  }
  if (!isValid(req.body)) {
    return res.status(400).json({ ok: false, error: "Invalid submission" });
  }
  const sub = req.body;

  try {
    const path = await fileInVault(sub);
    return res.status(200).json({ ok: true, filed: true, path });
  } catch (err) {
    const message = (err instanceof Error ? err.message : String(err)).slice(0, 300);
    console.error("Vault filing failed:", message);
    return res.status(502).json({ ok: false, filed: false, error: message });
  }
}
