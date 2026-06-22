// hoverEffect.ts — Monolog-style unified hover (visual + sound).
// Fast fade-in / slow fade-out background tint + subtle lift, with a tap sound
// fired from the same mouseenter event. The hero stones (.stone-btn) get sound
// only — their own React handlers own their motion.

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { playHover } from "./soundSystem";

gsap.registerPlugin(CustomEase);
// Exact Monolog ease: cubic-bezier(0.31, 0.75, 0.22, 1)
CustomEase.create("monolog", "M0,0 C0.31,0.75 0.22,1 1,1");

const EASE = "monolog";
const DUR_IN = 0.3;
const DUR_OUT = 0.65;

// Adaptive tint: dark elements (over the water hero) get a light highlight,
// light elements (content sections) get a warm dark tint. Keeps the effect
// visible on every background.
const TINT_ON_LIGHT = "rgba(26, 23, 19, 0.10)";
const TINT_ON_DARK = "rgba(250, 250, 249, 0.12)";

const SELECTOR = 'a, button, [role="button"]';

const prefersReduced =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Find the first ancestor with a non-transparent background and decide whether
// it reads as dark, so we can pick a contrasting tint.
function backgroundIsDark(el: Element): boolean {
  let node: Element | null = el;
  while (node) {
    const bg = getComputedStyle(node).backgroundColor;
    const m = bg.match(/rgba?\(([^)]+)\)/);
    if (m) {
      const parts = m[1].split(",").map((p) => parseFloat(p.trim()));
      const [r, g, b, a = 1] = parts;
      if (a > 0.1) {
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance < 0.5;
      }
    }
    node = node.parentElement;
  }
  return false; // default: assume light background
}

interface HoverEl extends HTMLElement {
  _restBg?: string;
}

export function attachHoverEffect(selector = SELECTOR) {
  document.querySelectorAll<HoverEl>(selector).forEach((el) => {
    if (el.dataset.hoverAttached) return;
    el.dataset.hoverAttached = "true";

    const stone = el.matches(".stone-btn");

    if (!stone) {
      el._restBg = getComputedStyle(el).backgroundColor;
    }

    el.addEventListener(
      "mouseenter",
      () => {
        // Sound always fires — this is what makes the stones audible too.
        // TODO: stones should later use a dedicated stone-movement sound.
        playHover();

        if (stone) return; // sound only, no visual

        const tint = backgroundIsDark(el) ? TINT_ON_DARK : TINT_ON_LIGHT;
        gsap.to(el, {
          backgroundColor: tint,
          y: prefersReduced ? 0 : -2,
          duration: prefersReduced ? 0 : DUR_IN,
          ease: EASE,
          overwrite: "auto",
        });
      },
      { passive: true }
    );

    if (stone) return;

    el.addEventListener(
      "mouseleave",
      () => {
        gsap.to(el, {
          backgroundColor: el._restBg ?? "rgba(0,0,0,0)",
          y: 0,
          duration: prefersReduced ? 0 : DUR_OUT,
          ease: EASE,
          overwrite: "auto",
        });
      },
      { passive: true }
    );
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => attachHoverEffect());
} else {
  attachHoverEffect();
}

const observer = new MutationObserver(() => attachHoverEffect());
observer.observe(document.body, { childList: true, subtree: true });
