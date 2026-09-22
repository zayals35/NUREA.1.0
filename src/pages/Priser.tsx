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
  featured: string;
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
    featured: "Mest valgt",
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
    featured: "Most chosen",
    quote: "Talk through scope",
    offers: "Offers",
    offerHeading: "Three offers, one promise.",
    cta: "Get your clarity check",
  },
};

function TierList({ tiers, t, contactPath }: { tiers: PriceTier[]; t: (typeof T)["no"]; contactPath: string }) {
  return (
    <div className="mt-12 grid gap-8 md:grid-cols-3">
      {tiers.map((tier, i) => (
        <Reveal
          key={tier.name}
          delay={i * 0.08}
          className={`flex flex-col rounded-2xl border p-8 md:p-10 ${
            tier.featured
              ? "border-accent/40 bg-espresso text-cream shadow-[0_24px_60px_rgba(42,31,22,0.25)]"
              : "border-ink/10 bg-white/35 text-ink"
          }`}
        >
          {tier.featured && <p className="eyebrow mb-4 text-gold-soft/90">{t.featured}</p>}
          <h3 className="display-sans text-2xl md:text-3xl">{tier.name}</h3>
          <p className={`mt-4 text-sm leading-relaxed md:text-base ${tier.featured ? "text-cream/70" : "text-ink/60"}`}>
            {tier.tagline}
          </p>
          <ul className={`mt-6 flex flex-col gap-3 text-sm leading-relaxed ${tier.featured ? "text-cream/80" : "text-ink/70"}`}>
            {tier.points.map((point) => (
              <li key={point} className="flex gap-3">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {point}
              </li>
            ))}
          </ul>
          <div className={`mt-8 border-t pt-6 ${tier.featured ? "border-cream/15" : "border-ink/10"}`}>
            <div>
              <Button to={contactPath} variant={tier.featured ? "primary" : "ghost-dark"} className="w-full">
                {t.quote}
              </Button>
            </div>
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
        <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-32">
          <Reveal>
            <p className="eyebrow text-accent">{t.offers}</p>
            <h2 className="display-sans mt-6 text-3xl md:text-5xl">{t.offerHeading}</h2>
          </Reveal>
          <TierList tiers={OFFER_PRICING[lang]} t={t} contactPath={p("/kontakt")} />

          <Reveal className="mx-auto mt-20 max-w-2xl text-center">
            <p className="text-base leading-relaxed text-ink/60 md:text-lg">{PRICING_NOTE[lang]}</p>
            <div className="mt-8">
              <Button to={p("/klarhetssjekk")}>{t.cta}</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
