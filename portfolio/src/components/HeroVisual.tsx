"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

const stages = ["Generate", "Detect", "Validate", "Evaluate", "Report"];

/** Decorative pipeline panel based on the Factory Safety project's workflow. Shows no fabricated output. */
export default function HeroVisual() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) {
      setActive(stages.length);
      return;
    }
    const id = setInterval(() => setActive((a) => (a + 1) % (stages.length + 2)), 1100);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="card w-full max-w-xs p-4 backdrop-blur-xl" aria-hidden>
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted">Featured pipeline</p>
        <span className="flex gap-1">
          <i className="h-2 w-2 rounded-full bg-line" />
          <i className="h-2 w-2 rounded-full bg-line" />
          <i className="h-2 w-2 rounded-full bg-accent2" />
        </span>
      </div>
      <ol className="mt-3 space-y-1.5">
        {stages.map((s, i) => {
          const done = i < active;
          const current = i === active;
          return (
            <li
              key={s}
              className={`flex items-center justify-between rounded-lg border px-3 py-2 text-sm transition-colors duration-500 ${
                current ? "border-accent/60 bg-accent/10 text-ink" : "border-line bg-raised/50 text-muted"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <span className="font-mono text-[11px] opacity-60">0{i + 1}</span>
                {s}
              </span>
              <span
                className={`grid h-5 w-5 place-items-center rounded-full transition-all duration-500 ${
                  done ? "bg-accent2/20 text-accent2" : current ? "animate-pulse bg-accent/30" : "bg-transparent"
                }`}
              >
                {done && <Check size={12} />}
              </span>
            </li>
          );
        })}
      </ol>
      <p className="mt-3 truncate rounded-lg bg-bg/70 px-3 py-2 font-mono text-[11px] text-muted">
        $ python run.py all --profile full
      </p>
    </div>
  );
}
