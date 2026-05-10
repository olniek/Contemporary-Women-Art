/**
 * Verifies each artist in APP_DATA has a file at images/artists/{id} with extension
 * matching the path in data (basename from artist.image).
 */
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { APP_DATA } from "../data.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
let errors = 0;

for (const series of Object.values(APP_DATA.series)) {
  for (const topic of Object.values(series.topics)) {
    for (const artist of topic.artists) {
      if (!artist.image) {
        console.error("Missing image field:", artist.id);
        errors++;
        continue;
      }
      const rel = artist.image.replace(/^\//, "");
      const abs = join(root, rel);
      if (!existsSync(abs)) {
        console.error("Missing file:", rel, "for", artist.id);
        errors++;
      }
    }
  }
}

if (errors) {
  process.exit(1);
}
console.log("All artist image paths resolve to existing files.");
