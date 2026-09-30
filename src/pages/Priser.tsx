import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import Button from "../components/Button";
import { OFFER_PRICING, PRICING_NOTE, type PriceTier } from "../data/pricing";
import { useLang, type Lang } from "../i18n";

const T: Record<Lang, {
  docTitle: string;
  eyebrow: string;
  title: string;
  intro: string;
  quote: string;
  offers: string;
  offerHeading: string;
  cta: string;
}> = {
  no: {
    docTitle: "Priser",
    eyebrow: "Priser",
    title: "Ingen prislister. Bare riktig nivå for deg.",
    intro:
      "Vi viser ikke priser i en liste. Omfang og pris settes i en klarhetssamtale, ut fra det du faktisk trenger.",
    quote: "Snakk om omfang",
    offers: "Tilbud",
    offerHeading: "Tre tilbud, ett løfte.",
    cta: "Få din klarhetssjekk",
  },
  en: {
    docTitle: "Pricing",
    eyebrow: "Pricing",
    title: "No price lists. Just the right level for you.",
    intro:
      "We do not show prices in a list. Scope and price are set in a clarity conversation, based on what you actually need.",
    quote: "Talk through scope",
    offers: "Offers",
    offerHeading: "Three offers, one promise.",
    cta: "Get your clarity check",
  },
};

/** Three equal paper cards, square, ink rule on top, no card raised above the others. */
function TierList({ tiers, t, contactPath }: { tiers: PriceTier[]; t: (typeof T)["no"]; contactPath: string }) {
  return (
    <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
      {tiers.map((tier, i) => (
        <Reveal
          key={tier.name}
          delay={i * 0.08}
          className="flex flex-col border border-ink bg-parchment-alt p-7 md:p-9"
        >
          <h3 className="display-sans text-2xl md:text-3xl">{tier.name}</h3>
          <p className="voice mt-3 text-xl text-ink md:text-2xl">{tier.tagline}</p>
          <ul className="mt-6 flex flex-col gap-3 text-sm leading-relaxed text-ink/75 md:text-base">
            {tier.points.map((point) => (
              <li key={point} className="flex gap-3">
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-auto border-t border-ink/20 pt-6">
            {tier.note ? (
              <p className="mono text-[11px] tracking-[0.14em] text-accent">{tier.note}</p>
            ) : (
              <Button to={contactPath} variant="ghost-dark">
                {t.quote}
              </Button>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export default function Priser() {
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
          <Reveal>
            <p className="eyebrow text-accent">{t.offers}</p>
            <h2 className="poster mt-6 text-[clamp(2.6rem,9vw,7rem)]">{t.offerHeading}</h2>
          </Reveal>
          <TierList tiers={OFFER_PRICING[lang]} t={t} contactPath={p("/kontakt")} />

          <Reveal className="mt-24 border-t-2 border-ink pt-12 md:mt-32 md:pt-16">
            <p className="voice max-w-[30ch] text-2xl text-ink md:text-4xl">{PRICING_NOTE[lang]}</p>
            <div className="mt-8">
              <Button to={p("/klarhetssjekk")}>{t.cta}</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
