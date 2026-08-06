import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "../lib/motion";
import { useVelocitySkew } from "../lib/useVelocitySkew";
import { sound } from "../lib/sound";
import Button from "./Button";
import Reveal from "./Reveal";
import HalftoneFog from "./HalftoneFog";
import { useLang, type Lang } from "../i18n";

const LINKS: { to: string; label: Record<Lang, string> }[] = [
  { to: "/om-oss", label: { no: "Om", en: "About" } },
  { to: "/arbeider", label: { no: "Arbeider", en: "Work" } },
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
    sub: "En rolig, uforpliktende samtale om hvor du står, og hva som bør bli klarere først.",
    cta: "Få din klarhetssjekk",
    start: "Start et prosjekt",
    about: "Merkevare og digital retning. Trondheim, Norge.",
    orgnr: "Org.nr 937 929 145",
    navLabel: "Bunnmeny",
    promise: "Lettere å forstå. Lettere å velge.",
  },
  en: {
    eyebrow: "Next step",
    heading: "Let's talk.",
    sub: "A calm, no-obligation conversation about where you stand, and what should become clearer first.",
    cta: "Get your clarity check",
    start: "Start a project",
    about: "Brand and digital direction. Trondheim, Norway.",
    orgnr: "Org. no. 937 929 145",
    navLabel: "Footer menu",
    promise: "Easier to understand. Easier to choose.",
  },
};

export default function Footer() {
  const markRef = useRef<HTMLDivElement>(null);
  const { lang, p } = useLang();
  const t = T[lang];

  useVelocitySkew(markRef, 5);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const letters = markRef.current!.querySelectorAll(".ltr");
      gsap.from(letters, {
        yPercent: 60,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.07,
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

  const hoverLetter = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (prefersReducedMotion()) return;
    gsap.fromTo(
      e.currentTarget,
      { yPercent: 0 },
      { yPercent: -8, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1 }
    );
  };

  return (
    <footer className="grain relative overflow-hidden bg-espresso-deep text-cream">
      <HalftoneFog amp={0.45} />
      <div className="relative z-[2] mx-auto max-w-[1440px] px-6 pt-24 md:px-10 md:pt-32">
        {/* CTA moment */}
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-gold">{t.eyebrow}</p>
          <h2 className="display mt-6 text-5xl md:text-7xl">{t.heading}</h2>
          <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-cream/80 md:text-lg">
            {t.sub}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button to={p("/klarhetssjekk")}>{t.cta}</Button>
            <Button to={p("/kontakt")} variant="ghost">
              {t.start}
            </Button>
          </div>
        </Reveal>

        {/* Links + contact */}
        <div className="mt-24 grid gap-12 border-t border-cream/10 pt-12 md:grid-cols-3 md:gap-8">
          <div>
            <p className="eyebrow text-cream/55">NUREA</p>
            <p className="mt-4 max-w-[36ch] text-sm leading-relaxed text-cream/70">
              {t.about}
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-x-8 gap-y-3" aria-label={t.navLabel}>
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={p(l.to)}
                onClick={() => sound.play("click")}
                className="link-line w-fit text-sm text-cream/70 transition-colors hover:text-cream"
              >
                {l.label[lang]}
              </Link>
            ))}
          </nav>
          <div className="md:text-right">
            <a
              href="mailto:hei@nurea.no"
              className="link-line display-sans text-2xl text-cream"
              onClick={() => sound.play("click")}
            >
              hei@nurea.no
            </a>
            <p className="mt-4 text-sm text-cream/65">
              <a
                href="https://www.instagram.com/nurea.no"
                target="_blank"
                rel="noreferrer"
                className="link-line"
              >
                Instagram
              </a>
            </p>
          </div>
        </div>

        {/* Giant wordmark */}
        <div
          ref={markRef}
          className="mt-20 flex select-none justify-center overflow-hidden md:mt-24"
          aria-hidden="true"
        >
          <div className="display flex whitespace-nowrap pr-[0.06em] text-[27vw] leading-[1.02] text-cream/[0.92] md:text-[24vw]">
            {"Nurea".split("").map((c, i) => (
              <span
                key={i}
                className="ltr inline-block cursor-default will-change-transform"
                onMouseEnter={hoverLetter}
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-cream/10 py-6 text-xs text-cream/55">
          <span>© {new Date().getFullYear()} NUREA · {t.orgnr}</span>
          <span>{t.promise}</span>
        </div>
      </div>
    </footer>
  );
}
