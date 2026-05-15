import assert from "node:assert/strict";
import test from "node:test";

import { fetchWikiSummary, wikiTitleForArtist } from "../lib/wiki-summary.js";

test("wikiTitleForArtist prefers wikipediaTitle", () => {
  assert.equal(wikiTitleForArtist({ name: "Pope.L", wikipediaTitle: "Pope.L" }), "Pope.L");
  assert.equal(wikiTitleForArtist({ name: "Alice Neel" }), "Alice Neel");
});

test("fetchWikiSummary returns parsed summary on success", async () => {
  const mockFetch = async () => ({
    ok: true,
    async json() {
      return {
        title: "Alice Neel",
        extract: "Alice Neel was an American painter.",
        content_urls: { desktop: { page: "https://en.wikipedia.org/wiki/Alice_Neel" } },
        license_short_description: "CC BY-SA 4.0",
      };
    },
  });

  const out = await fetchWikiSummary("Alice Neel", { fetch: mockFetch });
  assert.ok(out);
  assert.equal(out.title, "Alice Neel");
  assert.match(out.extract, /painter/);
  assert.equal(out.pageUrl, "https://en.wikipedia.org/wiki/Alice_Neel");
  assert.equal(out.license_short_description, "CC BY-SA 4.0");
});

test("fetchWikiSummary returns null on HTTP error", async () => {
  const mockFetch = async () => ({ ok: false });
  const out = await fetchWikiSummary("No Such Article XYZ", { fetch: mockFetch });
  assert.equal(out, null);
});

test("fetchWikiSummary returns null on network error", async () => {
  const mockFetch = async () => {
    throw new Error("network");
  };
  const out = await fetchWikiSummary("Network Fail Artist", { fetch: mockFetch });
  assert.equal(out, null);
});

test("fetchWikiSummary returns null for empty title", async () => {
  const out = await fetchWikiSummary("  ", { fetch: async () => assert.fail("should not fetch") });
  assert.equal(out, null);
});
