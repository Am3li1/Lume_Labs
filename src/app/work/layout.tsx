import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Projects built by Lume Labs — including a full-stack production management system for a furniture manufacturer.",
  alternates: { canonical: "https://lumelabs.dev/work" },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}