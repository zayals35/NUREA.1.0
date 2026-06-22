import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { WEEK_STEPS } from "@/data/method";

const COLLAB_PRINCIPLES = [
  {
    n: "01",
    h: "Revisjonen kommer først",
    p: "Før vi starter, sender vi en diagnose. En konkret oversikt over hva som bør endres og hvorfor. Arbeidet begynner først når du har lest, forstått og godtatt den.",
  },
  {
    n: "02",
    h: "Du godkjenner underveis",
    p: "Oppdager vi noe som bør gjøres annerledes mens vi jobber, tar vi kontakt. Vi beskriver hva vi ser, og får et tydelig ja fra deg før vi handler. Ingen overraskelser.",
  },
  {
    n: "03",
    h: "Alt du trenger for å gå videre",
    p: "Når arbeidet er ferdig, får du alle filer, dokumentasjon og en blåkopi av det vi har bygget. Du eier det fullt og helt og kan fortsette med oss, eller ta det med deg til et annet byrå.",
  },
];

const STEPS = [
  { n: "01", h: "Klarhet", p: "Vi finner ut hva som må bli tydeligere: hvem du er for, og hva som skiller deg." },
  { n: "02", h: "Uttrykk", p: "Vi former merkevaren: identitet, visuelt språk og stemme, satt i ett system som henger sammen overalt." },
  { n: "03", h: "Flyt", p: "Vi gjør veien til kontakt enklere, og bygger videre over tid." },
];

const Metoden = () => (
  <PageShell
    eyebrow="NUREA-metoden"
    title="Slik jobber vi"
    intro="Fra uklarhet til tydelig digital retning. Tre rolige steg, fra forståelse til et uttrykk som henger sammen."
  >
    <div
      className="mt-2 grid gap-x-8 gap-y-10"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}
    >
      {STEPS.map((s) => (
        <div key={s.n} style={{ borderTop: "1px solid rgba(42,31,22,0.14)", paddingTop: 16 }}>
          <div style={{ color: "#8a5a2f", fontWeight: 700, fontSize: 13, letterSpacing: "0.08em" }}>
            {s.n}
          </div>
          <div className="hero-headline" style={{ fontSize: 24, marginTop: 8 }}>{s.h}</div>
          <p className="hero-body" style={{ marginTop: 8, fontSize: 14.5 }}>{s.p}</p>
        </div>
      ))}
    </div>

    {/* The documented process: what actually happens in the first month. */}
    <div className="mt-20 md:mt-28">
      <p style={{ color: "#8a5a2f", fontWeight: 700, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase" }}>
        De første 30 dagene
      </p>
      <h2 className="hero-headline" style={{ fontSize: "clamp(28px, 4vw, 48px)", marginTop: 12, maxWidth: 640 }}>
        Den dokumenterte prosessen.
      </h2>
      <p className="hero-body mt-4" style={{ maxWidth: 560 }}>
        De tre stegene over er retningen. Slik ser det konkret ut, uke for uke, fra
        første diagnose til en tydelig grunnmur du kan bygge videre på.
      </p>

      <div
        className="mt-12 grid gap-x-10 gap-y-12"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}
      >
        {WEEK_STEPS.map((s) => (
          <div key={s.n} style={{ borderTop: "2px solid rgba(42,31,22,0.18)", paddingTop: 16 }}>
            <div style={{ color: "#8a5a2f", fontWeight: 700, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {s.n}
            </div>
            <div className="hero-headline" style={{ fontSize: 24, marginTop: 8 }}>{s.h}</div>
            <p className="hero-body" style={{ marginTop: 8, fontSize: 14.5 }}>{s.p}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Collaboration principles: how the working relationship is structured. */}
    <div className="mt-20 md:mt-28">
      <p style={{ color: "#8a5a2f", fontWeight: 700, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase" }}>
        Samarbeidet
      </p>
      <h2 className="hero-headline" style={{ fontSize: "clamp(28px, 4vw, 48px)", marginTop: 12, maxWidth: 640 }}>
        Kontrollert fra start til slutt.
      </h2>
      <p className="hero-body mt-4" style={{ maxWidth: 560 }}>
        Vi leverer ikke bare arbeid. Vi leverer klarhet, dokumentasjon og kontroll,
        slik at du alltid vet hvor vi er, og alltid eier det vi bygger.
      </p>

      <div style={{ marginTop: 40 }}>
        {COLLAB_PRINCIPLES.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.08}>
            <div
              style={{
                display: "flex",
                gap: "clamp(20px, 4vw, 52px)",
                alignItems: "flex-start",
                borderTop: "1px dotted rgba(42,31,22,0.2)",
                paddingTop: 24,
                paddingBottom: 24,
              }}
            >
              <span
                style={{
                  fontSize: "clamp(30px, 4vw, 48px)",
                  fontWeight: 800,
                  color: "#8a5a2f",
                  opacity: 0.25,
                  lineHeight: 1,
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  flexShrink: 0,
                  minWidth: 44,
                  userSelect: "none",
                }}
              >
                {s.n}
              </span>
              <div style={{ paddingTop: 6 }}>
                <div className="hero-headline" style={{ fontSize: "clamp(17px, 1.9vw, 22px)" }}>
                  {s.h}
                </div>
                <p className="hero-body" style={{ marginTop: 8, fontSize: 15, maxWidth: "54ch", opacity: 0.78 }}>
                  {s.p}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </PageShell>
);

export default Metoden;
