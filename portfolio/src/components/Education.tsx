import { Award, BookOpen } from "lucide-react";
import Section from "./Section";
import Reveal from "./Reveal";
import { coursework, education, semesters } from "@/data/education";

export default function Education() {
  const maxScale = 10;
  return (
    <Section
      id="education"
      eyebrow="Education"
      title="B.Tech in Computer Science & Engineering (AI & ML)"
      intro="Verified against my consolidated grades memo and semester memos."
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="card h-full p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-accent2">{education.period}</p>
                <h3 className="mt-2 font-display text-xl font-bold">{education.degree}</h3>
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                <Award size={22} aria-hidden />
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">{education.college}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{education.university}</p>

            <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
              <div className="bg-surface p-4">
                <dt className="text-xs text-muted">CGPA</dt>
                <dd className="font-display text-3xl font-bold gradient-text">{education.cgpa}</dd>
              </div>
              <div className="bg-surface p-4">
                <dt className="text-xs text-muted">Class awarded</dt>
                <dd className="mt-1 text-sm font-semibold">{education.classAwarded}</dd>
              </div>
              <div className="bg-surface p-4">
                <dt className="text-xs text-muted">Credits</dt>
                <dd className="mt-1 text-sm font-semibold">{education.credits}</dd>
              </div>
              <div className="bg-surface p-4">
                <dt className="text-xs text-muted">Completed</dt>
                <dd className="mt-1 text-sm font-semibold">{education.passed}</dd>
              </div>
            </dl>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="card h-full p-7">
            <h3 className="font-display text-lg font-semibold">Semester-wise SGPA</h3>
            <p className="mt-1 text-xs text-muted">Bars show SGPA on a 10-point scale; the line below each shows cumulative CGPA.</p>
            <ul className="mt-8 flex h-64 items-end gap-2 sm:gap-3" aria-label="SGPA by semester">
              {semesters.map((s) => (
                <li key={s.sem} className="flex h-full flex-1 flex-col justify-end">
                  <span className="mb-1 text-center text-[11px] font-semibold tabular-nums">{s.sgpa.toFixed(2)}</span>
                  <div
                    className="w-full rounded-t-md"
                    style={{
                      height: `${(s.sgpa / maxScale) * 100}%`,
                      backgroundImage: "linear-gradient(to top, rgb(var(--accent) / 0.55), rgb(var(--accent2) / 0.9))",
                    }}
                  />
                </li>
              ))}
            </ul>
            <ul className="mt-2 flex gap-2 sm:gap-3" aria-hidden>
              {semesters.map((s) => (
                <li key={s.sem} className="flex-1 text-center">
                  <p className="text-[10px] font-medium text-ink sm:text-xs">{s.sem}</p>
                  <p className="text-[10px] tabular-nums text-muted">{s.cgpa.toFixed(2)}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="card mt-6 p-7">
          <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
            <BookOpen size={18} className="text-accent2" aria-hidden /> Relevant coursework
          </h3>
          <div className="mt-5 grid gap-6 md:grid-cols-3">
            {coursework.map((g) => (
              <div key={g.group}>
                <h4 className="text-sm font-semibold">{g.group}</h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {g.items.map((i) => (
                    <li key={i} className="chip">
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
