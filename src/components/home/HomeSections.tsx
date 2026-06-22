import { useState } from "react";
import { SERVICES } from "@/data/services";
import { WORK } from "@/data/work";
import { Reveal } from "@/components/Reveal";
import { WorkCard } from "./WorkCard";
import { TestimonialsSection } from "./Testimonials";

const sectionStyle = { scrollMarginTop: 80 } as const;
const accent = "#8a5a2f";

const Eyebrow = ({ children }: { children: string }) => (
  <p style={{ color: accent, fontWeight: 700, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase" }}>
    {children}
  </p>
);

/* ---------- Thesis (right after the hero) ----------
   The single sharpest positioning line, then what NUREA builds. */
export const EnemySection = () => (
  <section id="hvorfor" className="px-6 md:px-12 py-24 md:py-36" style={{ ...sectionStyle, background: "#e9e2d6" }}>
    <Reveal className="max-w-5xl mx-auto">
      <Eyebrow>Hvorfor NUREA finnes</Eyebrow>
      <h2 className="hero-headline" style={{ fontSize: "clamp(30px, 4.6vw, 62px)", marginTop: 14, maxWidth: 880, lineHeight: 1.05 }}>
        Solide bedrifter taper ikke kunder fordi de mangler verdi. De taper kunder fordi{" "}
        <span style={{ color: accent }}>verdien ikke blir forstått raskt nok.</span>
      </h2>
      <p className="hero-body" style={{ marginTop: 24, maxWidth: 600, fontSize: "clamp(16px, 1.3vw, 20px)", lineHeight: 1.65 }}>
        NUREA bygger merkevare, nettside, innhold og digitale systemer som gjør bedriften
        tydeligere, mer troverdig og enklere å velge.
      </p>
    </Reveal>
  </section>
);

/* ---------- To vanlige feller (after the scroll moment, before services) ----------
   The diagnostic beat: the two traps NUREA helps companies out of. */
const TRAPS = [
  {
    t: "Kampanjetenkning",
    p: "Troen på at vekst bare handler om å kjøre flere annonser. Veksten kommer når du bygger systemet bedriften faktisk drives på, ikke enda en kampanje.",
  },
  {
    t: "Tilfeldig digital tilstedeværelse",
    p: "Bedriften er solid, men på nett virker den uklar, utdatert eller fragmentert. Veien videre: bygg klarhet først, så tillit, så henvendelser.",
  },
];
export const TrapsSection = () => (
  <section id="feller" className="px-6 md:px-12 py-24 md:py-36" style={{ ...sectionStyle, background: "#ece5d9" }}>
    <Reveal className="max-w-5xl mx-auto">
      <Eyebrow>To vanlige feller</Eyebrow>
      <h2 className="hero-headline" style={{ fontSize: "clamp(28px, 4vw, 50px)", marginTop: 12, maxWidth: 640 }}>
        Det vi rydder bort.
      </h2>
    </Reveal>

    <div className="max-w-5xl mx-auto mt-12 md:mt-14 grid gap-x-12 gap-y-10" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
      {TRAPS.map((e, i) => (
        <Reveal key={e.t} delay={i * 0.08}>
          <div style={{ borderTop: "1px dotted rgba(42,31,22,0.32)", paddingTop: 20 }}>
            <span style={{ color: accent, fontWeight: 700, fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: "'Manrope','Inter',sans-serif" }}>
              Felle 0{i + 1}
            </span>
            <div className="hero-headline" style={{ fontSize: "clamp(22px, 2.6vw, 30px)", marginTop: 12 }}>{e.t}</div>
            <p className="hero-body" style={{ marginTop: 10, fontSize: 15.5, maxWidth: "42ch" }}>{e.p}</p>
          </div>
        </Reveal>
      ))}
    </div>
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
      <p className="hero-body mt-4" style={{ maxWidth: 560 }}>
        Dette er ikke løse produkter du kjøper. Det er ett system som gjør uklar digital
        tilstedeværelse om til klarhet, tillit og henvendelser, med merkevaren som første stein.
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

/* ---------- Metoden teaser (slim link to /metoden) ---------- */
const MethodSection = () => (
  <section id="metoden" className="px-6 md:px-12 py-16 md:py-20" style={{ ...sectionStyle, background: "#e9e2d6" }}>
    <Reveal className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      <div>
        <Eyebrow>NUREA-metoden</Eyebrow>
        <h2 className="hero-headline" style={{ fontSize: "clamp(24px, 3.2vw, 42px)", marginTop: 10 }}>
          Utforsk hvordan vi jobber.
        </h2>
        <p className="hero-body mt-3" style={{ maxWidth: 460, fontSize: 15.5 }}>
          Kontrollert fra start til slutt. Revisjonen kommer først, du godkjenner underveis,
          og alt du trenger for å gå videre er ditt når vi er ferdige.
        </p>
      </div>
      <a
        href="/metoden"
        className="self-start md:self-auto"
        style={{
          flexShrink: 0,
          display: "inline-flex",
          alignItems: "center",
          height: 50,
          padding: "0 28px",
          borderRadius: 999,
          border: `1.5px solid rgba(42,31,22,0.3)`,
          color: "#2a1f16",
          fontFamily: "'Manrope','Inter',sans-serif",
          fontSize: 14,
          fontWeight: 700,
          textDecoration: "none",
          whiteSpace: "nowrap",
        }}
      >
        Se metoden →
      </a>
    </Reveal>
  </section>
);

/* ---------- Gratis klarhetssjekk (lead magnet teaser) ---------- */
const KlarhetssjekkTeaser = () => (
  <section id="klarhetssjekk" className="px-6 md:px-12 py-24 md:py-32" style={{ ...sectionStyle, background: "#e9e2d6" }}>
    <Reveal className="max-w-4xl mx-auto">
      <Eyebrow>Gratis · uforpliktende</Eyebrow>
      <h2 className="hero-headline" style={{ fontSize: "clamp(34px, 5.4vw, 70px)", marginTop: 12, maxWidth: 720 }}>
        Gratis digital klarhetssjekk.
      </h2>
      <p className="hero-body mt-5" style={{ maxWidth: 600, fontSize: "clamp(16px, 1.3vw, 19px)", lineHeight: 1.6 }}>
        Send inn nettsiden din. Du får en kort vurdering med{" "}
        <span style={{ color: accent, fontWeight: 600 }}>3 ting som fungerer</span>,{" "}
        <span style={{ color: accent, fontWeight: 600 }}>3 ting som svekker tillit</span>, og{" "}
        <span style={{ color: accent, fontWeight: 600 }}>1 konkret forbedring</span> du kan gjøre denne uken.
      </p>
      <a
        href="/klarhetssjekk"
        className="mt-9 inline-flex items-center justify-center transition hover:brightness-105"
        style={{
          background: "#2a1f16",
          color: "#f3ecdb",
          fontFamily: "'Manrope','Inter',sans-serif",
          fontSize: 15,
          fontWeight: 700,
          height: 52,
          padding: "0 32px",
          borderRadius: 999,
        }}
      >
        Få din klarhetssjekk →
      </a>
    </Reveal>
  </section>
);

/* ---------- FAQ ---------- */
const FAQ = [
  { q: "Hvem jobber faktisk på prosjektet mitt?", a: "Zaynab leder hvert oppdrag, fra strategi og kreativ retning til din primære kontaktperson gjennom hele prosessen. Avhengig av omfang trekker vi inn nøye utvalgte samarbeidspartnere på design og utvikling. Kvaliteten og omsorgen for arbeidet er den samme, uansett prosjektets størrelse." },
  { q: "Hva trenger dere for å komme i gang?", a: "Vi starter med en klarhetssamtale der vi går gjennom dine konkrete behov. Deretter sender vi et tilpasset tilbud. Alt vi trenger for å starte er en signert avtale og et starthonorar. Så er vi i gang." },
  { q: "Hva skjer etter at arbeidet er levert?", a: "Arbeidet slutter ikke ved levering. Du får alle filer, dokumentasjon og en blåkopi av det vi har bygget sammen. Du eier det fullt og helt og kan fortsette med oss eller ta det med deg til et annet byrå. Ønsker du løpende støtte, finner vi en modell som passer." },
  { q: "Kan dere håndtere merkevare, design og utvikling?", a: "Ja. Vi leverer alle tre under ett tak. Narrativ, identitet, visuals og funksjonalitet henger sammen fra dag én, slik at resultatet blir ett sammenhengende uttrykk, ikke løse deler fra ulike leverandører." },
  { q: "Hvor lang tid tar et prosjekt?", a: "Det kommer an på omfanget. En tydelig leveranse kan gå raskt; en hel merkevare bygges i rolige steg. Vi avtaler tempo og milepæler før vi starter." },
  { q: "Kan jeg starte med bare én ting?", a: "Ja. Mange starter med én konkret leveranse, en merkevare, en side eller et budskap, og bygger videre derfra." },
  { q: "Hva er NUREA-metoden?", a: "Tre rolige steg: Klarhet, Uttrykk og Flyt. Fra uklarhet til et tydelig digitalt uttrykk som henger sammen." },
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
    <TestimonialsSection />
    <MethodSection />
    <KlarhetssjekkTeaser />
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
          Merkevare og digital retning. Trondheim, Norge.
        </p>
      </div>
      <nav className="flex flex-wrap gap-x-6 gap-y-2" style={{ fontFamily: "'Manrope','Inter',sans-serif", fontSize: 14 }}>
        <a href="/om-oss" className="opacity-80 hover:opacity-100 transition">Om</a>
        <a href="/#arbeider" className="opacity-80 hover:opacity-100 transition">Arbeider</a>
        <a href="/#tjenester" className="opacity-80 hover:opacity-100 transition">Tjenester</a>
        <a href="/metoden" className="opacity-80 hover:opacity-100 transition">Metoden</a>
        <a href="/klarhetssjekk" className="opacity-80 hover:opacity-100 transition">Klarhetssjekk</a>
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
