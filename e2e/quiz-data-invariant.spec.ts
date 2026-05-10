import { expect, test } from "@playwright/test";

import { APP_DATA, getQuizQuestions } from "../data.js";

test("every topic resolves to exactly five quiz questions", () => {
  for (const series of Object.values(APP_DATA.series)) {
    for (const topic of Object.values(series.topics)) {
      const bank = getQuizQuestions(series.id, topic.id);
      expect(bank, `${series.id} / ${topic.id}`).toHaveLength(5);
      bank.forEach((q) => {
        expect(q.options.length).toBeGreaterThanOrEqual(3);
        expect(q.correct).toBeGreaterThanOrEqual(0);
        expect(q.correct).toBeLessThan(q.options.length);
        expect(q.curatorNote).toBeTruthy();
      });
    }
  }
});
