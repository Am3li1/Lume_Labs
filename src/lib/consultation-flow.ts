import { CONSULTATION_QUESTIONS, ConsultationQuestion, AnswerMap } from "./consultation-questions";

/**
 * The next question to ask, in strict array order.
 * A field counts as "asked" once it has a key in collectedFields,
 * even if the value is an empty string (an explicit skip on an optional field).
 * Returns null once every question has been asked.
 */
export function getNextQuestion(collectedFields: AnswerMap): ConsultationQuestion | null {
  return CONSULTATION_QUESTIONS.find((q) => !(q.id in collectedFields)) ?? null;
}

/**
 * True only once every question — required AND optional — has been
 * asked (i.e. has a key in collectedFields, even "" for a skipped
 * optional field). This must stay derived from getNextQuestion so the
 * two can never drift apart: "ready for summary" and "nothing left to
 * ask" are the same condition, not two independently-tracked ones.
 */
export function isReadyForSummary(collectedFields: AnswerMap): boolean {
  return getNextQuestion(collectedFields) === null;
}