import { APP_DATA, getQuizQuestions } from "./data.js";

// ── STATE ─────────────────────────────────────────────────────────────────────

const state = {
  currentScreen: "landing",
  selectedSeries: null,
  selectedTopic: null,
  quiz: {
    currentQuestion: 0,
    answers: [],
    phase: "pick",
    pendingChoice: null,
  },
  favorites: {},
};

// ── FLOW STEPPER (Explore → Quiz → Result) ───────────────────────────────────

function createFlowStepper(activeStep) {
  const wrap = createElement("div", "flow-stepper");
  wrap.setAttribute("role", "group");
  wrap.setAttribute("aria-label", "Your progress in this session");
  const steps = [
    { n: 1, label: "Explore" },
    { n: 2, label: "Quiz" },
    { n: 3, label: "Result" },
  ];
  steps.forEach((s, i) => {
    const span = createElement("span", "flow-step");
    if (s.n < activeStep) span.classList.add("flow-step--complete");
    else if (s.n === activeStep) {
      span.classList.add("flow-step--current");
      span.setAttribute("aria-current", "step");
    } else span.classList.add("flow-step--upcoming");
    span.textContent = s.label;
    wrap.appendChild(span);
    if (i < steps.length - 1) {
      const sep = createElement("span", "flow-step-sep");
      sep.setAttribute("aria-hidden", "true");
      sep.textContent = "·";
      wrap.appendChild(sep);
    }
  });
  return wrap;
}

// ── INIT ──────────────────────────────────────────────────────────────────────

function initFavorites() {
  try {
    state.favorites = JSON.parse(localStorage.getItem("wia_favorites") || "{}");
    if (!state.favorites || typeof state.favorites !== "object" || Array.isArray(state.favorites)) {
      state.favorites = {};
    }
  } catch {
    state.favorites = {};
  }
}

function saveFavorites() {
  try {
    localStorage.setItem("wia_favorites", JSON.stringify(state.favorites));
  } catch {
    /* private mode / quota */
  }
}

function init() {
  initFavorites();
  navigate("landing");
}

// ── NAVIGATION ────────────────────────────────────────────────────────────────

function navigate(screen, payload = {}) {
  if (screen === "series-select") {
    state.selectedSeries = null;
    state.selectedTopic = null;
  }

  if (screen === "topic-select") {
    if (payload.series) state.selectedSeries = payload.series;
    const topicKeys = Object.keys(APP_DATA.series[state.selectedSeries].topics);
    if (!state.selectedTopic || payload.series) {
      state.selectedTopic = topicKeys[0];
    }
  }

  if (screen === "quiz") {
    state.quiz = {
      currentQuestion: 0,
      answers: [],
      phase: "pick",
      pendingChoice: null,
    };
  }

  state.currentScreen = screen;
  renderScreen();
}

function renderScreen() {
  document.querySelectorAll(".screen").forEach((el) => el.classList.remove("active"));
  document.getElementById("screen-" + state.currentScreen).classList.add("active");

  if (state.currentScreen === "landing") renderLanding();
  if (state.currentScreen === "ask") renderAsk();
  if (state.currentScreen === "series-select") renderSeriesSelect();
  if (state.currentScreen === "topic-select") renderTopicSelect();
  if (state.currentScreen === "favorites") renderFavorites();
  if (state.currentScreen === "quiz") renderQuiz();
  if (state.currentScreen === "result") renderResult();

  focusScreen();
}

function focusScreen() {
  const screen = document.getElementById("screen-" + state.currentScreen);
  const heading = screen.querySelector("h1, h2");
  if (heading) {
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: false });
  }
}

// ── RENDER: LANDING ───────────────────────────────────────────────────────────

function renderLanding() {
  const screen = document.getElementById("screen-landing");
  clearElement(screen);

  const label = createElement("p", "landing-label", "An interactive collection");
  const title = createElement("h1", "landing-title", "Women in Contemporary Art");
  const tagline = createElement(
    "p",
    "landing-tagline",
    "Explore the artists redefining the canon — five disciplines, curated topics, flip cards, favorites, and a short quiz."
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
      " The doorway is both frame and burden—the pose keeps symbolic weight without leaving the room."
    )
  );
  figure.appendChild(img);
  figure.appendChild(cap);

  const actions = createElement("div", "landing-actions");
  const btn = createElement("button", "btn btn-filled", "Begin");
  btn.addEventListener("click", () => navigate("series-select"));
  const askBtn = createElement("button", "btn btn-outline", "Ask the collection");
  askBtn.addEventListener("click", () => navigate("ask"));
  actions.appendChild(btn);
  actions.appendChild(askBtn);

  screen.appendChild(label);
  screen.appendChild(title);
  screen.appendChild(tagline);
  screen.appendChild(figure);
  screen.appendChild(actions);
}

// ── RENDER: ASK (AI Q&A) ──────────────────────────────────────────────────────

function askApiUrl() {
  const base =
    typeof window !== "undefined" &&
    typeof window.WIA_ASK_API_URL === "string" &&
    window.WIA_ASK_API_URL.trim()
      ? window.WIA_ASK_API_URL.trim().replace(/\/$/, "")
      : "";
  return `${base}/api/ask`;
}

function renderAsk() {
  const screen = document.getElementById("screen-ask");
  clearElement(screen);

  const header = createElement("header", "screen-header ask-header");
  const h2 = createElement("h2", "", "Ask the collection");
  const backBtn = createElement("button", "btn-back", "← Back");
  backBtn.addEventListener("click", () => navigate("landing"));
  header.appendChild(h2);
  header.appendChild(backBtn);

  const intro = createElement(
    "p",
    "ask-intro",
    "Ask about the artists in this project. Answers prioritize this app’s curated entries; optional Wikipedia summaries may add biographical context (see attribution below)."
  );

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
        status.textContent =
          data.error ||
          `Something went wrong (${res.status}).`;
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
      }

      out.appendChild(ans);
      out.appendChild(sources);

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

  screen.appendChild(header);
  screen.appendChild(intro);
  screen.appendChild(form);
  screen.appendChild(status);
  screen.appendChild(out);
}

// ── RENDER: SERIES SELECT ─────────────────────────────────────────────────────

function renderSeriesSelect() {
  const header = document.getElementById("series-header");
  clearElement(header);
  const h2 = createElement("h2", "", "Choose a Series");
  const backBtn = createElement("button", "btn-back", "← Back");
  backBtn.addEventListener("click", () => navigate("landing"));
  header.appendChild(h2);
  header.appendChild(backBtn);

  const grid = document.getElementById("series-grid");
  clearElement(grid);

  Object.values(APP_DATA.series).forEach((series) => {
    const card = createElement("button", "series-card");
    const icon = createElement("span", "series-icon", series.icon);
    const lbl = createElement("span", "series-label", series.label);
    card.appendChild(icon);
    card.appendChild(lbl);
    card.addEventListener("click", () => navigate("topic-select", { series: series.id }));
    grid.appendChild(card);
  });
}

// ── RENDER: TOPIC SELECT ─────────────────────────────────────────────────────

function renderTopicSelect() {
  const series = APP_DATA.series[state.selectedSeries];

  const header = document.getElementById("topic-header");
  clearElement(header);
  const h2 = createElement("h2", "", series.label);
  const nav = createElement("div", "topic-header-actions");
  const favBtn = createElement("button", "btn-back", "Favorites");
  favBtn.addEventListener("click", () => navigate("favorites"));
  const backBtn = createElement("button", "btn-back", "← All Series");
  backBtn.addEventListener("click", () => navigate("series-select"));
  nav.appendChild(favBtn);
  nav.appendChild(backBtn);
  header.appendChild(h2);
  header.appendChild(nav);

  const screen = document.getElementById("screen-topic-select");
  let stepHost = screen.querySelector(".flow-stepper-host");
  if (!stepHost) {
    stepHost = createElement("div", "flow-stepper-host");
    const tabs = document.getElementById("topic-tabs");
    screen.insertBefore(stepHost, tabs);
  }
  clearElement(stepHost);
  stepHost.appendChild(createFlowStepper(1));

  renderTopicTabs();
  renderArtistCards();
}

function renderTopicTabs() {
  const series = APP_DATA.series[state.selectedSeries];
  const tabs = document.getElementById("topic-tabs");
  clearElement(tabs);

  Object.values(series.topics).forEach((topic) => {
    const tab = createElement("button", "topic-tab", topic.label);
    if (topic.id === state.selectedTopic) tab.classList.add("active");

    tab.addEventListener("click", () => {
      state.selectedTopic = topic.id;
      renderTopicTabs();
      renderArtistCards();
    });

    tabs.appendChild(tab);
  });

  const quizBtn = createElement("button", "btn topic-quiz-btn", "Take Quiz →");
  quizBtn.addEventListener("click", () => navigate("quiz"));
  tabs.appendChild(quizBtn);
}

function renderArtistCards() {
  const grid = document.getElementById("artist-grid");
  clearElement(grid);

  const artists = getArtistsByTopic(state.selectedSeries, state.selectedTopic);
  artists.forEach((artist) => grid.appendChild(createArtistCard(artist)));
}

function wikiSearchUrl(name) {
  return (
    "https://en.wikipedia.org/wiki/Special:Search?search=" + encodeURIComponent(name)
  );
}

function createArtistCard(artist) {
  const scene = createElement("div", "card-scene");
  const card = createElement("div", "card");
  const front = createElement("div", "card-front");

  const imageWrap = createElement("div", "card-image");
  if (artist.image) {
    const img = document.createElement("img");
    img.className = "card-image-img";
    img.src = artist.image;
    img.alt = artist.imageAlt || artist.name;
    img.loading = "lazy";
    img.addEventListener("error", () => {
      img.remove();
      imageWrap.style.backgroundColor = artist.imagePlaceholder || "#e8e8e4";
      imageWrap.setAttribute("data-image-fallback", "true");
    });
    imageWrap.appendChild(img);
  } else {
    imageWrap.style.backgroundColor = artist.imagePlaceholder;
  }

  front.appendChild(imageWrap);
  front.appendChild(createElement("h3", "card-name", artist.name));
  front.appendChild(createElement("p", "card-years", artist.years));

  const back = createElement("div", "card-back");
  const meta = createElement("div", "card-meta");
  meta.innerHTML = "<strong>" + artist.keyWork + "</strong><br>" + artist.movement;

  back.appendChild(createElement("p", "card-back-label", "Artist Insight"));
  back.appendChild(createElement("p", "card-insight", artist.insight));
  back.appendChild(meta);

  const learnP = createElement("p", "card-learn-more");
  const learnA = document.createElement("a");
  learnA.className = "card-learn-link";
  learnA.href = wikiSearchUrl(artist.name);
  learnA.target = "_blank";
  learnA.rel = "noopener noreferrer";
  learnA.textContent = "Learn more about the artist";
  learnP.appendChild(learnA);
  back.appendChild(learnP);

  card.appendChild(front);
  card.appendChild(back);
  scene.appendChild(card);

  card.setAttribute("tabindex", "0");
  card.setAttribute("role", "button");
  card.setAttribute("aria-pressed", "false");
  card.setAttribute(
    "aria-label",
    "Learn about " + artist.name + ". Activate to read insight."
  );

  card.addEventListener("click", (e) => {
    if (e.target.closest(".card-learn-link")) return;
    const flipped = card.classList.toggle("is-flipped");
    card.setAttribute("aria-pressed", String(flipped));
    card.setAttribute(
      "aria-label",
      flipped
        ? "Showing insight for " + artist.name + ". Activate to flip back."
        : "Learn about " + artist.name + ". Activate to read insight."
    );
  });

  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      if (e.target.closest(".card-learn-link")) return;
      e.preventDefault();
      card.click();
    }
  });

  const heart = createElement("button", "heart-btn", "♥");
  const isFav = !!state.favorites[artist.id];
  heart.setAttribute(
    "aria-label",
    (isFav ? "Remove " : "Add ") + artist.name + " from favorites"
  );
  if (isFav) heart.classList.add("is-favorited");

  heart.addEventListener("click", (e) => {
    e.stopPropagation();
    const nowFav = toggleFavorite(artist.id);
    heart.classList.toggle("is-favorited", nowFav);
    heart.setAttribute(
      "aria-label",
      (nowFav ? "Remove " : "Add ") + artist.name + " from favorites"
    );
  });

  scene.appendChild(heart);
  return scene;
}

// ── RENDER: FAVORITES ─────────────────────────────────────────────────────────

function collectFavoriteArtists() {
  const ids = new Set(Object.keys(state.favorites).filter((id) => state.favorites[id]));
  const out = [];
  for (const series of Object.values(APP_DATA.series)) {
    for (const topic of Object.values(series.topics)) {
      for (const artist of topic.artists) {
        if (ids.has(artist.id)) {
          out.push({
            artist,
            seriesLabel: series.label,
            topicLabel: topic.label,
          });
        }
      }
    }
  }
  out.sort((a, b) => {
    const s = a.seriesLabel.localeCompare(b.seriesLabel);
    if (s !== 0) return s;
    return a.artist.name.localeCompare(b.artist.name);
  });
  return out;
}

function renderFavorites() {
  const header = document.getElementById("favorites-header");
  clearElement(header);
  const h2 = createElement("h2", "", "Your favorites");
  const backBtn = createElement("button", "btn-back", "← Back");
  backBtn.addEventListener("click", () => {
    if (state.selectedSeries) navigate("topic-select");
    else navigate("series-select");
  });
  header.appendChild(h2);
  header.appendChild(backBtn);

  const main = document.getElementById("favorites-main");
  clearElement(main);

  const items = collectFavoriteArtists();
  if (!items.length) {
    main.appendChild(
      createElement(
        "p",
        "favorites-empty",
        "No favorites yet — tap the heart on a card to save one."
      )
    );
  } else {
    const ul = createElement("ul", "favorites-list");
    items.forEach(({ artist, seriesLabel, topicLabel }) => {
      const li = createElement("li", "favorites-item");
      const meta = createElement("div", "favorites-meta");
      meta.appendChild(createElement("div", "favorites-series", seriesLabel + " · " + topicLabel));
      meta.appendChild(createElement("strong", "", artist.name));
      meta.appendChild(createElement("p", "favorites-desc", artist.insight.slice(0, 160) + (artist.insight.length > 160 ? "…" : "")));
      const rm = createElement("button", "btn btn-outline favorites-remove", "Remove");
      rm.addEventListener("click", () => {
        delete state.favorites[artist.id];
        saveFavorites();
        renderFavorites();
      });
      li.appendChild(meta);
      li.appendChild(rm);
      ul.appendChild(li);
    });
    main.appendChild(ul);
  }
}

// ── RENDER: QUIZ ──────────────────────────────────────────────────────────────

function currentQuestions() {
  return getQuizQuestions(state.selectedSeries, state.selectedTopic);
}

function renderQuiz() {
  const series = APP_DATA.series[state.selectedSeries];
  const questions = currentQuestions();
  const qi = state.quiz.currentQuestion;
  const q = questions[qi];
  const isLast = qi === questions.length - 1;

  const header = document.getElementById("quiz-header");
  clearElement(header);
  const h2 = createElement("h2", "", series.label + " — Quiz");
  const backBtn = createElement("button", "btn-back", "← Exit Quiz");
  backBtn.addEventListener("click", () => navigate("topic-select"));
  header.appendChild(h2);
  header.appendChild(backBtn);

  const container = document.getElementById("quiz-container");
  clearElement(container);

  container.appendChild(createFlowStepper(2));

  const progress = createElement("div", "quiz-progress");
  const progressText = createElement(
    "span",
    "",
    "Question " + (qi + 1) + " of " + questions.length
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
    "Topic: " + series.topics[state.selectedTopic].label
  );

  const questionEl = createElement("p", "quiz-question", q.question);

  if (state.quiz.phase === "pick") {
    const hint = createElement(
      "p",
      "quiz-hint",
      "Choose an answer, then press Next. You can’t change an answer after you continue."
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
      if (state.quiz.pendingChoice === idx) input.checked = true;
      const span = createElement("span", "quiz-radio-text", optText);
      label.appendChild(input);
      label.appendChild(span);
      input.addEventListener("change", () => {
        state.quiz.pendingChoice = idx;
        syncNext();
      });
      optionsEl.appendChild(label);
    });

    const nextBtn = createElement(
      "button",
      "btn btn-filled quiz-next-btn",
      isLast ? "Next" : "Next"
    );
    nextBtn.disabled = state.quiz.pendingChoice === null;
    function syncNext() {
      const picked = container.querySelector('input[name="quiz-choice"]:checked');
      nextBtn.disabled = !picked;
      if (picked) state.quiz.pendingChoice = Number(picked.value);
    }
    nextBtn.addEventListener("click", () => {
      if (state.quiz.pendingChoice === null) return;
      state.quiz.answers[qi] = state.quiz.pendingChoice;
      state.quiz.phase = "feedback";
      renderQuiz();
    });

    container.appendChild(progress);
    container.appendChild(topicLine);
    container.appendChild(hint);
    container.appendChild(live);
    container.appendChild(questionEl);
    container.appendChild(optionsEl);
    container.appendChild(nextBtn);
    syncNext();
  } else {
    const picked = state.quiz.answers[qi];
    const ok = picked === q.correct;

    const live = createElement("div", "sr-only");
    live.setAttribute("aria-live", "polite");
    live.setAttribute("aria-atomic", "true");
    live.textContent = ok ? "Correct." : "Not quite — see the notes below for context.";

    const fb = createElement("div", "quiz-feedback-block");
    const hWhy = createElement("h3", "quiz-feedback-heading", "Why this answer");
    const pWhy = createElement("p", "quiz-feedback-text", q.explanation);
    const hCur = createElement("h3", "quiz-feedback-heading", "Curator note");
    const pCur = createElement("p", "quiz-feedback-text", q.curatorNote);
    fb.appendChild(hWhy);
    fb.appendChild(pWhy);
    fb.appendChild(hCur);
    fb.appendChild(pCur);

    const cont = createElement(
      "button",
      "btn btn-filled quiz-continue-btn",
      isLast ? "See results" : "Continue"
    );
    cont.addEventListener("click", () => {
      if (isLast) {
        navigate("result");
      } else {
        state.quiz.currentQuestion++;
        state.quiz.phase = "pick";
        state.quiz.pendingChoice = null;
        renderQuiz();
      }
    });

    container.appendChild(progress);
    container.appendChild(topicLine);
    container.appendChild(live);
    container.appendChild(questionEl);
    container.appendChild(fb);
    container.appendChild(cont);
  }
}

// ── RENDER: RESULT ────────────────────────────────────────────────────────────

function renderResult() {
  const questions = currentQuestions();
  const series = APP_DATA.series[state.selectedSeries];
  const total = questions.length;

  const score = state.quiz.answers.filter(
    (answer, i) => answer === questions[i].correct
  ).length;

  const pct = score / total;
  let insightText;
  if (pct === 1) insightText = "Exceptional. You have a strong grounding in this movement.";
  else if (pct >= 0.8) insightText = "Impressive. A few artists still have more to reveal.";
  else if (pct >= 0.6) insightText = "A solid start. Revisit the artist cards to go deeper.";
  else if (pct >= 0.4) insightText = "There is rich territory here to explore. Try the cards again.";
  else if (pct >= 0.2) insightText = "This is where discovery begins. Explore and return.";
  else insightText = "Every expert starts here. Explore the cards before retaking.";

  const container = document.getElementById("result-content");
  clearElement(container);

  container.appendChild(createFlowStepper(3));

  const label = createElement("p", "result-label", series.label);
  const scoreEl = createElement("div", "result-score", score + " / " + total);
  const insight = createElement("p", "result-insight", insightText);
  const actions = createElement("div", "result-actions");
  const retryBtn = createElement("button", "btn btn-filled", "Retry");
  const nextBtn = createElement("button", "btn", "Try Another Series");

  retryBtn.addEventListener("click", () => navigate("quiz"));
  nextBtn.addEventListener("click", () => navigate("series-select"));

  actions.appendChild(retryBtn);
  actions.appendChild(nextBtn);

  container.appendChild(label);
  container.appendChild(scoreEl);
  container.appendChild(insight);
  container.appendChild(actions);
}

// ── UTILITIES ─────────────────────────────────────────────────────────────────

function toggleFavorite(artistId) {
  if (state.favorites[artistId]) {
    delete state.favorites[artistId];
  } else {
    state.favorites[artistId] = true;
  }
  saveFavorites();
  return !!state.favorites[artistId];
}

function getArtistsByTopic(seriesId, topicId) {
  return APP_DATA.series[seriesId].topics[topicId].artists;
}

function createElement(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

function clearElement(el) {
  el.innerHTML = "";
}

document.addEventListener("DOMContentLoaded", init);
