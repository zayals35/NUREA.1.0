import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import Button from "../components/Button";
import WordReveal from "../components/WordReveal";
import { useLang, type Lang } from "../i18n";

const T: Record<Lang, {
  docTitle: string;
  eyebrow: string;
  title: string;
  intro: string;
  statement: string;
  founderRole: string;
  how: string;
  traits: { h: string; p: string }[];
  body: string;
  cta: string;
}> = {
  no: {
    docTitle: "Om oss",
    eyebrow: "Om oss",
    title: "Bak Nurea.",
    intro:
      "Et lite studio med én tydelig retning: gjøre solide bedrifter lettere å forstå og lettere å velge.",
    statement:
      "Vi gjør bedriftens digitale tilstedeværelse lettere å forstå og lettere å velge.",
    founderRole: "Grunnlegger og din kontaktperson i hvert prosjekt",
    how: "Slik jobber vi",
    traits: [
      {
        h: "Rolig",
        p: "Vi overbeviser med presisjon, ikke volum. Ingen utropstegn, ingen superlativer.",
      },
      {
        h: "Trygg",
        p: "Klarhet og tillit er strategien. Vi viser retning og ro, ikke press.",
      },
      {
        h: "Presis",
        p: "Én ting av gangen, gjort riktig. Enkle ord foran fine ord, alltid.",
      },
    ],
    body: "NUREA holder til i Trondheim. Zaynab leder hvert oppdrag, fra strategi og kreativ retning til gjennomføring, og trekker inn nøye utvalgte samarbeidspartnere på design og utvikling når omfanget krever det. Kvaliteten og omsorgen for arbeidet er den samme, uansett prosjektets størrelse.",
    cta: "Få din klarhetssjekk",
  },
  en: {
    docTitle: "About",
    eyebrow: "About",
    title: "Behind Nurea.",
    intro:
      "A small studio with one clear direction: making solid businesses easier to understand and easier to choose.",
    statement:
      "We make your business's digital presence easier to understand and easier to choose.",
    founderRole: "Founder and your contact in every project",
    how: "How we work",
    traits: [
      {
        h: "Calm",
        p: "We convince with precision, not volume. No exclamation marks, no superlatives.",
      },
      {
        h: "Steady",
        p: "Clarity and trust are the strategy. We show direction and calm, not pressure.",
      },
      {
        h: "Precise",
        p: "One thing at a time, done right. Simple words before fancy words, always.",
      },
    ],
    body: "NUREA is based in Trondheim, Norway. Zaynab leads every engagement, from strategy and creative direction to delivery, and brings in carefully chosen partners for design and development when the scope calls for it. The quality and care in the work are the same, whatever the size of the project.",
    cta: "Get your clarity check",
  },
};

/** The studio on paper: the reading statement, the founder line, three traits on ink rules. */
export default function OmOss() {
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
        <div className="mx-auto max-w-[1440px] px-5 pb-20 pt-4 md:px-10 md:pb-28 md:pt-8">
          <WordReveal
            key={lang}
            brightColor="#201d1d"
            dimColor="rgba(32, 29, 29, 0.22)"
            className="display-sans max-w-4xl text-2xl leading-[1.2] sm:text-3xl md:text-5xl"
            text={t.statement}
          />
          <Reveal className="mt-12 flex items-center gap-4" delay={0.1}>
            <span
              aria-hidden="true"
              className="voice flex h-14 w-14 items-center justify-center rounded-full bg-accent text-2xl text-parchment"
            >
              Z
            </span>
            <span>
              <span className="display-sans block text-xl">Zaynab</span>
              <span className="block text-sm text-ink/70">{t.founderRole}</span>
            </span>
          </Reveal>
        </div>
      </section>

      <section className="bg-parchment-alt text-ink">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-32">
          <Reveal>
            <p className="eyebrow text-accent">{t.how}</p>
          </Reveal>
          <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
            {t.traits.map((trait, i) => (
              <Reveal key={trait.h} delay={i * 0.1} className="border-t-2 border-ink pt-6">
                <h2 className="display-sans text-3xl md:text-4xl">{trait.h}</h2>
                <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-ink/70 md:text-base">
                  {trait.p}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-24 max-w-3xl">
            <p className="text-base leading-relaxed text-ink/75 md:text-lg">{t.body}</p>
            <div className="mt-10">
              <Button to={p("/klarhetssjekk")}>{t.cta}</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
