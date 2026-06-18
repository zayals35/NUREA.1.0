import { useEffect } from "react";
import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";

interface Props {
  service: Service | null;
  onClose: () => void;
}

export const MobileServiceSheet = ({ service, onClose }: Props) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const open = !!service;

  return (
    <>
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-[80] bg-slate-900/30 backdrop-blur-[2px] transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!open}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={service?.title}
        className={cn(
          "fixed left-0 right-0 bottom-0 z-[90] rounded-t-3xl bg-white/95 backdrop-blur-xl",
          "border-t border-white/60 shadow-2xl p-6 pb-8",
          "transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)]",
          open ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-slate-300" />
        {service && (
          <>
            <div className="text-[10px] uppercase tracking-[0.3em] text-[hsl(var(--gold))]">
              Tjeneste
            </div>
            <h3 className="mt-1 font-serif text-2xl text-slate-900">{service.title}</h3>
            <p className="mt-2 text-slate-600 leading-relaxed">{service.description}</p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={service.href}
                className="flex-1 rounded-full bg-slate-900 px-5 py-3 text-center text-sm text-white"
              >
                Utforsk {service.title.toLowerCase()}
              </a>
              <button
                onClick={onClose}
                className="rounded-full border border-slate-300 px-5 py-3 text-sm text-slate-700"
              >
                Lukk
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
