---
name: wia-artist-images
description: >-
  Use when adding or replacing bundled artist portrait files for the Women in Contemporary Art app:
  scripts/commons-manifest.json, scripts/download-artist-images.mjs, data.js image/imageAlt,
  docs/IMAGE_CREDITS.md, npm run check:images, or Commons/Wikimedia sourcing for card images.
---

# Women in Contemporary Art — artist portrait workflow

## Manifest (`scripts/commons-manifest.json`)

Each artist `id` (matches `data.js` `artist.id`) needs one object with:

- **`url`** — HTTPS direct file URL (Commons `upload.wikimedia.org`, MacArthur, Flickr, etc.).
- **`ext`** — `jpg` or `png` (must match what you save under `images/artists/{id}.{ext}`).
- **`credit`** — Full attribution line: author, license, and canonical file or source URL.
- **`commons`** — Wikimedia Commons file page when applicable; otherwise the institutional or Flickr page URL.
- **`alt`** — Short, accurate description of what the image shows (not generic filler if the frame is artwork-heavy or environmental).

Optional sanity (network): `node scripts/check-manifest-commons.mjs`

## Download

From repo root:

```bash
node scripts/download-artist-images.mjs
```

Partial retries after rate limits:

```bash
node scripts/download-artist-images.mjs --only=artist_id_one,artist_id_two
```

The script uses a descriptive `User-Agent`, removes empty files on failed responses, spaces requests (~5s), and backs off on HTTP 429.

## `data.js`

After binaries exist, set each artist’s:

- `image` → `images/artists/{id}.{ext}` (use manifest `ext`).
- `imageAlt` → manifest `alt` (or a lightly edited variant consistent with nearby entries).

For bulk placeholder → raster updates, you can run:

```bash
node scripts/sync-data-image-fields-from-manifest.mjs
```

(Only rewrites rows that still point at `images/artists/{id}.svg`.)

## Credits

Regenerate or extend `docs/IMAGE_CREDITS.md` so the manifest-sourced table stays aligned with `credit` lines. Curatorial-only assets (e.g. Francesca Woodman, Cindy Sherman) stay in the small “Bundled artwork” subsection.

## No-crop / layout

Card images use **`object-fit: contain`** (see `.card-image-img` in `style.css`). Prefer full-frame sources; avoid aggressive square center crops in the asset. When resolving Commons thumbnails, `iiurlwidth` (e.g. 960–1920) often yields a better balance than arbitrary `/thumb/.../` widths—see also the note in `docs/IMAGE_CREDITS.md`.

## Verification

```bash
npm run check:images && npm test
```

(`npm test` already runs `check:images`; running `check:images` alone is fine for a quick smoke.)
