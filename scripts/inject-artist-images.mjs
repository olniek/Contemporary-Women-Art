/**
 * One-shot: inject image + imageAlt after `years:` for each artist in data.js.
 * Skips entries that already have `image:` on the next lines (already patched).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { APP_DATA } from "../data.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = join(__dirname, "..", "data.js");

function extFor(id) {
  if (id === "francesca_woodman" || id === "cindy_sherman") return "png";
  if (id === "dorothea_lange") return "jpg";
  return "svg";
}

function altFor(artist) {
  if (artist.id === "francesca_woodman") {
    return "Black-and-white self-portrait: figure hanging from a doorframe in a tiled room, arms raised.";
  }
  if (artist.id === "cindy_sherman") {
    return "Cindy Sherman in Renaissance Madonna costume with swaddled infant, lace and velvet backdrop.";
  }
  if (artist.id === "dorothea_lange") {
    return "Black-and-white photograph (Migrant Mother): a weary mother rests her face on her hand; two children turn away from the camera.";
  }
  return `Neutral placeholder tile for ${artist.name} — replace with a rights-cleared artwork or portrait image in images/artists/${artist.id}.${extFor(artist.id)}.`;
}

const alts = {};
for (const series of Object.values(APP_DATA.series)) {
  for (const topic of Object.values(series.topics)) {
    for (const artist of topic.artists) {
      alts[artist.id] = altFor(artist);
    }
  }
}

let s = readFileSync(dataPath, "utf8");

s = s.replace(
  /image: "images\/francesca-woodman-card\.png",/,
  'image: "images/artists/francesca_woodman.png",'
);
s = s.replace(
  /image: "images\/cindy-sherman-untitled-216\.png",/,
  'image: "images/artists/cindy_sherman.png",'
);

for (const series of Object.values(APP_DATA.series)) {
  for (const topic of Object.values(series.topics)) {
    for (const artist of topic.artists) {
      const id = artist.id;
      const escAlt = alts[id].replace(/\\/g, "\\\\").replace(/"/g, '\\"');
      const ext = extFor(id);
      const imageLine = `image: "images/artists/${id}.${ext}",\n              imageAlt: "${escAlt}",`;

      if (id === "francesca_woodman" || id === "cindy_sherman") {
        continue;
      }

      const needle = `(id: "${id}",\\s*\\n\\s*name: "[^"]+",\\s*\\n\\s*years: "[^"]+",)\\s*\\n(\\s*imagePlaceholder:)`;
      const re = new RegExp(needle);
      if (!re.test(s)) {
        console.error("Pattern not found for", id);
        process.exit(1);
      }
      s = s.replace(re, `$1\n              ${imageLine}\n$2`);
    }
  }
}

writeFileSync(dataPath, s, "utf8");
console.log("Patched", dataPath);
