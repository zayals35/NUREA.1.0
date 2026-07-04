import { Link } from "react-router-dom";
import Reveal from "../Reveal";
import MediaReveal from "../MediaReveal";
import { WORK } from "../../data/work";
import { sound } from "../../lib/sound";

export default function WorkSection() {
  return (
    <section className="bg-parchment text-ink">
      <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-40">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-accent">Arbeider</p>
            <h2 className="display mt-6 text-4xl md:text-6xl">Utvalgte arbeider</h2>
          </div>
          <Link
            to="/arbeider"
            onClick={() => sound.play("click")}
            className="link-line pb-2 text-sm font-semibold"
          >
            Se alle arbeider
          </Link>
        </Reveal>

        <div className="mt-16 grid gap-x-10 gap-y-20 md:mt-24 md:grid-cols-2">
          {WORK.map((w, i) => (
            <Reveal
              key={w.id}
              variant="fade-up"
              delay={i % 2 === 1 ? 0.12 : 0}
              className={i % 2 === 1 ? "md:mt-24" : ""}
            >
              <Link
                to="/arbeider"
                onClick={() => sound.play("click")}
                className="group block"
                onMouseEnter={() => sound.play("hover")}
              >
                <MediaReveal
                  src={w.art}
                  alt={`${w.company}, ${w.title}`}
                  className="rounded-2xl"
                />
                <div className="mt-6 flex items-baseline justify-between gap-4">
                  <div>
                    <p className="eyebrow text-ink/50">{w.title}</p>
                    <h3 className="display mt-2 text-3xl md:text-4xl">{w.company}</h3>
                  </div>
                  <span className="mono hidden text-xs text-ink/40 md:block">{w.metricLabel}</span>
                </div>
                <p className="mt-3 max-w-[58ch] text-sm leading-relaxed text-ink/60 md:text-base">
                  {w.caption}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
