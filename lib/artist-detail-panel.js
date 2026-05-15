import { createElement, clearElement } from "./dom-utils.js";
import { fetchWikiSummary, wikiTitleForArtist } from "./wiki-summary.js";
import { wikiSearchUrl } from "./wiki-helpers.js";

/** @type {HTMLDialogElement | null} */
let dialogEl = null;
/** @type {HTMLElement | null} */
let lastTrigger = null;

function ensureDialog() {
  if (dialogEl) return dialogEl;
  dialogEl = document.createElement("dialog");
  dialogEl.className = "artist-detail-dialog";
  dialogEl.id = "artist-detail-dialog";
  document.body.appendChild(dialogEl);
  return dialogEl;
}

/**
 * @param {object} artist
 * @param {{ topicLabel?: string, onAskFollowUp?: (question: string) => void }} options
 */
export function openArtistDetailPanel(artist, options = {}) {
  const dialog = ensureDialog();
  lastTrigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;

  clearElement(dialog);

  const panel = createElement("div", "artist-detail-panel");
  const titleId = "artist-detail-title";
  const title = createElement("h2", "artist-detail-name", artist.name);
  title.id = titleId;
  dialog.setAttribute("aria-labelledby", titleId);

  const years = createElement("p", "artist-detail-years", artist.years);
  panel.appendChild(title);
  panel.appendChild(years);

  panel.appendChild(createElement("p", "artist-detail-label", "Artist insight"));
  panel.appendChild(createElement("p", "artist-detail-insight", artist.insight));

  const meta = createElement("div", "artist-detail-meta");
  meta.innerHTML = "<strong>" + artist.keyWork + "</strong><br>" + artist.movement;
  panel.appendChild(meta);

  const wikiSection = createElement("div", "artist-detail-wiki");
  wikiSection.setAttribute("aria-live", "polite");
  wikiSection.appendChild(createElement("p", "artist-detail-wiki-status", "Loading background…"));
  panel.appendChild(wikiSection);

  const footer = createElement("div", "artist-detail-footer");
  const wikiLink = document.createElement("a");
  wikiLink.className = "artist-detail-wiki-link";
  wikiLink.href = wikiSearchUrl(artist.name);
  wikiLink.target = "_blank";
  wikiLink.rel = "noopener noreferrer";
  wikiLink.textContent = "Read full article on Wikipedia";
  footer.appendChild(wikiLink);
  panel.appendChild(footer);

  const actions = createElement("div", "artist-detail-actions");
  const closeBtn = createElement("button", "btn btn-outline artist-detail-close", "Close");
  closeBtn.type = "button";
  closeBtn.addEventListener("click", () => dialog.close());

  actions.appendChild(closeBtn);
  if (options.onAskFollowUp) {
    const askBtn = createElement("button", "btn btn-filled artist-detail-ask", "Ask a follow-up");
    askBtn.type = "button";
    const topicBit = options.topicLabel ? ` and how their work relates to ${options.topicLabel}` : "";
    askBtn.addEventListener("click", () => {
      dialog.close();
      options.onAskFollowUp(
        `Tell me more about ${artist.name} — their practice${topicBit}.`,
      );
    });
    actions.appendChild(askBtn);
  }
  panel.appendChild(actions);

  dialog.appendChild(panel);

  dialog.addEventListener(
    "close",
    () => {
      if (lastTrigger && typeof lastTrigger.focus === "function") {
        lastTrigger.focus();
      }
      lastTrigger = null;
    },
    { once: true },
  );

  dialog.showModal();

  const titleForWiki = wikiTitleForArtist(artist);
  fetchWikiSummary(titleForWiki).then((wiki) => {
    if (!dialog.open) return;
    clearElement(wikiSection);
    if (wiki?.extract) {
      wikiSection.appendChild(createElement("p", "artist-detail-label", "From Wikipedia"));
      wikiSection.appendChild(createElement("p", "artist-detail-wiki-extract", wiki.extract));
      const license = wiki.license_short_description || "CC BY-SA";
      wikiSection.appendChild(
        createElement("p", "artist-detail-wiki-license", `Summary licensed ${license}.`),
      );
      if (wiki.pageUrl) {
        wikiLink.href = wiki.pageUrl;
        wikiLink.textContent = `Read full article: ${wiki.title || titleForWiki}`;
      }
    }
  });
}
