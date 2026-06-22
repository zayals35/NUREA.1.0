import { useEffect, useState, type CSSProperties } from "react";
import { SERVICES, type ServiceId } from "@/data/services";
import { useBreakpoint, useCanHover, type Breakpoint } from "@/hooks/use-mobile";
import { ServiceStone } from "./ServiceStone";
import { CausticsLayer } from "./CausticsLayer";

// Static bed image per breakpoint. Currently the approved poster; the code
// layers below (engraved N, electric lines, pockets, text-stone) do NOT depend
// on it, so the final bed photo can be swapped in here with no rework.
const BG_BY_BP: Record<string, string> = {
  desktop: "/nurea-hero/hero-bg-desktop.webp",
  // Tablet reuses the phone (portrait) bed and the whole phone layout.
  tablet: "/nurea-hero/hero-bg-phone.webp",
  phone: "/nurea-hero/hero-bg-phone.webp",
};

// Centre of the engraved NUREA emblem in each bed (SVG units 0..100 of the
// artboard). The electric lines converge here. The landscape desktop bed carries
// it lower-centre; the portrait phone/tablet bed carries it upper-centre.
const N_POS_BY_BP: Record<Breakpoint, { x: number; y: number }> = {
  desktop: { x: 40, y: 57 },
  tablet: { x: 47, y: 32 },
  phone: { x: 47, y: 32 },
};
const numOf = (v: string) => parseFloat(v);

export const Hero = () => {
  const breakpoint = useBreakpoint();
  const isTouch = breakpoint !== "desktop";
  // Interaction mode is decided by pointer capability, NOT viewport size, so a
  // narrowed desktop window keeps hover working and only real touch devices get
  // the tap affordance.
  const canHover = useCanHover();
  const hintText = canHover ? "Hold over en stein" : "Trykk på en stein for info";
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
  const nPos = N_POS_BY_BP[breakpoint];
  // Radius of the halo (in % of artboard height) where the electric lines stop,
  // sized to clear the engraved N glyph so it stays visible. Desktop's emblem is
  // larger than the portrait bed's.
  const HALO_R = breakpoint === "desktop" ? 9 : 6;
  // Tablet reuses the phone (portrait) stone layout.
  const stonePosOf = (s: (typeof SERVICES)[number]) =>
    breakpoint === "tablet" ? s.phone : s[breakpoint];

  // The artboard aspect ratio matches the bed image for this breakpoint (portrait
  // 9:16 on phone & tablet, landscape 16:9 on desktop). It is sized to COVER the
  // viewport and centred, so the bed fills the screen while the stones (positioned
  // in % of the artboard) stay locked to their pockets at any screen size.
  const artboardAR = breakpoint === "desktop" ? 16 / 9 : 9 / 16;
  const artboardStyle: CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: `max(100vw, calc(100vh * ${artboardAR}))`,
    height: `max(100vh, calc(100vw / ${artboardAR}))`,
  };

  // Hero copy + CTAs, reused by the desktop text-stone and the touch block.
  const heroCopy = (
    <>
      <h1 className="hero-headline">
        Lettere å forstå.
        <br />
        Lettere å velge.
      </h1>
      <p className="hero-body mt-4">
        Merkevare, nettsider, innhold og systemer, samlet i én tydelig retning.
      </p>
      <div className="cta-row mt-6 flex flex-wrap items-center gap-x-7 gap-y-3 justify-end">
        <a href="/metoden" className="cta-link cta-link--primary">
          Se hvordan vi jobber<span aria-hidden> →</span>
        </a>
        <a href="/kontakt" className="cta-link">
          Kontakt oss<span aria-hidden> →</span>
        </a>
      </div>
    </>
  );

  return (
    <section
      className="hero-root relative w-screen h-screen overflow-hidden bg-[#e6ddcf]"
      style={{ color: "#2a1f16" }}
      aria-label="NUREA – Under Overflaten"
      onClick={handleBackdrop}
    >
      {/* ARTBOARD: bed + stones + water overlay share one fixed-aspect canvas
          (9:16 phone / 16:9 desktop), sized to COVER the viewport and centred.
          Stone left/top/width are percentages of THIS artboard, so each stone
          stays glued to its pocket on the bed image at any screen size. */}
      <div style={artboardStyle}>
      {/* Layer 0: STATIC bed image (no video → no jitter, always sharp). A light
          contrast/saturation lift makes the bed read crisper. */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bgImage})`,
          filter: "contrast(1.08) saturate(1.05) brightness(0.96)",
        }}
      />

      {/* Subtle vignette for depth */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_48%,_rgba(48,30,14,0.30)_100%)]" />

      {/* Touch (phone + tablet): subtle light-lift over the engraved NUREA mark
          baked into the portrait bed. Above the bed (z-2), below the stones. */}
      {isTouch && (
        <div className="nurea-mobile-logo-lift" aria-hidden />
      )}

      {/* Desktop: brighter light-lift over the carved NUREA emblem so it pops. */}
      {!isTouch && (
        <div className="nurea-desktop-logo-lift" aria-hidden />
      )}

      {/* Animated WebGL water caustics over the wet area, every breakpoint. The
          bed stays static (camera locked); only the caustic light moves (z-3, below
          the stones). Masked off the dry stone (a landscape-tuned mask on desktop,
          the portrait mask on touch); skipped under reduced motion. */}
      {!reducedMotion && (
        <CausticsLayer className={isTouch ? "" : "water-caustics-canvas--desktop"} />
      )}

      {/* LAKEBED FLOOR (z-10): electric lines running from each stone into the
          engraved N. Below the resting stones (z-20) so the stones lie on top of
          the floor. Rendered on every breakpoint, using that breakpoint's stone
          positions and N location. */}
      <div className="absolute inset-0 z-[10] pointer-events-none" aria-hidden>
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {SERVICES.map((s) => {
            const p = stonePosOf(s);
            const x = numOf(p.left);
            const y = numOf(p.top);
            const on = activeId === s.id;
            // Each line stops on a halo around the N rather than at its centre, so
            // it connects to the glyph from its own side (different angle per stone)
            // and the N stays clearly visible in the middle. The artboard is
            // stretched non-uniformly (preserveAspectRatio="none"), so we correct
            // by AR to keep the halo a visual circle.
            const dx = x - nPos.x;
            const dy = y - nPos.y;
            const len = Math.hypot(dx * artboardAR, dy) || 1;
            const ex = nPos.x + (HALO_R * dx) / len;
            const ey = nPos.y + (HALO_R * dy) / len;
            return (
              <g key={s.id}>
                <line
                  x1={x}
                  y1={y}
                  x2={ex}
                  y2={ey}
                  stroke="#ffd23f"
                  strokeOpacity={on ? 0.85 : 0.3}
                  strokeWidth={on ? 2 : 1}
                  vectorEffect="non-scaling-stroke"
                />
                {!reducedMotion && (
                  <line
                    x1={x}
                    y1={y}
                    x2={ex}
                    y2={ey}
                    className="electric-pulse"
                    stroke="#fff3c4"
                    strokeWidth={on ? 2.6 : 1.6}
                    strokeDasharray="3 16"
                    vectorEffect="non-scaling-stroke"
                    style={{ animationDuration: on ? "0.7s" : "1.7s" }}
                  />
                )}
              </g>
            );
          })}
        </svg>
        {/* The NUREA emblem is carved into the bed image itself, so no overlay
            glyph here. The electric lines above converge on its position. */}
      </div>

      {/* Resting stones (z-20). Active stone lifts itself above the water surface. */}
      {SERVICES.map((s) => (
        <ServiceStone
          key={s.id}
          service={s}
          breakpoint={breakpoint}
          canHover={canHover}
          reducedMotion={reducedMotion}
          active={activeId === s.id}
          onActivate={() => handleActivate(s.id)}
          onDeactivate={handleDeactivate}
        />
      ))}

      {/* Static water-surface veil (z-30): a faint warm tint over the resting
          stones so they read as submerged. The moving caustics video was removed
          (it clashed with the bed and lagged on mobile); the bed carries the water
          itself. The risen stone (z-45) clears this veil. */}
      <div
        className="absolute inset-0 z-[30] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(208,182,148,0.10) 0%, rgba(172,142,106,0.14) 55%, rgba(208,182,148,0.10) 100%)",
        }}
      />

      {/* Clarity overlay (z-31): a gentle darken, a touch stronger toward the
          bottom, so the bed gains depth and the cream text reads cleanly. Sits
          above the resting scene but below the risen active stone (z-45) and the
          text (z-50), which both stay bright and pop. */}
      <div
        className="absolute inset-0 z-[31] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(24,16,8,0.10) 0%, rgba(24,16,8,0.16) 55%, rgba(24,16,8,0.26) 100%)",
        }}
      />
      </div>
      {/* /artboard */}

      {/* Hero text + nav */}
      <div className="relative z-[50] h-full pointer-events-none">
        <header className="flex items-start justify-between px-6 md:px-12 pt-6 md:pt-8 pointer-events-auto">
          <div>
            <div className="hero-wordmark">NUREA</div>
          </div>
          <nav className="hidden lg:flex gap-8 hero-nav pt-1">
            <a href="/tjenester" className="hover:opacity-100 opacity-90 transition">Tjenester</a>
            <a href="/metoden" className="hover:opacity-100 opacity-90 transition">Metoden</a>
            <a href="/priser" className="hover:opacity-100 opacity-90 transition">Priser</a>
            <a href="/#arbeider" className="hover:opacity-100 opacity-90 transition">Arbeider</a>
            <a href="/kontakt" className="hover:opacity-100 opacity-90 transition">Kontakt</a>
          </nav>
        </header>

        {/* Desktop affordance cue (hover). On touch the cue lives inside the
            bottom copy block (below) as an eyebrow, so it can never overlap the
            headline when the text reflows at narrow widths / high zoom. */}
        {!isTouch && (
          <div className="pointer-events-none" style={{ position: "absolute", left: "3vw", top: "46vh" }}>
            <span className="hover-hint">{hintText}</span>
          </div>
        )}

        {/* Desktop: copy on a text-stone bottom-right. Touch: copy at the bottom. */}
        {isTouch ? (
          <div
            className="pointer-events-auto hero-touch-copy"
            style={{
              position: "absolute",
              right: "6vw",
              bottom: "max(2vh, 12px)",
              maxWidth: "min(74vw, 300px)",
              textAlign: "right",
            }}
          >
            <div style={{ marginBottom: 12 }}>
              <span className="hover-hint">{hintText}</span>
            </div>
            {heroCopy}
          </div>
        ) : (
          <div className="hero-copy pointer-events-auto">{heroCopy}</div>
        )}

        <footer className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-5 md:pb-8 flex items-end justify-between pointer-events-auto">
          <span className="hidden lg:block text-[11px] uppercase tracking-[0.32em]" style={{ color: "rgba(42,31,22,0.7)", fontFamily: "'Manrope', 'Inter', sans-serif", fontWeight: 500 }}>
            ↓ Utforsk tjenestene under overflaten
          </span>
          <span className="hidden lg:block text-[11px] uppercase tracking-[0.32em]" style={{ color: "rgba(42,31,22,0.55)", fontFamily: "'Manrope', 'Inter', sans-serif", fontWeight: 500 }}>
            Trondheim · Norge
          </span>
        </footer>
      </div>
    </section>
  );
};

export default Hero;
