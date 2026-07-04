import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import SoundToggle from "./SoundToggle";
import Magnetic from "./Magnetic";
import { sound } from "../lib/sound";

const LINKS = [
  { to: "/arbeider", label: "Arbeider" },
  { to: "/tjenester", label: "Tjenester" },
  { to: "/metoden", label: "Metoden" },
  { to: "/priser", label: "Priser" },
  { to: "/om-oss", label: "Om oss" },
  { to: "/kontakt", label: "Kontakt" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

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
            to="/"
            className="flex items-center gap-3"
            aria-label="NUREA, til forsiden"
            onClick={() => sound.play("click")}
          >
            <span
              aria-hidden="true"
              className="block h-8 w-8 bg-cream"
              style={{
                maskImage: "url(/nurea-symbol.webp)",
                WebkitMaskImage: "url(/nurea-symbol.webp)",
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskPosition: "center",
              }}
            />
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `link-line text-sm font-medium transition-opacity ${
                    isActive ? "opacity-100" : "opacity-70 hover:opacity-100"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <SoundToggle />
            </div>
            <Magnetic className="hidden sm:block">
              <Link
                to="/klarhetssjekk"
                onClick={() => sound.play("click")}
                className="mono inline-flex items-center bg-accent px-5 py-3 text-xs tracking-[0.14em] text-[#f6efe2] transition-colors hover:bg-gold"
              >
                Få din klarhetssjekk
              </Link>
            </Magnetic>
            <button
              type="button"
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
              aria-expanded={open}
              aria-label={open ? "Lukk meny" : "Åpne meny"}
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
              to={l.to}
              className="display py-2 text-4xl text-cream transition-[opacity,transform] duration-500"
              style={{
                transitionDelay: open ? `${i * 60 + 100}ms` : "0ms",
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateY(24px)",
              }}
            >
              {l.label}
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
          <SoundToggle />
          <Link
            to="/klarhetssjekk"
            onClick={() => sound.play("click")}
            className="mono inline-flex items-center justify-center bg-accent px-6 py-4 text-sm tracking-[0.14em] text-[#f6efe2]"
          >
            Få din klarhetssjekk
          </Link>
        </div>
      </div>
    </>
  );
}
