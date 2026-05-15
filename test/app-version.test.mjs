import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import test from "node:test";

import { APP_ASSET_VERSION } from "../lib/app-version.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

test("index.html app.js query matches APP_ASSET_VERSION", () => {
  const html = readFileSync(join(root, "index.html"), "utf8");
  assert.match(
    html,
    new RegExp(`app\\.js\\?v=${APP_ASSET_VERSION.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`),
  );
});

test("lib/app-data.js data.js query matches APP_ASSET_VERSION", () => {
  const appData = readFileSync(join(root, "lib/app-data.js"), "utf8");
  assert.match(
    appData,
    new RegExp(`data\\.js\\?v=${APP_ASSET_VERSION.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`),
  );
});
