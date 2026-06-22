import { forwardRef, useState } from "react";
import type { Service } from "@/data/services";
import type { Breakpoint } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface Props {
  service: Service;
  active: boolean;
  breakpoint: Breakpoint;
  reducedMotion: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}

export const ServiceStone = forwardRef<HTMLButtonElement, Props>(
  ({ service, active, breakpoint, reducedMotion, onActivate, onDeactivate }, ref) => {
    const isTouch = breakpoint !== "desktop";
    // Tablet reuses the phone (portrait) layout.
    const pos = breakpoint === "tablet" ? service.phone : service[breakpoint];
    const [imgError, setImgError] = useState(false);

    // Flip the info popover above the stone when it sits low in the viewport,
    // so it never runs off the bottom edge.
    const topNum = parseFloat(pos.top);
    const placeAbove = topNum > 55;

    // Default = submerged (blurred, dimmed, desaturated, seen through water).
    // Active = risen above the surface (sharp, bright, clear).
    const submergedOpacity = service.priority ? 0.9 : 0.84;
    const rotateCss = pos.rotate ?? `${service.rotation ?? 0}deg`;
    // Resting look. MOBILE: stones stay SHARP (no blur) — the underwater feel comes
    // from the water veil, not from blurring the stones. DESKTOP/TABLET: keep the
    // original submerged blur treatment untouched.
    const restingStyle = isTouch
      ? {
          opacity: 0.99,
          filter:
            "saturate(0.96) contrast(1.02) brightness(1) drop-shadow(0 10px 18px rgba(45,35,22,.18))",
          transform: `translateY(0) scale(1) rotate(${rotateCss})`,
        }
      : {
          opacity: submergedOpacity,
          filter:
            "blur(1px) brightness(0.93) contrast(0.95) saturate(0.88)",
          transform: `translateY(0) scale(1) rotate(${rotateCss})`,
        };
    // Active (risen) look. MOBILE: a small, sharp rise that breaks the surface with
    // a stronger natural shadow. DESKTOP/TABLET: the original larger lift.
    const activeStyle = isTouch
      ? {
          opacity: 1,
          filter:
            "saturate(1) contrast(1.04) brightness(1.03) drop-shadow(0 20px 26px rgba(45,35,22,.34))",
          transform: `translateY(-16px) scale(1.06) rotate(${rotateCss})`,
        }
      : {
          opacity: 1,
          filter:
            "blur(0px) brightness(1.05) contrast(1.05) saturate(1.06)",
          transform: `translateY(-52px) scale(1.06) rotate(${rotateCss})`,
        };
    const stoneStyle = active ? activeStyle : restingStyle;

    // Droplet spray that bursts from the water line when the stone surfaces.
    const droplets = [
      { dx: "-26px", delay: "40ms", size: 7, left: "32%" },
      { dx: "-10px", delay: "0ms", size: 9, left: "44%" },
      { dx: "8px", delay: "70ms", size: 6, left: "54%" },
      { dx: "22px", delay: "30ms", size: 8, left: "64%" },
      { dx: "36px", delay: "110ms", size: 5, left: "72%" },
    ];

    return (
      <button
        ref={ref}
        type="button"
        aria-label={`${service.title} – ${service.description}`}
        aria-pressed={active}
        onMouseEnter={() => !isTouch && onActivate()}
        onMouseLeave={() => !isTouch && onDeactivate()}
        onFocus={() => !isTouch && onActivate()}
        onBlur={() => !isTouch && onDeactivate()}
        onClick={(e) => {
          e.preventDefault();
          // Stop the tap from bubbling to the section's backdrop handler, which
          // would immediately clear the active stone on touch.
          e.stopPropagation();
          if (active) onDeactivate();
          else onActivate();
        }}
        className={cn(
          "stone-btn group absolute -translate-x-1/2 -translate-y-1/2",
          "outline-none focus-visible:ring-1 focus-visible:ring-white/40",
          active ? "z-[45]" : "z-[20]"
        )}
        style={{ left: pos.left, top: pos.top, width: pos.width }}
      >
        {imgError && (
          <div className="absolute inset-0 z-[100] flex items-center justify-center rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white shadow-lg">
            Missing: {service.image.replace("/nurea-hero/", "")}
          </div>
        )}

        {/* Break-the-surface FX — fire at the water line (resting center) when active.
            Skipped entirely under reduced motion. */}
        {active && !reducedMotion && (
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 -translate-x-1/2"
            style={{ top: "58%", width: "100%", height: 0 }}
          >
            {/* Expanding ripple rings */}
            <span
              className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: "118%",
                aspectRatio: "1 / 1",
                backgroundImage: "url(/nurea-hero/ripple-ring.png)",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                animation: "stone-ripple 1500ms ease-out forwards",
                opacity: 0.85,
              }}
            />
            <span
              className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: "118%",
                aspectRatio: "1 / 1",
                backgroundImage: "url(/nurea-hero/ripple-ring.png)",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                animation: "stone-ripple 1800ms ease-out 220ms forwards",
                opacity: 0.5,
              }}
            />
            {/* Bright meniscus arc — the surface tenting and snapping */}
            <span
              className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-[50%]"
              style={{
                width: "70%",
                height: "26%",
                background:
                  "radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(220,240,245,0.35) 45%, transparent 72%)",
                animation: "stone-meniscus 700ms ease-out forwards",
              }}
            />
            {/* Droplet spray */}
            {droplets.map((d, i) => (
              <span
                key={i}
                className="pointer-events-none absolute top-0 rounded-full"
                style={{
                  left: d.left,
                  width: d.size,
                  height: d.size,
                  background:
                    "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.95), rgba(190,220,228,0.7) 60%, rgba(150,190,200,0.4))",
                  boxShadow: "0 0 4px rgba(255,255,255,0.5)",
                  ["--dx" as string]: d.dx,
                  animation: `stone-droplet 900ms cubic-bezier(0.3,0.1,0.4,1) ${d.delay} forwards`,
                  opacity: 0,
                }}
              />
            ))}
          </span>
        )}

        {/* Contact shadow on the lakebed beneath the resting stone */}
        <span aria-hidden className="stone-contact" />

        {/* Stone image */}
        <div
          className={cn("stone-img-wrap relative", active && "is-active")}
          style={stoneStyle}
        >
          <img
            src={service.image}
            alt={service.title}
            onError={() => setImgError(true)}
            className={cn(
              "block w-full h-auto select-none",
              // One stone bobs a few times on load to hint that stones are interactive.
              service.id === "nettsider" && !active && !reducedMotion && "stone-bob"
            )}
            draggable={false}
          />
          {/* Cyan "through-water" veil — fades out as the stone surfaces */}
          <span
            aria-hidden
            className="stone-tint"
            style={{
              WebkitMaskImage: `url(${service.image})`,
              maskImage: `url(${service.image})`,
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
            }}
          />
          {/* Wet sheen sliding down the freshly-surfaced stone */}
          {active && !reducedMotion && (
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-hidden"
              style={{
                WebkitMaskImage: `url(${service.image})`,
                maskImage: `url(${service.image})`,
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
              }}
            >
              <span
                className="absolute inset-x-0 top-0 h-1/2"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, transparent 100%)",
                  animation: "stone-sheen 900ms ease-out 120ms forwards",
                }}
              />
            </span>
          )}
        </div>

        {/* Info tab. MOBILE: a small premium glass/water card (tappable). DESKTOP:
            free text beside the stone, no box (organic). */}
        <div
          className={cn(
            "absolute left-1/2 -translate-x-1/2 w-[242px] text-center z-[60]",
            "transition-all duration-300 ease-out",
            active
              ? cn("opacity-100 translate-y-0", isTouch && "pointer-events-auto")
              : cn("opacity-0 pointer-events-none", placeAbove ? "translate-y-1" : "-translate-y-1")
          )}
          style={
            placeAbove
              ? { bottom: "calc(100% + 12px)" }
              : { top: "calc(100% + 12px)" }
          }
        >
          {isTouch ? (
            <div className="nurea-info-tab">
              <div className="info-title">{service.title}</div>
              <div className="info-desc">{service.description}</div>
              <a
                href={service.href}
                onClick={(e) => e.stopPropagation()}
                className="info-link"
              >
                Utforsk tjeneste →
              </a>
            </div>
          ) : (
            <>
              <div
                className="text-[21px] leading-tight"
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 700,
                  color: "#2a1f16",
                  textShadow: "0 1px 14px rgba(247,242,232,0.9), 0 1px 3px rgba(247,242,232,0.8)",
                }}
              >
                {service.title}
              </div>
              <div
                className="mt-1 text-[14.5px] leading-snug mx-auto"
                style={{
                  maxWidth: 230,
                  color: "rgba(46,33,22,0.85)",
                  textShadow: "0 1px 12px rgba(247,242,232,0.9)",
                }}
              >
                {service.description}
              </div>
              <a
                href={service.href}
                className="pointer-events-auto mt-1.5 inline-block text-[13px] uppercase tracking-[0.22em] transition"
                style={{ color: "#8a5a2f", fontWeight: 700, textShadow: "0 1px 10px rgba(247,242,232,0.9)" }}
              >
                Les mer →
              </a>
            </>
          )}
        </div>
      </button>
    );
  }
);

ServiceStone.displayName = "ServiceStone";
