import { useEffect, type ReactNode } from "react";

interface Props {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  /** Browser tab title. */
  docTitle: string;
  children?: ReactNode;
}

/** Shared dark page opener with the hero entrance choreography. */
export default function PageHeader({ eyebrow, title, intro, docTitle, children }: Props) {
  useEffect(() => {
    document.title = `${docTitle} · NUREA`;
  }, [docTitle]);

  return (
    <header className="grain relative overflow-hidden bg-espresso text-cream">
      <div className="relative z-[2] mx-auto max-w-[1440px] px-6 pb-20 pt-36 md:px-10 md:pb-28 md:pt-48">
        <p className="page-seq eyebrow text-accent" style={{ animationDelay: "0.05s" }}>
          {eyebrow}
        </p>
        <h1
          className="page-seq display mt-6 max-w-5xl text-4xl sm:text-5xl md:text-7xl"
          style={{ animationDelay: "0.15s" }}
        >
          {title}
        </h1>
        {intro && (
          <p
            className="page-seq mt-8 max-w-[56ch] text-base leading-relaxed text-cream/70 md:text-lg"
            style={{ animationDelay: "0.28s" }}
          >
            {intro}
          </p>
        )}
        {children && (
          <div className="page-seq mt-10" style={{ animationDelay: "0.4s" }}>
            {children}
          </div>
        )}
      </div>
      <style>{`
        .page-seq { animation: hero-rise 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
        @keyframes hero-rise {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) { .page-seq { animation: none; } }
      `}</style>
    </header>
  );
}
