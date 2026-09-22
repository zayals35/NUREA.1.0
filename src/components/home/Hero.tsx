import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "../../lib/motion";
import Button from "../Button";
import Smoke from "../Smoke";
import { useLang, type Lang } from "../../i18n";

const T: Record<Lang, { eyebrow: string; line1: string; line2: string; accent: string; sub: string; cta: string; work: string; scroll: string }> = {
  no: {
    eyebrow: "Et designstudio i Trondheim",
    line1: "Lettere å forstå.",
    line2: "Lettere å ",
    accent: "velge",
    sub: "Nettsider med et eget uttrykk. Systemer som gjør hverdagen enklere.",
    cta: "Få din klarhetssjekk",
    work: "Se arbeider",
    scroll: "Bla ned",
  },
  en: {
    eyebrow: "A design studio in Trondheim",
    line1: "Easier to understand.",
    line2: "Easier to ",
    accent: "choose",
    sub: "Websites with an identity of their own. Systems that make everyday work easier.",
    cta: "Get your clarity check",
    work: "See the work",
    scroll: "Scroll",
  },
};

/**
 * The opening: four colours of smoke rising through paper, always moving and
 * stirred by the scroll, a see-through dot net over it, film grain, the
 * centred mission in Cabinet Grotesk 700 in plain ink, with one word, the
 * verb of the promise (velge / choose), carrying a citron border with a
 * second outline behind it that fades through the four identity colours,
 * the smaller lines in Nippo, one red pill CTA and a plain
 * text link. The smoke is even across the whole hero and capped so the type
 * reads on every patch; nothing is cleared around the words (r4 to r8, her
 * 2026-09-23 revises).
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const { lang, p } = useLang();
  const t = T[lang];

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
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
    <section ref={root} className="grain relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-parchment text-ink">
      <Smoke amp={1} />

      <div className="hero-content relative z-[2] flex flex-col items-center px-6 pb-28 pt-24 text-center will-change-[transform,opacity,filter]">
        <p className="hero-seq font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink sm:text-xs" style={{ animationDelay: "0.45s" }}>
          {t.eyebrow}
        </p>
        <h1 className="hero-title mt-7 text-[13vw] sm:text-6xl md:text-7xl lg:text-[6.5rem] xl:text-[7.5rem]">
          <span className="hero-resolve block" style={{ animationDelay: "0.5s" }}>{t.line1}</span>
          <span className="hero-resolve block" style={{ animationDelay: "0.82s" }}>
            {t.line2}
            <span className="hero-accent" data-text={t.accent}>{t.accent}</span>.
          </span>
        </h1>
        <p className="hero-seq mx-auto mt-8 max-w-[38ch] font-mono text-lg font-medium leading-snug text-ink md:text-xl" style={{ animationDelay: "0.75s" }}>
          {t.sub}
        </p>
        <div className="hero-seq mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-5" style={{ animationDelay: "0.9s" }}>
          <Button to={p("/klarhetssjekk")}>{t.cta}</Button>
          <Button to={p("/arbeider")} variant="link">{t.work}</Button>
        </div>
      </div>

      <div className="hero-seq absolute bottom-8 left-1/2 z-[2] flex -translate-x-1/2 flex-col items-center gap-3" style={{ animationDelay: "1.6s" }} aria-hidden="true">
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-ink">{t.scroll}</span>
        <span className="hero-cue-line block h-10 w-px overflow-hidden bg-ink/25">
          <span className="hero-cue-dot block h-3 w-px bg-ink" />
        </span>
      </div>

      <style>{`
        .hero-title { font-family: var(--font-display); font-weight: 700; letter-spacing: -0.03em; line-height: 0.96; color: var(--color-ink); }
        /* r8, her 2026-09-23 notes: black text, a yellow border only on the
           last word. The border is a citron stroke painted under the ink
           fill, so half of it shows outside the glyph. Behind it the same
           word once more in a thinner outline, sitting a hair down and right
           like a second colour pass, drifting a little and fading slowly
           through the four identity colours (her KEEP note: the echo read as
           a glitch in one colour, she liked the depth, asked for it to fade
           between Nurea's colours). The colour fade is the one deliberate
           exception to the transform/opacity/filter rule: it repaints one
           word, nothing else. */
        .hero-accent {
          position: relative;
          isolation: isolate;
          -webkit-text-stroke: 0.07em var(--color-gold);
          paint-order: stroke fill;
        }
        .hero-accent::before {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          z-index: -1;
          color: var(--color-gold);
          -webkit-text-fill-color: transparent;
          -webkit-text-stroke: 0.03em currentColor;
          filter: blur(0.5px);
          opacity: 0.85;
          transform: translate(0.045em, 0.045em);
          animation: hero-echo 9s ease-in-out infinite alternate, hero-echo-colour 16s ease-in-out infinite;
          will-change: transform;
          pointer-events: none;
        }
        @keyframes hero-echo {
          0% { transform: translate(0.045em, 0.045em); }
          50% { transform: translate(0.03em, 0.06em); }
          100% { transform: translate(0.06em, 0.035em); }
        }
        @keyframes hero-echo-colour {
          0%, 100% { color: #d8cf55; }
          25% { color: #4f783c; }
          50% { color: #2849a3; }
          75% { color: #8c0608; }
        }
        .hero-seq { animation: hero-rise 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .hero-resolve { animation: hero-clear 1.5s cubic-bezier(0.22, 1, 0.36, 1) both; will-change: filter, opacity, transform; }
        @keyframes hero-rise { from { opacity: 0; transform: translateY(34px); } to { opacity: 1; transform: none; } }
        @keyframes hero-clear {
          0% { opacity: 0; filter: blur(22px); transform: translateY(10px) scale(1.03); }
          45% { opacity: 1; }
          100% { opacity: 1; filter: blur(0); transform: none; }
        }
        .hero-cue-dot { animation: hero-cue 1.8s cubic-bezier(0.45, 0, 0.55, 1) 2.2s infinite; transform: translateY(-12px); will-change: transform; }
        @keyframes hero-cue { 0% { transform: translateY(-12px); } 60%, 100% { transform: translateY(40px); } }
        @media (prefers-reduced-motion: reduce) { .hero-seq, .hero-resolve, .hero-cue-dot, .hero-accent::before { animation: none; } }
      `}</style>
    </section>
  );
}
