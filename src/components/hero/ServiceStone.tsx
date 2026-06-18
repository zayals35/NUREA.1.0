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
          "z-[20]"
        )}
        style={{ left: pos.left, top: pos.top, width: pos.width }}
      >
        {/* Image load error warning */}
        {imgError && (
          <div className="absolute inset-0 z-[100] flex items-center justify-center rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white shadow-lg">
            Missing: {service.image.replace("/nurea-hero/", "")}
          </div>
        )}

        {/* Stone image – underwater default state */}
        <div
          className="relative transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
          style={{
            opacity: 0.64,
            filter: "blur(0.55px) brightness(0.82) contrast(0.86) saturate(0.78)",
            transform: "translateY(14px) scale(0.94)",
          }}
        >
          <img
            src={service.image}
            alt={service.title}
            onError={() => setImgError(true)}
            className="block w-full h-auto select-none"
          />
        </div>
      </button>
    );
  }
);

ServiceStone.displayName = "ServiceStone";
