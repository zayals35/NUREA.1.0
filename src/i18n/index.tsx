import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { ARTICLES } from "../data/studioSite";

export type Lang = "no" | "en";

/** Canonical NO path -> EN path. Detail routes go through the slug maps below. */
const PATH_TO_EN: Record<string, string> = {
  "/": "/en",
  "/tjenester": "/en/services",
  "/arbeider": "/en/work",
  "/metoden": "/en/method",
  "/klarhetssjekk": "/en/clarity-check",
  "/priser": "/en/pricing",
  "/om-oss": "/en/about",
  "/kontakt": "/en/contact",
  "/innsikt": "/en/insights",
};

/** Create is one English page; it has no Norwegian twin and reads as English. */
const ENGLISH_ONLY = new Set(["/create"]);

export function langOf(pathname: string): Lang {
  return pathname === "/en" || pathname.startsWith("/en/") || ENGLISH_ONLY.has(pathname) ? "en" : "no";
}

const PATH_TO_NO: Record<string, string> = Object.fromEntries(
  Object.entries(PATH_TO_EN).map(([no, en]) => [en, no])
);

/** Canonical service id (also the NO slug) -> EN slug. */
export const SERVICE_SLUG_EN: Record<string, string> = {
  merkevare: "brand",
  nettsider: "websites",
  innhold: "content",
  systemer: "systems",
  reklamer: "advertising",
};

export const SERVICE_ID_FROM_EN_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(SERVICE_SLUG_EN).map(([id, en]) => [en, id])
);

/**
 * Turn a canonical NO path into its equivalent in the given language.
 * Components always write NO paths; links localize themselves through this.
 * Paths without an EN twin (skjema, personvern) stay Norwegian.
 */
export function localizePath(noPath: string, lang: Lang): string {
  if (lang === "no") return noPath;
  const direct = PATH_TO_EN[noPath];
  if (direct) return direct;
  const detail = noPath.match(/^\/tjenester\/([^/]+)$/);
  if (detail) {
    const en = SERVICE_SLUG_EN[detail[1]];
    if (en) return `/en/services/${en}`;
  }
  const article = noPath.match(/^\/innsikt\/([^/]+)$/);
  if (article) {
    const hit = ARTICLES.find((a) => a.slug.no === article[1]);
    if (hit) return `/en/insights/${hit.slug.en}`;
  }
  return noPath;
}

/** The same page in the other language, for the NO/EN toggle and hreflang. */
export function twinPath(pathname: string, to: Lang): string {
  if (ENGLISH_ONLY.has(pathname)) return pathname;
  const from: Lang = langOf(pathname);
  if (from === to) return pathname;
  if (to === "en") return localizePath(pathname, "en");
  const direct = PATH_TO_NO[pathname];
  if (direct) return direct;
  const detail = pathname.match(/^\/en\/services\/([^/]+)$/);
  if (detail) {
    const id = SERVICE_ID_FROM_EN_SLUG[detail[1]];
    if (id) return `/tjenester/${id}`;
  }
  const article = pathname.match(/^\/en\/insights\/([^/]+)$/);
  if (article) {
    const hit = ARTICLES.find((a) => a.slug.en === article[1]);
    if (hit) return `/innsikt/${hit.slug.no}`;
  }
  return "/";
}

/** True when this NO path has a real EN twin (drives hreflang and the toggle). */
export function hasTwin(pathname: string): boolean {
  if (ENGLISH_ONLY.has(pathname)) return false;
  return twinPath(pathname, "en") !== pathname || pathname === "/en" || pathname.startsWith("/en/");
}

const LangContext = createContext<Lang>("no");

export function LangProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const lang: Lang = langOf(pathname);

  // The document follows the page language; hreflang pairs let search engines
  // serve each visitor the right one.
  useEffect(() => {
    document.documentElement.lang = lang;

    document
      .querySelectorAll('link[data-i18n="alt"]')
      .forEach((el) => el.remove());

    if (!hasTwin(pathname)) return;
    const origin = "https://www.nurea.no";
    const noHref = origin + twinPath(pathname, "no");
    const enHref = origin + twinPath(pathname, "en");
    const pairs: [string, string][] = [
      ["no", noHref],
      ["en", enHref],
      ["x-default", noHref],
    ];
    for (const [hreflang, href] of pairs) {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = hreflang;
      link.href = href;
      link.setAttribute("data-i18n", "alt");
      document.head.appendChild(link);
    }
  }, [lang, pathname]);

  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

/** Current language plus `p`, which localizes canonical NO paths for links. */
export function useLang(): { lang: Lang; p: (noPath: string) => string } {
  const lang = useContext(LangContext);
  return { lang, p: (noPath: string) => localizePath(noPath, lang) };
}
