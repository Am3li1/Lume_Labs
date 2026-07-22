"use client";
import { motion } from "framer-motion";

const PROJECTS = [
  {
    client: "Furniture Manufacturer",
    project: "BOM Costing & Production Management System",
    status: "In active development",
    summary:
      "A custom Django application that replaces manual spreadsheet costing with automated BOM calculations, production planning, and reporting.",
    tech: ["Django", "Python", "PostgreSQL", "Docker", "Pandas"],
  },
];

export default function Work() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-text-primary"
      >
        Work
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-4 text-text-muted"
      >
        A selection of projects built by Lume Labs.
      </motion.p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {PROJECTS.map((p, index) => (
          <motion.div
            key={p.project}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="rounded-lg border border-border bg-surface p-6 transition-colors hover:bg-surface-hover"
          >
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-base font-semibold text-text-primary">
                {p.project}
              </h2>
              <span className="shrink-0 rounded-full border border-border bg-bg px-2.5 py-0.5 text-[10px] font-medium text-text-muted">
                {p.status}
              </span>
            </div>
            <p className="mt-1 text-xs text-text-muted">{p.client}</p>
            <p className="mt-3 text-sm text-text-muted">{p.summary}</p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-bg px-2 py-0.5 font-mono text-[11px] text-text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}