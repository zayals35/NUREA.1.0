import Reveal from "../Reveal";
import Button from "../Button";
import { useLang, type Lang } from "../../i18n";

const T: Record<Lang, {
  eyebrow: string;
  heading: string;
  sub: string;
  checks: { n: string; label: string }[];
  cta: string;
  note: string;
}> = {
  no: {
    eyebrow: "Gratis · uforpliktende",
    heading: "Gratis digital klarhetssjekk.",
    sub: "Send inn nettsiden din. Du får en kort vurdering du kan bruke med en gang, denne uken.",
    checks: [
      { n: "3", label: "ting som fungerer" },
      { n: "3", label: "ting som svekker tillit" },
      { n: "1", label: "konkret forbedring" },
    ],
    cta: "Få din klarhetssjekk",
    note: "Vi ser på førsteinntrykk, tydelighet, tillit, mobilopplevelse, CTA og kontaktflyt.",
  },
  en: {
    eyebrow: "Free · no obligations",
    heading: "Free digital clarity check.",
    sub: "Send us your website. You get a short assessment you can use right away, this week.",
    checks: [
      { n: "3", label: "things that work" },
      { n: "3", label: "things that weaken trust" },
      { n: "1", label: "concrete improvement" },
    ],
    cta: "Get your clarity check",
    note: "We look at first impression, clarity, trust, mobile experience, CTA and contact flow.",
  },
};

/**
 * The primary conversion anchor. Light greige: after the fog of the dark
 * sections, this is where the page itself reaches clarity, so the entry
 * offer lives in full daylight with one dominant CTA.
 */
export default function OfferSection() {
  const { lang, p } = useLang();
  const t = T[lang];
  return (
    <section className="grain relative overflow-hidden bg-parchment text-ink">
      <div className="ambient ambient-light" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="relative z-[2] mx-auto max-w-[1440px] px-6 py-28 text-center md:px-10 md:py-44">
        <Reveal sfx>
          <p className="eyebrow text-ink/70">{t.eyebrow}</p>
          <h2 className="display mx-auto mt-8 max-w-4xl text-4xl sm:text-5xl md:text-7xl">
            {t.heading}
          </h2>
          <p className="mx-auto mt-8 max-w-[52ch] text-base leading-relaxed text-ink/75 md:text-lg">
            {t.sub}
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-14 flex max-w-2xl justify-center gap-10 md:gap-16" stagger={0.1}>
          {t.checks.map((c, i) => (
            <div key={i}>
              <span className="mono block text-5xl text-accent md:text-6xl">{c.n}</span>
              <span className="mt-2 block max-w-[14ch] text-xs leading-snug text-ink/70 md:text-sm">
                {c.label}
              </span>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-14" delay={0.15}>
          <Button to={p("/klarhetssjekk")} className="px-10 py-5 text-base">
            {t.cta}
          </Button>
          <p className="mt-6 text-xs text-ink/70">{t.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
