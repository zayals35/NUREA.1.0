import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "../../lib/motion";
import Button from "../Button";

/**
 * Text-first cinematic hero: ambient CSS gradient + warm grain, mission line
 * centered, giant wordmark anchored at the bottom. No images block paint.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // Wordmark drifts down and softens as you scroll past the hero.
      gsap.to(".hero-mark", {
        yPercent: 24,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="grain relative flex min-h-svh flex-col overflow-hidden bg-espresso text-cream"
    >
      <div className="ambient" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      {/* Mission line */}
      <div className="relative z-[2] flex flex-1 flex-col items-center justify-center px-6 pt-24 text-center">
        <p className="hero-seq eyebrow text-cream/60" style={{ animationDelay: "1.0s" }}>
          Merkevare og digital retning · Trondheim
        </p>
        <h1
          className="hero-seq display mt-8 text-[9.6vw] leading-[1.05] sm:text-6xl md:text-7xl lg:text-8xl"
          style={{ animationDelay: "1.15s" }}
        >
          Lettere å forstå.
          <br />
          Lettere å velge.
        </h1>
        <p
          className="hero-seq mx-auto mt-8 max-w-[46ch] text-base leading-relaxed text-cream/70 md:text-lg"
          style={{ animationDelay: "1.3s" }}
        >
          Merkevare, nettsider, innhold og systemer, samlet i én tydelig retning.
        </p>
        <div
          className="hero-seq mt-10 flex flex-wrap items-center justify-center gap-4"
          style={{ animationDelay: "1.45s" }}
        >
          <Button to="/klarhetssjekk">Få din klarhetssjekk</Button>
          <Button to="/arbeider" variant="ghost">
            Se arbeider
          </Button>
        </div>
      </div>

      {/* Giant wordmark anchored at the bottom */}
      <div
        className="hero-mark relative z-[1] flex select-none justify-center overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="hero-seq display block whitespace-nowrap text-[26vw] leading-[0.78] tracking-[-0.04em] text-cream/[0.96] md:text-[23.5vw]"
          style={{ animationDelay: "1.55s", animationDuration: "1.1s" }}
        >
          NUREA
        </span>
      </div>

      <style>{`
        .hero-seq {
          animation: hero-rise 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes hero-rise {
          from { opacity: 0; transform: translateY(34px); }
          to { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-seq { animation: none; }
        }
      `}</style>
    </section>
  );
}
