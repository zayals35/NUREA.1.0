import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import Button from "../components/Button";
import { DEMOS, UPCOMING } from "../data/demos";
import { WORK } from "../data/work";
import { sound } from "../lib/sound";

/** The demo library on paper. Norwegian only, by decision. */
export default function Demoer() {
  return (
    <main>
      <PageHeader
        docTitle="Demobibliotek"
        eyebrow="Demobibliotek"
        title="Slik ser tydelig ut, bransje for bransje."
        intro="Fullverdige demonettsider for fiktive bedrifter i ekte bransjer. Hver demo bygger på et studie: hva en nettside i bransjen faktisk må gjøre, hva de beste i verden gjør, og hvor norske sider svikter. Ikke maler. Referansebygg."
      />

      {/* The live demos */}
      <section className="bg-parchment text-ink">
        <div className="mx-auto max-w-[1440px] px-5 pb-20 pt-6 md:px-10 md:pb-32 md:pt-10">
          <div className="flex flex-col gap-24 md:gap-40">
            {DEMOS.map((d, i) => (
              <article
                key={d.id}
                className={`grid items-start gap-8 md:grid-cols-2 md:gap-16 ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Reveal variant={i % 2 === 1 ? "slide-left" : "slide-right"}>
                  <a
                    href={d.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sound.play("click")}
                    className="group block overflow-hidden border border-ink"
                    aria-label={`Åpne demoen ${d.company} i ny fane`}
                  >
                    <img
                      src={d.preview}
                      alt={`Skjermbilde av demonettsiden for ${d.company}`}
                      width={1148}
                      height={860}
                      loading={i === 0 ? "eager" : "lazy"}
                      className="w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
                    />
                  </a>
                  <p className="mono mt-3 text-[11px] tracking-[0.1em] text-ink/60">
                    Fiktiv bedrift, bygget som referanse
                  </p>
                </Reveal>

                <Reveal className="md:sticky md:top-32" delay={0.1}>
                  <p className="eyebrow text-accent">{d.niche}</p>
                  <h2 className="display-sans mt-4 text-4xl md:text-6xl">{d.company}</h2>
                  <p className="mt-6 max-w-[54ch] text-base leading-relaxed text-ink/75 md:text-lg">
                    {d.thesis}
                  </p>
                  <ul className="mt-8 flex flex-col border-t border-ink">
                    {d.signature.map((s) => (
                      <li
                        key={s}
                        className="flex items-baseline gap-4 border-b border-ink/20 py-3 text-sm text-ink"
                      >
                        <span aria-hidden="true" className="mono text-[11px] text-accent">
                          +
                        </span>
                        {s}
                      </li>
                    ))}
                  </ul>
                  <p className="mono mt-6 max-w-[54ch] text-xs leading-relaxed text-ink/60">
                    {d.studyLine}
                  </p>
                  <a
                    href={d.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sound.play("click")}
                    className="link-line mt-8 inline-block text-sm font-semibold text-accent"
                  >
                    Se demoen
                  </a>
                </Reveal>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming demos */}
      <section className="bg-parchment text-ink">
        <div className="mx-auto max-w-[1440px] px-5 pb-20 md:px-10 md:pb-32">
          <Reveal>
            <p className="eyebrow text-accent">Neste i biblioteket</p>
            <h2 className="poster mt-6 max-w-[14ch] text-[clamp(2.4rem,9vw,6rem)]">
              Én bransje om gangen. Studie først, alltid.
            </h2>
          </Reveal>
          <Reveal className="mt-12 border-t-2 border-ink" stagger={0.08}>
            {UPCOMING.map((u, i) => (
              <div
                key={u.niche}
                className="grid gap-2 border-b border-ink/20 py-6 md:grid-cols-[3rem_16rem_1fr_8rem] md:items-baseline md:gap-8"
              >
                <span className="mono text-xs text-accent">
                  {String(i + 2).padStart(2, "0")}
                </span>
                <h3 className="display-sans text-xl md:text-2xl">{u.niche}</h3>
                <p className="max-w-[64ch] text-sm leading-relaxed text-ink/70">{u.line}</p>
                <span
                  className={`mono text-[11px] tracking-[0.1em] md:text-right ${
                    u.status === "Bygges nå" ? "text-accent" : "text-ink/60"
                  }`}
                >
                  {u.status}
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Real, published work */}
      <section className="bg-parchment-alt text-ink">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-32">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-accent">Ekte arbeider</p>
            <h2 className="display-sans mt-4 text-3xl md:text-5xl">
              Demoene viser hva vi mener. Dette er hva vi har levert.
            </h2>
            <p className="mt-6 max-w-[54ch] text-base leading-relaxed text-ink/75">
              Bak biblioteket står ekte prosjekter for ekte bedrifter: identitet, nettsider,
              innhold og systemer som er i bruk i dag.
            </p>
          </Reveal>
          <Reveal className="mt-12 border-t-2 border-ink" stagger={0.06}>
            {WORK.no.filter((w) => !w.hidden).map((w) => (
              <div
                key={w.id}
                className="grid gap-1 border-b border-ink/20 py-5 md:grid-cols-[16rem_1fr_10rem] md:items-baseline md:gap-8"
              >
                <h3 className="display-sans text-xl md:text-2xl">{w.company}</h3>
                <p className="mono text-xs text-ink/60">
                  {w.title} · {w.metricLabel}
                </p>
                {w.href ? (
                  <a
                    href={w.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sound.play("click")}
                    className="link-line w-fit text-sm font-semibold text-accent md:justify-self-end"
                  >
                    Se siden live
                  </a>
                ) : (
                  <span className="mono text-[11px] tracking-[0.1em] text-ink/60 md:justify-self-end md:text-right">
                    Publisert arbeid
                  </span>
                )}
              </div>
            ))}
          </Reveal>
          <Reveal className="mt-12">
            <Button to="/arbeider" variant="ghost-dark">
              Se alle arbeider
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Bridge to the entry offer */}
      <section className="bg-parchment text-ink">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
          <Reveal>
            <p className="voice max-w-[28ch] text-3xl text-ink md:text-5xl">
              Lurer du på hva en slik demo ville vist for din bransje?
            </p>
            <div className="mt-8">
              <Button to="/klarhetssjekk">Få din klarhetssjekk</Button>
            </div>
            <p className="mt-6 max-w-[52ch] text-sm text-ink/70">
              Gratis, konkret, og din enten du går videre med oss eller ikke.{" "}
              <Link
                to="/metoden"
                onClick={() => sound.play("click")}
                className="link-line font-semibold text-accent"
              >
                Slik jobber vi
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
