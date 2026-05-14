import { searchArtists } from "./artist-search.js";
import { createElement, clearElement } from "./dom-utils.js";

/**
 * @param {HTMLElement} wrap
 * @param {typeof import("../data.js").APP_DATA} appData
 * @param {(hit: { artistId: string, seriesId: string, topicId: string, name: string, seriesLabel: string, topicLabel: string, score: number }) => void} onSelectHit
 */
export function wireCollectionSearch(wrap, appData, onSelectHit) {
  clearElement(wrap);
  const label = createElement("label", "collection-search-label", "Find an artist");
  const inputId = wrap.id + "-input";
  label.setAttribute("for", inputId);
  const input = document.createElement("input");
  input.type = "search";
  input.id = inputId;
  input.className = "collection-search-input";
  input.setAttribute("autocomplete", "off");
  input.setAttribute("aria-label", "Search artists by name or keywords");
  const list = document.createElement("ul");
  list.className = "collection-search-results";
  list.id = wrap.id + "-results";
  list.setAttribute("role", "listbox");
  list.setAttribute("aria-label", "Matching artists");
  list.hidden = true;
  input.setAttribute("aria-controls", list.id);
  input.setAttribute("aria-expanded", "false");

  function runSearch() {
    const q = input.value.trim();
    clearElement(list);
    if (q.length < 2) {
      list.hidden = true;
      input.setAttribute("aria-expanded", "false");
      return;
    }
    const hits = searchArtists(appData, q, 12);
    if (!hits.length) {
      const li = createElement("li", "collection-search-empty", "No matches");
      li.setAttribute("role", "presentation");
      list.appendChild(li);
      list.hidden = false;
      input.setAttribute("aria-expanded", "true");
      return;
    }
    hits.forEach((h) => {
      const li = createElement("li", "collection-search-hit");
      li.setAttribute("role", "option");
      li.textContent = `${h.name} — ${h.seriesLabel} · ${h.topicLabel}`;
      li.addEventListener("mousedown", (e) => {
        e.preventDefault();
      });
      li.addEventListener("click", () => {
        onSelectHit(h);
        input.value = "";
        clearElement(list);
        list.hidden = true;
        input.setAttribute("aria-expanded", "false");
      });
      list.appendChild(li);
    });
    list.hidden = false;
    input.setAttribute("aria-expanded", "true");
  }

  input.addEventListener("input", runSearch);
  wrap.appendChild(label);
  wrap.appendChild(input);
  wrap.appendChild(list);
}
