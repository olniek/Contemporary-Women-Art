# Female Contemporary Artist 1

An interactive web app for learning contemporary art through women artists — exploration by discipline and topic, flip cards with curator-style insights, favorites, a short quiz, and optional **Ask the collection** (AI Q&A grounded in this project’s data).

## Run locally (static)

Serve the repo root so `images/` and ES modules resolve reliably:

```bash
python3 -m http.server 8000
```

Open `http://127.0.0.1:8000/index.html`.

Browsing this way runs **only** the front-end. The **Ask** screen needs a serverless host or local `vercel dev` (see below).

**Need Ask working soon?** Follow the plain-language checklist: [`docs/ASK-BY-TOMORROW.md`](docs/ASK-BY-TOMORROW.md).

## Ask the collection (AI Q&A)

The landing page links to **Ask the collection**, which calls `POST /api/ask`:

- **Implementation:** [`api/ask.js`](api/ask.js) — keyword retrieval over [`data.js`](data.js), optional English Wikipedia summaries, then OpenAI (`gpt-4o-mini` by default).
- **Secrets:** set `OPENAI_API_KEY` on the server (never in the browser). Copy [`.env.example`](.env.example) to `.env.local` for local Vercel dev.
- **Static server only:** `python3 -m http.server` does **not** provide `/api/ask`; the UI will show a connection error unless you deploy or use `vercel dev`.
- **Cross-origin:** if the HTML is hosted on a **different origin** than `/api/ask` (for example static pages on `https://gallery.example` and the API on `https://api.example`):
  1. Set your API origin (no trailing slash) **before** `app.js` loads. In [`index.html`](index.html), put it in `<meta name="wia-ask-api-url" content="https://api.example">` (a small inline script copies that to `window.WIA_ASK_API_URL`), or assign `window.WIA_ASK_API_URL` in your own inline script above the `app.js` module tag (see [`CLAUDE.md`](CLAUDE.md)).
  2. On the **API** deployment (Vercel project that serves `api/ask.js`), set **`WIA_CORS_ORIGIN`** to your static site origin (for example `https://gallery.example`). That env var is sent as `Access-Control-Allow-Origin` instead of the permissive `*` default. Use the exact scheme and host you open in the browser; omit a path.

### Fix: “No Ask route found on this host”

That line appears when the browser’s current origin has no working `/api/ask` (typical for `python3 -m http.server`). Use one of:

1. **`npx vercel dev`** — serves the app with serverless routes; put `OPENAI_API_KEY` in **`.env.local`** (copy from [`.env.example`](.env.example)) and open the URL Vercel prints.
2. **Deploy to Vercel** — same-origin `/api/ask` with **`OPENAI_API_KEY`** set on the project; redeploy after changing env.
3. **Keep a static server for files** — deploy Ask elsewhere on Vercel, then in [`index.html`](index.html) set `<meta name="wia-ask-api-url" content="https://YOUR-API-PROJECT.vercel.app">` (no trailing slash). On the API project set **`WIA_CORS_ORIGIN`** to the origin you use to open the HTML (for example `http://127.0.0.1:8000` during local static testing).

## Deploy (e.g. Vercel)

1. Connect this Git repository to Vercel (or push a branch and import the repo).
2. **Environment variables** ( **Project → Settings → Environment Variables** ):
   - **`OPENAI_API_KEY`** — required for Ask (your OpenAI secret key, `sk-…`). Name must match exactly (case-sensitive).
   - Enable this variable for **Production** if you use the production URL; enable **Preview** if you test PR/branch preview URLs; **Development** is for `vercel dev` linked to the project.
   - Optionally **`OPENAI_MODEL`** (defaults to `gpt-4o-mini`). Optional alias **`OPENAI_KEY`** is read only if `OPENAI_API_KEY` is unset (see [`api/ask.js`](api/ask.js)).
   - When the static site and API are on **different origins**, set **`WIA_CORS_ORIGIN`** on the API project to the static site origin (see **Cross-origin** under Ask above). Same-origin deployments can leave it unset.
3. **Redeploy** after adding or changing secrets so the running deployment receives them (Deployments → … → Redeploy, or push a commit).
4. Deploy. Serverless functions are picked up from [`api/`](api/) automatically.

### Troubleshooting: “Ask is not configured (missing OPENAI_API_KEY)” (HTTP 503)

The API returns this when no key is visible **to that deployment**. Most often:

| Issue | Fix |
|--------|-----|
| Variable only on Preview / Development | Also enable **`OPENAI_API_KEY` for Production** if you open the production site. |
| Typo in name | Use **`OPENAI_API_KEY`** exactly (not `NEXT_PUBLIC_OPENAI_*`, not `OPEN_AI_API_KEY`). |
| Added env after deploy | **Redeploy** the project. |
| Wrong Vercel project | Confirm the repo is linked to the project where you set variables. |

**Smoke-test** your live URL (replace with yours):

```bash
npm run curl:ask -- https://YOUR-PROJECT.vercel.app
```

- **503** + `missing OPENAI_API_KEY` → fix scope / name / redeploy (above).
- **200** + JSON with `answer` → Ask is configured; if the browser still fails, check you are on the same host or set `window.WIA_ASK_API_URL`.

Local parity with production:

```bash
npm install
npx vercel dev
```

Use the URL Vercel prints (not only the Python static server) so `/api/ask` exists.

## Tests

```bash
npm ci
npm test
```

Playwright serves the app on port **9876** during tests (`playwright.config.ts`): **Desktop Chrome** runs the main `e2e/*.spec.ts` suite; **Mobile Chrome** (Pixel 5 profile) runs [`e2e/mobile-smoke.spec.ts`](e2e/mobile-smoke.spec.ts) only. `npm test` also runs `npm run check:images` so every artist `image` path in `data.js` exists under `images/artists/`, then `npm run test:unit` (`node --test` on `test/*.test.mjs`).

## Artist images

Files live in `images/artists/` (see [`docs/IMAGE_CREDITS.md`](docs/IMAGE_CREDITS.md)). Placeholder SVGs can be regenerated with `node scripts/populate-artist-placeholders.mjs` (do not overwrite real photos).

## Docs for contributors

- **[CLAUDE.md](CLAUDE.md)** — architecture, quiz rules, Ask behavior, `data.js` conventions.

## Where things live

| Area | Location |
|------|----------|
| App entry, navigation, shared state | [`app.js`](app.js) |
| Curated artists, topics, quizzes | [`data.js`](data.js) |
| Per-screen UI (landing, ask, quiz, …) | [`screens/`](screens/) |
| Shared helpers (DOM, search, hash route, Ask client) | [`lib/`](lib/) |
| Layout and components | [`style.css`](style.css), [`index.html`](index.html) |
| Ask serverless route | [`api/ask.js`](api/ask.js) |
| End-to-end tests | [`e2e/`](e2e/) |
| Unit / API tests | [`test/`](test/) |
| Artist image path check | [`scripts/check-artist-images.mjs`](scripts/check-artist-images.mjs) (`npm run check:images`) |
| `APP_DATA` invariants | [`scripts/lint-app-data.mjs`](scripts/lint-app-data.mjs) (`npm run lint:data`) |
| CI (push / PR) | [`.github/workflows/ci.yml`](.github/workflows/ci.yml) |

## Git branches

Use a **feature branch** for risky or experimental work so `main` stays easy to return to:

```bash
git checkout main
git checkout -b your-branch-name
# … commit changes …
git push -u origin your-branch-name
```

Merge into `main` when you are happy; discard the branch or reset `main` if you prefer the old state.
