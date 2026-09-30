import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../lib/motion";

interface Props {
  /** Path without extension, e.g. "/work/gizay/clips/04-language-turn". */
  base: string;
  alt: string;
  className?: string;
  width: number;
  height: number;
}

/**
 * A silent case-study loop: poster first, the sources attached only when the
 * clip comes within a viewport of the reader, playing while in view and
 * paused when it leaves. Reduced motion shows the poster alone. Case work is
 * never a still (her 2026-09-25 rule); this is how it moves.
 */
export default function ClipVideo({ base, alt, className = "", width, height }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setNear(true);
      },
      { rootMargin: "100% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !near) return;
    el.load();
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near]);

  if (reduced) {
    return (
      <img
        src={`${base}-poster.webp`}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className={`block h-full w-full object-cover ${className}`}
      />
    );
  }

  return (
    <video
      ref={ref}
      muted
      playsInline
      loop
      preload="none"
      poster={`${base}-poster.webp`}
      width={width}
      height={height}
      aria-label={alt}
      className={`block h-full w-full object-cover ${className}`}
    >
      {near && (
        <>
          <source src={`${base}.webm`} type="video/webm" />
          <source src={`${base}.mp4`} type="video/mp4" />
        </>
      )}
    </video>
  );
}
