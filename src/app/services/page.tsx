"use client";
import { motion } from "framer-motion";

const SERVICES = [
  {
    title: "Custom Web Applications",
    description:
      "Bespoke web applications designed to streamline operations, improve productivity, and support your business as it grows.",
    details:
      "Built with React, Next.js, and TypeScript on the frontend, with Node.js/Express or Django on the backend depending on your needs — tailored to your existing workflows rather than forcing a generic template.",
  },
  {
    title: "Business Automation & Internal Tools",
    description:
      "Dashboards, admin panels, inventory systems, CRM solutions, procurement platforms, and workflow automation tailored to your business.",
    details:
      "Internal tools that replace manual spreadsheets and disconnected processes with a single, reliable system — including rapid-prototyping with Streamlit for data-heavy internal dashboards.",
  },
  {
    title: "AI Solutions & Intelligent Automation",
    description:
      "AI-powered features including chatbots, document processing, intelligent search, reporting, and workflow automation integrated into your applications.",
    details:
      "Practical AI integration — not AI for its own sake. Document processing, intelligent search, and automation features added where they genuinely reduce manual work.",
  },
  {
    title: "Scalable Backend & Cloud Infrastructure",
    description:
      "Secure APIs, database architecture, authentication, cloud deployment, and backend systems built for reliability and future growth.",
    details:
      "PostgreSQL or MongoDB depending on your data shape, containerized with Docker, and deployed on infrastructure built to scale with you — not over-engineered for a problem you don't have yet.",
  },
];

export default function Services() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-text-primary"
      >
        Services
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-4 text-text-muted"
      >
        Four core areas, each adapted to your specific problem rather than a fixed package.
      </motion.p>

      <div className="mt-12 space-y-8">
        {SERVICES.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="rounded-lg border border-border bg-surface p-8"
          >
            <h2 className="text-xl font-semibold text-text-primary">
              {service.title}
            </h2>
            <p className="mt-2 text-text-muted">{service.description}</p>
            <p className="mt-4 text-sm text-text-muted">{service.details}</p>
          </motion.div>
        ))}
      </div>
    </main>
  );
}