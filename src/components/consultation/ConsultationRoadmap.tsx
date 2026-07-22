"use client";

import { motion } from "framer-motion";
import {
  CONSULTATION_QUESTIONS,
  STAGE_LABELS,
  ConsultationStage,
  AnswerMap,
} from "@/lib/consultation-questions";
import { getNextQuestion } from "@/lib/consultation-flow";

const STAGES: ConsultationStage[] = ["contact", "scope", "tech", "budget-timeline"];

interface ConsultationRoadmapProps {
  collectedFields: AnswerMap;
  /** True once the client has reached the PRD summary screen. */
  isSummary?: boolean;
}

export default function ConsultationRoadmap({
  collectedFields,
  isSummary = false,
}: ConsultationRoadmapProps) {
  const answeredCount = CONSULTATION_QUESTIONS.filter((q) => q.id in collectedFields).length;
  const totalCount = CONSULTATION_QUESTIONS.length;

  const nextQuestion = getNextQuestion(collectedFields);
  const currentStage = isSummary || !nextQuestion ? "prd-review" : nextQuestion.stage;
  const currentIndex =
    currentStage === "prd-review" ? STAGES.length : STAGES.indexOf(currentStage as ConsultationStage);

  return (
    <div className="sticky top-0 z-10 mb-6 bg-neutral-950/90 backdrop-blur-sm pt-4 pb-4 -mx-4 px-4">
      <div className="flex justify-between mb-3 font-mono text-xs text-neutral-500">
        <span>Project brief progress</span>
        <span>
          {Math.min(answeredCount, totalCount)} / {totalCount}
        </span>
      </div>

      <div className="flex items-start gap-2">
        {[...STAGES, "prd-review" as const].map((stage, i) => {
          const done = i < currentIndex;
          const active = i === currentIndex;
          const label = stage === "prd-review" ? "PRD Review" : STAGE_LABELS[stage];

          return (
            <div key={stage} className="flex-1 min-w-0">
              <div className="h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                <motion.div
                  className="h-full bg-neutral-100"
                  initial={false}
                  animate={{ width: done ? "100%" : active ? "50%" : "0%" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
              <p
                className={`mt-1.5 text-[10px] font-mono truncate ${
                  active || done ? "text-neutral-200" : "text-neutral-600"
                }`}
                title={label}
              >
                {label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}