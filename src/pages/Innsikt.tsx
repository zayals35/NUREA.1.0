import { useRef, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../i18n";
import { usePageMeta } from "../lib/pageMeta";
import { STUDIO, publishedArticles } from "../data/studioSite";
import { CutLink, TextLink } from "../components/studio/parts";
import InsightScene, { INSIGHT_ART } from "../components/studio/InsightScene";
import { useReveal } from "../components/studio/useReveal";

/**
 * One drawing per topic, same cast and ink, each in a Norwegian scene: the
 * safety reflector on a wet Trondheim street making a small shop visible
 * (why good businesses get overlooked), the master with the card that just
 * became clear (the website as the first meeting) and the cheese slicer in
 * the cabin cutting one heavy block into thin clear slices (systems that
 * save time). Each is shown whole, trimmed just inside its paper edge.
 */
const TOPIC_ART: { src: string; focus: string; zoom: number }[] = [
  { src: "/brand/art/innsikt-refleks.webp", focus: "50% 55%", zoom: 1.12 },
  { src: INSIGHT_ART.wide.src, focus: "50% 60%", zoom: 1.12 },
  { src: "/brand/art/innsikt-ostehovel.webp", focus: "50% 55%", zoom: 1.12 },
];

/**
 * Insights index: the illustrated scene opens the page. With articles
 * published, a featured story and image-led cards follow; until then, the
 * themes to come as illustrated previews marked "Kommer". No fake dates, no
 * dummy posts, no dead cards.
 */
export default function Innsikt() {
  const { lang, p } = useLang();
  const t = STUDIO[lang];
  const s = t.insights;
  usePageMeta(t.meta.insights.title, t.meta.insights.description);
  const main = useRef<HTMLElement>(null);
  useReveal(main, [lang]);
  const articles = publishedArticles();
  const [featured, ...rest] = articles;
  const dateFmt = new Intl.DateTimeFormat(lang === "no" ? "nb-NO" : "en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <main id="main" tabIndex={-1} ref={main}>
      <section className="st-insight st-insight-open">
        <InsightScene as="h1" title={s.h1} lead={s.lead} soon={featured ? undefined : s.soonH} alt={s.artAlt} />
      </section>

      {featured ? (
        <>
          <section className="st-section" style={{ paddingTop: 0 }} aria-label={s.featured}>
            <article className="st-featured" data-rv>
              <div className="st-featured-art" />
              <div className="st-intro-aside">
                <p className="st-label">
                  {s.featured}
                  {featured.date && ` · ${dateFmt.format(new Date(featured.date))}`}
                </p>
                <h2>
                  <Link to={p(`/innsikt/${featured.slug.no}`)}>{featured.title[lang]}</Link>
                </h2>
                <p className="st-lead">{featured.lead[lang]}</p>
                <TextLink to={p(`/innsikt/${featured.slug.no}`)}>{s.readMore}</TextLink>
              </div>
            </article>
          </section>
          {rest.length > 0 && (
            <section className="st-section st-soft" aria-label={s.all}>
              <p className="st-label" style={{ marginBottom: 28 }}>
                {s.all}
              </p>
              <div className="st-article-grid">
                {rest.map((a) => (
                  <article key={a.slug.no} data-rv>
                    {a.date && <span className="st-label">{dateFmt.format(new Date(a.date))}</span>}
                    <h3>
                      <Link to={p(`/innsikt/${a.slug.no}`)}>{a.title[lang]}</Link>
                    </h3>
                    <p>{a.lead[lang]}</p>
                  </article>
                ))}
              </div>
            </section>
          )}
        </>
      ) : (
        <section className="st-section st-soft st-topics-section" aria-labelledby="topics-h">
          <div className="st-topics-head" data-rv>
            <h2 id="topics-h">{s.themesLabel}</h2>
            <p className="st-lead">{s.soonP}</p>
          </div>
          <ul className="st-topics">
            {s.themes.map((th, i) => (
              <li key={th.h} className="st-topic" data-rv style={{ "--i": i } as CSSProperties}>
                <div className="st-topic-art" aria-hidden="true">
                  <img src={TOPIC_ART[i].src} width={INSIGHT_ART.wide.width} height={INSIGHT_ART.wide.height} alt="" loading="lazy" decoding="async" style={{ "--focus": TOPIC_ART[i].focus, "--zoom": TOPIC_ART[i].zoom } as CSSProperties} />
                </div>
                <div className="st-topic-body">
                  <span className="st-soon">{s.soonMark}</span>
                  <h3>{th.h}</h3>
                  <p>{th.p}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="st-gallery-foot" data-rv>
            <p className="st-note" style={{ color: "var(--ink)", fontSize: 18 }}>
              {s.notify}
            </p>
            <CutLink to="mailto:hei@nurea.no">{s.notifyCta}</CutLink>
          </div>
        </section>
      )}
    </main>
  );
}
