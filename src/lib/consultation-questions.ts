export type QuestionType = "text" | "email" | "select" | "textarea";

// The 5th stage, "PRD Review", is not tied to a question — it's the summary/approval screen.
export type ConsultationStage = "contact" | "scope" | "tech" | "budget-timeline";

export const STAGE_LABELS: Record<ConsultationStage, string> = {
  contact: "Contact Info",
  scope: "Project Scope",
  tech: "Tech & Constraints",
  "budget-timeline": "Budget & Timeline",
};

export interface ConsultationQuestion {
  id: string;
  prompt: string;
  type: QuestionType;
  required: boolean;
  stage: ConsultationStage;
  options?: string[]; // only for "select"
  placeholder?: string;
  allowFollowUp?: boolean; // marks free-text answers eligible for AI follow-up (Phase 4)
}

export const CONSULTATION_QUESTIONS: ConsultationQuestion[] = [
  {
    id: "name",
    stage: "contact",
    prompt: "What should I call you?",
    type: "text",
    required: true,
    placeholder: "Your name",
  },
  {
    id: "email",
    stage: "contact",
    prompt: "What's the best email to reach you?",
    type: "email",
    required: true,
    placeholder: "you@company.com",
  },
  {
    id: "projectDescription",
    stage: "scope",
    prompt: "What are you trying to build?",
    type: "textarea",
    required: true,
    allowFollowUp: true,
  },
  {
    id: "projectType",
    stage: "scope",
    prompt: "Which of these best describes it?",
    type: "select",
    required: true,
    options: [
      "Web Application",
      "Internal Tool",
      "AI Solution",
      "Automation",
      "Something Else",
    ],
  },
  {
    id: "businessProblem",
    stage: "scope",
    prompt: "What problem are you trying to solve?",
    type: "textarea",
    required: true,
    allowFollowUp: true,
  },
  {
    id: "targetUsers",
    stage: "scope",
    prompt: "Who will use this?",
    type: "text",
    required: true,
  },
  {
    id: "existingSystem",
    stage: "scope",
    prompt: "Do you already have an existing system in place?",
    type: "select",
    required: false,
    options: [
      "Yes, replacing or improving it",
      "Yes, but this is separate",
      "No, this is brand new",
      "Not sure yet",
    ],
  },
  {
    id: "keyFeatures",
    stage: "scope",
    prompt: "What are the must-have features for launch?",
    type: "textarea",
    required: true,
  },
  {
    id: "techPreferences",
    stage: "tech",
    prompt: "Any tech preferences or constraints I should know about?",
    type: "text",
    required: false,
    placeholder: "e.g. must use our existing AWS setup, no preference",
    allowFollowUp: true,
  },
  {
    id: "platformPreference",
    stage: "tech",
    prompt: "Any preference on platform?",
    type: "select",
    required: false,
    options: ["Web only", "Mobile app", "Both web and mobile", "Not sure yet"],
  },
  {
    id: "integrations",
    stage: "tech",
    prompt: "Does this need to connect with any existing tools or software you use?",
    type: "text",
    required: false,
  },
  {
    id: "timeline",
    stage: "budget-timeline",
    prompt: "Do you have a deadline in mind?",
    type: "select",
    required: false,
    options: [
      "ASAP",
      "Within 1–3 months",
      "Within 3–6 months",
      "Flexible / no fixed deadline",
    ],
  },
  {
    id: "budget",
    stage: "budget-timeline",
    prompt: "Approximate budget?",
    type: "select",
    required: false,
    options: [
      "Under $5,000",
      "$5,000 – $15,000",
      "$15,000 – $40,000",
      "$40,000+",
      "Prefer not to say",
    ],
  },
  {
    id: "inspiration",
    stage: "tech",
    prompt: "Any products or websites whose look or feel you like?",
    type: "text",
    required: false,
  },
  {
    id: "additionalNotes",
    stage: "budget-timeline",
    prompt: "Anything else I should know?",
    type: "textarea",
    required: false,
  },
];

export type AnswerMap = Record<string, string>;