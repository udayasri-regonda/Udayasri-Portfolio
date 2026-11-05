"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Section from "./Section";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { filterOptions, projects, type Project } from "@/data/projects";

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const [trigger, setTrigger] = useState<HTMLElement | null>(null);

  const visible = projects.filter((p) => filter === "All" || p.filters.includes(filter));

  const open = useCallback((p: Project, el: HTMLElement) => {
    setTrigger(el);
    setSelected(p);
  }, []);
  const close = useCallback(() => setSelected(null), []);

  return (
    <Section
      id="projects"
      eyebrow="Featured projects"
      title="Systems built to be checked, not just run"
      intro="Select a project for the problem, solution, my contribution, features and technical workflow."
    >
      <div role="group" aria-label="Filter projects by technology" className="flex flex-wrap gap-2">
        {filterOptions.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              filter === f
                ? "border-transparent text-white"
                : "border-line bg-surface/60 text-muted hover:border-accent/50 hover:text-ink"
            }`}
            style={
              filter === f
                ? { backgroundImage: "linear-gradient(115deg, rgb(var(--accent)), rgb(var(--accent2)))" }
                : undefined
            }
          >
            {f}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} of {projects.length} projects
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className={p.featured ? "md:col-span-2" : ""}
            >
              <ProjectCard project={p} onOpen={open} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <ProjectModal project={selected} onClose={close} returnFocusTo={trigger} />
    </Section>
  );
}
