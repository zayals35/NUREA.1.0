import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion, isMobile } from "../lib/motion";

interface Props {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
  width?: number;
  height?: number;
}

/**
 * Film-frame media: a clip-path curtain lifts on enter, then the image
 * drifts in slow inner parallax while scrolling past.
 */
export default function MediaReveal({
  src,
  alt,
  className = "",
  imgClassName = "aspect-[4/3]",
  eager,
  width = 1200,
  height = 900,
}: Props) {
  const frameRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const frame = frameRef.current!;
      const img = frame.querySelector("img")!;
      const mobile = isMobile();

      gsap.fromTo(
        frame,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: mobile ? 0.9 : 1.25,
          ease: "expo.out",
          scrollTrigger: { trigger: frame, start: "top 86%", once: true },
        }
      );
      if (!mobile) {
        gsap.fromTo(
          img,
          { yPercent: -7 },
          {
            yPercent: 7,
            ease: "none",
            scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: 0.4 },
          }
        );
      }
    },
    { scope: frameRef }
  );

  return (
    <div ref={frameRef} className={`media-frame ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        width={width}
        height={height}
        className={`w-full scale-[1.15] object-cover ${imgClassName}`}
      />
    </div>
  );
}
