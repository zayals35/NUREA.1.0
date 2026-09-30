import test from "node:test";
import assert from "node:assert/strict";
import { MAX_AGE_MS, parseNotice } from "../src/lib/consent.ts";

const now = Date.parse("2026-09-29T12:00:00.000Z");
const rec = (at: string, v: number = 2) => JSON.stringify({ v, at });

test("a recent, well-formed record is kept", () => {
  assert.deepEqual(parseNotice(rec("2026-09-20T08:00:00.000Z"), now), { v: 2, at: "2026-09-20T08:00:00.000Z" });
});

test("nothing stored, or junk, is no record", () => {
  assert.equal(parseNotice(null, now), null);
  assert.equal(parseNotice("", now), null);
  assert.equal(parseNotice("{not json", now), null);
  assert.equal(parseNotice("null", now), null);
  assert.equal(parseNotice("42", now), null);
});

test("the old statistics record (v1) is not carried over", () => {
  assert.equal(parseNotice(JSON.stringify({ v: 1, statistics: true, at: "2026-09-20T08:00:00.000Z" }), now), null);
});

test("an unreadable date is rejected", () => {
  assert.equal(parseNotice(rec("not a date"), now), null);
  assert.equal(parseNotice(JSON.stringify({ v: 2, at: 12345 }), now), null);
});

test("a date in the future is rejected, small clock skew is not", () => {
  assert.equal(parseNotice(rec("2027-01-01T00:00:00.000Z"), now), null);
  assert.notEqual(parseNotice(rec("2026-09-29T12:02:00.000Z"), now), null);
});

test("a record older than the house period is asked again", () => {
  assert.equal(parseNotice(rec(new Date(now - MAX_AGE_MS - 1000).toISOString()), now), null);
  assert.notEqual(parseNotice(rec(new Date(now - MAX_AGE_MS + 60_000).toISOString()), now), null);
});
