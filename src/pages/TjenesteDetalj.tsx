import { useRef } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import Button from "../components/Button";
import AccentWord from "../components/AccentWord";
import CloseSection from "../components/CloseSection";
import CaseReel from "../components/stages/CaseReel";
import { SERVICES, type ServiceId } from "../data/services";
import { gsap, prefersReducedMotion } from "../lib/motion";
import { sound } from "../lib/sound";
import { useLang, SERVICE_ID_FROM_EN_SLUG, type Lang } from "../i18n";

const T: Record<Lang, { get: string; cta: string; contact: string; talk: string; next: string }> = {
  no: { get: "Hva du får", cta: "Få din klarhetssjekk", contact: "Kontakt oss", talk: "Snakk med oss om dette", next: "Neste" },
  en: { get: "What you get", cta: "Get your clarity check", contact: "Contact us", talk: "Talk to us about this", next: "Next" },
};

/** The one word per statement that carries the citron stroke. */
const ACCENT: Record<Lang, Record<ServiceId, string>> = {
  no: { merkevare: "gjenkjennelsen", nettsider: "salgsteamet", innhold: "riktig", systemer: "flyten", reklamer: "forsterkning" },
  en: { merkevare: "recognition", nettsider: "sales team", innhold: "right", systemer: "flow", reklamer: "amplification" },
};

/** Deliverables on parchment, kept as she liked it: numbers count in, rules draw, the sentences in reading weight. */
function Deliverables({ label, items }: { label: string; items: { title: string; body: string }[] }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = root.current!;
      const cells = gsap.utils.toArray<HTMLElement>(".dl-cell", el);
      cells.forEach((cell, i) => {
        const num = cell.querySelector<HTMLElement>(".dl-num")!;
        const rule = cell.querySelector<HTMLElement>(".dl-rule")!;
        const body = cell.querySelector<HTMLElement>(".dl-body")!;
        const counter = { v: 0 };
        gsap
          .timeline({ scrollTrigger: { trigger: cell, start: "top 82%", once: true }, delay: i * 0.08 })
          .fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "expo.out" }, 0)
          .to(
            counter,
            {
              v: i + 1,
              duration: 0.7,
              ease: "power2.out",
              snap: { v: 1 },
              onUpdate: () => {
                num.textContent = String(Math.round(counter.v)).padStart(2, "0");
              },
            },
            0.1
          )
          .from(body, { y: 24, opacity: 0, duration: 0.7, ease: "expo.out" }, 0.15);
      });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-32">
      <p className="eyebrow text-accent">{label}</p>
      <div className="mt-10 grid gap-x-16 gap-y-12 md:grid-cols-2">
        {items.map((d, i) => (
          <div key={d.title} className="dl-cell relative pt-6">
            <span className="dl-rule absolute left-0 top-0 block h-[2px] w-full origin-left bg-ink" />
            <span className="dl-num poster block text-5xl text-accent md:text-6xl">{String(i + 1).padStart(2, "0")}</span>
            <div className="dl-body">
              <h2 className="display-sans mt-5 text-2xl md:text-3xl">{d.title}</h2>
              <p className="copy mt-3 max-w-[48ch] text-ink">{d.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * One capability, routes r2: the split opener, the statement in full ink
 * with the first contact link under it, the case reel on ink (websites and
 * brand only), the deliverables counting in, the position line with its
 * pill, then the red close.
 */
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
  const showReel = service.id === "nettsider" || service.id === "merkevare";

  return (
    <main>
      <PageHeader
        docTitle={service.title}
        eyebrow={service.role}
        title={<AccentWord text={service.statement} word={ACCENT[lang][service.id]} />}
        description={service.description}
        intro={service.description}
        split
      >
        <Button to={p("/klarhetssjekk")}>{t.cta}</Button>
        <Button to={p("/kontakt")} variant="link">{t.contact}</Button>
      </PageHeader>

      <section className="bg-parchment text-ink">
        <div className="mx-auto max-w-[1440px] px-5 pb-20 pt-16 md:px-10 md:pb-28 md:pt-24">
          <Reveal>
            <p className="display-sans max-w-5xl text-2xl leading-[1.15] text-ink sm:text-3xl md:text-[2.6rem]">
              {service.statementBody}
            </p>
          </Reveal>
          <Reveal className="mt-10" delay={0.1}>
            <Link to={p("/kontakt")} onClick={() => sound.play("click")} className="link-line font-mono text-[15px] font-medium text-accent">
              {t.talk}
            </Link>
          </Reveal>
        </div>
      </section>

      {showReel && <CaseReel />}

      <section className="bg-parchment-alt text-ink">
        <Deliverables label={t.get} items={service.deliverables} />
      </section>

      <section className="bg-parchment text-ink">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-32">
          <Reveal className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end md:gap-16">
            <div>
              <p className="eyebrow text-accent">{service.position}</p>
              <p className="voice mt-6 max-w-[26ch] text-3xl text-ink md:text-5xl">{service.positionBody}</p>
            </div>
            <div className="md:flex md:justify-end">
              <Button to={p("/klarhetssjekk")}>{t.cta}</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <CloseSection
        heading={service.ctaHeading}
        primary={{ to: p("/klarhetssjekk"), label: t.cta }}
        secondary={{ to: p("/kontakt"), label: t.contact }}
      >
        <Link
          to={p(`/tjenester/${next.id}`)}
          onClick={() => sound.play("click")}
          className="link-line mono mt-14 inline-block text-xs text-parchment/80 hover:text-parchment"
        >
          {t.next}: {next.title}
        </Link>
      </CloseSection>
    </main>
  );
}
