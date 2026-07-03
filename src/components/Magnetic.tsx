import { useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "../lib/motion";

interface Props {
  children: ReactNode;
  strength?: number;
  className?: string;
}

/** Pulls its content gently toward the cursor. Desktop pointer only. */
export default function Magnetic({ children, strength = 0.3, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    gsap.to(el, { x, y, duration: 0.4, ease: "power3.out" });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <div ref={ref} className={className} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}
