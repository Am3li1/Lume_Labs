import { NextRequest, NextResponse } from "next/server";
import { generateObject } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { prdContentSchema } from "@/lib/prd-schema";
import { AnswerMap } from "@/lib/consultation-questions";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const google = createGoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });

function buildPrompt(fields: AnswerMap) {
  const lines =
    Object.entries(fields)
      .filter(([, v]) => v?.trim())
      .map(([k, v]) => `- ${k}: ${v}`)
      .join("\n") || "(no fields collected)";

  return `You are a technical consultant at Lume Labs, a software consultancy, writing an internal Product Requirements Document based on a client intake conversation.

Client intake data:
${lines}

Write a clean, professional PRD grounded ONLY in the information above.
- Do not invent features, numbers, dates, or scope items that weren't mentioned.
- If budget or timeline weren't specified, state plainly that they're flexible or to be determined — never guess a figure.
- Functional requirements should be concrete and derived from the must-have features and project description, not generic boilerplate.
- Keep tone professional but not stiff — this is a real brief for a real project, not filler text.`;
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const { allowed } = checkRateLimit(`prd:${ip}`, 5, 60_000);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests — please wait a moment and try again." },
        { status: 429 }
      );
    }

    const { collectedFields } = (await req.json()) as { collectedFields: AnswerMap };

    const { object } = await generateObject({
      model: google(process.env.GEMINI_MODEL ?? "gemini-3.1-flash"),
      schema: prdContentSchema,
      prompt: buildPrompt(collectedFields ?? {}),
    });

    return NextResponse.json({ prd: object });
  } catch (err) {
    console.error("PRD generation failed:", err);
    return NextResponse.json({ error: "Failed to generate the PRD. Please try again." }, { status: 500 });
  }
}