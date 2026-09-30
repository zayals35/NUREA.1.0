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
      "Vi gjør bedriftens digitale tilstedeværelse lettere å forstå og lettere å velge.",
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
      "We make your business's digital presence easier to understand and easier to choose.",
    cta: "Get your clarity check",
  },
};

/** The method on paper: three red poster numbers, then the four start steps on ink rules. */
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

      <section className="bg-parchment text-ink">
        <div className="mx-auto max-w-[1440px] px-5 pb-20 pt-4 md:px-10 md:pb-32 md:pt-8">
          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {METHOD_STEPS[lang].map((s, i) => (
              <Reveal key={s.h} delay={i * 0.1}>
                <span className="poster block text-5xl text-accent md:text-7xl">{s.n}</span>
                <h2 className="display-sans mt-5 text-3xl md:text-4xl">{s.h}</h2>
                <p className="mt-3 max-w-[36ch] text-sm leading-relaxed text-ink/70 md:text-base">
                  {s.p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-parchment-alt text-ink">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-32">
          <Reveal>
            <p className="eyebrow text-accent">{t.process}</p>
            <h2 className="poster mt-6 text-[clamp(2.6rem,9vw,7rem)]">{t.start}</h2>
          </Reveal>
          <div className="mt-14 grid gap-10 border-t-2 border-ink pt-10 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            {WEEK_STEPS[lang].map((w, i) => (
              <Reveal key={w.n} delay={i * 0.08}>
                <span className="eyebrow text-accent">{w.n}</span>
                <h3 className="display-sans mt-3 text-2xl md:text-3xl">{w.h}</h3>
                <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-ink/70 md:text-base">
                  {w.p}
                </p>
              </Reveal>
            ))}
          </div>

          <div className="mt-24 max-w-3xl md:mt-32">
            <WordReveal
              key={lang}
              brightColor="#201d1d"
              dimColor="rgba(32, 29, 29, 0.22)"
              className="display-sans text-2xl leading-[1.2] sm:text-3xl md:text-4xl"
              text={t.statement}
            />
          </div>

          <Reveal className="mt-12">
            <Button to={p("/klarhetssjekk")}>{t.cta}</Button>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
