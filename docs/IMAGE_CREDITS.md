# Image credits and sourcing

## Bundled artwork / portrait images (curated in `data.js`)

| Artist (card) | File | Source / license |
|----------------|------|------------------|
| Francesca Woodman | `images/artists/francesca_woodman.png` | Curatorial crop; ensure your deployment complies with rights for the underlying photograph. |
| Cindy Sherman | `images/artists/cindy_sherman.png` | Same as above — verify exhibition / museum terms if redistributing. |
| Dorothea Lange | `images/artists/dorothea_lange.jpg` | *Migrant Mother* (1936). Commonly catalogued as public-domain U.S. Farm Security Administration / Library of Congress photograph. Confirm on [Wikimedia Commons — File:Migrant Mother.jpg](https://commons.wikimedia.org/wiki/File:Migrant_Mother.jpg) before commercial use. |
| Simone Leigh | `images/artists/simone_leigh.svg` | Neutral in-repo placeholder SVG; `scripts/commons-manifest.json` has a Commons-backed entry when you are ready to fetch a raster with `node scripts/download-artist-images.mjs`. |

## Manifest-backed raster portraits

Most other card images are **JPEG or PNG** files under `images/artists/{artist.id}.(jpg|png)`. For each of those artists, the **human-readable license and attribution line** is stored in the `credit` field for that `artist.id` in [`scripts/commons-manifest.json`](../scripts/commons-manifest.json) (along with source URLs and suggested `alt` text).

To refresh or add a file after changing the manifest, run from the repo root:

```bash
node scripts/download-artist-images.mjs
```

Wikimedia requires a descriptive `User-Agent` and may rate-limit; prefer stable **`/thumb/.../960px-...`** (or similar) upload URLs when direct originals return errors. The script spaces requests and retries on 429.

## Neutral SVG patterns (optional on disk)

`images/placeholders/` holds reusable neutral SVG tiles. Some `images/artists/{artist.id}.svg` copies may still exist next to a raster; **`data.js` should point at the raster** once it is rights-cleared and present so cards show the photograph, not the gray placeholder.

## Validation

From the repo root:

```bash
npm run check:images
```

Ensures every artist in `data.js` has a matching file under `images/artists/`, and fails if `data.js` still references a `.svg` while a same-id `.jpg` or `.png` is present (placeholder vs raster drift).
