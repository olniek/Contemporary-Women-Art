/**
 * Shared retrieval over APP_DATA for Ask / serverless (keyword scoring only).
 */

function tokenize(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function uniqueTokens(str) {
  return new Set(tokenize(str));
}

/**
 * @param {{ series: Record<string, unknown> }} appData
 */
export function flattenArtists(appData) {
  const out = [];
  for (const series of Object.values(appData.series)) {
    for (const topic of Object.values(series.topics)) {
      for (const artist of topic.artists) {
        out.push({
          id: artist.id,
          name: artist.name,
          years: artist.years,
          insight: artist.insight,
          keyWork: artist.keyWork,
          movement: artist.movement,
          seriesId: series.id,
          seriesLabel: series.label,
          topicId: topic.id,
          topicLabel: topic.label,
          wikipediaTitle: artist.wikipediaTitle ?? null,
        });
      }
    }
  }
  return out;
}

/**
 * Scored matches; higher score first.
 * @param {string} question
 * @param {ReturnType<typeof flattenArtists>} artists
 */
export function scoreQuestionAgainstArtists(question, artists) {
  const qTokens = uniqueTokens(question);
  const qLower = question.toLowerCase().trim();

  return artists
    .map((a) => {
      const hay = [
        a.name,
        a.insight,
        a.keyWork,
        a.movement,
        a.seriesLabel,
        a.topicLabel,
        a.years,
      ].join(" ");
      const docTokens = uniqueTokens(hay);
      let score = 0;
      for (const t of qTokens) {
        if (docTokens.has(t)) score += 2;
        if (a.name.toLowerCase().includes(t)) score += 3;
      }
      if (qLower.includes(a.name.toLowerCase())) score += 10;
      return { artist: a, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
}

/**
 * @param {string} question
 * @param {ReturnType<typeof flattenArtists>} artists
 * @param {number} [k]
 */
export function topKArtists(question, artists, k = 8) {
  const ranked = scoreQuestionAgainstArtists(question, artists);
  return ranked.slice(0, k).map((x) => x.artist);
}
