import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion, isMobile } from "../../lib/motion";

/**
 * Pinned section: a giant two-row ribbon of NUREA words driven by scroll,
 * rows moving in opposite directions, with an inline image thumb (Monolog's
 * kinetic typography moment, in NUREA language).
 */
export default function KineticRibbon() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mobile = isMobile();
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: mobile ? "+=120%" : "+=180%",
          scrub: 0.6,
          pin: true,
        },
      });
      tl.fromTo(".row-a", { xPercent: 6 }, { xPercent: -28, ease: "none" }, 0);
      tl.fromTo(".row-b", { xPercent: -30 }, { xPercent: 2, ease: "none" }, 0);
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative flex h-svh flex-col justify-center overflow-hidden bg-parchment-alt text-ink"
    >
      <div className="row-a flex items-center gap-8 whitespace-nowrap will-change-transform md:gap-14">
        <span className="display text-[16vw] leading-[0.95] md:text-[11vw]">VI TETTER</span>
        <img
          src="/work/ribbon.webp"
          alt=""
          loading="lazy"
          width={1200}
          height={800}
          className="h-[10vw] w-[16vw] min-h-16 min-w-24 rounded-full object-cover"
        />
        <span className="display text-[16vw] leading-[0.95] md:text-[11vw]">GAPET</span>
        <span className="display text-[16vw] leading-[0.95] text-accent md:text-[11vw]">
          VI TETTER GAPET
        </span>
      </div>
      <div className="row-b mt-4 flex items-center gap-8 whitespace-nowrap will-change-transform md:mt-8 md:gap-14">
        {["KLARHET", "TILLIT", "RETNING", "KLARHET", "TILLIT", "RETNING"].map((w, i) => (
          <span
            key={i}
            className={`display text-[16vw] leading-[0.95] md:text-[11vw] ${
              i % 3 === 1 ? "text-transparent" : ""
            }`}
            style={i % 3 === 1 ? { WebkitTextStroke: "2px #2a1f16" } : undefined}
          >
            {w}
            <span className="mx-6 inline-block h-[2.2vw] w-[2.2vw] min-h-2 min-w-2 rounded-full bg-accent align-middle md:mx-10" />
          </span>
        ))}
      </div>
    </section>
  );
}
