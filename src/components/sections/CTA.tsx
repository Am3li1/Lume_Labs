"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function CTA() {
  return (
    <section className="border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center"
      >
        <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
          Have a project in mind?
        </h2>
        <p className="mt-4 text-text-muted">
          Let's talk about what you're trying to build and whether I'm the right fit.
        </p>
        <div className="mt-8">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md px-8 py-3 text-base font-medium transition-colors duration-200 bg-accent text-bg hover:bg-accent-hover"
          >
            Scope Your Project
          </Link>
        </div>
      </motion.div>
    </section>
  );
}