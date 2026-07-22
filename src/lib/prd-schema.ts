import { z } from "zod";

export const prdContentSchema = z.object({
  executiveSummary: z
    .string()
    .describe("2-4 sentence high-level overview of the project and the business value it delivers."),
  problemStatement: z
    .string()
    .describe("The core problem or business need being solved, grounded in the client's own words."),
  functionalRequirements: z
    .array(z.string())
    .describe("Specific, concrete functional requirements derived from the must-have features and project description."),
  inScope: z.array(z.string()).describe("What is explicitly included in this engagement."),
  outOfScope: z
    .array(z.string())
    .describe("What is explicitly excluded, to set expectations. Empty array if nothing was clearly excluded."),
  budgetAndTimelineSummary: z
    .string()
    .describe(
      "A short paragraph summarizing budget range and timeline. If either wasn't provided, say so plainly — do not guess a number or date."
    ),
});

export type PRDContent = z.infer<typeof prdContentSchema>;