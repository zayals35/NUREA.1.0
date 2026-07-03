import Reveal from "../Reveal";
import WordReveal from "../WordReveal";

const FOUNDER_TEXT =
  "De fleste byråer selger tjenester. Vi selger *klarhet.* Resultatet er ikke en leveranse du betaler for og legger i en skuff. Det er et digitalt uttrykk som *henger* *sammen,* og som faktisk gjør jobben for bedriften din.";

const STATS = [
  { n: "5", label: "merker bygget fra grunnen" },
  { n: "30", label: "dager til første løft" },
  { n: "1", label: "kontaktperson hele veien" },
];

export default function Positioning() {
  return (
    <section className="grain relative overflow-hidden bg-espresso text-cream">
      <div className="relative z-[2] mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-40">
        {/* The gap statement */}
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-accent">Hvorfor NUREA</p>
        </Reveal>
        <WordReveal
          className="display mt-8 max-w-4xl text-3xl sm:text-4xl md:text-6xl"
          text="Solide bedrifter taper ikke kunder fordi de mangler verdi. De taper kunder fordi verdien *ikke* *blir* *forstått* *raskt* *nok.*"
        />
        <Reveal className="mt-10 max-w-2xl" delay={0.1}>
          <p className="text-base leading-relaxed text-cream/70 md:text-lg">
            Vi tetter gapet. Mellom det kunden forstår og det bedriften faktisk
            er. Klarhet og tillit lukker avstanden, steg for steg.
          </p>
        </Reveal>

        {/* Stats */}
        <Reveal
          className="mt-20 grid max-w-3xl grid-cols-3 gap-8 border-t border-cream/10 pt-10"
          stagger={0.1}
          sfx
        >
          {STATS.map((s) => (
            <div key={s.label}>
              <span className="display block text-4xl text-cream md:text-6xl">{s.n}</span>
              <span className="mt-2 block max-w-[18ch] text-xs leading-snug text-cream/50 md:text-sm">
                {s.label}
              </span>
            </div>
          ))}
        </Reveal>

        {/* Founder statement */}
        <div className="mt-24 max-w-3xl md:ml-auto md:mt-40">
          <WordReveal
            className="display text-2xl leading-[1.15] sm:text-3xl md:text-4xl"
            text={FOUNDER_TEXT}
          />
          <Reveal className="mt-10 flex items-center gap-4" delay={0.15}>
            <span
              aria-hidden="true"
              className="display flex h-14 w-14 items-center justify-center rounded-full border border-accent/50 bg-accent/15 text-xl text-cream"
            >
              Z
            </span>
            <span>
              <span className="block font-semibold text-cream">Zaynab</span>
              <span className="block text-sm text-cream/50">Grunnlegger, NUREA</span>
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
