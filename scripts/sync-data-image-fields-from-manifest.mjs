/**
 * Sets each artist’s `image` / `imageAlt` in data.js from scripts/commons-manifest.json
 * when the path is still images/artists/{id}.svg or imageAlt is a neutral placeholder line.
 * Run from repo root: node scripts/sync-data-image-fields-from-manifest.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const manifest = JSON.parse(readFileSync(join(__dirname, "commons-manifest.json"), "utf8"));
const dataPath = join(root, "data.js");
let data = readFileSync(dataPath, "utf8");
let updated = 0;

for (const [id, meta] of Object.entries(manifest)) {
  const imageAlt = JSON.stringify(meta.alt);
  const raster = `image: "images/artists/${id}.${meta.ext}",\n              imageAlt: ${imageAlt},`;

  const svgRe = new RegExp(
    `image:\\s*"images/artists/${id}\\.svg",\\s*imageAlt:\\s*"[^"]*",`,
  );
  if (svgRe.test(data)) {
    data = data.replace(svgRe, raster);
    updated++;
    continue;
  }

  const placeholderRe = new RegExp(
    `image:\\s*"images/artists/${id}\\.(?:svg|jpe?g|png)",\\s*imageAlt:\\s*"Neutral placeholder[^"]*",`,
  );
  if (placeholderRe.test(data)) {
    data = data.replace(placeholderRe, raster);
    updated++;
  }
}

writeFileSync(dataPath, data);
console.log(`Updated ${updated} artist image field(s) in data.js from manifest.`);
