import { useState } from "react";

export const WEB3FORMS_KEY = "6340fc54-aa73-46d5-ade0-2408f92a8938";
export const LEAD_EMAIL = "hei@nurea.no";

export type FormStatus = "idle" | "sending" | "ok" | "error";

/**
 * Posts a form to Web3Forms. On network/API failure the caller gets "error"
 * and should surface the mailto fallback.
 */
export function useWebForm(subject: string) {
  const [status, setStatus] = useState<FormStatus>("idle");

  const submit = async (fields: Record<string, string>) => {
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject, ...fields }),
      });
      const data = await res.json();
      setStatus(data.success ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  };

  return { status, submit };
}

export function mailtoFallback(subject: string, body: string): string {
  return `mailto:${LEAD_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
