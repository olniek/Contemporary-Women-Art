/**
 * One-off: verify each commons URL in manifest resolves via API.
 * Run: node scripts/check-manifest-commons.mjs
 */
import { readFileSync } from "node:fs";
import { get } from "node:https";

const manifest = JSON.parse(
  readFileSync(new URL("./commons-manifest.json", import.meta.url), "utf8")
);
const UA =
  "WomenContemporaryArtApp/1.0 (educational static site; https://github.com; image audit)";

function getJson(url) {
  return new Promise((resolve, reject) => {
    get(url, { headers: { "User-Agent": UA } }, (res) => {
      let d = "";
      res.on("data", (c) => (d += c));
      res.on("end", () => {
        if (res.statusCode !== 200)
          reject(new Error(`HTTP ${res.statusCode}`));
        else resolve(JSON.parse(d));
      });
    }).on("error", reject);
  });
}

function titleFromCommonsUrl(commonsUrl) {
  const u = new URL(commonsUrl);
  const raw = u.pathname.replace(/^\/wiki\//, "");
  return decodeURIComponent(raw);
}

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

for (const [id, meta] of Object.entries(manifest)) {
  await delay(200);
  const title = titleFromCommonsUrl(meta.commons);
  const q = new URLSearchParams({
    action: "query",
    format: "json",
    titles: title,
    prop: "imageinfo",
    iiprop: "url",
    iiurlwidth: "800",
  });
  const j = await getJson("https://commons.wikimedia.org/w/api.php?" + q);
  const page = Object.values(j.query.pages)[0];
  const ok = page && !("missing" in page) && page.imageinfo?.[0];
  console.log(ok ? "OK " : "BAD ", id, title);
}
