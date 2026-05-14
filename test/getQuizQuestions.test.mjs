import assert from "node:assert/strict";
import test from "node:test";

import { getQuizQuestions, LEGACY_QUIZ_QUESTIONS } from "../data.js";

test("getQuizQuestions prefers topic bank when topic has exactly five items", () => {
  const bank = getQuizQuestions("videoArt", "pioneeringSingle");
  assert.equal(bank.length, 5);
  assert.match(bank[0].question, /Vertical Roll/i);
  assert.ok(bank[0].curatorNote);
});

test("getQuizQuestions uses series bank when topic has no five-item quiz", () => {
  const bank = getQuizQuestions("painting", "abstraction");
  assert.equal(bank.length, 5);
  assert.match(bank[0].question, /Frankenthaler|soak-stain/i);
});

test("getQuizQuestions falls back to legacy bank when neither topic nor series has five items", () => {
  const bank = getQuizQuestions("videoArt", "narrativeIdentity");
  assert.equal(bank.length, 5);
  assert.equal(bank[0].question, LEGACY_QUIZ_QUESTIONS[0].question);
});

test("getQuizQuestions fills curatorNote from explanation when missing", () => {
  const bank = getQuizQuestions("photography", "identity");
  const first = bank[0];
  assert.ok(first.explanation);
  assert.equal(first.curatorNote, first.explanation);
});
