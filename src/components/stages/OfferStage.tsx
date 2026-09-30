import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/motion";
import ClipVideo from "../ClipVideo";
import { OFFERINGS, SERVICES } from "../../data/services";
import { sound } from "../../lib/sound";
import { useLang, type Lang } from "../../i18n";

const T: Record<Lang, { eyebrow: string; more: string; talk: string; proofs: string[]; posters: string }> = {
  no: {
    eyebrow: "Tre tilbud",
    more: "Les mer om",
    talk: "Snakk om dette",
    proofs: ["GIZAY, gizay.no. Ett trykk, og hver linje bytter språk.", "Bilmekka, bilmekka.no. Fra skilt til skjema uten et eneste mellomledd.", "Nurea Create. Visuelle studier for Nurea."],
    posters: "Tre visuelle studier fra Nurea Create",
  },
  en: {
    eyebrow: "Three offers",
    more: "Read more about",
    talk: "Talk about this",
    proofs: ["GIZAY, gizay.no. One press and every line changes language.", "Bilmekka, bilmekka.no. From the plate to the form with nothing in between.", "Nurea Create. Visual studies for Nurea."],
    posters: "Three visual studies from Nurea Create",
  },
};

/** The moving proof beside each offer: a real site, a real flow, the Create posters. */
function Proof({ i, alt }: { i: number; alt: string }) {
  if (i === 0) {
    return (
      <div className="aspect-[16/10] w-full overflow-hidden bg-espresso-deep">
        <ClipVideo base="/work/gizay/clips/04-language-turn" alt={alt} width={1920} height={1080} />
      </div>
    );
  }
  if (i === 1) {
    return (
      <div className="aspect-[16/10] w-full overflow-hidden bg-espresso-deep">
        <ClipVideo base="/work/bilmekka/clips/01-plate-funnel" alt={alt} width={1920} height={1080} />
      </div>
    );
  }
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden" role="img" aria-label={alt}>
      {["approved-pixel", "approved-botanical", "approved-type"].map((name, k) => (
        <img
          key={name}
          src={`/offers/${name}.webp`}
          alt=""
          width={540}
          height={960}
          loading="lazy"
          decoding="async"
          className="poster-drift absolute top-[6%] w-[30%] object-cover"
          style={{ left: `${8 + k * 31}%`, "--r": `${(k - 1) * 3}deg`, "--d": `${k * -2.3}s` } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

/**
 * The offer stage, routes r2: the page pins and the three offers travel
 * sideways through the frame as you scroll, one at a time, each with a
 * moving proof beside it and its own two routes on. On phones the three
 * panels stack and nothing pins; the proofs still play.
 */
export default function OfferStage() {
  const root = useRef<HTMLElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const { lang, p } = useLang();
  const t = T[lang];
  const offers = OFFERINGS[lang];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const track = root.current!.querySelector<HTMLElement>(".offer-track")!;
        const ticks = gsap.utils.toArray<HTMLElement>(".offer-tick", root.current!);
        const n = offers.length;
        const travel = () => track.scrollWidth - window.innerWidth;
        gsap.to(track, {
          x: () => -travel(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            pin: true,
            scrub: 0.6,
            start: "top top",
            end: () => "+=" + travel() * 1.15,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const i = Math.min(n - 1, Math.round(self.progress * (n - 1)));
              if (counter.current) counter.current.textContent = String(i + 1).padStart(2, "0");
              ticks.forEach((tick, k) => tick.classList.toggle("bg-parchment", k === i));
              ticks.forEach((tick, k) => tick.classList.toggle("bg-parchment/30", k !== i));
            },
          },
        });
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [lang], revertOnUpdate: true }
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-ink text-parchment motion-safe:md:h-svh">
      <div className="offer-track flex flex-col motion-safe:md:h-full motion-safe:md:flex-row motion-safe:md:will-change-transform">
        {offers.map((offer, i) => (
          <article
            key={offer.id}
            className="flex shrink-0 flex-col justify-center px-5 py-16 md:px-10 md:py-24 motion-safe:md:h-full motion-safe:md:w-screen motion-safe:md:pb-24 motion-safe:md:pt-28"
          >
            <div className="mx-auto grid w-full max-w-[1440px] gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-16">
              <div>
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-parchment/70 sm:text-xs">
                  {t.eyebrow} · {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="poster mt-5 text-[clamp(2.4rem,9vw,3.6rem)] md:text-[clamp(2.8rem,4.6vw,4.8rem)]">
                  {offer.title}
                </h2>
                <p className="voice mt-5 max-w-[22ch] text-2xl text-parchment md:text-3xl">{offer.description}</p>
                <p className="copy mt-6 max-w-[46ch] text-parchment">{offer.outcome}</p>
                {offer.note && (
                  <p className="mono mt-5 text-[11px] tracking-[0.14em] text-parchment/70">{offer.note}</p>
                )}
                <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
                  {offer.serviceIds.map((serviceId) => {
                    const service = SERVICES[lang].find((item) => item.id === serviceId);
                    if (!service) return null;
                    return (
                      <Link
                        key={service.id}
                        to={p(`/tjenester/${service.id}`)}
                        onClick={() => sound.play("click")}
                        className="link-line font-mono text-[15px] font-medium text-parchment"
                      >
                        {t.more} {service.title.toLowerCase()}
                      </Link>
                    );
                  })}
                  <Link
                    to={p("/kontakt")}
                    onClick={() => sound.play("click")}
                    className="link-line font-mono text-[15px] font-medium text-gold-soft"
                  >
                    {t.talk}
                  </Link>
                </div>
              </div>
              <figure className="m-0">
                <Proof i={i} alt={i === 2 ? t.posters : t.proofs[i]} />
                <figcaption className="mono mt-4 text-[11px] normal-case tracking-[0.06em] text-parchment/70">
                  {t.proofs[i]}
                </figcaption>
              </figure>
            </div>
          </article>
        ))}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-8 left-5 hidden items-center gap-4 md:left-10 motion-safe:md:flex"
      >
        <span className="font-mono text-xs font-medium tracking-[0.2em] text-parchment">
          <span ref={counter}>01</span> / {String(offers.length).padStart(2, "0")}
        </span>
        <span className="flex items-center gap-2">
          {offers.map((offer, k) => (
            <span
              key={offer.id}
              className={`offer-tick block h-px w-8 transition-colors duration-300 ${k === 0 ? "bg-parchment" : "bg-parchment/30"}`}
            />
          ))}
        </span>
      </div>
    </section>
  );
}
