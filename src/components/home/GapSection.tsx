import Reveal from "../Reveal";
import CharReveal from "../CharReveal";
import { sound } from "../../lib/sound";

const STATEMENT = `Solide bedrifter taper ikke kunder fordi de mangler verdi. De taper kunder fordi verdien ikke blir forstått raskt nok.

Vi tetter gapet. Mellom det kunden forstår og det bedriften faktisk er. Klarhet og tillit lukker avstanden, steg for steg.`;

const STATS = [
  { n: "5+", label: "merker bygget fra grunnen, fra identitet til nettside" },
  { n: "30", label: "dager til første løft med metoden vår" },
  { n: "1", label: "kontaktperson gjennom hele prosessen" },
];

const CLIENTS = ["Metanoia", "Bilmekka", "Møre Marin", "Moustache City", "NUE"];

/**
 * The "Vi tetter gapet" moment, in Monolog's problems-section layout: left
 * stats rail, right scroll-revealed statement + signature, brands divider
 * inside the same section.
 */
export default function GapSection() {
  return (
    <section className="grain relative overflow-hidden bg-espresso text-cream">
      <div className="relative z-[2] mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-40">
        <div className="grid gap-14 md:grid-cols-[minmax(220px,1fr)_2.3fr] md:gap-20">
          {/* Left rail */}
          <Reveal className="flex flex-row flex-wrap gap-10 md:flex-col md:gap-14" stagger={0.1}>
            <p className="eyebrow w-full text-gold md:w-auto">01 · Hvorfor NUREA</p>
            {STATS.map((s) => (
              <div key={s.label}>
                <span className="mono block text-3xl text-cream md:text-4xl">{s.n}</span>
                <span className="mt-2 block max-w-[22ch] text-xs leading-snug text-cream/50 md:text-sm">
                  {s.label}
                </span>
              </div>
            ))}
          </Reveal>

          {/* Statement */}
          <div>
            <CharReveal
              className="display text-[27px] leading-[1.12] sm:text-3xl md:text-5xl md:leading-[1.1]"
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
                <span className="block text-sm text-cream/50">Grunnlegger, NUREA</span>
              </span>
            </Reveal>
          </div>
        </div>

        {/* Brands divider, inside the same section like the reference */}
        <div className="mt-20 grid gap-8 border-t border-cream/10 pt-10 md:mt-28 md:grid-cols-[minmax(220px,1fr)_2.3fr] md:gap-20 md:pt-12">
          <Reveal>
            <p className="eyebrow text-cream/50">Merker vi har jobbet med</p>
          </Reveal>
          <Reveal
            className="flex flex-wrap items-baseline gap-x-10 gap-y-5 md:gap-x-14"
            stagger={0.07}
          >
            {CLIENTS.map((name) => (
              <span
                key={name}
                onMouseEnter={() => sound.play("hover")}
                className="display cursor-default text-xl text-cream/40 transition-[color,transform] duration-300 hover:-translate-y-1 hover:text-cream md:text-3xl"
              >
                {name}
              </span>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
