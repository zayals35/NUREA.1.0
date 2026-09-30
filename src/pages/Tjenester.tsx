import { useRef } from "react";
import { useLang } from "../i18n";
import { usePageMeta } from "../lib/pageMeta";
import { STUDIO } from "../data/studioSite";
import ServiceSelectors from "../components/studio/ServiceSelectors";
import { CutLink, LogoBelt, TextLink } from "../components/studio/parts";
import { useReveal } from "../components/studio/useReveal";

/**
 * Services: a large introduction, the three selectors opening their scenes,
 * how the collaboration works, the belt. No prices.
 */
export default function Tjenester() {
  const { lang, p } = useLang();
  const t = STUDIO[lang];
  const s = t.services;
  usePageMeta(t.meta.services.title, t.meta.services.description);
  const main = useRef<HTMLElement>(null);
  useReveal(main, [lang]);

  return (
    <main id="main" tabIndex={-1} ref={main}>
      <section className="st-intro">
        <h1>
          {s.h1a}
          <br />
          {s.h1b}
          <span className="st-accent">{s.h1accent}</span>
        </h1>
        <div className="st-intro-aside">
          <p className="st-label">{t.shell.nav[1].label}</p>
          <p className="st-lead">{s.lead}</p>
          <p>{s.intro}</p>
          <CutLink to={p("/kontakt")}>{t.shell.contact}</CutLink>
        </div>
      </section>

      <section className="st-section st-soft" style={{ paddingTop: "clamp(40px, 5vw, 72px)" }} aria-label={t.shell.nav[1].label}>
        <ServiceSelectors />
      </section>

      <section className="st-section" aria-labelledby="working-h">
        <div className="st-working">
          <h2 id="working-h" data-rv>
            {s.workingH}
          </h2>
          <div data-rv>
            {s.working.map((w, i) => (
              <details key={w.q} open={i === 0}>
                <summary>{w.q}</summary>
                <p>{w.a}</p>
              </details>
            ))}
            <div style={{ marginTop: 28 }}>
              <TextLink to={p("/arbeider")}>{t.studio.workLink}</TextLink>
            </div>
          </div>
        </div>
      </section>

      <LogoBelt />
    </main>
  );
}
