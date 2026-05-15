import { APP_DATA } from "../lib/app-data.js";
import { askApiUrl, probeAskEndpointStatus } from "../lib/ask-client.js";
import { createElement, clearElement } from "../lib/dom-utils.js";

/**
 * @param {{
 *   navigate: (s: string, p?: object) => void,
 *   askReturnScreen?: string,
 * }} ctx
 */
export function renderAsk(ctx) {
  const screen = document.getElementById("screen-ask");
  clearElement(screen);

  const header = createElement("header", "screen-header ask-header");
  const h2 = createElement("h2", "", "Ask the collection");
  const backBtn = createElement("button", "btn-back", "← Back");
  const returnTo = ctx.askReturnScreen ?? "landing";
  backBtn.addEventListener("click", () => ctx.navigate(returnTo));
  header.appendChild(h2);
  header.appendChild(backBtn);

  const intro = createElement(
    "p",
    "ask-intro",
    "Ask about the artists in this project. Answers prioritize this app’s curated entries; optional Wikipedia summaries may add biographical context (see attribution below). Include an artist’s name when you want the answer focused on one person. After an answer, you can jump straight to a matching topic in the app when the response lists curated context.",
  );

  const howBtn = createElement("button", "btn btn-outline ask-how-btn", "How Ask works");
  const howPanel = createElement("div", "ask-how-panel");
  howPanel.hidden = true;
  howPanel.setAttribute("role", "region");
  howPanel.setAttribute("aria-label", "How Ask works");
  howPanel.appendChild(
    createElement(
      "p",
      "ask-how-text",
      "The server searches your question against this app’s artist entries, then asks a language model to answer using that context. Optional short summaries from English Wikipedia may be added when an article title is known. This is not an open web search.",
    ),
  );
  howBtn.addEventListener("click", () => {
    howPanel.hidden = !howPanel.hidden;
    howBtn.setAttribute("aria-expanded", howPanel.hidden ? "false" : "true");
  });
  howBtn.setAttribute("aria-expanded", "false");
  howBtn.setAttribute("aria-controls", "ask-how-panel");
  howPanel.id = "ask-how-panel";

  const envHint = createElement("p", "ask-hosting-note");
  envHint.setAttribute("role", "note");
  envHint.hidden = true;
  if (typeof window !== "undefined" && window.location.protocol === "file:") {
    envHint.hidden = false;
    envHint.textContent =
      "Opened as a local file: Ask needs http(s) with a serverless host (for example npx vercel dev) or a deployment.";
  } else {
    probeAskEndpointStatus().then((st) => {
      if (st === "ok") return;
      envHint.hidden = false;
      if (st === "missing_key") {
        envHint.textContent =
          "The Ask API is reachable but the server is missing OPENAI_API_KEY (or the key is invalid). Configure the key on your host and redeploy.";
        return;
      }
      envHint.textContent =
        st === "network"
          ? "Could not reach /api/ask. Deploy with serverless (for example Vercel with OPENAI_API_KEY) or run npx vercel dev locally."
          : "No Ask route found on this host (typical for python -m http.server). Deploy with serverless, run npx vercel dev, or set window.WIA_ASK_API_URL before loading the app.";
    });
  }

  const form = createElement("div", "ask-form");
  const ta = document.createElement("textarea");
  ta.className = "ask-input";
  ta.rows = 4;
  ta.setAttribute("aria-label", "Your question");
  ta.placeholder = "e.g. Who uses kitchen-table staging to explore Black women’s lives?";

  const submit = createElement("button", "btn btn-filled", "Submit");

  const status = createElement("p", "ask-status");
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");

  const out = createElement("div", "ask-response");

  submit.addEventListener("click", async () => {
    const q = ta.value.trim();
    if (!q) {
      status.textContent = "Enter a question first.";
      return;
    }
    status.textContent = "Thinking…";
    submit.disabled = true;
    out.innerHTML = "";
    try {
      const res = await fetch(askApiUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      let data = {};
      try {
        data = await res.json();
      } catch {
        /* non-JSON */
      }
      if (!res.ok) {
        status.textContent = data.error || `Something went wrong (${res.status}).`;
        if (res.status === 404) {
          status.textContent +=
            " This build may not include /api/ask — use a deployment with serverless (e.g. Vercel) or run `npx vercel dev`.";
        }
        return;
      }
      status.textContent = "";
      const ans = createElement("div", "ask-answer");
      ans.style.whiteSpace = "pre-wrap";
      ans.textContent = data.answer || "";

      const sources = createElement("div", "ask-sources");
      const openInApp = createElement("div", "ask-open-in-app");
      let openInAppHas = false;
      const seenTopics = new Set();
      if (Array.isArray(data.sources) && data.sources.length) {
        const sh = createElement("p", "ask-sources-title", "Curated context included:");
        sources.appendChild(sh);
        const ul = document.createElement("ul");
        ul.className = "ask-sources-list";
        data.sources.forEach((s) => {
          const li = document.createElement("li");
          li.textContent = `${s.name} (${s.id}) — ${s.topic}`;
          ul.appendChild(li);
        });
        sources.appendChild(ul);

        data.sources.forEach((s) => {
          const sid = s.seriesId;
          const tid = s.topicId;
          if (!sid || !tid) return;
          const key = `${sid}:${tid}`;
          if (seenTopics.has(key)) return;
          const seriesObj = APP_DATA.series[sid];
          const topicObj = seriesObj?.topics?.[tid];
          if (!seriesObj || !topicObj || seriesObj.status === "coming-soon") return;
          seenTopics.add(key);
          if (!openInAppHas) {
            openInApp.appendChild(
              createElement("p", "ask-open-in-app-title", "Explore in the app"),
            );
            openInAppHas = true;
          }
          const openBtn = createElement(
            "button",
            "btn btn-outline ask-open-topic-btn",
            `Open “${topicObj.label}” in ${seriesObj.label}`,
          );
          openBtn.addEventListener("click", () =>
            ctx.navigate("topic-select", { series: sid, topic: tid }),
          );
          openInApp.appendChild(openBtn);
        });

        if (data.sources.length === 1) {
          const s0 = data.sources[0];
          const sid = s0.seriesId;
          const tid = s0.topicId;
          const aid = s0.id;
          const seriesObj = APP_DATA.series[sid];
          const topicObj = seriesObj?.topics?.[tid];
          if (
            sid &&
            tid &&
            aid &&
            seriesObj &&
            topicObj &&
            seriesObj.status !== "coming-soon" &&
            topicObj.artists?.some((a) => a.id === aid)
          ) {
            if (!openInAppHas) {
              openInApp.appendChild(
                createElement("p", "ask-open-in-app-title", "Explore in the app"),
              );
              openInAppHas = true;
            }
            const focusBtn = createElement(
              "button",
              "btn btn-outline ask-open-topic-btn",
              `Focus ${s0.name} in the grid`,
            );
            focusBtn.addEventListener("click", () =>
              ctx.navigate("topic-select", { series: sid, topic: tid, scrollToArtistId: aid }),
            );
            openInApp.appendChild(focusBtn);
          }
        }
      }

      out.appendChild(ans);
      if (sources.childNodes.length) out.appendChild(sources);
      if (openInAppHas) out.appendChild(openInApp);

      if (data.wikipedia && data.wikipedia.length) {
        const wikiNote = createElement("p", "ask-wiki-attribution");
        wikiNote.innerHTML =
          'Supplementary text may include summaries from <a href="https://en.wikipedia.org" target="_blank" rel="noopener noreferrer">Wikipedia</a> (often <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA</a>). Use the article links in the answer for full attribution.';
        out.appendChild(wikiNote);
      }
    } catch {
      status.textContent =
        "Could not reach the Ask service. Static hosting alone has no /api/ask — deploy with serverless (e.g. Vercel with OPENAI_API_KEY) or run `npx vercel dev` locally.";
    } finally {
      submit.disabled = false;
    }
  });

  form.appendChild(ta);
  form.appendChild(submit);

  const howWrap = createElement("div", "ask-how-wrap");
  howWrap.appendChild(howBtn);
  howWrap.appendChild(howPanel);

  screen.appendChild(header);
  screen.appendChild(intro);
  screen.appendChild(howWrap);
  screen.appendChild(envHint);
  screen.appendChild(form);
  screen.appendChild(status);
  screen.appendChild(out);
}
