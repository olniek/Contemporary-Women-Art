import { expect, test } from "@playwright/test";

import { APP_DATA } from "../data.js";

test("each live topic has at least two artists so explore gate is reachable", () => {
  for (const series of Object.values(APP_DATA.series)) {
    if (series.status === "coming-soon") continue;
    for (const topic of Object.values(series.topics)) {
      expect(topic.artists.length, `${series.id} / ${topic.id}`).toBeGreaterThanOrEqual(2);
    }
  }
});
