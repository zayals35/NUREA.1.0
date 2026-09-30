import { useRef } from "react";
import { useLang } from "../i18n";
import { usePageMeta } from "../lib/pageMeta";
import { STUDIO, WORK, CREATE_DESTINATION } from "../data/studioSite";
import WorkGallery from "../components/studio/WorkGallery";
import { CutLink, LogoBelt } from "../components/studio/parts";
import { useReveal } from "../components/studio/useReveal";

/** Work: the editorial gallery of real recordings, then Create as a labelled studio initiative, then the belt. */
export default function Arbeider() {
  const { lang, p } = useLang();
  const t = STUDIO[lang];
  const w = t.work;
  usePageMeta(t.meta.work.title, t.meta.work.description);
  const main = useRef<HTMLElement>(null);
  useReveal(main, [lang]);

  return (
    <main id="main" tabIndex={-1} ref={main}>
      <section className="st-intro">
        <h1>{w.h1}</h1>
        <div className="st-intro-aside">
          <p className="st-lead">{w.lead}</p>
          <p className="st-label">{w.note}</p>
        </div>
      </section>

      <section className="st-section" style={{ paddingTop: 0 }} aria-label={t.shell.nav[0].label}>
        <WorkGallery pieces={WORK} />
      </section>

      <section className="st-section st-blue" aria-labelledby="initiative-h">
        <div className="st-principle">
          <div data-rv>
            <p className="st-label">{w.initiativeLabel}</p>
            <h2 id="initiative-h" style={{ marginTop: 16 }}>
              {w.initiativeH}
            </h2>
          </div>
          <div className="st-intro-aside" data-rv>
            <p className="st-lead">{w.initiativeP}</p>
            <CutLink to={CREATE_DESTINATION} paper>
              {w.initiativeCta}
            </CutLink>
          </div>
        </div>
      </section>

      <LogoBelt />

      <section className="st-section" style={{ paddingTop: "clamp(40px, 5vw, 72px)" }}>
        <div className="st-intro-aside" data-rv>
          <p className="st-lead">{t.shell.reassure}</p>
          <CutLink to={p("/kontakt")}>{t.shell.contact}</CutLink>
        </div>
      </section>
    </main>
  );
}
