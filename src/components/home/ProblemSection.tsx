import Reveal from "../Reveal";
import CharReveal from "../CharReveal";

const STATEMENT = `Solide bedrifter taper ikke kunder fordi de mangler verdi. De taper kunder fordi verdien ikke blir forstått raskt nok.`;

const TRAPS = [
  {
    n: "A",
    h: "Kampanjetenkning",
    p: "Troen på at vekst bare handler om flere annonser. Mer støy oppå et uklart fundament gir dyre klikk, ikke flere kunder.",
  },
  {
    n: "B",
    h: "Tilfeldig digital tilstedeværelse",
    p: "En solid bedrift, men uklar på nett. Logo ett sted, budskap et annet, og en nettside som ikke forteller det viktigste.",
  },
];

const CLIENTS = ["Metanoia", "Bilmekka", "Møre Marin", "Moustache City", "NUE"];

/** The problem beat, straight after the hero: what actually costs customers. */
export default function ProblemSection() {
  return (
    <section className="grain relative overflow-hidden bg-parchment text-ink">
      <div className="relative z-[2] mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-40">
        <div className="grid gap-14 md:grid-cols-[minmax(220px,1fr)_2.3fr] md:gap-20">
          <Reveal>
            <p className="eyebrow text-accent">01 · Problemet</p>
          </Reveal>
          <div>
            <CharReveal
              className="display-sans text-[27px] leading-[1.14] sm:text-3xl md:text-5xl md:leading-[1.12]"
              text={STATEMENT}
            />

            {/* The two traps */}
            <div className="mt-16 grid gap-10 border-t border-ink/10 pt-10 md:grid-cols-2 md:gap-14">
              {TRAPS.map((t, i) => (
                <Reveal key={t.h} delay={i * 0.1}>
                  <span className="mono text-sm text-accent">{t.n}</span>
                  <h3 className="display-sans mt-3 text-xl text-ink md:text-2xl">{t.h}</h3>
                  <p className="mt-3 max-w-[44ch] text-sm leading-relaxed text-ink/70 md:text-base">
                    {t.p}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Trust early: brands inside the same section */}
        <div className="mt-20 grid gap-8 border-t border-ink/10 pt-10 md:mt-28 md:grid-cols-[minmax(220px,1fr)_2.3fr] md:gap-20 md:pt-12">
          <Reveal>
            <p className="eyebrow text-ink/50">Merker vi har jobbet med</p>
          </Reveal>
          <Reveal
            className="flex flex-wrap items-baseline gap-x-10 gap-y-5 md:gap-x-14"
            stagger={0.07}
          >
            {CLIENTS.map((name) => (
              <span
                key={name}
                className="display-sans cursor-default text-xl text-ink/45 transition-[color,transform] duration-300 hover:-translate-y-1 hover:text-ink md:text-3xl"
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
