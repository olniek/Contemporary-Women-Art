#!/usr/bin/env node
/**
 * Smoke-test POST /api/ask on a deployed base URL.
 * Usage: node scripts/curl-ask.mjs https://your-project.vercel.app
 */
const baseArg = process.argv[2];
if (!baseArg) {
  console.error(
    "Usage: npm run curl:ask -- https://your-deployment.vercel.app\n" +
      "   or: node scripts/curl-ask.mjs https://your-deployment.vercel.app"
  );
  process.exit(1);
}

let url;
try {
  url = new URL("/api/ask", baseArg.endsWith("/") ? baseArg : baseArg + "/");
} catch {
  console.error("Invalid URL:", baseArg);
  process.exit(1);
}

const res = await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    question: "Who created the Kitchen Table Series?",
  }),
});

const text = await res.text();
let json;
try {
  json = JSON.parse(text);
} catch {
  json = null;
}

console.log("HTTP", res.status, url.href);
if (json) {
  console.log(JSON.stringify(json, null, 2));
} else {
  console.log(text.slice(0, 2000));
}

process.exit(res.ok ? 0 : 1);
