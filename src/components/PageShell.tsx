import { Link } from "react-router-dom";
import type { CSSProperties, ReactNode } from "react";

const NAV = [
  { label: "Tjenester", to: "/tjenester" },
  { label: "Priser", to: "/priser" },
  { label: "Arbeider", to: "/arbeider" },
  { label: "Kontakt", to: "/kontakt" },
];

const eyebrowStyle: CSSProperties = {
  fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
  textTransform: "uppercase",
  letterSpacing: "0.28em",
  fontSize: 11,
  fontWeight: 700,
  color: "#8a5a2f",
};

/** Warm, organic placeholder bar — used to sketch page structure without copy. */
export const Skel = ({ w = "100%", h = 14, mt = 0 }: { w?: string | number; h?: number; mt?: number }) => (
  <div
    aria-hidden
    style={{
      width: w,
      height: h,
      marginTop: mt,
      borderRadius: 8,
      background: "rgba(42,31,22,0.08)",
    }}
  />
);

interface Props {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  children?: ReactNode;
}

export const PageShell = ({ eyebrow, title, intro, children }: Props) => (
  <main className="min-h-screen bg-[#e9e2d6]" style={{ color: "#2a1f16" }}>
    <header className="flex items-start justify-between px-6 md:px-12 pt-6 md:pt-8">
      <Link to="/" className="block">
        <div className="hero-wordmark">NUREA</div>
        <div className="hero-tagline">Merkevare og digital retning</div>
      </Link>
      <nav className="hidden md:flex gap-8 hero-nav pt-1">
        {NAV.map((n) => (
          <Link key={n.to} to={n.to} className="hover:opacity-100 opacity-90 transition">
            {n.label}
          </Link>
        ))}
      </nav>
    </header>

    <section className="px-6 md:px-12 pt-16 md:pt-24 pb-8 max-w-5xl">
      {eyebrow && <p className="mb-4" style={eyebrowStyle}>{eyebrow}</p>}
      <h1 className="hero-headline" style={{ fontSize: "clamp(38px, 6vw, 82px)" }}>
        {title}
      </h1>
      {intro && (
        <p className="hero-body mt-6" style={{ maxWidth: 560 }}>
          {intro}
        </p>
      )}
    </section>

    <section className="px-6 md:px-12 pb-24">{children}</section>

    <footer
      className="px-6 md:px-12 py-10 flex items-center justify-between"
      style={{ borderTop: "1px solid rgba(42,31,22,0.12)" }}
    >
      <Link to="/" className="hero-wordmark" style={{ fontSize: 15 }}>
        NUREA
      </Link>
      <span
        className="text-[11px] uppercase tracking-[0.32em]"
        style={{ color: "rgba(42,31,22,0.55)", fontWeight: 500, fontFamily: "'Manrope', 'Inter', sans-serif" }}
      >
        Oslo · Norge
      </span>
    </footer>
  </main>
);

export default PageShell;
