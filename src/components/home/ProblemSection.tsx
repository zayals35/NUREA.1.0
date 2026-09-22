import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "../../lib/motion";
import Reveal from "../Reveal";
import { useLang, type Lang } from "../../i18n";

const T: Record<Lang, { label: string; big: string[]; small: string; tag: string; statement: string; foot: string }> = {
  no: {
    label: "Et lite spørsmål",
    big: ["Du er", "god."],
    small: "På det du gjør.",
    tag: "Ser de det?",
    statement:
      "Solide bedrifter taper ikke kunder fordi de mangler verdi. De taper kunder fordi verdien ikke blir forstått raskt nok.",
    foot: "Se like gode ut som dere er.",
  },
  en: {
    label: "A small question",
    big: ["You are", "good."],
    small: "At what you do.",
    tag: "Do they see it?",
    statement:
      "Solid businesses do not lose customers for lack of value. They lose customers because the value is not understood fast enough.",
    foot: "Look as good as you are.",
  },
};

/**
 * The approved citron poster, "Du er god. Ser de det?", as the problem beat.
 * The claim lands first, then the red tag snaps in with the question, then the
 * statement gives it its meaning.
 */
export default function ProblemSection() {
  const root = useRef<HTMLElement>(null);
  const { lang } = useLang();
  const t = T[lang];

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 62%", once: true },
      });
      tl.from(".god-line", { yPercent: 110, duration: 0.8, ease: "expo.out", stagger: 0.08 })
        .from(".god-small", { opacity: 0, y: 14, duration: 0.5, ease: "power2.out" }, "-=0.45")
        .fromTo(
          ".god-tag",
          { opacity: 0, rotate: 4, scale: 0.86, transformOrigin: "left center" },
          { opacity: 1, rotate: -3.5, scale: 1, duration: 0.55, ease: "back.out(2.2)" },
          "-=0.25"
        );
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-gold text-accent">
      <div className="mx-auto max-w-[1440px] px-5 pb-20 pt-16 md:px-10 md:pb-32 md:pt-24">
        <div className="flex items-baseline justify-between">
          <p className="eyebrow text-accent">{t.label}</p>
          <span className="mono hidden text-[10px] text-accent/70 md:inline">nurea.no</span>
        </div>

        <div className="mt-8 grid gap-10 md:mt-14 md:grid-cols-[1.25fr_1fr] md:items-end md:gap-12">
          <div>
            <p className="poster uppercase text-[clamp(4.6rem,22vw,20rem)] leading-[0.86] md:text-[clamp(8rem,15.5vw,20rem)]" aria-label={t.big.join(" ")}>
              {t.big.map((line) => (
                <span key={line} className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
                  <span className="god-line block">{line}</span>
                </span>
              ))}
            </p>
            <p className="god-small voice mt-3 text-2xl text-ink md:text-4xl">{t.small}</p>
          </div>

          <div className="flex justify-start md:justify-end">
            <span
              className="god-tag voice inline-block bg-accent px-7 py-4 text-4xl text-parchment md:px-10 md:py-6 md:text-6xl"
              style={{ transform: "rotate(-3.5deg)" }}
            >
              {t.tag}
            </span>
          </div>
        </div>

        <Reveal className="mt-20 grid gap-6 border-t-2 border-accent pt-8 md:mt-28 md:grid-cols-[1fr_2fr] md:gap-12 md:pt-10">
          <p className="mono text-xs text-accent">{t.foot}</p>
          <p className="display-sans max-w-[28ch] text-3xl leading-[1.08] text-ink md:text-5xl">{t.statement}</p>
        </Reveal>
      </div>
    </section>
  );
}
