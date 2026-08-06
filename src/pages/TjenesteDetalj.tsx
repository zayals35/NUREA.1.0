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
        eyebrow={`${service.index} · ${service.role}`}
        title={service.statement}
        intro={service.description}
      />

      <section className="grain relative overflow-hidden bg-espresso text-cream">
        <div className="relative z-[2] mx-auto max-w-[1440px] px-6 pb-24 md:px-10 md:pb-36">
          <WordReveal
            key={`${lang}-${service.id}`}
            className="display-sans max-w-4xl text-2xl leading-[1.2] sm:text-3xl md:text-4xl"
            text={service.statementBody}
          />
        </div>
      </section>

      <section className="bg-parchment text-ink">
        <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-32">
          <Reveal>
            <p className="eyebrow text-accent">{t.get}</p>
          </Reveal>
          <div className="mt-12 grid gap-x-16 gap-y-12 md:grid-cols-2">
            {service.deliverables.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.06} className="border-t border-ink/10 pt-6">
                <span className="text-sm font-semibold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="display-sans mt-3 text-2xl md:text-3xl">{d.title}</h2>
                <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-ink/60 md:text-base">
                  {d.body}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-24 max-w-2xl">
            <p className="eyebrow text-ink/40">{service.position}</p>
            <p className="display-sans mt-6 text-2xl leading-snug text-ink/80 md:text-3xl">
              {service.positionBody}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="grain relative overflow-hidden bg-espresso-deep text-cream">
        <div className="relative z-[2] mx-auto max-w-[1440px] px-6 py-24 text-center md:px-10 md:py-36">
          <Reveal sfx>
            <h2 className="display-sans mx-auto max-w-3xl text-3xl sm:text-4xl md:text-6xl">
              {service.ctaHeading}
            </h2>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button to={p("/klarhetssjekk")}>{t.cta}</Button>
              <Button to={p("/kontakt")} variant="ghost">
                {t.contact}
              </Button>
            </div>
            <Link
              to={p(`/tjenester/${next.id}`)}
              onClick={() => sound.play("click")}
              className="link-line mt-12 inline-block text-sm text-cream/70 hover:text-cream"
            >
              {t.next}: {next.index} {next.title}
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
