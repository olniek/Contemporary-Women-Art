import { createElement, clearElement } from "../lib/dom-utils.js";

/**
 * @param {{
 *   state: object,
 *   navigate: (s: string, p?: object) => void,
 *   collectFavoriteArtists: () => { artist: object, seriesLabel: string, topicLabel: string }[],
 *   saveFavorites: () => void,
 * }} ctx
 */
export function renderFavorites(ctx) {
  const header = document.getElementById("favorites-header");
  clearElement(header);
  const h2 = createElement("h2", "", "Your favorites");
  const backBtn = createElement("button", "btn-back", "← Back");
  backBtn.addEventListener("click", () => {
    if (ctx.state.selectedSeries) ctx.navigate("topic-select");
    else ctx.navigate("series-select");
  });
  header.appendChild(h2);
  header.appendChild(backBtn);

  const main = document.getElementById("favorites-main");
  clearElement(main);

  const items = ctx.collectFavoriteArtists();
  if (!items.length) {
    main.appendChild(
      createElement(
        "p",
        "favorites-empty",
        "No favorites yet — tap the heart on a card to save one.",
      ),
    );
  } else {
    const ul = createElement("ul", "favorites-list");
    items.forEach(({ artist, seriesLabel, topicLabel }) => {
      const li = createElement("li", "favorites-item");
      const meta = createElement("div", "favorites-meta");
      meta.appendChild(createElement("div", "favorites-series", seriesLabel + " · " + topicLabel));
      meta.appendChild(createElement("strong", "", artist.name));
      meta.appendChild(
        createElement(
          "p",
          "favorites-desc",
          artist.insight.slice(0, 160) + (artist.insight.length > 160 ? "…" : ""),
        ),
      );
      const rm = createElement("button", "btn btn-outline favorites-remove", "Remove");
      rm.addEventListener("click", () => {
        delete ctx.state.favorites[artist.id];
        ctx.saveFavorites();
        renderFavorites(ctx);
      });
      li.appendChild(meta);
      li.appendChild(rm);
      ul.appendChild(li);
    });
    main.appendChild(ul);
  }
}
