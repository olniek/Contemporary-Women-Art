import assert from "node:assert/strict";
import test from "node:test";

import { APP_DATA } from "../data.js";
import {
  flattenArtists,
  scoreQuestionAgainstArtists,
  topKArtists,
} from "../lib/artist-retrieval.js";

const minimalAppData = {
  series: {
    s1: {
      id: "s1",
      label: "Series One",
      topics: {
        t1: {
          id: "t1",
          label: "Topic Alpha",
          artists: [
            {
              id: "alice_smith",
              name: "Alice Smith",
              years: "1970–",
              insight: "Uses photography to explore memory.",
              keyWork: "Blue Room",
              movement: "Contemporary",
            },
            {
              id: "bob_jones",
              name: "Bob Jones",
              years: "1980–",
              insight: "Sculpture and public space.",
              keyWork: "Steel Gate",
              movement: "Minimal",
            },
          ],
        },
      },
    },
  },
};

test("flattenArtists collects ids and series/topic labels", () => {
  const flat = flattenArtists(minimalAppData);
  assert.equal(flat.length, 2);
  const alice = flat.find((a) => a.id === "alice_smith");
  assert.ok(alice);
  assert.equal(alice.seriesLabel, "Series One");
  assert.equal(alice.topicLabel, "Topic Alpha");
  assert.equal(alice.wikipediaTitle, null);
});

test("scoreQuestionAgainstArtists returns empty for gibberish", () => {
  const artists = flattenArtists(minimalAppData);
  const ranked = scoreQuestionAgainstArtists("qqqqqxxxxx zzzzz99991375", artists);
  assert.equal(ranked.length, 0);
});

test("scoreQuestionAgainstArtists ranks full name highly", () => {
  const artists = flattenArtists(minimalAppData);
  const ranked = scoreQuestionAgainstArtists("Tell me about Alice Smith and memory", artists);
  assert.ok(ranked.length >= 1);
  assert.equal(ranked[0].artist.id, "alice_smith");
  assert.ok(ranked[0].score > 0);
});

test("scoreQuestionAgainstArtists matches overlapping tokens", () => {
  const artists = flattenArtists(minimalAppData);
  const ranked = scoreQuestionAgainstArtists("memory photography blue", artists);
  const ids = ranked.map((r) => r.artist.id);
  assert.ok(ids.includes("alice_smith"));
});

test("topKArtists respects k truncation", () => {
  const artists = flattenArtists(minimalAppData);
  const top = topKArtists("contemporary minimal sculpture", artists, 1);
  assert.equal(top.length, 1);
});

test("flattenArtists on real APP_DATA has many artists", () => {
  const flat = flattenArtists(APP_DATA);
  assert.ok(flat.length > 10);
  const names = new Set(flat.map((a) => a.id));
  assert.ok(names.has("zanele_muholi"));
});

test("topKArtists finds Zanele Muholi from real data", () => {
  const artists = flattenArtists(APP_DATA);
  const top = topKArtists("Zanele Muholi portraits South Africa", artists, 5);
  assert.ok(top.some((a) => a.id === "zanele_muholi"));
});
