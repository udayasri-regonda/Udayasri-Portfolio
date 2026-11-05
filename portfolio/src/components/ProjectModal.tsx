"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ExternalLink, PlayCircle, X } from "lucide-react";
import FlowDiagram from "./FlowDiagram";
import { GithubIcon } from "./icons";
import type { Project } from "@/data/projects";

type Props = { project: Project | null; onClose: () => void; returnFocusTo: HTMLElement | null };

export default function ProjectModal({ project, onClose, returnFocusTo }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      returnFocusTo?.focus();
    };
  }, [project, onClose, returnFocusTo]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key={project.slug}
          className="fixed inset-0 z-[70] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl border border-line bg-bg shadow-2xl sm:rounded-3xl"
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-bg/90 px-6 py-5 backdrop-blur-xl sm:px-8">
              <div>
                {project.featured && <p className="font-mono text-xs uppercase tracking-widest text-accent2">Featured project</p>}
                <h3 id="project-dialog-title" className="mt-1 font-display text-xl font-bold sm:text-2xl">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{project.tagline}</p>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line text-muted transition hover:text-ink"
              >
                <X size={18} aria-hidden />
              </button>
            </div>

            <div className="space-y-8 px-6 py-7 sm:px-8">
              <p className="leading-relaxed text-muted">{project.summary}</p>

              <div className="grid gap-4 md:grid-cols-3">
                {[
                  ["Problem", project.problem],
                  ["Solution", project.solution],
                  ["My contribution", project.contribution],
                ].map(([label, text]) => (
                  <div key={label} className="rounded-2xl border border-line bg-surface/70 p-5">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-accent2">{label}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="font-display text-lg font-semibold">Key features</h4>
                <ul className="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {project.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-sm text-muted">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent2" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-display text-lg font-semibold">{project.flowTitle}</h4>
                <div className="mt-3">
                  <FlowDiagram steps={project.flow} title={project.flowTitle} />
                </div>
                {project.flowNote && <p className="mt-3 text-xs leading-relaxed text-muted">{project.flowNote}</p>}
              </div>

              {project.facts && (
                <div>
                  <h4 className="font-display text-lg font-semibold">Synthetic dataset in the repository</h4>
                  <dl className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-6">
                    {project.facts.map((f) => (
                      <div key={f.label} className="bg-surface px-3 py-3">
                        <dd className="font-display text-lg font-bold">{f.value}</dd>
                        <dt className="text-[11px] text-muted">{f.label}</dt>
                      </div>
                    ))}
                  </dl>
                  {project.factsNote && <p className="mt-3 text-xs leading-relaxed text-muted">{project.factsNote}</p>}
                </div>
              )}

              <div>
                <h4 className="font-display text-lg font-semibold">Technologies</h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              {(project.repo || project.demo) && (
                <div className="flex flex-wrap gap-3 border-t border-line pt-6">
                  {project.repo && (
                    <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn-primary">
                      <GithubIcon size={16} /> View repository <ExternalLink size={14} aria-hidden />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                      <PlayCircle size={16} aria-hidden /> Watch demo
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
