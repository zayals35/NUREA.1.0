import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../i18n";
import { STUDIO } from "../data/studioSite";
import { OPEN_EVENT, readNotice, dismissNotice } from "../lib/consent";
import "./CookieNotice.css";

/**
 * The storage notice. The site sets no cookies and runs no tracking or
 * statistics (audit 2026-09-29, see lib/consent.ts), so this informs rather
 * than asks: what the browser keeps, a link to the full list, and a close
 * button. It is a region, not a modal, so it never blocks the page. The
 * footer reopens it; reopening moves focus to it so a keyboard visitor lands
 * where the notice is.
 */
export default function CookieNotice() {
  const { lang, p } = useLang();
  const t = STUDIO[lang].cookie;
  const [open, setOpen] = useState(() => readNotice() === null);
  const region = useRef<HTMLElement>(null);
  const reopened = useRef(false);

  useEffect(() => {
    const show = () => {
      reopened.current = true;
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, show);
    return () => window.removeEventListener(OPEN_EVENT, show);
  }, []);

  useEffect(() => {
    if (open && reopened.current) {
      reopened.current = false;
      region.current?.focus();
    }
  }, [open]);

  if (!open) return null;

  // Phones show only the first sentence (the slim bar); the rest stays one
  // tap away behind the "what is stored" link.
  const cut = t.text.indexOf(". ") + 1;
  const [lead, rest] = cut > 0 ? [t.text.slice(0, cut), t.text.slice(cut + 1)] : [t.text, ""];

  return (
    <section className="ck" role="region" aria-label={t.label} tabIndex={-1} ref={region}>
      <p className="ck-label">{t.label}</p>
      <p className="ck-text">
        {lead}
        {rest && <span className="ck-rest"> {rest}</span>}
      </p>
      <div className="ck-actions">
        <button
          type="button"
          className="ck-btn"
          onClick={() => {
            dismissNotice();
            setOpen(false);
          }}
        >
          {t.close}
        </button>
        <Link className="ck-more" to={p("/personvern")}>
          {t.more}
        </Link>
      </div>
    </section>
  );
}
