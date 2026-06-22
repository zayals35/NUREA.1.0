import { PageShell } from "@/components/PageShell";
import { WEEK_STEPS } from "@/data/method";

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
  </PageShell>
);

export default Metoden;
