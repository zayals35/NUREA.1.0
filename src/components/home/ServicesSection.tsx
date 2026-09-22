import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import { gsap } from "../../lib/motion";
import { NureaSymbol } from "../brand/NureaLogo";
import { useLang, type Lang } from "../../i18n";
import "./ServicesSection.css";

const T = {
  no: {
    heading: ["Se like god ut", "som du er."],
    intro: "Vi bygger nettsider og kobler sammen verktøyene du bruker. Med et tydelig uttrykk og et avtalt omfang.",
    offers: [
      { art: "identity", title: "Nettside og uttrykk", line: "Gjør det lett å velge deg.", body: "En gjennomarbeidet nettside med klare ord, et eget uttrykk og en enkel vei til kontakt. Vi avtaler hva du trenger, og bygger det ferdig.", note: "" },
      { art: "systems", title: "Systemer og automatisering", line: "Færre ting å følge opp manuelt.", body: "Vi kobler sammen skjema, e-post eller booking, så en henvendelse kommer riktig frem. Én konkret arbeidsflyt, tilpasset verktøyene du bruker.", note: "" },
      { art: "content", title: "Visuell produksjon", line: "Nurea Create", body: "AI-assisterte kampanjebilder og korte filmer for produktmerker. Avgrensede produksjoner med en avtalt visuell retning og ferdige filer til dine kanaler.", note: "Under utvikling. Åpner senere." },
    ],
    identity: "Et uttrykk som er ditt.", content: "Visuelle studier for Nurea", flow: ["Henvendelse", "Bekreftelse", "Booking"],
    question: "Hva vil du gjøre enklere?", cta: "Få din klarhetssjekk", all: "Se tjenestene", note: "Leveranse, pris og eventuell oppfølging avtales før vi starter.",
    pause: "Pause animasjon", play: "Spill animasjon", visualLabel: "Eksempel på en arbeidsflyt fra henvendelse via bekreftelse til booking.",
  },
  en: {
    heading: ["Look as good", "as you are."],
    intro: "We build websites and connect the tools you use. With a clear identity and an agreed scope.",
    offers: [
      { art: "identity", title: "Website and identity", line: "Make choosing you easy.", body: "A considered website with clear words, a distinctive identity and a simple way to get in touch. We agree on what you need, then build it.", note: "" },
      { art: "systems", title: "Systems and automation", line: "Less to follow up manually.", body: "We connect forms, email or booking so inquiries reach the right place. One specific workflow, built around the tools you use.", note: "" },
      { art: "content", title: "Visual production", line: "Nurea Create", body: "AI-assisted campaign images and short films for product brands. Defined productions with an agreed visual direction and finished files for your channels.", note: "In development. Coming later." },
    ],
    identity: "An identity of your own.", content: "Visual studies for Nurea", flow: ["Inquiry", "Confirmation", "Booking"],
    question: "What would you like to simplify?", cta: "Get your clarity check", all: "Explore services", note: "Deliverables, price and any ongoing support agreed before we start.",
    pause: "Pause animation", play: "Play animation", visualLabel: "Example of a workflow from inquiry through confirmation to booking.",
  },
} satisfies Record<Lang, unknown>;

function Arrow() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" /></svg>;
}

function OfferArt({ art, lang }: { art: string; lang: Lang }) {
  const t = T[lang];
  if (art === "identity") return (
    <div className="offer-art offer-art--identity" aria-hidden="true">
      <div className="offer-optical">
        {[0, 1, 2, 3, 4].map((i) => <div key={i} className={`offer-echo offer-echo--${i}`}><NureaSymbol /></div>)}
        <div className="offer-solid"><NureaSymbol /></div>
      </div>
      <span className="offer-art-signature">nurea</span>
      <span className="offer-art-caption">{t.identity}</span>
    </div>
  );
  if (art === "content") return (
    <div className="offer-art offer-art--content" aria-hidden="true">
      <div className="offer-poster offer-poster--left"><img src="/offers/approved-pixel.webp" alt="" width="540" height="960" loading="lazy" decoding="async" /></div>
      <div className="offer-poster offer-poster--right"><img src="/offers/approved-botanical.webp" alt="" width="540" height="960" loading="lazy" decoding="async" /></div>
      <div className="offer-poster offer-poster--center"><img src="/offers/approved-type.webp" alt="" width="540" height="960" loading="lazy" decoding="async" /></div>
      <span className="offer-art-caption">{t.content}</span>
    </div>
  );
  return (
    <div className="offer-art offer-art--systems" role="img" aria-label={t.visualLabel}>
      <div className="offer-flow" aria-hidden="true">
        <div className="offer-flow-line"><span /></div>
        <div className="offer-flow-line offer-flow-line--second"><span /></div>
        {t.flow.map((label, i) => (
          <div className={`offer-flow-step offer-flow-step--${i}`} key={label}>
            <span className="offer-flow-icon">
              {i === 0 && <svg viewBox="0 0 48 48" fill="none"><path d="M10 11h28v21H23l-9 7v-7h-4V11Z" stroke="currentColor" strokeWidth="2" /><path d="M17 19h14M17 25h9" stroke="currentColor" strokeWidth="2" /></svg>}
              {i === 1 && <svg viewBox="0 0 48 48" fill="none"><path d="M11 23h24M26 14l10 9-10 9" stroke="currentColor" strokeWidth="2" /><path d="M12 12v25" stroke="currentColor" strokeWidth="2" /></svg>}
              {i === 2 && <svg viewBox="0 0 48 48" fill="none"><rect x="10" y="12" width="28" height="27" rx="1" stroke="currentColor" strokeWidth="2" /><path d="M10 20h28M17 8v9M31 8v9" stroke="currentColor" strokeWidth="2" /><path className="offer-flow-check" d="m17 29 5 5 10-10" stroke="currentColor" strokeWidth="2.5" /></svg>}
            </span>
            <span className="offer-flow-label">{label}</span>
            <span className="offer-flow-pulse" />
          </div>
        ))}
      </div>
      <span className="offer-flow-word" aria-hidden="true">{lang === "no" ? "flyt." : "flow."}</span>
      <span className="offer-art-caption" aria-hidden="true">{lang === "no" ? "Fra henvendelse til avtale." : "From inquiry to booking."}</span>
    </div>
  );
}

export default function ServicesSection() {
  const { lang, p } = useLang();
  const t = T[lang];
  const root = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(paused);
  const syncPlayback = useRef<(() => void) | null>(null);

  useEffect(() => {
    pausedRef.current = paused;
    syncPlayback.current?.();
  }, [paused]);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const panels = Array.from(root.current!.querySelectorAll<HTMLElement>(".offer-art"));
      const timelines = panels.map((panel) => {
        const select = gsap.utils.selector(panel);
        const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.2, defaults: { ease: "power3.inOut" } });
        if (panel.classList.contains("offer-art--identity")) {
          tl.to(select(".offer-echo"), { x: 0, y: 0, rotation: 0, scale: 1, duration: 1.1, stagger: .07 }, .4)
            .fromTo(select(".offer-solid"), { opacity: 0, scale: .93 }, { opacity: 1, scale: 1, duration: .55 }, 1.1)
            .to(select(".offer-solid"), { opacity: 0, duration: .4 }, 3.2)
            .to(select(".offer-echo"), { x: (j) => (j - 2) * 23, y: (j) => (j - 2) * -15, rotation: (j) => (j - 2) * -8, scale: (j) => 1 + j * .09, duration: 1.2, stagger: .04 }, 3.3);
        } else if (panel.classList.contains("offer-art--content")) {
          tl.to(select(".offer-poster--center"), { yPercent: -8, rotation: -5, duration: .8 }, .2)
            .to(select(".offer-poster--left"), { xPercent: -27, rotation: -17, duration: 1 }, .2)
            .to(select(".offer-poster--right"), { xPercent: 25, rotation: 15, duration: 1 }, .32)
            .to(select(".offer-poster--center"), { yPercent: 0, rotation: 2, duration: 1 }, 2.7)
            .to(select(".offer-poster--left, .offer-poster--right"), { xPercent: 0, rotation: (j) => j ? 9 : -9, duration: 1 }, 2.7);
        } else {
          tl.fromTo(select(".offer-flow-line span"), { scaleX: 0 }, { scaleX: 1, duration: .65, stagger: 1.05, ease: "power2.inOut" }, .5)
            .fromTo(select(".offer-flow-pulse"), { scale: .75, opacity: 0 }, { scale: 1.2, opacity: .7, duration: .4, stagger: 1.05 }, .1)
            .to(select(".offer-flow-pulse"), { scale: 1.45, opacity: 0, duration: .6, stagger: 1.05 }, .5)
            .fromTo(select(".offer-flow-check"), { opacity: .15, scale: .6, transformOrigin: "center" }, { opacity: 1, scale: 1, duration: .4, ease: "back.out(1.7)" }, 2.5)
            .to(select(".offer-flow-line span"), { opacity: 0, duration: .4 }, 3.7)
            .set(select(".offer-flow-line span"), { opacity: 1 }, 4.2);
        }
        return tl;
      });
      // Only visible illustrations run. Content never waits for an entrance.
      const visible = new Set<Element>();
      const sync = () => panels.forEach((panel, i) => {
        if (visible.has(panel) && !document.hidden && !pausedRef.current) timelines[i].play();
        else timelines[i].pause();
      });
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target));
        sync();
      }, { threshold: .15 });
      syncPlayback.current = sync;
      panels.forEach(panel => observer.observe(panel));
      document.addEventListener("visibilitychange", sync);
      return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); syncPlayback.current = null; };
    });
    return () => mm.revert();
  }, { scope: root, dependencies: [lang], revertOnUpdate: true });

  return (
    <section id="tilbud" className="offers-studio" ref={root} aria-labelledby="offers-heading">
      <div className="offers-studio-inner">
        <header className="offers-intro">
          <h2 id="offers-heading">{t.heading.map(line => <span key={line}>{line}</span>)}</h2>
          <div className="offers-intro-copy"><p>{t.intro}</p>
            <button type="button" className="offers-motion" onClick={() => setPaused(!paused)} aria-pressed={paused}>
              <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>{paused ? t.play : t.pause}
            </button>
          </div>
        </header>
        <div className="offers-collection">
          {t.offers.map((offer) => (
            <article className={`offer-studio-row offer-studio-row--${offer.art}`} key={offer.art}>
              <div className="offer-copy"><h3>{offer.title}</h3><p className="offer-promise">{offer.line}</p><p className="offer-description">{offer.body}</p>{offer.note && <p className="offer-availability">{offer.note}</p>}</div>
              <OfferArt art={offer.art} lang={lang} />
            </article>
          ))}
        </div>
        <footer className="offers-outro">
          <div><p className="offers-question">{t.question}</p><p className="offers-note">{t.note}</p></div>
          <div className="offers-actions"><Link className="offers-cta" to={p("/klarhetssjekk")}>{t.cta}<Arrow /></Link><Link className="offers-all" to={p("/tjenester")}>{t.all}<Arrow /></Link></div>
        </footer>
      </div>
    </section>
  );
}
