# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the app

Open `index.html` directly in a browser — no build step or server required.

## Architecture

Single-page app with 5 screens (landing, series-select, topic-select, quiz, result). All screens exist in `index.html` as empty `<section class="screen">` containers. JavaScript controls visibility by toggling the `active` class.

**Navigation flow:** landing → series-select → topic-select → quiz → result

All screen transitions go through `navigate(screen, payload)` in `script.js`. Never manipulate screen visibility outside of that function.

## File structure

- `index.html` — HTML shell only; no content is hardcoded. All text/DOM is injected by JS.
- `style.css` — CSS custom properties in `:root`, screen visibility system, flip card 3D technique.
- `script.js` — All data, state, and logic in one file.

## script.js layout

1. `APP_DATA` — all series, topics, artists, and quiz questions as plain objects
2. `state` — single object tracking current screen, selected series/topic, quiz progress, favorites
3. `init / initFavorites / saveFavorites` — entry point and localStorage helpers
4. `navigate / renderScreen` — the only functions that should change screens
5. Render functions: `renderLanding`, `renderSeriesSelect`, `renderTopicSelect`, `renderTopicTabs`, `renderArtistCards`, `createArtistCard`, `renderQuiz`, `handleQuizAnswer`, `renderResult`
6. Utilities: `toggleFavorite`, `getArtistsByTopic`, `getQuizQuestions`, `createElement`, `clearElement`

## Key implementation details

**Flip cards** require three nested elements: `.card-scene` (perspective host, stationary), `.card` (rotates on `.is-flipped`), `.card-front` / `.card-back` (both need `backface-visibility: hidden`; back is pre-rotated 180deg in CSS). The heart button lives on `.card-scene`, not inside `.card`, so it never flips.

**Favorites** are stored in `localStorage` as `{ artistId: true }` under the key `"wia_favorites"`.

**Adding content** — to add an artist, append an object to any `topics[x].artists` array in `APP_DATA`. To add a series, follow the existing pattern in `APP_DATA.series`.
