import { useEffect, useState } from "react";
import { SERVICES, type ServiceId } from "@/data/services";
import { useBreakpoint } from "@/hooks/use-mobile";
import { ServiceStone } from "./ServiceStone";

// Static bed image per breakpoint. (Placeholder = the loop poster until the
// dedicated hero-bg-{breakpoint} art is generated.)
const BG_BY_BP: Record<string, string> = {
  desktop: "/nurea-hero/hero-water-loop-poster.webp",
  tablet: "/nurea-hero/hero-water-loop-poster.webp",
  phone: "/nurea-hero/hero-water-loop-poster.webp",
};

export const Hero = () => {
  const breakpoint = useBreakpoint();
  const isTouch = breakpoint !== "desktop";
  const [activeId, setActiveId] = useState<ServiceId | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const handleActivate = (id: ServiceId) => setActiveId(id);
  const handleDeactivate = () => setActiveId(null);

  // On touch, tapping empty space closes any open popover.
  const handleBackdrop = () => {
    if (isTouch) setActiveId(null);
  };

  const bgImage = BG_BY_BP[breakpoint];

  return (
    <section
      className="hero-root relative w-screen h-screen overflow-hidden bg-[#cfdfe0]"
      style={{ color: "#15233A" }}
      aria-label="NUREA – Under Overflaten"
      onClick={handleBackdrop}
    >
      {/* Layer 0: STATIC bed image (no video → no jitter, always sharp) */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Subtle vignette for depth */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_45%,_rgba(8,28,38,0.32)_100%)]" />

      {/* Resting stones (z-20). Active stone lifts itself above the water surface. */}
      {SERVICES.map((s) => (
        <ServiceStone
          key={s.id}
          service={s}
          breakpoint={breakpoint}
          reducedMotion={reducedMotion}
          active={activeId === s.id}
          onActivate={() => handleActivate(s.id)}
          onDeactivate={handleDeactivate}
        />
      ))}

      {/* THE WATER SURFACE (z-30): faint static cyan veil + a gentle moving
          caustics video (light only) layered over the still bed. Sits above the
          resting stones so they read as submerged; the risen stone (z-45) clears it. */}
      <div
        className="absolute inset-0 z-[30] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(120,165,180,0.10) 0%, rgba(90,140,160,0.14) 55%, rgba(120,165,180,0.10) 100%)",
        }}
      />
      {!reducedMotion && (
        <video
          className="absolute inset-0 z-[30] w-full h-full object-cover pointer-events-none"
          style={{ mixBlendMode: "screen", opacity: 0.22 }}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
        >
          <source src="/nurea-hero/water-caustics-loop.webm" type="video/webm" />
          <source src="/nurea-hero/water-caustics-loop.mp4" type="video/mp4" />
        </video>
      )}

      {/* Hero text + nav */}
      <div className="relative z-[50] h-full pointer-events-none">
        <header className="flex items-center justify-between px-6 md:px-12 pt-6 md:pt-8 pointer-events-auto">
          <div className="hero-wordmark">NUREA</div>
          <nav className="hidden md:flex gap-8 hero-nav">
            <a href="/tjenester/nettsider" className="hover:opacity-100 opacity-90 transition">Tjenester</a>
            <a href="#" className="hover:opacity-100 opacity-90 transition">Arbeider</a>
            <a href="#" className="hover:opacity-100 opacity-90 transition">Kontakt</a>
          </nav>
        </header>

        {/* Desktop: copy on the RIGHT. Phone/Tablet: copy anchored at the BOTTOM. */}
        <div
          className="pointer-events-auto px-6 md:px-0"
          style={
            isTouch
              ? {
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: "5vh",
                  width: "100%",
                  textAlign: "left",
                }
              : {
                  position: "absolute",
                  left: "55vw",
                  top: "26vh",
                  width: "min(calc(100vw - 48px), clamp(420px, 38vw, 640px))",
                  textAlign: "left",
                }
          }
        >
          <p className="hero-eyebrow mb-4">Under Overflaten</p>
          <h1 className="hero-headline">Digitale uttrykk</h1>
          <p className="hero-body mt-5" style={{ maxWidth: 520 }}>
            som gjør solide bedrifter enklere å forstå, stole på og velge.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center rounded-full transition hover:brightness-110"
              style={{
                background: "#1E8A8A",
                color: "#ffffff",
                height: 48,
                padding: "0 30px",
                borderRadius: 999,
                fontSize: 14.5,
                fontFamily: "'Manrope', 'Inter', sans-serif",
                fontWeight: 700,
                letterSpacing: "0.01em",
                border: "none",
                boxShadow: "0 10px 30px rgba(30,138,138,0.38)",
              }}
            >
              Start med klarhet
            </a>
            <a
              href="/tjenester/nettsider"
              className="inline-flex items-center justify-center rounded-full transition hover:bg-[#15233A] hover:text-white"
              style={{
                background: "rgba(255,255,255,0.22)",
                color: "#15233A",
                border: "1.5px solid rgba(21,35,58,0.55)",
                height: 48,
                padding: "0 30px",
                borderRadius: 999,
                fontSize: 14.5,
                fontFamily: "'Manrope', 'Inter', sans-serif",
                fontWeight: 600,
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            >
              Utforsk tjenester
            </a>
          </div>
        </div>

        <footer className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-5 md:pb-8 flex items-end justify-between pointer-events-auto">
          <span className="hidden md:block text-[11px] uppercase tracking-[0.32em]" style={{ color: "rgba(21,35,58,0.7)", fontFamily: "'Manrope', 'Inter', sans-serif", fontWeight: 500 }}>
            ↓ Utforsk tjenestene under overflaten
          </span>
          <span className="hidden md:block text-[11px] uppercase tracking-[0.32em]" style={{ color: "rgba(21,35,58,0.55)", fontFamily: "'Manrope', 'Inter', sans-serif", fontWeight: 500 }}>
            Oslo · Norge
          </span>
        </footer>
      </div>
    </section>
  );
};

export default Hero;
