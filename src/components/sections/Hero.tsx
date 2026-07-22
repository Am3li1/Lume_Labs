"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="mx-auto flex max-w-4xl flex-col items-center px-6 py-32 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl md:text-6xl"
      >
        Building software that moves your business forward.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mt-6 max-w-2xl text-lg text-text-muted"
      >
        Lume Labs builds custom web applications, internal business tools,
        AI-powered solutions, and scalable platforms that help businesses
        streamline operations and grow with confidence.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-10"
      >
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-md px-8 py-3 text-base font-medium transition-colors duration-200 bg-accent text-bg hover:bg-accent-hover"
        >
          Scope Your Project
        </Link>
      </motion.div>
    </section>
  );
}