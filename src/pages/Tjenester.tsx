import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import Button from "../components/Button";
import { OFFERINGS, SERVICES } from "../data/services";
import { sound } from "../lib/sound";
import { useLang, type Lang } from "../i18n";

const T: Record<Lang, {
  docTitle: string;
  eyebrow: string;
  title: string;
  intro: string;
  capabilities: string;
  unsure: string;
  cta: string;
}> = {
  no: {
    docTitle: "Tjenester",
    eyebrow: "Tjenester",
    title: "Tre tilbud, én retning.",
    intro:
      "Tre tydelige tilbud for bedriftens digitale tilstedeværelse. Velg det som passer behovet ditt, eller start med en klarhetssjekk.",
    capabilities: "Detaljer",
    unsure: "Usikker på hvor du bør starte? Start med klarhet.",
    cta: "Få din klarhetssjekk",
  },
  en: {
    docTitle: "Services",
    eyebrow: "Services",
    title: "Three offers, one direction.",
    intro:
      "Three clear offers for your business's digital presence. Choose what fits your needs, or start with a clarity check.",
    capabilities: "Details",
    unsure: "Not sure where to start? Start with clarity.",
    cta: "Get your clarity check",
  },
};

export default function Tjenester() {
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
          <div className="grid gap-y-4">
            {OFFERINGS[lang].map((offer, i) => (
              <Reveal key={offer.id} delay={i * 0.04}>
                <article className="border-b border-ink/10 py-10 md:py-14">
                  <div className="flex flex-wrap items-baseline justify-between gap-4">
                    <div className="flex items-baseline gap-6">
                      <span className="text-sm font-semibold text-accent">{String(i + 1).padStart(2, "0")}</span>
                      <h2 className="display-sans text-4xl md:text-6xl">{offer.title}</h2>
                    </div>
                    <span className="eyebrow text-ink/40">{offer.serviceIds.length} {lang === "no" ? "deler" : "capabilities"}</span>
                  </div>
                  <div className="mt-6 grid gap-6 md:grid-cols-2 md:gap-16 md:pl-[calc(1.5rem+24px)]">
                    <p className="display-sans text-xl leading-snug text-ink/80 md:text-2xl">{offer.description}</p>
                    <div>
                      <p className="max-w-[52ch] text-sm leading-relaxed text-ink/75 md:text-base">{offer.outcome}</p>
                      <p className="eyebrow mt-6 text-ink/40">{t.capabilities}</p>
                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                        {offer.serviceIds.map((serviceId) => {
                          const service = SERVICES[lang].find((item) => item.id === serviceId);
                          if (!service) return null;
                          return (
                            <Link
                              key={service.id}
                              to={p(`/tjenester/${service.id}`)}
                              onClick={() => sound.play("click")}
                              className="link-line text-sm font-semibold text-accent"
                            >
                              {service.title}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-20 text-center">
            <p className="display-sans mx-auto max-w-2xl text-2xl text-ink/70 md:text-3xl">
              {t.unsure}
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
