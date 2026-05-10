# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the app

**Recommended:** serve the project root with a static server so image paths (`images/...`) resolve (same as opening from `file://`, but avoids any browser restrictions on modules or assets):

```bash
python3 -m http.server 8000
```

Then open `http://127.0.0.1:8000/index.html`.

You can also open `index.html` directly in a browser; ES modules and relative image URLs should work from the repo root.

## Architecture

Single-page app with 7 screens (landing, **ask**, series-select, topic-select, favorites, quiz, result). All screens exist in `index.html` as empty `<section class="screen">` containers. JavaScript controls visibility by toggling the `active` class.

**Navigation flow:** landing → series-select → topic-select → quiz → result. **Ask** is reachable from landing (`Ask the collection`). Favorites is reachable from topic-select and returns to topic-select or series-select.

All screen transitions go through `navigate(screen, payload)` in `app.js`. Never manipulate screen visibility outside of that function.

## File structure

- `index.html` — HTML shell; meta/OG tags. Content is injected by JS.
- `style.css` — CSS custom properties, screen visibility, flip cards, quiz, flow stepper, favorites.
- `data.js` — `APP_DATA`, `LEGACY_QUIZ_QUESTIONS`, `getQuizQuestions(seriesId, topicId)`.
- `app.js` — state, navigation, rendering (ES module; imports `data.js`).
- `lib/artist-retrieval.js` — flatten `APP_DATA` artists and keyword scoring for Ask / `api/ask`.
- `api/ask.js` — Vercel serverless `POST /api/ask` (OpenAI + optional Wikipedia summaries). Requires `OPENAI_API_KEY`; see `.env.example`.

## Quiz data rules

- If a **topic** has `quiz` with **exactly 5** items, that bank is used.
- Else if the **series** has `quiz` with **exactly 5** items, that bank is used.
- Else **`LEGACY_QUIZ_QUESTIONS`** (5 items) is used.

Each question supports `curatorNote` (optional); if omitted, `explanation` is reused for the “Curator note” panel.

## Automated tests

```bash
npm ci
npm test
```

`postinstall` installs Playwright Chromium. Unset `PLAYWRIGHT_BROWSERS_PATH` if it points at a cache from another architecture (see project 1 README pattern).

## app.js layout

1. `state` — current screen, series/topic, quiz phase (`pick` | `feedback`), favorites
2. `init / initFavorites / saveFavorites` — entry point; storage uses try/catch
3. `navigate / renderScreen` — only functions that change screens
4. Render helpers: `renderLanding`, `renderAsk`, `renderSeriesSelect`, `renderTopicSelect`, `renderFavorites`, `renderQuiz`, `renderResult`, `createArtistCard`, etc.
5. Utilities: `toggleFavorite`, `getArtistsByTopic`, `createElement`, `clearElement`, `createFlowStepper`

## Key implementation details

**Flip cards** require three nested elements: `.card-scene` (perspective host, stationary), `.card` (rotates on `.is-flipped`), `.card-front` / `.card-back` (both need `backface-visibility: hidden`; back is pre-rotated 180deg in CSS). The heart button lives on `.card-scene`, not inside `.card`, so it never flips.

**Favorites** are stored in `localStorage` as `{ artistId: true }` under the key `"wia_favorites"` (reads/writes wrapped in try/catch).

**Adding content** — to add an artist, append an object to a topic’s `artists` array in `data.js`. Use `image: "images/artists/{artist.id}.jpg"` (or `.png` / `.svg`) and `imageAlt`. See [`docs/IMAGE_CREDITS.md`](docs/IMAGE_CREDITS.md). Run `npm run check:images` after changing files. To add a per-topic quiz, add a `quiz` array of exactly 5 question objects to that topic. Optional `wikipediaTitle` helps the Ask feature resolve the correct English Wikipedia page when the article title differs from `name`.

## Ask (AI Q&A)

- **Static server only** (`python3 -m http.server`): `POST /api/ask` is not available; the Ask UI shows an error unless you use a host that runs serverless functions.
- **Vercel:** deploy the repo; set **`OPENAI_API_KEY`** for **Production** (and Preview if you use preview URLs). Redeploy after changing env. Optional `OPENAI_MODEL`; optional fallback env name `OPENAI_KEY` only if `OPENAI_API_KEY` is unset. Local testing: `npx vercel dev` (loads `.env.local`).
- **503 missing OPENAI_API_KEY:** almost always wrong environment scope in Vercel or needs redeploy — see [README.md](README.md) troubleshooting table.
- **Cross-origin API:** set `window.WIA_ASK_API_URL = "https://your-deployment.vercel.app"` before `app.js` loads if the static site and API live on different origins.
- **Verify deployment:** `npm run curl:ask -- https://your-deployment.vercel.app`

## Git workflow

Use **feature branches** for experimental work; keep `main` stable until you merge. See [README.md](README.md) → **Git branches**.
