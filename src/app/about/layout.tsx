import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Lume Labs is a one-person software consultancy by Amelia Santosh. Every project gets direct, senior-level engineering from first conversation to deployment.",
  alternates: { canonical: "https://lumelabs.dev/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}