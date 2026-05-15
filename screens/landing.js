import { APP_DATA, shortSessionAnchorForDay } from "../lib/app-data.js";
import { createElement, clearElement } from "../lib/dom-utils.js";
import { readLastPlace } from "../lib/session-place.js";

const LANDING_ARTIST_ID = "francesca_woodman";

/** @param {string} artistId */
function findArtistById(artistId) {
  for (const series of Object.values(APP_DATA.series)) {
    for (const topic of Object.values(series.topics)) {
      const artist = topic.artists?.find((a) => a.id === artistId);
      if (artist) return artist;
    }
  }
  return null;
}

/**
 * @param {HTMLElement} nav
 * @param {HTMLElement} link
 */
function appendSecondaryLink(nav, link) {
  if (nav.childNodes.length) {
    const sep = createElement("span", "landing-secondary-sep", "·");
    sep.setAttribute("aria-hidden", "true");
    nav.appendChild(sep);
  }
  nav.appendChild(link);
}

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
  for (const lineText of ["Female", "Contemporary", "Artists"]) {
    const line = createElement("span", "landing-title-line", lineText);
    title.appendChild(line);
  }

  const tagline = createElement(
    "p",
    "landing-tagline",
    "Flip cards, save favorites, take a short quiz.",
  );

  const actions = createElement("div", "landing-actions");
  const primaryRow = createElement("div", "landing-actions-primary");
  const beginBtn = createElement("button", "btn btn-filled", "Begin");
  beginBtn.addEventListener("click", () => ctx.navigate("series-select"));
  primaryRow.appendChild(beginBtn);
  actions.appendChild(primaryRow);

  const secondaryNav = document.createElement("nav");
  secondaryNav.className = "landing-secondary";
  secondaryNav.setAttribute("aria-label", "Other ways to explore");

  const last = readLastPlace();
  if (last) {
    const ls = APP_DATA.series[last.seriesId];
    const lt = ls.topics[last.topicId];
    const continueBtn = createElement(
      "button",
      "landing-link",
      `Continue: ${ls.label} — ${lt.label}`,
    );
    continueBtn.addEventListener("click", () =>
      ctx.navigate("topic-select", { series: last.seriesId, topic: last.topicId }),
    );
    appendSecondaryLink(secondaryNav, continueBtn);
  }

  const tourAnchor = shortSessionAnchorForDay();
  const tourBtn = createElement("button", "landing-link", "5-minute tour");
  tourBtn.addEventListener("click", () =>
    ctx.navigate("topic-select", {
      series: tourAnchor.seriesId,
      topic: tourAnchor.topicId,
      scrollToArtistId: tourAnchor.artistId,
    }),
  );
  appendSecondaryLink(secondaryNav, tourBtn);

  const nFav = ctx.collectFavoriteArtists().length;
  const favBtn = createElement(
    "button",
    "landing-link",
    nFav ? `Your favorites (${nFav})` : "Your favorites",
  );
  favBtn.addEventListener("click", () => ctx.navigate("favorites"));
  appendSecondaryLink(secondaryNav, favBtn);

  actions.appendChild(secondaryNav);

  const { live, total } = ctx.seriesInventorySummary();
  const status = createElement(
    "p",
    "landing-status",
    `${live} of ${total} discipline${total === 1 ? "" : "s"} live`,
  );

  copy.appendChild(label);
  copy.appendChild(title);
  copy.appendChild(tagline);
  copy.appendChild(actions);
  copy.appendChild(status);

  const featured = findArtistById(LANDING_ARTIST_ID);
  const visual = createElement("div", "landing-visual");
  const figure = document.createElement("figure");
  figure.className = "landing-example";
  const img = document.createElement("img");
  img.src = featured?.image ?? "images/artists/francesca_woodman.png";
  img.width = 400;
  img.height = 520;
  img.loading = "lazy";
  img.alt = featured?.imageAlt ?? "Black-and-white photograph: figure in a doorframe, arms raised.";
  const cap = document.createElement("figcaption");
  cap.textContent = featured?.keyWork
    ? `${featured.name} — ${featured.keyWork}`
    : (featured?.name ?? "Francesca Woodman");
  figure.appendChild(img);
  figure.appendChild(cap);
  visual.appendChild(figure);

  hero.appendChild(copy);
  hero.appendChild(visual);
  screen.appendChild(hero);
}
