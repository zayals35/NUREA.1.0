import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, prefersReducedMotion } from "../../lib/motion";
import { useLang, type Lang } from "../../i18n";

const T: Record<Lang, { left: string; right: string; aria: string; caption: string }> = {
  no: {
    left: "VI TETTER",
    right: "GAPET",
    aria: "Vi tetter gapet",
    caption: "Mellom det kunden forstår og det bedriften faktisk er.",
  },
  en: {
    left: "WE CLOSE",
    right: "THE GAP",
    aria: "We close the gap",
    caption: "Between what the customer understands and what the business actually is.",
  },
};

/**
 * The converge moment, now a poster: paper type on the sender colour. The two
 * words start pushed apart with their letters spread and close the gap while
 * the section scrolls in; a citron seam seals the meeting point.
 */
const SPREAD = 40;
const STRETCH = 0.55;
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
  const { lang } = useLang();
  return <CloseTheGapInner key={lang} t={T[lang]} />;
}

function CloseTheGapInner({ t }: { t: (typeof T)["no"] }) {
  const rootRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLSpanElement>(null);
  const rightRef = useRef<HTMLSpanElement>(null);
  const seamRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const gLeft = leftRef.current!;
      const gRight = rightRef.current!;
      const gSeam = seamRef.current!;
      const leftChars = splitChars(gLeft);
      const rightChars = splitChars(gRight);

      if (prefersReducedMotion()) {
        leftChars.concat(rightChars).forEach((c) => (c.style.opacity = "1"));
        gSeam.style.opacity = "1";
        gSeam.style.transform = "translate(-50%, -50%) scaleY(1)";
        return;
      }

      const render = (p: number) => {
        const e = smooth(p);
        gLeft.style.transform = `translateX(${(-SPREAD * (1 - e)).toFixed(2)}vw)`;
        gRight.style.transform = `translateX(${(SPREAD * (1 - e)).toFixed(2)}vw)`;
        applyWord(leftChars, p, false);
        applyWord(rightChars, p, true);
        const sp = Math.min(Math.max((p - 0.86) / 0.14, 0), 1);
        const se = smooth(sp);
        gSeam.style.opacity = se.toFixed(3);
        gSeam.style.transform = `translate(-50%, -50%) scaleY(${se.toFixed(3)})`;
      };

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top bottom",
        end: "top 32%",
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
      aria-label={t.aria}
      className="relative flex h-[58vh] w-full flex-col items-center justify-center gap-8 overflow-hidden bg-accent px-5 text-parchment md:h-[68vh] md:gap-10"
    >
      <div className="relative flex h-[clamp(180px,32vh,340px)] w-full items-center justify-center">
        <div
          className="pointer-events-none absolute inset-0 z-[3] flex items-center justify-center gap-[0.28em] text-[clamp(2rem,11vw,3.6rem)] md:text-[clamp(2.8rem,8.5vw,7.5rem)]"
          aria-hidden="true"
        >
          <span ref={leftRef} className="ctg-word poster whitespace-nowrap uppercase leading-[0.94] text-parchment">
            {t.left}
          </span>
          <span ref={rightRef} className="ctg-word poster whitespace-nowrap uppercase leading-[0.94] text-parchment">
            {t.right}
          </span>
        </div>
        <span
          ref={seamRef}
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 z-[4] h-[clamp(2.4rem,12vh,7rem)] w-[3px] bg-gold opacity-0 will-change-[transform,opacity]"
          style={{ transform: "translate(-50%, -50%) scaleY(0)" }}
        />
      </div>
      <p className="voice relative z-[4] mx-auto max-w-[30ch] text-center text-xl text-parchment/90 md:text-3xl">
        {t.caption}
      </p>
      <style>{`
        .ctg-word { display: inline-flex; will-change: transform; }
        .ctg-char { display: inline-block; opacity: 0; white-space: pre; will-change: transform, opacity; }
        @media (prefers-reduced-motion: reduce) { .ctg-char { opacity: 1; } }
      `}</style>
    </section>
  );
}
