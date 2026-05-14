/**
 * Downloads images from scripts/commons-manifest.json into images/artists/{id}.{ext}.
 * Run from repo root: node scripts/download-artist-images.mjs
 */
import { createWriteStream } from "node:fs";
import { mkdir, unlink } from "node:fs/promises";
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

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function cleanDownloadUrl(url) {
  try {
    const u = new URL(url);
    u.search = "";
    return u.toString();
  } catch {
    return url.split("?")[0];
  }
}

async function removeDest(dest) {
  await unlink(dest).catch(() => {});
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest);
    get(
      url,
      { headers: { "User-Agent": UA, Accept: "image/*,*/*;q=0.8" } },
      (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        void removeDest(dest);
        const loc = res.headers.location;
        if (!loc) {
          reject(new Error("Redirect without location"));
          return;
        }
        const next = loc.startsWith("http") ? loc : new URL(loc, url).href;
        download(next, dest).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode === 429) {
        file.close();
        void removeDest(dest);
        reject(new Error(`HTTP 429 for ${url}`));
        return;
      }
      if (res.statusCode !== 200) {
        file.close();
        void removeDest(dest);
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      res.pipe(file);
      file.on("finish", () => {
        file.close();
        resolve();
      });
      file.on("error", async (err) => {
        await removeDest(dest);
        reject(err);
      });
    }
    ).on("error", async (err) => {
      file.close();
      await removeDest(dest);
      reject(err);
    });
  });
}

await mkdir(outDir, { recursive: true });

const onlyArg = process.argv.find((a) => a.startsWith("--only="));
const onlySet = onlyArg
  ? new Set(
      onlyArg
        .slice("--only=".length)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    )
  : null;

const entries = Object.entries(manifest).filter(([id]) => !onlySet || onlySet.has(id));

const fails = [];
for (const [id, meta] of entries) {
  const dest = join(outDir, `${id}.${meta.ext}`);
  const url = cleanDownloadUrl(meta.url);
  let ok = false;
  let lastWas429 = false;
  for (let attempt = 0; attempt < 8 && !ok; attempt++) {
    try {
      if (attempt) {
        const wait = lastWas429 ? 35000 + attempt * 20000 : 8000 + attempt * 7000;
        console.warn("retry", id, "after", wait, "ms");
        await delay(wait);
      }
      await download(url, dest);
      console.log("ok", id);
      ok = true;
    } catch (e) {
      lastWas429 = String(e.message).includes("429");
      if (attempt === 7 || !lastWas429) {
        console.error("fail", id, e.message);
        fails.push(id);
        break;
      }
    }
  }
  await delay(onlySet ? 8000 : 5000);
}

if (fails.length) {
  console.error("Failed:", fails.join(", "));
  process.exit(1);
}
