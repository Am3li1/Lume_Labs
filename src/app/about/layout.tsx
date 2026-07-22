"use client";
import { motion } from "framer-motion";

export default function About() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-text-primary"
      >
        About Lume Labs
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mt-8 space-y-6 text-text-muted"
      >
        <p>
          Lume Labs is a software consultancy building custom web
          applications, internal tools, and AI-powered systems for
          businesses that need software done right.
        </p>
        <p>
          Every engagement gets direct, hands-on engineering — no account
          managers, no unnecessary layers between you and the team building
          your software. From the first conversation to deployment, you're
          talking directly to the people doing the work.
        </p>
        <p>
          The focus is on building software that's reliable, maintainable,
          and built around how your business actually works — not generic
          templates retrofitted to fit.
        </p>
      </motion.div>
    </main>
  );
}