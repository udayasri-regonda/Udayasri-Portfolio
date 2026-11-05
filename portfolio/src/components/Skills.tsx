import { Brain, Code2, Database, GitBranch, Layers, Cpu } from "lucide-react";
import Section from "./Section";
import Reveal from "./Reveal";
import SpotlightCard from "./SpotlightCard";
import { professionalSkills, skillGroups } from "@/data/skills";

const icons = [Code2, Database, Cpu, Brain, GitBranch, Layers];

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Technical skills"
      title="Tools I use and the foundations behind them"
      intro="Grouped by purpose. Every item comes from my resume or academic record."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, i) => {
          const Icon = icons[i % icons.length];
          return (
            <Reveal key={g.title} delay={(i % 3) * 0.07}>
              <SpotlightCard className="h-full p-6">
                <div className="relative">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent2/10 text-accent2">
                    <Icon size={20} aria-hidden />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold">{g.title}</h3>
                  <p className="mt-1 text-sm text-muted">{g.blurb}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <li key={s} className="chip transition-colors hover:border-accent/50 hover:text-ink">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-6 flex flex-wrap items-center gap-2 rounded-2xl border border-dashed border-line px-5 py-4">
          <span className="mr-2 text-sm font-medium">Ways of working</span>
          {professionalSkills.map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
