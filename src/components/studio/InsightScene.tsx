import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/motion";

/** The Insights drawing: wide master on desktop, the portrait arrangement of the same cast on phones. */
export const INSIGHT_ART = {
  wide: { src: "/brand/art/innsikt-wide.webp", width: 2016, height: 1140 },
  tall: { src: "/brand/art/innsikt-tall.webp", width: 1200, height: 1500 },
} as const;

interface Props {
  /** h1 on the Insights index, h2 on the homepage scene. */
  as: "h1" | "h2";
  id?: string;
  title: string;
  lead: string;
  text?: string;
  soon?: string;
  alt: string;
  children?: ReactNode;
}

/**
 * The illustrated Insights scene: an oversized title, the drawing at about
 * half the scene, a short introduction and the action. Art, scale and paper
 * carry it; no rule, no label. The drawing arrives once, settling onto its
 * floor line, and only under a motion preference. The image is multiplied
 * onto the paper so the drawing sits on the page instead of in a rectangle.
 */
export default function InsightScene({ as: Title, id, title, lead, text, soon, alt, children }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const art = root.current!.querySelector(".st-insight-art")!;
        gsap.from(art, {
          y: 44,
          autoAlpha: 0,
          rotate: -1.6,
          transformOrigin: "50% 100%",
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: art, start: "top 88%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root, revertOnUpdate: true }
  );

  return (
    <div className="st-insight-scene" ref={root}>
      <Title id={id} className="st-insight-title">
        {title}
      </Title>
      <picture className="st-insight-art">
        <source media="(max-width: 899px)" srcSet={INSIGHT_ART.tall.src} width={INSIGHT_ART.tall.width} height={INSIGHT_ART.tall.height} />
        <img src={INSIGHT_ART.wide.src} width={INSIGHT_ART.wide.width} height={INSIGHT_ART.wide.height} alt={alt} loading="lazy" decoding="async" />
      </picture>
      <div className="st-insight-copy" data-rv>
        <p className="st-lead st-voice">{lead}</p>
        {text && <p>{text}</p>}
        {soon && <span className="st-soon">{soon}</span>}
        {children}
      </div>
    </div>
  );
}
