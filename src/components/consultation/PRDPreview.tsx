"use client";

import { PRDContent } from "@/lib/prd-schema";
import Button from "@/components/ui/Button";

interface PRDPreviewProps {
  prd: PRDContent;
  onApprove: () => void;
  onBack: () => void;
  isSending?: boolean;
  sendError?: string | null;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="mb-2 font-mono text-xs uppercase tracking-wide text-neutral-500">{title}</h3>
      {children}
    </section>
  );
}

export default function PRDPreview({ prd, onApprove, onBack, isSending, sendError }: PRDPreviewProps) {
  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-medium mb-2">Project Requirements Document</h2>
      <p className="text-neutral-400 mb-8">
        Here&apos;s the brief, ready to send. Approving sends a copy to you and to Lume Labs.
      </p>

      <div className="space-y-6 border-y border-neutral-800 py-6 text-sm text-neutral-200">
        <Section title="Executive Summary">
          <p>{prd.executiveSummary}</p>
        </Section>

        <Section title="Problem Statement">
          <p>{prd.problemStatement}</p>
        </Section>

        <Section title="Functional Requirements">
          <ul className="list-inside list-disc space-y-1">
            {prd.functionalRequirements.map((req, i) => (
              <li key={i}>{req}</li>
            ))}
          </ul>
        </Section>

        <Section title="In Scope">
          <ul className="list-inside list-disc space-y-1">
            {prd.inScope.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Section>

        {prd.outOfScope.length > 0 && (
          <Section title="Out of Scope">
            <ul className="list-inside list-disc space-y-1 text-neutral-400">
              {prd.outOfScope.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </Section>
        )}

        <Section title="Budget & Timeline">
          <p>{prd.budgetAndTimelineSummary}</p>
        </Section>
      </div>

      {sendError && <p className="mt-4 text-sm text-red-400">{sendError}</p>}

      <div className="mt-8 flex justify-between gap-4">
        <Button type="button" variant="ghost" onClick={onBack} disabled={isSending}>
          Back to summary
        </Button>
        <Button type="button" variant="primary" onClick={onApprove} disabled={isSending}>
          {isSending ? "Sending..." : "Approve & Send PRD"}
        </Button>
      </div>
    </div>
  );
}