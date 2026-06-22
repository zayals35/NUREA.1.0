import { useState, type CSSProperties, type FormEvent } from "react";
import { toast } from "sonner";
import { PageShell } from "@/components/PageShell";

// ---- FILL THESE IN -------------------------------------------------------
// Web3Forms access key (free, tied to an inbox at https://web3forms.com).
// While empty, the form falls back to opening the visitor's own mail app.
const WEB3FORMS_KEY = "";
// Where klarhetssjekk requests should land (used by the mailto fallback).
const CONTACT_EMAIL = "hei@nurea.no";
// --------------------------------------------------------------------------

const accent = "#8a5a2f";
const ink = "#2a1f16";

const REVIEW_POINTS = [
  "Førsteinntrykk",
  "Tydelighet",
  "Tillit",
  "Mobilopplevelse",
  "CTA",
  "Kontaktflyt",
  "Visuell kvalitet",
];

const fieldWrap: CSSProperties = { marginTop: 22 };
const labelStyle: CSSProperties = {
  display: "block",
  fontFamily: "'Manrope','Inter',sans-serif",
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: "0.02em",
  color: ink,
  marginBottom: 8,
};
const inputStyle: CSSProperties = {
  width: "100%",
  height: 50,
  padding: "0 16px",
  borderRadius: 12,
  border: "1px solid rgba(42,31,22,0.2)",
  background: "rgba(255,255,255,0.55)",
  color: ink,
  fontFamily: "'Manrope','Inter',sans-serif",
  fontSize: 15,
  outline: "none",
};

const FOCUS_OPTIONS = [
  { id: "uiux", label: "UI/UX", desc: "Brukeropplevelse og design" },
  { id: "seoaeo", label: "SEO/AEO", desc: "Synlighet og søk" },
] as const;

const Klarhetssjekk = () => {
  const [target, setTarget] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [focus, setFocus] = useState<Record<string, boolean>>({ uiux: true, seoaeo: false });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const toggleFocus = (id: string) => setFocus((f) => ({ ...f, [id]: !f[id] }));

  const chosenFocus = FOCUS_OPTIONS.filter((o) => focus[o.id]).map((o) => o.label);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!target.trim() || !email.trim()) {
      toast.error("Fyll inn nettside/Instagram og e-post.");
      return;
    }

    const subject = "Gratis klarhetssjekk – ny forespørsel";
    const lines = [
      `Nettside/Instagram: ${target}`,
      `Fokus: ${chosenFocus.length ? chosenFocus.join(", ") : "Ikke valgt"}`,
      `E-post: ${email}`,
      name.trim() ? `Navn: ${name}` : null,
    ].filter(Boolean);

    // No key yet → fall back to the visitor's mail app.
    if (!WEB3FORMS_KEY) {
      const body = encodeURIComponent(lines.join("\n"));
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${body}`;
      setStatus("sent");
      return;
    }

    try {
      setStatus("sending");
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject,
          from_name: "NUREA klarhetssjekk",
          nettside_instagram: target,
          fokus: chosenFocus.join(", "),
          epost: email,
          navn: name,
        }),
      });
      if (!res.ok) throw new Error("bad response");
      setStatus("sent");
      toast.success("Sendt. Du hører fra NUREA snart.");
    } catch {
      setStatus("idle");
      toast.error("Noe gikk galt. Prøv igjen, eller send oss en e-post.");
    }
  };

  return (
    <PageShell
      eyebrow="Gratis · uforpliktende"
      title="Gratis digital klarhetssjekk"
      intro="Send inn nettsiden din. NUREA går gjennom det som avgjør om en besøkende forstår, stoler på, og velger deg."
    >
      <div className="grid gap-14 md:gap-12" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        {/* Left: what NUREA reviews + the deliverable */}
        <div style={{ maxWidth: 460 }}>
          <p style={{ color: accent, fontWeight: 700, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: "'Manrope','Inter',sans-serif" }}>
            NUREA går gjennom
          </p>
          <ul style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {REVIEW_POINTS.map((p) => (
              <li
                key={p}
                style={{
                  fontFamily: "'Manrope','Inter',sans-serif",
                  fontSize: 13.5,
                  fontWeight: 600,
                  color: ink,
                  background: "rgba(138,90,47,0.12)",
                  padding: "7px 13px",
                  borderRadius: 999,
                }}
              >
                {p}
              </li>
            ))}
          </ul>

          <div style={{ marginTop: 30, borderTop: "1px dotted rgba(42,31,22,0.3)", paddingTop: 22 }}>
            <p className="hero-body" style={{ fontSize: 16, lineHeight: 1.6, maxWidth: 420 }}>
              Du får en kort vurdering med{" "}
              <span style={{ color: accent, fontWeight: 600 }}>3 ting som fungerer</span>,{" "}
              <span style={{ color: accent, fontWeight: 600 }}>3 ting som svekker tillit</span>, og{" "}
              <span style={{ color: accent, fontWeight: 600 }}>1 konkret forbedring</span> du kan gjøre denne uken.
            </p>
          </div>
        </div>

        {/* Right: the form */}
        <div>
          {status === "sent" ? (
            <div
              style={{
                borderRadius: 16,
                border: "1px solid rgba(42,31,22,0.16)",
                background: "rgba(255,255,255,0.5)",
                padding: "32px 28px",
                maxWidth: 460,
              }}
            >
              <div className="hero-headline" style={{ fontSize: 26 }}>Takk.</div>
              <p className="hero-body" style={{ marginTop: 10, fontSize: 15.5 }}>
                Forespørselen er på vei. NUREA går gjennom siden din og sender deg en kort,
                ærlig klarhetssjekk så snart vi har sett på den.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ maxWidth: 460 }} noValidate>
              <div>
                <label htmlFor="target" style={labelStyle}>Nettside-URL eller Instagram-handle</label>
                <input
                  id="target"
                  type="text"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  placeholder="nettside.no eller @brukernavn"
                  style={inputStyle}
                  required
                />
              </div>

              <div style={fieldWrap}>
                <span style={labelStyle}>Hva vil du vi skal se mest på?</span>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {FOCUS_OPTIONS.map((o) => {
                    const on = !!focus[o.id];
                    return (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => toggleFocus(o.id)}
                        aria-pressed={on}
                        style={{
                          flex: "1 1 0",
                          minWidth: 120,
                          textAlign: "left",
                          padding: "12px 14px",
                          borderRadius: 12,
                          border: `1px solid ${on ? accent : "rgba(42,31,22,0.2)"}`,
                          background: on ? "rgba(138,90,47,0.12)" : "rgba(255,255,255,0.4)",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span
                            style={{
                              width: 16,
                              height: 16,
                              borderRadius: 5,
                              border: `1px solid ${on ? accent : "rgba(42,31,22,0.35)"}`,
                              background: on ? accent : "transparent",
                              color: "#f3ecdb",
                              fontSize: 11,
                              fontWeight: 700,
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {on ? "✓" : ""}
                          </span>
                          <span style={{ fontFamily: "'Manrope','Inter',sans-serif", fontSize: 14, fontWeight: 700, color: ink }}>
                            {o.label}
                          </span>
                        </span>
                        <span style={{ display: "block", marginTop: 4, fontFamily: "'Manrope','Inter',sans-serif", fontSize: 12, color: "rgba(42,31,22,0.65)" }}>
                          {o.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={fieldWrap}>
                <label htmlFor="email" style={labelStyle}>E-post</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="din@epost.no"
                  style={inputStyle}
                  required
                />
              </div>

              <div style={fieldWrap}>
                <label htmlFor="name" style={labelStyle}>Navn <span style={{ opacity: 0.5, fontWeight: 500 }}>(valgfritt)</span></label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ditt navn"
                  style={inputStyle}
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="transition hover:brightness-110"
                style={{
                  marginTop: 28,
                  width: "100%",
                  height: 54,
                  borderRadius: 999,
                  background: ink,
                  color: "#f3ecdb",
                  fontFamily: "'Manrope','Inter',sans-serif",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: status === "sending" ? "default" : "pointer",
                  opacity: status === "sending" ? 0.7 : 1,
                }}
              >
                {status === "sending" ? "Sender …" : "Send inn for klarhetssjekk →"}
              </button>

              <p style={{ marginTop: 14, fontFamily: "'Manrope','Inter',sans-serif", fontSize: 12, color: "rgba(42,31,22,0.6)", lineHeight: 1.5 }}>
                Gratis og uforpliktende. Vi bruker e-posten din kun til å sende vurderingen.
              </p>
            </form>
          )}
        </div>
      </div>
    </PageShell>
  );
};

export default Klarhetssjekk;
