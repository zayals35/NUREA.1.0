import { useEffect, useId, useMemo, useState } from "react";
import { SYMBOL_PATH } from "./NureaLogo";
import "./NureaMarkStyles.css";

/**
 * The final N drawn in six genuinely different illustration languages.
 * Every drawing starts from the same SYMBOL_PATH geometry; nothing is redrawn
 * by hand, downloaded or generated. Used as the live mark in the nav.
 */

export const MARK_STYLES = ["pixel", "cartoon", "sketch", "linocut", "sticker", "halftone"] as const;
export type MarkStyle = (typeof MARK_STYLES)[number];

export const MARK_STYLE_LABELS: Record<"no" | "en", Record<MarkStyle, string>> = {
  no: { pixel: "Pikselkunst", cartoon: "Tegneserie", sketch: "Blyantskisse", linocut: "Linosnitt", sticker: "Klistremerke", halftone: "Rasterpunkt" },
  en: { pixel: "Pixel art", cartoon: "Cartoon", sketch: "Pencil sketch", linocut: "Linocut", sticker: "Sticker", halftone: "Halftone" },
};

// The symbol path sits in a 512 box after this transform (same as NureaSymbol).
const TX = 96.04;
const TY = 76;
const SC = 0.7860262008733624;
const G = `translate(${TX} ${TY}) scale(${SC})`;

const CITRON = "#d8cf55";
const CITRON_DEEP = "#b9b13a";
const PAPER = "#f5f4f0";
const RED = "#8c0608";

/* ---------- pixel grid, sampled once from the real path ---------- */

const CELL = 26;
const COLS = Math.ceil(512 / CELL);
type Cell = { c: number; r: number };
let pixelCache: Cell[] | null = null;

function pixelCells(): Cell[] {
  if (pixelCache) return pixelCache;
  if (typeof document === "undefined") return [];
  const ctx = document.createElement("canvas").getContext("2d");
  if (!ctx) return [];
  const path = new Path2D(SYMBOL_PATH);
  ctx.setTransform(SC, 0, 0, SC, TX, TY);
  const cells: Cell[] = [];
  for (let r = 0; r < COLS; r++) {
    for (let c = 0; c < COLS; c++) {
      let hits = 0;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (ctx.isPointInPath(path, c * CELL + (i + 0.5) * (CELL / 3), r * CELL + (j + 0.5) * (CELL / 3))) hits++;
        }
      }
      if (hits >= 5) cells.push({ c, r });
    }
  }
  pixelCache = cells;
  return cells;
}

function Pixel() {
  const cells = useMemo(pixelCells, []);
  const on = useMemo(() => new Set(cells.map((k) => `${k.c},${k.r}`)), [cells]);
  return (
    <g shapeRendering="crispEdges">
      {cells.map((k) => {
        const lit = !on.has(`${k.c},${k.r - 1}`) && on.has(`${k.c},${k.r + 1}`);
        return <rect key={`${k.c}-${k.r}`} x={k.c * CELL} y={k.r * CELL} width={CELL} height={CELL} fill={lit ? CITRON : "currentColor"} />;
      })}
    </g>
  );
}

/* ---------- cartoon: thick outline, flat fill, cel shadow, one highlight ---------- */

function Cartoon({ id }: { id: string }) {
  return (
    <g transform={G}>
      <clipPath id={`${id}-cc`}><path d={SYMBOL_PATH} /></clipPath>
      <path d={SYMBOL_PATH} fill={CITRON} stroke="currentColor" strokeWidth="44" strokeLinejoin="round" paintOrder="stroke" />
      <g clipPath={`url(#${id}-cc)`}>
        <path d={SYMBOL_PATH} fill={CITRON_DEEP} />
        <path d={SYMBOL_PATH} fill={CITRON} transform="translate(-22 -26)" />
        <ellipse cx="46" cy="60" rx="18" ry="30" fill={PAPER} transform="rotate(-28 46 60)" />
        <ellipse cx="372" cy="176" rx="11" ry="20" fill={PAPER} transform="rotate(-28 372 176)" />
      </g>
    </g>
  );
}

/* ---------- sketch: wobbly pencil passes and hatching, no fill ---------- */

function Sketch({ id }: { id: string }) {
  const hatch = Array.from({ length: 26 }, (_, i) => i * 24 - 220);
  return (
    <g transform={G}>
      <filter id={`${id}-sk`} x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="3" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="9" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <clipPath id={`${id}-sc`}><path d={SYMBOL_PATH} /></clipPath>
      <g filter={`url(#${id}-sk)`} stroke="currentColor" fill="none" strokeLinecap="round">
        <g clipPath={`url(#${id}-sc)`} strokeWidth="4" opacity=".55">
          {hatch.map((x) => <line key={x} x1={x} y1="0" x2={x + 470} y2="470" />)}
        </g>
        <path d={SYMBOL_PATH} strokeWidth="9" opacity=".9" />
        <path d={SYMBOL_PATH} strokeWidth="5" opacity=".7" transform="translate(6 -5) rotate(1 200 230)" />
        <path d={SYMBOL_PATH} strokeWidth="4" opacity=".5" transform="translate(-5 6) rotate(-1.4 200 230)" />
      </g>
    </g>
  );
}

/* ---------- linocut: solid ink with carved gouges and a rough edge ---------- */

function Linocut({ id }: { id: string }) {
  const gouges = [
    [30, 300, 60, 120], [52, 330, 96, 150], [16, 200, 40, 80], [120, 100, 160, 30], [200, 240, 250, 160],
    [222, 300, 280, 200], [250, 400, 320, 300], [300, 420, 350, 330], [350, 300, 388, 180], [372, 380, 400, 250],
    [80, 60, 150, 20], [200, 150, 230, 90], [330, 200, 360, 140],
  ];
  return (
    <g transform={G}>
      <filter id={`${id}-lf`} x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency=".06" numOctaves="3" seed="11" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="7" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <mask id={`${id}-lm`} maskUnits="userSpaceOnUse" x="-50" y="-50" width="520" height="560">
        <path d={SYMBOL_PATH} fill="white" />
        <g stroke="black" strokeLinecap="round" fill="none">
          {gouges.map(([x1, y1, x2, y2], i) => (
            <g key={i}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={13 - (i % 4) * 2} />
              <line x1={x1} y1={y1} x2={(x1 + x2) / 2} y2={(y1 + y2) / 2} strokeWidth={18 - (i % 4) * 2} />
            </g>
          ))}
        </g>
      </mask>
      <g filter={`url(#${id}-lf)`}>
        <rect x="-30" y="-30" width="480" height="520" fill="currentColor" mask={`url(#${id}-lm)`} />
      </g>
    </g>
  );
}

/* ---------- sticker: flat red, thick paper border, soft rim, a tilt ---------- */

function Sticker() {
  return (
    <g transform="rotate(-9 256 256)">
      <g transform={G}>
        <path d={SYMBOL_PATH} fill="none" stroke="rgba(23,21,21,.28)" strokeWidth="64" strokeLinejoin="round" transform="translate(8 12)" />
        <path d={SYMBOL_PATH} fill={RED} stroke={PAPER} strokeWidth="52" strokeLinejoin="round" paintOrder="stroke" />
      </g>
    </g>
  );
}

/* ---------- halftone: the fog's dot grid, sized by a diagonal light ---------- */

function Halftone({ id }: { id: string }) {
  const step = 24;
  const dots: { x: number; y: number; r: number }[] = [];
  for (let y = step / 2; y < 512; y += step) {
    for (let x = step / 2; x < 512; x += step) {
      const light = (x * 0.7 + y * 1.1) / (512 * 1.8);
      const r = 2.4 + (1 - light) * 9.6;
      dots.push({ x, y, r });
    }
  }
  return (
    <g>
      <clipPath id={`${id}-hc`}><path d={SYMBOL_PATH} transform={G} /></clipPath>
      <g clipPath={`url(#${id}-hc)`} fill="currentColor">
        {dots.map((d) => <circle key={`${d.x}-${d.y}`} cx={d.x} cy={d.y} r={d.r} />)}
      </g>
    </g>
  );
}

/* ---------- one style ---------- */

export function NureaMarkStyle({ style, className = "" }: { style: MarkStyle; className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 512 512" fill="none" className={className} aria-hidden="true" focusable="false" overflow="visible">
      {style === "pixel" && <Pixel />}
      {style === "cartoon" && <Cartoon id={id} />}
      {style === "sketch" && <Sketch id={id} />}
      {style === "linocut" && <Linocut id={id} />}
      {style === "sticker" && <Sticker />}
      {style === "halftone" && <Halftone id={id} />}
    </svg>
  );
}

/* ---------- the live mark: cycles through the styles on its own ---------- */

const INTERVAL = 4200;

export function NureaLiveMark({ className = "", lang = "no" }: { className?: string; lang?: "no" | "en" }) {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const [reduced, setReduced] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  // Follows a reduced-motion change during the visit: the mark stops on the first style.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => {
      setReduced(mq.matches);
      if (mq.matches) setActive(0);
    };
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    if (reduced || held) return;
    let timer = 0;
    const tick = () => setActive((i) => (i + 1) % MARK_STYLES.length);
    const sync = () => {
      window.clearInterval(timer);
      if (!document.hidden) timer = window.setInterval(tick, INTERVAL);
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => { window.clearInterval(timer); document.removeEventListener("visibilitychange", sync); };
  }, [reduced, held]);

  return (
    <span
      className={`nurea-live-mark ${className}`}
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      title={MARK_STYLE_LABELS[lang][MARK_STYLES[active]]}
    >
      {MARK_STYLES.map((style, index) => (
        <span key={style} className={`nurea-live-mark-layer ${index === active ? "is-active" : ""}`}>
          <NureaMarkStyle style={style} />
        </span>
      ))}
    </span>
  );
}
