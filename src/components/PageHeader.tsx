import { type ReactNode } from "react";
import Smoke from "./Smoke";
import { usePageMeta } from "../lib/pageMeta";

interface Props {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  /** Browser tab title. */
  docTitle: string;
  /** Plain-text description for the meta tag when the title carries markup. */
  description?: string;
  /** Typography role for the h1. Defaults to the poster voice. */
  titleClassName?: string;
  /**
   * Routes r2: the split opener. The words sit on plain paper on the left,
   * the hero's smoke rises in a column on the right (a band above the words
   * on phones), and no line of type ever crosses it (her 2026-09-25 rule).
   */
  split?: boolean;
  children?: ReactNode;
}

/**
 * Shared page opener on paper, the front page's world carried inward: a red
 * Nippo eyebrow, the title in the poster voice, the intro in the human voice,
 * the page's first routes to contact, and one red rule drawing itself under
 * the block. Plain mode keeps the r1 opener for the routes not yet on the r2
 * pattern.
 */
export default function PageHeader({
  eyebrow,
  title,
  intro,
  docTitle,
  description,
  titleClassName = "poster",
  split,
  children,
}: Props) {
  usePageMeta(`${docTitle} · NUREA`, description ?? intro);

  const block = (
    <>
      <p
        className="page-seq font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-accent sm:text-xs"
        style={{ animationDelay: "0.05s" }}
      >
        {eyebrow}
      </p>
      <h1
        className={`page-seq ${titleClassName} mt-6 max-w-[16ch] text-[clamp(2.6rem,11vw,4.4rem)] md:text-[clamp(3.4rem,5.6vw,6rem)]`}
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
        <div className="page-seq mt-10 flex flex-wrap items-center gap-x-8 gap-y-5" style={{ animationDelay: "0.4s" }}>
          {children}
        </div>
      )}
      <span
        aria-hidden="true"
        className="rule-draw mt-12 block h-[2px] w-full bg-accent md:mt-16"
        style={{ animationDelay: "0.45s" }}
      />
    </>
  );

  if (split) {
    return (
      <header className="grain relative overflow-hidden bg-parchment text-ink">
        <div className="relative z-[2] flex flex-col md:grid md:min-h-[88svh] md:grid-cols-2">
          <div className="relative order-first h-[36svh] min-h-[240px] overflow-hidden md:order-none md:col-start-2 md:h-auto md:min-h-full">
            <Smoke amp={1} />
          </div>
          <div className="flex flex-col justify-end px-5 pb-12 pt-12 md:col-start-1 md:row-start-1 md:pb-16 md:pl-[max(2.5rem,calc((100vw-1440px)/2+2.5rem))] md:pr-12 md:pt-44">
            {block}
          </div>
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

  return (
    <header className="grain relative overflow-hidden bg-parchment text-ink">
      <div className="relative z-[2] mx-auto max-w-[1440px] px-5 pb-12 pt-32 md:px-10 md:pb-16 md:pt-44">
        {block}
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
