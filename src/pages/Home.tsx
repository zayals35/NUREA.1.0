import { useRef, type CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/motion";
import { useLang } from "../i18n";
import { usePageMeta } from "../lib/pageMeta";
import { STUDIO, publishedArticles } from "../data/studioSite";
import Smoke from "../components/Smoke";
import ServiceSelectors from "../components/studio/ServiceSelectors";
import StackCards from "../components/studio/StackCards";
import InsightScene from "../components/studio/InsightScene";
import { CutLink, LogoBelt, TextLink } from "../components/studio/parts";
import { useReveal } from "../components/studio/useReveal";

/**
 * The front page, in this order: the smoke hero; the services at once, short,
 * as three selectors that open a scene; the moving belt; the four scroll
 * cards; the illustrated Insights scene. No client cases here, by Zaynab's
 * repeated ruling: GIZAY, Bilmekka and every other case live on /arbeider
 * only, reached from the hero's work link.
 */
export default function Home() {
  const { lang, p } = useLang();
  const t = STUDIO[lang];
  const h = t.home;
  usePageMeta(t.meta.home.title, t.meta.home.description);
  const main = useRef<HTMLElement>(null);
  const hero = useRef<HTMLElement>(null);
  useReveal(main, [lang]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // The statement stays crisp for the first half of the scene and only
        // lifts away as the scene itself leaves the viewport. The parent is
        // scrubbed, so the children's CSS entrances are never frozen.
        gsap.to(".st-hero-body", {
          yPercent: -8,
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: { trigger: hero.current, start: "55% top", end: "bottom top", scrub: 0.4 },
        });
      });
      return () => mm.revert();
    },
    { scope: hero, dependencies: [lang], revertOnUpdate: true }
  );

  return (
    <main id="main" tabIndex={-1} ref={main}>
      {/* One scene: the smoke fills the first screen, from under the header to
          the fold, and the statement stands in it. The wordmark and the contact
          action are the header, top-left and top-right. Nothing is framed. */}
      <section className="st-hero" ref={hero} aria-labelledby="hero-h">
        <div className="st-hero-scene" aria-hidden="true">
          <Smoke amp={1} net={0.22} className="st-smoke" />
        </div>
        <div className="st-hero-body">
          <h1 id="hero-h" className="st-hero-h1">
            <span className="st-line st-voice st-arrive">{h.h1a}</span>{" "}
            <span className="st-line st-arrive" style={{ "--d": "0.1s" } as CSSProperties}>
              {h.h1b}
              {h.h1accent}.
            </span>
          </h1>
          <p className="st-hero-sub st-arrive" style={{ "--d": "0.22s" } as CSSProperties}>
            {h.sub}
          </p>
          <div className="st-hero-act st-arrive" style={{ "--d": "0.32s" } as CSSProperties}>
            <CutLink to={p("/kontakt")} className="st-hero-cta">
              {h.cta}
            </CutLink>
            <TextLink to={p("/arbeider")}>{h.heroAlt}</TextLink>
          </div>
        </div>
      </section>

      {/* Straight to the point: what we do, in three selectors. */}
      <section className="st-open st-soft" id="services" aria-labelledby="services-h">
        <div className="st-open-head" data-rv>
          <h2 id="services-h">{h.servicesH}</h2>
          <p className="st-lead">{h.servicesLead}</p>
        </div>
        <ServiceSelectors cases={false} />
      </section>

      <LogoBelt />

      <StackCards />

      <section className="st-insight" id="insights" aria-labelledby="insights-h">
        <InsightScene as="h2" id="insights-h" title={h.insightsTitle} lead={h.insightsH} text={h.insightsP} soon={publishedArticles().length ? undefined : h.insightsSoon} alt={h.insightsArtAlt}>
          <CutLink to={p("/innsikt")}>{h.insightsCta}</CutLink>
        </InsightScene>
      </section>
    </main>
  );
}
