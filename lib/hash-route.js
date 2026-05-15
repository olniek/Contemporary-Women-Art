import { APP_DATA } from "./app-data.js";

/**
 * @param {{ currentScreen: string, selectedSeries: string | null, selectedTopic: string | null }} state
 * @returns {string} hash including leading `#`
 */
export function hashFromAppState(state) {
  if (state.currentScreen === "topic-select" && state.selectedSeries && state.selectedTopic) {
    return `#/topic/${encodeURIComponent(state.selectedSeries)}/${encodeURIComponent(state.selectedTopic)}`;
  }
  if (state.currentScreen === "quiz" || state.currentScreen === "result") {
    if (state.selectedSeries && state.selectedTopic) {
      return `#/topic/${encodeURIComponent(state.selectedSeries)}/${encodeURIComponent(state.selectedTopic)}`;
    }
  }
  if (state.currentScreen === "series-select") return "#/series";
  if (state.currentScreen === "ask") return "#/ask";
  if (state.currentScreen === "favorites") return "#/favorites";
  return "#/landing";
}

/**
 * @param {(screen: string, payload?: object) => void} navigate
 * @returns {boolean} true if hash was recognized
 */
export function applyHashToNavigation(navigate) {
  let h = location.hash.startsWith("#") ? location.hash.slice(1) : location.hash;
  if (!h || h === "/") return false;
  if (h.startsWith("/")) h = h.slice(1);
  const parts = h.split("/").filter(Boolean);
  if (parts[0] === "landing") {
    navigate("landing");
    return true;
  }
  if (parts[0] === "series") {
    navigate("series-select");
    return true;
  }
  if (parts[0] === "ask") {
    navigate("ask");
    return true;
  }
  if (parts[0] === "favorites") {
    navigate("favorites");
    return true;
  }
  if (parts[0] === "topic" && parts.length === 3) {
    const seriesId = decodeURIComponent(parts[1]);
    const topicId = decodeURIComponent(parts[2]);
    const series = APP_DATA.series[seriesId];
    if (!series || series.status === "coming-soon") return false;
    if (!series.topics[topicId]) return false;
    navigate("topic-select", { series: seriesId, topic: topicId });
    return true;
  }
  return false;
}

export function syncLocationHash(state) {
  const next = hashFromAppState(state);
  if (location.hash === next) return;
  try {
    history.replaceState(null, "", `${location.pathname}${location.search}${next}`);
  } catch {
    /* file:// or restricted environments */
  }
}

/**
 * @param {(screen: string, payload?: object) => void} navigate
 */
export function installHashChangeNavigation(navigate) {
  window.addEventListener("hashchange", () => {
    applyHashToNavigation(navigate);
  });
}
