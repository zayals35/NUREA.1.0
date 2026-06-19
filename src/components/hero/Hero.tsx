import { useEffect, useMemo, useState } from "react";
import { SERVICES, type ServiceId } from "@/data/services";
import { useIsMobile } from "@/hooks/use-mobile";
import { ServiceStone } from "./ServiceStone";
import { MobileServiceSheet } from "./MobileServiceSheet";

export const Hero = () => {
  const isMobile = useIsMobile();
  const [activeId, setActiveId] = useState<ServiceId | null>(null);
  const [sheetId, setSheetId] = useState<ServiceId | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const activeService = useMemo(
    () => SERVICES.find((s) => s.id === sheetId) ?? null,
    [sheetId]
  );

  const handleActivate = (id: ServiceId) => {
    setActiveId(id);
    if (isMobile) setSheetId(id);
  };

  const handleDeactivate = () => {
    if (!isMobile) setActiveId(null);
  };

  return (
    <section
      className="hero-root relative w-screen h-screen overflow-hidden bg-[#cfdfe0]"
      style={{ color: "#17242A" }}
      aria-label="NUREA – Under Overflaten"
    >
      {/* Layer 1: animated water background */}
      {reducedMotion ? (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/nurea-hero/hero-water-loop-poster.webp)" }}
        />
      ) : (
        <>
          {/* Poster image behind video — fades out once video plays */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-out"
            style={{
              backgroundImage: "url(/nurea-hero/hero-water-loop-poster.webp)",
              opacity: videoReady ? 0 : 1,
            }}
          />
          <video
            className="hero-bg absolute inset-0 z-0 w-full h-full object-cover pointer-events-none transition-opacity duration-1000 ease-out"
            style={{ opacity: videoReady ? 1 : 0 }}
            autoPlay
            muted
            loop
            playsInline
            onPlaying={() => setVideoReady(true)}
          >
            <source src="/nurea-hero/hero-water-loop-mobile.webm" type="video/webm" media="(max-width: 768px)" />
            <source src="/nurea-hero/hero-water-loop-mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
            <source src="/nurea-hero/hero-water-loop.webm" type="video/webm" />
            <source src="/nurea-hero/hero-water-loop.mp4" type="video/mp4" />
          </video>
        </>
      )}
      {/* Subtle vignette for depth */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_45%,_rgba(8,28,38,0.35)_100%)]" />

      {/* Resting stones (z-20). Active stone lifts itself above the surface layer. */}
      {SERVICES.map((s) => (
        <ServiceStone
          key={s.id}
          service={s}
          isMobile={isMobile}
          reducedMotion={reducedMotion}
          active={activeId === s.id}
          onActivate={() => handleActivate(s.id)}
          onDeactivate={handleDeactivate}
        />
      ))}

      {/* THE WATER SURFACE (z-30) — caustics + cyan veil that sit ABOVE the resting
          stones, so they read as submerged. One slow non-directional motion. */}
      <div className="surface absolute inset-0 z-[30] pointer-events-none" aria-hidden />
      <div className="shimmer absolute inset-0 z-[31] pointer-events-none mix-blend-overlay opacity-20" />

      {/* Subtle readability veil on the right where the hero text lives */}
      <div
        className="absolute inset-y-0 right-0 w-full md:w-[55%] z-[45] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 75% 45%, rgba(235,242,240,0.35) 0%, rgba(220,232,232,0.18) 45%, transparent 75%)",
        }}
      />

      {/* Hero text */}
      <div className="relative z-[50] h-full pointer-events-none">
        <header className="flex items-center justify-between px-6 md:px-12 pt-6 md:pt-8 pointer-events-auto">
          <div className="hero-wordmark">NUREA</div>
          <nav className="hidden md:flex gap-8 hero-nav">
            <a href="/tjenester/nettsider" className="hover:opacity-100 opacity-90 transition">Tjenester</a>
            <a href="#" className="hover:opacity-100 opacity-90 transition">Arbeider</a>
            <a href="#" className="hover:opacity-100 opacity-90 transition">Kontakt</a>
          </nav>
        </header>

        <div
          className="px-6 md:px-0 pt-12 md:pt-0 pointer-events-auto md:absolute"
          style={{
            left: "57vw",
            top: "30vh",
            width: "min(calc(100vw - 48px), clamp(420px, 36vw, 620px))",
            textAlign: "left",
          }}
        >
          <p className="hero-eyebrow mb-5">Under Overflaten</p>
          <h1 className="hero-headline" style={{ maxWidth: 720 }}>
            Digitale uttrykk som gjør solide bedrifter enklere å forstå, stole på og velge.
          </h1>
          <p className="hero-body mt-6" style={{ maxWidth: 520 }}>
            NUREA bygger merkevare, nettsider, innhold og digitale systemer med én tydelig retning.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center rounded-full font-semibold shadow-[0_10px_30px_rgba(185,150,85,0.35)] hover:brightness-105 transition"
              style={{
                background: "#C99A46",
                color: "#17242A",
                height: 46,
                padding: "0 28px",
                borderRadius: 999,
                fontSize: 14,
                fontFamily: "'Manrope', 'Inter', sans-serif",
                fontWeight: 600,
                border: "none",
              }}
            >
              Start med klarhet
            </a>
            <a
              href="/tjenester/nettsider"
              className="inline-flex items-center justify-center rounded-full font-medium transition hover:bg-white/30"
              style={{
                background: "rgba(255, 255, 255, 0.18)",
                color: "#17242A",
                border: "1px solid rgba(23, 36, 42, 0.42)",
                height: 46,
                padding: "0 28px",
                borderRadius: 999,
                fontSize: 14,
                fontFamily: "'Manrope', 'Inter', sans-serif",
                fontWeight: 500,
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            >
              Utforsk tjenester
            </a>
          </div>
        </div>

        <footer className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-6 md:pb-10 flex items-end justify-between pointer-events-auto">
          <span className="text-[11px] uppercase tracking-[0.32em]" style={{ color: "rgba(23,36,42,0.7)", fontFamily: "'Manrope', 'Inter', sans-serif", fontWeight: 500 }}>
            ↓ Utforsk tjenestene under overflaten
          </span>
          <span className="hidden md:block text-[11px] uppercase tracking-[0.32em]" style={{ color: "rgba(23,36,42,0.55)", fontFamily: "'Manrope', 'Inter', sans-serif", fontWeight: 500 }}>
            Oslo · Norge
          </span>
        </footer>
      </div>

      {isMobile && (
        <MobileServiceSheet
          service={activeService}
          onClose={() => {
            setSheetId(null);
            setActiveId(null);
          }}
        />
      )}
    </section>
  );
};

export default Hero;
