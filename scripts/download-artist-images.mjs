/**
 * Downloads images from scripts/commons-manifest.json into images/artists/{id}.{ext}.
 * Run from repo root: node scripts/download-artist-images.mjs
 */
import { createWriteStream } from "node:fs";
import { mkdir } from "node:fs/promises";
import { get } from "node:https";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "images", "artists");
const manifest = JSON.parse(
  await import("node:fs/promises").then((fs) =>
    fs.readFile(join(__dirname, "commons-manifest.json"), "utf8")
  )
);

const UA =
  "WomenContemporaryArtApp/1.0 (educational static site; local image cache; contact: local)";

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest);
    get(
      url,
      { headers: { "User-Agent": UA, Accept: "image/*,*/*;q=0.8" } },
      (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        const loc = res.headers.location;
        if (!loc) {
          reject(new Error("Redirect without location"));
          return;
        }
        const next = loc.startsWith("http") ? loc : new URL(loc, url).href;
        download(next, dest).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        file.close();
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      res.pipe(file);
      file.on("finish", () => {
        file.close();
        resolve();
      });
    }
    ).on("error", (err) => {
      file.close();
      reject(err);
    });
  });
}

await mkdir(outDir, { recursive: true });

const fails = [];
for (const [id, meta] of Object.entries(manifest)) {
  const dest = join(outDir, `${id}.${meta.ext}`);
  try {
    await download(meta.url, dest);
    console.log("ok", id);
  } catch (e) {
    console.error("fail", id, e.message);
    fails.push(id);
  }
}

if (fails.length) {
  console.error("Failed:", fails.join(", "));
  process.exit(1);
}
