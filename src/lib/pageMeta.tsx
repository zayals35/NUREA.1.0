import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useLocation } from "react-router-dom";
import { hasTwin, useLang } from "../i18n";

const ORIGIN = "https://www.nurea.no";

interface PageMeta {
  /** Full browser tab title, already suffixed by the caller. */
  title: string;
  /** Plain-text summary for search results and link previews. */
  description?: string;
}

type Setter = (meta: PageMeta) => void;

const MetaContext = createContext<Setter>(() => {});

/**
 * One writer for the whole document head.
 *
 * Pages own their own words, so each page declares its title and description
 * through `usePageMeta`. This provider is the only thing that touches the head,
 * which keeps the canonical URL, the Open Graph block and the Twitter block
 * from drifting away from what the page actually says. Before this, three
 * different components wrote `document.title` and the description, and nothing
 * wrote a per-route canonical at all, so every route shared the front page's
 * link preview.
 */
export function MetaProvider({ children }: { children: ReactNode }) {
  const [meta, setMeta] = useState<PageMeta>({ title: "NUREA" });
  return (
    <MetaContext.Provider value={setMeta}>
      <MetaHead meta={meta} />
      {children}
    </MetaContext.Provider>
  );
}

/** Declare this page's title and description. Safe to call with new strings. */
export function usePageMeta(title: string, description?: string) {
  const setMeta = useContext(MetaContext);
  useEffect(() => {
    setMeta({ title, description });
  }, [setMeta, title, description]);
}

/**
 * Descriptions come from page intros, which are written to be read on the page
 * and are sometimes several sentences long. Cut at a sentence boundary so a
 * search result never ends mid-thought.
 */
function trimDescription(text: string, limit = 185): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= limit) return clean;
  const window = clean.slice(0, limit);
  const sentence = Math.max(
    window.lastIndexOf(". "),
    window.lastIndexOf("! "),
    window.lastIndexOf("? ")
  );
  if (sentence > 80) return window.slice(0, sentence + 1);
  const space = window.lastIndexOf(" ");
  return (space > 80 ? window.slice(0, space) : window).replace(/[,;:]$/, "");
}

function setMetaTag(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

function MetaHead({ meta }: { meta: PageMeta }) {
  const { pathname } = useLocation();
  const { lang } = useLang();

  useEffect(() => {
    document.title = meta.title;

    const canonical = ORIGIN + (pathname === "/" ? "/" : pathname.replace(/\/$/, ""));
    setLink("canonical", canonical);

    setMetaTag('meta[property="og:url"]', "property", "og:url", canonical);
    setMetaTag('meta[property="og:title"]', "property", "og:title", meta.title);
    setMetaTag('meta[property="og:type"]', "property", "og:type", pathname === "/" || pathname === "/en" ? "website" : "article");
    setMetaTag('meta[name="twitter:title"]', "name", "twitter:title", meta.title);

    const locale = lang === "en" ? "en_GB" : "nb_NO";
    setMetaTag('meta[property="og:locale"]', "property", "og:locale", locale);
    document.head
      .querySelectorAll('meta[property="og:locale:alternate"]')
      .forEach((el) => el.remove());
    if (hasTwin(pathname)) {
      const alt = document.createElement("meta");
      alt.setAttribute("property", "og:locale:alternate");
      alt.setAttribute("content", lang === "en" ? "nb_NO" : "en_GB");
      document.head.appendChild(alt);
    }

    if (meta.description) {
      const desc = trimDescription(meta.description);
      setMetaTag('meta[name="description"]', "name", "description", desc);
      setMetaTag('meta[property="og:description"]', "property", "og:description", desc);
      setMetaTag('meta[name="twitter:description"]', "name", "twitter:description", desc);
    }
  }, [meta.title, meta.description, pathname, lang]);

  return null;
}
