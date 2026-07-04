import { useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "../lib/motion";

interface Props {
  /** Paragraphs separated by blank lines. */
  text: string;
  className?: string;
}

/**
 * Monolog-style statement reveal: every character fades from dim to full,
 * scrubbed by scroll, reading left to right through the whole block.
 */
export default function CharReveal({ text, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = typeof window !== "undefined" && prefersReducedMotion();

  const paragraphs = useMemo(
    () => text.split(/\n\s*\n/).map((p) => p.trim().split(/\s+/)),
    [text]
  );

  useGSAP(
    () => {
      if (reduced) return;
      const chars = ref.current!.querySelectorAll<HTMLElement>(".ch");
      gsap.fromTo(
        chars,
        { opacity: 0.13 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.5 / chars.length,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            end: "bottom 48%",
            scrub: 0.35,
          },
        }
      );
    },
    { scope: ref, dependencies: [text] }
  );

  return (
    <div ref={ref} className={className}>
      {paragraphs.map((words, pi) => (
        <p key={pi} className={pi > 0 ? "mt-[1.1em]" : undefined}>
          {words.map((word, wi) => (
            <span key={wi} className="inline-block whitespace-nowrap">
              {word.split("").map((c, ci) =>
                reduced ? (
                  c
                ) : (
                  <span key={ci} className="ch inline-block" style={{ opacity: 0.13 }}>
                    {c}
                  </span>
                )
              )}
              {" "}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}
