import { PageShell } from "@/components/PageShell";
import { CloseTheGap } from "@/components/CloseTheGap";

const STEPS = [
  { n: "01", h: "Klarhet", p: "Vi finner hva som må bli tydeligere først." },
  { n: "02", h: "Tillit", p: "Vi styrker det som gjør bedriften trygg å velge." },
  { n: "03", h: "Struktur", p: "Vi bygger veien kunden enkelt kan følge." },
  { n: "04", h: "Uttrykk", p: "Vi former det digitale uttrykket som henger sammen." },
  { n: "05", h: "Flyt", p: "Vi gjør veien til kontakt enklere, og bygger videre." },
];

const Metoden = () => (
  <PageShell
    eyebrow="NUREA-metoden"
    title="Slik jobber vi"
    intro="Fra uklarhet til tydelig digital retning. Fem rolige steg — noen kunder trenger hele reisen, andre starter med én konkret leveranse."
  >
    {/* Scroll effect, placed right after the intro */}
    <CloseTheGap />

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
  </PageShell>
);

export default Metoden;
