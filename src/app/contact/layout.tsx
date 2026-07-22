import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a free consultation with Lume Labs or send a message directly. I'll get back to you within 1–2 business days.",
  alternates: { canonical: "https://lumelabs.dev/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}