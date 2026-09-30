import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { useLang } from "../../i18n";
import { STUDIO, type ServiceId } from "../../data/studioSite";
import CaseVideo from "./CaseVideo";
import { CutLink } from "./parts";

/**
 * Services as three tactile selectors, the website broad and first, systems
 * and Create together below. A selector opens the service scene in an inset
 * dialog: native <dialog>, so focus is contained, Escape closes and focus
 * returns to the selector on its own. One scene at a time. Page scroll is
 * locked while it is open and put back exactly where it was. On phones the
 * dialog becomes a full-height sheet with its own scroll and a close at the
 * top. Only opacity and transform animate; reduced motion shows it still.
 *
 * `cases={false}` (the front page) leaves client recordings out of the
 * scenes: by Zaynab's ruling, cases live on the work page only.
 */
export default function ServiceSelectors({ cases = true }: { cases?: boolean }) {
  const { lang } = useLang();
  const t = STUDIO[lang].services;
  const base = useId();
  const [active, setActive] = useState<ServiceId | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const service = active ? t.list.find((s) => s.id === active) : undefined;
  const proof = service && (cases || service.proof.kind !== "clip") ? service.proof : undefined;

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (active && !d.open) {
      const gap = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.overflow = "hidden";
      if (gap > 0) document.body.style.paddingRight = `${gap}px`;
      d.showModal();
      inner.current?.focus({ preventScroll: true });
    }
    if (!active && d.open) d.close();
  }, [active]);

  const onClose = () => {
    document.documentElement.style.overflow = "";
    document.body.style.paddingRight = "";
    setActive(null);
  };

  const onBackdrop = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialog.current) setActive(null);
  };

  const contact = lang === "en" ? "/en/contact" : "/kontakt";

  return (
    <>
      <div className="st-picks">
        {t.list.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`st-pick st-pick-${s.id}`}
            aria-haspopup="dialog"
            aria-expanded={active === s.id}
            aria-controls={`${base}-dialog`}
            onClick={() => setActive(s.id)}
          >
            <span className="st-label">{s.index}</span>
            <span className="st-pick-name">{s.name}</span>
            <span className="st-pick-short">
              {s.short}
              {s.status && <span className="st-status">{s.status}</span>}
            </span>
            <span className="st-pick-plus" aria-hidden="true">
              +
            </span>
          </button>
        ))}
      </div>

      <dialog ref={dialog} id={`${base}-dialog`} className="st-svc-dialog" aria-labelledby={`${base}-title`} onClose={onClose} onClick={onBackdrop}>
        {service && (
          <div className={`st-svc-dialog-in${proof ? "" : " no-proof"}`} ref={inner} tabIndex={-1}>
            <button type="button" className="st-svc-close" onClick={() => setActive(null)}>
              {t.close} <span aria-hidden="true">×</span>
            </button>
            <div className="st-svc-body">
              <p className="st-label">
                {service.index}
                {service.status && <span className="st-status">{service.status}</span>}
              </p>
              <h2 id={`${base}-title`} className={service.id === "create" ? "st-voice" : undefined}>
                {service.name}
              </h2>
              <p className="st-svc-need">{service.need}</p>
              <div>
                <span className="st-label">{service.deliverablesLabel}</span>
                <ul className="st-chips">
                  {service.deliverables.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
              <div className="st-svc-actions">
                <CutLink to={service.next.to.startsWith("/kontakt") ? contact : service.next.to}>{service.next.label}</CutLink>
              </div>
            </div>
            {proof && (
              <div className="st-svc-proof">
                {proof.kind === "clip" ? (
                  <div className="st-media wide">
                    <CaseVideo clip={proof.clip} label={proof.caption} />
                  </div>
                ) : (
                  <div className="st-media art">
                    <img src={proof.src} alt={proof.alt} loading="lazy" decoding="async" />
                  </div>
                )}
                <span className="st-label">
                  {t.proofLabel} · {proof.caption}
                </span>
              </div>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
