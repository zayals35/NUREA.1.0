import { useEffect, useRef, useState } from "react";
import { useLang } from "../../i18n";
import { STUDIO } from "../../data/studioSite";

const reducedQuery = () =>
  typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;

interface Props {
  /** Clip stem, e.g. /work/bilmekka/clips/01-plate-funnel (adds .mp4 and -poster.webp). */
  clip: string;
  className?: string;
  label?: string;
}

/**
 * A real site recording, poster first: muted, looped, inline. Plays when at
 * least 35% is in view, pauses below that, keeps a manual pause, never
 * autoplays under reduced motion (manual play stays possible) and pauses if
 * reduced motion is switched on while it runs. Moved from the approved-site
 * folder on 2026-09-29 with the same behaviour; labels come from the studio copy.
 */
export default function CaseVideo({ clip, className, label }: Props) {
  const { lang } = useLang();
  const t = STUDIO[lang].video;
  const ref = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    const mq = reducedQuery();
    let ownPause = false;
    let ownPlay = false;
    const autoPause = () => {
      if (v.paused) return;
      ownPause = true;
      v.pause();
    };
    const autoPlay = () => {
      if (!v.paused) return;
      ownPlay = true;
      v.play().catch(() => {
        ownPlay = false;
      });
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || e.intersectionRatio < 0.35) autoPause();
        else if (!mq?.matches && !userPaused.current) autoPlay();
      },
      { threshold: [0, 0.35] }
    );
    io.observe(v);
    const onMotion = () => {
      if (mq?.matches) autoPause();
    };
    mq?.addEventListener("change", onMotion);
    const onPlay = () => {
      if (ownPlay) ownPlay = false;
      else userPaused.current = false;
      setPlaying(true);
    };
    const onPause = () => {
      if (ownPause) ownPause = false;
      else userPaused.current = true;
      setPlaying(false);
    };
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    return () => {
      io.disconnect();
      mq?.removeEventListener("change", onMotion);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.pause();
    };
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  return (
    <>
      <video
        ref={ref}
        className={className}
        muted
        loop
        playsInline
        preload="metadata"
        poster={`${clip}-poster.webp`}
        aria-label={label ?? t.label}
      >
        <source src={`${clip}.webm`} type="video/webm" />
        <source src={`${clip}.mp4`} type="video/mp4" />
      </video>
      <button className="st-play" type="button" onClick={toggle} aria-pressed={playing}>
        {playing ? t.pause : t.play}
      </button>
    </>
  );
}
