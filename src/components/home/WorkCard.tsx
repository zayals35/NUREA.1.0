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
  const hasShots = shots.length > 0;
  const mobile = !canHover;

  // Mobile: auto-cycle the brand shots over the receded artwork.
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

  // The brand image reveals on hover (desktop) or always (mobile) — only when
  // the project actually has shots. Cards without shots just rest as artwork.
  const reveal = hasShots && (mobile ? true : hovered);
  const activeShot = shots[shot % Math.max(shots.length, 1)];
  const counter = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <div style={{ borderBottom: "1px dotted rgba(42,31,22,0.28)", paddingBottom: 32 }}>
      <a
        href={item.href || undefined}
        target={item.href ? "_blank" : undefined}
        rel={item.href ? "noreferrer" : undefined}
        className="work-card-link group grid items-start gap-5 md:gap-7"
        style={{ gridTemplateColumns: "minmax(0,5fr) minmax(0,6fr)", WebkitTapHighlightColor: "transparent" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* MEDIA: NUREA artwork at rest. On reveal it greys + recedes and the
            real brand work appears framed inside it, cycling. */}
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
          {/* Artwork layer (NUREA-made abstract placeholder) */}
          <img
            src={item.art}
            alt={`${item.title} – NUREA`}
            loading="lazy"
            onError={hideImg}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          {item.grain && <div className="art-grain-overlay" aria-hidden />}

          {/* Framed brand shot (the real work), inset so the artwork still
              shows as a mat around it. */}
          {hasShots && (
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: "9%",
                borderRadius: 8,
                overflow: "hidden",
                boxShadow: "0 18px 40px rgba(20,14,8,0.45)",
                border: "3px solid rgba(247,242,232,0.92)",
                opacity: reveal ? 1 : 0,
                transform: reveal ? "scale(1)" : "scale(0.92)",
                transition: "opacity 0.45s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              {shots.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  onError={hideImg}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: i === shot % shots.length ? 1 : 0,
                    transition: "opacity 0.6s ease",
                  }}
                />
              ))}
            </div>
          )}
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

          <p style={{
            fontFamily: "'Manrope','Inter',sans-serif",
            fontSize: "clamp(11px, 1vw, 13px)",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: accent,
            marginTop: 14,
            opacity: 0.85,
          }}>
            {item.title}
          </p>
          <h3 className="hero-headline" style={{ fontSize: "clamp(24px, 3vw, 38px)", marginTop: 4, lineHeight: 1.05 }}>
            {item.company}
          </h3>
          <p className="hero-body" style={{ marginTop: 8, fontSize: "clamp(14px, 1.4vw, 17px)", maxWidth: "40ch" }}>
            {item.caption}
          </p>

          {(item.tags?.length || item.metricLabel || item.href) && (
            <div style={{ marginTop: "auto", paddingTop: 22 }}>
              {item.tags && item.tags.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
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
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {item.metricLabel && (
                <p className="hero-body" style={{ marginTop: 8, fontSize: 13, opacity: 0.75, maxWidth: "22ch" }}>
                  {item.metricLabel}
                </p>
              )}
              {item.href && (
                <span
                  style={{
                    display: "inline-block",
                    marginTop: 10,
                    fontFamily: "'Manrope','Inter',sans-serif",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#8a5a2f",
                    letterSpacing: "0.03em",
                    opacity: 0.8,
                  }}
                >
                  {item.href.replace("https://www.", "").replace("https://", "")} ↗
                </span>
              )}
            </div>
          )}
        </div>
      </a>
    </div>
  );
};

export default WorkCard;
