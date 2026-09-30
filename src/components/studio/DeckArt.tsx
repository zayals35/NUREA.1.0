import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../../lib/motion";

/**
 * The art on the four homepage cards (her revise, 2026-09-30: no plain solid
 * cards, each one different, art that says what the card is about, moving a
 * little). The scroll scrubs in StackCards bring each piece in as its card
 * rises; the resting state below is the finished drawing, so reduced motion
 * and no-JS get the art complete and still. Only transform and opacity move.
 */

/* ---------- syn, citron: the line field opens around the eye ----------
   The «se.» poster's lines, gathered into the blinking eye: everything on the
   card points at being seen. The scroll opens the field from one closed line. */

/** The lines for a pinch point E, in the 500 x 300 viewBox. */
function synLines(ex: number, ey: number) {
  return Array.from({ length: 22 }, (_, k, n = 21) => {
    const f = k / n - 0.5;
    const y0 = 12 + (k / n) * 276;
    const yE = ey + f * 14;
    const yL = ey + f * 70;
    const xL = Math.max(0, ex - 90);
    return `M${xL.toFixed(1)} ${yL.toFixed(1)} C ${(xL + ex) / 2} ${yL.toFixed(1)}, ${ex - 20} ${yE.toFixed(1)}, ${ex} ${yE.toFixed(1)} C ${ex + 100} ${yE.toFixed(1)}, 330 ${y0.toFixed(1)}, 500 ${y0.toFixed(1)}`;
  });
}

/**
 * The pinch sits behind the eye's pupil, wherever the card's layout puts the
 * eye: measured against the drawing, since the art stretches with the card.
 */
export function SynArt() {
  const ref = useRef<SVGSVGElement>(null);
  const [e, setE] = useState({ x: 132, y: 110 });

  useLayoutEffect(() => {
    const svg = ref.current;
    const eye = svg?.parentElement?.querySelector<SVGSVGElement>(".st-deck-eye");
    if (!svg || !eye) return;
    const place = () => {
      const a = svg.getBoundingClientRect();
      const b = eye.getBoundingClientRect();
      if (!a.width || !a.height) return;
      // The eye's own transforms (landing squash, scale of covered cards) are
      // shared with the art, so the ratio inside the card holds.
      const x = ((b.left + b.width / 2 - a.left) / a.width) * 500;
      const y = ((b.top + b.height / 2 - a.top) / a.height) * 300;
      setE((old) => (Math.abs(old.x - x) < 1 && Math.abs(old.y - y) < 1 ? old : { x, y }));
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(svg);
    ro.observe(eye);
    return () => ro.disconnect();
  }, []);

  return (
    <svg ref={ref} className="st-card-art st-art-syn" viewBox="0 0 500 300" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      {/* The scrub scales the middle group about its own 0 0, which the outer groups park on the pinch point. */}
      <g transform={`translate(${e.x.toFixed(1)} ${e.y.toFixed(1)})`}>
        <g className="st-art-open">
          <g transform={`translate(${(-e.x).toFixed(1)} ${(-e.y).toFixed(1)})`}>
            {synLines(e.x, e.y).map((d, i) => (
              <path key={i} d={d} fill="none" stroke="var(--ink)" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
            ))}
          </g>
        </g>
      </g>
    </svg>
  );
}

/* ---------- ai, blue: scattered pixels settle into one pointer ----------
   Many drafts, one direction: the pixels arrive from everywhere and become a
   single cursor, while the loose ones fade back. Pixel art is the identity's
   second material, so this is where it lives. */

const ARROW = [
  "B",
  "BB",
  "BFB",
  "BFFB",
  "BFFFB",
  "BFFFFB",
  "BFFFFFB",
  "BFFFFFFB",
  "BFFFFFFFB",
  "BFFFFFFFFB",
  "BFFFFFFBBBB",
  "BFFFBFFB",
  "BFFBBFFB",
  "BFB  BFFB",
  "BB   BFFB",
  "B     BFFB",
  "      BFFB",
  "       BB",
];
const PX = 13;

/** A fixed, seeded scatter so the prerendered page and the live page agree. */
function seeded(n: number) {
  let s = n * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const ARROW_PX = ARROW.flatMap((row, r) =>
  [...row].flatMap((c, col) => (c === " " ? [] : [{ x: 236 + col * PX, y: 34 + r * PX, fill: c === "B" ? "var(--ink)" : "var(--paper)" }]))
);
const LOOSE_PX = (() => {
  const rnd = seeded(7);
  return Array.from({ length: 34 }, () => ({ x: Math.round((rnd() * 380) / PX) * PX, y: Math.round((rnd() * 270) / PX) * PX, o: 0.18 + rnd() * 0.3 }));
})();

export function AiArt() {
  return (
    <svg className="st-card-art st-art-ai" viewBox="0 0 400 290" preserveAspectRatio="xMaxYMax meet" aria-hidden="true" focusable="false">
      <g className="st-art-loose">
        {LOOSE_PX.map((p, i) => (
          <rect key={i} x={p.x} y={p.y} width={PX - 2} height={PX - 2} fill="var(--paper)" opacity={p.o} />
        ))}
      </g>
      <g className="st-art-idle-diag">
        {ARROW_PX.map((p, i) => (
          <rect key={i} className="st-art-px" x={p.x} y={p.y} width={PX} height={PX} fill={p.fill} />
        ))}
      </g>
    </svg>
  );
}

/* ---------- folk, red: two people meet, and something is shared ----------
   Paper only on the red (ink on red fails, DECISIONS 2026-09-10). They come
   from opposite corners and land shoulder to shoulder; the shared idea opens
   above them. */

export function FolkArt() {
  return (
    <svg className="st-card-art st-art-folk" viewBox="0 0 320 250" preserveAspectRatio="xMaxYMax meet" aria-hidden="true" focusable="false">
      <g className="st-art-idea">
        <circle cx="160" cy="44" r="24" fill="none" stroke="var(--paper)" strokeWidth="5" />
        <circle cx="160" cy="44" r="8" fill="var(--paper)" />
      </g>
      <g className="st-art-a">
        <g className="st-art-bob">
          <circle cx="112" cy="116" r="30" fill="var(--paper)" />
          <path d="M52 250 C 52 172, 172 172, 172 250 Z" fill="var(--paper)" />
        </g>
      </g>
      <g className="st-art-b">
        <g className="st-art-bob st-art-bob-late">
          <circle cx="208" cy="116" r="30" fill="none" stroke="var(--paper)" strokeWidth="5" />
          <path d="M148 250 C 148 172, 268 172, 268 250" fill="none" stroke="var(--paper)" strokeWidth="5" />
        </g>
      </g>
    </svg>
  );
}

/* ---------- create, the hue: every colour, moving in depth ----------
   Her brief: a hue merging all the colours, three-dimensional and moving,
   never only vertical or horizontal. One fragment shader: a warped height
   field lit like glass, its colours drifting along an axis that keeps
   turning, and a flow whose direction circles, so no motion is ever straight
   up or straight across. Luminance is capped where the words sit so paper
   type keeps AA contrast; the glow lives in the empty band between the
   words and the foot. Pauses offscreen; reduced motion gets one still frame. */

const VERT = `attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform vec3 uC0; uniform vec3 uC1; uniform vec3 uC2; uniform vec3 uC3; uniform vec3 uInk;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
// A colour field drifting on a tilted ellipse: never a straight vertical or horizontal path.
float field(vec2 q, float t, float ph, vec2 ax, float r) {
  vec2 c = vec2(cos(t + ph) * ax.x, sin(t * 0.83 + ph) * ax.y);
  c = mat2(0.8, -0.6, 0.6, 0.8) * c;
  vec2 d = q - c;
  return exp(-dot(d, d) / (r * r));
}
void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 q = (uv - 0.5) * vec2(uRes.x / uRes.y, 1.0) * 2.0;
  float t = uTime * 0.16;
  // A slow warp so the fields melt into each other instead of reading as discs.
  q += 0.18 * vec2(noise(q * 1.3 + t), noise(q * 1.3 - t + 4.0)) - 0.09;

  vec3 col = uInk;
  col += uC1 * 1.3 * field(q, t, 0.0, vec2(0.9, 1.1), 0.95);
  col += uC0 * 1.5 * field(q, t, 2.1, vec2(1.0, 0.8), 0.85);
  col += uC3 * 1.1 * field(q, t, 4.0, vec2(0.7, 1.2), 0.8);
  col += uC2 * 0.55 * field(q, t, 5.3, vec2(1.1, 0.9), 0.55);

  // The ribbon: a band of light on a turning axis that twists as it travels,
  // its width following the twist, so it reads as a sheet in depth.
  float a = 0.9 + 0.35 * sin(t * 0.7);
  mat2 R = mat2(cos(a), -sin(a), sin(a), cos(a));
  vec2 p = R * q;
  float curve = 0.55 * sin(p.x * 1.4 + t * 1.3) + 0.18 * sin(p.x * 2.9 - t * 0.9);
  float twist = cos(p.x * 1.1 - t * 1.1);
  float width = 0.05 + 0.2 * abs(twist);
  float d = abs(p.y - curve);
  float sheet = exp(-(d * d) / (width * width));
  float edge = exp(-(d * d) / (width * width * 0.08));
  // The face turned to us glows citron to paper; the back face darkens to blue.
  vec3 face = mix(uC1 * 0.6, mix(uC2, vec3(0.92), 0.35), smoothstep(-0.2, 0.9, twist));
  col = mix(col, face * 1.2, sheet) + edge * smoothstep(0.3, 1.0, twist) * 0.6;

  // Where the words sit, the light is held down; the glow gets the empty band.
  float y = 1.0 - uv.y;
  float band = smoothstep(0.50, 0.64, y) * (1.0 - smoothstep(0.78, 0.86, y));
  float cap = mix(0.11, 0.6, band);
  col = max(col, vec3(0.0));
  float lum = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col *= min(1.0, cap / max(lum, 1e-4));
  gl_FragColor = vec4(col, 1.0);
}
`;

const HEX = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
/** Linearised so the luminance cap in the shader measures what the eye sees. */
const LIN = (h: string) => HEX(h).map((c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));

const FRAG_OUT = FRAG.replace("gl_FragColor = vec4(col, 1.0);", "gl_FragColor = vec4(pow(clamp(col, 0.0, 1.0), vec3(1.0 / 2.2)), 1.0);");

export function HueField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false, powerPreference: "low-power" });
    if (!gl || gl.isContextLost()) return;
    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG_OUT));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const u = (n: string) => gl.getUniformLocation(prog, n);
    const [c0, c1, c2, c3, ink] = ["#8c0608", "#2849a3", "#d8cf55", "#4f783c", "#201d1d"].map(LIN);
    gl.uniform3fv(u("uC0"), c0);
    gl.uniform3fv(u("uC1"), c1);
    gl.uniform3fv(u("uC2"), c2);
    gl.uniform3fv(u("uC3"), c3);
    gl.uniform3fv(u("uInk"), ink);
    const uRes = u("uRes");
    const uTime = u("uTime");

    const still = prefersReducedMotion();
    let raf = 0;
    let visible = false;
    const start = performance.now() - 40000;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };
    const draw = (now: number) => {
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    const loop = (now: number) => {
      draw(now);
      raf = visible ? requestAnimationFrame(loop) : 0;
    };

    const ro = new ResizeObserver(() => {
      resize();
      if (still || !raf) draw(still ? start + 40000 : performance.now());
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!still && visible && !raf) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);
    resize();
    draw(start + 40000);
    canvas.classList.add("is-live");

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      // No loseContext here: a canvas keeps one context for life, and a remount (StrictMode, HMR) would get it back lost.
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
  }, []);

  return <canvas ref={ref} className="st-card-art st-art-hue" aria-hidden="true" />;
}

/* ---------- beside the deck: the lens (replaces the «se.» poster, her ruling 2026-09-30) ----------
   Moving abstract art in its own world: four flat shapes in the four card
   tones, overprinted like riso ink, and one thin ink ring. As the deck
   scrolls, the shape whose card is on top comes forward and the ring
   settles around it, so the art follows what is being read. The resting
   drawing below is the still frame for reduced motion and no-JS; StackCards
   scrubs the poses, studio.css adds the slow idle drift. Transform and
   opacity only. */

export function LensArt() {
  return (
    <svg className="st-lens" viewBox="0 0 400 500" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="st-lens-hue" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--citron)" />
          <stop offset="0.36" stopColor="var(--green)" />
          <stop offset="0.7" stopColor="var(--blue)" />
          <stop offset="1" stopColor="var(--red)" />
        </linearGradient>
      </defs>
      <rect className="st-lens-ground" width="400" height="500" />
      <g className="st-lens-ink">
        <g className="st-lens-part" data-part="sun">
          <g className="st-lens-idle st-lens-idle-sun">
            <circle cx="148" cy="178" r="112" fill="var(--citron)" />
          </g>
        </g>
        <g className="st-lens-part" data-part="sq">
          <g className="st-lens-idle st-lens-idle-sq">
            <rect x="182" y="212" width="168" height="168" fill="var(--blue)" transform="rotate(14 266 296)" />
          </g>
        </g>
        <g className="st-lens-part" data-part="arch">
          <g className="st-lens-idle st-lens-idle-arch">
            <path d="M54 420 A96 96 0 0 1 246 420 Z" fill="var(--red)" />
          </g>
        </g>
        <g className="st-lens-part" data-part="rib">
          <g className="st-lens-idle st-lens-idle-rib">
            <path d="M40 336 C 140 256, 232 420, 360 306" fill="none" stroke="url(#st-lens-hue)" strokeWidth="40" />
          </g>
        </g>
      </g>
      <g className="st-lens-part" data-part="ring">
        <g className="st-lens-idle st-lens-idle-ring">
          <circle cx="300" cy="112" r="58" fill="none" stroke="var(--ink)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </g>
      </g>
      <g className="st-lens-part" data-part="dot">
        <circle cx="92" cy="448" r="8" fill="var(--ink)" />
      </g>
    </svg>
  );
}
