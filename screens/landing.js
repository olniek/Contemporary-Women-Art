import { APP_DATA, shortSessionAnchorForDay } from "../lib/app-data.js";
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

  const hero = createElement("div", "landing-hero");

  const copy = createElement("div", "landing-copy");
  const label = createElement("p", "landing-label", "An interactive collection");

  const title = createElement("h1", "landing-title");
  title.setAttribute("aria-label", "Female Contemporary Artists");
  for (const [cap, rest] of [
    ["F", "emale"],
    ["C", "ontemporary"],
    ["A", "rtists"],
  ]) {
    const line = createElement("span", "landing-title-line");
    const capSpan = createElement("span", "landing-title-cap", cap);
    line.appendChild(capSpan);
    line.appendChild(document.createTextNode(rest));
    title.appendChild(line);
  }

  const tagline = createElement(
    "p",
    "landing-tagline",
    "Women artists across media—flip cards, save favorites, take a short quiz.",
  );

  const { live, total } = ctx.seriesInventorySummary();
  const status = createElement(
    "p",
    "landing-status",
    `${live} of ${total} discipline${total === 1 ? "" : "s"} live`,
  );

  const actions = createElement("div", "landing-actions");
  const primaryRow = createElement("div", "landing-actions-primary");
  const secondaryRow = createElement("div", "landing-actions-secondary");

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
    secondaryRow.appendChild(continueBtn);
  }

  const btn = createElement("button", "btn btn-filled", "Begin");
  btn.addEventListener("click", () => ctx.navigate("series-select"));
  primaryRow.appendChild(btn);

  const tourAnchor = shortSessionAnchorForDay();
  const tourBtn = createElement("button", "btn btn-outline", "5-minute tour");
  tourBtn.addEventListener("click", () =>
    ctx.navigate("topic-select", {
      series: tourAnchor.seriesId,
      topic: tourAnchor.topicId,
      scrollToArtistId: tourAnchor.artistId,
    }),
  );
  secondaryRow.appendChild(tourBtn);

  const nFav = ctx.collectFavoriteArtists().length;
  const favBtn = createElement(
    "button",
    "btn btn-outline",
    nFav ? `Your favorites (${nFav})` : "Your favorites",
  );
  favBtn.addEventListener("click", () => ctx.navigate("favorites"));
  secondaryRow.appendChild(favBtn);

  actions.appendChild(primaryRow);
  if (secondaryRow.childNodes.length) actions.appendChild(secondaryRow);

  copy.appendChild(label);
  copy.appendChild(title);
  copy.appendChild(tagline);
  copy.appendChild(status);
  copy.appendChild(actions);

  const visual = createElement("div", "landing-visual");
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
  visual.appendChild(figure);

  hero.appendChild(copy);
  hero.appendChild(visual);
  screen.appendChild(hero);
}
