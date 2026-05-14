import { latinFoldForSearch } from "./search-fold.js";

/**
 * @param {string} query raw user query
 * @param {string} text field text
 * @returns {number}
 */
export function scoreMatch(query, text) {
  const t = latinFoldForSearch(text);
  const q = latinFoldForSearch(query);
  if (!q || !t) return 0;
  if (t === q) return 100;
  if (t.startsWith(q)) return 45;
  if (t.includes(q)) return 12;
  return 0;
}

/**
 * Search live series/topics for artists matching query (name, years, insight, labels, …).
 * @param {typeof import("../data.js").APP_DATA} appData
 * @param {string} query
 * @param {number} [limit]
 * @returns {{ artistId: string, seriesId: string, topicId: string, name: string, seriesLabel: string, topicLabel: string, score: number }[]}
 */
export function searchArtists(appData, query, limit = 24) {
  const q = latinFoldForSearch(query);
  if (!q) return [];

  /** @type {{ artistId: string, seriesId: string, topicId: string, name: string, seriesLabel: string, topicLabel: string, score: number }[]} */
  const hits = [];

  for (const series of Object.values(appData.series)) {
    if (series.status === "coming-soon") continue;
    for (const topic of Object.values(series.topics)) {
      for (const artist of topic.artists) {
        const fields = [
          artist.name,
          artist.years,
          artist.insight,
          artist.keyWork,
          artist.movement,
          series.label,
          topic.label,
        ];
        let score = 0;
        for (const f of fields) {
          if (f) score = Math.max(score, scoreMatch(query, String(f)));
        }
        if (score > 0) {
          hits.push({
            artistId: artist.id,
            seriesId: series.id,
            topicId: topic.id,
            name: artist.name,
            seriesLabel: series.label,
            topicLabel: topic.label,
            score,
          });
        }
      }
    }
  }

  hits.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.name.localeCompare(b.name);
  });

  return hits.slice(0, limit);
}
