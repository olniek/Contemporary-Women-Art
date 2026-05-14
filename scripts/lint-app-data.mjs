/**
 * Data invariants for APP_DATA (run in CI via npm run lint:data).
 */
import { APP_DATA, getQuizQuestions } from "../data.js";

const issues = [];

for (const [seriesId, series] of Object.entries(APP_DATA.series)) {
  if (series.status === "coming-soon") continue;
  if (!series.id || series.id !== seriesId) {
    issues.push(`series key ${seriesId} mismatches series.id`);
  }
  for (const [topicId, topic] of Object.entries(series.topics)) {
    const bank = getQuizQuestions(seriesId, topicId);
    if (bank.length !== 5) {
      issues.push(`Quiz bank for ${seriesId}/${topicId}: expected 5 questions, got ${bank.length}`);
    }
    for (const q of bank) {
      if (!q.question) issues.push(`Empty question in ${seriesId}/${topicId}`);
      if (!Array.isArray(q.options) || q.options.length < 2) {
        issues.push(`Bad options in ${seriesId}/${topicId}`);
      }
      if (typeof q.correct !== "number" || q.options[q.correct] == null) {
        issues.push(`Bad correct index in ${seriesId}/${topicId}`);
      }
    }
    for (const artist of topic.artists) {
      if (!artist.id) issues.push(`Missing artist.id in ${seriesId}/${topicId}`);
      if (!artist.name) issues.push(`Missing artist.name in ${seriesId}/${topicId}`);
      if (!artist.insight) issues.push(`Missing insight for ${artist.id}`);
      if (artist.image && !artist.imageAlt) {
        issues.push(`Missing imageAlt for ${artist.id} (has image)`);
      }
    }
  }
}

if (issues.length) {
  console.error("lint:data failed:\n" + issues.join("\n"));
  process.exit(1);
}
console.log("lint:data OK");
