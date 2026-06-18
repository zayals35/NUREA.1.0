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
          "z-[45]"
        )}
        style={{ left: pos.left, top: pos.top, width: pos.width }}
      >
        {/* Image load error warning */}
        {imgError && (
          <div className="absolute inset-0 z-[100] flex items-center justify-center rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white shadow-lg">
            Missing: {service.image.replace("/nurea-hero/", "")}
          </div>
        )}

        {/* Stone image – debug visibility: fully opaque, no filter */}
        <img
          src={service.image}
          alt={service.title}
          onError={() => setImgError(true)}
          className="block w-full h-auto select-none"
          style={{ opacity: 1, filter: "none" }}
        />
      </button>
    );
  }
);

ServiceStone.displayName = "ServiceStone";
