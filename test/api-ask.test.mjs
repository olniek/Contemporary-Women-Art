import assert from "node:assert/strict";
import test from "node:test";

import { handleAsk } from "../api/ask.js";

function createMockRes() {
  const state = { status: 200, body: null, ended: false };
  const res = {
    setHeader() {},
    status(code) {
      state.status = code;
      return {
        json(data) {
          state.body = data;
          return this;
        },
        end() {
          state.ended = true;
          return this;
        },
      };
    },
    get statusCode() {
      return state.status;
    },
    get jsonBody() {
      return state.body;
    },
    get ended() {
      return state.ended;
    },
  };
  return res;
}

test("OPTIONS returns 204", async () => {
  const res = createMockRes();
  await handleAsk({ method: "OPTIONS" }, res);
  assert.equal(res.statusCode, 204);
  assert.equal(res.ended, true);
});

test("GET returns 405", async () => {
  const res = createMockRes();
  await handleAsk({ method: "GET" }, res);
  assert.equal(res.statusCode, 405);
  assert.equal(res.jsonBody.error, "Method not allowed");
});

test("POST with invalid JSON string returns 400", async () => {
  const res = createMockRes();
  await handleAsk({ method: "POST", body: "{not-json" }, res);
  assert.equal(res.statusCode, 400);
  assert.equal(res.jsonBody.error, "Invalid JSON body");
});

test("POST with missing question returns 400", async () => {
  const res = createMockRes();
  await handleAsk({ method: "POST", body: {} }, res);
  assert.equal(res.statusCode, 400);
  assert.equal(res.jsonBody.error, "Missing question");
});

test("POST with question over max length returns 400", async () => {
  const res = createMockRes();
  const longQ = "x".repeat(3000);
  await handleAsk({ method: "POST", body: { question: longQ } }, res);
  assert.equal(res.statusCode, 400);
  assert.match(res.jsonBody.error, /too long/i);
});

test("POST with no retrieval matches returns 200 guidance", async () => {
  const res = createMockRes();
  await handleAsk(
    { method: "POST", body: { question: "qqqqqxxxxx zzzzz99991375" } },
    res
  );
  assert.equal(res.statusCode, 200);
  assert.match(res.jsonBody.answer, /couldn't match/i);
  assert.deepEqual(res.jsonBody.sources, []);
});

test("POST with matches and no API key returns 503", async () => {
  const res = createMockRes();
  await handleAsk(
    { method: "POST", body: { question: "Zanele Muholi" } },
    res,
    {
      fetchWikiSummary: async () => null,
      callOpenAI: async () => {
        const err = new Error("OPENAI_API_KEY is not configured");
        err.code = "NO_API_KEY";
        throw err;
      },
    }
  );
  assert.equal(res.statusCode, 503);
  assert.match(res.jsonBody.error, /missing OPENAI_API_KEY/);
});

test("POST with matches and stubbed OpenAI returns 200", async () => {
  const res = createMockRes();
  await handleAsk(
    { method: "POST", body: { question: "Zanele Muholi" } },
    res,
    {
      fetchWikiSummary: async () => null,
      callOpenAI: async () => "Short curated answer.",
    }
  );
  assert.equal(res.statusCode, 200);
  assert.equal(res.jsonBody.answer, "Short curated answer.");
  assert.ok(Array.isArray(res.jsonBody.sources));
  assert.ok(res.jsonBody.sources.length > 0);
  assert.equal(res.jsonBody.sources[0].seriesId, "photography");
  assert.equal(res.jsonBody.sources[0].topicId, "identity");
});
