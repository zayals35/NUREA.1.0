import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "../../lib/motion";
import Reveal from "../Reveal";
import CharReveal from "../CharReveal";
import { useLang, type Lang } from "../../i18n";

const T: Record<Lang, { eyebrow: string; statement: string }> = {
  no: {
    eyebrow: "Problemet",
    statement: `Solide bedrifter taper ikke kunder fordi de mangler verdi. De taper kunder fordi verdien ikke blir forstått raskt nok.`,
  },
  en: {
    eyebrow: "The problem",
    statement: `Solid businesses do not lose customers for lack of value. They lose customers because the value is not understood fast enough.`,
  },
};

/** The problem beat, one line, straight after the hero. */
export default function ProblemSection() {
  const stmtRef = useRef<HTMLDivElement>(null);
  const { lang } = useLang();
  const t = T[lang];

  // Same motif as the hero: the statement sharpens out of fog while it scrolls in.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        stmtRef.current,
        { filter: "blur(7px)" },
        {
          filter: "blur(0px)",
          ease: "none",
          scrollTrigger: {
            trigger: stmtRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 0.35,
          },
        }
      );
    },
    { scope: stmtRef }
  );

  return (
    <section className="grain relative overflow-hidden bg-espresso text-cream">
      <div className="relative z-[2] mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-36">
        <div className="grid gap-14 md:grid-cols-[minmax(200px,1fr)_2.3fr] md:gap-20">
          <Reveal>
            <p className="eyebrow text-gold">{t.eyebrow}</p>
          </Reveal>
          <div ref={stmtRef} className="will-change-[filter]">
            <CharReveal
              key={lang}
              className="display text-[30px] leading-[1.16] sm:text-4xl md:text-5xl md:leading-[1.14]"
              text={t.statement}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
