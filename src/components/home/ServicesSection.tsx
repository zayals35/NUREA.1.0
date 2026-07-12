import { Link } from "react-router-dom";
import Reveal from "../Reveal";
import { SERVICES } from "../../data/services";
import { sound } from "../../lib/sound";

export default function ServicesSection() {
  return (
    <section className="grain relative overflow-hidden bg-espresso text-cream">
      <div className="relative z-[2] mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-36">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-gold">Dette gjør vi</p>
            <h2 className="display mt-6 text-4xl md:text-6xl">Fem deler, én retning.</h2>
          </div>
          <Link
            to="/tjenester"
            onClick={() => sound.play("click")}
            className="link-line pb-2 text-sm font-semibold text-cream/70 hover:text-cream"
          >
            Se alle tjenester
          </Link>
        </Reveal>

        <div className="mt-14 border-t border-cream/12 md:mt-20">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} variant="fade-up" delay={i * 0.03}>
              <Link
                to={`/tjenester/${s.id}`}
                onClick={() => sound.play("click")}
                className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-4 border-b border-cream/12 py-8 transition-colors duration-300 hover:bg-cream/[0.04] md:grid-cols-[80px_1fr_1fr_auto] md:gap-8 md:py-10"
              >
                <span className="mono text-sm text-gold">{s.index}</span>
                <h3 className="display-sans text-3xl transition-transform duration-400 ease-out group-hover:translate-x-2 md:text-5xl">
                  {s.title}
                </h3>
                <p className="col-span-3 max-w-[46ch] text-sm leading-relaxed text-cream/70 md:col-span-1 md:text-base">
                  {s.description}
                </p>
                <span
                  aria-hidden="true"
                  className="hidden text-2xl text-cream/30 transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-gold md:block"
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
