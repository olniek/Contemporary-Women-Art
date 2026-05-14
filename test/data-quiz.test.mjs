import assert from "node:assert/strict";
import test from "node:test";

import { isLegacyQuizBank } from "../data.js";

test("isLegacyQuizBank is false when topic has five questions", () => {
  assert.equal(isLegacyQuizBank("videoArt", "pioneeringSingle"), false);
});

test("isLegacyQuizBank is true when topic and series lack dedicated banks", () => {
  assert.equal(isLegacyQuizBank("videoArt", "narrativeIdentity"), true);
});
