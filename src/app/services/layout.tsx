import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom web applications, business automation, AI solutions, and scalable backend infrastructure — built by Lume Labs.",
  alternates: { canonical: "https://lumelabs.dev/services" },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}