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
          {article.date && <> · <time dateTime={article.date}>{dateFmt.format(new Date(article.date))}</time></>}
        </p>
        <h1>{article.title[lang]}</h1>
        <p className="st-lead">{article.lead[lang]}</p>
        <img className="st-article-cover" src={article.cover} width={2016} height={1140} alt="" decoding="async" />
        <div className="st-article-body">
          {article.body[lang].map((section, i) => (
            <section key={i}>
              {section.heading && <h2>{section.heading}</h2>}
              {section.paragraphs.map((para, j) => <p key={j}>{para}</p>)}
            </section>
          ))}
          <section aria-labelledby="article-sources">
            <h2 id="article-sources">{lang === "no" ? "Kilder" : "Sources"}</h2>
            <ul className="st-article-sources">
              {article.sources.map((source) => (
                <li key={source.url}><a href={source.url}>{source.title}</a><span>{source.note[lang]}</span></li>
              ))}
            </ul>
            <p>{lang === "no" ? "Kildene gir veiledning om skjemaer og tilgjengelighet. De fastslår ikke et ideelt antall felt eller hvor mange flere henvendelser en endring vil gi." : "These sources provide guidance on forms and accessibility. They do not establish an ideal field count or predict how many more enquiries a change will generate."}</p>
          </section>
        </div>
        <TextLink to={p("/innsikt")}>{t.back}</TextLink>
      </article>
    </main>
  );
}
