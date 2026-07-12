import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "../../lib/motion";
import Button from "../Button";
import HalftoneFog from "../HalftoneFog";

/**
 * Text-first cinematic hero: halftone fog + warm grain, centered mission,
 * one CTA. Content lifts and fades on scroll into the next section.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.to(".hero-content", {
        yPercent: -12,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.4 },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="grain relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-espresso text-cream"
    >
      <HalftoneFog amp={0.68} />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(16,14,11,0.6)_100%)]"
      />

      <div className="hero-content relative z-[2] flex flex-col items-center px-6 pt-20 text-center">
        <p className="hero-seq eyebrow text-gold" style={{ animationDelay: "0.9s" }}>
          Merkevare og digital retning · Trondheim
        </p>
        <h1 className="display mt-8 text-[12vw] leading-[1.02] sm:text-6xl md:text-7xl lg:text-8xl">
          <span className="hero-resolve block" style={{ animationDelay: "0.95s" }}>
            Lettere å forstå.
          </span>
          <span className="hero-resolve block" style={{ animationDelay: "1.35s" }}>
            Lettere å velge.
          </span>
        </h1>
        <p
          className="hero-seq mx-auto mt-8 max-w-[42ch] text-base leading-relaxed text-cream/90 md:text-lg"
          style={{ animationDelay: "1.2s", textShadow: "0 1px 18px rgba(16,14,11,0.8)" }}
        >
          Et strategisk studio for merkevare, nettsider, innhold og systemer.
        </p>
        <div
          className="hero-seq mt-10 flex flex-wrap items-center justify-center gap-4"
          style={{ animationDelay: "1.35s" }}
        >
          <Button to="/klarhetssjekk">Få din klarhetssjekk</Button>
          <Button to="/arbeider" variant="ghost">
            Se arbeider
          </Button>
        </div>
      </div>

      <style>{`
        .hero-seq {
          animation: hero-rise 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        /* The thesis, performed: each line condenses out of fog into sharp ink. */
        .hero-resolve {
          animation: hero-clear 1.5s cubic-bezier(0.22, 1, 0.36, 1) both;
          will-change: filter, opacity, transform;
        }
        @keyframes hero-rise {
          from { opacity: 0; transform: translateY(34px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes hero-clear {
          0% { opacity: 0; filter: blur(22px); transform: translateY(10px) scale(1.03); }
          45% { opacity: 1; }
          100% { opacity: 1; filter: blur(0); transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-seq, .hero-resolve { animation: none; }
        }
      `}</style>
    </section>
  );
}
