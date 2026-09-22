import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import { gsap } from "../../lib/motion";
import { useLang } from "../../i18n";
import HeroArtwork from "./HeroArtwork";
import "./Hero.css";

const T = {
  no: {
    studio: "Et designstudio i Trondheim", lines: ["Lettere", "å forstå.", "Lettere", "å velge."],
    sub: "Nettsider med et eget uttrykk. Systemer som gjør hverdagen enklere.", cta: "Få din klarhetssjekk",
    caption: "Ett N. Mange uttrykk.", hint: "Beveg pekeren. Trykk for å bytte.", touch: "Trykk på N for å bytte uttrykk.",
    styles: ["Typografi", "Skulptur", "Botanisk", "Piksel", "Kollasj", "Materiale"],
    select: "Velg uttrykk", next: "Bytt uttrykk", pause: "Pause avspilling", play: "Spill av", scroll: "Se hva vi gjør",
  },
  en: {
    studio: "A design studio in Trondheim", lines: ["Easier to", "understand.", "Easier", "to choose."],
    sub: "Websites with an identity of their own. Systems that make everyday work easier.", cta: "Get your clarity check",
    caption: "One N. Many expressions.", hint: "Move your pointer. Click to change.", touch: "Tap the N to change its expression.",
    styles: ["Typography", "Sculpture", "Botanical", "Pixel", "Collage", "Material"],
    select: "Choose an expression", next: "Change expression", pause: "Pause playback", play: "Play", scroll: "Explore what we do",
  },
};

export default function Hero() {
  const { lang, p } = useLang();
  const t = T[lang];
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLButtonElement>(null);
  const syncMotion = useRef<(() => void) | null>(null);
  const [active, setActive] = useState(1);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
    syncMotion.current?.();
  }, [paused]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReduced(query.matches);
    query.addEventListener("change", change);
    let inView = true;
    const sync = () => setVisible(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; sync(); }, { threshold: .12 });
    observer.observe(root.current!);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => { query.removeEventListener("change", change); observer.disconnect(); document.removeEventListener("visibilitychange", sync); };
  }, []);

  useEffect(() => {
    if (paused || reduced || hovered || focusWithin || !visible) return;
    const timer = window.setInterval(() => setActive(index => (index + 1) % 6), 5500);
    return () => window.clearInterval(timer);
  }, [paused, reduced, hovered, focusWithin, visible, active]);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const select = gsap.utils.selector(root);
      gsap.from(select(".hero-title-line span"), { yPercent: 105, rotation: 3, duration: .9, stagger: .085, ease: "power4.out", clearProps: "transform" });
      const drift = gsap.to(select(".hero-art-float"), { y: -14, rotation: 2, duration: 3.4, repeat: -1, yoyo: true, ease: "sine.inOut", paused: true });
      let inView = true;
      const sync = () => {
        if (inView && !document.hidden && !pausedRef.current) drift.play();
        else drift.pause();
      };
      syncMotion.current = sync;
      const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; sync(); }, { threshold: .12 });
      observer.observe(root.current!);
      document.addEventListener("visibilitychange", sync);
      sync();
      return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); syncMotion.current = null; };
    });
    mm.add("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)", () => {
      const el = stage.current!;
      const tilt = el.querySelector(".hero-art-tilt");
      const x = gsap.quickTo(tilt, "rotationY", { duration: .8, ease: "power3.out" });
      const y = gsap.quickTo(tilt, "rotationX", { duration: .8, ease: "power3.out" });
      const move = (event: PointerEvent) => {
        const box = el.getBoundingClientRect();
        x(((event.clientX - box.left) / box.width - .5) * 24);
        y(((event.clientY - box.top) / box.height - .5) * -20);
      };
      const reset = () => { x(0); y(0); };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", reset);
      return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", reset); };
    });
    return () => mm.revert();
  }, { scope: root });

  const choose = (index: number) => { setActive(index); setPaused(true); };

  return (
    <section className="hero-studio" ref={root} aria-labelledby="hero-heading" data-expression={active} data-paused={paused || reduced}>
      <div className="hero-studio-inner">
        <p className="hero-studio-label">{t.studio}</p>
        <div className="hero-composition">
          <div className="hero-copy">
            <h1 id="hero-heading" className={`hero-title hero-title--${lang}`}>
              {[0, 2].map(start => <span className="hero-title-pair" key={start}>{t.lines.slice(start, start + 2).map(line => <span className="hero-title-line" key={line}><span>{line}</span></span>)}</span>)}
            </h1>
            <p className="hero-description">{t.sub}</p>
            <Link className="hero-primary" to={p("/klarhetssjekk")}>{t.cta}<span aria-hidden="true">↗</span></Link>
          </div>
          <div className="hero-experiment" onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)} onFocusCapture={() => setFocusWithin(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocusWithin(false); }}>
            <div className="hero-art-note" aria-hidden="true"><span>nurea</span><span>{String(active + 1).padStart(2, "0")} / 06</span></div>
            <button type="button" className="hero-art-stage" ref={stage} onClick={() => choose((active + 1) % 6)} aria-label={`${t.next}. ${t.styles[active]}`}>
              <span className="hero-art-orbit" aria-hidden="true" />
              <span className="hero-art-tilt"><span className="hero-art-float">
                {t.styles.map((_, index) => <span className={`hero-art-layer ${active === index ? "is-active" : ""}`} key={index} aria-hidden="true"><HeroArtwork variant={index} /></span>)}
              </span></span>
              <span className="hero-art-corner" aria-hidden="true">↗</span>
            </button>
            <div className="hero-art-meta"><p>{t.caption}</p><span className="hero-pointer-hint">{t.hint}</span><span className="hero-touch-hint">{t.touch}</span></div>
            <div className="hero-expression-controls" role="group" aria-label={t.select}>
              {t.styles.map((name, index) => <button key={name} type="button" aria-pressed={active === index} onClick={() => choose(index)}><span className="hero-expression-dot" aria-hidden="true" />{name}</button>)}
            </div>
          </div>
        </div>
        <div className="hero-bottom"><a href="#tilbud">{t.scroll}<span aria-hidden="true">↓</span></a><button className="hero-motion-toggle" type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)}><span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>{paused ? t.play : t.pause}</button></div>
      </div>
    </section>
  );
}
