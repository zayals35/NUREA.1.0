import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "../lib/motion";
import { useVelocitySkew } from "../lib/useVelocitySkew";
import { sound } from "../lib/sound";
import Button from "./Button";
import Reveal from "./Reveal";
import HalftoneFog from "./HalftoneFog";

const LINKS = [
  { to: "/om-oss", label: "Om" },
  { to: "/arbeider", label: "Arbeider" },
  { to: "/demoer", label: "Demoer" },
  { to: "/tjenester", label: "Tjenester" },
  { to: "/metoden", label: "Metoden" },
  { to: "/klarhetssjekk", label: "Klarhetssjekk" },
  { to: "/priser", label: "Priser" },
  { to: "/kontakt", label: "Kontakt" },
  { to: "/personvern", label: "Personvern" },
];

export default function Footer() {
  const markRef = useRef<HTMLDivElement>(null);

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
          <p className="eyebrow text-gold">Neste steg</p>
          <h2 className="display-sans mt-6 text-5xl md:text-7xl">La oss snakke.</h2>
          <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-cream/80 md:text-lg">
            En rolig, uforpliktende samtale om hvor du står, og hva som bør bli
            klarere først.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button to="/klarhetssjekk">Få din klarhetssjekk</Button>
            <Button to="/kontakt" variant="ghost">
              Start et prosjekt
            </Button>
          </div>
        </Reveal>

        {/* Links + contact */}
        <div className="mt-24 grid gap-12 border-t border-cream/10 pt-12 md:grid-cols-3 md:gap-8">
          <div>
            <p className="eyebrow text-cream/55">NUREA</p>
            <p className="mt-4 max-w-[36ch] text-sm leading-relaxed text-cream/70">
              Merkevare og digital retning. Trondheim, Norge.
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-x-8 gap-y-3" aria-label="Bunnmeny">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => sound.play("click")}
                className="link-line w-fit text-sm text-cream/70 transition-colors hover:text-cream"
              >
                {l.label}
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
          <span>© {new Date().getFullYear()} NUREA</span>
          <span>Lettere å forstå. Lettere å velge.</span>
        </div>
      </div>
    </footer>
  );
}
