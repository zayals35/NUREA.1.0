import Reveal from "../Reveal";
import Button from "../Button";

const CHECKS = [
  { n: "3", label: "ting som fungerer" },
  { n: "3", label: "ting som svekker tillit" },
  { n: "1", label: "konkret forbedring" },
];

/** The primary conversion anchor: dark, cinematic, one dominant CTA. */
export default function OfferSection() {
  return (
    <section className="grain relative overflow-hidden bg-espresso-deep text-cream">
      <div className="ambient" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="relative z-[2] mx-auto max-w-[1440px] px-6 py-28 text-center md:px-10 md:py-44">
        <Reveal sfx>
          <p className="eyebrow text-gold-soft/80">Gratis · uforpliktende</p>
          <h2 className="display mx-auto mt-8 max-w-4xl text-4xl sm:text-5xl md:text-7xl">
            Gratis digital klarhetssjekk.
          </h2>
          <p className="mx-auto mt-8 max-w-[52ch] text-base leading-relaxed text-cream/70 md:text-lg">
            Send inn nettsiden din. Du får en kort vurdering du kan bruke med
            en gang, denne uken.
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-14 flex max-w-2xl justify-center gap-10 md:gap-16" stagger={0.1}>
          {CHECKS.map((c, i) => (
            <div key={i}>
              <span className="display block text-5xl text-accent md:text-7xl">{c.n}</span>
              <span className="mt-2 block max-w-[14ch] text-xs leading-snug text-cream/55 md:text-sm">
                {c.label}
              </span>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-14" delay={0.15}>
          <Button to="/klarhetssjekk" className="px-10 py-5 text-base">
            Få din klarhetssjekk
          </Button>
          <p className="mt-6 text-xs text-cream/40">
            Vi ser på førsteinntrykk, tydelighet, tillit, mobilopplevelse, CTA
            og kontaktflyt.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
