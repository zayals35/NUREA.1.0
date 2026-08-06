import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import Button from "../components/Button";
import { SERVICES } from "../data/services";
import { sound } from "../lib/sound";
import { useLang, type Lang } from "../i18n";

const T: Record<Lang, {
  docTitle: string;
  eyebrow: string;
  title: string;
  intro: string;
  readMore: (title: string) => string;
  unsure: string;
  cta: string;
}> = {
  no: {
    docTitle: "Tjenester",
    eyebrow: "Tjenester",
    title: "Fem deler, én retning.",
    intro:
      "Ikke løse produkter du kjøper, men ett system som gjør uklar digital tilstedeværelse om til klarhet, tillit og henvendelser.",
    readMore: (title) => `Les mer om ${title.toLowerCase()}`,
    unsure: "Usikker på hvor du bør starte? Start med klarhet.",
    cta: "Få din klarhetssjekk",
  },
  en: {
    docTitle: "Services",
    eyebrow: "Services",
    title: "Five parts, one direction.",
    intro:
      "Not loose products you buy, but one system that turns an unclear digital presence into clarity, trust and inquiries.",
    readMore: (title) => `Read more about ${title.toLowerCase()}`,
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
            {SERVICES[lang].map((s, i) => (
              <Reveal key={s.id} delay={i * 0.04}>
                <Link
                  to={p(`/tjenester/${s.id}`)}
                  onClick={() => sound.play("click")}
                  className="group block border-b border-ink/10 py-10 md:py-14"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-4">
                    <div className="flex items-baseline gap-6">
                      <span className="text-sm font-semibold text-accent">{s.index}</span>
                      <h2 className="display-sans text-4xl transition-transform duration-400 ease-out group-hover:translate-x-2 md:text-6xl">
                        {s.title}
                      </h2>
                    </div>
                    <span className="eyebrow text-ink/40">{s.role}</span>
                  </div>
                  <div className="mt-6 grid gap-6 md:grid-cols-2 md:gap-16 md:pl-[calc(1.5rem+24px)]">
                    <p className="display-sans text-xl leading-snug text-ink/80 md:text-2xl">
                      {s.statement}
                    </p>
                    <div>
                      <p className="max-w-[52ch] text-sm leading-relaxed text-ink/60 md:text-base">
                        {s.description} {s.positionBody}
                      </p>
                      <span className="link-line mt-4 inline-block text-sm font-semibold text-accent">
                        {t.readMore(s.title)}
                      </span>
                    </div>
                  </div>
                </Link>
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
