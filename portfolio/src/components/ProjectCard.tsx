"use client";

import { ArrowUpRight, Star } from "lucide-react";
import SpotlightCard from "./SpotlightCard";
import { GithubIcon } from "./icons";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project, trigger: HTMLElement) => void }) {
  const { featured } = project;
  return (
    <SpotlightCard
      className={`group h-full transition-transform duration-300 hover:-translate-y-1 ${featured ? "p-7 sm:p-9" : "p-6"}`}
    >
      {featured && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/20 blur-[90px]"
        />
      )}
      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between gap-3">
          {featured ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent2/10 px-3 py-1 text-xs font-semibold text-accent2">
              <Star size={12} aria-hidden /> Featured project
            </span>
          ) : (
            <span className="font-mono text-xs uppercase tracking-widest text-muted">Project</span>
          )}
          <ArrowUpRight
            size={20}
            aria-hidden
            className="text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </div>

        <h3 className={`mt-4 font-display font-bold tracking-tight ${featured ? "text-2xl sm:text-3xl" : "text-xl"}`}>
          <button
            type="button"
            onClick={(e) => onOpen(project, e.currentTarget)}
            aria-haspopup="dialog"
            className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-offset-8"
          >
            {project.title}
            <span className="sr-only">: open project details</span>
          </button>
        </h3>
        <p className="mt-2 text-sm text-accent2">{project.tagline}</p>
        <p className={`mt-4 text-sm leading-relaxed text-muted ${featured ? "max-w-3xl sm:text-base" : ""}`}>
          {project.summary}
        </p>

        {featured && project.facts && (
          <dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-6">
            {project.facts.map((f) => (
              <div key={f.label} className="bg-surface/90 px-3 py-3">
                <dd className="font-display text-lg font-bold">{f.value}</dd>
                <dt className="text-[11px] leading-tight text-muted">{f.label}</dt>
              </div>
            ))}
          </dl>
        )}

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies used">
          {project.tech.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-4 pt-6 text-sm">
          <span className="font-semibold text-ink">View details</span>
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-1.5 text-muted transition hover:text-ink"
            >
              <GithubIcon size={15} /> Repository<span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
}
