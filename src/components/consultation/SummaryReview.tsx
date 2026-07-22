"use client";

import { CONSULTATION_QUESTIONS, AnswerMap } from "@/lib/consultation-questions";
import Button from "@/components/ui/Button";

interface SummaryReviewProps {
  answers: AnswerMap;
  onEdit: (fieldId: string) => void;
  onApprove: () => void;
  onReject: () => void;
  isSubmitting?: boolean;
}

export default function SummaryReview({
  answers,
  onEdit,
  onApprove,
  onReject,
  isSubmitting,
}: SummaryReviewProps) {
  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-medium mb-2">Review your consultation</h2>
      <p className="text-neutral-400 mb-8">
        Take a look before this gets sent over. You can edit any answer.
      </p>

      <div className="divide-y divide-neutral-800 border-y border-neutral-800">
        {CONSULTATION_QUESTIONS.map((question) => {
          const answer = answers[question.id]?.trim();
          const wasAsked = question.id in answers;
          const emptyLabel = wasAsked ? "No preference given" : "Not provided";
          return (
            <div key={question.id} className="py-4 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm text-neutral-500 mb-1">{question.prompt}</p>
                <p className={answer ? "text-neutral-100" : "text-neutral-600 italic"}>
                  {answer || emptyLabel}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onEdit(question.id)}
                className="shrink-0 text-sm text-neutral-400 hover:text-neutral-100 underline underline-offset-2"
              >
                Edit
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-between gap-4">
        <Button type="button" variant="ghost" onClick={onReject} disabled={isSubmitting}>
          Start over
        </Button>
        <Button type="button" variant="primary" onClick={onApprove} disabled={isSubmitting}>
          {isSubmitting ? "Generating PRD..." : "Review PRD"}
        </Button>
      </div>
    </div>
  );
}