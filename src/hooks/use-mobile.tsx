import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export type Breakpoint = "phone" | "tablet" | "desktop";

// The hero has two real compositions: a LANDSCAPE (16:9) desktop bed and a
// PORTRAIT (9:16) phone/tablet bed. We pick the layout by the viewport's
// ORIENTATION, not its raw CSS width. Width alone is unreliable: on laptops with
// OS display scaling (125–150%) the browser reports a shrunken CSS width, which
// used to push a perfectly wide landscape window into the phone/tablet band and
// render the cramped portrait bed on a widescreen. Orientation scales with both
// dimensions, so it stays correct, and matching bed orientation to the viewport
// keeps the bed filling the screen instead of cropping to a narrow slice.
function readBreakpoint(): Breakpoint {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const landscape = w >= h;

  if (landscape) {
    // Any landscape viewport (mouse or touch) gets the desktop hero; only a tiny
    // phone held sideways falls back to the portrait layout. Stones respond to
    // both hover and tap, so the desktop layout works with a finger too.
    return w >= 600 ? "desktop" : "phone";
  }
  // Portrait viewport: split phone vs tablet by width.
  return w >= MOBILE_BREAKPOINT ? "tablet" : "phone";
}

/**
 * Responsive hero breakpoint, chosen by viewport orientation (see readBreakpoint):
 * landscape → desktop; portrait → tablet (≥768) or phone (<768).
 */
export function useBreakpoint(): Breakpoint {
  const [bp, setBp] = React.useState<Breakpoint>(() =>
    typeof window === "undefined" ? "desktop" : readBreakpoint()
  );

  React.useEffect(() => {
    const onResize = () => setBp(readBreakpoint());
    window.addEventListener("resize", onResize);
    // Orientation changes (tablet/phone rotate) also need a re-read.
    window.addEventListener("orientationchange", onResize);
    onResize();
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  return bp;
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
