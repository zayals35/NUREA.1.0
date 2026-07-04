import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../lib/motion";

/**
 * Monolog-style animated background: a slow two-tone noise fog rendered as a
 * fine halftone dot grid. One full-screen quad + fragment shader, transparent
 * over the section background. Pauses offscreen; reduced motion gets a single
 * static frame.
 */

const VERT = `attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform vec3 uFg;
uniform vec3 uFg2;
uniform float uPx;
uniform float uAmp;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
  return v;
}
void main() {
  vec2 cell = (floor(gl_FragCoord.xy / uPx) + 0.5) * uPx;
  vec2 uv = cell / uRes;
  vec2 q = vec2(uv.x * uRes.x / uRes.y, uv.y);
  float t = uTime * 0.05;
  float warp = fbm(q * 1.7 - t * 0.4);
  float f = fbm(q * 1.1 + vec2(t, -t * 0.5) + 1.7 * warp);
  // Broad billows with a soft horizon band in the lower half.
  float band = 1.0 - abs(uv.y - 0.38) * 1.4;
  float field = smoothstep(0.28, 0.78, f * (0.72 + 0.55 * band)) * uAmp;
  float d = length(gl_FragCoord.xy - cell) / (uPx * 0.5);
  float r = sqrt(field) * 1.12;
  float m = (1.0 - smoothstep(r - 0.25, r + 0.12, d)) * (0.2 + 0.8 * field);
  vec3 col = mix(uFg, uFg2, smoothstep(0.35, 0.85, f));
  gl_FragColor = vec4(col * m, m);
}`;

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

interface Props {
  className?: string;
  /** Overall intensity 0..1. */
  amp?: number;
  /** Deep tone of the fog dots. */
  color?: string;
  /** Bright tone where the fog peaks. */
  color2?: string;
}

export default function HalftoneFog({
  className = "",
  amp = 0.85,
  color = "#7a4e28",
  color2 = "#d9b98a",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      powerPreference: "low-power",
    });
    if (!gl) return; // no WebGL: section bg + grain still stand on their own

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
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uFg = gl.getUniformLocation(prog, "uFg");
    const uFg2 = gl.getUniformLocation(prog, "uFg2");
    const uPx = gl.getUniformLocation(prog, "uPx");
    const uAmp = gl.getUniformLocation(prog, "uAmp");

    gl.uniform3fv(uFg, hexToRgb(color));
    gl.uniform3fv(uFg2, hexToRgb(color2));
    gl.uniform1f(uAmp, amp);

    // Render at reduced resolution: the halftone quantizes anyway.
    const scale = Math.min(window.devicePixelRatio || 1, 1.5) * 0.6;

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
      gl.uniform1f(uPx, Math.max(3, 4.5 * scale));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = (t: number) => {
      gl.uniform1f(uTime, t);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    if (prefersReducedMotion()) {
      draw(20); // one calm static frame
      return () => ro.disconnect();
    }

    let raf = 0;
    let running = false;
    const start = performance.now() - Math.random() * 60000;
    const loop = () => {
      draw((performance.now() - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) {
        running = true;
        raf = requestAnimationFrame(loop);
      } else if (!e.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);

    return () => {
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [amp, color, color2]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
