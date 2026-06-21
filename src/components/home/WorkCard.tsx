import { useEffect, useState } from "react";
import type { WorkItem } from "@/data/work";

const accent = "#8a5a2f";
const canHover =
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const hideImg = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.style.display = "none";
};

export const WorkCard = ({ item, index, total }: { item: WorkItem; index: number; total: number }) => {
  const [hovered, setHovered] = useState(false);
  const [shot, setShot] = useState(0);
  const shots = item.shots || [];
  const mobile = !canHover;

  // Mobile: auto-cycle the work shots over the blurred cover.
  useEffect(() => {
    if (!mobile || shots.length < 2) return;
    const t = setInterval(() => setShot((s) => (s + 1) % shots.length), 1900);
    return () => clearInterval(t);
  }, [mobile, shots.length]);

  // Desktop: cycle the shots while hovered (if more than one).
  useEffect(() => {
    if (mobile || !hovered || shots.length < 2) return;
    const t = setInterval(() => setShot((s) => (s + 1) % shots.length), 1500);
    return () => clearInterval(t);
  }, [mobile, hovered, shots.length]);

  const hasShots = shots.length > 0;
  // The "shot" layer is always on for mobile; on desktop only while hovered.
  const showShot = mobile ? hasShots : hovered;
  const activeShot = shots[shot % Math.max(shots.length, 1)];
  const counter = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <div style={{ borderBottom: "1px dotted rgba(42,31,22,0.28)", paddingBottom: 32 }}>
      <a
        href={item.href || "#"}
        target={item.href ? "_blank" : undefined}
        rel={item.href ? "noreferrer" : undefined}
        className="group grid items-start gap-5 md:gap-7"
        style={{ gridTemplateColumns: "minmax(0,5fr) minmax(0,6fr)" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* MEDIA */}
        <div
          style={{
            position: "relative",
            aspectRatio: "3 / 2",
            borderRadius: 14,
            overflow: "hidden",
            background: "linear-gradient(135deg, rgba(138,90,47,0.2), rgba(42,31,22,0.14))",
            border: "1px solid rgba(42,31,22,0.1)",
          }}
        >
          {/* Cover (blurred on mobile so the shots read on top) */}
          <img
            src={item.cover}
            alt={item.title}
            loading="lazy"
            onError={hideImg}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: "scale(1.08)",
              filter: mobile && hasShots ? "blur(12px) brightness(0.9)" : "none",
              transition: "filter 0.4s ease, transform 0.6s ease",
            }}
            className={canHover ? "group-hover:scale-[1.12]" : ""}
          />

          {/* Shot layer (the real work) */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              opacity: showShot ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            {hasShots ? (
              <img
                src={activeShot}
                alt=""
                onError={hideImg}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              // No real shots yet: a soft dark scrim + hint (desktop hover only).
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(33,26,18,0.55)",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: 16,
                }}
              >
                <span
                  style={{
                    color: "#f3ecdb",
                    fontFamily: "'Manrope','Inter',sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: "0.04em",
                  }}
                >
                  Se prosjektet →
                </span>
              </div>
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col h-full">
          {/* counter badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: accent }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", border: `1px solid ${accent}` }} />
            <span style={{ width: 16, height: 1, background: accent }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Manrope','Inter',sans-serif" }}>
              {counter}
            </span>
          </div>

          <h3 className="hero-headline" style={{ fontSize: "clamp(20px, 2.4vw, 30px)", marginTop: 14 }}>
            {item.title}
          </h3>
          <p className="hero-body" style={{ marginTop: 8, fontSize: "clamp(14px, 1.4vw, 17px)", maxWidth: "40ch" }}>
            {item.caption}
          </p>

          {item.metric && (
            <div style={{ marginTop: "auto", paddingTop: 22 }}>
              <span
                style={{
                  display: "inline-block",
                  background: "rgba(138,90,47,0.14)",
                  color: "#2a1f16",
                  fontFamily: "'Manrope','Inter',sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                  padding: "6px 12px",
                  borderRadius: 8,
                }}
              >
                {item.metric}
              </span>
              {item.metricLabel && (
                <p className="hero-body" style={{ marginTop: 8, fontSize: 13, opacity: 0.75, maxWidth: "22ch" }}>
                  {item.metricLabel}
                </p>
              )}
            </div>
          )}
        </div>
      </a>
    </div>
  );
};

export default WorkCard;
