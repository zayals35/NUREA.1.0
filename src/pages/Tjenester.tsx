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
  note: string;
  unsure: string;
  cta: string;
}> = {
  no: {
    docTitle: "Tjenester",
    eyebrow: "Tjenester",
    title: "Tre tilbud, én retning.",
    intro:
      "Tre tydelige tilbud for bedriftens digitale tilstedeværelse. Velg det som passer behovet ditt, eller start med en klarhetssjekk.",
    capabilities: "Les mer om",
    note: "Leveranse, pris og eventuell oppfølging avtales før vi starter. Tilbudene velges hver for seg.",
    unsure: "Usikker på hvor du bør starte? Start med klarhet.",
    cta: "Få din klarhetssjekk",
  },
  en: {
    docTitle: "Services",
    eyebrow: "Services",
    title: "Three offers, one direction.",
    intro:
      "Three clear offers for your business's digital presence. Choose what fits your needs, or start with a clarity check.",
    capabilities: "Read more about",
    note: "Deliverables, price and any ongoing support are agreed before we start. Each offer stands on its own.",
    unsure: "Not sure where to start? Start with clarity.",
    cta: "Get your clarity check",
  },
};

/** The three offers as rows on paper, unnumbered and independently selectable. */
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
        <div className="mx-auto max-w-[1440px] px-5 pb-20 pt-4 md:px-10 md:pb-32 md:pt-8">
          <div>
            {OFFERINGS[lang].map((offer, i) => (
              <Reveal key={offer.id} delay={i * 0.04}>
                <article className="grid gap-6 border-b border-ink py-10 md:grid-cols-[1fr_1.1fr] md:gap-16 md:py-14">
                  <div>
                    <h2 className="display-sans text-4xl md:text-6xl">{offer.title}</h2>
                    <p className="voice mt-4 max-w-[24ch] text-2xl text-ink md:text-3xl">{offer.description}</p>
                  </div>
                  <div>
                    <p className="max-w-[46ch] text-base leading-relaxed text-ink/75 md:text-lg">{offer.outcome}</p>
                    {offer.note && (
                      <p className="mono mt-5 text-[11px] tracking-[0.14em] text-accent">{offer.note}</p>
                    )}
                    <p className="eyebrow mt-8 text-ink/60">{t.capabilities}</p>
                    <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
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
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8">
            <p className="max-w-[52ch] text-sm leading-relaxed text-ink/70 md:text-base">{t.note}</p>
          </Reveal>

          <Reveal className="mt-24 border-t-2 border-ink pt-12 md:mt-32 md:pt-16">
            <p className="voice max-w-[26ch] text-3xl text-ink md:text-5xl">{t.unsure}</p>
            <div className="mt-8">
              <Button to={p("/klarhetssjekk")}>{t.cta}</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
