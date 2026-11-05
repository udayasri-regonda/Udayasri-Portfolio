import { ArrowDown, ArrowRight } from "lucide-react";
import type { FlowStep } from "@/data/projects";

/** Accessible step diagram: horizontal on wide screens, vertical on narrow ones. */
export default function FlowDiagram({ steps, title }: { steps: FlowStep[]; title: string }) {
  return (
    <figure aria-label={title}>
      <ol className="flex flex-col items-stretch gap-2 md:flex-row md:items-center">
        {steps.map((s, i) => (
          <li key={s.label} className="flex flex-col items-center gap-2 md:flex-1 md:flex-row">
            <div className="w-full flex-1 rounded-xl border border-line bg-raised/60 px-4 py-3 text-center md:text-left">
              <p className="font-mono text-[10px] uppercase tracking-widest text-accent2">Step {i + 1}</p>
              <p className="mt-0.5 text-sm font-semibold">{s.label}</p>
              {s.sub && <p className="text-xs text-muted">{s.sub}</p>}
            </div>
            {i < steps.length - 1 && (
              <>
                <ArrowRight size={16} className="hidden shrink-0 text-muted md:block" aria-hidden />
                <ArrowDown size={16} className="shrink-0 text-muted md:hidden" aria-hidden />
              </>
            )}
          </li>
        ))}
      </ol>
    </figure>
  );
}
