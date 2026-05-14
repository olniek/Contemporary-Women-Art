import { APP_DATA } from "../data.js";
import { wireCollectionSearch } from "../lib/collection-search-ui.js";
import { createElement, clearElement } from "../lib/dom-utils.js";
import { hasSeriesInterest, saveSeriesInterest } from "../lib/series-helpers.js";

/**
 * @param {{ navigate: (s: string, p?: object) => void }} ctx
 */
export function renderSeriesSelect(ctx) {
  const header = document.getElementById("series-header");
  clearElement(header);
  const h2 = createElement("h2", "", "Choose a Series");
  const backBtn = createElement("button", "btn-back", "← Back");
  backBtn.addEventListener("click", () => ctx.navigate("landing"));
  header.appendChild(h2);
  header.appendChild(backBtn);

  const seriesScreen = document.getElementById("screen-series-select");
  const grid = document.getElementById("series-grid");
  let searchWrap = document.getElementById("collection-search-series");
  if (!searchWrap) {
    searchWrap = createElement("div", "collection-search");
    searchWrap.id = "collection-search-series";
    seriesScreen.insertBefore(searchWrap, grid);
    wireCollectionSearch(searchWrap, APP_DATA, (hit) => {
      ctx.navigate("topic-select", {
        series: hit.seriesId,
        topic: hit.topicId,
        scrollToArtistId: hit.artistId,
      });
    });
  }

  clearElement(grid);

  Object.values(APP_DATA.series).forEach((series) => {
    const soon = series.status === "coming-soon";
    const wrap = createElement("div", "series-card-wrap");
    const card = createElement("button", "series-card");
    card.type = "button";

    const icon = createElement("span", "series-icon", series.icon);
    const lbl = createElement("span", "series-label", series.label);
    card.appendChild(icon);
    card.appendChild(lbl);

    if (soon) {
      card.classList.add("series-card--soon");
      card.appendChild(createElement("span", "series-soon", "Coming soon"));
      card.setAttribute("aria-expanded", "false");
      const panel = createElement("div", "series-soon-panel");
      panel.hidden = true;
      panel.id = `series-soon-panel-${series.id}`;
      card.setAttribute("aria-controls", panel.id);

      panel.appendChild(
        createElement(
          "p",
          "series-soon-blurb",
          series.comingSoonDescription ||
            "This discipline is still being prepared in the collection.",
        ),
      );

      const interestRow = createElement("div", "series-soon-interest-row");
      const interestBtn = createElement(
        "button",
        "btn btn-outline series-interest-btn",
        "Note interest (this browser)",
      );
      interestBtn.type = "button";
      if (hasSeriesInterest(series.id)) {
        interestBtn.textContent = "Interest saved locally";
        interestBtn.disabled = true;
      }
      interestBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        saveSeriesInterest(series.id);
        interestBtn.textContent = "Interest saved locally";
        interestBtn.disabled = true;
      });
      interestRow.appendChild(interestBtn);
      panel.appendChild(interestRow);

      card.addEventListener("click", () => {
        const wasHidden = panel.hidden;
        grid.querySelectorAll(".series-soon-panel").forEach((p) => {
          p.hidden = true;
        });
        grid.querySelectorAll(".series-card.series-card--soon").forEach((c) => {
          c.setAttribute("aria-expanded", "false");
        });
        if (wasHidden) {
          panel.hidden = false;
          card.setAttribute("aria-expanded", "true");
        }
      });

      wrap.appendChild(card);
      wrap.appendChild(panel);
    } else {
      card.addEventListener("click", () => ctx.navigate("topic-select", { series: series.id }));
      wrap.appendChild(card);
    }

    grid.appendChild(wrap);
  });
}
