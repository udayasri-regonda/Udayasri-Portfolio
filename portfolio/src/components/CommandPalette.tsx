"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CornerDownLeft, Search } from "lucide-react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

type Item = { id: string; group: "Go to" | "Actions"; label: string; hint?: string; run: () => void };

export const OPEN_PALETTE_EVENT = "open-palette";

function goTo(id: string) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}
function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpen(false), []);

  const items: Item[] = useMemo(
    () => [
      { id: "about", group: "Go to", label: "About", run: () => goTo("about") },
      { id: "skills", group: "Go to", label: "Skills", run: () => goTo("skills") },
      { id: "projects", group: "Go to", label: "Projects", run: () => goTo("projects") },
      { id: "lab", group: "Go to", label: "Anomaly detector lab", hint: "interactive", run: () => goTo("lab") },
      { id: "terminal", group: "Go to", label: "Ask my terminal", hint: "interactive", run: () => goTo("terminal") },
      { id: "education", group: "Go to", label: "Education", run: () => goTo("education") },
      { id: "experience", group: "Go to", label: "Experience & achievements", run: () => goTo("experience") },
      { id: "resume", group: "Go to", label: "Resume", run: () => goTo("resume") },
      { id: "contact", group: "Go to", label: "Contact", run: () => goTo("contact") },
      {
        id: "dl",
        group: "Actions",
        label: "Download resume (PDF)",
        run: () => {
          const a = document.createElement("a");
          a.href = profile.resumeUrl;
          a.download = profile.resumeFileName;
          document.body.appendChild(a);
          a.click();
          a.remove();
        },
      },
      { id: "repo", group: "Actions", label: "Open Factory Safety repository", hint: "GitHub", run: () => openExternal(projects[0].repo ?? profile.github) },
      { id: "gh", group: "Actions", label: "Open GitHub profile", run: () => openExternal(profile.github) },
      { id: "li", group: "Actions", label: "Open LinkedIn profile", run: () => openExternal(profile.linkedin) },
      { id: "mail", group: "Actions", label: "Email me", hint: profile.email, run: () => (window.location.href = `mailto:${profile.email}`) },
      {
        id: "theme",
        group: "Actions",
        label: "Toggle light / dark theme",
        run: () => {
          const next = !document.documentElement.classList.contains("dark");
          document.documentElement.classList.toggle("dark", next);
          try {
            localStorage.setItem("theme", next ? "dark" : "light");
          } catch {
            /* storage unavailable */
          }
        },
      },
    ],
    [],
  );

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? items.filter((i) => `${i.label} ${i.hint ?? ""} ${i.group}`.toLowerCase().includes(s)) : items;
  }, [items, q]);

  useEffect(() => setIdx(0), [q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      returnTo.current = document.activeElement as HTMLElement | null;
      setQ("");
      setIdx(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      returnTo.current?.focus?.({ preventScroll: true });
    }
  }, [open]);

  function choose(i: Item | undefined) {
    if (!i) return;
    close();
    // let the dialog unmount first so focus restoration does not fight scrolling
    setTimeout(i.run, 60);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setIdx((n) => (results.length ? (n + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIdx((n) => (results.length ? (n - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(results[idx]);
    } else if (e.key === "Tab") {
      e.preventDefault(); // keep focus on the search field while the dialog is open
    }
  }

  useEffect(() => {
    document.getElementById(`pal-opt-${idx}`)?.scrollIntoView({ block: "nearest" });
  }, [idx]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && close()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            onKeyDown={onKeyDown}
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-bg shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search size={18} className="text-muted" aria-hidden />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                role="combobox"
                aria-expanded="true"
                aria-controls="pal-list"
                aria-activedescendant={results.length ? `pal-opt-${idx}` : undefined}
                aria-label="Search sections and actions"
                placeholder="Search sections and actions"
                className="h-14 w-full bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none"
              />
              <kbd className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">Esc</kbd>
            </div>
            <ul id="pal-list" role="listbox" className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">No matches</li>}
              {results.map((r, i) => (
                <li
                  key={r.id}
                  id={`pal-opt-${i}`}
                  role="option"
                  aria-selected={i === idx}
                  onMouseEnter={() => setIdx(i)}
                  onClick={() => choose(r)}
                  className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm ${
                    i === idx ? "bg-accent/15 text-ink" : "text-muted"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-14 shrink-0 font-mono text-[10px] uppercase tracking-wider text-accent2">{r.group}</span>
                    {r.label}
                  </span>
                  <span className="flex items-center gap-2 text-xs text-muted">
                    {r.hint}
                    {i === idx && <CornerDownLeft size={14} aria-hidden />}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
