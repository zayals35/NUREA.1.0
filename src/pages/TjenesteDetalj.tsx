import { Link, Navigate, useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import Button from "../components/Button";
import WordReveal from "../components/WordReveal";
import { SERVICES } from "../data/services";
import { sound } from "../lib/sound";

export default function TjenesteDetalj() {
  const { slug } = useParams();
  const service = SERVICES.find((s) => s.id === slug);
  if (!service) return <Navigate to="/tjenester" replace />;

  const idx = SERVICES.indexOf(service);
  const next = SERVICES[(idx + 1) % SERVICES.length];

  return (
    <main>
      <PageHeader
        docTitle={service.title}
        eyebrow={`${service.index} · ${service.stone} i grunnmuren`}
        title={service.statement}
        intro={service.description}
      />

      <section className="grain relative overflow-hidden bg-espresso text-cream">
        <div className="relative z-[2] mx-auto max-w-[1440px] px-6 pb-24 md:px-10 md:pb-36">
          <WordReveal
            className="display-sans max-w-4xl text-2xl leading-[1.2] sm:text-3xl md:text-4xl"
            text={service.statementBody}
          />
        </div>
      </section>

      <section className="bg-parchment text-ink">
        <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-32">
          <Reveal>
            <p className="eyebrow text-accent">Hva du får</p>
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
              <Button to="/klarhetssjekk">Få din klarhetssjekk</Button>
              <Button to="/kontakt" variant="ghost">
                Kontakt oss
              </Button>
            </div>
            <Link
              to={`/tjenester/${next.id}`}
              onClick={() => sound.play("click")}
              className="link-line mt-12 inline-block text-sm text-cream/60 hover:text-cream"
            >
              Neste: {next.index} {next.title}
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
