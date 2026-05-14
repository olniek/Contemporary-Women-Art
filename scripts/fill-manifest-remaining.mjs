/**
 * Append missing artists to scripts/commons-manifest.json using Commons search
 * with strict token matching (avoids wrong-person hits).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { get } from "node:https";

import { APP_DATA } from "../data.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const manifestPath = join(__dirname, "commons-manifest.json");
const UA =
  "WomenContemporaryArtApp/1.0 (educational static site; commons manifest fill; contact: local)";

const SKIP_IDS = new Set(["francesca_woodman", "cindy_sherman"]);
/** Artists skipped by automated Commons discovery (handled manually in commons-manifest.json). */
const NO_COMMONS_PORTRAIT = new Set([]);

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function getJson(url) {
  for (let attempt = 0; attempt < 8; attempt++) {
    const d = await new Promise((resolve, reject) => {
      get(url, { headers: { "User-Agent": UA } }, (res) => {
        let body = "";
        res.on("data", (c) => (body += c));
        res.on("end", () => resolve({ status: res.statusCode, body }));
      }).on("error", reject);
    });
    if (d.status === 429) {
      const wait = 20000 + attempt * 15000;
      process.stderr.write(`429, waiting ${wait}ms…\n`);
      await delay(wait);
      continue;
    }
    if (d.status !== 200) throw new Error(`HTTP ${d.status} ${url}`);
    return JSON.parse(d.body);
  }
  throw new Error(`Too many 429s for ${url}`);
}

function stripDiacritics(s) {
  return s.normalize("NFD").replace(/\p{M}/gu, "");
}

function titleMatchesArtist(fileTitle, displayName) {
  const norm = (s) =>
    stripDiacritics(s)
      .toLowerCase()
      .replace(/[`'ʼ]/g, "'")
      .replace(/_/g, " ");
  const ft = norm(fileTitle);
  const parts = norm(displayName)
    .split(/\s+/)
    .map((p) => p.trim())
    .filter(Boolean);
  const sig = parts.filter((p) => p.replace(/-/g, "").length >= 3);
  const use = sig.length ? sig : parts;
  return use.every((part) => {
    const segs = part.split("-").filter((s) => s.length >= 2);
    return segs.every((s) => {
      const alt = s.replace(/'/g, "");
      return (
        ft.includes(s) ||
        (alt.length >= 3 && ft.includes(alt))
      );
    });
  });
}

function isRasterFileTitle(title) {
  return /\.(jpe?g|png)$/i.test(title);
}

function isCroppedTitle(title) {
  return /cropped/i.test(title);
}

function commonsFileUrl(title) {
  const enc = encodeURIComponent(title.replace(/^File:/, "")).replace(
    /%2F/g,
    "/"
  );
  return `https://commons.wikimedia.org/wiki/File:${enc}`;
}

function metaVal(x) {
  if (!x) return "";
  const v = typeof x === "object" && x !== null && "value" in x ? x.value : x;
  return String(v)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
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
  const cu = commonsFileUrl(title);
  const credit = [artist, license, cu].filter(Boolean).join(". ").replace(/\s+/g, " ").trim();
  return { title, downloadUrl, ext, credit, commonsUrl: cu };
}

async function discoverForArtist({ id, name }) {
  const searchQueries = [
    name,
    name.replace(/'/g, ""),
    name.replace(/-/g, " "),
  ];
  const seen = new Set();
  const allHits = [];
  for (const sr of searchQueries) {
    if (seen.has(sr)) continue;
    seen.add(sr);
    const q = new URLSearchParams({
      action: "query",
      format: "json",
      list: "search",
      srsearch: sr,
      srnamespace: "6",
      srlimit: "25",
    });
    await delay(5500);
    const j = await getJson("https://commons.wikimedia.org/w/api.php?" + q);
    allHits.push(...(j.query?.search || []));
  }

  const base = [...new Set(allHits.map((h) => h.title))].filter(
    isRasterFileTitle
  );

  const passes = [
    (t) => !isCroppedTitle(t) && titleMatchesArtist(t, name),
    (t) => titleMatchesArtist(t, name),
    (t) => isRasterFileTitle(t) && titleMatchesArtist(t, name),
  ];

  for (const filterFn of passes) {
    const candidates = base.filter(filterFn);
    for (const title of candidates.slice(0, 10)) {
      await delay(3500);
      const info = await imageInfoForTitle(title);
      if (info?.downloadUrl) {
        return {
          url: info.downloadUrl,
          ext: info.ext,
          credit: info.credit || `See ${info.commonsUrl}`,
          commons: info.commonsUrl,
          alt: `Photograph of ${name}.`,
        };
      }
    }
  }
  return null;
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

const out = JSON.parse(readFileSync(manifestPath, "utf8"));

for (const artist of collectArtists()) {
  if (SKIP_IDS.has(artist.id) || NO_COMMONS_PORTRAIT.has(artist.id)) continue;
  if (out[artist.id]?.url) continue;
  process.stderr.write(`discover ${artist.id}…\n`);
  const row = await discoverForArtist(artist);
  if (!row) {
    console.error(`FAILED ${artist.id}`);
    process.exit(1);
  }
  out[artist.id] = row;
  writeFileSync(manifestPath, JSON.stringify(out, null, 2) + "\n", "utf8");
}

process.stderr.write(`Done, ${Object.keys(out).length} entries.\n`);
