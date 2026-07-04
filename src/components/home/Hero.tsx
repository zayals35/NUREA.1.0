import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "../../lib/motion";
import { useVelocitySkew } from "../../lib/useVelocitySkew";
import Button from "../Button";
import HalftoneFog from "../HalftoneFog";

/**
 * Text-first cinematic hero: halftone fog + warm grain, mission line
 * centered, giant signature wordmark anchored at the bottom. On scroll the
 * mission drifts up while the wordmark sinks under the next section.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const markRef = useRef<HTMLDivElement>(null);

  useVelocitySkew(markRef, 5);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // Exit choreography, scrubbed: content lifts and fades, wordmark sinks.
      gsap.to(".hero-content", {
        yPercent: -14,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "72% top", scrub: 0.4 },
      });
      gsap.to(".hero-mark", {
        yPercent: 30,
        scale: 1.04,
        opacity: 0.3,
        ease: "none",
        transformOrigin: "center bottom",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.5 },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="grain relative flex min-h-svh flex-col overflow-hidden bg-espresso text-cream"
    >
      <HalftoneFog amp={0.68} />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(16,14,11,0.6)_100%)]"
      />

      {/* Mission line */}
      <div className="hero-content relative z-[2] flex flex-1 flex-col items-center justify-center px-6 pt-24 text-center">
        <p className="hero-seq eyebrow text-cream/60" style={{ animationDelay: "1.0s" }}>
          Merkevare og digital retning · Trondheim
        </p>
        <h1
          className="hero-seq display mt-8 text-[10vw] leading-[1.08] sm:text-6xl md:text-7xl lg:text-8xl"
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

      {/* Giant signature wordmark anchored at the bottom */}
      <div
        ref={markRef}
        className="hero-mark relative z-[1] flex select-none justify-center overflow-hidden will-change-transform"
        aria-hidden="true"
      >
        <span
          className="hero-seq display block whitespace-nowrap pr-[0.06em] text-[27vw] leading-[1.02] text-cream/[0.96] md:text-[24vw]"
          style={{ animationDelay: "1.55s", animationDuration: "1.1s" }}
        >
          Nurea
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
