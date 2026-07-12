import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, prefersReducedMotion } from "../../lib/motion";
import HalftoneFog from "../HalftoneFog";

/**
 * The "vi tetter gapet" converge moment, pure typography: VI TETTER and
 * GAPET start pushed to opposite sides with letters spread apart and close
 * the gap while the section scrolls in. As the gap closes, the fog itself
 * thins out, and a single burnt-orange seam seals the meeting point.
 * The section performs the sentence; nothing borrowed, nothing stock.
 */

const SPREAD = 40; // vw each word starts off to its side
const STRETCH = 0.55; // em per-letter spread at the start
const smooth = (t: number) => t * t * (3 - 2 * t);

function splitChars(el: HTMLElement): HTMLSpanElement[] {
  const txt = el.textContent || "";
  const frag = document.createDocumentFragment();
  const chars: HTMLSpanElement[] = [];
  for (const ch of txt) {
    const s = document.createElement("span");
    s.className = "ctg-char";
    s.textContent = ch;
    frag.appendChild(s);
    chars.push(s);
  }
  el.textContent = "";
  el.appendChild(frag);
  return chars;
}

function applyWord(chars: HTMLSpanElement[], p: number, fromRight: boolean) {
  const n = chars.length;
  const span = 0.6;
  const win = 0.4;
  const step = n > 1 ? span / n : 0;
  const e = smooth(Math.min(p, 1));
  for (let i = 0; i < n; i++) {
    const order = fromRight ? n - 1 - i : i;
    const cp = Math.min(Math.max((p - order * step) / win, 0), 1);
    chars[i].style.opacity = smooth(cp).toFixed(3);
    const offset = (i - (n - 1) / 2) * STRETCH * (1 - e);
    chars[i].style.transform = `translateX(${offset.toFixed(3)}em)`;
  }
}

export default function CloseTheGap() {
  const rootRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLSpanElement>(null);
  const rightRef = useRef<HTMLSpanElement>(null);
  const fogRef = useRef<HTMLDivElement>(null);
  const seamRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const gLeft = leftRef.current!;
      const gRight = rightRef.current!;
      const gFog = fogRef.current!;
      const gSeam = seamRef.current!;
      const leftChars = splitChars(gLeft);
      const rightChars = splitChars(gRight);

      if (prefersReducedMotion()) {
        leftChars.concat(rightChars).forEach((c) => (c.style.opacity = "1"));
        gFog.style.opacity = "0.3";
        gSeam.style.opacity = "1";
        gSeam.style.transform = "translate(-50%, -50%) scaleY(1)";
        return;
      }

      const render = (p: number) => {
        const e = smooth(p);
        gLeft.style.transform = `translateX(${(-SPREAD * (1 - e)).toFixed(2)}vw)`;
        gRight.style.transform = `translateX(${(SPREAD * (1 - e)).toFixed(2)}vw)`;
        // The words themselves resolve from fog to glass as the gap closes.
        const blur = (10 * (1 - e)).toFixed(2);
        gLeft.style.filter = `blur(${blur}px)`;
        gRight.style.filter = `blur(${blur}px)`;
        applyWord(leftChars, p, false);
        applyWord(rightChars, p, true);
        // Closing the gap clears the fog.
        gFog.style.opacity = (1 - 0.7 * e).toFixed(3);
        // The seam seals only at the very end, one quiet spark.
        const sp = Math.min(Math.max((p - 0.86) / 0.14, 0), 1);
        const se = smooth(sp);
        gSeam.style.opacity = se.toFixed(3);
        gSeam.style.transform = `translate(-50%, -50%) scaleY(${se.toFixed(3)})`;
      };

      // Same window as before: converge plays while the section's top
      // travels from the fold to (almost) the top of the viewport.
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top bottom",
        end: "top 8%",
        scrub: true,
        onUpdate: (self) => render(self.progress),
      });
      render(0);
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      aria-label="Vi tetter gapet"
      className="grain relative flex h-[70vh] w-full flex-col items-center justify-center gap-8 overflow-hidden bg-parchment-alt px-5 text-ink md:h-[85vh] md:gap-10"
    >
      {/* Textured stage: warm fog on paper, thinning as the gap closes */}
      <div ref={fogRef} className="absolute inset-0 will-change-[opacity]">
        <HalftoneFog amp={0.35} color="#8a8170" color2="#6b6357" />
      </div>

      <div className="relative flex h-[clamp(180px,32vh,340px)] w-full items-center justify-center">
        {/* The converging words */}
        {/* Font size lives on the container so the em gap scales with the words. */}
        <div
          className="pointer-events-none absolute inset-0 z-[3] flex items-center justify-center gap-[0.28em] text-[clamp(2rem,11vw,3.6rem)] md:text-[clamp(2.8rem,8.5vw,7.5rem)]"
          aria-hidden="true"
        >
          <span
            ref={leftRef}
            className="ctg-word display-sans whitespace-nowrap font-bold uppercase leading-[0.94] text-ink"
          >
            VI TETTER
          </span>
          <span
            ref={rightRef}
            className="ctg-word display-sans whitespace-nowrap font-bold uppercase leading-[0.94] text-ink"
          >
            GAPET
          </span>
        </div>

        {/* The seam: one burnt-orange hairline where the gap used to be */}
        <span
          ref={seamRef}
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 z-[4] h-[clamp(2.4rem,12vh,7rem)] w-[2px] bg-accent opacity-0 shadow-[0_0_24px_rgba(194,81,31,0.55)] will-change-[transform,opacity]"
          style={{ transform: "translate(-50%, -50%) scaleY(0)" }}
        />
      </div>

      <p className="relative z-[4] mx-auto max-w-[48ch] text-center text-base leading-relaxed text-ink/80 md:text-xl">
        Mellom det kunden forstår og det bedriften faktisk er. Klarhet og
        tillit lukker avstanden, steg for steg.
      </p>

      <style>{`
        .ctg-word {
          display: inline-flex;
          will-change: transform, filter;
        }
        .ctg-char {
          display: inline-block;
          opacity: 0;
          white-space: pre;
          will-change: transform, opacity;
        }
        @media (prefers-reduced-motion: reduce) {
          .ctg-char { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
