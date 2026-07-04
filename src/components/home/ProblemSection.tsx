import Reveal from "../Reveal";
import CharReveal from "../CharReveal";

const STATEMENT = `Solide bedrifter taper ikke kunder fordi de mangler verdi. De taper kunder fordi verdien ikke blir forstått raskt nok.`;

const CLIENTS = ["Metanoia", "Bilmekka", "Møre Marin", "Moustache City", "NUE"];

/** The problem beat, one line, straight after the hero. */
export default function ProblemSection() {
  return (
    <section className="grain relative overflow-hidden bg-espresso text-cream">
      <div className="relative z-[2] mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-36">
        <div className="grid gap-14 md:grid-cols-[minmax(200px,1fr)_2.3fr] md:gap-20">
          <Reveal>
            <p className="eyebrow text-gold">Problemet</p>
          </Reveal>
          <CharReveal
            className="display text-[28px] leading-[1.14] sm:text-3xl md:text-5xl md:leading-[1.12]"
            text={STATEMENT}
          />
        </div>

        {/* Trust early */}
        <div className="mt-20 grid gap-8 border-t border-cream/10 pt-10 md:mt-24 md:grid-cols-[minmax(200px,1fr)_2.3fr] md:gap-20 md:pt-12">
          <Reveal>
            <p className="eyebrow text-cream/50">Merker vi har jobbet med</p>
          </Reveal>
          <Reveal className="flex flex-wrap items-baseline gap-x-10 gap-y-5 md:gap-x-14" stagger={0.07}>
            {CLIENTS.map((name) => (
              <span
                key={name}
                className="display cursor-default text-2xl text-cream/45 transition-[color,transform] duration-300 hover:-translate-y-1 hover:text-cream md:text-4xl"
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
