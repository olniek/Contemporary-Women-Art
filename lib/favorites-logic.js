import { isSeriesLive } from "./series-helpers.js";

export function collectFavoriteArtists(appData, favorites) {
  const ids = new Set(Object.keys(favorites).filter((id) => favorites[id]));
  const out = [];
  for (const series of Object.values(appData.series)) {
    if (!isSeriesLive(series.id)) continue;
    for (const topic of Object.values(series.topics)) {
      for (const artist of topic.artists) {
        if (ids.has(artist.id)) {
          out.push({
            artist,
            seriesLabel: series.label,
            topicLabel: topic.label,
          });
        }
      }
    }
  }
  out.sort((a, b) => {
    const s = a.seriesLabel.localeCompare(b.seriesLabel);
    if (s !== 0) return s;
    return a.artist.name.localeCompare(b.artist.name);
  });
  return out;
}
