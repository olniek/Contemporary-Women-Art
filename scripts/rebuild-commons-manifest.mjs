/**
 * Rebuild scripts/commons-manifest.json by searching Wikimedia Commons
 * for each APP_DATA artist (skips artists with only local non-Commons assets).
 *
 * Run from repo root: node scripts/rebuild-commons-manifest.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { APP_DATA } from "../data.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const UA =
  "WomenContemporaryArtApp/1.0 (educational static site; commons manifest rebuild; contact: local)";

const SKIP_IDS = new Set(["francesca_woodman", "cindy_sherman"]);

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function getJson(url) {
  const { get } = await import("node:https");
  for (let attempt = 0; attempt < 8; attempt++) {
    const d = await new Promise((resolve, reject) => {
      get(url, { headers: { "User-Agent": UA } }, (res) => {
        let body = "";
        res.on("data", (c) => (body += c));
        res.on("end", () => resolve({ status: res.statusCode, body }));
      }).on("error", reject);
    });
    if (d.status === 429) {
      const wait = 15000 + attempt * 10000;
      process.stderr.write(`429, waiting ${wait}ms…\n`);
      await delay(wait);
      continue;
    }
    if (d.status !== 200)
      throw new Error(`HTTP ${d.status} ${url}`);
    return JSON.parse(d.body);
  }
  throw new Error(`Too many 429s for ${url}`);
}

function metaVal(x) {
  if (!x) return "";
  const v = typeof x === "object" && x !== null && "value" in x ? x.value : x;
  return String(v)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stripDiacritics(s) {
  return s.normalize("NFD").replace(/\p{M}/gu, "");
}

/** File title should mention the artist (handles accents, hyphens, Pope.L). */
function titleMatchesArtist(fileTitle, displayName) {
  const ft = stripDiacritics(fileTitle).toLowerCase();
  const parts = stripDiacritics(displayName)
    .toLowerCase()
    .split(/\s+/)
    .filter((p) => p.length >= 2);
  if (!parts.length) return false;
  const last = parts[parts.length - 1];
  if (ft.includes(last)) return true;
  if (parts.length >= 2 && ft.includes(parts[0])) return true;
  return false;
}

function isRasterFileTitle(title) {
  return /\.(jpe?g|png)$/i.test(title);
}

function isCroppedTitle(title) {
  return /\(cropped\)/i.test(title);
}

function commonsFileUrl(title) {
  const enc = encodeURIComponent(title.replace(/^File:/, "")).replace(
    /%2F/g,
    "/"
  );
  return `https://commons.wikimedia.org/wiki/File:${enc}`;
}

async function imageInfoForTitle(title) {
  const q = new URLSearchParams({
    action: "query",
    format: "json",
    titles: title,
    prop: "imageinfo",
    iiprop: "url|mime|extmetadata",
    iiurlwidth: "1600",
  });
  const j = await getJson("https://commons.wikimedia.org/w/api.php?" + q);
  const page = Object.values(j.query.pages)[0];
  if (!page || "missing" in page || !page.imageinfo?.[0]) return null;
  const ii = page.imageinfo[0];
  let downloadUrl = ii.thumburl || ii.url;
  if (downloadUrl) {
    try {
      const u = new URL(downloadUrl);
      u.search = "";
      downloadUrl = u.toString();
    } catch {
      downloadUrl = downloadUrl.split("?")[0];
    }
  }
  const mime = ii.mime || "";
  const ext = mime.includes("png") ? "png" : "jpg";
  const em = ii.extmetadata || {};
  const artist = metaVal(em.Artist) || metaVal(em.Credit) || metaVal(em.Attribution);
  const license =
    metaVal(em.LicenseShortName) || metaVal(em.UsageTerms) || "See file page";
  const credit = [artist, license, commonsFileUrl(title)]
    .filter(Boolean)
    .join(". ")
    .replace(/\s+/g, " ")
    .trim();
  return { title, downloadUrl, ext, credit, commonsUrl: commonsFileUrl(title) };
}

async function discoverForArtist({ id, name }) {
  if (SKIP_IDS.has(id)) return null;

  const q = new URLSearchParams({
    action: "query",
    format: "json",
    list: "search",
    srsearch: name,
    srnamespace: "6",
    srlimit: "25",
  });
  await delay(5500);
  const j = await getJson("https://commons.wikimedia.org/w/api.php?" + q);
  const hits = j.query?.search || [];

  const candidates = hits
    .map((h) => h.title)
    .filter(isRasterFileTitle)
    .filter((t) => !isCroppedTitle(t))
    .filter((t) => titleMatchesArtist(t, name));

  for (const title of candidates.slice(0, 8)) {
    await delay(3500);
    const info = await imageInfoForTitle(title);
    if (info?.downloadUrl) {
      return {
        id,
        name,
        ...info,
        alt: `Photograph of ${name}.`,
      };
    }
  }
  throw new Error(`No Commons raster found for ${id} (${name})`);
}

function collectArtists() {
  const list = [];
  for (const series of Object.values(APP_DATA.series)) {
    if (!series.topics) continue;
    for (const topic of Object.values(series.topics)) {
      for (const a of topic.artists) list.push({ id: a.id, name: a.name });
    }
  }
  return list;
}

const manifestPath = join(__dirname, "commons-manifest.json");
let out = {};
try {
  out = JSON.parse(readFileSync(manifestPath, "utf8"));
} catch {
  /* fresh */
}

for (const artist of collectArtists()) {
  if (SKIP_IDS.has(artist.id)) continue;
  if (out[artist.id]?.url) {
    process.stderr.write(`skip ${artist.id}\n`);
    continue;
  }
  process.stderr.write(`discover ${artist.id}…\n`);
  const row = await discoverForArtist(artist);
  out[artist.id] = {
    url: row.downloadUrl,
    ext: row.ext,
    credit: row.credit || `See ${row.commonsUrl}`,
    commons: row.commonsUrl,
    alt: row.alt,
  };
  writeFileSync(manifestPath, JSON.stringify(out, null, 2) + "\n", "utf8");
}

writeFileSync(
  manifestPath,
  JSON.stringify(out, null, 2) + "\n",
  "utf8"
);
process.stderr.write(`Wrote ${Object.keys(out).length} entries.\n`);
