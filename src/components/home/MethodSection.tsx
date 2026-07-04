import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/motion";
import Reveal from "../Reveal";
import { METHOD_STEPS, WEEK_STEPS } from "../../data/method";
import { sound } from "../../lib/sound";

export default function MethodSection() {
  const weeksRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: pinned step-through. The line draws and each week lights up
      // in sequence while the block holds, then releases.
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const steps = gsap.utils.toArray<HTMLElement>(".week-step");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: weeksRef.current,
            start: "top 22%",
            end: "+=130%",
            pin: true,
            scrub: 0.5,
          },
        });
        tl.fromTo(
          ".method-line",
          { scaleX: 0 },
          { scaleX: 1, ease: "none", transformOrigin: "left center", duration: steps.length },
          0
        );
        steps.forEach((step, i) => {
          tl.fromTo(step, { autoAlpha: 0.18, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.8 }, i * 0.9);
        });
      });

      // Mobile and reduced motion: simple line draw, steps stay readable.
      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
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
      });
    },
    { scope: weeksRef }
  );

  return (
    <section className="grain relative overflow-hidden bg-espresso text-cream">
      <div className="relative z-[2] mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-40">
        <Reveal className="max-w-2xl" sfx>
          <p className="eyebrow text-gold">Metoden</p>
          <h2 className="display mt-6 text-4xl md:text-6xl">Tre rolige steg.</h2>
          <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-cream/65 md:text-lg">
            Fra uklarhet til et tydelig digitalt uttrykk som henger sammen.
          </p>
        </Reveal>

        {/* Klarhet / Uttrykk / Flyt */}
        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-3 md:gap-8">
          {METHOD_STEPS.map((s, i) => (
            <Reveal key={s.h} delay={i * 0.1}>
              <span className="mono text-sm text-accent">{s.n}</span>
              <h3 className="display mt-4 text-3xl md:text-4xl">{s.h}</h3>
              <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-cream/60 md:text-base">
                {s.p}
              </p>
            </Reveal>
          ))}
        </div>

        {/* De første 30 dagene: pinned sequence on desktop */}
        <div ref={weeksRef} className="mt-24 md:mt-36">
          <h3 className="display text-2xl text-cream/90 md:text-3xl">De første 30 dagene</h3>
          <div className="relative mt-10">
            <div className="absolute left-0 top-0 h-px w-full bg-cream/10" />
            <div className="method-line absolute left-0 top-0 h-px w-full bg-accent" style={{ transform: "scaleX(0)" }} />
            <div className="grid gap-10 pt-10 md:grid-cols-4 md:gap-8">
              {WEEK_STEPS.map((w) => (
                <div key={w.n} className="week-step">
                  <span className="eyebrow text-cream/40">{w.n}</span>
                  <h4 className="display mt-3 text-xl text-cream md:text-2xl">{w.h}</h4>
                  <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-cream/55">{w.p}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-14">
            <Link
              to="/metoden"
              onClick={() => sound.play("click")}
              className="link-line text-sm font-semibold text-cream/70 hover:text-cream"
            >
              Se hele metoden
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
