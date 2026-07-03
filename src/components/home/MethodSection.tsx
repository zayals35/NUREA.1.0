import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "../../lib/motion";
import Reveal from "../Reveal";
import { METHOD_STEPS, WEEK_STEPS } from "../../data/method";
import { sound } from "../../lib/sound";

export default function MethodSection() {
  const weeksRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // Progress line draws as the weeks scroll through view.
      gsap.fromTo(
        ".method-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: weeksRef.current,
            start: "top 80%",
            end: "bottom 55%",
            scrub: 0.5,
          },
        }
      );
    },
    { scope: weeksRef }
  );

  return (
    <section className="grain relative overflow-hidden bg-espresso text-cream">
      <div className="relative z-[2] mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-40">
        <Reveal className="max-w-2xl" sfx>
          <p className="eyebrow text-accent">Metoden</p>
          <h2 className="display mt-6 text-4xl md:text-6xl">Tre rolige steg.</h2>
          <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-cream/65 md:text-lg">
            Fra uklarhet til et tydelig digitalt uttrykk som henger sammen.
          </p>
        </Reveal>

        {/* Klarhet / Uttrykk / Flyt */}
        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-3 md:gap-8">
          {METHOD_STEPS.map((s, i) => (
            <Reveal key={s.h} delay={i * 0.1}>
              <span className="text-sm font-semibold text-accent">{s.n}</span>
              <h3 className="display mt-4 text-3xl md:text-4xl">{s.h}</h3>
              <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-cream/60 md:text-base">
                {s.p}
              </p>
            </Reveal>
          ))}
        </div>

        {/* De første 30 dagene */}
        <div ref={weeksRef} className="mt-24 md:mt-36">
          <Reveal>
            <h3 className="display text-2xl text-cream/90 md:text-3xl">De første 30 dagene</h3>
          </Reveal>
          <div className="relative mt-10">
            <div className="absolute left-0 top-0 hidden h-px w-full bg-cream/10 md:block" />
            <div className="method-line absolute left-0 top-0 hidden h-px w-full bg-accent md:block" />
            <div className="grid gap-10 md:grid-cols-4 md:gap-8 md:pt-10">
              {WEEK_STEPS.map((w, i) => (
                <Reveal key={w.n} delay={i * 0.08}>
                  <span className="eyebrow text-cream/40">{w.n}</span>
                  <h4 className="display mt-3 text-xl text-cream md:text-2xl">{w.h}</h4>
                  <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-cream/55">{w.p}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal className="mt-14">
            <Link
              to="/metoden"
              onClick={() => sound.play("click")}
              className="link-line text-sm font-semibold text-cream/70 hover:text-cream"
            >
              Se hele metoden
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
