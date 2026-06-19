import * as React from "react";

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

export type Breakpoint = "phone" | "tablet" | "desktop";

function readBreakpoint(): Breakpoint {
  const w = window.innerWidth;
  if (w < MOBILE_BREAKPOINT) return "phone";
  if (w < TABLET_BREAKPOINT) return "tablet";
  return "desktop";
}

/** Three-way responsive breakpoint: phone <768, tablet 768–1023, desktop ≥1024. */
export function useBreakpoint(): Breakpoint {
  const [bp, setBp] = React.useState<Breakpoint>(() =>
    typeof window === "undefined" ? "desktop" : readBreakpoint()
  );

  React.useEffect(() => {
    const onResize = () => setBp(readBreakpoint());
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
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
