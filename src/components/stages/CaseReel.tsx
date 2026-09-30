import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/motion";
import ClipVideo from "../ClipVideo";
import Reveal from "../Reveal";
import { sound } from "../../lib/sound";
import { useLang, type Lang } from "../../i18n";

interface Case {
  id: string;
  kicker: Record<Lang, string>;
  name: string;
  delivered: string;
  href: string;
  desktop: string;
  phone: string;
}

/** Live client sites. Møre Marin is out until it is rebuilt to the standard (her ruling 2026-09-25). */
const CASES: Case[] = [
  {
    id: "bilmekka",
    kicker: { no: "Bilforhandler, Trondheim", en: "Car dealership, Trondheim" },
    name: "Bilmekka",
    delivered: "Logo · Nettside · E-post · Systemer",
    href: "https://www.bilmekka.no",
    desktop: "/work/bilmekka/clips/04-steps-reveal",
    phone: "/work/bilmekka/clips/05-phone-scroll",
  },
  {
    id: "gizay",
    kicker: { no: "Tekstilmerke med egyptisk opphav", en: "Textile brand with Egyptian roots" },
    name: "GIZAY",
    delivered: "Merkevare · Web · Landing page",
    href: "https://gizay.no",
    desktop: "/work/gizay/clips/01-hero-arrival",
    phone: "/work/gizay/clips/06-phone-pass",
  },
];

const T: Record<Lang, { eyebrow: string; heading: string; site: string; all: string; desk: string; phone: string }> = {
  no: {
    eyebrow: "Sett i arbeid",
    heading: "Sider som selger mens du jobber.",
    site: "Se siden",
    all: "Alle arbeider",
    desk: "på desktop",
    phone: "på mobil",
  },
  en: {
    eyebrow: "In the field",
    heading: "Sites that sell while you work.",
    site: "See the site",
    all: "All work",
    desk: "on desktop",
    phone: "on a phone",
  },
};

function Frames({ c, t }: { c: Case; t: (typeof T)["no"] }) {
  return (
    <div className="relative pb-[9%] pr-[6%]">
      <div className="aspect-[16/9] w-full overflow-hidden bg-espresso-deep">
        <ClipVideo base={c.desktop} alt={`${c.name} ${t.desk}`} width={1920} height={1080} />
      </div>
      <div className="absolute bottom-0 right-0 w-[26%] overflow-hidden bg-espresso-deep shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
        <div className="aspect-[810/1752] w-full">
          <ClipVideo base={c.phone} alt={`${c.name} ${t.phone}`} width={810} height={1752} />
        </div>
      </div>
    </div>
  );
}

function Copy({ c, t, i, lang, p }: { c: Case; t: (typeof T)["no"]; i: number; lang: Lang; p: (s: string) => string }) {
  return (
    <div>
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-parchment/70 sm:text-xs">
        {String(i + 1).padStart(2, "0")} · {c.kicker[lang]}
      </p>
      <h3 className="poster mt-4 text-[clamp(2.6rem,10vw,4rem)] md:text-[clamp(3rem,5vw,5.2rem)]">{c.name}</h3>
      <p className="mono mt-4 text-[11px] tracking-[0.14em] text-parchment/70">{c.delivered}</p>
      <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
        <a
          href={c.href}
          target="_blank"
          rel="noreferrer"
          onClick={() => sound.play("click")}
          className="link-line font-mono text-[15px] font-medium text-parchment"
        >
          {t.site}
        </a>
        <Link
          to={p("/arbeider")}
          onClick={() => sound.play("click")}
          className="link-line font-mono text-[15px] font-medium text-parchment/80"
        >
          {t.all}
        </Link>
      </div>
    </div>
  );
}

/**
 * The case reel, routes r2: the page pins on ink and the scroll carries one
 * live site at a time through the frame, desktop and phone playing together,
 * the phone over the desktop's corner. On phones the cases stack.
 */
export default function CaseReel() {
  const root = useRef<HTMLElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const { lang, p } = useLang();
  const t = T[lang];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const slides = gsap.utils.toArray<HTMLElement>(".reel-slide", root.current!);
        const ticks = gsap.utils.toArray<HTMLElement>(".reel-tick", root.current!);
        gsap.set(slides.slice(1), { autoAlpha: 0, yPercent: 8 });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            pin: true,
            scrub: 0.5,
            start: "top top",
            end: () => "+=" + window.innerHeight * slides.length,
            onUpdate: (self) => {
              const i = Math.min(slides.length - 1, Math.floor(self.progress * slides.length));
              if (counter.current) counter.current.textContent = String(i + 1).padStart(2, "0");
              ticks.forEach((tick, k) => tick.classList.toggle("bg-parchment", k === i));
              ticks.forEach((tick, k) => tick.classList.toggle("bg-parchment/30", k !== i));
            },
          },
        });
        tl.to({}, { duration: 0.6 });
        slides.slice(1).forEach((slide, k) => {
          tl.to(slides[k], { autoAlpha: 0, yPercent: -8, duration: 1, ease: "power2.inOut" })
            .to(slide, { autoAlpha: 1, yPercent: 0, duration: 1, ease: "power2.out" }, "<0.35")
            .to({}, { duration: 0.6 });
        });
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [lang], revertOnUpdate: true }
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-ink text-parchment motion-safe:md:h-svh">
      <div className="mx-auto max-w-[1440px] px-5 pt-16 md:px-10 md:pt-24">
        <Reveal>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-parchment/70 sm:text-xs">{t.eyebrow}</p>
          <h2 className="display-sans mt-4 max-w-[18ch] text-3xl md:text-5xl">{t.heading}</h2>
        </Reveal>
      </div>

      {/* Desktop: the slides stacked in one frame, the scroll swaps them. */}
      <div className="relative mx-auto hidden max-w-[1440px] px-10 motion-safe:md:block md:h-[calc(100svh-13rem)]">
        {CASES.map((c, i) => (
          <div
            key={c.id}
            className="reel-slide absolute inset-x-10 inset-y-0 grid grid-cols-[0.8fr_1.2fr] items-center gap-16 pb-16"
          >
            <Copy c={c} t={t} i={i} lang={lang} p={p} />
            <Frames c={c} t={t} />
          </div>
        ))}
        <div aria-hidden="true" className="pointer-events-none absolute bottom-8 left-10 flex items-center gap-4">
          <span className="font-mono text-xs font-medium tracking-[0.2em] text-parchment">
            <span ref={counter}>01</span> / {String(CASES.length).padStart(2, "0")}
          </span>
          <span className="flex items-center gap-2">
            {CASES.map((c, k) => (
              <span key={c.id} className={`reel-tick block h-px w-8 transition-colors duration-300 ${k === 0 ? "bg-parchment" : "bg-parchment/30"}`} />
            ))}
          </span>
        </div>
      </div>

      {/* Phones: the cases stacked, each playing as it arrives. */}
      <div className="mx-auto max-w-[1440px] px-5 pb-16 md:px-10 md:pb-24 motion-safe:md:hidden">
        {CASES.map((c, i) => (
          <Reveal key={c.id} className="mt-14">
            <Frames c={c} t={t} />
            <div className="mt-6">
              <Copy c={c} t={t} i={i} lang={lang} p={p} />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
