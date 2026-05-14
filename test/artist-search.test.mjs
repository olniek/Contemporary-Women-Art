import test from "node:test";
import assert from "node:assert/strict";
import { APP_DATA } from "../data.js";
import { latinFoldForSearch } from "../lib/search-fold.js";
import { searchArtists, scoreMatch } from "../lib/artist-search.js";

test("latinFoldForSearch strips accents", () => {
  assert.equal(latinFoldForSearch("José"), "jose");
  assert.equal(latinFoldForSearch("  Naïve  "), "naive");
});

test("searchArtists finds by name fragment", () => {
  const hits = searchArtists(APP_DATA, "Goldin", 10);
  assert.ok(hits.some((h) => h.name.includes("Goldin")));
});

test("searchArtists is accent-insensitive on names", () => {
  const hits = searchArtists(APP_DATA, "Mendieta", 10);
  assert.ok(hits.some((h) => h.artistId === "ana_mendieta"));
});

test("scoreMatch ranks exact over substring", () => {
  const ex = scoreMatch("cat", "cat");
  const sub = scoreMatch("cat", "concat");
  assert.ok(ex > sub);
});
