import { APP_DATA } from "./data.js";
import { createElement, clearElement } from "./lib/dom-utils.js";
import { exploredCardIds, resetExploreTracking } from "./lib/explore-state.js";
import { collectFavoriteArtists as collectFavoriteArtistsData } from "./lib/favorites-logic.js";
import {
  isFavoritesStorageBroken,
  reportFavoritesSaveFailed,
  reportFavoritesSaveOk,
  WIA_FAVORITES_STORAGE_FAILED,
  WIA_FAVORITES_STORAGE_RECOVERED,
} from "./lib/favorites-storage.js";
import {
  applyHashToNavigation,
  installHashChangeNavigation,
  syncLocationHash,
} from "./lib/hash-route.js";
import { hasTopicQuizDone, saveLastPlace } from "./lib/session-place.js";
import { seriesInventorySummary } from "./lib/series-helpers.js";
import { renderAsk } from "./screens/ask.js";
import { renderFavorites } from "./screens/favorites.js";
import { renderLanding } from "./screens/landing.js";
import { renderQuiz } from "./screens/quiz.js";
import { renderResult } from "./screens/result.js";
import { renderSeriesSelect } from "./screens/series-select.js";
import { renderTopicSelect } from "./screens/topic-select.js";

// ── STATE ─────────────────────────────────────────────────────────────────────

const state = {
  currentScreen: "landing",
  askReturnScreen: "landing",
  selectedSeries: null,
  selectedTopic: null,
  pendingScrollToArtistId: null,
  quiz: {
    currentQuestion: 0,
    answers: [],
    phase: "pick",
    pendingChoice: null,
  },
  favorites: {},
};

// ── INIT ──────────────────────────────────────────────────────────────────────

function initFavorites() {
  try {
    state.favorites = JSON.parse(localStorage.getItem("wia_favorites") || "{}");
    if (!state.favorites || typeof state.favorites !== "object" || Array.isArray(state.favorites)) {
      state.favorites = {};
    }
  } catch {
    state.favorites = {};
  }
}

function saveFavorites() {
  try {
    localStorage.setItem("wia_favorites", JSON.stringify(state.favorites));
    reportFavoritesSaveOk();
  } catch {
    reportFavoritesSaveFailed();
  }
}

let favoritesStorageBannerDismissed = false;

function syncFavoritesStorageBanner() {
  const host = document.getElementById("favorites-storage-banner-host");
  if (!host) return;
  clearElement(host);
  if (!isFavoritesStorageBroken()) {
    favoritesStorageBannerDismissed = false;
    return;
  }
  if (favoritesStorageBannerDismissed) {
    const chip = createElement("button", "favorites-storage-chip", "!");
    chip.type = "button";
    chip.setAttribute(
      "aria-label",
      "Storage issue: favorites may not save in this browser. Activate to show details."
    );
    chip.addEventListener("click", () => {
      favoritesStorageBannerDismissed = false;
      syncFavoritesStorageBanner();
    });
    host.appendChild(chip);
    return;
  }
  const wrap = createElement("div", "favorites-storage-banner");
  wrap.setAttribute("role", "status");
  const p = createElement(
    "p",
    "favorites-storage-banner-text",
    "Favorites could not be saved in this browser (private mode or full storage). Hearts may not persist after you leave."
  );
  const btn = createElement("button", "btn btn-outline favorites-storage-dismiss", "Dismiss");
  btn.type = "button";
  btn.addEventListener("click", () => {
    favoritesStorageBannerDismissed = true;
    syncFavoritesStorageBanner();
  });
  wrap.appendChild(p);
  wrap.appendChild(btn);
  host.appendChild(wrap);
}

function initFavoritesStorageBanner() {
  if (document.getElementById("favorites-storage-banner-host")) return;
  const host = createElement("div");
  host.id = "favorites-storage-banner-host";
  host.className = "favorites-storage-banner-host";
  document.body.prepend(host);
  window.addEventListener(WIA_FAVORITES_STORAGE_FAILED, syncFavoritesStorageBanner);
  window.addEventListener(WIA_FAVORITES_STORAGE_RECOVERED, syncFavoritesStorageBanner);
  syncFavoritesStorageBanner();
}

function init() {
  initFavoritesStorageBanner();
  initFavorites();
  if (!applyHashToNavigation(navigate)) {
    navigate("landing");
  }
  installHashChangeNavigation(navigate);
}

// ── HELPERS ─────────────────────────────────────────────────────────────────

function currentTopicArtistCount() {
  if (!state.selectedSeries || !state.selectedTopic) return 0;
  return getArtistsByTopic(state.selectedSeries, state.selectedTopic).length;
}

function minimumExploredCards() {
  return Math.min(2, currentTopicArtistCount());
}

function isExploreQuizReady() {
  if (
    state.selectedSeries &&
    state.selectedTopic &&
    hasTopicQuizDone(state.selectedSeries, state.selectedTopic)
  ) {
    return true;
  }
  return exploredCardIds.size >= minimumExploredCards();
}

function updateExploreReadiness() {
  const quizBtn = document.getElementById("topic-quiz-btn");
  const note = document.getElementById("explore-readiness-note");
  if (!quizBtn || !note) return;
  if (
    state.selectedSeries &&
    state.selectedTopic &&
    hasTopicQuizDone(state.selectedSeries, state.selectedTopic)
  ) {
    quizBtn.disabled = false;
    note.textContent =
      "You’ve completed this quiz before — start the quiz anytime, or flip cards to refresh your context.";
    return;
  }
  const min = minimumExploredCards();
  const count = exploredCardIds.size;
  const ready = count >= min;
  quizBtn.disabled = !ready;
  note.textContent = ready
    ? "You have enough context to try the quiz."
    : `Flip ${min} cards before the quiz. ${count} of ${min} viewed.`;
}

function collectFavoriteArtists() {
  return collectFavoriteArtistsData(APP_DATA, state.favorites);
}

function getArtistsByTopic(seriesId, topicId) {
  return APP_DATA.series[seriesId].topics[topicId].artists;
}

function toggleFavorite(artistId) {
  if (state.favorites[artistId]) {
    delete state.favorites[artistId];
  } else {
    state.favorites[artistId] = true;
  }
  saveFavorites();
  return !!state.favorites[artistId];
}

function getCurrentTopic() {
  return APP_DATA.series[state.selectedSeries].topics[state.selectedTopic];
}

function hasAnotherTopicInSeries() {
  return Object.keys(APP_DATA.series[state.selectedSeries].topics).length > 1;
}

function advanceToNextTopicInSeries() {
  const keys = Object.keys(APP_DATA.series[state.selectedSeries].topics);
  const i = keys.indexOf(state.selectedTopic);
  if (keys.length < 2 || i < 0) return;
  state.selectedTopic = keys[(i + 1) % keys.length];
  resetExploreTracking();
}

function favoriteInsightsForCurrentTopic(limit = 3) {
  const artists = getArtistsByTopic(state.selectedSeries, state.selectedTopic);
  const out = [];
  for (const a of artists) {
    if (state.favorites[a.id]) out.push(a);
  }
  return out.slice(0, limit);
}

function buildTopicCtx() {
  return {
    state,
    navigate,
    getArtistsByTopic,
    toggleFavorite,
    resetExploreTracking,
    updateExploreReadiness,
  };
}

function buildQuizCtx() {
  return {
    state,
    navigate,
    rerenderQuiz: () => {
      if (state.currentScreen === "quiz") renderQuiz(buildQuizCtx());
    },
  };
}

function buildResultCtx() {
  return {
    state,
    navigate,
    getCurrentTopic,
    hasAnotherTopicInSeries,
    advanceToNextTopicInSeries,
    favoriteInsightsForCurrentTopic,
    collectFavoriteArtists,
  };
}

function showFatalRenderError(err) {
  let el = document.getElementById("app-fatal-error");
  if (!el) {
    el = document.createElement("div");
    el.id = "app-fatal-error";
    el.className = "app-fatal-error";
    el.setAttribute("role", "alert");
    document.body.appendChild(el);
  }
  el.innerHTML = "";
  const h = createElement("h1", "app-fatal-error-title", "Something went wrong");
  const p = createElement(
    "p",
    "app-fatal-error-body",
    "The app hit an unexpected error. You can reload the page to try again."
  );
  const btn = createElement("button", "btn btn-filled", "Reload");
  btn.type = "button";
  btn.addEventListener("click", () => location.reload());
  el.appendChild(h);
  el.appendChild(p);
  el.appendChild(btn);
  el.hidden = false;
  console.error(err);
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
}

// ── NAVIGATION ────────────────────────────────────────────────────────────────

function navigate(screen, payload = {}) {
  if (screen === "quiz" && !isExploreQuizReady()) {
    return;
  }

  if (screen === "landing") {
    state.selectedSeries = null;
    state.selectedTopic = null;
    resetExploreTracking();
  }

  if (screen === "series-select") {
    state.selectedSeries = null;
    state.selectedTopic = null;
    resetExploreTracking();
  }

  if (screen === "topic-select") {
    if (payload.series) state.selectedSeries = payload.series;
    const topicKeys = Object.keys(APP_DATA.series[state.selectedSeries].topics);
    if (payload.series) {
      state.selectedTopic =
        payload.topic && topicKeys.includes(payload.topic) ? payload.topic : topicKeys[0];
      resetExploreTracking();
    } else if (payload.topic && topicKeys.includes(payload.topic)) {
      state.selectedTopic = payload.topic;
      resetExploreTracking();
    } else if (!state.selectedTopic) {
      state.selectedTopic = topicKeys[0];
    }
    if (typeof payload.scrollToArtistId === "string" && payload.scrollToArtistId.trim()) {
      state.pendingScrollToArtistId = payload.scrollToArtistId.trim();
    } else {
      state.pendingScrollToArtistId = null;
    }
  }

  if (screen === "ask") {
    state.askReturnScreen = payload.returnTo ?? "landing";
  }

  if (screen === "quiz") {
    state.quiz = {
      currentQuestion: 0,
      answers: [],
      phase: "pick",
      pendingChoice: null,
    };
  }

  if (
    (screen === "topic-select" || screen === "quiz" || screen === "result") &&
    state.selectedSeries &&
    state.selectedTopic &&
    APP_DATA.series[state.selectedSeries]?.topics[state.selectedTopic]
  ) {
    saveLastPlace(state.selectedSeries, state.selectedTopic);
  }

  state.currentScreen = screen;
  renderScreen();
}

function renderScreen() {
  const fatal = document.getElementById("app-fatal-error");
  if (fatal) fatal.hidden = true;
  try {
    document.querySelectorAll(".screen").forEach((el) => el.classList.remove("active"));
    document.getElementById("screen-" + state.currentScreen).classList.add("active");

    if (state.currentScreen === "landing") {
      renderLanding({ navigate, seriesInventorySummary, collectFavoriteArtists });
    }
    if (state.currentScreen === "ask") renderAsk({ navigate, askReturnScreen: state.askReturnScreen });
    if (state.currentScreen === "series-select") renderSeriesSelect({ navigate });
    if (state.currentScreen === "topic-select") renderTopicSelect(buildTopicCtx());
    if (state.currentScreen === "favorites") {
      renderFavorites({ state, navigate, collectFavoriteArtists, saveFavorites });
    }
    if (state.currentScreen === "quiz") renderQuiz(buildQuizCtx());
    if (state.currentScreen === "result") renderResult(buildResultCtx());

    syncLocationHash(state);
    focusScreen();
  } catch (err) {
    showFatalRenderError(err);
  }
}

function focusScreen() {
  const screen = document.getElementById("screen-" + state.currentScreen);
  const heading = screen.querySelector("h1, h2");
  if (heading) {
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: false });
  }
}

document.addEventListener("DOMContentLoaded", init);
