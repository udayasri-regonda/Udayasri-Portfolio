"use client";

import { useEffect, useRef, useState } from "react";
import { TerminalSquare } from "lucide-react";
import Section from "./Section";
import Reveal from "./Reveal";
import { profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";
import { education } from "@/data/education";
import { projects } from "@/data/projects";

type Part = string | { text: string; href: string };
type Line = Part[];
type Entry = { input?: string; out?: Line[] };

const link = (text: string, href: string): Part => ({ text, href });

const helpLines: Line[] = [
  ["Available commands:"],
  ["  about       who I am"],
  ["  skills      technologies by category"],
  ["  projects    what I have built"],
  ["  education   degree and results"],
  ["  experience  internship, achievements, certifications"],
  ["  contact     how to reach me"],
  ["  resume      download my resume"],
  ["  theme       switch light / dark"],
  ["  clear       clear the screen"],
];

function setTheme() {
  const next = !document.documentElement.classList.contains("dark");
  document.documentElement.classList.toggle("dark", next);
  try {
    localStorage.setItem("theme", next ? "dark" : "light");
  } catch {
    /* storage unavailable */
  }
  return next ? "dark" : "light";
}

const commands: Record<string, () => Line[]> = {
  help: () => helpLines,
  about: () => [
    [`${profile.name}, ${profile.role}.`],
    [`B.Tech CSE (AI & ML), CGPA ${education.cgpa}, ${education.classAwarded}.`],
    ["I build Python and SQL workflows that validate their own results."],
    [`Based in ${profile.location}. Open to ${profile.seeking.join(", ")} roles.`],
  ],
  skills: () => skillGroups.map((g) => [`${g.title}: ${g.items.join(", ")}`]),
  projects: () => [
    ...projects.map((p, i) => [`${i + 1}. ${p.title}`, ` - ${p.tagline}`]),
    ["Source: ", link("Factory Safety repository", projects[0].repo ?? profile.github)],
  ],
  education: () => [
    [education.degree],
    [`${education.collegeShort} (${education.university.replace("Affiliated to ", "")})`],
    [`${education.period} · CGPA ${education.cgpa} · ${education.classAwarded} · ${education.credits}`],
  ],
  experience: () => [
    ["Summer of AI Intern, Swecha Organization (May - Jun 2024)"],
    ["1st Place, Generative AI Hackathon · 100+ HackerRank problems · National-level handball player"],
    ["NPTEL Data Analytics · NPTEL Cloud Computing · IELTS Academic Band 6.5"],
  ],
  contact: () => [
    ["Email:    ", link(profile.email, `mailto:${profile.email}`)],
    ["LinkedIn: ", link("regonda-udayasri-66006b355", profile.linkedin)],
    ["GitHub:   ", link("udayasri-regonda", profile.github)],
  ],
  resume: () => [["Download: ", link(profile.resumeFileName, profile.resumeUrl)]],
  theme: () => [[`Theme switched to ${setTheme()}.`]],
};

const aliases: Record<string, string> = { ls: "help", "?": "help", whoami: "about", mail: "contact", cv: "resume" };
const quick = ["help", "about", "skills", "projects", "education", "experience", "contact"];

export default function TerminalSection() {
  const [entries, setEntries] = useState<Entry[]>([{ out: [["Welcome. Type a command or tap one below."], ...helpLines] }]);
  const [value, setValue] = useState("");
  const [hist, setHist] = useState<string[]>([]);
  const [hi, setHi] = useState(-1);
  const scroller = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries]);

  function exec(raw: string) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    setHist((h) => [...h, raw.trim()]);
    setHi(-1);
    if (cmd === "clear") {
      setEntries([]);
      return;
    }
    const key = aliases[cmd] ?? cmd;
    const fn = commands[key];
    const out: Line[] = fn ? fn() : [[`Command not found: ${raw.trim()}. Type `, "help", " for the list."]];
    setEntries((e) => [...e, { input: raw.trim(), out }]);
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowUp" && hist.length) {
      e.preventDefault();
      const n = hi < 0 ? hist.length - 1 : Math.max(0, hi - 1);
      setHi(n);
      setValue(hist[n]);
    } else if (e.key === "ArrowDown" && hi >= 0) {
      e.preventDefault();
      const n = hi + 1;
      if (n >= hist.length) {
        setHi(-1);
        setValue("");
      } else {
        setHi(n);
        setValue(hist[n]);
      }
    }
  }

  return (
    <Section
      id="terminal"
      eyebrow="Interactive"
      title="Ask my terminal"
      intro="A quick way to explore my background. Every answer comes from the same verified content as the rest of this page."
    >
      <Reveal>
        <div className="card overflow-hidden">
          <div className="flex items-center gap-2 border-b border-line bg-raised/60 px-4 py-2.5">
            <span className="flex gap-1.5" aria-hidden>
              <i className="h-3 w-3 rounded-full bg-line" />
              <i className="h-3 w-3 rounded-full bg-line" />
              <i className="h-3 w-3 rounded-full bg-accent2" />
            </span>
            <p className="ml-2 flex items-center gap-1.5 font-mono text-xs text-muted">
              <TerminalSquare size={14} aria-hidden /> udayasri@portfolio ~
            </p>
          </div>

          <div
            ref={scroller}
            className="h-80 overflow-y-auto px-5 py-4 font-mono text-[13px] leading-relaxed sm:text-sm"
            role="log"
            aria-live="polite"
            aria-label="Terminal output"
            onClick={() => input.current?.focus({ preventScroll: true })}
          >
            {entries.map((en, i) => (
              <div key={i} className="mb-3">
                {en.input !== undefined && (
                  <p>
                    <span className="text-accent2">$</span> {en.input}
                  </p>
                )}
                {en.out?.map((ln, j) => (
                  <p key={j} className="whitespace-pre-wrap break-words text-muted">
                    {ln.map((p, k) =>
                      typeof p === "string" ? (
                        <span key={k}>{p}</span>
                      ) : (
                        <a
                          key={k}
                          href={p.href}
                          {...(p.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="text-accent underline underline-offset-4 hover:text-accent2"
                        >
                          {p.text}
                        </a>
                      ),
                    )}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <form
            className="flex items-center gap-2 border-t border-line px-5 py-3 font-mono text-sm"
            onSubmit={(e) => {
              e.preventDefault();
              exec(value);
              setValue("");
            }}
          >
            <label htmlFor="term-input" className="text-accent2">
              <span aria-hidden>$</span>
              <span className="sr-only">Type a command</span>
            </label>
            <input
              id="term-input"
              ref={input}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKey}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              placeholder="try: skills"
              className="min-w-0 flex-1 bg-transparent text-ink placeholder:text-muted/60 focus:outline-none"
            />
          </form>

          <div className="flex flex-wrap gap-2 border-t border-line bg-raised/40 px-5 py-3">
            {quick.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => {
                  exec(q);
                  input.current?.focus({ preventScroll: true });
                }}
                className="chip transition hover:border-accent/60 hover:text-ink"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
