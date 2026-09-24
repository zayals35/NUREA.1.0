import { useEffect, type ReactNode } from "react";

interface Props {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  /** Browser tab title. */
  docTitle: string;
  /** Typography role for the h1. Defaults to the poster voice. */
  titleClassName?: string;
  children?: ReactNode;
}

/**
 * Shared page opener on paper, the front page's world carried inward: a red
 * Nippo eyebrow, the title in the poster voice, the intro in the human voice,
 * and one red rule drawing itself under the block. The smoke stays with the
 * hero and the footer; the pages between them are plain paper.
 */
export default function PageHeader({
  eyebrow,
  title,
  intro,
  docTitle,
  titleClassName = "poster",
  children,
}: Props) {
  useEffect(() => {
    document.title = `${docTitle} · NUREA`;
    if (intro) {
      document.querySelector('meta[name="description"]')?.setAttribute("content", intro);
    }
  }, [docTitle, intro]);

  return (
    <header className="grain relative overflow-hidden bg-parchment text-ink">
      <div className="relative z-[2] mx-auto max-w-[1440px] px-5 pb-12 pt-32 md:px-10 md:pb-16 md:pt-44">
        <p
          className="page-seq font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-accent sm:text-xs"
          style={{ animationDelay: "0.05s" }}
        >
          {eyebrow}
        </p>
        <h1
          className={`page-seq ${titleClassName} mt-6 max-w-[16ch] text-[clamp(2.6rem,11vw,4.4rem)] md:text-[clamp(3.6rem,6.4vw,6.4rem)]`}
          style={{ animationDelay: "0.15s" }}
        >
          {title}
        </h1>
        {intro && (
          <p
            className="page-seq voice mt-7 max-w-[38ch] text-xl text-ink md:mt-9 md:text-3xl"
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
        <span
          aria-hidden="true"
          className="rule-draw mt-12 block h-[2px] w-full bg-accent md:mt-16"
          style={{ animationDelay: "0.45s" }}
        />
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
