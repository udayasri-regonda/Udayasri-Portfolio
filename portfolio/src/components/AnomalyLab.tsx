"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Play, RotateCcw, ShieldCheck } from "lucide-react";
import Section from "./Section";
import Reveal from "./Reveal";

type Kind = "ack" | "interlock" | "context" | "duplicate" | "unverified";

/** Counts are the injected anomalies reported in the repository README (full profile, seed 20261022). */
const kinds: { id: Kind; label: string; count: number; text: string }[] = [
  {
    id: "ack",
    label: "Ack before alarm",
    count: 60,
    text: "An acknowledgement timestamped before the alarm it acknowledges. The timeline is impossible, so one of the two records is wrong.",
  },
  {
    id: "interlock",
    label: "Impossible interlock state",
    count: 60,
    text: "An interlock reported in a combination of states that cannot occur together, which points to a faulty sensor feed or a data error.",
  },
  {
    id: "context",
    label: "Incident without context",
    count: 25,
    text: "An incident record with no linked alarm or machine context. A reviewer cannot trace it back to any evidence.",
  },
  {
    id: "duplicate",
    label: "Duplicate replay",
    count: 150,
    text: "The same record delivered twice, as happens when a feed is replayed. Counting it twice would inflate alarm rates.",
  },
  {
    id: "unverified",
    label: "Unverified closure",
    count: 30,
    text: "A corrective action closed without independent verification. The system records it as CLOSED_UNVERIFIED and never shows it as resolved.",
  },
];

type Row = { id: string; time: string; machine: string; event: string; detail: string; kind?: Kind; control?: boolean };

/** Illustrative sample written for this page. It is not real plant data. */
const rows: Row[] = [
  { id: "E-1040", time: "08:14:02", machine: "M-A12", event: "ALARM", detail: "High temperature" },
  { id: "E-1041", time: "08:14:09", machine: "M-A12", event: "ACK", detail: "Operator acknowledged" },
  { id: "E-1042", time: "08:31:40", machine: "M-B07", event: "ACK", detail: "Acknowledged at 08:31:40, alarm raised at 08:31:52", kind: "ack" },
  { id: "E-1043", time: "08:31:52", machine: "M-B07", event: "ALARM", detail: "High pressure" },
  { id: "E-1044", time: "09:02:11", machine: "M-C03", event: "INTERLOCK", detail: "Reports ENGAGED and BYPASSED together", kind: "interlock" },
  { id: "E-1045", time: "09:15:30", machine: "(none)", event: "INCIDENT", detail: "No linked alarm or machine", kind: "context" },
  { id: "E-1046", time: "09:40:05", machine: "M-A12", event: "ALARM", detail: "High temperature" },
  { id: "E-1046", time: "09:40:05", machine: "M-A12", event: "ALARM", detail: "Same record ID delivered again", kind: "duplicate" },
  { id: "E-1047", time: "10:05:00", machine: "M-B07", event: "ACTION CLOSED", detail: "Closed, no independent verification", kind: "unverified" },
  { id: "E-1048", time: "10:20:15", machine: "M-C03", event: "ALARM", detail: "Low flow" },
  { id: "E-1049", time: "10:20:15", machine: "M-C03", event: "ACK", detail: "Acknowledged in the same second as the alarm", control: true },
];

const labelOf = (k: Kind) => kinds.find((x) => x.id === k)!.label;
const maxCount = Math.max(...kinds.map((k) => k.count));
const total = kinds.reduce((a, k) => a + k.count, 0);

export default function AnomalyLab() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<Record<Kind, boolean>>({
    ack: true,
    interlock: true,
    context: true,
    duplicate: true,
    unverified: true,
  });
  const [focus, setFocus] = useState<Kind>("ack");
  const [progress, setProgress] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const clear = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  };
  useEffect(() => clear, []);

  function run() {
    clear();
    if (reduce) {
      setProgress(rows.length);
      return;
    }
    setProgress(0);
    let n = 0;
    timer.current = setInterval(() => {
      n += 1;
      setProgress(n);
      if (n >= rows.length) clear();
    }, 360);
  }
  function reset() {
    clear();
    setProgress(0);
  }

  const scanning = progress > 0 && progress < rows.length;
  const flaggedCount = rows.filter((r, i) => i < progress && r.kind && active[r.kind]).length;

  const stateOf = (r: Row, i: number) => {
    const evaluated = i < progress;
    const flagged = evaluated && !!r.kind && active[r.kind];
    return { evaluated, flagged, current: scanning && i === progress - 1 };
  };
  const badge = (r: Row, s: { evaluated: boolean; flagged: boolean }) =>
    s.flagged && r.kind ? (
      <span className="inline-flex rounded-full bg-accent/20 px-2.5 py-0.5 text-xs font-semibold text-accent">
        Flagged: {labelOf(r.kind)}
      </span>
    ) : s.evaluated && r.control ? (
      <span className="inline-flex rounded-full bg-accent2/15 px-2.5 py-0.5 text-xs font-semibold text-accent2">
        Not flagged (control)
      </span>
    ) : s.evaluated ? (
      <span className="text-xs text-muted">OK</span>
    ) : (
      <span className="text-xs text-muted">·</span>
    );

  return (
    <Section
      id="lab"
      eyebrow="Interactive · Factory Safety"
      title="Inside the anomaly detector"
      intro="Run the detection idea on a small sample log. Toggle each anomaly type to see what it catches, and note the control row that must not be flagged."
    >
      <div className="space-y-6">
        <Reveal>
          <div className="card p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" onClick={run} disabled={scanning} className="btn-primary !py-2.5 disabled:opacity-60">
                <Play size={16} aria-hidden /> {progress === 0 ? "Run detection" : "Run again"}
              </button>
              <button type="button" onClick={reset} className="btn-ghost !py-2.5">
                <RotateCcw size={16} aria-hidden /> Reset
              </button>
              <p className="ml-auto text-sm text-muted" role="status" aria-live="polite">
                {progress === 0
                  ? "Not scanned yet"
                  : scanning
                    ? `Scanning record ${progress} of ${rows.length}`
                    : `Scan complete: ${flaggedCount} records flagged`}
              </p>
            </div>

            <div role="group" aria-label="Anomaly types to detect" className="mt-5 flex flex-wrap gap-2">
              {kinds.map((k) => (
                <button
                  key={k.id}
                  type="button"
                  aria-pressed={active[k.id]}
                  onClick={() => {
                    setActive((a) => ({ ...a, [k.id]: !a[k.id] }));
                    setFocus(k.id);
                  }}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition sm:text-sm ${
                    active[k.id]
                      ? "border-accent/60 bg-accent/10 text-ink"
                      : "border-line bg-surface/60 text-muted hover:border-accent/40"
                  }`}
                >
                  {active[k.id] ? "✓ " : ""}
                  {k.label}
                </button>
              ))}
            </div>

            <div className="mt-5 hidden overflow-hidden rounded-xl border border-line md:block">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">Illustrative sample event log with detection results</caption>
                <thead className="bg-raised/60 text-xs uppercase tracking-wider text-muted">
                  <tr>
                    <th scope="col" className="px-4 py-2.5 font-medium">Record</th>
                    <th scope="col" className="px-4 py-2.5 font-medium">Time</th>
                    <th scope="col" className="px-4 py-2.5 font-medium">Machine</th>
                    <th scope="col" className="px-4 py-2.5 font-medium">Event</th>
                    <th scope="col" className="px-4 py-2.5 font-medium">Detail</th>
                    <th scope="col" className="px-4 py-2.5 font-medium">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => {
                    const s = stateOf(r, i);
                    return (
                      <tr
                        key={i}
                        className={`border-t border-line transition-colors duration-300 ${
                          s.flagged ? "bg-accent/10" : s.current ? "bg-accent2/10" : ""
                        }`}
                      >
                        <td className="px-4 py-2.5 font-mono text-xs">{r.id}</td>
                        <td className="px-4 py-2.5 font-mono text-xs tabular-nums">{r.time}</td>
                        <td className="px-4 py-2.5 font-mono text-xs">{r.machine}</td>
                        <td className="px-4 py-2.5 font-medium">{r.event}</td>
                        <td className="px-4 py-2.5 text-muted">{r.detail}</td>
                        <td className="px-4 py-2.5">{badge(r, s)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <ul className="mt-5 space-y-2.5 md:hidden" aria-label="Illustrative sample event log with detection results">
              {rows.map((r, i) => {
                const s = stateOf(r, i);
                return (
                  <li
                    key={i}
                    className={`rounded-xl border p-3.5 transition-colors duration-300 ${
                      s.flagged ? "border-accent/50 bg-accent/10" : s.current ? "border-accent2/50 bg-accent2/10" : "border-line"
                    }`}
                  >
                    <p className="font-mono text-[11px] text-muted">
                      {r.id} · {r.time} · {r.machine}
                    </p>
                    <p className="mt-1 text-sm">
                      <span className="font-semibold">{r.event}</span> <span className="text-muted">{r.detail}</span>
                    </p>
                    <div className="mt-2">{badge(r, s)}</div>
                  </li>
                );
              })}
            </ul>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              Illustrative sample written for this page, not real plant data. The control row mirrors the repository&apos;s
              hard-negative cases: an acknowledgement in the same second as the alarm is normal and must produce no false positive.
            </p>
          </div>
        </Reveal>

        <div className="grid items-start gap-6 md:grid-cols-2">
          <Reveal delay={0.06}>
            <div className="card p-6" aria-live="polite">
              <p className="font-mono text-xs uppercase tracking-widest text-accent2">What it catches</p>
              <h3 className="mt-2 font-display text-lg font-semibold">{labelOf(focus)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{kinds.find((k) => k.id === focus)!.text}</p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="card p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-accent2">Injected in the repo dataset</p>
              <ul className="mt-4 space-y-3">
                {kinds.map((k) => (
                  <li key={k.id}>
                    <div className="flex justify-between text-xs">
                      <span>{k.label}</span>
                      <span className="font-mono tabular-nums text-muted">{k.count}</span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-raised">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundImage: "linear-gradient(90deg, rgb(var(--accent)), rgb(var(--accent2)))" }}
                        initial={reduce ? false : { width: 0 }}
                        whileInView={{ width: `${(k.count / maxCount) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted">
                <ShieldCheck size={14} className="mt-0.5 shrink-0 text-accent2" aria-hidden />
                {total} injected anomalies in total. The README reports 100% precision and recall on this synthetic ground truth and
                states plainly that this is not a field-performance claim.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
