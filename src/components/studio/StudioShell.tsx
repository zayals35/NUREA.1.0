import { useEffect, useId, useRef, useState, type CSSProperties, type FocusEvent, type KeyboardEvent, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useLang, twinPath } from "../../i18n";
import { STUDIO, CREATE_DESTINATION } from "../../data/studioSite";
import { CutLink, LangSwitch, TextLink, useMediaQuery } from "./parts";
import { NureaLiveMark } from "../brand/NureaMarkStyles";
import { openCookieNotice } from "../../lib/consent";
import "./studio.css";

const STUDIO_PATHS = new Set([
  "/", "/en",
  "/arbeider", "/en/work",
  "/tjenester", "/en/services",
  "/om-oss", "/en/about",
  "/innsikt", "/en/insights",
  "/create",
]);

/** The routes that render inside the studio frame. Everything else keeps the older frame. */
export function isStudioPath(pathname: string): boolean {
  const p = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return STUDIO_PATHS.has(p) || p.startsWith("/innsikt/") || p.startsWith("/en/insights/");
}

const CREATE_IS_INTERNAL = CREATE_DESTINATION.startsWith("/");

/** The wordmark with the live N: the final mark drawn in six languages, switching on its own. Ink in the header, paper in the menu. */
function Brand({ paper = false }: { paper?: boolean }) {
  const { lang, p } = useLang();
  const t = STUDIO[lang].shell;
  return (
    <Link className={`st-brand${paper ? " paper" : ""}`} to={p("/")} aria-label={t.brand}>
      <NureaLiveMark className="st-brand-mark" lang={lang} />
      <span>nurea</span>
    </Link>
  );
}

function useCurrentLabel(pathname: string): string {
  const { lang } = useLang();
  const t = STUDIO[lang].shell;
  const noPath = twinPath(pathname, "no");
  if (noPath === "/") return t.home;
  if (pathname === "/create") return t.createLabel;
  const hit = t.nav.find((l) => noPath === l.to || noPath.startsWith(l.to + "/"));
  return hit ? hit.label : t.home;
}

/**
 * The compact persistent navigation: appears once the header has scrolled
 * away. On desktop it is an ink shape bottom-left that expands on hover,
 * focus or click into the full set of destinations with the current one
 * marked. On phones it is a single toggle bottom-right that opens the
 * contained menu.
 */
function Dock({ docked, menuOpen, onOpenMenu, menuId }: { docked: boolean; menuOpen: boolean; onOpenMenu: () => void; menuId: string }) {
  const { lang, p } = useLang();
  const { pathname } = useLocation();
  const t = STUDIO[lang].shell;
  const desk = useMediaQuery("(min-width: 900px)");
  const [open, setOpen] = useState(false);
  const listId = useId();
  const current = useCurrentLabel(pathname);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (!desk) {
    return (
      <nav className={`st-dock${docked && !menuOpen ? " on" : ""}`} aria-label={t.dockLabel}>
        <div className="st-dock-shape">
          <button type="button" className="st-dock-toggle" onClick={onOpenMenu} aria-expanded={menuOpen} aria-controls={menuId}>
            <img src="/brand/n-paper.svg" alt="" />
            <span>{t.menuOpen}</span>
          </button>
        </div>
      </nav>
    );
  }

  const onBlur = (e: FocusEvent<HTMLElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
  };
  const onKey = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "Escape" && open) {
      setOpen(false);
      (e.currentTarget.querySelector<HTMLElement>(".st-dock-toggle") ?? e.currentTarget).focus();
    }
  };

  return (
    <nav
      className={`st-dock${docked ? " on" : ""}${open ? " open" : ""}`}
      aria-label={t.dockLabel}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={onBlur}
      onKeyDown={onKey}
    >
      <div className="st-dock-shape">
        <button type="button" className="st-dock-toggle" aria-expanded={open} aria-controls={listId} onClick={() => setOpen((o) => !o)}>
          <img src="/brand/n-paper.svg" alt="" />
          <span>{current}</span>
        </button>
        <div className="st-dock-list" id={listId}>
          {t.nav.map((l, i) => (
            <NavLink key={l.to} to={p(l.to)} end={l.to !== "/innsikt"} style={{ "--i": i } as CSSProperties}>
              {l.label}
            </NavLink>
          ))}
          {CREATE_IS_INTERNAL ? (
            <NavLink to={CREATE_DESTINATION} end style={{ "--i": t.nav.length } as CSSProperties}>
              {t.createLabel}
            </NavLink>
          ) : (
            <a href={CREATE_DESTINATION} target="_blank" rel="noopener" style={{ "--i": t.nav.length } as CSSProperties}>
              {t.createLabel}
            </a>
          )}
          <Link className="st-dock-contact" to={p("/kontakt")} style={{ "--i": t.nav.length + 1 } as CSSProperties}>
            {t.contact}
          </Link>
        </div>
      </div>
    </nav>
  );
}

/**
 * The contained menu: a full-field ink panel with focus held inside, Escape
 * and a visible close, page scroll locked while open, and focus handed back
 * to whatever opened it.
 */
function Menu({ open, onClose, id }: { open: boolean; onClose: () => void; id: string }) {
  const { lang, p } = useLang();
  const { pathname } = useLocation();
  const t = STUDIO[lang].shell;
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    document.documentElement.style.overflow = "hidden";
    const focusables = () =>
      Array.from(panel.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
    focusables()[0]?.focus();
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const els = focusables();
      if (!els.length) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      opener?.focus();
    };
  }, [open, onClose]);

  return (
    <div className={`st-menu${open ? " open" : ""}`} id={id} ref={panel} role="dialog" aria-modal={open || undefined} aria-label={t.menu} inert={!open}>
      <div className="st-menu-top">
        <Brand paper />
        <button type="button" className="st-menu-close" onClick={onClose}>
          {t.menuClose} <span aria-hidden="true">×</span>
        </button>
      </div>
      <nav className="st-menu-links" aria-label={t.menu}>
        <NavLink to={p("/")} end style={{ "--i": 0 } as CSSProperties} lang={lang === "en" ? "en" : undefined}>
          {t.home} <small>00</small>
        </NavLink>
        {t.nav.map((l, i) => (
          <NavLink key={l.to} to={p(l.to)} end={l.to !== "/innsikt"} style={{ "--i": i + 1 } as CSSProperties} lang={lang === "en" ? "en" : undefined}>
            {l.label} <small>0{i + 1}</small>
          </NavLink>
        ))}
        {CREATE_IS_INTERNAL ? (
          <NavLink to={CREATE_DESTINATION} end className="st-menu-create" style={{ "--i": t.nav.length + 1 } as CSSProperties} lang={lang === "en" ? "en" : undefined}>
            {t.createLabel} <small>05</small>
          </NavLink>
        ) : (
          <a href={CREATE_DESTINATION} target="_blank" rel="noopener" className="st-menu-create" style={{ "--i": t.nav.length + 1 } as CSSProperties}>
            {t.createLabel} <small>05</small>
          </a>
        )}
      </nav>
      <div className="st-menu-foot">
        <CutLink to={p("/kontakt")} paper>
          {t.contact}
        </CutLink>
        <a href="mailto:hei@nurea.no">hei@nurea.no</a>
        <LangSwitch pathname={pathname} />
      </div>
    </div>
  );
}

function Footer() {
  const { lang, p } = useLang();
  const { pathname } = useLocation();
  const t = STUDIO[lang].shell;
  return (
    <footer className="st-footer st-ink">
      <div className="st-invite">
        <h2>
          {t.inviteA}
          <br />
          {t.inviteB}
          <em>{t.inviteEm}</em>
        </h2>
        <div className="st-invite-aside">
          <p>{t.reassure}</p>
          <CutLink to={p("/kontakt")} paper>
            {t.inviteCta}
          </CutLink>
          <TextLink to={p("/klarhetssjekk")}>{t.inviteAlt}</TextLink>
        </div>
      </div>
      <div className="st-footer-meta">
        <a className="st-mail" href="mailto:hei@nurea.no">
          hei@nurea.no
        </a>
        <nav className="st-footer-nav" aria-label={t.footerNav}>
          {t.nav.map((l) => (
            <Link key={l.to} to={p(l.to)}>
              {l.label}
            </Link>
          ))}
          <Link to={p("/demoer")}>{t.demos}</Link>
          <Link to={p("/metoden")}>{t.method}</Link>
          <Link to={p("/klarhetssjekk")}>{t.clarity}</Link>
          <a href="https://www.instagram.com/nurea.no" target="_blank" rel="noreferrer">
            Instagram
          </a>
        </nav>
        <img className="st-footer-mark" src="/brand/n-paper.svg" alt="Nurea" />
      </div>
      <div className="st-footer-legal">
        <span>
          © Nurea 2026 · {t.orgnr} · {t.studioLine}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 22 }}>
          <Link to="/personvern">{t.privacy}</Link>
          <button type="button" className="st-footer-cookies" onClick={openCookieNotice}>
            {t.cookies}
          </button>
          <LangSwitch pathname={pathname} />
        </span>
      </div>
    </footer>
  );
}

/** The studio frame: skip link, in-flow header, the page, the close and footer, the dock. */
export default function StudioShell({ children }: { children: ReactNode }) {
  const { lang, p } = useLang();
  const { pathname } = useLocation();
  const t = STUDIO[lang].shell;
  const header = useRef<HTMLElement>(null);
  const [docked, setDocked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  // On desktop the dock is there from the first screen; on phones it takes
  // over once the header's own menu button has scrolled away.
  const desk = useMediaQuery("(min-width: 900px)");

  useEffect(() => {
    const el = header.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setDocked(!e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <div className="st">
      <a className="skip" href="#main">
        {t.skip}
      </a>
      <header className="st-header" ref={header}>
        <Brand />
        <nav className="st-nav" aria-label={t.menu}>
          {t.nav.map((l) => (
            <NavLink key={l.to} to={p(l.to)} end={l.to !== "/innsikt"}>
              {l.label}
            </NavLink>
          ))}
          {CREATE_IS_INTERNAL ? (
            <NavLink to={CREATE_DESTINATION} end className="st-nav-create">
              {t.createLabel}
            </NavLink>
          ) : (
            <a href={CREATE_DESTINATION} className="st-nav-create" target="_blank" rel="noopener">
              {t.createLabel}
            </a>
          )}
        </nav>
        <div className="st-header-end">
          <LangSwitch pathname={pathname} />
          <CutLink to={p("/kontakt")}>{t.contact}</CutLink>
          <button type="button" className="st-menu-btn" onClick={() => setMenuOpen(true)} aria-expanded={menuOpen} aria-controls={menuId}>
            {t.menuOpen}
          </button>
        </div>
      </header>
      {children}
      <Footer />
      <Dock docked={desk || docked} menuOpen={menuOpen} onOpenMenu={() => setMenuOpen(true)} menuId={menuId} />
      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} id={menuId} />
    </div>
  );
}
