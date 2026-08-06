import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "../../lib/motion";
import Button from "../Button";
import HalftoneFog from "../HalftoneFog";
import { useLang, type Lang } from "../../i18n";

const T: Record<Lang, {
  eyebrow: string;
  line1: string;
  line2: string;
  sub: string;
  cta: string;
  work: string;
  scroll: string;
}> = {
  no: {
    eyebrow: "Merkevare og digital retning · Trondheim",
    line1: "Lettere å forstå.",
    line2: "Lettere å velge.",
    sub: "Et strategisk studio for merkevare, nettsider, innhold og systemer.",
    cta: "Få din klarhetssjekk",
    work: "Se arbeider",
    scroll: "Bla ned",
  },
  en: {
    eyebrow: "Brand and digital direction · Trondheim, Norway",
    line1: "Easier to understand.",
    line2: "Easier to choose.",
    sub: "A strategic studio for brand, websites, content and systems.",
    cta: "Get your clarity check",
    work: "See the work",
    scroll: "Scroll",
  },
};

/**
 * Text-first cinematic hero: halftone fog + warm grain, centered mission,
 * one CTA. Content lifts and fades on scroll into the next section.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const { lang, p } = useLang();
  const t = T[lang];

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // Leaving the hero reverses the resolve: the glass fogs back up.
      gsap.to(".hero-content", {
        yPercent: -12,
        autoAlpha: 0,
        filter: "blur(14px)",
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "60% top", scrub: 0.4 },
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

      <div className="hero-content relative z-[2] flex flex-col items-center px-6 pt-20 text-center will-change-[transform,opacity,filter]">
        <p className="hero-seq eyebrow text-gold" style={{ animationDelay: "0.45s" }}>
          {t.eyebrow}
        </p>
        <h1 className="display mt-8 text-[12vw] leading-[1.02] sm:text-6xl md:text-7xl lg:text-8xl">
          <span className="hero-resolve block" style={{ animationDelay: "0.5s" }}>
            {t.line1}
          </span>
          <span className="hero-resolve block" style={{ animationDelay: "0.82s" }}>
            {t.line2}
          </span>
        </h1>
        <p
          className="hero-seq mx-auto mt-8 max-w-[42ch] text-base leading-relaxed text-cream/90 md:text-lg"
          style={{ animationDelay: "0.75s", textShadow: "0 1px 18px rgba(16,14,11,0.8)" }}
        >
          {t.sub}
        </p>
        <div
          className="hero-seq mt-10 flex flex-wrap items-center justify-center gap-4"
          style={{ animationDelay: "0.9s" }}
        >
          <Button to={p("/klarhetssjekk")}>{t.cta}</Button>
          <Button to={p("/arbeider")} variant="ghost">
            {t.work}
          </Button>
        </div>
      </div>

      {/* Scroll cue: the page has more to say, and it moves. */}
      <div
        className="hero-seq absolute bottom-8 left-1/2 z-[2] flex -translate-x-1/2 flex-col items-center gap-3"
        style={{ animationDelay: "1.6s" }}
        aria-hidden="true"
      >
        <span className="mono text-[10px] uppercase tracking-[0.22em] text-cream/50">{t.scroll}</span>
        <span className="hero-cue-line block h-10 w-px overflow-hidden bg-cream/15">
          <span className="hero-cue-dot block h-3 w-px bg-gold" />
        </span>
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
        .hero-cue-dot {
          animation: hero-cue 1.8s cubic-bezier(0.45, 0, 0.55, 1) 2.2s infinite;
          transform: translateY(-12px);
          will-change: transform;
        }
        @keyframes hero-cue {
          0% { transform: translateY(-12px); }
          60%, 100% { transform: translateY(40px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-seq, .hero-resolve, .hero-cue-dot { animation: none; }
        }
      `}</style>
    </section>
  );
}
