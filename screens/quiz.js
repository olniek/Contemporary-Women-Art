import { APP_DATA, getQuizQuestions, isLegacyQuizBank } from "../data.js";
import { createElement, clearElement } from "../lib/dom-utils.js";
import { createFlowStepper } from "../lib/flow-stepper.js";

/**
 * @param {{
 *   state: object,
 *   navigate: (s: string, p?: object) => void,
 *   rerenderQuiz: () => void,
 * }} ctx
 */
export function renderQuiz(ctx) {
  const series = APP_DATA.series[ctx.state.selectedSeries];
  const questions = getQuizQuestions(ctx.state.selectedSeries, ctx.state.selectedTopic);
  const qi = ctx.state.quiz.currentQuestion;
  const q = questions[qi];
  const isLast = qi === questions.length - 1;

  const header = document.getElementById("quiz-header");
  clearElement(header);
  const h2 = createElement("h2", "", series.label + " — Quiz");
  const backBtn = createElement("button", "btn-back", "← Exit Quiz");
  backBtn.addEventListener("click", () => ctx.navigate("topic-select"));
  header.appendChild(h2);
  header.appendChild(backBtn);

  const container = document.getElementById("quiz-container");
  clearElement(container);

  container.appendChild(createFlowStepper(2));

  const progress = createElement("div", "quiz-progress");
  const progressText = createElement(
    "span",
    "",
    "Question " + (qi + 1) + " of " + questions.length,
  );
  const progressBar = createElement("div", "quiz-progress-bar");
  const progressFill = createElement("div", "quiz-progress-fill");
  progressFill.style.width = ((qi + 1) / questions.length) * 100 + "%";
  progressBar.appendChild(progressFill);
  progress.appendChild(progressText);
  progress.appendChild(progressBar);

  const topicLine = createElement(
    "p",
    "quiz-topic-line",
    "Topic: " + series.topics[ctx.state.selectedTopic].label,
  );

  function appendLegacyFramingIfNeeded() {
    if (!isLegacyQuizBank(ctx.state.selectedSeries, ctx.state.selectedTopic)) return;
    container.appendChild(
      createElement(
        "p",
        "quiz-bank-framing",
        "This topic uses the shared five-question skills quiz (curatorial reading across media), not artist-by-artist trivia for the cards above.",
      ),
    );
  }

  const questionEl = createElement("p", "quiz-question", q.question);

  if (ctx.state.quiz.phase === "pick") {
    const hint = createElement(
      "p",
      "quiz-hint",
      "Choose an answer, then press Next. You can’t change an answer after you continue. There is no separate grade penalty for trying — the explanation after each question is the takeaway.",
    );
    const live = createElement("div", "sr-only");
    live.setAttribute("aria-live", "polite");
    live.setAttribute("aria-atomic", "true");

    const optionsEl = createElement("div", "quiz-options quiz-options--radios");
    q.options.forEach((optText, idx) => {
      const label = createElement("label", "quiz-radio-label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "quiz-choice";
      input.value = String(idx);
      input.className = "quiz-radio-input";
      if (ctx.state.quiz.pendingChoice === idx) input.checked = true;
      const span = createElement("span", "quiz-radio-text", optText);
      label.appendChild(input);
      label.appendChild(span);
      input.addEventListener("change", () => {
        ctx.state.quiz.pendingChoice = idx;
        syncNext();
      });
      optionsEl.appendChild(label);
    });

    const nextBtn = createElement(
      "button",
      "btn btn-filled quiz-next-btn",
      isLast ? "Next" : "Next",
    );
    nextBtn.disabled = ctx.state.quiz.pendingChoice === null;
    function syncNext() {
      const picked = container.querySelector('input[name="quiz-choice"]:checked');
      nextBtn.disabled = !picked;
      if (picked) ctx.state.quiz.pendingChoice = Number(picked.value);
    }
    nextBtn.addEventListener("click", () => {
      if (ctx.state.quiz.pendingChoice === null) return;
      ctx.state.quiz.answers[qi] = ctx.state.quiz.pendingChoice;
      ctx.state.quiz.phase = "feedback";
      ctx.rerenderQuiz();
    });

    container.appendChild(progress);
    container.appendChild(topicLine);
    appendLegacyFramingIfNeeded();
    container.appendChild(hint);
    container.appendChild(live);
    container.appendChild(questionEl);
    container.appendChild(optionsEl);
    container.appendChild(nextBtn);
    syncNext();
  } else {
    const picked = ctx.state.quiz.answers[qi];
    const ok = picked === q.correct;

    const live = createElement("div", "sr-only");
    live.setAttribute("aria-live", "polite");
    live.setAttribute("aria-atomic", "true");
    live.textContent = ok ? "Correct." : "Not quite — see the notes below for context.";

    const fb = createElement("div", "quiz-feedback-block");
    const hWhy = createElement("h3", "quiz-feedback-heading", "Why this answer");
    const pWhy = createElement("p", "quiz-feedback-text", q.explanation);
    const hCur = createElement("h3", "quiz-feedback-heading", "Curator note");
    const pCur = createElement("p", "quiz-feedback-text", q.curatorNote ?? q.explanation);
    fb.appendChild(hWhy);
    fb.appendChild(pWhy);
    fb.appendChild(hCur);
    fb.appendChild(pCur);
    fb.appendChild(
      createElement(
        "p",
        "quiz-feedback-reassurance",
        "If this felt surprising, treat it as a cue to look again at how curators connect form and context — not as a personal miss.",
      ),
    );

    const cont = createElement(
      "button",
      "btn btn-filled quiz-continue-btn",
      isLast ? "See results" : "Continue",
    );
    cont.addEventListener("click", () => {
      if (isLast) {
        ctx.navigate("result");
      } else {
        ctx.state.quiz.currentQuestion++;
        ctx.state.quiz.phase = "pick";
        ctx.state.quiz.pendingChoice = null;
        ctx.rerenderQuiz();
      }
    });

    container.appendChild(progress);
    container.appendChild(topicLine);
    appendLegacyFramingIfNeeded();
    container.appendChild(live);
    container.appendChild(questionEl);
    container.appendChild(fb);
    container.appendChild(cont);
  }
}
