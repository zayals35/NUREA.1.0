import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import Button from "../components/Button";
import WordReveal from "../components/WordReveal";
import { METHOD_STEPS, WEEK_STEPS } from "../data/method";
import { useLang, type Lang } from "../i18n";

const T: Record<Lang, {
  docTitle: string;
  eyebrow: string;
  title: string;
  intro: string;
  process: string;
  start: string;
  statement: string;
  cta: string;
}> = {
  no: {
    docTitle: "Metoden",
    eyebrow: "Metoden",
    title: "Tre rolige steg: Klarhet, Uttrykk og Flyt.",
    intro:
      "Fra uklarhet til et tydelig digitalt uttrykk som henger sammen. Ingen støy, ingen hastverk, bare riktig rekkefølge.",
    process: "Prosessen",
    start: "Slik starter vi.",
    statement:
      "Vi bygger merkevare, nettside, innhold og systemer som *ett* *system.* Ikke løse produkter.",
    cta: "Få din klarhetssjekk",
  },
  en: {
    docTitle: "Method",
    eyebrow: "The method",
    title: "Three calm steps: Clarity, Expression and Flow.",
    intro:
      "From unclear to a clear digital expression that holds together. No noise, no rush, just the right order.",
    process: "The process",
    start: "How we start.",
    statement:
      "We build brand, website, content and systems as *one* *system.* Not loose products.",
    cta: "Get your clarity check",
  },
};

export default function Metoden() {
  const { lang, p } = useLang();
  const t = T[lang];

  return (
    <main>
      <PageHeader
        docTitle={t.docTitle}
        eyebrow={t.eyebrow}
        title={t.title}
        intro={t.intro}
      />

      <section className="grain relative overflow-hidden bg-espresso text-cream">
        <div className="relative z-[2] mx-auto max-w-[1440px] px-6 pb-24 md:px-10 md:pb-36">
          <div className="grid gap-16 md:grid-cols-3 md:gap-10">
            {METHOD_STEPS[lang].map((s, i) => (
              <Reveal key={s.h} delay={i * 0.12}>
                <span className="display-sans text-6xl text-accent/60 md:text-7xl">{s.n}</span>
                <h2 className="display-sans mt-6 text-3xl md:text-4xl">{s.h}</h2>
                <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-cream/75 md:text-base">
                  {s.p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-parchment text-ink">
        <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-32">
          <Reveal>
            <p className="eyebrow text-accent">{t.process}</p>
            <h2 className="display-sans mt-6 text-4xl md:text-6xl">{t.start}</h2>
          </Reveal>
          <div className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
            {WEEK_STEPS[lang].map((w, i) => (
              <Reveal key={w.n} delay={i * 0.08} className="border-t-2 border-accent/30 pt-6">
                <span className="eyebrow text-ink/40">{w.n}</span>
                <h3 className="display-sans mt-3 text-2xl md:text-3xl">{w.h}</h3>
                <p className="mt-4 max-w-[36ch] text-sm leading-relaxed text-ink/60 md:text-base">
                  {w.p}
                </p>
              </Reveal>
            ))}
          </div>

          <div className="mt-24 max-w-3xl md:mt-32">
            <WordReveal
              key={lang}
              brightColor="#1a1714"
              dimColor="rgba(26, 23, 20, 0.22)"
              className="display-sans text-2xl leading-[1.2] text-ink sm:text-3xl md:text-4xl"
              text={t.statement}
            />
          </div>

          <Reveal className="mt-16">
            <Button to={p("/klarhetssjekk")}>{t.cta}</Button>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
