/**
 * Copies neutral SVG tiles from images/placeholders/ to images/artists/{id}.svg
 * for every artist except those listed in SKIP (already have PNG/JPG).
 */
import { copyFile, mkdir, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { APP_DATA } from "../data.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "images", "artists");
const phDir = join(root, "images", "placeholders");

const SKIP = new Set(["francesca_woodman", "cindy_sherman", "dorothea_lange"]);

const placeholders = (await readdir(phDir))
  .filter((f) => f.endsWith(".svg"))
  .sort();

await mkdir(outDir, { recursive: true });

let i = 0;
for (const series of Object.values(APP_DATA.series)) {
  for (const topic of Object.values(series.topics)) {
    for (const artist of topic.artists) {
      if (SKIP.has(artist.id)) continue;
      const src = join(phDir, placeholders[i % placeholders.length]);
      i++;
      const dest = join(outDir, `${artist.id}.svg`);
      await copyFile(src, dest);
      console.log(artist.id, "->", placeholders[(i - 1) % placeholders.length]);
    }
  }
}
