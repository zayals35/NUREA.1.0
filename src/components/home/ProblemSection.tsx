import Reveal from "../Reveal";
import CharReveal from "../CharReveal";

const STATEMENT = `Solide bedrifter taper ikke kunder fordi de mangler verdi. De taper kunder fordi verdien ikke blir forstått raskt nok.`;

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
            className="display-sans text-[28px] leading-[1.14] sm:text-3xl md:text-5xl md:leading-[1.12]"
            text={STATEMENT}
          />
        </div>
      </div>
    </section>
  );
}
