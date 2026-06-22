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
const TINT_ON_LIGHT = "rgba(26, 23, 19, 0.16)";
const TINT_ON_DARK = "rgba(250, 250, 249, 0.18)";

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

function hasSolidBackground(bgStr: string): boolean {
  const m = bgStr.match(/rgba?\(([^)]+)\)/);
  if (!m) return false;
  const parts = m[1].split(",").map((p) => parseFloat(p.trim()));
  const a = parts[3] ?? 1;
  return a > 0.1;
}

interface HoverEl extends HTMLElement {
  _restBg?: string;
  _hasSolidBg?: boolean;
}

export function attachHoverEffect(selector = SELECTOR) {
  document.querySelectorAll<HoverEl>(selector).forEach((el) => {
    if (el.dataset.hoverAttached) return;
    el.dataset.hoverAttached = "true";

    const stone = el.matches(".stone-btn");

    if (!stone) {
      const cs = getComputedStyle(el);
      el._restBg = cs.backgroundColor;
      // Elements with their own solid background (pill buttons) get lift only —
      // overlaying a tint would erase their color and make text unreadable.
      el._hasSolidBg = hasSolidBackground(cs.backgroundColor);
      if (cs.borderTopLeftRadius === "0px") {
        el.style.borderRadius = "8px";
      }
    }

    el.addEventListener(
      "mouseenter",
      () => {
        // TODO: stones should later use a dedicated stone-movement sound.
        playHover();

        if (stone) return; // sound only, no visual

        const tweenVars: gsap.TweenVars = {
          y: prefersReduced ? 0 : -2,
          duration: prefersReduced ? 0 : DUR_IN,
          ease: EASE,
          overwrite: "auto",
        };
        // Only tint transparent-background elements (nav links, FAQ rows).
        // Solid-background buttons get lift only to avoid washing out their color.
        if (!el._hasSolidBg) {
          tweenVars.backgroundColor = backgroundIsDark(el)
            ? TINT_ON_DARK
            : TINT_ON_LIGHT;
        }
        gsap.to(el, tweenVars);
      },
      { passive: true }
    );

    if (stone) return;

    el.addEventListener(
      "mouseleave",
      () => {
        const tweenVars: gsap.TweenVars = {
          y: 0,
          duration: prefersReduced ? 0 : DUR_OUT,
          ease: EASE,
          overwrite: "auto",
        };
        if (!el._hasSolidBg) {
          tweenVars.backgroundColor = el._restBg ?? "rgba(0,0,0,0)";
        }
        gsap.to(el, tweenVars);
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
