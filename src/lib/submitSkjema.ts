import { WEB3FORMS_KEY } from "./useWebForm.ts";

export type Section = {
  title: string;
  questions: { text: string; answer: string }[];
};

export type Payload = {
  website: string;
  contact: { bedrift: string; navn: string; epost: string };
  services: string[];
  sections: Section[];
  submissionId: string;
};

export type DeliveryResult = {
  filed: boolean;
  filedPath: string | null;
  emailed: boolean;
  outcome: "ok" | "partial" | "failed";
};

type JsonObject = Record<string, unknown>;

function isJsonObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null;
}

async function requestJson(
  fetchImpl: typeof fetch,
  url: string,
  init: RequestInit,
  timeoutMs: number
): Promise<JsonObject | null> {
  try {
    const response = await fetchImpl(url, {
      ...init,
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!response.ok) return null;
    const data: unknown = await response.json();
    return isJsonObject(data) ? data : null;
  } catch {
    return null;
  }
}

export async function deliverSubmission(
  payload: Payload,
  opts: { fetch?: typeof fetch; timeoutMs?: number } = {}
): Promise<DeliveryResult> {
  const fetchImpl = opts.fetch ?? fetch;
  const timeoutMs = opts.timeoutMs ?? 12000;
  let filed = false;
  let filedPath: string | null = null;

  const vaultData = await requestJson(
    fetchImpl,
    "/api/skjema",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
    timeoutMs
  );
  if (vaultData?.ok === true) {
    filed = true;
    filedPath = typeof vaultData.path === "string" ? vaultData.path : null;
  }

  const answered = payload.sections
    .flatMap((section) => section.questions)
    .filter((question) => question.answer).length;
  const svar = payload.sections
    .flatMap((section) => [
      `## ${section.title}`,
      "",
      ...section.questions.flatMap((question) => [
        `**${question.text}**`,
        question.answer || "(ikke besvart)",
        "",
      ]),
    ])
    .join("\n");
  const emailData = await requestJson(
    fetchImpl,
    "https://api.web3forms.com/submit",
    {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `Spørreskjema: ${payload.contact.bedrift}`,
        from_name: "nurea.no/skjema",
        botcheck: payload.website,
        Bedrift: payload.contact.bedrift,
        Navn: payload.contact.navn,
        "E-post": payload.contact.epost,
        Tjenester: payload.services.length ? payload.services.join(", ") : "(ikke valgt)",
        Besvart: `${answered} spørsmål`,
        Arkivering: filedPath
          ? `Arkivert i vault: ${filedPath}`
          : "ARKIVERING FEILET; svarene finnes bare i denne e-posten",
        Svar: svar,
      }),
    },
    timeoutMs
  );
  const emailed = emailData?.success === true;
  const deliveredChannels = Number(filed) + Number(emailed);

  return {
    filed,
    filedPath,
    emailed,
    outcome: deliveredChannels === 2 ? "ok" : deliveredChannels === 1 ? "partial" : "failed",
  };
}

export function newSubmissionId(): string {
  const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
  const bytes = new Uint8Array(12);
  try {
    crypto.getRandomValues(bytes);
    return Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join("");
  } catch {
    return Array.from({ length: 12 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
  }
}
