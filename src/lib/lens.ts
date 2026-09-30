/**
 * The lens beside the homepage deck (components/studio/DeckArt.tsx, LensArt):
 * where each shape rests and where it goes for each card. Kept free of the
 * DOM so the poses can be tested.
 */

/** Each shape's centre at rest, in the 400 x 500 viewBox: the origin its pose turns and scales about. */
export const LENS_ORIGIN = {
  sun: [148, 178],
  sq: [266, 296],
  arch: [150, 420],
  rib: [200, 330],
  ring: [300, 112],
  dot: [92, 448],
} as const;

export type LensPart = keyof typeof LENS_ORIGIN;
/** Target centre, scale and added rotation for one part in one pose. */
type Pose = Partial<Record<LensPart, [x: number, y: number, s: number, r?: number]>>;

/** One pose per card, in deck order: syn (citron), ai (blue), folk (red), create (hue). */
export const LENS_POSES: Pose[] = [
  { sun: [200, 205, 1.28], sq: [318, 404, 0.62, 40], arch: [96, 474, 0.62], rib: [214, 372, 0.84, -18], ring: [200, 205, 2.75], dot: [338, 62, 1] },
  { sun: [96, 92, 0.58], sq: [200, 238, 1.25, 45], arch: [318, 474, 0.62], rib: [186, 400, 0.8, 22], ring: [200, 238, 2.85], dot: [58, 300, 1] },
  { sun: [304, 96, 0.62], sq: [94, 118, 0.55, 90], arch: [200, 336, 1.5], rib: [206, 440, 0.78, -10], ring: [200, 336, 2.6], dot: [342, 446, 1] },
  { sun: [88, 88, 0.5], sq: [318, 96, 0.45, 135], arch: [200, 478, 0.55], rib: [200, 250, 1.3, 12], ring: [200, 250, 3.3], dot: [60, 440, 1] },
];

/** Where a part sits in a pose: centre, scale and rotation. A part a pose leaves out stays at rest. */
export function lensVars(part: LensPart, pose: Pose) {
  const [x, y, s, r = 0] = pose[part] ?? [...LENS_ORIGIN[part], 1];
  return { x, y, s, r };
}

/**
 * The SVG transform that puts a part's rest centre at (x, y), turned and
 * scaled about that centre. Written by hand: GSAP's svgOrigin compensation
 * compounded into offsets thousands of units wide on this drawing.
 */
export function lensTransform(part: LensPart, v: { x: number; y: number; s: number; r: number }) {
  const [ox, oy] = LENS_ORIGIN[part];
  const f = (n: number) => +n.toFixed(3);
  return `translate(${f(v.x)} ${f(v.y)}) rotate(${f(v.r)}) scale(${f(v.s)}) translate(${-ox} ${-oy})`;
}
