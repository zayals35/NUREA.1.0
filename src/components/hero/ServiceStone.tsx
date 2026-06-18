import { forwardRef } from "react";
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
          active ? "z-[60]" : "z-[20]"
        )}
        style={{ left: pos.left, top: pos.top, width: pos.width }}
      >
        {/* Ripple ring */}
        <img
          src="/nurea-hero/ripple-ring.png"
          alt=""
          aria-hidden
          onError={(e) => ((e.currentTarget.style.display = "none"))}
          className={cn(
            "pointer-events-none absolute left-1/2 top-1/2 w-[150%] -translate-x-1/2 -translate-y-1/2",
            "transition-all duration-700 ease-out",
            active ? "opacity-80 scale-y-[0.45] scale-x-100" : "opacity-0 scale-50"
          )}
        />

        {/* Stone image */}
        <div
          className={cn(
            "relative transition-all duration-[700ms] ease-[cubic-bezier(0.2,0.7,0.2,1)]",
            active
              ? "translate-y-[-36px] scale-[1.04] opacity-100 [filter:blur(0)_brightness(1.05)_contrast(1.06)]"
              : "translate-y-[18px] scale-[0.92] opacity-[0.62] [filter:blur(0.6px)_brightness(0.78)_contrast(0.82)_saturate(0.75)]"
          )}
        >
          <img
            src={service.image}
            alt={service.title}
            draggable={false}
            className="block w-full h-auto select-none drop-shadow-[0_18px_24px_rgba(20,40,55,0.35)]"
          />
        </div>

        {/* Desktop hover preview card */}
        {!isMobile && (
          <div
            role="tooltip"
            className={cn(
              "absolute left-1/2 -translate-x-1/2 top-[-140px] w-64",
              "rounded-xl border border-white/40 bg-white/85 backdrop-blur-md shadow-xl",
              "p-4 text-left transition-all duration-300",
              active
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-2 pointer-events-none"
            )}
          >
            <div className="text-[10px] uppercase tracking-[0.25em] text-[hsl(var(--gold))]">
              Tjeneste
            </div>
            <div className="mt-1 text-lg font-serif text-slate-900">{service.title}</div>
            <p className="mt-1 text-sm text-slate-600 leading-snug">{service.description}</p>
            <a
              href={service.href}
              className="mt-3 inline-flex items-center gap-1 text-sm text-[hsl(var(--gold))] hover:underline"
            >
              Utforsk →
            </a>
          </div>
        )}
      </button>
    );
  }
);

ServiceStone.displayName = "ServiceStone";
