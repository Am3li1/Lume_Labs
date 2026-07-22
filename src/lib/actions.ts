"use server";

import { Resend } from "resend";
import { headers } from "next/headers";
import { PRDContent } from "@/lib/prd-schema";
import { AnswerMap } from "@/lib/consultation-questions";
import { checkRateLimit } from "@/lib/rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: FormData) {
  const hdrs = await headers();
  const ip = hdrs.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const { allowed } = checkRateLimit(`contact-form:${ip}`, 5, 60_000);
  if (!allowed) {
    return { success: false, error: "Too many attempts — please wait a moment and try again." };
  }

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { success: false, error: "All fields are required." };
  }

  try {
    await resend.emails.send({
      from: "Lume Labs <hello@lumelabs.dev>",
      to: "hello@lumelabs.dev", // your inbox — swap if different
      replyTo: email,
      subject: `New project inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return { success: true };
  } catch (error) {
    console.error("Email send failed:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

function formatPRDText(prd: PRDContent): string {
  const lines = [
    "EXECUTIVE SUMMARY",
    prd.executiveSummary,
    "",
    "PROBLEM STATEMENT",
    prd.problemStatement,
    "",
    "FUNCTIONAL REQUIREMENTS",
    ...prd.functionalRequirements.map((r) => `- ${r}`),
    "",
    "IN SCOPE",
    ...prd.inScope.map((r) => `- ${r}`),
  ];

  if (prd.outOfScope.length > 0) {
    lines.push("", "OUT OF SCOPE", ...prd.outOfScope.map((r) => `- ${r}`));
  }

  lines.push("", "BUDGET & TIMELINE", prd.budgetAndTimelineSummary);

  return lines.join("\n");
}

/**
 * Sends the generated PRD to both the internal Lume Labs inbox and the client's
 * own email. Requires a validated client email already present in collectedFields —
 * the consultation flow guarantees this since "email" is a required, sequential field.
 */
export async function sendConsultationPRD(prd: PRDContent, answers: AnswerMap) {
  const hdrs = await headers();
  const ip = hdrs.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const { allowed } = checkRateLimit(`send-prd:${ip}`, 3, 60_000);
  if (!allowed) {
    return { success: false, error: "Too many attempts — please wait a moment and try again." };
  }

  const clientEmail = answers.email?.trim();
  const clientName = answers.name?.trim() || "there";

  if (!clientEmail) {
    return { success: false, error: "Missing client email — can't send the PRD." };
  }

  const prdText = formatPRDText(prd);

  try {
    await resend.emails.send({
      from: "Lume Labs <hello@lumelabs.dev>",
      to: "hello@lumelabs.dev",
      replyTo: clientEmail,
      subject: `New PRD: ${clientName}`,
      text: `Client: ${clientName} <${clientEmail}>\n\n${prdText}`,
    });

    await resend.emails.send({
      from: "Lume Labs <hello@lumelabs.dev>",
      to: clientEmail,
      subject: `Your Lume Labs Project Brief — ${clientName}`,
      text: `Hi ${clientName},\n\nThanks for walking through your project with me. Here's a copy of what we put together:\n\n${prdText}\n\nI'll follow up within 1-2 business days.\n\n— Amelia, Lume Labs`,
    });

    return { success: true };
  } catch (error) {
    console.error("PRD email send failed:", error);
    return { success: false, error: "Something went wrong sending the PRD. Please try again." };
  }
}