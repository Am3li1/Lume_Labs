import Hero from "@/components/sections/Hero";
import TechStack from "@/components/sections/TechStack";
import Services from "@/components/sections/Services";
import CTA from "@/components/sections/CTA";
import type { Metadata } from "next";
export default function Home() {
  return (
    <main>
      <Hero />
      <TechStack />
      <Services />
      <CTA />
    </main>
  );
}

export const metadata: Metadata = {
  title: "Lume Labs — Custom Software Consultancy",
  description:"Lume Labs builds custom web applications, business tools, and AI-powered software. Founded by Amelia Santosh.",
  alternates: { canonical: "https://lumelabs.dev" },
};