/**
 * Receives a questionnaire submission from /skjema and does two things:
 *   1. Emails the answers to hei@nurea.no via Web3Forms (same pipeline as the
 *      site's other forms).
 *   2. Files the submission as markdown in the CLAUDE.OS vault repo
 *      (NUREA.HQ/Clients/_inbox/) via the GitHub API, so the onboarding
 *      machine picks it up. Needs the VAULT_GITHUB_TOKEN env var in Vercel:
 *      a fine-grained PAT for zayals35/claude-os with Contents read/write.
 *
 * Email is the primary channel: if filing to GitHub fails the submission
 * still succeeds, and the email gets a warning line so nothing is lost.
 */

const WEB3FORMS_KEY = "6340fc54-aa73-46d5-ade0-2408f92a8938";
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

async function sendEmail(sub: Submission, filedNote: string): Promise<boolean> {
  const answered = sub.sections
    .flatMap((s) => s.questions)
    .filter((q) => q.answer.trim()).length;
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject: `Spørreskjema: ${sub.contact.bedrift}`,
      from_name: "nurea.no/skjema",
      Bedrift: sub.contact.bedrift,
      Navn: sub.contact.navn,
      "E-post": sub.contact.epost,
      Tjenester: sub.services?.length ? sub.services.join(", ") : "(ikke valgt)",
      Besvart: `${answered} spørsmål`,
      Arkivering: filedNote,
      Svar: asText(sub),
    }),
  });
  const data = (await res.json()) as { success?: boolean };
  return !!data.success;
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
    return res.status(200).json({ ok: true, emailed: true, filed: true });
  }
  if (!isValid(req.body)) {
    return res.status(400).json({ ok: false, error: "Invalid submission" });
  }
  const sub = req.body;

  let filedPath: string | null = null;
  let fileError: string | null = null;
  try {
    filedPath = await fileInVault(sub);
  } catch (err) {
    fileError = err instanceof Error ? err.message : String(err);
    console.error("Vault filing failed:", fileError);
  }

  let emailed = false;
  try {
    emailed = await sendEmail(
      sub,
      filedPath ? `Arkivert i vault: ${filedPath}` : `ARKIVERING FEILET (${fileError}); svarene finnes bare i denne e-posten`
    );
  } catch (err) {
    console.error("Email failed:", err);
  }

  // Success if at least one channel got the answers through.
  if (emailed || filedPath) {
    return res.status(200).json({ ok: true, emailed, filed: !!filedPath });
  }
  return res.status(502).json({ ok: false, error: "Delivery failed" });
}
