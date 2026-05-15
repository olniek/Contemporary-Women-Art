/**
 * Browser entry for curatorial data. Bump the query when APP_DATA changes so
 * cached data.js modules reload (e.g. removing coming-soon on a series).
 */
export {
  APP_DATA,
  LEGACY_QUIZ_QUESTIONS,
  getQuizQuestions,
  isLegacyQuizBank,
  quizQuestionCount,
  SHORT_SESSION_POOL,
  shortSessionAnchorForDay,
} from "../data.js?v=20260515-sculpture-live";
