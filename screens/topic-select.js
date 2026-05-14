import { APP_DATA } from "../data.js";
import { wireCollectionSearch } from "../lib/collection-search-ui.js";
import { createElement, clearElement } from "../lib/dom-utils.js";
import { exploredCardIds } from "../lib/explore-state.js";
import { createFlowStepper } from "../lib/flow-stepper.js";
import { wikiSearchUrl } from "../lib/wiki-helpers.js";

/**
 * @param {{
 *   state: object,
 *   navigate: (s: string, p?: object) => void,
 *   getArtistsByTopic: (sid: string, tid: string) => unknown[],
 *   toggleFavorite: (id: string) => boolean,
 *   resetExploreTracking: () => void,
 *   updateExploreReadiness: () => void,
 * }} ctx
 */
export function renderTopicSelect(ctx) {
  const series = APP_DATA.series[ctx.state.selectedSeries];

  const header = document.getElementById("topic-header");
  clearElement(header);
  const h2 = createElement("h2", "", series.label);
  const nav = createElement("div", "topic-header-actions");
  const favBtn = createElement("button", "btn-back", "Favorites");
  favBtn.addEventListener("click", () => ctx.navigate("favorites"));
  const backBtn = createElement("button", "btn-back", "← All Series");
  backBtn.addEventListener("click", () => ctx.navigate("series-select"));
  nav.appendChild(favBtn);
  nav.appendChild(backBtn);
  header.appendChild(h2);
  header.appendChild(nav);

  const screen = document.getElementById("screen-topic-select");
  let stepHost = screen.querySelector(".flow-stepper-host");
  if (!stepHost) {
    stepHost = createElement("div", "flow-stepper-host");
    const tabs = document.getElementById("topic-tabs");
    screen.insertBefore(stepHost, tabs);
  }
  clearElement(stepHost);
  stepHost.appendChild(createFlowStepper(1));
  const topicNow = series.topics[ctx.state.selectedTopic];
  stepHost.appendChild(
    createElement("p", "topic-you-are-here", `You are here: ${series.label} — ${topicNow.label}`),
  );

  ensureTopicCollectionSearch(screen, ctx);
  ensureTopicExploreChrome(screen);
  renderTopicExploreBody(ctx);
}

function ensureTopicCollectionSearch(screen, ctx) {
  let wrap = document.getElementById("collection-search-topic");
  if (!wrap) {
    wrap = createElement("div", "collection-search");
    wrap.id = "collection-search-topic";
    const tabs = document.getElementById("topic-tabs");
    screen.insertBefore(wrap, tabs);
    wireCollectionSearch(wrap, APP_DATA, (hit) => {
      ctx.navigate("topic-select", {
        series: hit.seriesId,
        topic: hit.topicId,
        scrollToArtistId: hit.artistId,
      });
    });
  }
}

function ensureTopicExploreChrome(screen) {
  const grid = document.getElementById("artist-grid");
  let note = document.getElementById("explore-readiness-note");
  if (!note) {
    note = createElement("p", "quiz-hint explore-readiness-note");
    note.id = "explore-readiness-note";
    note.setAttribute("aria-live", "polite");
    screen.insertBefore(note, grid);
  }
  let lead = document.getElementById("topic-topic-lead");
  if (!lead) {
    lead = createElement("div", "topic-topic-lead");
    lead.id = "topic-topic-lead";
    screen.insertBefore(lead, note);
  }
}

function renderTopicLead(ctx) {
  const lead = document.getElementById("topic-topic-lead");
  if (!lead) return;
  clearElement(lead);
  const topic = APP_DATA.series[ctx.state.selectedSeries].topics[ctx.state.selectedTopic];
  if (topic.description) {
    lead.appendChild(createElement("p", "topic-description", topic.description));
  }
  if (topic.thesis) {
    lead.appendChild(createElement("p", "topic-thesis", topic.thesis));
  }
}

function renderTopicExploreBody(ctx) {
  renderTopicTabs(ctx);
  renderTopicLead(ctx);
  ctx.updateExploreReadiness();
  renderArtistCards(ctx);
}

function renderTopicTabs(ctx) {
  const series = APP_DATA.series[ctx.state.selectedSeries];
  const tabs = document.getElementById("topic-tabs");
  clearElement(tabs);

  Object.values(series.topics).forEach((topic) => {
    const tab = createElement("button", "topic-tab", topic.label);
    if (topic.id === ctx.state.selectedTopic) tab.classList.add("active");

    tab.addEventListener("click", () => {
      if (ctx.state.selectedTopic !== topic.id) {
        ctx.resetExploreTracking();
      }
      ctx.state.selectedTopic = topic.id;
      renderTopicExploreBody(ctx);
    });

    tabs.appendChild(tab);
  });

  const quizBtn = createElement("button", "btn topic-quiz-btn", "Take Quiz →");
  quizBtn.id = "topic-quiz-btn";
  quizBtn.setAttribute("aria-describedby", "explore-readiness-note");
  quizBtn.addEventListener("click", () => ctx.navigate("quiz"));
  tabs.appendChild(quizBtn);
}

function renderArtistCards(ctx) {
  const grid = document.getElementById("artist-grid");
  clearElement(grid);

  const artists = ctx.getArtistsByTopic(ctx.state.selectedSeries, ctx.state.selectedTopic);
  artists.forEach((artist) => grid.appendChild(createArtistCard(artist, ctx)));
  ctx.updateExploreReadiness();

  const toScroll = ctx.state.pendingScrollToArtistId;
  if (toScroll) {
    ctx.state.pendingScrollToArtistId = null;
    if (artists.some((a) => a.id === toScroll)) {
      requestAnimationFrame(() => {
        const scene = Array.from(grid.children).find((el) => el.dataset.artistId === toScroll);
        if (!scene) return;
        const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
        scene.scrollIntoView({ block: "center", behavior: reduceMotion ? "instant" : "smooth" });
        const card = scene.querySelector(".card");
        if (card) card.focus({ preventScroll: true });
      });
    }
  }
}

function createArtistCard(artist, ctx) {
  const scene = createElement("div", "card-scene");
  scene.dataset.artistId = artist.id;
  const card = createElement("div", "card");
  const front = createElement("div", "card-front");

  const imageWrap = createElement("div", "card-image");
  if (artist.image) {
    const img = document.createElement("img");
    img.className = "card-image-img";
    img.src = artist.image;
    img.alt = artist.imageAlt || artist.name;
    img.loading = "lazy";
    img.addEventListener("error", () => {
      img.remove();
      imageWrap.style.backgroundColor = artist.imagePlaceholder || "#e8e8e4";
      imageWrap.setAttribute("data-image-fallback", "true");
    });
    imageWrap.appendChild(img);
  } else {
    imageWrap.style.backgroundColor = artist.imagePlaceholder;
  }

  front.appendChild(imageWrap);
  front.appendChild(createElement("h3", "card-name", artist.name));
  front.appendChild(createElement("p", "card-years", artist.years));

  const back = createElement("div", "card-back");
  const meta = createElement("div", "card-meta");
  meta.innerHTML = "<strong>" + artist.keyWork + "</strong><br>" + artist.movement;

  back.appendChild(createElement("p", "card-back-label", "Artist Insight"));
  back.appendChild(createElement("p", "card-insight", artist.insight));
  back.appendChild(meta);

  const learnP = createElement("p", "card-learn-more");
  const learnA = document.createElement("a");
  learnA.className = "card-learn-link";
  learnA.href = wikiSearchUrl(artist.name);
  learnA.target = "_blank";
  learnA.rel = "noopener noreferrer";
  learnA.textContent = "Learn more about the artist";
  learnP.appendChild(learnA);
  back.appendChild(learnP);

  card.appendChild(front);
  card.appendChild(back);
  scene.appendChild(card);

  card.setAttribute("tabindex", "0");
  card.setAttribute("role", "button");
  card.setAttribute("aria-pressed", "false");
  card.setAttribute("aria-label", "Learn about " + artist.name + ". Activate to read insight.");

  card.addEventListener("click", (e) => {
    if (e.target.closest(".card-learn-link")) return;
    const flipped = card.classList.toggle("is-flipped");
    card.setAttribute("aria-pressed", String(flipped));
    card.setAttribute(
      "aria-label",
      flipped
        ? "Showing insight for " + artist.name + ". Activate to flip back."
        : "Learn about " + artist.name + ". Activate to read insight.",
    );
    exploredCardIds.add(artist.id);
    ctx.updateExploreReadiness();
  });

  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      if (e.target.closest(".card-learn-link")) return;
      e.preventDefault();
      card.click();
    }
  });

  const heart = createElement("button", "heart-btn", "♥");
  const isFav = !!ctx.state.favorites[artist.id];
  heart.setAttribute("aria-label", (isFav ? "Remove " : "Add ") + artist.name + " from favorites");
  if (isFav) heart.classList.add("is-favorited");

  heart.addEventListener("click", (e) => {
    e.stopPropagation();
    const nowFav = ctx.toggleFavorite(artist.id);
    heart.classList.toggle("is-favorited", nowFav);
    heart.setAttribute(
      "aria-label",
      (nowFav ? "Remove " : "Add ") + artist.name + " from favorites",
    );
  });

  scene.appendChild(heart);
  return scene;
}
