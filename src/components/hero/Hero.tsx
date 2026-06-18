import { useEffect, useMemo, useState } from "react";
import { SERVICES, type ServiceId } from "@/data/services";
import { useIsMobile } from "@/hooks/use-mobile";
import { ServiceStone } from "./ServiceStone";
import { MobileServiceSheet } from "./MobileServiceSheet";

export const Hero = () => {
  const isMobile = useIsMobile();
  const [activeId, setActiveId] = useState<ServiceId | null>(null);
  const [sheetId, setSheetId] = useState<ServiceId | null>(null);

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

  // SVG connection lines between stones (use desktop positions as % anchors)
  const lines = useMemo(() => {
    const pts = SERVICES.map((s) => {
      const pos = isMobile ? s.mobile : s.desktop;
      return { id: s.id, x: parseFloat(pos.left), y: parseFloat(pos.top) };
    });
    // chain through them in a calm top-to-bottom order
    const order: ServiceId[] = ["reklamer", "merkevare", "innhold", "systemer", "nettsider"];
    const ordered = order.map((id) => pts.find((p) => p.id === id)!).filter(Boolean);
    return ordered;
  }, [isMobile]);

  return (
    <section
      className="hero-root relative w-screen h-screen overflow-hidden bg-[#cfdfe0]"
      style={{ color: "#17242A" }}
      aria-label="NUREA – Under Overflaten"
    >
      {/* Layer 1: actual water background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroWaterAsset.url})`,
        }}
      />
      {/* Subtle vignette for depth */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_45%,_rgba(8,28,38,0.35)_100%)]" />

      {/* Layer 2: gold connection lines (beneath water shimmer) */}
      <svg
        className="absolute inset-0 z-[10] w-full h-full pointer-events-none opacity-50 mix-blend-soft-light"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="goldLine" x1="0" x2="1">
            <stop offset="0%" stopColor="hsl(var(--gold))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--gold))" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(var(--gold))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          fill="none"
          stroke="url(#goldLine)"
          strokeWidth="0.15"
          strokeLinecap="round"
          points={lines.map((p) => `${p.x},${p.y}`).join(" ")}
        />
      </svg>

      {/* Stones (z controlled per-state inside) */}
      {SERVICES.map((s) => (
        <ServiceStone
          key={s.id}
          service={s}
          isMobile={isMobile}
          active={activeId === s.id}
          onActivate={() => handleActivate(s.id)}
          onDeactivate={handleDeactivate}
        />
      ))}

      {/* Layer 3: subtle blue water veil above stones */}
      <div
        className="absolute inset-0 z-[30] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(12,40,55,0.08) 0%, rgba(18,60,75,0.14) 60%, rgba(12,40,55,0.10) 100%)",
        }}
      />

      {/* Layer 4: uploaded water caustics overlay above stones */}
      <div
        className="absolute inset-0 z-[40] pointer-events-none bg-cover bg-center bg-no-repeat mix-blend-soft-light opacity-[0.08]"
        style={{ backgroundImage: "url(/nurea-hero/water-caustics-overlay.png)" }}
      />
      <div className="shimmer absolute inset-0 z-[41] pointer-events-none mix-blend-overlay opacity-30" />

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
