import { useRef, type ReactNode, type ElementType } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, prefersReducedMotion, isMobile } from "../lib/motion";
import { sound } from "../lib/sound";

type Variant = "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale-up";

interface Props {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  as?: ElementType;
  className?: string;
  /** Stagger direct children instead of animating the wrapper as one block. */
  stagger?: number;
  /** Play the section-enter sound when this block reveals. */
  sfx?: boolean;
}

const FROM: Record<Variant, gsap.TweenVars> = {
  "fade-up": { y: 44, opacity: 0 },
  "fade-in": { opacity: 0 },
  "slide-left": { x: 56, opacity: 0 },
  "slide-right": { x: -56, opacity: 0 },
  "scale-up": { scale: 0.94, opacity: 0, transformOrigin: "center bottom" },
};

/**
 * Scroll reveal that settles early (start at 85% viewport) so content is never
 * ghosted when it reaches the reader. Content stays visible without JS.
 */
export default function Reveal({
  children,
  variant = "fade-up",
  delay = 0,
  as: Tag = "div",
  className,
  stagger,
  sfx,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = ref.current!;
      const targets = stagger ? Array.from(el.children) : el;
      const from = { ...FROM[variant] };
      if (isMobile()) {
        if (typeof from.y === "number") from.y = from.y * 0.6;
        if (typeof from.x === "number") from.x = from.x * 0.6;
      }
      gsap.from(targets, {
        ...from,
        duration: isMobile() ? 0.55 : 0.8,
        ease: "expo.out",
        delay,
        stagger: stagger ?? 0,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: sfx ? () => sound.play("enter") : undefined,
        },
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref as React.Ref<HTMLElement>} className={className}>
      {children}
    </Tag>
  );
}

export { ScrollTrigger };
