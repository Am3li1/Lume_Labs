import { z } from "zod";

export const consultationFieldSchemas = {
  name: z.string().trim().min(1, "Please enter your name"),

  email: z
    .string()
    .trim()
    .min(1, "Please enter your email")
    .regex(
      /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address"
    ),

  projectDescription: z
    .string()
    .trim()
    .min(10, "A sentence or two helps me understand what you're building"),

  projectType: z.enum([
    "Web Application",
    "Internal Tool",
    "AI Solution",
    "Automation",
    "Something Else",
  ]),

  businessProblem: z.string().trim().min(10, "Tell me a bit more about the problem"),

  targetUsers: z.string().trim().min(1, "Please share who this is for"),

  existingSystem: z.string().trim().optional().default(""),

  keyFeatures: z.string().trim().min(5, "A few must-have features helps me scope this"),

  techPreferences: z.string().trim().optional().default(""),
  platformPreference: z.string().trim().optional().default(""),
  integrations: z.string().trim().optional().default(""),
  timeline: z.string().trim().optional().default(""),
  budget: z.string().trim().optional().default(""),
  inspiration: z.string().trim().optional().default(""),
  additionalNotes: z.string().trim().optional().default(""),
};

export const consultationAnswersSchema = z.object(consultationFieldSchemas);

export type ConsultationAnswers = z.infer<typeof consultationAnswersSchema>;

export function validateField(id: string, value: string) {
  const schema = consultationFieldSchemas[id as keyof typeof consultationFieldSchemas];
  if (!schema) return { success: true as const };

  const result = schema.safeParse(value);
  if (result.success) return { success: true as const };

  return {
    success: false as const,
    message: result.error.issues[0]?.message ?? "Invalid value",
  };
}