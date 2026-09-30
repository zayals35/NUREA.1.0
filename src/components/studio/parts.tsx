import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useLang, twinPath, hasTwin, type Lang } from "../../i18n";
import { STUDIO, BELT } from "../../data/studioSite";

/** The cut-corner action. Internal paths route; everything else is a plain link. */
export function CutLink({
  to,
  children,
  paper = false,
  className = "",
  style,
  external = false,
}: {
  to: string;
  children: ReactNode;
  paper?: boolean;
  className?: string;
  style?: CSSProperties;
  external?: boolean;
}) {
  const cls = `st-cut${paper ? " paper" : ""}${className ? ` ${className}` : ""}`;
  const inner = (
    <>
      <span>{children}</span>
      <b aria-hidden="true">
        <i>↗</i>
      </b>
    </>
  );
  return to.startsWith("/") && !external ? (
    <Link className={cls} to={to} style={style}>
      {inner}
    </Link>
  ) : (
    <a className={cls} href={to} style={style} target={to.startsWith("http") ? "_blank" : undefined} rel={to.startsWith("http") ? "noopener" : undefined}>
      {inner}
    </a>
  );
}

/** Nippo text link with the small arrow. */
export function TextLink({ to, children, external = false }: { to: string; children: ReactNode; external?: boolean }) {
  const inner = (
    <>
      {children} <i aria-hidden="true">↗</i>
    </>
  );
  return to.startsWith("/") && !external ? (
    <Link className="st-textlink" to={to}>
      {inner}
    </Link>
  ) : (
    <a className="st-textlink" href={to} target={to.startsWith("http") ? "_blank" : undefined} rel={to.startsWith("http") ? "noopener" : undefined}>
      {inner}
    </a>
  );
}

/** NO/EN, each label linking to the same page in the other language. Hidden on a page with no twin (Create), so no link points at itself. */
export function LangSwitch({ pathname }: { pathname: string }) {
  const { lang } = useLang();
  const t = STUDIO[lang].shell;
  if (!hasTwin(pathname)) return null;
  return (
    <span className="st-lang" role="group" aria-label={t.langLabel}>
      {(["no", "en"] as Lang[]).map((l) =>
        l === lang ? (
          <span key={l} aria-current="true">
            {l.toUpperCase()}
          </span>
        ) : (
          <Link key={l} to={twinPath(pathname, l)} lang={l === "no" ? "nb" : "en"} aria-label={l === "no" ? "Norsk" : "English"}>
            {l.toUpperCase()}
          </Link>
        )
      )}
    </span>
  );
}

/**
 * The moving belt: the four prepared marks in their approved order, each
 * sized by eye, rolling as a seamless marquee. The row is rendered twice
 * inside a track that translates by half its width; the second copy is
 * hidden from assistive technology so every name is heard once. Hover or
 * focus pauses it, and a visible button stops it for anyone who wants it
 * still (WCAG 2.2.2); reduced motion shows the single row still, without
 * the button.
 */
export function LogoBelt() {
  const { lang } = useLang();
  const t = STUDIO[lang];
  const [paused, setPaused] = useState(false);
  return (
    <section className={`st-belt${paused ? " paused" : ""}`} aria-label={t.belt}>
      <div className="st-belt-head">
        <p className="st-label">{t.belt}</p>
        <button type="button" className="st-belt-toggle" aria-pressed={paused} onClick={() => setPaused((v) => !v)}>
          {paused ? t.beltPlay : t.beltPause}
        </button>
      </div>
      <div className="st-belt-track">
        <div className="st-belt-run">
          {[0, 1].map((copy) => (
            <div key={copy} className="st-belt-marks" aria-hidden={copy === 1 || undefined}>
              {BELT.map((m) => (
                <img key={m.alt} src={m.src} alt={copy === 0 ? m.alt : ""} decoding="async" loading="lazy" style={{ height: m.h }} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** True while the media query matches; follows changes during the session. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => (typeof window !== "undefined" ? window.matchMedia(query).matches : false));
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatches(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return matches;
}
