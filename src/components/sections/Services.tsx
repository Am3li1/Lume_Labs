"use client";
import { motion } from "framer-motion";

const SERVICES = [
  {
    title: "Custom Web Applications",
    description:
      "Bespoke web applications designed to streamline operations, improve productivity, and support your business as it grows.",
  },
  {
    title: "Business Automation & Internal Tools",
    description:
      "Dashboards, admin panels, inventory systems, CRM solutions, procurement platforms, and workflow automation tailored to your business.",
  },
  {
    title: "AI Solutions & Intelligent Automation",
    description:
      "AI-powered features including chatbots, document processing, intelligent search, reporting, and workflow automation integrated into your applications.",
  },
  {
    title: "Scalable Backend & Cloud Infrastructure",
    description:
      "Secure APIs, database architecture, authentication, cloud deployment, and backend systems built for reliability and future growth.",
  },
];

export default function Services() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-text-primary sm:text-4xl"
      >
        What I Build
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-3 max-w-2xl text-text-muted"
      >
        End-to-end software, engineered around the outcomes your business actually needs.
      </motion.p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {SERVICES.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="rounded-lg border border-border bg-surface p-6 transition-colors hover:bg-surface-hover"
          >
            <h3 className="text-lg font-semibold text-text-primary">
              {service.title}
            </h3>
            <p className="mt-2 text-sm text-text-muted">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}