---
name: wia-series-content
description: >-
  Launch or extend any discipline series in Female Contemporary Artists (data.js):
  topics, artists, editorial copy, per-topic or series quizzes, coming-soon removal, e2e.
  Use when a series shows no content, Coming soon, empty topics, or when adding artists,
  topics, or quiz banks for photography, painting, sculpture, performance, videoArt, etc.
---

# Series content and launch

## When to use

- A series shows **Coming soon** or no artist cards after tapping its card on Choose a Series.
- User asks to add or flesh out a **series, topic, artist, or quiz** in `data.js`.
- Fixing “no content” for any discipline (not only Sculpture).

All content lives in `export const APP_DATA` in [`data.js`](../../data.js). UI wiring is in `screens/` and `app.js` — change only when new fields need rendering.

## Series object

```js
painting: {
  id: "painting",           // must match key under APP_DATA.series
  label: "Painting",
  icon: "◼",
  status: "coming-soon",    // ONLY while not playable — see below
  comingSoonDescription: "...",  // optional blurb for soon panel
  topics: { /* topicId: topic */ },
  quiz: [ /* optional: exactly 5 questions, series-wide fallback */ ],
}
```

### Going live

**Remove** `status: "coming-soon"` and `comingSoonDescription` when the series should be browsable.

While `coming-soon` is set:

- Series card expands a panel only (`screens/series-select.js`) — no topic browse.
- Ask, collection search, and `#/topic/{seriesId}/{topicId}` skip the series (`lib/artist-retrieval.js`, `lib/hash-route.js`, `lib/artist-search.js`).

## Topic object

```js
identity: {
  id: "identity",
  label: "Identity",
  description: "...",   // optional; shown in .topic-description
  thesis: "...",        // optional; .topic-thesis
  keyIdeas: "...",      // optional; result screen
  result: {             // optional; rich result recap
    learnedIdeas: ["...", "..."],
    synthesis: "...",
    strongestSkill: "...",
    nextFocus: "...",
  },
  artists: [ /* artist objects */ ],
  quiz: [ /* optional: exactly 5 — overrides series bank for this tab */ ],
}
```

**Convention (new series):** 3 topics × 3 artists each. Existing series may differ slightly; always keep **≥ 2 artists** per live topic so the explore gate works (`e2e/quiz-artist-count.spec.ts`).

## Artist object

```js
{
  id: "firstname_lastname",   // snake_case, unique across entire APP_DATA
  name: "First Last",
  years: "b. 1970" | "1900–1984",
  image: "images/artists/{id}.jpg",
  imageAlt: "...",            // required when image is set
  imagePlaceholder: "#2a2a2a",
  insight: "...",               // 1–2 sentences, specific, no filler
  keyWork: "Title (YYYY)",
  movement: "Movement Name",
  wikipediaTitle: "...",      // optional; helps Ask resolve Wikipedia
}
```

New/changed portraits: [wia-artist-images](../wia-artist-images/SKILL.md).

## Quiz banks

`getQuizQuestions(seriesId, topicId)` resolution:

1. Topic `quiz` with **exactly 5** items → used on that tab.
2. Else series `quiz` with exactly 5 → shared across topics in that series.
3. Else `LEGACY_QUIZ_QUESTIONS` (generic cross-discipline bank).

```js
{
  question: "...",
  options: ["...", "...", "...", "..."],  // usually 4
  correct: 0,
  explanation: "...",
  curatorNote: "...",  // optional; UI falls back to explanation
}
```

**Patterns in repo:**

| Pattern | Example |
|---------|---------|
| Series quiz only | Photography, Painting, Performance, Sculpture (fallback) |
| Per-topic quiz | Video Art `pioneeringSingle`; Sculpture `body` / `space` / `material` |
| Legacy fallback | Topics with no 5-item topic or series bank |

Every **live** topic must resolve to 5 questions (`npm run lint:data`).

## Editorial voice

- Insights: concrete works, techniques, stakes — not “explores themes of”.
- Quiz: plausible wrong answers; test understanding.
- Copy with `description` / `thesis` / `keyIdeas` / `result`: match Photography **Identity** topic tone (see `data.js`).

## Coordinated updates

| Change | Also |
|--------|------|
| New/changed `image` | `docs/IMAGE_CREDITS.md`; `npm run check:images` |
| New series or coming-soon → live | Add/update `e2e/*.spec.ts` (e.g. `e2e/sculpture-flow.spec.ts` for Sculpture); remove obsolete coming-soon tests |
| Quiz bank rules | `e2e/quiz-data-invariant.spec.ts`, `e2e/quiz-flow.spec.ts` if behavior changes |
| Short-session tour | `SHORT_SESSION_POOL` in `data.js` |
| Ask fields (`keywords`, `wikipediaTitle`) | `test/artist-retrieval.test.mjs` if scoring changes |

## Browser cache (`lib/app-data.js`)

The UI imports `APP_DATA` via [`lib/app-data.js`](../../lib/app-data.js), which re-exports from `data.js?v=…`. **Bump that query string** whenever you change live series data so browsers do not keep an old “Coming soon” module. Also bump `app.js?v=…` in [`index.html`](../../index.html) if needed.

## Verify

```bash
npm run lint:data
npx playwright test e2e/quiz-data-invariant.spec.ts
npx playwright test e2e/quiz-artist-count.spec.ts
# plus any series-specific spec, e.g.:
# npx playwright test e2e/sculpture-flow.spec.ts
npm test
```

**Manual smoke (any live series):** Begin → choose series → heading shows series label → first topic shows cards in `#artist-grid` → topic tabs switch artists → flip 2 cards → **Take Quiz →** shows 5 questions → result recap if topic has `keyIdeas` / `result`.

## “No content” checklist

1. **`status: "coming-soon"`** still set → remove to go live.
2. **Stale `data.js`** in browser or deploy → hard refresh / redeploy.
3. **Empty or missing `artists`** on active topic → grid stays empty (`getArtistsByTopic` in `app.js`).
4. **Wrong `series.id`** vs object key → breaks hash routes and lint.

## UI flow (unchanged by content edits)

`series-select` → `navigate("topic-select", { series })` → first topic key + tabs → `screens/topic-select.js` renders `#artist-grid`.

## Current series keys (reference)

`photography`, `painting`, `sculpture`, `performance`, `videoArt` — inspect `APP_DATA.series` before editing; never duplicate `artist.id` across the file.
