"use client";

import { motion } from "framer-motion";
import ConsultationChat from "@/components/consultation/ConsultationChat";

export default function Contact() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-medium text-text-primary"
      >
        Let&apos;s scope your project
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-3 text-text-muted"
      >
        Answer a few questions about your project — I&apos;ll get back to you within 1–2 business days.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-10"
      >
        <ConsultationChat />
      </motion.div>
    </main>
  );
}