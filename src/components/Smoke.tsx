import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../lib/motion";

/**
 * Animated background: four plumes of coloured smoke (red, citron, green,
 * blue, the NUREA identity colours) rising through the section's paper.
 * Rendered opaque and multiplied over the paper like translucent pigment, so
 * the tint never goes past `uMax` and ink type stays readable on any patch.
 * No clearing, no bands: the same density everywhere (r4, her 2026-09-23
 * revise). The smoke is always moving and also answers the scroll: scrolling
 * down pushes it upward and stirs it (r5, her 2026-09-23 revise). A fine dot
 * net sits over it at low opacity, see-through, even everywhere.
 * One full-screen quad + fragment shader; pauses offscreen; reduced motion
 * gets a static frame and ignores the scroll.
 */

const VERT = `attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform float uScroll;
uniform vec3 uC0;
uniform vec3 uC1;
uniform vec3 uC2;
uniform vec3 uC3;
uniform float uAmp;
uniform float uMax;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.07 + vec2(1.3, 7.1); a *= 0.5; }
  return v;
}
// One plume: a soft body broken up by finer wisps so the edges tear like smoke.
float plume(vec2 p, vec2 q, vec2 seed, float t) {
  float body = fbm(p * 0.85 + seed);
  float d = smoothstep(0.40, 0.74, body);
  float wisp = fbm(q * 3.2 + seed * 1.7 + vec2(0.0, -t * 1.4));
  return d * (0.5 + 0.7 * wisp);
}
void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 q = vec2(uv.x * uRes.x / uRes.y, uv.y);
  // The scroll adds to the clock: scrolling down lifts and stirs the smoke.
  float t = uTime * 0.11 + uScroll * 0.45;
  // Smoke rises: sampling the field further down each frame lifts the pattern.
  vec2 rise = vec2(0.0, -t * 0.9);
  // Two levels of domain warping give the curling tendrils.
  vec2 w1 = vec2(fbm(q * 1.3 + rise), fbm(q * 1.3 + rise + vec2(5.2, 1.3)));
  vec2 w2 = vec2(fbm(q * 1.3 + 1.6 * w1 + vec2(1.7, 9.2) + t * 0.35),
                 fbm(q * 1.3 + 1.6 * w1 + vec2(8.3, 2.8) - t * 0.25));
  vec2 p = q + 1.9 * w2 + rise * 0.6;
  float d0 = plume(p, q, vec2(0.0, 0.0), t);
  float d1 = plume(p, q, vec2(3.1, 4.7), t);
  float d2 = plume(p, q, vec2(7.9, 1.4), t);
  float d3 = plume(p, q, vec2(2.4, 8.6), t);
  // The strongest plume owns the pixel (a soft max), so colours stay pure
  // where they meet instead of averaging into brown. Density is capped.
  vec4 w = pow(vec4(d0, d1, d2, d3), vec4(4.0));
  float s = w.x + w.y + w.z + w.w;
  float peak = max(max(d0, d1), max(d2, d3));
  float dens = min(peak * 1.7, 1.0) * uMax * uAmp;
  vec3 absorb = (w.x * (1.0 - uC0) + w.y * (1.0 - uC1) + w.z * (1.0 - uC2) + w.w * (1.0 - uC3)) / max(s, 1e-6);
  vec3 tint = 1.0 - dens * absorb;
  gl_FragColor = vec4(tint, 1.0);
}`;

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

/** The four NUREA identity colours, approved 2026-09-11: red, citron, green, blue. */
const SMOKE_COLORS: readonly [string, string, string, string] = ["#8c0608", "#d8cf55", "#4f783c", "#2849a3"];

/**
 * Ceiling on how much of a colour can sit on the paper at once. At 0.55 the
 * densest pure red patch on parchment still gives ink text a 4.5:1 contrast
 * (checked 2026-09-23); citron, green and blue all land higher.
 */
const MAX_DENSITY = 0.55;

/** Dot pitch of the net laid over the smoke, in CSS pixels. */
const NET_PITCH_PX = 5;

interface Props {
  className?: string;
  /** Overall intensity 0..1 (scales the density ceiling). */
  amp?: number;
  /** Four plume colours. */
  colors?: readonly [string, string, string, string];
  /** Opacity of the dot net over the smoke, 0..1. 0 removes it. */
  net?: number;
}

const FALLBACK_SPANS = [
  { width: "55vw", height: "55vw", left: "-12%", top: "-18%", animation: "drift-a 26s ease-in-out infinite alternate" },
  { width: "44vw", height: "44vw", right: "-10%", top: "12%", animation: "drift-b 32s ease-in-out infinite alternate" },
  { width: "60vw", height: "60vw", left: "18%", bottom: "-35%", animation: "drift-c 38s ease-in-out infinite alternate" },
  { width: "40vw", height: "40vw", left: "30%", top: "-8%", animation: "drift-b 29s ease-in-out infinite alternate-reverse" },
] as const;

export default function Smoke({ className = "", amp = 1, colors = SMOKE_COLORS, net = 0.32 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // No WebGL (hardware acceleration off, blocklisted GPU, context lost):
  // swap to an animated CSS gradient in the same colours instead of going flat.
  const [fallback, setFallback] = useState(false);
  const [c0, c1, c2, c3] = colors;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      powerPreference: "low-power",
    });
    if (!gl) {
      setFallback(true);
      return;
    }

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setFallback(true);
      return;
    }
    gl.useProgram(prog);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      setFallback(true);
    };
    canvas.addEventListener("webglcontextlost", onContextLost);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uScroll = gl.getUniformLocation(prog, "uScroll");

    gl.uniform3fv(gl.getUniformLocation(prog, "uC0"), hexToRgb(c0));
    gl.uniform3fv(gl.getUniformLocation(prog, "uC1"), hexToRgb(c1));
    gl.uniform3fv(gl.getUniformLocation(prog, "uC2"), hexToRgb(c2));
    gl.uniform3fv(gl.getUniformLocation(prog, "uC3"), hexToRgb(c3));
    gl.uniform1f(gl.getUniformLocation(prog, "uAmp"), amp);
    gl.uniform1f(gl.getUniformLocation(prog, "uMax"), MAX_DENSITY);
    gl.uniform1f(uScroll, 0);

    // Smoke is soft: render at half resolution and let the browser scale it up.
    const scale = Math.min(window.devicePixelRatio || 1, 1.5) * 0.5;

    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * scale));
      const h = Math.max(1, Math.round(canvas.clientHeight * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      // Always (re)apply: a remount reuses the sized canvas with a new program.
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = (t: number) => {
      gl.uniform1f(uTime, t);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    // Scroll reactivity: how far the section has moved past the viewport top,
    // in viewport heights, eased so a flick of the wheel stirs rather than jumps.
    let scrollTarget = 0;
    let scrollEased = 0;
    const onScroll = () => {
      const r = canvas.getBoundingClientRect();
      scrollTarget = Math.max(0, -r.top) / Math.max(1, window.innerHeight);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    let raf = 0;
    let running = false;
    let visible = false;
    // Reduced motion is read live: switching it on mid-session stops the loop
    // and leaves one calm static frame; switching it off resumes.
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = prefersReducedMotion();
    const start = performance.now() - Math.random() * 60000;
    const loop = () => {
      scrollEased += (scrollTarget - scrollEased) * 0.08;
      gl.uniform1f(uScroll, scrollEased);
      draw((performance.now() - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    const sync = () => {
      const shouldRun = visible && !reduced;
      if (shouldRun && !running) {
        running = true;
        raf = requestAnimationFrame(loop);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
      if (reduced) {
        gl.uniform1f(uScroll, 0);
        draw(20); // one calm static frame
      }
    };
    const onMotion = () => {
      reduced = mq.matches;
      sync();
    };
    mq.addEventListener("change", onMotion);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      sync();
    });
    io.observe(canvas);
    if (reduced) draw(20);

    return () => {
      canvas.removeEventListener("webglcontextlost", onContextLost);
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", onMotion);
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [amp, c0, c1, c2, c3, fallback]);

  const netLayer =
    net > 0 ? (
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 mix-blend-multiply ${className}`}
        style={{
          opacity: net,
          backgroundImage: "radial-gradient(circle, #201d1d 0.8px, transparent 1.25px)",
          backgroundSize: `${NET_PITCH_PX}px ${NET_PITCH_PX}px`,
        }}
      />
    ) : null;

  if (fallback) {
    return (
      <>
        <div
          aria-hidden="true"
          className={`ambient mix-blend-multiply ${className}`}
          style={{ opacity: Math.min(1, amp * MAX_DENSITY + 0.2) }}
        >
          {FALLBACK_SPANS.map((pos, i) => (
            <span
              key={i}
              style={{ ...pos, background: `radial-gradient(circle, ${colors[i]}, transparent 65%)` }}
            />
          ))}
        </div>
        {netLayer}
      </>
    );
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 h-full w-full mix-blend-multiply ${className}`}
      />
      {netLayer}
    </>
  );
}
