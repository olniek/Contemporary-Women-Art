import { APP_DATA, getQuizQuestions } from "../data.js";
import { markTopicQuizDone } from "../lib/session-place.js";
import { createElement, clearElement } from "../lib/dom-utils.js";
import { createFlowStepper } from "../lib/flow-stepper.js";

/**
 * @param {{
 *   state: object,
 *   navigate: (s: string, p?: object) => void,
 *   getCurrentTopic: () => object,
 *   hasAnotherTopicInSeries: () => boolean,
 *   advanceToNextTopicInSeries: () => void,
 *   favoriteInsightsForCurrentTopic: (n?: number) => object[],
 *   collectFavoriteArtists: () => unknown[],
 * }} ctx
 */
export function renderResult(ctx) {
  const questions = getQuizQuestions(ctx.state.selectedSeries, ctx.state.selectedTopic);
  const series = APP_DATA.series[ctx.state.selectedSeries];
  const topic = ctx.getCurrentTopic();
  const total = questions.length;

  const score = ctx.state.quiz.answers.filter(
    (answer, i) => answer === questions[i].correct,
  ).length;

  markTopicQuizDone(ctx.state.selectedSeries, ctx.state.selectedTopic);

  const pct = score / total;
  let insightText;
  if (pct === 1) insightText = "Exceptional. You have a strong grounding in this movement.";
  else if (pct >= 0.8) insightText = "Impressive. A few artists still have more to reveal.";
  else if (pct >= 0.6) insightText = "A solid start. Revisit the artist cards to go deeper.";
  else if (pct >= 0.4)
    insightText = "There is rich territory here to explore. Try the cards again.";
  else if (pct >= 0.2) insightText = "This is where discovery begins. Explore and return.";
  else insightText = "Every expert starts here. Explore the cards before retaking.";

  const keyIdeasText =
    topic.keyIdeas ??
    "Take another pass through the artworks—patterns across artists often click on the second look.";

  const res = topic.result;
  const learnedIdeas = Array.isArray(res?.learnedIdeas) ? res.learnedIdeas : [];

  const container = document.getElementById("result-content");
  clearElement(container);

  container.appendChild(createElement("h2", "result-title", "How you did"));
  container.appendChild(createFlowStepper(3));

  container.appendChild(
    createElement(
      "p",
      "result-series-blurb",
      "A calm recap before you choose what to explore next.",
    ),
  );
  container.appendChild(
    createElement(
      "p",
      "result-psych-note",
      "Wrong answers are part of learning here — each line in the recap below is context, not a judgment of you.",
    ),
  );

  const label = createElement("p", "result-label", series.label);
  const scoreEl = createElement("div", "result-score", score + " / " + total);
  const insight = createElement("p", "result-insight", insightText);

  const keyBlock = createElement("div", "result-key-ideas");
  keyBlock.appendChild(createElement("h3", "result-section-heading", "Key ideas from the topic"));
  keyBlock.appendChild(createElement("p", "result-section-text", keyIdeasText));
  if (res?.synthesis) {
    keyBlock.appendChild(createElement("p", "result-skill-line", "Synthesis — " + res.synthesis));
  }
  if (res?.strongestSkill) {
    keyBlock.appendChild(
      createElement("p", "result-skill-line", "Strongest skill — " + res.strongestSkill),
    );
  }
  if (res?.nextFocus) {
    keyBlock.appendChild(createElement("p", "result-skill-line", "Next focus — " + res.nextFocus));
  }

  container.appendChild(label);
  container.appendChild(scoreEl);
  container.appendChild(insight);
  container.appendChild(keyBlock);

  if (learnedIdeas.length) {
    const learned = createElement("div", "result-learned");
    learned.appendChild(createElement("h3", "result-section-heading", "What you practiced"));
    const ul = document.createElement("ul");
    ul.className = "result-learned-list";
    learnedIdeas.forEach((idea) => {
      ul.appendChild(createElement("li", "", idea));
    });
    learned.appendChild(ul);
    container.appendChild(learned);
  }

  const saved = ctx.favoriteInsightsForCurrentTopic(3);
  const totalFav = ctx.collectFavoriteArtists().length;
  if (saved.length) {
    const favBlock = createElement("div", "result-saved-insights");
    favBlock.appendChild(
      createElement("h3", "result-section-heading", "Saved insights from this topic"),
    );
    favBlock.appendChild(
      createElement(
        "p",
        "result-saved-lead",
        "Artists you hearted while exploring this topic. Your full list is in Favorites.",
      ),
    );
    const ul = document.createElement("ul");
    ul.className = "result-saved-list";
    saved.forEach((a) => {
      const li = document.createElement("li");
      const strong = document.createElement("strong");
      strong.textContent = a.name;
      li.appendChild(strong);
      li.appendChild(document.createTextNode(": " + a.insight));
      ul.appendChild(li);
    });
    favBlock.appendChild(ul);
    if (totalFav > saved.length) {
      favBlock.appendChild(
        createElement(
          "p",
          "result-section-text",
          `You have ${totalFav} saved across the whole collection.`,
        ),
      );
    }
    const viewAllSaved = createElement(
      "button",
      "btn btn-outline result-favorites-cta",
      "View all favorites",
    );
    viewAllSaved.addEventListener("click", () => ctx.navigate("favorites"));
    favBlock.appendChild(viewAllSaved);
    container.appendChild(favBlock);
  } else if (totalFav) {
    const callout = createElement("div", "result-favorites-callout");
    callout.appendChild(createElement("h3", "result-section-heading", "Your favorites"));
    callout.appendChild(
      createElement(
        "p",
        "result-section-text",
        "You have saved artists in other topics — open the full list to review them.",
      ),
    );
    const viewAllSaved = createElement(
      "button",
      "btn btn-outline result-favorites-cta",
      "View all favorites",
    );
    viewAllSaved.addEventListener("click", () => ctx.navigate("favorites"));
    callout.appendChild(viewAllSaved);
    container.appendChild(callout);
  }

  const recap = createElement("div", "result-recap");
  recap.appendChild(createElement("h3", "result-section-heading", "Review answers"));
  questions.forEach((q, i) => {
    const ans = ctx.state.quiz.answers[i];
    const correct = ans === q.correct;
    const labelAns =
      typeof ans === "number" && q.options[ans] != null ? q.options[ans] : "(nothing chosen)";
    const item = createElement("div", "result-recap-item");
    item.classList.add(correct ? "result-recap-item--correct" : "result-recap-item--miss");
    const head = createElement("div", "result-recap-item-head");
    head.appendChild(createElement("span", "result-recap-qnum", "Question " + (i + 1)));
    head.appendChild(
      createElement("span", "result-recap-badge", correct ? "Correct" : "Incorrect"),
    );
    item.appendChild(head);
    item.appendChild(createElement("p", "result-recap-question", q.question));
    const pickedRow = createElement("p", "result-recap-picked");
    pickedRow.appendChild(createElement("span", "result-recap-picked-label", "Your answer: "));
    pickedRow.appendChild(document.createTextNode(labelAns));
    item.appendChild(pickedRow);
    if (!correct) {
      const right = createElement("p", "result-recap-correct-line");
      right.appendChild(createElement("span", "result-recap-picked-label", "Correct option: "));
      right.appendChild(document.createTextNode(q.options[q.correct]));
      item.appendChild(right);
    }
    recap.appendChild(item);
  });
  container.appendChild(recap);

  const shareRow = createElement("div", "result-share-row");
  shareRow.appendChild(
    createElement("p", "result-share-hint", "Share a text summary of this run (no image)."),
  );
  const shareBtn = createElement(
    "button",
    "btn btn-outline",
    typeof navigator !== "undefined" && typeof navigator.share === "function"
      ? "Share result"
      : "Copy summary",
  );
  shareBtn.type = "button";
  shareBtn.addEventListener("click", async () => {
    const text = `Female Contemporary Artists — ${series.label}: ${topic.label}. Quiz score ${score}/${total}.`;
    try {
      if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
        await navigator.share({ title: "Female Contemporary Artists", text });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      }
    } catch (e) {
      if (e && e.name !== "AbortError" && navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          /* */
        }
      }
    }
  });
  shareRow.appendChild(shareBtn);
  container.appendChild(shareRow);

  const actions = createElement("div", "result-actions");
  const retryBtn = createElement("button", "btn btn-filled", "Retry");
  const exploreBtn = createElement(
    "button",
    "btn btn-filled",
    ctx.hasAnotherTopicInSeries() ? "Explore another topic" : "Review this topic",
  );
  const seriesBtn = createElement("button", "btn", "Try another series");
  const startOverBtn = createElement("button", "btn btn-outline", "Start over");

  retryBtn.addEventListener("click", () => ctx.navigate("quiz"));
  exploreBtn.addEventListener("click", () => {
    if (ctx.hasAnotherTopicInSeries()) ctx.advanceToNextTopicInSeries();
    ctx.navigate("topic-select");
  });
  seriesBtn.addEventListener("click", () => ctx.navigate("series-select"));
  startOverBtn.addEventListener("click", () => ctx.navigate("landing"));

  actions.appendChild(retryBtn);
  actions.appendChild(exploreBtn);
  actions.appendChild(seriesBtn);
  if (totalFav) {
    const favAction = createElement("button", "btn btn-outline", `All favorites (${totalFav})`);
    favAction.addEventListener("click", () => ctx.navigate("favorites"));
    actions.appendChild(favAction);
  }
  actions.appendChild(startOverBtn);

  container.appendChild(actions);
}
