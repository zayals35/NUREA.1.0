import test from "node:test";
import assert from "node:assert/strict";
import { LENS_ORIGIN, LENS_POSES, lensTransform, lensVars } from "../src/lib/lens.ts";

// Deck order: syn (citron sun), ai (blue square), folk (red arch), create (hue ribbon).
const LEAD = ["sun", "sq", "arch", "rib"] as const;

test("one pose per card", () => {
  assert.equal(LENS_POSES.length, 4);
});

test("in each pose the card's own shape leads: largest, and the ring sits on it", () => {
  LENS_POSES.forEach((pose, i) => {
    const lead = pose[LEAD[i]]!;
    for (const other of LEAD) if (other !== LEAD[i]) assert.ok(lead[2] > pose[other]![2], `pose ${i}: ${LEAD[i]} is not the largest`);
    const ring = pose.ring!;
    assert.deepEqual([ring[0], ring[1]], [lead[0], lead[1]], `pose ${i}: the ring is not centred on ${LEAD[i]}`);
  });
});

test("every centre stays inside the 400 x 500 drawing", () => {
  for (const pose of LENS_POSES)
    for (const [x, y] of Object.values(pose)) {
      assert.ok(x >= 0 && x <= 400, `x ${x}`);
      assert.ok(y >= 0 && y <= 500, `y ${y}`);
    }
});

test("lensVars gives a part's place in a pose, and a missing part stays at rest", () => {
  assert.deepEqual(lensVars("sun", LENS_POSES[0]), { x: 200, y: 205, s: 1.28, r: 0 });
  assert.deepEqual(lensVars("dot", {}), { x: LENS_ORIGIN.dot[0], y: LENS_ORIGIN.dot[1], s: 1, r: 0 });
});

test("lensTransform puts the rest centre on the target: rest is the identity, a pose lands its centre", () => {
  // Apply translate(x y) rotate(r) scale(s) translate(-ox -oy) to the rest centre by hand.
  const apply = (t: string, [px, py]: readonly number[]) => {
    const n = [...t.matchAll(/-?[\d.]+/g)].map(Number);
    const [x, y, r, s, tx, ty] = n;
    const qx = (px + tx) * s, qy = (py + ty) * s, a = (r * Math.PI) / 180;
    return [x + qx * Math.cos(a) - qy * Math.sin(a), y + qx * Math.sin(a) + qy * Math.cos(a)];
  };
  for (const part of Object.keys(LENS_ORIGIN) as (keyof typeof LENS_ORIGIN)[]) {
    const rest = apply(lensTransform(part, lensVars(part, {})), LENS_ORIGIN[part]);
    assert.ok(Math.abs(rest[0] - LENS_ORIGIN[part][0]) < 1e-6 && Math.abs(rest[1] - LENS_ORIGIN[part][1]) < 1e-6, part);
    LENS_POSES.forEach((pose) => {
      const v = lensVars(part, pose);
      const [cx, cy] = apply(lensTransform(part, v), LENS_ORIGIN[part]);
      assert.ok(Math.abs(cx - v.x) < 1e-6 && Math.abs(cy - v.y) < 1e-6, `${part} lands at ${cx},${cy}`);
    });
  }
});
