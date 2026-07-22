"use client";

import { useEffect, useRef, useState } from "react";
import { CONSULTATION_QUESTIONS } from "@/lib/consultation-questions";
import { getNextQuestion } from "@/lib/consultation-flow";
import { getFeatureSuggestions } from "@/lib/consultation-features";
import ChatMessage from "./ChatMessage";
import ConsultationRoadmap from "./ConsultationRoadmap";
import ChoicePills from "./ChoicePills";
import SummaryReview from "./SummaryReview";
import PRDPreview from "./PRDPreview";
import Button from "@/components/ui/Button";
import { PRDContent } from "@/lib/prd-schema";
import { sendConsultationPRD } from "@/lib/actions";

interface Message {
  role: "assistant" | "user";
  content: string;
}

type Phase = "chatting" | "summary" | "prdPreview" | "submitted";

interface ChatApiResponse {
  reply: string;
  updatedFields: Record<string, string>;
  readyForSummary: boolean;
}

const GREETING: Message = {
  role: "assistant",
  content:
    "Hi, I'm here to help scope your project. This'll feel like a quick conversation rather than a form — first up, what should I call you?",
};

export default function ConsultationChat() {
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [collectedFields, setCollectedFields] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<Phase>("chatting");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prd, setPrd] = useState<PRDContent | null>(null);
  const [isGeneratingPrd, setIsGeneratingPrd] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, phase]);

  async function handleSend(overrideValue?: string) {
    const trimmed = (overrideValue ?? input).trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: "user", content: trimmed };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/consultation/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, collectedFields }),
      });
      const data = (await res.json()) as ChatApiResponse;

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      setCollectedFields((prev) => ({ ...prev, ...data.updatedFields }));

      if (data.readyForSummary) {
        setPhase("summary");
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong on my end. Could you try sending that again?",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  }

  function handleEditField(fieldId: string) {
    const question = CONSULTATION_QUESTIONS.find((q) => q.id === fieldId);
    if (!question) return;

    setCollectedFields((prev) => {
      const next = { ...prev };
      delete next[fieldId];
      return next;
    });
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: `Let's revisit this — ${question.prompt.toLowerCase()}` },
    ]);
    setPhase("chatting");
  }

  function handlePillSelect(value: string) {
    handleSend(value);
  }

  function handleOther() {
    inputRef.current?.focus();
  }

  function handleReject() {
    setMessages([GREETING]);
    setCollectedFields({});
    setPhase("chatting");
  }

  async function handleGeneratePrd() {
    setIsGeneratingPrd(true);
    setSendError(null);

    try {
      const res = await fetch("/api/consultation/prd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collectedFields }),
      });

      if (!res.ok) throw new Error("PRD generation failed");

      const data = (await res.json()) as { prd: PRDContent };
      setPrd(data.prd);
      setPhase("prdPreview");
    } catch {
      setSendError("Couldn't generate the PRD. Please try again.");
    } finally {
      setIsGeneratingPrd(false);
    }
  }

  function handleBackToSummary() {
    setPhase("summary");
  }

  async function handleSendPrd() {
    if (!prd) return;
    setIsSubmitting(true);
    setSendError(null);

    const result = await sendConsultationPRD(prd, collectedFields);

    if (result.success) {
      setPhase("submitted");
    } else {
      setSendError(result.error ?? "Something went wrong. Please try again.");
    }
    setIsSubmitting(false);
  }

  if (phase === "submitted") {
    return (
      <div className="max-w-xl mx-auto text-center py-12">
        <h2 className="text-2xl font-medium mb-2">Thanks — that's everything I need.</h2>
        <p className="text-neutral-400">
          I'll review your project brief and get back to you shortly.
        </p>
      </div>
    );
  }

  if (phase === "summary") {
    return (
      <div className="max-w-xl mx-auto">
        <ConsultationRoadmap collectedFields={collectedFields} isSummary />
        {sendError && <p className="mb-4 text-sm text-red-400">{sendError}</p>}
        <SummaryReview
          answers={collectedFields}
          onEdit={handleEditField}
          onApprove={handleGeneratePrd}
          onReject={handleReject}
          isSubmitting={isGeneratingPrd}
        />
      </div>
    );
  }

  if (phase === "prdPreview" && prd) {
    return (
      <div className="max-w-xl mx-auto">
        <ConsultationRoadmap collectedFields={collectedFields} isSummary />
        <PRDPreview
          prd={prd}
          onApprove={handleSendPrd}
          onBack={handleBackToSummary}
          isSending={isSubmitting}
          sendError={sendError}
        />
      </div>
    );
  }

  const currentQuestion = getNextQuestion(collectedFields);
  const isKeyFeatures = currentQuestion?.id === "keyFeatures";
  const pillOptions = isKeyFeatures
    ? getFeatureSuggestions(collectedFields.projectType)
    : currentQuestion?.options ?? [];

  return (
    <div className="max-w-xl mx-auto flex flex-col h-[70vh]">
      <ConsultationRoadmap collectedFields={collectedFields} />

      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {messages.map((message, i) => (
          <ChatMessage key={i} role={message.role} content={message.content} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-2xl px-4 py-3 bg-neutral-900 border border-neutral-800 text-neutral-500 text-sm">
              Typing...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {currentQuestion && (
        <ChoicePills
          options={pillOptions}
          allowSkip={!currentQuestion.required && !currentQuestion.options}
          onSelect={handlePillSelect}
          onOther={handleOther}
          disabled={isLoading}
          multiple={isKeyFeatures}
        />
      )}

      <div className="mt-4 flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          placeholder="Type your answer..."
          className="flex-1 rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3 text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-500 disabled:opacity-50"
        />
        <Button type="button" variant="primary" onClick={() => handleSend()} disabled={isLoading || !input.trim()}>
          Send
        </Button>
      </div>
    </div>
  );
}