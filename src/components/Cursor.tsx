import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/motion";
import { sound } from "../lib/sound";

const INTERACTIVE = "a, button, [data-cursor]";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || prefersReducedMotion()) return;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    const dotX = gsap.quickSetter(dot, "x", "px");
    const dotY = gsap.quickSetter(dot, "y", "px");
    const ringX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });

    let visible = false;
    const onMove = (e: MouseEvent) => {
      if (!visible) {
        visible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(INTERACTIVE);
      if (target) {
        document.body.classList.add("cursor-hover");
        sound.play("hover");
      } else {
        document.body.classList.remove("cursor-hover");
      }
    };

    const onLeave = () => {
      visible = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.body.classList.remove("cursor-hover");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring hidden md:block" aria-hidden="true" />
    </>
  );
}
