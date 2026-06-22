import { useLayoutEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import { Reveal } from "@/components/Reveal";

gsap.registerPlugin(CustomEase, SplitText);
// Same easing language as the rest of the site (hoverEffect.ts "monolog").
CustomEase.create("monolog", "M0,0 C0.31,0.75 0.22,1 1,1");
const EASE = "monolog";

const accent = "#8a5a2f";
const ink = "#2a1f16";
const cream = "#f3ecdb";
const gold = "#d8b07a";
const sectionStyle = { scrollMarginTop: 80 } as const;
const MONO = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace";

// DRAFT testimonials. Replace the quote text with each client's own approved
// words before launch — these are placeholders, not real statements.
const TESTIMONIALS = [
  {
    quote:
      "Før følte det digitale tilfeldig ut. Nå ser vi like seriøse ut som vi faktisk er, og kundene finner fram til oss uten å lure.",
    name: "Bjørn",
    company: "Bilmekka",
    initial: "B",
  },
  {
    quote:
      "NUREA ryddet opp i hele uttrykket vårt. Alt henger sammen nå, fra første inntrykk til henvendelsen lander der den skal.",
    name: "Marius",
    company: "Møre Marin",
    initial: "M",
  },
];

const cardStyle: CSSProperties = {
  background: ink,
  color: cream,
  borderRadius: 20,
  padding: "26px 28px 30px",
  width: "100%",
  maxWidth: 460,
};
const trackStyle: CSSProperties = {
  position: "relative",
  height: 1,
  width: "100%",
  background: "rgba(243,236,219,0.16)",
  overflow: "hidden",
};
const fillStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  background: gold,
  transform: "scaleX(0)",
  transformOrigin: "left center",
};
const navRow: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 10,
};
const arrowBtn: CSSProperties = {
  width: 18,
  height: 18,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: "none",
  border: "none",
  color: cream,
  cursor: "pointer",
  padding: 0,
};
const counterStyle: CSSProperties = {
  fontFamily: MONO,
  fontSize: 11,
  letterSpacing: "0.08em",
  opacity: 0.6,
  color: cream,
};
const monoEyebrow: CSSProperties = {
  fontFamily: MONO,
  fontSize: 11,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: gold,
  opacity: 0.85,
  marginTop: 24,
};
const quoteStyle: CSSProperties = {
  fontFamily: "'Manrope','Inter',sans-serif",
  fontWeight: 600,
  fontSize: "clamp(17px, 1.7vw, 20px)",
  lineHeight: 1.4,
  color: cream,
  margin: "14px 0 0",
};
const attribRow: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  marginTop: 24,
};
const avatarStyle: CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: "50%",
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(216,176,122,0.18)",
  color: gold,
  fontFamily: "'Manrope','Inter',sans-serif",
  fontWeight: 700,
  fontSize: 16,
};
const nameStyle: CSSProperties = {
  fontFamily: "'Manrope','Inter',sans-serif",
  fontWeight: 600,
  fontSize: 14,
  color: cream,
  margin: 0,
  lineHeight: 1.3,
};
const companyStyle: CSSProperties = {
  fontFamily: "'Manrope','Inter',sans-serif",
  fontWeight: 400,
  fontSize: 13,
  color: cream,
  opacity: 0.65,
  margin: 0,
  lineHeight: 1.4,
};

const ArrowLeft = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M13 8H3M6.5 4.5 3 8l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ArrowRight = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M3 8h10M9.5 4.5 13 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface Slide {
  root: HTMLElement;
  split: SplitText;
  lines: Element[];
  avatar: Element | null;
  details: NodeListOf<Element>;
}

const TestimonialCard = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fillEl = root.querySelector<HTMLElement>("[data-fill]");
    const prevBtn = root.querySelector<HTMLElement>("[data-prev]");
    const nextBtn = root.querySelector<HTMLElement>("[data-next]");
    const currentEl = root.querySelector<HTMLElement>("[data-current]");
    const totalEl = root.querySelector<HTMLElement>("[data-total]");

    let slides: Slide[] = [];
    let current = 0;
    let prog: gsap.core.Tween | null = null;
    let io: IntersectionObserver | null = null;
    let cancelled = false;
    const view = { in: true };
    const pad = (n: number) => String(n).padStart(2, "0");

    const updateCounter = (i: number) => {
      if (currentEl) currentEl.textContent = pad(i + 1);
      if (totalEl) totalEl.textContent = pad(slides.length);
    };

    const playProgress = () => {
      if (reduced || !fillEl || slides.length < 2) return;
      gsap.killTweensOf(fillEl);
      gsap.set(fillEl, { scaleX: 0, transformOrigin: "left center" });
      prog = gsap.to(fillEl, {
        scaleX: 1,
        duration: 5,
        ease: "none",
        onComplete: () => go("next"),
      });
      if (!view.in) prog.pause();
    };

    const hide = (i: number) => {
      const s = slides[i];
      if (!s) return;
      gsap.set(s.root, { position: "absolute", top: 0, left: 0, right: 0, opacity: 0, zIndex: 1 });
    };

    const show = (i: number) => {
      const s = slides[i];
      if (!s) return;
      gsap.set(s.root, { position: "relative", opacity: 1, zIndex: 2 });
      if (reduced) {
        gsap.set(s.lines, { yPercent: 0 });
        gsap.set(s.avatar, { opacity: 1, yPercent: 0 });
        gsap.set(s.details, { opacity: 1, yPercent: 0 });
      } else {
        gsap.set(s.lines, { yPercent: 110 });
        gsap.set(s.avatar, { opacity: 0, yPercent: 60 });
        gsap.set(s.details, { opacity: 0, yPercent: 24 });
        gsap
          .timeline()
          .to(s.lines, { yPercent: 0, duration: 0.65, ease: EASE, stagger: 0.06 })
          .to(s.avatar, { opacity: 1, yPercent: 0, duration: 0.45, ease: EASE }, "-=0.3")
          .to(s.details, { opacity: 1, yPercent: 0, duration: 0.35, ease: EASE, stagger: 0.07 }, "-=0.25");
      }
      updateCounter(i);
      playProgress();
    };

    function go(dir: "next" | "prev") {
      if (slides.length < 2) return;
      const prev = current;
      current = dir === "next" ? (current + 1) % slides.length : (current - 1 + slides.length) % slides.length;
      prog?.kill();
      hide(prev);
      show(current);
    }

    const onPrev = () => go("prev");
    const onNext = () => go("next");

    const build = () => {
      if (cancelled) return;
      const nodes = root.querySelectorAll<HTMLElement>("[data-slide]");
      slides = Array.from(nodes, (node) => {
        const quote = node.querySelector<HTMLElement>("[data-quote]")!;
        const split = new SplitText(quote, { type: "lines", linesClass: "t-line", mask: "lines" });
        return {
          root: node,
          split,
          lines: split.lines,
          avatar: node.querySelector("[data-avatar]"),
          details: node.querySelectorAll("[data-detail]"),
        };
      });

      slides.forEach((_, i) => hide(i));
      show(0);

      prevBtn?.addEventListener("click", onPrev);
      nextBtn?.addEventListener("click", onNext);

      io = new IntersectionObserver(
        ([entry]) => {
          view.in = entry.isIntersecting;
          if (prog) entry.isIntersecting ? prog.resume() : prog.pause();
        },
        { threshold: 0.15 },
      );
      io.observe(root);
    };

    if (document.fonts && document.fonts.ready) document.fonts.ready.then(build);
    else build();

    return () => {
      cancelled = true;
      prog?.kill();
      io?.disconnect();
      prevBtn?.removeEventListener("click", onPrev);
      nextBtn?.removeEventListener("click", onNext);
      slides.forEach((s) => {
        gsap.killTweensOf(s.lines);
        gsap.killTweensOf(s.avatar);
        gsap.killTweensOf(s.details);
        s.split.revert();
      });
    };
  }, []);

  return (
    <div ref={rootRef} style={cardStyle}>
      {/* progress bar */}
      <div style={trackStyle}>
        <div data-fill style={fillStyle} />
      </div>

      {/* nav row */}
      <div style={navRow}>
        <div style={{ display: "flex", gap: 8 }}>
          <button data-prev className="t-arrow" type="button" aria-label="Forrige kundehistorie" style={arrowBtn}>
            {ArrowLeft}
          </button>
          <button data-next className="t-arrow" type="button" aria-label="Neste kundehistorie" style={arrowBtn}>
            {ArrowRight}
          </button>
        </div>
        <div style={counterStyle}>
          <span data-current>01</span> / <span data-total>{String(TESTIMONIALS.length).padStart(2, "0")}</span>
        </div>
      </div>

      <p style={monoEyebrow}>Ekte kundehistorier</p>

      {/* slides (stacked; one visible at a time) */}
      <div style={{ position: "relative", marginTop: 18 }}>
        {TESTIMONIALS.map((t) => (
          <div data-slide key={t.company}>
            <p data-quote style={quoteStyle}>
              «{t.quote}»
            </p>
            <div style={attribRow}>
              <div data-avatar style={avatarStyle}>
                {t.initial}
              </div>
              <div>
                <p data-detail style={nameStyle}>
                  {t.name}
                </p>
                <p data-detail style={companyStyle}>
                  {t.company}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const TestimonialsSection = () => (
  <section id="kundehistorier" className="px-6 md:px-12 py-24 md:py-32" style={{ ...sectionStyle, background: "#e9e2d6" }}>
    <div className="max-w-5xl mx-auto grid gap-12 md:gap-16 md:grid-cols-2 items-center">
      <Reveal>
        <p style={{ color: accent, fontWeight: 700, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase" }}>
          Tillit
        </p>
        <h2 className="hero-headline" style={{ fontSize: "clamp(28px, 4vw, 50px)", marginTop: 12, maxWidth: 440 }}>
          Det kundene sier.
        </h2>
        <p className="hero-body mt-4" style={{ maxWidth: 420, fontSize: 15.5, opacity: 0.8 }}>
          Vi måler arbeidet på én ting: at bedriften blir lettere å forstå og lettere å velge. Her er noen ord fra dem vi har bygget for.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="md:justify-self-end w-full" style={{ display: "flex", justifyContent: "flex-start" }}>
        <TestimonialCard />
      </Reveal>
    </div>
  </section>
);

export default TestimonialsSection;
