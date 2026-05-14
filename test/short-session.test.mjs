import assert from "node:assert/strict";
import test from "node:test";

import { SHORT_SESSION_POOL, shortSessionAnchorForDay } from "../data.js";

test("shortSessionAnchorForDay returns a valid pool entry", () => {
  const a = shortSessionAnchorForDay(new Date("2026-05-14T12:00:00Z"));
  assert.ok(
    SHORT_SESSION_POOL.some(
      (p) => p.seriesId === a.seriesId && p.topicId === a.topicId && p.artistId === a.artistId
    )
  );
});

test("shortSessionAnchorForDay is stable for the same UTC day", () => {
  const a = shortSessionAnchorForDay(new Date("2026-07-01T08:00:00Z"));
  const b = shortSessionAnchorForDay(new Date("2026-07-01T22:00:00Z"));
  assert.deepEqual(a, b);
});
