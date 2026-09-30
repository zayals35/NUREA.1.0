import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./lib/motion";
import { LangProvider } from "./i18n";
import { MetaProvider } from "./lib/pageMeta";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import Intro from "./components/Intro";
import Home from "./pages/Home";
import { NureaWordmark } from "./components/brand/NureaLogo";
import StudioShell, { isStudioPath } from "./components/studio/StudioShell";
import CookieNotice from "./components/CookieNotice";

const Tjenester = lazy(() => import("./pages/Tjenester"));
const Innsikt = lazy(() => import("./pages/Innsikt"));
const Artikkel = lazy(() => import("./pages/Artikkel"));
const Create = lazy(() => import("./pages/Create"));
const TjenesteDetalj = lazy(() => import("./pages/TjenesteDetalj"));
const Arbeider = lazy(() => import("./pages/Arbeider"));
const Demoer = lazy(() => import("./pages/Demoer"));
const Metoden = lazy(() => import("./pages/Metoden"));
const Klarhetssjekk = lazy(() => import("./pages/Klarhetssjekk"));
const Priser = lazy(() => import("./pages/Priser"));
const OmOss = lazy(() => import("./pages/OmOss"));
const Kontakt = lazy(() => import("./pages/Kontakt"));
const Skjema = lazy(() => import("./pages/Skjema"));
const Personvern = lazy(() => import("./pages/Personvern"));
const NotFound = lazy(() => import("./pages/NotFound"));

/**
 * Lenis inertia scroll wired into GSAP's ticker, skipped for reduced motion
 * and on the studio routes, which scroll natively (one scroll engine only).
 */
function SmoothScroll() {
  const { pathname } = useLocation();
  const approved = isStudioPath(pathname);
  useEffect(() => {
    if (approved || prefersReducedMotion()) return;
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
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, [approved]);
  return null;
}

/**
 * Scroll to top and refresh triggers on navigation. With a hash (a card's
 * link to /om-oss#ai, or a direct visit to one), land on that section
 * instead; lazy pages can mount a moment late, so look for it for up to a
 * second before settling at the top.
 */
function RouteReset() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const target = () => (hash.length > 1 ? document.getElementById(decodeURIComponent(hash.slice(1))) : null);
    const land = () => {
      const el = target();
      if (el) el.scrollIntoView({ block: "start", behavior: "instant" });
      else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return !!el;
    };
    // Instant, so the approved views' native smooth anchors never animate a route change.
    land();
    let frame = 0;
    let tries = 0;
    // Let the new page paint before measuring.
    const settle = () => {
      if (tries === 0) ScrollTrigger.refresh();
      // When the page component stays mounted across the route change (the
      // NO/EN switch), its reveals are reverted and rebuilt in a layout effect
      // before this reset, and ScrollTrigger records the scroll position at
      // that revert and restores it inside refresh(). Land once more in the
      // same frame so the twin always opens at the top, or at its section.
      if (!land() && hash.length > 1 && ++tries < 60) frame = requestAnimationFrame(settle);
    };
    frame = requestAnimationFrame(settle);
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
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
    if (prefersReducedMotion() || isStudioPath(pathname)) {
      // A curtain still covering from a quick earlier navigation must not stay.
      setPhase("idle");
      return;
    }
    setPhase("cover");
    const t1 = setTimeout(() => setPhase("lift"), 80);
    const t2 = setTimeout(() => setPhase("idle"), 800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  if (phase === "idle" || isStudioPath(pathname)) return null;
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[9980] flex items-center justify-center bg-espresso-deep"
      style={{
        transform: phase === "lift" ? "translateY(-100%)" : "translateY(0)",
        transition: phase === "lift" ? "transform 0.7s cubic-bezier(0.76, 0, 0.24, 1)" : "none",
      }}
    >
      <NureaWordmark className="h-10 w-auto text-cream/80" aria-label="Nurea" />
    </div>
  );
}

/**
 * The studio routes (home, work, services, studio, insights, create and
 * their English twins) render inside the studio frame without the custom
 * cursor, the intro curtain or the route curtain. Every other route keeps
 * the older frame until its own rebuild.
 */
function Frame() {
  const { pathname } = useLocation();
  const approved = isStudioPath(pathname);
  // The intro curtain belongs to a first visit on an older route only.
  const [introAllowed] = useState(() => !approved);

  // Set or clear explicitly on every route: a prerendered or fallback
  // document may arrive carrying the class from another page.
  useLayoutEffect(() => {
    document.documentElement.classList.toggle("st-html", approved);
  }, [approved]);

  const routes = (
    <Suspense fallback={<div className={approved ? "min-h-screen" : "min-h-screen bg-parchment"} />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tjenester" element={<Tjenester />} />
              <Route path="/tjenester/:slug" element={<TjenesteDetalj />} />
              <Route path="/arbeider" element={<Arbeider />} />
              <Route path="/demoer" element={<Demoer />} />
              <Route path="/metoden" element={<Metoden />} />
              <Route path="/klarhetssjekk" element={<Klarhetssjekk />} />
              <Route path="/priser" element={<Priser />} />
              <Route path="/om-oss" element={<OmOss />} />
              <Route path="/kontakt" element={<Kontakt />} />
              <Route path="/skjema" element={<Skjema />} />
              <Route path="/personvern" element={<Personvern />} />
              <Route path="/innsikt" element={<Innsikt />} />
              <Route path="/innsikt/:slug" element={<Artikkel />} />
              {/* Create is one English page for its global audience; a future domain replaces it through VITE_CREATE_URL. */}
              <Route path="/create" element={<Create />} />
              {/* English twins. /skjema and /personvern stay Norwegian on purpose. */}
              <Route path="/en" element={<Home />} />
              <Route path="/en/insights" element={<Innsikt />} />
              <Route path="/en/insights/:slug" element={<Artikkel />} />
              <Route path="/en/services" element={<Tjenester />} />
              <Route path="/en/services/:slug" element={<TjenesteDetalj />} />
              <Route path="/en/work" element={<Arbeider />} />
              <Route path="/en/method" element={<Metoden />} />
              <Route path="/en/clarity-check" element={<Klarhetssjekk />} />
              <Route path="/en/pricing" element={<Priser />} />
              <Route path="/en/about" element={<OmOss />} />
              <Route path="/en/contact" element={<Kontakt />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
    </Suspense>
  );

  if (approved) return <StudioShell>{routes}</StudioShell>;

  return (
    <>
      {introAllowed && <Intro />}
      <Cursor />
      <Nav />
      {routes}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LangProvider>
        <MetaProvider>
          <SmoothScroll />
          <RouteReset />
          <FontRefresh />
          <RouteCurtain />
          <Frame />
          <CookieNotice />
        </MetaProvider>
      </LangProvider>
    </BrowserRouter>
  );
}
