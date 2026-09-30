import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/motion";

/**
 * Quick, complete scroll reveals for every `[data-rv]` element under `root`.
 * Nothing is hidden by CSS: the from-tween is applied only when GSAP has
 * initialised and the visitor has not asked for reduced motion, so the
 * content is always readable if animation never starts. `gsap.matchMedia`
 * reverts the tweens if the preference changes during the session.
 */
export function useReveal(root: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const els = gsap.utils.toArray<HTMLElement>("[data-rv]", root.current!);
        els.forEach((el) => {
          gsap.from(el, {
            y: 26,
            autoAlpha: 0,
            duration: 0.7,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: deps, revertOnUpdate: true }
  );
}
