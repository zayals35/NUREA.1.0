import { useEffect, useState } from "react";

const LINKS = [
  { label: "Om", href: "/om-oss" },
  { label: "Arbeider", href: "/#arbeider" },
  { label: "Tjenester", href: "/#tjenester" },
  { label: "Metoden", href: "/#metoden" },
  { label: "Klarhetssjekk", href: "/klarhetssjekk" },
  { label: "Kontakt", href: "/#kontakt" },
];

// Sticky top nav. Hidden over the hero, slides in after you scroll past it, so it
// never duplicates the hero's own wordmark. Warm glass. Mobile menu overlay.
export const SiteNav = () => {
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[200]"
      style={{
        transform: shown ? "translateY(0)" : "translateY(-105%)",
        transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div
        className="flex items-center justify-between px-5 md:px-10"
        style={{
          height: 62,
          background: "rgba(233,226,214,0.82)",
          backdropFilter: "blur(12px) saturate(1.1)",
          WebkitBackdropFilter: "blur(12px) saturate(1.1)",
          borderBottom: "1px solid rgba(42,31,22,0.1)",
        }}
      >
        <a href="/#top" className="hero-wordmark" style={{ fontSize: 17 }}>
          NUREA
        </a>

        <nav className="hidden md:flex items-center gap-8 hero-nav">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="opacity-90 hover:opacity-100 transition">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/#kontakt"
            className="hidden sm:inline-flex items-center"
            style={{
              background: "#2a1f16",
              color: "#f3ecdb",
              fontFamily: "'Manrope','Inter',sans-serif",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.01em",
              height: 38,
              padding: "0 18px",
              borderRadius: 999,
            }}
          >
            Start et prosjekt
          </a>
          <button
            type="button"
            aria-label="Meny"
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            style={{ color: "#2a1f16", fontWeight: 700, fontSize: 14, padding: 6 }}
          >
            {open ? "Lukk" : "Meny"}
          </button>
        </div>
      </div>

      {/* Mobile overlay menu */}
      {open && (
        <div
          className="md:hidden flex flex-col"
          style={{
            background: "rgba(233,226,214,0.97)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(42,31,22,0.12)",
            padding: "8px 20px 18px",
          }}
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="hero-headline"
              style={{ fontSize: 22, padding: "10px 0", borderBottom: "1px solid rgba(42,31,22,0.1)" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/#kontakt"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex items-center justify-center"
            style={{
              background: "#2a1f16",
              color: "#f3ecdb",
              fontFamily: "'Manrope','Inter',sans-serif",
              fontSize: 14,
              fontWeight: 700,
              height: 46,
              borderRadius: 999,
            }}
          >
            Start et prosjekt
          </a>
        </div>
      )}
    </header>
  );
};

export default SiteNav;
