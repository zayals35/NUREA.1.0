import { forwardRef, useState } from "react";
import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";

interface Props {
  service: Service;
  active: boolean;
  isMobile: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}

export const ServiceStone = forwardRef<HTMLButtonElement, Props>(
  ({ service, active, isMobile, onActivate, onDeactivate }, ref) => {
    const pos = isMobile ? service.mobile : service.desktop;
    const [imgError, setImgError] = useState(false);

    // Default submerged style vs. risen (active) style
    const stoneStyle = active
      ? {
          opacity: 1,
          filter: "blur(0px) brightness(1.05) contrast(1) saturate(1.05) drop-shadow(0 18px 22px rgba(0,0,0,0.45))",
          transform: "translateY(-10px) scale(1.04)",
        }
      : {
          opacity: 0.78,
          filter: "blur(0.35px) brightness(0.91) contrast(0.93) saturate(0.88)",
          transform: "translateY(10px) scale(0.96)",
        };

    return (
      <button
        ref={ref}
        type="button"
        aria-label={`${service.title} – ${service.description}`}
        aria-pressed={active}
        onMouseEnter={() => !isMobile && onActivate()}
        onMouseLeave={() => !isMobile && onDeactivate()}
        onFocus={() => !isMobile && onActivate()}
        onBlur={() => !isMobile && onDeactivate()}
        onClick={(e) => {
          e.preventDefault();
          if (active) onDeactivate();
          else onActivate();
        }}
        className={cn(
          "stone-btn group absolute -translate-x-1/2 -translate-y-1/2",
          "outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--gold))]",
          active ? "z-[45]" : "z-[20]"
        )}
        style={{ left: pos.left, top: pos.top, width: pos.width }}
      >
        {imgError && (
          <div className="absolute inset-0 z-[100] flex items-center justify-center rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white shadow-lg">
            Missing: {service.image.replace("/nurea-hero/", "")}
          </div>
        )}

        {/* Ripple rings — appear when active */}
        {active && (
          <>
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: "120%",
                aspectRatio: "1 / 1",
                backgroundImage: "url(/nurea-hero/ripple-ring.png)",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                animation: "stone-ripple 1600ms ease-out forwards",
                opacity: 0.85,
              }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: "120%",
                aspectRatio: "1 / 1",
                backgroundImage: "url(/nurea-hero/ripple-ring.png)",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                animation: "stone-ripple 1800ms ease-out 220ms forwards",
                opacity: 0.55,
              }}
            />
          </>
        )}

        {/* Stone image */}
        <div
          className="relative transition-all duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
          style={stoneStyle}
        >
          <img
            src={service.image}
            alt={service.title}
            onError={() => setImgError(true)}
            className="block w-full h-auto select-none"
            draggable={false}
          />
        </div>

        {/* Reveal info card (desktop only — mobile uses bottom sheet) */}
        {!isMobile && (
          <div
            className={cn(
              "pointer-events-none absolute left-1/2 -translate-x-1/2 w-[240px] text-center",
              "transition-all duration-500 ease-out",
              active
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            )}
            style={{ top: "calc(100% + 14px)" }}
          >
            <div className="rounded-2xl bg-[rgba(10,30,40,0.55)] backdrop-blur-md border border-white/15 px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
              <div className="text-[10px] uppercase tracking-[0.35em] text-[hsl(var(--gold))] mb-1">
                Tjeneste
              </div>
              <div className="font-serif text-lg text-white leading-tight">
                {service.title}
              </div>
              <div className="mt-1 text-[12px] text-white/80 leading-snug">
                {service.description}
              </div>
              <a
                href={service.href}
                className="mt-2 inline-block text-[11px] uppercase tracking-[0.3em] text-[hsl(var(--gold))] hover:text-white transition pointer-events-auto"
              >
                Les mer →
              </a>
            </div>
          </div>
        )}
      </button>
    );
  }
);

ServiceStone.displayName = "ServiceStone";
