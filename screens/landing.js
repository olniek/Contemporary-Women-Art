import { APP_DATA, shortSessionAnchorForDay } from "../data.js";
import { createElement, clearElement } from "../lib/dom-utils.js";
import { readLastPlace } from "../lib/session-place.js";

/**
 * @param {{
 *   navigate: (s: string) => void,
 *   seriesInventorySummary: () => { live: number, total: number, soon: number },
 *   collectFavoriteArtists: () => unknown[],
 * }} ctx
 */
export function renderLanding(ctx) {
  const screen = document.getElementById("screen-landing");
  clearElement(screen);

  const label = createElement("p", "landing-label", "An interactive collection");
  const title = createElement("h1", "landing-title", "Female Contemporary Artist 1");
  const { live, total, soon } = ctx.seriesInventorySummary();
  const tagline = createElement(
    "p",
    "landing-tagline",
    `Explore women artists across media — curated topics, flip cards for curator-style insight, favorites, and a short quiz. ${live} of ${total} discipline${total === 1 ? "" : "s"} are live today${soon ? `; ${soon} more on the way` : ""}.`,
  );

  const askNote = createElement(
    "p",
    "landing-ask-note",
    "Ask the collection uses a server route: it works on a Vercel deployment or with npx vercel dev, not on python -m http.server alone.",
  );

  const figure = document.createElement("figure");
  figure.className = "landing-example";
  const img = document.createElement("img");
  img.src = "images/artists/francesca_woodman.png";
  img.width = 400;
  img.height = 520;
  img.loading = "lazy";
  img.alt =
    "Black-and-white photograph: figure in a doorframe, arms raised — example of contemporary lens-based work.";
  const cap = document.createElement("figcaption");
  const strong = document.createElement("strong");
  strong.textContent = "Example insight.";
  cap.appendChild(strong);
  cap.appendChild(
    document.createTextNode(
      " The doorway is both frame and burden—the pose keeps symbolic weight without leaving the room.",
    ),
  );
  figure.appendChild(img);
  figure.appendChild(cap);

  const actions = createElement("div", "landing-actions");
  const last = readLastPlace();
  if (last) {
    const ls = APP_DATA.series[last.seriesId];
    const lt = ls.topics[last.topicId];
    const continueBtn = createElement(
      "button",
      "btn btn-outline landing-continue-btn",
      `Continue: ${ls.label} — ${lt.label}`,
    );
    continueBtn.addEventListener("click", () =>
      ctx.navigate("topic-select", { series: last.seriesId, topic: last.topicId }),
    );
    actions.appendChild(continueBtn);
  }
  const btn = createElement("button", "btn btn-filled", "Begin");
  btn.addEventListener("click", () => ctx.navigate("series-select"));
  const tourAnchor = shortSessionAnchorForDay();
  const tourBtn = createElement("button", "btn btn-outline", "5-minute tour");
  tourBtn.addEventListener("click", () =>
    ctx.navigate("topic-select", {
      series: tourAnchor.seriesId,
      topic: tourAnchor.topicId,
      scrollToArtistId: tourAnchor.artistId,
    }),
  );
  const askBtn = createElement("button", "btn btn-outline", "Ask the collection");
  askBtn.addEventListener("click", () => ctx.navigate("ask"));
  const nFav = ctx.collectFavoriteArtists().length;
  const favBtn = createElement(
    "button",
    "btn btn-outline",
    nFav ? `Your favorites (${nFav})` : "Your favorites",
  );
  favBtn.addEventListener("click", () => ctx.navigate("favorites"));
  actions.appendChild(btn);
  actions.appendChild(tourBtn);
  actions.appendChild(askBtn);
  actions.appendChild(favBtn);

  screen.appendChild(label);
  screen.appendChild(title);
  screen.appendChild(tagline);
  screen.appendChild(askNote);
  screen.appendChild(figure);
  screen.appendChild(actions);
}
