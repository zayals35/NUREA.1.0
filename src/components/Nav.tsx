import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import SoundToggle from "./SoundToggle";
import Magnetic from "./Magnetic";
import { sound } from "../lib/sound";
import { useLang, twinPath, type Lang } from "../i18n";

const LINKS: { to: string; label: Record<Lang, string> }[] = [
  { to: "/arbeider", label: { no: "Arbeider", en: "Work" } },
  { to: "/tjenester", label: { no: "Tjenester", en: "Services" } },
  { to: "/metoden", label: { no: "Metoden", en: "Method" } },
  { to: "/priser", label: { no: "Priser", en: "Pricing" } },
  { to: "/om-oss", label: { no: "Om oss", en: "About" } },
  { to: "/kontakt", label: { no: "Kontakt", en: "Contact" } },
];

const CTA: Record<Lang, string> = {
  no: "Få din klarhetssjekk",
  en: "Get your clarity check",
};

/** Small NO/EN switch; each label links to the same page in that language. */
function LangSwitch({ className = "" }: { className?: string }) {
  const { lang } = useLang();
  const { pathname } = useLocation();

  return (
    <span className={`mono flex items-center gap-1.5 text-xs tracking-[0.14em] ${className}`}>
      {(["no", "en"] as Lang[]).map((l, i) => (
        <span key={l} className="flex items-center gap-1.5">
          {i > 0 && <span aria-hidden="true" className="text-cream/30">/</span>}
          {l === lang ? (
            <span aria-current="true" className="text-cream">
              {l.toUpperCase()}
            </span>
          ) : (
            <Link
              to={twinPath(pathname, l)}
              onClick={() => sound.play("click")}
              aria-label={l === "no" ? "Norsk" : "English"}
              className="text-cream/50 transition-colors hover:text-cream"
            >
              {l.toUpperCase()}
            </Link>
          )}
        </span>
      ))}
    </span>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { lang, p } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,box-shadow] duration-500 ${
          scrolled && !open
            ? "bg-espresso/80 backdrop-blur-md shadow-[0_1px_0_rgba(243,236,219,0.07)]"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 md:h-20 md:px-10 text-cream">
          <Link
            to={p("/")}
            className="flex items-center gap-3"
            aria-label={lang === "no" ? "NUREA, til forsiden" : "NUREA, to the front page"}
            onClick={() => sound.play("click")}
          >
            {/* Canonical NUREA mark (NUREA-mark-clean-master). currentColor follows the nav's text color. */}
            <svg
              aria-hidden="true"
              className="block h-7 w-auto"
              viewBox="17 18 118 142"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M 17 18 L 39 18 C 59 18, 84 37, 87 67 L 87 104 C 89 122, 102 135, 113 138 L 113 70 C 113 61, 120 54, 129 54 L 135 54 L 135 160 C 94 160, 66.5 138, 65 104 L 65 70 C 65 53, 53 42, 39 39 L 39 109 C 39 116, 31 122, 22 122 L 17 122 Z"
              />
            </svg>
            <span className="display text-2xl leading-none">Nurea</span>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={p(l.to)}
                className={({ isActive }) =>
                  `link-line text-sm font-medium transition-opacity ${
                    isActive ? "opacity-100" : "opacity-70 hover:opacity-100"
                  }`
                }
              >
                {l.label[lang]}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <LangSwitch className="hidden sm:flex" />
            <SoundToggle />
            <Magnetic className="hidden sm:block">
              <Link
                to={p("/klarhetssjekk")}
                onClick={() => sound.play("click")}
                className="mono inline-flex items-center bg-accent px-5 py-3 text-xs tracking-[0.14em] text-[#f6efe2] transition-colors hover:bg-gold"
              >
                {CTA[lang]}
              </Link>
            </Magnetic>
            <button
              type="button"
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
              aria-expanded={open}
              aria-label={
                open
                  ? lang === "no"
                    ? "Lukk meny"
                    : "Close menu"
                  : lang === "no"
                    ? "Åpne meny"
                    : "Open menu"
              }
              onClick={() => {
                sound.play("click");
                setOpen(!open);
              }}
            >
              <span
                className={`h-[2px] w-6 bg-cream transition-transform duration-300 ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-[2px] w-6 bg-cream transition-opacity duration-300 ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`h-[2px] w-6 bg-cream transition-transform duration-300 ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-espresso-deep px-6 pb-10 pt-28 transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!open}
      >
        <nav className="flex flex-col gap-1">
          {LINKS.map((l, i) => (
            <NavLink
              key={l.to}
              to={p(l.to)}
              className="display-sans py-2 text-4xl text-cream transition-[opacity,transform] duration-500"
              style={{
                transitionDelay: open ? `${i * 60 + 100}ms` : "0ms",
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateY(24px)",
              }}
            >
              {l.label[lang]}
            </NavLink>
          ))}
        </nav>
        <div
          className="flex flex-col gap-6 transition-[opacity,transform] duration-500"
          style={{
            transitionDelay: open ? "500ms" : "0ms",
            opacity: open ? 1 : 0,
            transform: open ? "none" : "translateY(24px)",
          }}
        >
          <LangSwitch />
          <Link
            to={p("/klarhetssjekk")}
            onClick={() => sound.play("click")}
            className="mono inline-flex items-center justify-center bg-accent px-6 py-4 text-sm tracking-[0.14em] text-[#f6efe2]"
          >
            {CTA[lang]}
          </Link>
        </div>
      </div>
    </>
  );
}
