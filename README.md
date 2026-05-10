# Contemporary Women Art

An interactive web app for learning contemporary art through women artists — exploration by discipline and topic, flip cards with curator-style insights, favorites, a short quiz, and optional **Ask the collection** (AI Q&A grounded in this project’s data).

## Run locally (static)

Serve the repo root so `images/` and ES modules resolve reliably:

```bash
python3 -m http.server 8000
```

Open `http://127.0.0.1:8000/index.html`.

Browsing this way runs **only** the front-end. The **Ask** screen needs a serverless host or local `vercel dev` (see below).

## Ask the collection (AI Q&A)

The landing page links to **Ask the collection**, which calls `POST /api/ask`:

- **Implementation:** [`api/ask.js`](api/ask.js) — keyword retrieval over [`data.js`](data.js), optional English Wikipedia summaries, then OpenAI (`gpt-4o-mini` by default).
- **Secrets:** set `OPENAI_API_KEY` on the server (never in the browser). Copy [`.env.example`](.env.example) to `.env.local` for local Vercel dev.
- **Static server only:** `python3 -m http.server` does **not** provide `/api/ask`; the UI will show a connection error unless you deploy or use `vercel dev`.
- **Cross-origin:** if the HTML is hosted separately from the API, set `window.WIA_ASK_API_URL` to your API origin before `app.js` loads (see [`CLAUDE.md`](CLAUDE.md)).

## Deploy (e.g. Vercel)

1. Connect this Git repository to Vercel (or push a branch and import the repo).
2. Add environment variables: **`OPENAI_API_KEY`** (required for Ask). Optionally **`OPENAI_MODEL`** (defaults to `gpt-4o-mini`).
3. Deploy. Serverless functions are picked up from [`api/`](api/) automatically.

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

Playwright serves the app on port **9876** during tests (`playwright.config.ts`). `npm test` also runs `npm run check:images` so every artist `image` path in `data.js` exists under `images/artists/`.

## Artist images

Files live in `images/artists/` (see [`docs/IMAGE_CREDITS.md`](docs/IMAGE_CREDITS.md)). Placeholder SVGs can be regenerated with `node scripts/populate-artist-placeholders.mjs` (do not overwrite real photos).

## Docs for contributors

- **[CLAUDE.md](CLAUDE.md)** — architecture, quiz rules, Ask behavior, `data.js` conventions.

## Git branches

Use a **feature branch** for risky or experimental work so `main` stays easy to return to:

```bash
git checkout main
git checkout -b your-branch-name
# … commit changes …
git push -u origin your-branch-name
```

Merge into `main` when you are happy; discard the branch or reset `main` if you prefer the old state.
