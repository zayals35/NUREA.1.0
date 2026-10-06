import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { useLang } from "../../i18n";
import { STUDIO, type ServiceId } from "../../data/studioSite";
import CaseVideo from "./CaseVideo";
import { CutLink } from "./parts";

/**
 * The website card's drawing: loose pieces, a cut-corner mark, a ring, three
 * lines and a small cut tab, that drift in from scattered and click into one
 * ordered composition, again and again. Expression finding its order, said
 * without drawing a browser. Offsets are where each piece starts.
 */
const ORDER = [
  { d: "M28 24 H82 L100 42 V96 H28 Z", x: -18, y: 34, r: -24, mark: true },
  { d: "M64 140 m-22 0 a22 22 0 1 0 44 0 a22 22 0 1 0 -44 0", x: 34, y: -26, r: 0 },
  { d: "M128 34 H276", x: 26, y: 52, r: 14 },
  { d: "M128 64 H244", x: -34, y: 70, r: -18 },
  { d: "M128 94 H206", x: 44, y: -40, r: 22 },
  { d: "M128 128 H198 L212 142 V160 H128 Z", x: 52, y: -60, r: 30 },
];

/**
 * Services as three equal selectors, none ranked above the others (Zaynab's
 * ruling 2026-10-01: we never know what the next client needs first). The
 * website and systems cards carry a drawn motif, pieces finding their order
 * and a flow; Create keeps its own glow. On phones the three stack as compact
 * cards of equal height, all three on one screen. A selector opens the service scene in an inset
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
    if (!d || !active) return;
    const overflow = document.documentElement.style.overflow;
    const padding = document.body.style.paddingRight;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;
    if (!d.open) d.showModal();
    inner.current?.focus({ preventScroll: true });
    // Contact links unmount the dialog. Restore the page on every exit path.
    return () => {
      document.documentElement.style.overflow = overflow;
      document.body.style.paddingRight = padding;
      if (d.open) d.close();
    };
  }, [active]);

  const onClose = () => {
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
            {s.id === "nettside" && (
              <svg className="st-art st-art-order" viewBox="0 0 300 180" aria-hidden="true">
                {ORDER.map(({ d, x, y, r, mark }, k) => (
                  <path key={k} className={mark ? "st-order-mark" : undefined} style={{ ["--k" as string]: k, ["--x" as string]: `${x}px`, ["--y" as string]: `${y}px`, ["--r" as string]: `${r}deg` }} d={d} />
                ))}
              </svg>
            )}
            {s.id === "systemer" && (
              <svg className="st-art st-art-flow" viewBox="0 0 300 180" aria-hidden="true">
                <path className="st-flow-line" d="M24 130 C 74 130, 74 50, 130 50 S 190 130, 236 110 S 262 44, 276 44" />
                {[[24, 130], [130, 50], [236, 110], [276, 44]].map(([x, y], k) => (
                  <g key={k} style={{ ["--k" as string]: k }} transform={`translate(${x} ${y})`}>
                    <rect className="st-node" x="-9" y="-9" width="18" height="18" />
                  </g>
                ))}
              </svg>
            )}
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
              {service.status && (
                <p className="st-label">
                  <span className="st-status">{service.status}</span>
                </p>
              )}
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
