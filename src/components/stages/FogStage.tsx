import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/motion";
import ClipVideo from "../ClipVideo";
import type { Lang } from "../../i18n";

interface Props {
  lang: Lang;
  eyebrow: string;
  traits: { h: string; p: string }[];
  line: string;
}

const CLIP = "/work/gizay/clips/05-close-field";
const CAPTION: Record<Lang, string> = { no: "GIZAY, gizay.no", en: "GIZAY, gizay.no" };
const ALT: Record<Lang, string> = {
  no: "GIZAY sin nettside lander på deres eget dronefelt",
  en: "GIZAY's website settling onto their own drone field",
};

/**
 * Fog to glass, routes r2: the page pins, a real site plays under a paper
 * veil, and the three ways of working land one by one on solid paper to the
 * left. Each word thins the fog by a third; when the last one lands the site
 * is clear and the promise settles under the frame. Only opacity and
 * transform move; the blur on the veil's poster is static. Reduced motion
 * and no-JS get the final state.
 */
export default function FogStage({ lang, eyebrow, traits, line }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Desktop pins the stage; phones let it play as the section travels
      // through the viewport, so nothing taller than the screen gets pinned.
      mm.add(
        {
          desk: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          phone: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
        const desk = Boolean(ctx.conditions?.desk);
        const el = root.current!;
        const words = gsap.utils.toArray<HTMLElement>(".fog-trait", el);
        const veil = el.querySelector<HTMLElement>(".fog-veil")!;
        const blur = el.querySelector<HTMLElement>(".fog-blur")!;
        const promise = el.querySelector<HTMLElement>(".fog-line")!;
        gsap.set(words, { autoAlpha: 0, y: 28 });
        gsap.set(promise, { autoAlpha: 0, y: 16 });
        gsap.set(veil, { opacity: 0.72 });
        gsap.set(blur, { opacity: 1 });
        const tl = gsap.timeline({
          scrollTrigger: desk
            ? { trigger: el, pin: true, scrub: 0.5, start: "top top", end: () => "+=" + window.innerHeight * 2.6 }
            : { trigger: el, scrub: 0.5, start: "top 70%", end: "bottom 95%" },
        });
        tl.to({}, { duration: 0.4 });
        words.forEach((w, i) => {
          const left = 1 - (i + 1) / words.length;
          tl.to(w, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" })
            .to(veil, { opacity: 0.72 * left, duration: 1, ease: "power1.inOut" }, "<")
            .to(blur, { opacity: left, duration: 1, ease: "power1.inOut" }, "<")
            .to({}, { duration: 0.35 });
        });
        tl.to(promise, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" }).to({}, { duration: 0.5 });
        }
      );
      return () => mm.revert();
    },
    { scope: root, dependencies: [lang], revertOnUpdate: true }
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-parchment text-ink motion-safe:md:h-svh">
      <div className="mx-auto flex h-full max-w-[1440px] flex-col justify-center px-5 py-14 md:px-10 md:py-24">
        <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-16">
          <div className="order-2 md:order-1">
            <p className="eyebrow text-accent">{eyebrow}</p>
            <div className="mt-6 flex flex-col gap-6 md:mt-8 md:gap-8">
              {traits.map((trait) => (
                <div key={trait.h} className="fog-trait border-t-2 border-ink pt-4">
                  <h2 className="display-sans text-3xl md:text-4xl">{trait.h}</h2>
                  <p className="copy mt-2 max-w-[36ch] text-ink">{trait.p}</p>
                </div>
              ))}
            </div>
          </div>

          <figure className="order-1 m-0 md:order-2">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-espresso-deep">
              <ClipVideo base={CLIP} alt={ALT[lang]} width={1920} height={1080} />
              <img
                src={`${CLIP}-poster.webp`}
                alt=""
                aria-hidden="true"
                width={1920}
                height={1080}
                className="fog-blur pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover"
                style={{ filter: "blur(22px) saturate(0.6)", opacity: 0 }}
              />
              <div
                aria-hidden="true"
                className="fog-veil pointer-events-none absolute inset-0 bg-parchment"
                style={{ opacity: 0 }}
              />
            </div>
            <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <span className="mono text-[11px] tracking-[0.14em] text-ink/70">{CAPTION[lang]}</span>
              <span className="fog-line voice text-xl text-ink md:text-2xl">{line}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
