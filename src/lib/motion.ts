import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const EASE = "expo.out";

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isMobile(): boolean {
  return window.matchMedia("(max-width: 767px)").matches;
}

export { gsap, ScrollTrigger };
