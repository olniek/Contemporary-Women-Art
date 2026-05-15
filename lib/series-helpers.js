import { APP_DATA } from "./app-data.js";

export function seriesInventorySummary() {
  const list = Object.values(APP_DATA.series);
  const total = list.length;
  const live = list.filter((s) => s.status !== "coming-soon").length;
  return { total, live, soon: total - live };
}

export function readSeriesInterestMap() {
  try {
    const j = JSON.parse(localStorage.getItem("wia_series_interest") || "{}");
    return j && typeof j === "object" && !Array.isArray(j) ? j : {};
  } catch {
    return {};
  }
}

export function saveSeriesInterest(seriesId) {
  const m = readSeriesInterestMap();
  m[seriesId] = true;
  try {
    localStorage.setItem("wia_series_interest", JSON.stringify(m));
  } catch {
    /* private mode */
  }
}

export function hasSeriesInterest(seriesId) {
  return !!readSeriesInterestMap()[seriesId];
}

export function isSeriesLive(seriesId) {
  const s = APP_DATA.series[seriesId];
  return !s || s.status !== "coming-soon";
}
