"use client";
import { motion } from "framer-motion";
import {
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiDjango,
  SiPostgresql, SiMongodb, SiPython, SiDocker, SiGit,
} from "react-icons/si";

const TECH_STACK = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Django", icon: SiDjango, color: "#092E20" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Git", icon: SiGit, color: "#F05032" },
];

export default function TechStack() {
  return (
    <section className="border-y border-border bg-surface/50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <p className="text-center text-sm font-medium uppercase tracking-wider text-text-muted">
          Built with
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {TECH_STACK.map(({ name, icon: Icon, color }, index) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group flex flex-col items-center gap-2"
            >
              <Icon
                size={28}
                style={{ color }}
                aria-hidden="true"
                className="opacity-70 transition-opacity duration-200 group-hover:opacity-100"
              />
              <span className="font-mono text-xs text-text-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}