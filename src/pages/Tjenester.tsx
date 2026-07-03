import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import Button from "../components/Button";
import { SERVICES } from "../data/services";
import { sound } from "../lib/sound";

export default function Tjenester() {
  return (
    <main>
      <PageHeader
        docTitle="Tjenester"
        eyebrow="Tjenester"
        title="Fem deler, én grunnmur."
        intro="Dette er ikke løse produkter du kjøper. Det er ett system som gjør uklar digital tilstedeværelse om til klarhet, tillit og henvendelser, med merkevaren som første stein."
      />

      <section className="bg-parchment text-ink">
        <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-32">
          <div className="grid gap-y-4">
            {SERVICES.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.04}>
                <Link
                  to={`/tjenester/${s.id}`}
                  onClick={() => sound.play("click")}
                  onMouseEnter={() => sound.play("hover")}
                  className="group block border-b border-ink/10 py-10 md:py-14"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-4">
                    <div className="flex items-baseline gap-6">
                      <span className="text-sm font-semibold text-accent">{s.index}</span>
                      <h2 className="display text-4xl transition-transform duration-400 ease-out group-hover:translate-x-2 md:text-6xl">
                        {s.title}
                      </h2>
                    </div>
                    <span className="eyebrow text-ink/40">{s.stone}</span>
                  </div>
                  <div className="mt-6 grid gap-6 md:grid-cols-2 md:gap-16 md:pl-[calc(1.5rem+24px)]">
                    <p className="display text-xl leading-snug text-ink/80 md:text-2xl">
                      {s.statement}
                    </p>
                    <div>
                      <p className="max-w-[52ch] text-sm leading-relaxed text-ink/60 md:text-base">
                        {s.description} {s.positionBody}
                      </p>
                      <span className="link-line mt-4 inline-block text-sm font-semibold text-accent">
                        Les mer om {s.title.toLowerCase()}
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-20 text-center">
            <p className="display mx-auto max-w-2xl text-2xl text-ink/70 md:text-3xl">
              Usikker på hvor du bør starte? Start med klarhet.
            </p>
            <div className="mt-8">
              <Button to="/klarhetssjekk">Få din klarhetssjekk</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
