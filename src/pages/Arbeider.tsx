import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import Button from "../components/Button";
import MediaReveal from "../components/MediaReveal";
import { WORK } from "../data/work";
import { sound } from "../lib/sound";
import { useLang, type Lang } from "../i18n";

const T: Record<Lang, {
  docTitle: string;
  eyebrow: string;
  title: string;
  intro: string;
  live: string;
  possible: string;
  cta: string;
}> = {
  no: {
    docTitle: "Arbeider",
    eyebrow: "Arbeider",
    title: "Arbeid som gjør bedrifter tydeligere.",
    intro:
      "Et utvalg av merker vi har bygget en tydelig digital retning for: identitet, nettsider, innhold og systemer som henger sammen.",
    live: "Se siden live",
    possible: "Vil du se hva som er mulig for din bedrift?",
    cta: "Få din klarhetssjekk",
  },
  en: {
    docTitle: "Work",
    eyebrow: "Work",
    title: "Work that makes businesses clearer.",
    intro:
      "A selection of brands we have built a clear digital direction for: identity, websites, content and systems that hold together.",
    live: "See it live",
    possible: "Want to see what is possible for your business?",
    cta: "Get your clarity check",
  },
};

export default function Arbeider() {
  const { lang, p } = useLang();
  const t = T[lang];
  return (
    <main>
      <PageHeader
        docTitle={t.docTitle}
        eyebrow={t.eyebrow}
        title={t.title}
        intro={t.intro}
      />

      <section className="bg-parchment text-ink">
        <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-32">
          <div className="flex flex-col gap-28 md:gap-40">
            {WORK[lang].filter((w) => !w.hidden).map((w, i) => (
              <article
                key={w.id}
                className={`grid items-start gap-8 md:grid-cols-2 md:gap-16 ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Reveal variant={i % 2 === 1 ? "slide-left" : "slide-right"}>
                  <MediaReveal
                    src={w.art}
                    alt={`${w.company}, ${w.title}`}
                    className="rounded-2xl"
                    eager={i === 0}
                  />
                  {w.shots.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      {w.shots.map((s) => (
                        <div key={s} className="overflow-hidden rounded-xl">
                          <img
                            src={s}
                            alt=""
                            loading="lazy"
                            width={600}
                            height={450}
                            className="aspect-[4/3] w-full object-cover transition-transform duration-[600ms] ease-out hover:scale-[1.06]"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </Reveal>

                <Reveal className="md:sticky md:top-32" delay={0.1}>
                  <p className="eyebrow text-accent">{w.title}</p>
                  <h2 className="display-sans mt-4 text-4xl md:text-6xl">{w.company}</h2>
                  <p className="mono mt-3 text-xs text-ink/45">{w.metricLabel}</p>
                  <p className="mt-6 max-w-[54ch] text-base leading-relaxed text-ink/65 md:text-lg">
                    {w.caption}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {w.tags.map((t) => (
                      <span
                        key={t}
                        className="mono rounded-none border border-ink/15 px-3 py-1 text-[11px] tracking-[0.1em] text-ink/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {(w.href || w.instagram) && (
                    <a
                      href={w.href ?? `https://www.instagram.com/${w.instagram?.slice(1)}`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => sound.play("click")}
                      className="link-line mt-8 inline-block text-sm font-semibold text-accent"
                    >
                      {w.href ? t.live : `Instagram ${w.instagram}`}
                    </a>
                  )}
                </Reveal>
              </article>
            ))}
          </div>

          <Reveal className="mt-28 text-center md:mt-40">
            <p className="display-sans mx-auto max-w-2xl text-2xl text-ink/70 md:text-3xl">
              {t.possible}
            </p>
            <div className="mt-8">
              <Button to={p("/klarhetssjekk")}>{t.cta}</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
