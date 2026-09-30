import { Navigate, useParams } from "react-router-dom";
import { useLang } from "../i18n";
import { usePageMeta } from "../lib/pageMeta";
import { STUDIO, findArticle } from "../data/studioSite";
import { TextLink } from "../components/studio/parts";

/** One published article. Unpublished or unknown slugs go back to the index. */
export default function Artikkel() {
  const { slug } = useParams();
  const { lang, p } = useLang();
  const t = STUDIO[lang].insights;
  const article = findArticle(slug ?? "", lang);
  usePageMeta(article ? `${article.title[lang]} · NUREA` : STUDIO[lang].meta.insights.title, article?.lead[lang]);
  if (!article) return <Navigate to={p("/innsikt")} replace />;
  const dateFmt = new Intl.DateTimeFormat(lang === "no" ? "nb-NO" : "en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <main id="main" tabIndex={-1}>
      <article className="st-article">
        <p className="st-label">
          {STUDIO[lang].shell.nav[3].label}
          {article.date && ` · ${dateFmt.format(new Date(article.date))}`}
        </p>
        <h1>{article.title[lang]}</h1>
        <p className="st-lead">{article.lead[lang]}</p>
        <div className="st-article-body">
          {article.body[lang].map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        <TextLink to={p("/innsikt")}>{t.back}</TextLink>
      </article>
    </main>
  );
}
