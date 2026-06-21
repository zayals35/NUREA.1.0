import { useState } from "react";
import { SERVICES } from "@/data/services";
import { WORK } from "@/data/work";
import { Reveal } from "@/components/Reveal";
import { WorkCard } from "./WorkCard";

const sectionStyle = { scrollMarginTop: 80 } as const;
const accent = "#8a5a2f";

const Eyebrow = ({ children }: { children: string }) => (
  <p style={{ color: accent, fontWeight: 700, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase" }}>
    {children}
  </p>
);

/* ---------- Problem / why NUREA exists (right after the hero) ---------- */
export const ProblemSection = () => (
  <section id="hvorfor" className="px-6 md:px-12 py-28 md:py-40" style={{ ...sectionStyle, background: "#e9e2d6" }}>
    <Reveal className="max-w-4xl mx-auto">
      <Eyebrow>Hvorfor NUREA finnes</Eyebrow>
      <h2 className="hero-headline" style={{ fontSize: "clamp(34px, 5.4vw, 72px)", marginTop: 14, maxWidth: 760 }}>
        De fleste bedrifter er sterkere enn de ser ut til.
      </h2>
      <p className="hero-body" style={{ marginTop: 24, maxWidth: 580, fontSize: "clamp(16px, 1.3vw, 20px)", lineHeight: 1.65 }}>
        Avstanden ligger sjelden i hvor god du faktisk er, men i hvordan det henger
        sammen. Uten en <span style={{ color: accent, fontWeight: 600 }}>rød tråd</span>{" "}
        mellom merkevare, innhold, annonser og stemme, drukner det sterke i støy. NUREA
        finnes for å samle det til ett tydelig uttrykk, så du blir forstått og valgt.
      </p>
    </Reveal>
  </section>
);

/* ---------- Arbeider (work showcase, Monolog "success stories" layout) ---------- */
const WorkSection = () => (
  <section id="arbeider" className="px-6 md:px-12 py-24 md:py-32" style={{ ...sectionStyle, background: "#ece5d9" }}>
    {/* Big heading */}
    <Reveal>
      <h2
        className="hero-headline"
        style={{ fontSize: "clamp(40px, 8.5vw, 116px)", textTransform: "uppercase", letterSpacing: "-0.02em", lineHeight: 0.95 }}
      >
        Utvalgte arbeider
      </h2>
    </Reveal>

    {/* Body: sticky side label + cards list */}
    <div className="mt-10 md:mt-16 flex flex-col md:flex-row gap-6 md:gap-12">
      {/* sticky sidebar label */}
      <div className="md:w-[16%] shrink-0">
        <div className="md:sticky md:top-24 flex items-center gap-2" style={{ color: accent }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: accent }} />
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "'Manrope','Inter',sans-serif" }}>
            Arbeider
          </span>
        </div>
      </div>

      {/* list */}
      <div
        className="flex-1 min-w-0 flex flex-col gap-8"
        style={{ borderTop: "1px dotted rgba(42,31,22,0.28)", paddingTop: 32 }}
      >
        {WORK.map((w, i) => (
          <Reveal key={w.id} delay={(i % 2) * 0.05}>
            <WorkCard item={w} index={i} total={WORK.length} />
          </Reveal>
        ))}
      </div>
    </div>

    {/* bottom CTA */}
    <Reveal className="mt-12 flex md:justify-end">
      <a href="/arbeider" style={{ color: accent, fontWeight: 700, fontSize: 14, letterSpacing: "0.04em" }}>
        Se alle arbeider <span style={{ opacity: 0.55 }}>(snart)</span> →
      </a>
    </Reveal>
  </section>
);

/* ---------- Tjenester (services) ---------- */
const SERVICE_ORDER = ["merkevare", "nettsider", "innhold", "systemer", "reklamer"];
const ServicesSection = () => (
  <section id="tjenester" className="px-6 md:px-12 py-24 md:py-32" style={{ ...sectionStyle, background: "#e9e2d6" }}>
    <Reveal className="max-w-5xl mx-auto">
      <Eyebrow>Tjenester</Eyebrow>
      <h2 className="hero-headline" style={{ fontSize: "clamp(34px, 5vw, 64px)", marginTop: 12 }}>
        Fem deler, én grunnmur.
      </h2>
      <p className="hero-body mt-4" style={{ maxWidth: 540 }}>
        Tjenestene er ikke løse produkter. De er deler av samme digitale grunnlag, med merkevaren som første stein.
      </p>
    </Reveal>

    <div className="max-w-5xl mx-auto mt-12" style={{ borderTop: "1px solid rgba(42,31,22,0.14)" }}>
      {SERVICE_ORDER.map((id, i) => {
        const s = SERVICES.find((x) => x.id === id);
        if (!s) return null;
        return (
          <Reveal key={s.id} delay={i * 0.05}>
            <a
              href={`/tjenester/${s.id}`}
              className="group flex items-center gap-5 py-6"
              style={{ borderBottom: "1px solid rgba(42,31,22,0.14)" }}
            >
              <img src={s.image} alt="" aria-hidden className="w-14 h-14 object-contain shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="hero-headline" style={{ fontSize: "clamp(22px, 3vw, 34px)" }}>{s.title}</span>
                <p className="hero-body" style={{ fontSize: 14, marginTop: 2 }}>{s.description}</p>
              </div>
              <span
                className="opacity-0 group-hover:opacity-100 transition shrink-0"
                style={{ color: accent, fontWeight: 700, fontSize: 13 }}
              >
                Utforsk →
              </span>
            </a>
          </Reveal>
        );
      })}
    </div>
  </section>
);

/* ---------- Metoden (3-step process) ---------- */
const STEPS = [
  { n: "01", h: "Klarhet", p: "Vi finner ut hva som må bli tydeligere: hvem du er for, og hva som skiller deg." },
  { n: "02", h: "Uttrykk", p: "Vi former merkevaren: identitet, visuelt språk og stemme, satt i ett system som henger sammen overalt." },
  { n: "03", h: "Flyt", p: "Vi gjør veien til kontakt enklere, og bygger videre over tid." },
];
const MethodSection = () => (
  <section id="metoden" className="px-6 md:px-12 py-24 md:py-32" style={{ ...sectionStyle, background: "#e9e2d6" }}>
    <Reveal className="max-w-5xl mx-auto">
      <Eyebrow>NUREA-metoden</Eyebrow>
      <h2 className="hero-headline" style={{ fontSize: "clamp(34px, 5vw, 64px)", marginTop: 12 }}>
        Slik jobber vi.
      </h2>
      <p className="hero-body mt-4" style={{ maxWidth: 540 }}>
        Tre rolige steg. Fra uklarhet til et tydelig digitalt uttrykk som henger sammen.
      </p>
    </Reveal>

    <div className="max-w-5xl mx-auto mt-12 grid gap-x-10 gap-y-12" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
      {STEPS.map((s, i) => (
        <Reveal key={s.n} delay={i * 0.08}>
          <div style={{ borderTop: "2px solid rgba(42,31,22,0.18)", paddingTop: 18 }}>
            <div style={{ color: accent, fontWeight: 700, fontSize: 13, letterSpacing: "0.1em" }}>STEG {s.n}</div>
            <div className="hero-headline" style={{ fontSize: 28, marginTop: 10 }}>{s.h}</div>
            <p className="hero-body" style={{ marginTop: 10, fontSize: 15 }}>{s.p}</p>
          </div>
        </Reveal>
      ))}
    </div>
    <Reveal className="max-w-5xl mx-auto mt-10">
      <a href="/metoden" style={{ color: accent, fontWeight: 700, fontSize: 14 }}>Se hele metoden →</a>
    </Reveal>
  </section>
);

/* ---------- FAQ ---------- */
const FAQ = [
  { q: "Hva koster det?", a: "Hver bedrift er ulik, så prisen settes individuelt. Velg nivået som ligner mest på Priser-siden, så former vi det rundt deg i en klarhetssamtale." },
  { q: "Hvor lang tid tar et prosjekt?", a: "Det kommer an på omfanget. En tydelig leveranse kan gå raskt; en hel merkevare bygges i rolige steg. Vi avtaler tempo og milepæler før vi starter." },
  { q: "Kan jeg starte med bare én ting?", a: "Ja. Mange starter med én konkret leveranse, en merkevare, en side eller et budskap, og bygger videre derfra." },
  { q: "Hva er NUREA-metoden?", a: "Tre rolige steg: Klarhet, Uttrykk og Flyt. Fra uklarhet til et tydelig digitalt uttrykk som henger sammen." },
  { q: "Jobber dere med små bedrifter?", a: "Ja. NUREA er bygget for å gi solide bedrifter et tydeligere uttrykk, uansett størrelse." },
];
const FaqItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(42,31,22,0.14)" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between text-left py-5"
        aria-expanded={open}
      >
        <span className="hero-headline" style={{ fontSize: "clamp(18px, 2.4vw, 24px)" }}>{q}</span>
        <span style={{ color: accent, fontWeight: 700, fontSize: 22, marginLeft: 16 }}>{open ? "–" : "+"}</span>
      </button>
      {open && <p className="hero-body" style={{ paddingBottom: 20, maxWidth: 640, fontSize: 15 }}>{a}</p>}
    </div>
  );
};
const FaqSection = () => (
  <section id="faq" className="px-6 md:px-12 py-24 md:py-32" style={{ ...sectionStyle, background: "#ece5d9" }}>
    <Reveal className="max-w-4xl mx-auto">
      <Eyebrow>Spørsmål</Eyebrow>
      <h2 className="hero-headline" style={{ fontSize: "clamp(34px, 5vw, 60px)", marginTop: 12, marginBottom: 24 }}>
        Vanlige spørsmål.
      </h2>
      <div style={{ borderTop: "1px solid rgba(42,31,22,0.14)" }}>
        {FAQ.map((f) => (
          <FaqItem key={f.q} q={f.q} a={f.a} />
        ))}
      </div>
    </Reveal>
  </section>
);

/* ---------- Final CTA ---------- */
const FinalCta = () => (
  <section id="kontakt" className="px-6 md:px-12 py-28 md:py-40" style={{ ...sectionStyle, background: "#2a1f16", color: "#f3ecdb" }}>
    <Reveal className="max-w-4xl mx-auto text-center">
      <p style={{ color: "#d8b07a", fontWeight: 700, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase" }}>
        Neste steg
      </p>
      <h2
        style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1.0,
          fontSize: "clamp(40px, 7vw, 92px)",
          marginTop: 16,
          color: "#f3ecdb",
        }}
      >
        La oss snakke.
      </h2>
      <p style={{ margin: "20px auto 0", maxWidth: 460, fontFamily: "'Manrope','Inter',sans-serif", fontSize: 16, lineHeight: 1.6, color: "rgba(243,236,219,0.84)" }}>
        En rolig, uforpliktende samtale om hvor du står, og hva som bør bli klarere først.
      </p>
      <a
        href="/kontakt"
        className="mt-9 inline-flex items-center justify-center transition hover:brightness-110"
        style={{
          background: "#f3ecdb",
          color: "#2a1f16",
          fontFamily: "'Manrope','Inter',sans-serif",
          fontSize: 15,
          fontWeight: 700,
          height: 52,
          padding: "0 34px",
          borderRadius: 999,
        }}
      >
        Start et prosjekt →
      </a>
    </Reveal>
  </section>
);

export const HomeSections = () => (
  <>
    <ServicesSection />
    <WorkSection />
    <MethodSection />
    <FaqSection />
    <FinalCta />
  </>
);

export const SiteFooter = () => (
  <footer className="px-6 md:px-12 py-12" style={{ background: "#211a12", color: "rgba(243,236,219,0.86)" }}>
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
      <div>
        <div className="hero-wordmark" style={{ color: "#f3ecdb", fontSize: 20 }}>NUREA</div>
        <p style={{ marginTop: 8, fontFamily: "'Manrope','Inter',sans-serif", fontSize: 13, opacity: 0.7 }}>
          Merkevare og digital retning. Oslo, Norge.
        </p>
      </div>
      <nav className="flex flex-wrap gap-x-6 gap-y-2" style={{ fontFamily: "'Manrope','Inter',sans-serif", fontSize: 14 }}>
        <a href="/om-oss" className="opacity-80 hover:opacity-100 transition">Om</a>
        <a href="/#arbeider" className="opacity-80 hover:opacity-100 transition">Arbeider</a>
        <a href="/#tjenester" className="opacity-80 hover:opacity-100 transition">Tjenester</a>
        <a href="/metoden" className="opacity-80 hover:opacity-100 transition">Metoden</a>
        <a href="/priser" className="opacity-80 hover:opacity-100 transition">Priser</a>
        <a href="/kontakt" className="opacity-80 hover:opacity-100 transition">Kontakt</a>
      </nav>
    </div>
    <p style={{ marginTop: 28, fontFamily: "'Manrope','Inter',sans-serif", fontSize: 12, opacity: 0.5 }}>
      © {new Date().getFullYear()} NUREA
    </p>
  </footer>
);

export default HomeSections;
