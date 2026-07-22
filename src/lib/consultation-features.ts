const FEATURE_SUGGESTIONS: Record<string, string[]> = {
  "Web Application": [
    "User authentication",
    "Dashboard & analytics",
    "Search & filtering",
    "Notifications",
    "File uploads",
    "Admin panel",
  ],
  "Internal Tool": [
    "User roles & permissions",
    "Reporting & exports",
    "Audit logs",
    "Bulk data import",
    "Approval workflows",
    "Admin panel",
  ],
  "AI Solution": [
    "Chatbot / conversational interface",
    "Document or data ingestion",
    "Automated report generation",
    "Custom model or prompt logic",
    "Analytics dashboard",
    "Third-party API integrations",
  ],
  Automation: [
    "Scheduled tasks",
    "Workflow triggers",
    "Email or SMS notifications",
    "Third-party integrations",
    "Error logging & alerts",
    "Approval workflows",
  ],
};

const DEFAULT_SUGGESTIONS = [
  "User authentication",
  "Dashboard & analytics",
  "Notifications",
  "Admin panel",
];

export function getFeatureSuggestions(projectType?: string): string[] {
  if (!projectType) return DEFAULT_SUGGESTIONS;
  return FEATURE_SUGGESTIONS[projectType] ?? DEFAULT_SUGGESTIONS;
}