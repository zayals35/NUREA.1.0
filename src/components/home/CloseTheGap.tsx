import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, prefersReducedMotion } from "../../lib/motion";

/**
 * The "vi tetter gapet" converge animation, ported from the live nurea.no
 * CloseTheGap component: VI TETTER and GAPET start pushed to opposite sides
 * with letters spread apart, and close the gap around a centre video that
 * scales up while the section scrolls in. Restyled to the locked brand.
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
  const imgboxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Pause the loop when the section is offscreen; never play under reduced motion.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (prefersReducedMotion()) {
      video.pause();
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) video.play().catch(() => undefined);
      else video.pause();
    });
    io.observe(video);
    return () => io.disconnect();
  }, []);

  useGSAP(
    () => {
      const gLeft = leftRef.current!;
      const gRight = rightRef.current!;
      const gImgbox = imgboxRef.current!;
      const leftChars = splitChars(gLeft);
      const rightChars = splitChars(gRight);

      if (prefersReducedMotion()) {
        leftChars.concat(rightChars).forEach((c) => (c.style.opacity = "1"));
        gImgbox.style.transform = "scale(1)";
        return;
      }

      const render = (p: number) => {
        const e = smooth(p);
        gLeft.style.transform = `translateX(${(-SPREAD * (1 - e)).toFixed(2)}vw)`;
        gRight.style.transform = `translateX(${(SPREAD * (1 - e)).toFixed(2)}vw)`;
        gImgbox.style.transform = `scale(${(0.4 + 0.6 * e).toFixed(3)})`;
        applyWord(leftChars, p, false);
        applyWord(rightChars, p, true);
      };

      // Same window as the live site: converge plays while the section's top
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
      className="grain relative flex h-[75vh] w-full flex-col items-center justify-center gap-6 overflow-hidden bg-parchment-alt px-5 text-ink md:h-[88vh] md:gap-8"
    >
      <span className="eyebrow relative z-[4] text-accent">Mellom kunde og bedrift</span>

      <div className="relative h-[clamp(240px,46vh,460px)] w-full">
        {/* Centre media, scales up as the words converge */}
        <div
          className="absolute left-1/2 top-1/2 z-[1] aspect-[3/4] w-[52vw] -translate-x-1/2 -translate-y-1/2 md:w-[clamp(150px,24vw,340px)]"
        >
          <div
            ref={imgboxRef}
            className="absolute inset-0 origin-center overflow-hidden rounded-2xl shadow-[0_40px_90px_-34px_rgba(16,14,11,0.62)] will-change-transform"
          >
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/nurea-method/gap-poster.webp"
            >
              <source src="/nurea-method/gap.webm" type="video/webm" />
              <source src="/nurea-method/gap.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* The converging words */}
        <div
          className="pointer-events-none absolute inset-0 z-[3] flex items-center justify-center gap-[0.28em]"
          aria-hidden="true"
        >
          <span
            ref={leftRef}
            className="ctg-word display whitespace-nowrap text-[clamp(2rem,11vw,3.6rem)] uppercase leading-[0.94] text-[#e7e1d5] md:text-[clamp(2.8rem,8.5vw,7.5rem)]"
          >
            VI TETTER
          </span>
          <span
            ref={rightRef}
            className="ctg-word display whitespace-nowrap text-[clamp(2rem,11vw,3.6rem)] uppercase leading-[0.94] text-[#e7e1d5] md:text-[clamp(2.8rem,8.5vw,7.5rem)]"
          >
            GAPET
          </span>
        </div>
      </div>

      <p className="relative z-[4] mx-auto max-w-[48ch] text-center text-base leading-relaxed text-ink/80 md:text-xl">
        Mellom det kunden forstår og det bedriften faktisk er. Klarhet og
        tillit lukker avstanden, steg for steg.
      </p>

      <style>{`
        .ctg-word {
          display: inline-flex;
          text-shadow: 0 2px 32px rgba(16, 14, 11, 0.95), 0 1px 8px rgba(16, 14, 11, 0.82);
          will-change: transform;
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
