/**
 * Vercel Serverless: POST /api/ask
 * Env: OPENAI_API_KEY (required), optional fallback OPENAI_KEY, OPENAI_MODEL (default gpt-4o-mini)
 */
import { APP_DATA } from "../data.js";
import { flattenArtists, topKArtists } from "../lib/artist-retrieval.js";

const wikiCache = new Map();
const WIKI_CACHE_MAX = 80;
const MAX_QUESTION_CHARS = 2000;

/** Trimmed key; supports OPENAI_KEY alias if OPENAI_API_KEY was misnamed in the dashboard. */
function openAiApiKey() {
  const raw = process.env.OPENAI_API_KEY || process.env.OPENAI_KEY || "";
  return typeof raw === "string" ? raw.trim() : "";
}

function corsHeaders() {
  const origin = process.env.WIA_CORS_ORIGIN?.trim();
  const h = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
  if (origin) {
    h["Access-Control-Allow-Origin"] = origin;
    h.Vary = "Origin";
  } else {
    h["Access-Control-Allow-Origin"] = "*";
  }
  return h;
}

async function fetchWikiSummary(title) {
  const key = title.trim();
  if (wikiCache.has(key)) return wikiCache.get(key);

  const encoded = encodeURIComponent(key.replace(/\s+/g, "_"));
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encoded}`;

  try {
    const r = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "WomenInContemporaryArt/1.0 (educational art catalog; local retrieval)",
      },
    });
    if (!r.ok) {
      wikiCache.set(key, null);
      while (wikiCache.size > WIKI_CACHE_MAX) {
        const first = wikiCache.keys().next().value;
        wikiCache.delete(first);
      }
      return null;
    }
    const j = await r.json();
    const desktop = j.content_urls?.desktop;
    const pageUrl = typeof desktop === "string" ? desktop : desktop?.page || desktop?.url || "";
    const out = {
      title: j.title,
      extract: j.extract || "",
      pageUrl,
      license_short_description: j.license_short_description || "",
    };
    wikiCache.set(key, out);
    while (wikiCache.size > WIKI_CACHE_MAX) {
      const first = wikiCache.keys().next().value;
      wikiCache.delete(first);
    }
    return out;
  } catch {
    wikiCache.set(key, null);
    while (wikiCache.size > WIKI_CACHE_MAX) {
      const first = wikiCache.keys().next().value;
      wikiCache.delete(first);
    }
    return null;
  }
}

async function callOpenAI(system, user) {
  const key = openAiApiKey();
  if (!key) {
    const err = new Error("OPENAI_API_KEY is not configured");
    err.code = "NO_API_KEY";
    throw err;
  }
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      temperature: 0.35,
      max_tokens: 1200,
    }),
  });
  if (!res.ok) {
    const t = await res.text();
    const err = new Error(`OpenAI HTTP ${res.status}: ${t.slice(0, 500)}`);
    err.code = "OPENAI_HTTP";
    throw err;
  }
  const data = await res.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) {
    const err = new Error("Empty OpenAI response");
    err.code = "OPENAI_EMPTY";
    throw err;
  }
  return text;
}

/**
 * Vercel serverless entry; optional `deps` for tests (mock Wikipedia / OpenAI).
 * @param {unknown} req
 * @param {unknown} res
 * @param {{ fetchWikiSummary?: typeof fetchWikiSummary; callOpenAI?: typeof callOpenAI }} [deps]
 */
export async function handleAsk(req, res, deps = {}) {
  const fetchWiki = deps.fetchWikiSummary ?? fetchWikiSummary;
  const callAI = deps.callOpenAI ?? callOpenAI;

  Object.entries(corsHeaders()).forEach(([k, v]) => res.setHeader(k, v));

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body || "{}");
    } catch {
      res.status(400).json({ error: "Invalid JSON body" });
      return;
    }
  }

  const question = String(body?.question ?? "").trim();
  if (!question) {
    res.status(400).json({ error: "Missing question" });
    return;
  }
  if (question.length > MAX_QUESTION_CHARS) {
    res.status(400).json({
      error: `Question is too long (max ${MAX_QUESTION_CHARS} characters).`,
    });
    return;
  }

  const artists = flattenArtists(APP_DATA);
  const top = topKArtists(question, artists, 8);

  if (top.length === 0) {
    res.status(200).json({
      answer:
        "I couldn't match your question to artists in this collection. Try naming an artist or a theme from the project.",
      sources: [],
      wikipedia: [],
      wikiUsed: false,
    });
    return;
  }

  const curatedPayload = top.map((a) => ({
    id: a.id,
    name: a.name,
    years: a.years,
    insight: a.insight,
    keyWork: a.keyWork,
    movement: a.movement,
    series: a.seriesLabel,
    topic: a.topicLabel,
    seriesId: a.seriesId,
    topicId: a.topicId,
  }));

  const wikiSummaries = await Promise.all(
    top.map(async (a) => {
      const title = a.wikipediaTitle || a.name;
      const wiki = await fetchWiki(title);
      return { artistId: a.id, artistName: a.name, requestedTitle: title, wiki };
    }),
  );

  const wikipedia = wikiSummaries
    .filter((x) => x.wiki && x.wiki.extract)
    .map((x) => ({
      artistId: x.artistId,
      articleTitle: x.wiki.title,
      url: x.wiki.pageUrl,
      extract: x.wiki.extract,
      license: x.wiki.license_short_description || "CC BY-SA",
    }));

  const system = `You are a helpful assistant for the educational web app "Female Contemporary Artists."
Answer ONLY using the provided curated artist records (primary for interpretation and thematic framing) and optional Wikipedia extracts (supplementary biographical or general facts).
Rules:
- Prefer curated fields (insight, keyWork, movement) when they conflict with Wikipedia.
- Cite artist ids in parentheses when you discuss a specific artist, e.g. (id: zanele_muholi).
- When you use Wikipedia material, say so explicitly and include the article URL given in the JSON.
- If the context does not contain enough information, say so clearly. Do not invent facts.`;

  const user = `User question:\n${question}\n\nCurated artist records (JSON):\n${JSON.stringify(
    curatedPayload,
    null,
    2,
  )}\n\nWikipedia summaries (optional; JSON — may be empty for some artists):\n${JSON.stringify(
    wikipedia,
    null,
    2,
  )}`;

  try {
    const answer = await callAI(system, user);
    res.status(200).json({
      answer,
      sources: curatedPayload,
      wikipedia,
      wikiUsed: wikipedia.length > 0,
    });
  } catch (e) {
    if (e.code === "NO_API_KEY") {
      res.status(503).json({
        error: "Ask is not configured on this deployment (missing OPENAI_API_KEY).",
      });
      return;
    }
    console.error(e);
    res.status(500).json({
      error: e.message || "Failed to generate an answer",
    });
  }
}

export default handleAsk;
