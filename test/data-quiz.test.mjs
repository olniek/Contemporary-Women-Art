import assert from "node:assert/strict";
import test from "node:test";

import { isLegacyQuizBank } from "../data.js";

test("isLegacyQuizBank is false when topic has five questions", () => {
  assert.equal(isLegacyQuizBank("videoArt", "pioneeringSingle"), false);
});

test("isLegacyQuizBank is false when all video art topics have dedicated banks", () => {
  assert.equal(isLegacyQuizBank("videoArt", "narrativeIdentity"), false);
  assert.equal(isLegacyQuizBank("videoArt", "installationEnvironment"), false);
});
