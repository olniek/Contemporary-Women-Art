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

**Navigation flow:** landing → series-select → topic-select → quiz → result. **Ask** is reachable from topic-select and quiz (`Ask the collection`); back returns to the screen you came from. Favorites is reachable from topic-select and returns to topic-select or series-select.

All screen transitions go through `navigate(screen, payload)` in `app.js`. Never manipulate screen visibility outside of that function.

## File structure

- `index.html` — HTML shell; meta/OG tags. Content is injected by JS.
- `style.css` — CSS custom properties, screen visibility, flip cards, quiz, flow stepper, favorites.
- `data.js` — `APP_DATA`, `LEGACY_QUIZ_QUESTIONS`, `getQuizQuestions(seriesId, topicId)` (source of truth for content).
- `lib/app-data.js` — versioned re-export of `data.js` for the browser (bump `?v=` when live content changes so caches reload).
- `app.js` — state, navigation, rendering (ES module; imports `lib/app-data.js`).
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

`npm test` runs Playwright (desktop Chromium on all `e2e/*.spec.ts` except `mobile-smoke`, plus Mobile Chrome on [`e2e/mobile-smoke.spec.ts`](e2e/mobile-smoke.spec.ts) only), `check:images`, then `npm run test:unit`, which runs `node --test test/*.test.mjs`. Every file matching that glob is included (quiz bank resolution via `getQuizQuestions`, Ask retrieval scoring, `api/ask` handler branches with mocks). Add new suites only as `test/<name>.test.mjs` so they are picked up automatically. Use `npm run format` / `npm run format:check` for Prettier on `e2e/`, `screens/`, and `lib/`.

## app.js layout

1. `state` — current screen, series/topic, quiz phase (`pick` | `feedback`), favorites
2. `init / initFavorites / saveFavorites` — entry point; storage uses try/catch
3. `navigate / renderScreen` — only functions that change screens
4. Render helpers: `renderLanding`, `renderAsk`, `renderSeriesSelect`, `renderTopicSelect`, `renderFavorites`, `renderQuiz`, `renderResult`, `createArtistCard`, etc.
5. Utilities: `toggleFavorite`, `getArtistsByTopic`, `createElement`, `clearElement`, `createFlowStepper`

## Key implementation details

**Flip cards** require three nested elements: `.card-scene` (perspective host, stationary), `.card` (rotates on `.is-flipped`), `.card-front` / `.card-back` (both need `backface-visibility: hidden`; back is pre-rotated 180deg in CSS). The heart button lives on `.card-scene`, not inside `.card`, so it never flips.

**Favorites** are stored in `localStorage` as `{ artistId: true }` under the key `"wia_favorites"` (reads/writes wrapped in try/catch).

**Adding content** — to add an artist, append an object to a topic’s `artists` array in `data.js`. Use `image: "images/artists/{artist.id}.jpg"` (or `.png` / `.svg`) and `imageAlt`. See [`docs/IMAGE_CREDITS.md`](docs/IMAGE_CREDITS.md). For sourcing bundled portraits from Wikimedia (or similar) via the manifest and download script, follow [`.cursor/skills/wia-artist-images/SKILL.md`](.cursor/skills/wia-artist-images/SKILL.md). For launching or extending a whole series (topics, copy, quizzes, removing `coming-soon`), follow [`.cursor/skills/wia-series-content/SKILL.md`](.cursor/skills/wia-series-content/SKILL.md). Run `npm run check:images` after changing files. To add a per-topic quiz, add a `quiz` array of exactly 5 question objects to that topic. Optional `wikipediaTitle` helps the Ask feature resolve the correct English Wikipedia page when the article title differs from `name`.

**After changing live `APP_DATA`** — bump `APP_ASSET_VERSION` in [`lib/app-version.js`](lib/app-version.js) and the matching `app.js?v=` on the script tag in [`index.html`](index.html) so browsers do not keep a stale module (for example an old “Coming soon” series). `lib/app-data.js` reads the version automatically. Redeploy on Vercel after pushing.

## Ask (AI Q&A)

- **Static server only** (`python3 -m http.server`): `POST /api/ask` is not available on that origin; the Ask UI shows a hosting hint unless you point Ask at another host (see **Cross-origin API** below) or use `vercel dev` / a full deploy.
- **Vercel:** deploy the repo; set **`OPENAI_API_KEY`** for **Production** (and Preview if you use preview URLs). Redeploy after changing env. Optional `OPENAI_MODEL`; optional fallback env name `OPENAI_KEY` only if `OPENAI_API_KEY` is unset. Local testing: `npx vercel dev` (loads `.env.local` — copy [`.env.example`](.env.example) and add your key).
- **503 missing OPENAI_API_KEY:** almost always wrong environment scope in Vercel or needs redeploy — see [README.md](README.md) troubleshooting table.
- **Cross-origin API:** if the static site and API differ, set the API origin before `app.js` loads. Easiest in-repo: `<meta name="wia-ask-api-url" content="https://your-deployment.vercel.app">` in [`index.html`](index.html) (no trailing slash; a small inline script sets `window.WIA_ASK_API_URL`). Alternatively assign `window.WIA_ASK_API_URL` in your own inline script above the `app.js` tag. On the API deployment, set **`WIA_CORS_ORIGIN`** to the static site origin so `Access-Control-Allow-Origin` matches the browser page (see [README.md](README.md)).
- **Verify deployment:** `npm run curl:ask -- https://your-deployment.vercel.app`

## Git workflow

Use **feature branches** for experimental work; keep `main` stable until you merge. See [README.md](README.md) → **Git branches**.
