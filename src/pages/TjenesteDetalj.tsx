import { Link, Navigate, useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import Button from "../components/Button";
import WordReveal from "../components/WordReveal";
import { SERVICES } from "../data/services";
import { sound } from "../lib/sound";
import { useLang, SERVICE_ID_FROM_EN_SLUG, type Lang } from "../i18n";

const T: Record<Lang, { get: string; cta: string; contact: string; next: string }> = {
  no: { get: "Hva du får", cta: "Få din klarhetssjekk", contact: "Kontakt oss", next: "Neste" },
  en: { get: "What you get", cta: "Get your clarity check", contact: "Contact us", next: "Next" },
};

/** One capability on paper: the claim, the reading statement, the deliverables, then the red close. */
export default function TjenesteDetalj() {
  const { slug } = useParams();
  const { lang, p } = useLang();
  const t = T[lang];

  // EN routes use English slugs; resolve back to the canonical service id.
  const id = lang === "en" ? SERVICE_ID_FROM_EN_SLUG[slug ?? ""] : slug;
  const service = SERVICES[lang].find((s) => s.id === id);
  if (!service) return <Navigate to={p("/tjenester")} replace />;

  const idx = SERVICES[lang].indexOf(service);
  const next = SERVICES[lang][(idx + 1) % SERVICES[lang].length];

  return (
    <main>
      <PageHeader
        docTitle={service.title}
        eyebrow={service.role}
        title={service.statement}
        intro={service.description}
      />

      <section className="bg-parchment text-ink">
        <div className="mx-auto max-w-[1440px] px-5 pb-20 pt-4 md:px-10 md:pb-28 md:pt-8">
          <WordReveal
            key={`${lang}-${service.id}`}
            brightColor="#201d1d"
            dimColor="rgba(32, 29, 29, 0.22)"
            className="display-sans max-w-4xl text-2xl leading-[1.2] sm:text-3xl md:text-4xl"
            text={service.statementBody}
          />
        </div>
      </section>

      <section className="bg-parchment-alt text-ink">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-32">
          <Reveal>
            <p className="eyebrow text-accent">{t.get}</p>
          </Reveal>
          <div className="mt-10 grid gap-x-16 gap-y-10 md:grid-cols-2">
            {service.deliverables.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.06} className="border-t border-ink pt-6">
                <span className="poster block text-3xl text-accent md:text-4xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="display-sans mt-4 text-2xl md:text-3xl">{d.title}</h2>
                <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-ink/70 md:text-base">
                  {d.body}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-24 max-w-2xl">
            <p className="eyebrow text-ink/60">{service.position}</p>
            <p className="voice mt-6 text-2xl text-ink md:text-4xl">{service.positionBody}</p>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-accent text-parchment">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
          <Reveal sfx>
            <h2 className="poster max-w-[14ch] text-[clamp(2.4rem,10vw,4rem)] md:text-[clamp(3.6rem,6.4vw,6.4rem)]">
              {service.ctaHeading}
            </h2>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <Button to={p("/klarhetssjekk")} variant="paper">{t.cta}</Button>
              <Button to={p("/kontakt")} variant="link" className="text-parchment">
                {t.contact}
              </Button>
            </div>
            <Link
              to={p(`/tjenester/${next.id}`)}
              onClick={() => sound.play("click")}
              className="link-line mono mt-14 inline-block text-xs text-parchment/80 hover:text-parchment"
            >
              {t.next}: {next.title}
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
