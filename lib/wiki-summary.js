const wikiCache = new Map();
const WIKI_CACHE_MAX = 80;

/**
 * @param {string} title
 * @param {{ fetch?: typeof fetch }} [opts]
 * @returns {Promise<{ title: string, extract: string, pageUrl: string, license_short_description: string } | null>}
 */
export async function fetchWikiSummary(title, opts = {}) {
  const key = title.trim();
  if (!key) return null;
  if (wikiCache.has(key)) return wikiCache.get(key);

  const doFetch = opts.fetch ?? globalThis.fetch;
  const encoded = encodeURIComponent(key.replace(/\s+/g, "_"));
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encoded}`;

  try {
    const r = await doFetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "WomenInContemporaryArt/1.0 (educational art catalog; local retrieval)",
      },
    });
    if (!r.ok) {
      cacheWikiResult(key, null);
      return null;
    }
    const j = await r.json();
    const desktop = j.content_urls?.desktop;
    const pageUrl = typeof desktop === "string" ? desktop : desktop?.page || desktop?.url || "";
    const out = {
      title: j.title,
      extract: j.extract || "",
      pageUrl,
      license_short_description: j.license_short_description || "",
    };
    cacheWikiResult(key, out);
    return out;
  } catch {
    cacheWikiResult(key, null);
    return null;
  }
}

/** @param {string} key @param {object | null} value */
function cacheWikiResult(key, value) {
  wikiCache.set(key, value);
  while (wikiCache.size > WIKI_CACHE_MAX) {
    const first = wikiCache.keys().next().value;
    wikiCache.delete(first);
  }
}

/**
 * @param {{ name: string, wikipediaTitle?: string | null }} artist
 * @returns {string}
 */
export function wikiTitleForArtist(artist) {
  return (artist.wikipediaTitle || artist.name || "").trim();
}
