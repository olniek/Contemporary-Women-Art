/**
 * Browser entry for curatorial data. Bump APP_ASSET_VERSION in app-version.js
 * and update the data.js import query below to match (enforced by test).
 */
import { APP_ASSET_VERSION } from "./app-version.js";

void APP_ASSET_VERSION;

export {
  APP_DATA,
  LEGACY_QUIZ_QUESTIONS,
  getQuizQuestions,
  isLegacyQuizBank,
  quizQuestionCount,
  SHORT_SESSION_POOL,
  shortSessionAnchorForDay,
} from "../data.js?v=20260515-pm-plan";
