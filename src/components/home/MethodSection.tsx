import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/motion";
import Reveal from "../Reveal";
import { METHOD_STEPS, WEEK_STEPS } from "../../data/method";
import { sound } from "../../lib/sound";
import { useLang, type Lang } from "../../i18n";

const T: Record<Lang, { eyebrow: string; heading: string; sub: string; start: string; whole: string }> = {
  no: {
    eyebrow: "Metoden",
    heading: "Tre steg. Ingen gjetning.",
    sub: "Fra uklarhet til et tydelig digitalt uttrykk som henger sammen.",
    start: "Slik starter vi",
    whole: "Se hele metoden",
  },
  en: {
    eyebrow: "The method",
    heading: "Three steps. No guesswork.",
    sub: "From unclear to a clear digital expression that holds together.",
    start: "How we start",
    whole: "See the whole method",
  },
};

/** The method on paper: three red numbers, then the start sequence on one drawn red line. */
export default function MethodSection() {
  const weeksRef = useRef<HTMLDivElement>(null);
  const { lang, p } = useLang();
  const t = T[lang];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".method-line",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            transformOrigin: "left center",
            scrollTrigger: { trigger: weeksRef.current, start: "top 75%", end: "bottom 60%", scrub: 0.5 },
          }
        );
        gsap.utils.toArray<HTMLElement>(".week-step").forEach((step, i) => {
          gsap.fromTo(
            step,
            { autoAlpha: 0, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              delay: (i % 4) * 0.08,
              scrollTrigger: { trigger: step, start: "top 84%" },
            }
          );
        });
      });
    },
    { scope: weeksRef }
  );

  return (
    <section className="relative overflow-hidden bg-parchment text-ink">
      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-32">
        <Reveal className="max-w-3xl" sfx>
          <p className="eyebrow text-accent">{t.eyebrow}</p>
          <h2 className="poster mt-6 text-[clamp(2.8rem,9vw,7rem)] text-ink">{t.heading}</h2>
          <p className="voice mt-6 max-w-[34ch] text-xl text-ink/80 md:text-3xl">{t.sub}</p>
        </Reveal>

        <div className="mt-14 grid gap-10 border-t-2 border-ink pt-10 md:mt-20 md:grid-cols-3 md:gap-8">
          {METHOD_STEPS[lang].map((s, i) => (
            <Reveal key={s.h} delay={i * 0.1}>
              <span className="poster block text-5xl text-accent md:text-7xl">{s.n}</span>
              <h3 className="display-sans mt-5 text-3xl md:text-4xl">{s.h}</h3>
              <p className="mt-3 max-w-[36ch] text-sm leading-relaxed text-ink/70 md:text-base">{s.p}</p>
            </Reveal>
          ))}
        </div>

        <div ref={weeksRef} className="mt-24 md:mt-32">
          <h3 className="voice text-2xl md:text-3xl">{t.start}</h3>
          <div className="relative mt-8">
            <div className="absolute left-0 top-0 h-[2px] w-full bg-ink/15" />
            <div className="method-line absolute left-0 top-0 h-[2px] w-full bg-accent" style={{ transform: "scaleX(0)" }} />
            <div className="grid gap-10 pt-10 md:grid-cols-4 md:gap-8">
              {WEEK_STEPS[lang].map((w) => (
                <div key={w.n} className="week-step">
                  <span className="eyebrow text-accent">{w.n}</span>
                  <h4 className="display-sans mt-3 text-2xl md:text-3xl">{w.h}</h4>
                  <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-ink/70">{w.p}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12">
            <Link to={p("/metoden")} onClick={() => sound.play("click")} className="mono link-line text-xs text-accent">
              {t.whole}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
