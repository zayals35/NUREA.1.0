import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import Button from "../components/Button";
import { RETAINERS, CONTENT_TIERS, PRICING_NOTE, type PriceTier } from "../data/pricing";

function TierList({ tiers }: { tiers: PriceTier[] }) {
  return (
    <div className="mt-12 grid gap-8 md:grid-cols-3">
      {tiers.map((t, i) => (
        <Reveal
          key={t.name}
          delay={i * 0.08}
          className={`flex flex-col rounded-2xl border p-8 md:p-10 ${
            t.featured
              ? "border-accent/40 bg-espresso text-cream shadow-[0_24px_60px_rgba(42,31,22,0.25)]"
              : "border-ink/10 bg-white/35 text-ink"
          }`}
        >
          {t.featured && <p className="eyebrow mb-4 text-gold-soft/90">Mest valgt</p>}
          <h3 className="display-sans text-2xl md:text-3xl">{t.name}</h3>
          <p className={`mt-4 text-sm leading-relaxed md:text-base ${t.featured ? "text-cream/70" : "text-ink/60"}`}>
            {t.tagline}
          </p>
          <ul className={`mt-6 flex flex-col gap-3 text-sm leading-relaxed ${t.featured ? "text-cream/80" : "text-ink/70"}`}>
            {t.points.map((p) => (
              <li key={p} className="flex gap-3">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {p}
              </li>
            ))}
          </ul>
          <div className={`mt-8 border-t pt-6 ${t.featured ? "border-cream/15" : "border-ink/10"}`}>
            <p className={`text-sm font-semibold ${t.featured ? "text-cream" : "text-ink"}`}>
              Pris tilpasses deg
            </p>
            <div className="mt-4">
              <Button to="/kontakt" variant={t.featured ? "primary" : "ghost-dark"} className="w-full">
                Be om et tilbud
              </Button>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export default function Priser() {
  return (
    <main>
      <PageHeader
        docTitle="Priser"
        eyebrow="Priser"
        title="Ingen prislister. Bare riktig nivå for deg."
        intro="Hver bedrift er ulik i størrelse, tempo og behov, så prisen settes alltid individuelt. Velg nivået som ligner mest, så former vi det rundt deg i en klarhetssamtale."
      />

      <section className="bg-parchment text-ink">
        <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-32">
          <Reveal>
            <p className="eyebrow text-accent">Retainer</p>
            <h2 className="display-sans mt-6 text-3xl md:text-5xl">Velg ditt nivå.</h2>
          </Reveal>
          <TierList tiers={RETAINERS} />

          <Reveal className="mt-24 md:mt-32">
            <p className="eyebrow text-accent">Innhold hver måned</p>
            <h2 className="display-sans mt-6 text-3xl md:text-5xl">Jevnt innhold, i din stil.</h2>
          </Reveal>
          <TierList tiers={CONTENT_TIERS} />

          <Reveal className="mx-auto mt-20 max-w-2xl text-center">
            <p className="text-base leading-relaxed text-ink/60 md:text-lg">{PRICING_NOTE}</p>
            <div className="mt-8">
              <Button to="/klarhetssjekk">Få din klarhetssjekk</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
