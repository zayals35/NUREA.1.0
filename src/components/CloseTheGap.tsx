import { useEffect, useRef } from "react";

// Ported from the nurea-static "vi tetter gapet" scroll effect. Sticky stage where
// "VI TETTER" / "GAPET" converge from the sides around a centre image that scales
// up and crossfades as you scroll. Self-contained; respects reduced motion.

const SPREAD = 40; // vw each word starts off to its side
const STRETCH = 0.55; // em per-letter spread at the start
const smooth = (t: number) => t * t * (3 - 2 * t);

export const CloseTheGap = () => {
  const rootRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLSpanElement>(null);
  const rightRef = useRef<HTMLSpanElement>(null);
  const imgboxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const gap = rootRef.current;
    const gLeft = leftRef.current;
    const gRight = rightRef.current;
    const gImgbox = imgboxRef.current;
    if (!gap || !gLeft || !gRight || !gImgbox) return;

    const splitChars = (el: HTMLElement) => {
      const txt = el.textContent || "";
      const frag = document.createDocumentFragment();
      const chars: HTMLSpanElement[] = [];
      for (let i = 0; i < txt.length; i++) {
        const s = document.createElement("span");
        s.className = "ctg-char";
        s.textContent = txt[i] === " " ? " " : txt[i];
        frag.appendChild(s);
        chars.push(s);
      }
      el.textContent = "";
      el.appendChild(frag);
      return chars;
    };
    const leftChars = splitChars(gLeft);
    const rightChars = splitChars(gRight);

    const applyWord = (chars: HTMLSpanElement[], p: number, fromRight: boolean) => {
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
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      leftChars.concat(rightChars).forEach((c) => (c.style.opacity = "1"));
      gLeft.style.transform = "translateX(0)";
      gRight.style.transform = "translateX(0)";
      gImgbox.style.transform = "scale(1)";
      // Motion-sensitive visitors get the still poster, not the looping clip.
      videoRef.current?.pause();
      return;
    }

    const progress = () => {
      const vh = window.innerHeight;
      const rectTop = gap.getBoundingClientRect().top;
      // 0 when the section's top sits ~a viewport below the fold (just entering
      // / sliding up), 1 when its top reaches the top of the viewport (pinned and
      // fully covering). Works both as a normal section (Metoden) and as a sticky
      // stack item (homepage), where the converge plays during the slide-up.
      return Math.min(Math.max((vh - rectTop) / (vh * 0.92), 0), 1);
    };

    let tick = false;
    const onGap = () => {
      if (tick) return;
      tick = true;
      requestAnimationFrame(() => {
        const p = progress();
        const e = smooth(p);
        gLeft.style.transform = `translateX(${(-SPREAD * (1 - e)).toFixed(2)}vw)`;
        gRight.style.transform = `translateX(${(SPREAD * (1 - e)).toFixed(2)}vw)`;
        gImgbox.style.transform = `scale(${(0.4 + 0.6 * e).toFixed(3)})`;
        applyWord(leftChars, p, false);
        applyWord(rightChars, p, true);
        tick = false;
      });
    };
    window.addEventListener("scroll", onGap, { passive: true });
    window.addEventListener("resize", onGap, { passive: true });
    onGap();

    return () => {
      window.removeEventListener("scroll", onGap);
      window.removeEventListener("resize", onGap);
    };
  }, []);

  return (
    <section className="ctg" ref={rootRef} aria-label="Vi tetter gapet">
      <div className="ctg-sticky">
        <span className="ctg-kicker">Mellom kunde og bedrift</span>
        <div className="ctg-canvas">
          <div className="ctg-stage">
            <div className="ctg-imgbox" ref={imgboxRef}>
              <video
                ref={videoRef}
                className="ctg-video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/nurea-method/gap-poster.jpg"
              >
                <source src="/nurea-method/gap.webm" type="video/webm" />
                <source src="/nurea-method/gap.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
          <div className="ctg-overlay">
            <span className="ctg-word ctg-left" ref={leftRef}>VI TETTER</span>
            <span className="ctg-word ctg-right" ref={rightRef}>GAPET</span>
          </div>
        </div>
        <p className="ctg-sub">
          Mellom det kunden forstår og det bedriften faktisk er. Klarhet og tillit
          lukker avstanden, steg for steg.
        </p>
      </div>
    </section>
  );
};

export default CloseTheGap;
