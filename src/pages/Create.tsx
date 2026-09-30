import { useRef } from "react";
import { useLang } from "../i18n";
import { usePageMeta } from "../lib/pageMeta";
import { STUDIO } from "../data/studioSite";
import { CutLink, TextLink } from "../components/studio/parts";
import { useReveal } from "../components/studio/useReveal";

/**
 * Nurea Create, presented in English for its global audience: what it is,
 * how a batch works, who it is for, and its honest development status. No
 * checkout, no price list, no launch claim.
 */
export default function Create() {
  const { lang } = useLang();
  const t = STUDIO[lang];
  const c = t.create;
  usePageMeta(t.meta.create.title, t.meta.create.description);
  const main = useRef<HTMLElement>(null);
  useReveal(main, [lang]);

  return (
    <main id="main" tabIndex={-1} ref={main}>
      <section className="st-create-hero">
        <div>
          <p className="st-label">{c.kicker}</p>
          <h1 style={{ marginTop: 20 }}>
            {c.h1a}
            <em>{c.h1b}</em>
          </h1>
        </div>
        <div className="st-intro-aside">
          <p className="st-lead">{c.lead}</p>
          <span className="st-status">{c.status}</span>
        </div>
      </section>

      <section className="st-section st-blue" aria-labelledby="what-h">
        <div className="st-create">
          <div className="st-create-art" data-rv>
            <img src="/brand/art/hvem.webp" alt={c.artAlt} width={1080} height={1350} loading="lazy" decoding="async" />
          </div>
          <div className="st-create-body" data-rv>
            <p className="st-label">{c.whatLabel}</p>
            <h2 id="what-h" style={{ fontFamily: '"Cabinet Grotesk", sans-serif', fontWeight: 700, letterSpacing: "-0.045em", fontSize: "clamp(40px, 5vw, 80px)" }}>
              {c.whatH}
            </h2>
            <p>{c.what}</p>
            <span className="st-label" style={{ opacity: 0.8 }}>
              {c.artCaption}
            </span>
          </div>
        </div>
      </section>

      <section className="st-section" aria-labelledby="how-h">
        <div className="st-section-head">
          <div data-rv>
            <p className="st-label">{c.howLabel}</p>
            <h2 id="how-h" style={{ marginTop: 16 }}>
              {c.howLabel}.
            </h2>
          </div>
          <div className="st-head-aside" data-rv>
            <p className="st-label">{c.whoLabel}</p>
            <p className="st-lead">{c.who}</p>
          </div>
        </div>
        <div className="st-rows">
          {c.how.map((row, i) => (
            <div key={row.h} className="st-row" data-rv>
              <h3>
                <span className="st-label" style={{ display: "block", marginBottom: 8 }}>
                  0{i + 1}
                </span>
                {row.h}
              </h3>
              <p>{row.p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="st-section st-soft" aria-labelledby="status-h">
        <div className="st-principle">
          <div data-rv>
            <p className="st-label">{c.statusLabel}</p>
            <h2 id="status-h" style={{ marginTop: 16 }}>
              {c.statusH}
            </h2>
          </div>
          <div className="st-intro-aside" data-rv>
            <p className="st-lead">{c.statusP}</p>
            <p className="st-label">{c.ctaLabel}</p>
            <CutLink to={`mailto:${c.email}`}>{c.cta}</CutLink>
            <TextLink to="/en/about">{c.studioLink}</TextLink>
          </div>
        </div>
      </section>
    </main>
  );
}
