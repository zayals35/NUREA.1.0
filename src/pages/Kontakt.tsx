import { useState, type CSSProperties, type FormEvent } from "react";
import { toast } from "sonner";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";

const WEB3FORMS_KEY = "";
const CONTACT_EMAIL = "hei@nurea.no";

const accent = "#8a5a2f";
const ink = "#2a1f16";

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

const SERVICES = ["Merkevare", "Nettsider", "Innhold", "Systemer", "Vet ikke ennå"] as const;

const STEPS = [
  {
    n: "01",
    h: "Du forteller hvor dere står",
    p: "Noen linjer om bedriften og hva som føles uklart. Ingen lange forberedelser.",
  },
  {
    n: "02",
    h: "Vi ser på det sammen",
    p: "En kort, rolig samtale om hvor friksjonen er størst og hva som bør ryddes først.",
  },
  {
    n: "03",
    h: "Du får en tydelig anbefaling",
    p: "Hva som bør gjøres først, enten vi jobber sammen eller ei.",
  },
];

const Kontakt = () => {
  const [navn, setNavn] = useState("");
  const [epost, setEpost] = useState("");
  const [bedrift, setBedrift] = useState("");
  const [valgte, setValgte] = useState<Record<string, boolean>>({});
  const [melding, setMelding] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const toggleService = (s: string) =>
    setValgte((v) => ({ ...v, [s]: !v[s] }));

  const chosenServices = SERVICES.filter((s) => valgte[s]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!epost.trim() || !melding.trim()) {
      toast.error("Fyll inn e-post og meldingsfeltet.");
      return;
    }

    const subject = "Ny henvendelse fra nurea.no";
    const lines = [
      navn.trim() ? `Navn: ${navn}` : null,
      `E-post: ${epost}`,
      bedrift.trim() ? `Bedrift: ${bedrift}` : null,
      chosenServices.length ? `Tjenester: ${chosenServices.join(", ")}` : null,
      `Melding: ${melding}`,
    ].filter(Boolean);

    if (!WEB3FORMS_KEY) {
      const body = encodeURIComponent((lines as string[]).join("\n"));
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
          from_name: "NUREA kontakt",
          navn,
          epost,
          bedrift,
          tjenester: chosenServices.join(", "),
          melding,
        }),
      });
      if (!res.ok) throw new Error("bad response");
      setStatus("sent");
    } catch {
      setStatus("idle");
      toast.error("Noe gikk galt. Prøv igjen, eller send oss en e-post direkte.");
    }
  };

  return (
    <PageShell
      eyebrow="Klarhetssamtale"
      title="La oss snakke."
      intro="Fortell kort hvor dere står. Vi tar en rolig, uforpliktende prat om hva som bør bli tydeligere først."
    >
      <div
        className="grid gap-16 md:gap-20"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
      >
        {/* Left — what to expect */}
        <div style={{ maxWidth: 400 }}>
          <Reveal>
            <p
              style={{
                fontFamily: "'Manrope','Inter',sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: accent,
              }}
            >
              Hva skjer
            </p>
          </Reveal>

          <div style={{ marginTop: 24 }}>
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.07}>
                <div
                  style={{
                    display: "flex",
                    gap: 20,
                    paddingBottom: 28,
                    position: "relative",
                  }}
                >
                  {/* Vertical connector line */}
                  {i < STEPS.length - 1 && (
                    <div
                      aria-hidden
                      style={{
                        position: "absolute",
                        left: 16,
                        top: 28,
                        bottom: 0,
                        width: 1,
                        background: "rgba(42,31,22,0.15)",
                      }}
                    />
                  )}
                  <div
                    style={{
                      flexShrink: 0,
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      border: "1px solid rgba(138,90,47,0.35)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Manrope','Inter',sans-serif",
                      fontSize: 12,
                      fontWeight: 700,
                      color: accent,
                    }}
                  >
                    {s.n}
                  </div>
                  <div style={{ paddingTop: 4 }}>
                    <div className="hero-headline" style={{ fontSize: 17 }}>{s.h}</div>
                    <p className="hero-body mt-1" style={{ fontSize: 14, opacity: 0.72, maxWidth: "34ch" }}>
                      {s.p}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.25}>
            <div
              style={{
                marginTop: 8,
                paddingTop: 20,
                borderTop: "1px dotted rgba(42,31,22,0.2)",
              }}
            >
              <p className="hero-body" style={{ fontSize: 13.5, opacity: 0.65 }}>
                Direkte kontakt
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                style={{
                  display: "block",
                  marginTop: 6,
                  fontFamily: "'Manrope','Inter',sans-serif",
                  fontSize: 15,
                  fontWeight: 600,
                  color: accent,
                  textDecoration: "none",
                }}
              >
                {CONTACT_EMAIL}
              </a>
              <p className="hero-body mt-1" style={{ fontSize: 13, opacity: 0.55 }}>
                Trondheim · Norge
              </p>
            </div>
          </Reveal>
        </div>

        {/* Right — form */}
        <Reveal delay={0.1}>
          {status === "sent" ? (
            <div
              style={{
                borderRadius: 16,
                border: "1px solid rgba(42,31,22,0.14)",
                background: "rgba(255,255,255,0.45)",
                padding: "36px 32px",
                maxWidth: 480,
              }}
            >
              <div className="hero-headline" style={{ fontSize: 28 }}>Takk.</div>
              <p className="hero-headline" style={{ fontSize: 18, marginTop: 4, opacity: 0.65 }}>
                Meldingen er på vei.
              </p>
              <p className="hero-body" style={{ marginTop: 16, fontSize: 15.5, lineHeight: 1.65 }}>
                Vi ser på det du sendte og kommer tilbake med en rolig, tydelig anbefaling. Snakkes snart.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ maxWidth: 480 }} noValidate>
              {/* Navn */}
              <div>
                <label htmlFor="navn" style={labelStyle}>
                  Navn <span style={{ opacity: 0.45, fontWeight: 500 }}>(valgfritt)</span>
                </label>
                <input
                  id="navn"
                  type="text"
                  value={navn}
                  onChange={(e) => setNavn(e.target.value)}
                  placeholder="Fornavn Etternavn"
                  autoComplete="name"
                  style={inputStyle}
                />
              </div>

              {/* E-post */}
              <div style={{ marginTop: 20 }}>
                <label htmlFor="epost" style={labelStyle}>E-post</label>
                <input
                  id="epost"
                  type="email"
                  value={epost}
                  onChange={(e) => setEpost(e.target.value)}
                  placeholder="deg@bedrift.no"
                  autoComplete="email"
                  style={inputStyle}
                  required
                />
              </div>

              {/* Bedrift */}
              <div style={{ marginTop: 20 }}>
                <label htmlFor="bedrift" style={labelStyle}>
                  Bedrift <span style={{ opacity: 0.45, fontWeight: 500 }}>(valgfritt)</span>
                </label>
                <input
                  id="bedrift"
                  type="text"
                  value={bedrift}
                  onChange={(e) => setBedrift(e.target.value)}
                  placeholder="Bedriftens navn"
                  autoComplete="organization"
                  style={inputStyle}
                />
              </div>

              {/* Service chips */}
              <div style={{ marginTop: 20 }}>
                <span style={labelStyle}>Hva trenger dere hjelp med?</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 2 }}>
                  {SERVICES.map((s) => {
                    const on = !!valgte[s];
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleService(s)}
                        aria-pressed={on}
                        style={{
                          padding: "8px 16px",
                          borderRadius: 999,
                          border: `1px solid ${on ? accent : "rgba(42,31,22,0.22)"}`,
                          background: on ? "rgba(138,90,47,0.12)" : "rgba(255,255,255,0.4)",
                          color: on ? accent : ink,
                          fontFamily: "'Manrope','Inter',sans-serif",
                          fontSize: 13,
                          fontWeight: on ? 700 : 500,
                          cursor: "pointer",
                          transition: "all 0.18s ease",
                        }}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Melding */}
              <div style={{ marginTop: 20 }}>
                <label htmlFor="melding" style={labelStyle}>Kort om hvor dere står</label>
                <textarea
                  id="melding"
                  value={melding}
                  onChange={(e) => setMelding(e.target.value)}
                  placeholder="Hva føles uklart akkurat nå?"
                  rows={5}
                  required
                  style={{
                    ...inputStyle,
                    height: "auto",
                    padding: "14px 16px",
                    resize: "vertical",
                    lineHeight: 1.6,
                  }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="transition hover:brightness-110"
                style={{
                  marginTop: 24,
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
                  border: "none",
                }}
              >
                {status === "sending" ? "Sender …" : "Send henvendelse →"}
              </button>

              <p
                style={{
                  marginTop: 12,
                  fontFamily: "'Manrope','Inter',sans-serif",
                  fontSize: 12,
                  color: "rgba(42,31,22,0.55)",
                  lineHeight: 1.5,
                }}
              >
                Uforpliktende samtale. Vi svarer som regel innen én arbeidsdag.
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </PageShell>
  );
};

export default Kontakt;
