interface ChatMessageProps {
  role: "assistant" | "user";
  content: string;
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  const isAssistant = role === "assistant";

  return (
    <div className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
          isAssistant
            ? "bg-neutral-900 border border-neutral-800 text-neutral-100"
            : "bg-neutral-100 text-neutral-900"
        }`}
      >
        {content}
      </div>
    </div>
  );
}