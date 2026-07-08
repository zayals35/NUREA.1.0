import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./lib/motion";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import Intro from "./components/Intro";
import Home from "./pages/Home";

const Tjenester = lazy(() => import("./pages/Tjenester"));
const TjenesteDetalj = lazy(() => import("./pages/TjenesteDetalj"));
const Arbeider = lazy(() => import("./pages/Arbeider"));
const Metoden = lazy(() => import("./pages/Metoden"));
const Klarhetssjekk = lazy(() => import("./pages/Klarhetssjekk"));
const Priser = lazy(() => import("./pages/Priser"));
const OmOss = lazy(() => import("./pages/OmOss"));
const Kontakt = lazy(() => import("./pages/Kontakt"));
const Skjema = lazy(() => import("./pages/Skjema"));
const Personvern = lazy(() => import("./pages/Personvern"));
const NotFound = lazy(() => import("./pages/NotFound"));

/** Lenis inertia scroll wired into GSAP's ticker, skipped for reduced motion. */
function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    // Exposed so anchor scrolls and tooling can drive the smooth scroller.
    (window as unknown as { lenis?: Lenis }).lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
  return null;
}

/** Scroll to top and refresh triggers on navigation. */
function RouteReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    // Let the new page paint before measuring.
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [pathname]);
  return null;
}

/**
 * Webfonts shift layout when they land; re-measure every trigger so scroll
 * animations never fire from stale positions (this killed reveals on deploy).
 */
function FontRefresh() {
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);
  return null;
}

/** Ink curtain that lifts off each new page. */
function RouteCurtain() {
  const { pathname } = useLocation();
  const first = useRef(true);
  const [phase, setPhase] = useState<"idle" | "cover" | "lift">("idle");

  useLayoutEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (prefersReducedMotion()) return;
    setPhase("cover");
    const t1 = setTimeout(() => setPhase("lift"), 80);
    const t2 = setTimeout(() => setPhase("idle"), 800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  if (phase === "idle") return null;
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[9980] flex items-center justify-center bg-espresso-deep"
      style={{
        transform: phase === "lift" ? "translateY(-100%)" : "translateY(0)",
        transition: phase === "lift" ? "transform 0.7s cubic-bezier(0.76, 0, 0.24, 1)" : "none",
      }}
    >
      <span className="display text-2xl text-cream/80">Nurea</span>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll />
      <RouteReset />
      <FontRefresh />
      <RouteCurtain />
      <Intro />
      <Cursor />
      <Nav />
      <Suspense fallback={<div className="min-h-screen bg-espresso" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tjenester" element={<Tjenester />} />
          <Route path="/tjenester/:slug" element={<TjenesteDetalj />} />
          <Route path="/arbeider" element={<Arbeider />} />
          <Route path="/metoden" element={<Metoden />} />
          <Route path="/klarhetssjekk" element={<Klarhetssjekk />} />
          <Route path="/priser" element={<Priser />} />
          <Route path="/om-oss" element={<OmOss />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/skjema" element={<Skjema />} />
          <Route path="/personvern" element={<Personvern />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}
