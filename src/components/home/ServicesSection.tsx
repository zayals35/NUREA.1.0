import { Link } from "react-router-dom";
import Reveal from "../Reveal";
import { SERVICES } from "../../data/services";
import { sound } from "../../lib/sound";

export default function ServicesSection() {
  return (
    <section className="bg-parchment-alt text-ink">
      <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-40">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-accent">Tjenester</p>
          <h2 className="display-sans mt-6 text-4xl md:text-6xl">Fem deler, én grunnmur.</h2>
          <p className="mt-6 max-w-[56ch] text-base leading-relaxed text-ink/70 md:text-lg">
            Dette er ikke løse produkter du kjøper. Det er ett system som gjør
            uklar digital tilstedeværelse om til klarhet, tillit og
            henvendelser, med merkevaren som første stein.
          </p>
        </Reveal>

        <div className="mt-16 border-t border-ink/10 md:mt-24">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} variant="fade-up" delay={i * 0.03}>
              <Link
                to={`/tjenester/${s.id}`}
                onClick={() => sound.play("click")}
                className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-4 border-b border-ink/10 py-8 transition-colors duration-300 hover:bg-ink/[0.03] md:grid-cols-[80px_1fr_1fr_auto] md:gap-8 md:py-10"
              >
                <span className="mono text-sm text-accent">{s.index}</span>
                <h3 className="display-sans text-3xl transition-transform duration-400 ease-out group-hover:translate-x-2 md:text-5xl">
                  {s.title}
                </h3>
                <p className="col-span-3 max-w-[46ch] text-sm leading-relaxed text-ink/70 md:col-span-1 md:text-base">
                  {s.description}
                </p>
                <span
                  aria-hidden="true"
                  className="hidden text-2xl text-ink/30 transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-accent md:block"
                >
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
