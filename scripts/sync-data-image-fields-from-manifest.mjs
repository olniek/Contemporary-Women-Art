/**
 * Sets each artist’s `image` / `imageAlt` in data.js from scripts/commons-manifest.json
 * when the current path is images/artists/{id}.svg (placeholder → raster).
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

for (const [id, meta] of Object.entries(manifest)) {
  const re = new RegExp(`image:\\s*"images/artists/${id}\\.svg",\\s*imageAlt:\\s*"[^"]*",`);
  if (!re.test(data)) continue;
  data = data.replace(
    re,
    `image: "images/artists/${id}.${meta.ext}",\n              imageAlt: ${JSON.stringify(meta.alt)},`,
  );
}

writeFileSync(dataPath, data);
console.log("Updated data.js image fields from manifest (svg → raster where applicable).");
