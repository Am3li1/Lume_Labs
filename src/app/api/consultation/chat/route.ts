import { NextRequest, NextResponse } from "next/server";
import { generateObject } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { z } from "zod";
import { ConsultationQuestion, AnswerMap } from "@/lib/consultation-questions";
import { getNextQuestion, isReadyForSummary } from "@/lib/consultation-flow";
import { validateField } from "@/lib/consultation-schema";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

interface ChatMessage {
  role: "assistant" | "user";
  content: string;
}

const google = createGoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });

const turnSchema = z.object({
  extractedValue: z
    .string()
    .describe(
      "The value extracted from the client's latest message for the CURRENT question only. Empty string if they didn't answer it or explicitly asked to skip."
    ),
  needsClarification: z
    .boolean()
    .describe(
      "True if the client's message doesn't clearly answer the current question and you need to ask again."
    ),
  reply: z
    .string()
    .describe(
      "Your next message to the client: either a natural re-ask of the current question, or a brief acknowledgment plus the next question."
    ),
});

function buildSystemPrompt(
  currentQuestion: ConsultationQuestion,
  nextQuestion: ConsultationQuestion | null,
  collectedFields: AnswerMap
) {
  const collectedSummary =
    Object.entries(collectedFields)
      .filter(([, v]) => v)
      .map(([k, v]) => `- ${k}: ${v}`)
      .join("\n") || "(nothing yet)";

  const optionsHint = currentQuestion.options
    ? ` Valid options: ${currentQuestion.options.join(", ")}.`
    : "";

  return `You are an experienced technical consultant at a software agency called Lume Labs, having a natural conversation with a prospective client to scope their project.

You are currently asking about ONE specific thing, and only this:
"${currentQuestion.prompt}"${optionsHint}
This field is ${currentQuestion.required ? "required" : "optional — the client may skip it"}.

Already collected:
${collectedSummary}

Your job this turn:
1. Read the client's latest message. Does it answer "${currentQuestion.prompt}"?
   - If yes: set extractedValue to a clean, concise version of their answer. needsClarification: false.
   - If they explicitly want to skip an OPTIONAL field: extractedValue "". needsClarification: false.
   - If their message is vague, off-topic, or doesn't answer this question: extractedValue "". needsClarification: true.
2. Write "reply":
   - If needsClarification is true: gently re-ask the SAME question — don't move on. Offer 2-3 concrete examples relevant to a small business software project if it might help them respond.
   - If needsClarification is false: give a brief, warm acknowledgment, then ask the next question naturally: ${
     nextQuestion
       ? `"${nextQuestion.prompt}"`
       : "let them know you have everything you need and they can review their summary now."
   }

Rules:
- Keep messages short and conversational — this is a chat, not a form.
- Never ask about anything other than "${currentQuestion.prompt}" or, once that's answered, "${
    nextQuestion?.prompt ?? "the closing message"
  }". Do not jump ahead to other topics.
- Don't re-litigate fields already collected above.`;
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const { allowed } = checkRateLimit(`chat:${ip}`, 20, 60_000);
    if (!allowed) {
      return NextResponse.json(
        {
          reply: "You're sending messages a bit fast — please wait a moment and try again.",
          updatedFields: {},
          readyForSummary: false,
        },
        { status: 429 }
      );
    }

    const { messages, collectedFields } = (await req.json()) as {
      messages: ChatMessage[];
      collectedFields: AnswerMap;
    };

    const safeCollectedFields = collectedFields ?? {};
    const currentQuestion = getNextQuestion(safeCollectedFields);

    // Every question already answered — nothing left for the model to do.
    if (!currentQuestion) {
      return NextResponse.json({
        reply: "I've got everything I need — take a look at your summary below.",
        updatedFields: {},
        readyForSummary: isReadyForSummary(safeCollectedFields),
      });
    }

    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");

    // First turn — nothing to extract from yet, just surface the question.
    if (!lastUserMessage) {
      return NextResponse.json({
        reply: currentQuestion.prompt,
        updatedFields: {},
        readyForSummary: false,
      });
    }

    // What would come next IF this turn's answer is accepted — used only to phrase the reply.
    const hypotheticalNext = getNextQuestion({
      ...safeCollectedFields,
      [currentQuestion.id]: "placeholder",
    });

    const { object } = await generateObject({
      model: google(process.env.GEMINI_MODEL ?? "gemini-3.1-flash"),
      schema: turnSchema,
      system: buildSystemPrompt(currentQuestion, hypotheticalNext, safeCollectedFields),
      messages: messages.map((m) => ({
        role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
        content: m.content,
      })),
    });

    // Server re-validates independently — the model's own "needsClarification" flag is never trusted alone.
    const validation = validateField(currentQuestion.id, object.extractedValue);
    const accepted = !object.needsClarification && validation.success;

    const updatedFields: AnswerMap = accepted ? { [currentQuestion.id]: object.extractedValue } : {};
    const mergedFields = { ...safeCollectedFields, ...updatedFields };

    let reply: string;
    if (accepted || object.needsClarification) {
      // Either the model correctly extracted a value, or it correctly asked for clarification — trust its wording either way.
      reply = object.reply;
    } else {
      // Model claimed success but server validation disagrees — don't surface a confusing reply, fall back to a clean re-ask.
      reply = `Sorry, I didn't quite catch that. ${currentQuestion.prompt}`;
    }

    return NextResponse.json({
      reply,
      updatedFields,
      readyForSummary: isReadyForSummary(mergedFields),
    });
  } catch (err) {
    console.error("Consultation chat failed:", err);
    return NextResponse.json({
      reply: "Sorry, I'm having trouble connecting right now. Could you try sending that again?",
      updatedFields: {},
      readyForSummary: false,
    });
  }
}