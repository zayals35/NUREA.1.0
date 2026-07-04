import { useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "../lib/motion";

interface Props {
  text: string;
  className?: string;
  /** Words wrapped in *asterisks* get the accent color when lit. */
  brightColor?: string;
  /** Resting (unlit) color; pass a dark rgba on light sections. */
  dimColor?: string;
}

/**
 * Scroll-linked word-by-word highlight: words brighten from dim to full as the
 * paragraph moves through the viewport (Monolog-style reading reveal).
 */
export default function WordReveal({
  text,
  className,
  brightColor = "#d9d1c2",
  dimColor = "rgba(217, 209, 194, 0.22)",
}: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = typeof window !== "undefined" && prefersReducedMotion();

  const words = useMemo(
    () =>
      text.split(/\s+/).map((raw) => {
        const accent = raw.startsWith("*") && raw.endsWith("*");
        return { word: accent ? raw.slice(1, -1) : raw, accent };
      }),
    [text]
  );

  useGSAP(
    () => {
      if (reduced) return;
      const spans = ref.current!.querySelectorAll<HTMLElement>(".w");
      gsap.to(spans, {
        color: (i: number) =>
          spans[i].dataset.accent === "true" ? "#e8671c" : brightColor,
        ease: "none",
        stagger: 0.06,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 78%",
          end: "bottom 45%",
          scrub: 0.4,
        },
      });
    },
    { scope: ref, dependencies: [text] }
  );

  if (reduced) {
    return (
      <p ref={ref} className={className}>
        {words.map((w, i) => (
          <span key={i} style={w.accent ? { color: "#e8671c" } : undefined}>
            {w.word}{" "}
          </span>
        ))}
      </p>
    );
  }

  return (
    <p ref={ref} className={`word-reveal ${className ?? ""}`}>
      {words.map((w, i) => (
        <span key={i} className="w inline" data-accent={w.accent} style={{ color: dimColor }}>
          {w.word}{" "}
        </span>
      ))}
    </p>
  );
}
