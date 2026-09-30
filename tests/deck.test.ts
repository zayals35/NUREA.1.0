import test from "node:test";
import assert from "node:assert/strict";
import { activeCard, deckGeometry, isCovered, scrollForCard } from "../src/lib/deck.ts";

// elespacio.net at 1440 x 900, measured 2026-09-29: list top 1249 (section 1137 + 112),
// four 548 px cards 64 px apart, first slot 112.
const g = deckGeometry(1249, [548, 548, 548, 548], 64, 112);

test("cards stick where the reference cards stick", () => {
  // Reference: card 1 at 112 from scroll 1137, card 2 at 130 from ~1727, card 3 at 148 from ~2327.
  assert.deepEqual(g.stick, [1137, 1731, 2325, 2919]);
  assert.equal(g.end, 2919);
});

test("covered cards end at 0.95 per card still to come", () => {
  assert.deepEqual(
    g.scale.map((s) => Number(s.toFixed(4))),
    [0.8574, 0.9025, 0.95, 1]
  );
});

test("the active card follows scroll forwards and backwards", () => {
  assert.equal(activeCard(0, g.stick), 0);
  assert.equal(activeCard(1500, g.stick), 0);
  assert.equal(activeCard(1731, g.stick), 1);
  assert.equal(activeCard(2500, g.stick), 2);
  assert.equal(activeCard(5000, g.stick), 3);
  assert.equal(activeCard(1600, g.stick), 0, "scrolling back up past a landing returns to the card below");
});

test("keyboard focus in a covered card scrolls to the moment it lands", () => {
  assert.equal(isCovered(0, 1800, g.stick), true);
  assert.equal(isCovered(1, 1800, g.stick), false);
  assert.equal(isCovered(3, 9999, g.stick), false, "the last card is never covered");
  assert.equal(scrollForCard(0, g.stick), 1137);
  assert.equal(activeCard(scrollForCard(2, g.stick), g.stick), 2);
  assert.equal(isCovered(2, scrollForCard(2, g.stick), g.stick), false);
});

test("uneven phone heights keep the running offsets", () => {
  const phone = deckGeometry(1000, [394, 380, 380, 380], 64, 240);
  assert.deepEqual(phone.stick, [760, 1200, 1626, 2052]);
});
