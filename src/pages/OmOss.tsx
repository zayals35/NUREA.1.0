import { useRef } from "react";
import { useLang } from "../i18n";
import { usePageMeta } from "../lib/pageMeta";
import { STUDIO } from "../data/studioSite";
import { CutLink, LogoBelt, TextLink } from "../components/studio/parts";
import { useReveal } from "../components/studio/useReveal";

/**
 * Studio: how Nurea works. Direct collaboration, decisions on real screens,
 * the role of the tools, who owns quality. No portrait, no invented team.
 */
export default function OmOss() {
  const { lang, p } = useLang();
  const t = STUDIO[lang];
  const s = t.studio;
  usePageMeta(t.meta.studio.title, t.meta.studio.description);
  const main = useRef<HTMLElement>(null);
  useReveal(main, [lang]);

  return (
    <main id="main" tabIndex={-1} ref={main}>
      <section className="st-studio-hero">
        <div>
          <h1>
            {s.h1a}
            <br />
            <em>{s.h1em}</em> {s.h1c}
          </h1>
          <p className="st-lead" style={{ marginTop: 28 }}>
            {s.intro}
          </p>
        </div>
        <div className="st-studio-art">
          <img src="/brand/art/synes.webp" alt={s.artAlt} width={1080} height={1350} decoding="async" />
        </div>
      </section>

      <section className="st-section st-soft" aria-labelledby="principle-h">
        <div className="st-principle">
          <div data-rv>
            <p className="st-label">{s.principleLabel}</p>
            <h2 id="principle-h" style={{ marginTop: 16 }}>
              {s.principleH}
            </h2>
          </div>
          <p className="st-lead" data-rv>
            {s.principle}
          </p>
        </div>
      </section>

      {/* The blue card on the front page lands here. */}
      <section className="st-section st-blue st-anchor" id="ai" aria-labelledby="ai-h">
        <div className="st-section-head">
          <h2 id="ai-h" data-rv>
            {s.aiH}
          </h2>
          <p className="st-lead" data-rv>
            {s.aiLead}
          </p>
        </div>
        <div className="st-rows">
          {s.ai.map((row) => (
            <div key={row.h} className="st-row" data-rv>
              <h3>{row.h}</h3>
              <p>{row.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The green card on the front page lands here. */}
      <section className="st-section st-green st-anchor" id="samarbeid" aria-labelledby="how-h">
        <div className="st-section-head">
          <h2 id="how-h" data-rv>
            {s.howH}
          </h2>
          <p className="st-lead" data-rv>
            {s.howLead}
          </p>
        </div>
        <div className="st-rows">
          {s.how.map((row) => (
            <div key={row.h} className="st-row" data-rv>
              <h3>{row.h}</h3>
              <p>{row.p}</p>
            </div>
          ))}
        </div>
        <div className="st-gallery-foot" data-rv>
          <TextLink to={p("/arbeider")}>{s.workLink}</TextLink>
          <CutLink to={p("/kontakt")} paper>
            {t.shell.contact}
          </CutLink>
        </div>
      </section>

      <LogoBelt />
    </main>
  );
}
