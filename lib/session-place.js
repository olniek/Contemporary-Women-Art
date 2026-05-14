import { APP_DATA } from "../data.js";

const WIA_LAST_PLACE = "wia_last_place";
const WIA_TOPIC_QUIZ_DONE = "wia_topic_quiz_done";

export function readLastPlace() {
  try {
    const j = JSON.parse(localStorage.getItem(WIA_LAST_PLACE) || "null");
    if (!j || typeof j.seriesId !== "string" || typeof j.topicId !== "string") return null;
    const s = APP_DATA.series[j.seriesId];
    if (!s || s.status === "coming-soon") return null;
    if (!s.topics[j.topicId]) return null;
    return j;
  } catch {
    return null;
  }
}

export function saveLastPlace(seriesId, topicId) {
  try {
    localStorage.setItem(WIA_LAST_PLACE, JSON.stringify({ seriesId, topicId }));
  } catch {
    /* private mode */
  }
}

function readTopicQuizDoneMap() {
  try {
    const j = JSON.parse(localStorage.getItem(WIA_TOPIC_QUIZ_DONE) || "{}");
    return j && typeof j === "object" && !Array.isArray(j) ? j : {};
  } catch {
    return {};
  }
}

function topicQuizDoneKey(seriesId, topicId) {
  return `${seriesId}:${topicId}`;
}

export function hasTopicQuizDone(seriesId, topicId) {
  return !!readTopicQuizDoneMap()[topicQuizDoneKey(seriesId, topicId)];
}

export function markTopicQuizDone(seriesId, topicId) {
  const m = readTopicQuizDoneMap();
  m[topicQuizDoneKey(seriesId, topicId)] = true;
  try {
    localStorage.setItem(WIA_TOPIC_QUIZ_DONE, JSON.stringify(m));
  } catch {
    /* private mode */
  }
}
