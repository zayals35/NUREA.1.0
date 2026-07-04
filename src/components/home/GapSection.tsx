import Reveal from "../Reveal";
import CharReveal from "../CharReveal";

const STATEMENT = `Vi tetter gapet. Mellom det kunden forstår og det bedriften faktisk er. Klarhet og tillit lukker avstanden, steg for steg.

De fleste byråer selger tjenester. Vi selger klarhet. Resultatet er ikke en leveranse du legger i en skuff, men et digitalt uttrykk som henger sammen og gjør jobben for bedriften din.`;

const TRAITS = [
  { h: "Rolig", p: "Vi overbeviser med presisjon, ikke volum." },
  { h: "Trygg", p: "Klarhet og tillit er strategien, ikke press." },
  { h: "Presis", p: "Én ting av gangen, gjort riktig." },
];

/**
 * The "Vi tetter gapet" statement moment: left rail with the three working
 * principles, right char-by-char scroll-revealed statement + signature.
 */
export default function GapSection() {
  return (
    <section className="grain relative overflow-hidden bg-espresso text-cream">
      <div className="relative z-[2] mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-40">
        <div className="grid gap-14 md:grid-cols-[minmax(220px,1fr)_2.3fr] md:gap-20">
          {/* Left rail */}
          <Reveal className="flex flex-row flex-wrap gap-10 md:flex-col md:gap-12" stagger={0.1}>
            <p className="eyebrow w-full text-gold md:w-auto">02 · Vi tetter gapet</p>
            {TRAITS.map((t) => (
              <div key={t.h}>
                <span className="display-sans block text-2xl text-cream md:text-3xl">{t.h}</span>
                <span className="mt-2 block max-w-[24ch] text-xs leading-snug text-cream/70 md:text-sm">
                  {t.p}
                </span>
              </div>
            ))}
          </Reveal>

          {/* Statement */}
          <div>
            <CharReveal
              className="display-sans text-[27px] leading-[1.14] sm:text-3xl md:text-5xl md:leading-[1.12]"
              text={STATEMENT}
            />
            <Reveal className="mt-12 flex items-center gap-4" delay={0.1} sfx>
              <span
                aria-hidden="true"
                className="display flex h-12 w-12 items-center justify-center rounded-full border border-accent/50 bg-accent/15 text-lg text-cream"
              >
                Z
              </span>
              <span>
                <span className="block text-sm font-semibold text-cream">Zaynab</span>
                <span className="block text-sm text-cream/70">Grunnlegger, NUREA</span>
              </span>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
