# Make “Ask the collection” work (simple checklist)

**You need:** this project on your computer, an [OpenAI](https://platform.openai.com) API key (`sk-…`), and about 15 minutes.

**Ignore “two versions.”** Use **one** address: either your **Vercel link** or the link **`vercel dev`** prints. Do **not** rely on `python3 -m http.server` for Ask unless you complete the extra step at the bottom.

---

## Option A — Put the site online (often easiest for demos)

1. Put this code on **GitHub** (if it is not there yet).
2. Go to **[vercel.com](https://vercel.com)** → log in → **Add New…** → **Project** → import that repo → **Deploy**.
3. When deploy finishes: **Project → Settings → Environment Variables** → add:
   - **Name:** `OPENAI_API_KEY` (exact spelling)
   - **Value:** your OpenAI secret key
   - Enable **Production** (and **Preview** if you will open preview URLs)
4. **Deployments** → **⋯** on the latest deployment → **Redeploy** (so the key is loaded).
5. Open your **`*.vercel.app`** link, tap **Ask the collection**, type a question.

If Ask still says something about a missing key, the key is wrong, not enabled for Production, or you forgot **Redeploy**.

---

## Option B — Run everything on your laptop (no public website)

1. Install **[Node.js](https://nodejs.org)** (LTS is fine).
2. Open **Terminal**, `cd` into this project folder.
3. Run: `npm install`
4. Copy **`.env.example`** to a new file named **`.env.local`** in the same folder.
5. Open **`.env.local`** in a text editor. On the line `OPENAI_API_KEY=`, paste your key after the `=` (no quotes).
6. Run: `npx vercel login` — complete the login in the browser (first time only).
7. Run: `npx vercel dev` — wait until it shows a **local URL** (often `http://localhost:3000`).
8. Open **that** URL in the browser. Use **Ask the collection** there.

Do **not** use `http://127.0.0.1:8000` from Python for Ask — that mode does not include the Ask server.

---

## Only if you must use Python (`http://127.0.0.1:8000`) **and** Ask

1. Complete **Option A** first so you have a working `https://something.vercel.app` link.
2. In **`index.html`**, find `<meta name="wia-ask-api-url"` and set `content` to that address (no slash at the end), for example  
   `content="https://something.vercel.app"`
3. On **Vercel** → same project → **Environment Variables** → add **`WIA_CORS_ORIGIN`** = `http://127.0.0.1:8000` (exactly how you open the page).
4. **Redeploy** again.
5. Restart `python3 -m http.server`, refresh the page, then try Ask.

---

## Still stuck?

- **“No Ask route…”** → You opened the wrong URL. Use Option A’s link or Option B’s `vercel dev` link.
- **“Missing OPENAI_API_KEY”** → Key not set for the right environment, or you did not **Redeploy** after adding it.
