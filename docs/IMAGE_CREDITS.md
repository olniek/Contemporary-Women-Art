# Image credits and sourcing

## Bundled artwork / portrait images

| Artist (card) | File | Source / license |
|----------------|------|------------------|
| Francesca Woodman | `images/artists/francesca_woodman.png` | Curatorial crop; ensure your deployment complies with rights for the underlying photograph. |
| Cindy Sherman | `images/artists/cindy_sherman.png` | Same as above — verify exhibition / museum terms if redistributing. |
| Dorothea Lange | `images/artists/dorothea_lange.jpg` | *Migrant Mother* (1936). Commonly catalogued as public-domain U.S. Farm Security Administration / Library of Congress photograph. Confirm on [Wikimedia Commons — File:Migrant Mother.jpg](https://commons.wikimedia.org/wiki/File:Migrant_Mother.jpg) before commercial use. |

## Placeholder tiles (42 artists)

Files named `images/artists/{artist.id}.svg` are **neutral SVG patterns** copied from `images/placeholders/`. They are **not** depictions of the artist or their work.

To replace a placeholder:

1. Obtain a **rights-cleared** image (e.g. Wikimedia Commons with compatible license, museum Open Access, or permission from the rights holder).
2. Save as `images/artists/{artist.id}.jpg` or `.png` (or keep `.svg` if appropriate).
3. Update that artist’s `image` and `imageAlt` in [`data.js`](../data.js).

Optional: use [`scripts/commons-manifest.json`](../scripts/commons-manifest.json) as a **starting list** of Commons URLs. Wikimedia requires a descriptive `User-Agent` and may rate-limit; resolve the correct thumbnail via the [Commons API](https://commons.wikimedia.org/wiki/Commons:API) (`prop=imageinfo`, `iiurlwidth=960` often works better than arbitrary thumb widths). Run [`scripts/download-artist-images.mjs`](../scripts/download-artist-images.mjs) only after updating URLs and adding delays between requests.

## Validation

From the repo root:

```bash
npm run check:images
```

Ensures every artist in `data.js` has a matching file under `images/artists/`.
