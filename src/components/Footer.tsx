import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "../lib/motion";
import { sound } from "../lib/sound";
import Button from "./Button";
import Reveal from "./Reveal";
import { NureaWordmark } from "./brand/NureaLogo";
import { useLang, type Lang } from "../i18n";

const LINKS: { to: string; label: Record<Lang, string> }[] = [
  { to: "/om-oss", label: { no: "Om", en: "About" } },
  { to: "/arbeider", label: { no: "Arbeider", en: "Work" } },
  { to: "/demoer", label: { no: "Demoer", en: "Demos" } },
  { to: "/tjenester", label: { no: "Tjenester", en: "Services" } },
  { to: "/metoden", label: { no: "Metoden", en: "Method" } },
  { to: "/klarhetssjekk", label: { no: "Klarhetssjekk", en: "Clarity check" } },
  { to: "/priser", label: { no: "Priser", en: "Pricing" } },
  { to: "/kontakt", label: { no: "Kontakt", en: "Contact" } },
  { to: "/personvern", label: { no: "Personvern", en: "Privacy" } },
];

const T: Record<Lang, {
  eyebrow: string;
  heading: string;
  sub: string;
  cta: string;
  start: string;
  about: string;
  orgnr: string;
  navLabel: string;
  promise: string;
}> = {
  no: {
    eyebrow: "Neste steg",
    heading: "La oss snakke.",
    sub: "En uforpliktende samtale om hvor du står, og hva som bør bli klarere først.",
    cta: "Få din klarhetssjekk",
    start: "Start et prosjekt",
    about: "Identitet. Nettside. Innhold. Trondheim, Norge.",
    orgnr: "Org.nr 937 929 145",
    navLabel: "Bunnmeny",
    promise: "Lettere å forstå. Lettere å velge.",
  },
  en: {
    eyebrow: "Next step",
    heading: "Let's talk.",
    sub: "A no-obligation conversation about where you stand, and what should become clearer first.",
    cta: "Get your clarity check",
    start: "Start a project",
    about: "Identity. Website. Content. Trondheim, Norway.",
    orgnr: "Org. no. 937 929 145",
    navLabel: "Footer menu",
    promise: "Easier to understand. Easier to choose.",
  },
};

/** The full stop: ink block, paper type, the wordmark filling the width. */
export default function Footer() {
  const markRef = useRef<HTMLDivElement>(null);
  const { lang, p } = useLang();
  const t = T[lang];

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mark = markRef.current!.querySelector("svg");
      if (!mark) return;
      gsap.from(mark, {
        yPercent: 60,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: {
          trigger: markRef.current,
          start: "top 92%",
          once: true,
          onEnter: () => sound.play("enter"),
        },
      });
    },
    { scope: markRef }
  );

  return (
    <footer className="relative overflow-hidden bg-ink text-parchment">
      <div className="mx-auto max-w-[1440px] px-5 pt-20 md:px-10 md:pt-32">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-gold">{t.eyebrow}</p>
          <h2 className="poster mt-6 text-[clamp(3rem,10vw,8rem)]">{t.heading}</h2>
          <p className="voice mt-6 max-w-[34ch] text-xl text-parchment/85 md:text-3xl">{t.sub}</p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button to={p("/klarhetssjekk")}>{t.cta}</Button>
            <Button to={p("/kontakt")} variant="ghost">
              {t.start}
            </Button>
          </div>
        </Reveal>

        <div className="mt-20 grid gap-12 border-t border-parchment/20 pt-12 md:grid-cols-3 md:gap-8">
          <div>
            <p className="voice text-xl">nurea</p>
            <p className="mt-3 max-w-[36ch] text-sm leading-relaxed text-parchment/70">{t.about}</p>
          </div>
          <nav className="grid grid-cols-2 gap-x-8 gap-y-3" aria-label={t.navLabel}>
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={p(l.to)}
                onClick={() => sound.play("click")}
                className="link-line w-fit text-sm text-parchment/70 transition-colors hover:text-parchment"
              >
                {l.label[lang]}
              </Link>
            ))}
          </nav>
          <div className="md:text-right">
            <a
              href="mailto:hei@nurea.no"
              className="link-line display-sans text-2xl text-parchment"
              onClick={() => sound.play("click")}
            >
              hei@nurea.no
            </a>
            <p className="mt-4 text-sm text-parchment/65">
              <a href="https://www.instagram.com/nurea.no" target="_blank" rel="noreferrer" className="link-line">
                Instagram
              </a>
            </p>
          </div>
        </div>

        <div ref={markRef} className="mt-16 flex select-none justify-start overflow-hidden md:mt-24" aria-hidden="true">
          <NureaWordmark className="w-full max-w-[1360px] text-parchment" aria-hidden="true" />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-parchment/20 py-6 text-xs text-parchment/60">
          <span>© {new Date().getFullYear()} NUREA · {t.orgnr}</span>
          <span>{t.promise}</span>
        </div>
      </div>
    </footer>
  );
}
