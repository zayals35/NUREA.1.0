import { useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./motion";

/**
 * Award-site staple: the element skews with scroll velocity and settles
 * elastically when scrolling stops. Transform-only, one global listener.
 */
export function useVelocitySkew(ref: RefObject<HTMLElement | null>, max = 6) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    const proxy = { skew: 0 };
    const setter = gsap.quickSetter(el, "skewX", "deg");
    const clamp = gsap.utils.clamp(-max, max);
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const skew = clamp(self.getVelocity() / -500);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.9,
            ease: "power3",
            overwrite: true,
            onUpdate: () => setter(proxy.skew),
          });
        }
      },
    });
    return () => st.kill();
  }, [ref, max]);
}
