const items = [
  "Python",
  "SQL",
  "Pandas",
  "TensorFlow",
  "LSTM",
  "Flask",
  "Plotly",
  "Docker",
  "SQLite",
  "Solidity",
  "Ethereum",
  "IPFS",
  "Git / GitHub",
  "Linux",
  "Java",
];

/** Slow looping strip of technologies used in the projects. Pauses on hover; static for reduced motion. */
export default function TechMarquee() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-3 pr-3" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t} className="chip whitespace-nowrap !px-4 !py-1.5 !text-sm">
          {t}
        </li>
      ))}
    </ul>
  );
  return (
    <div
      className="group relative overflow-hidden border-y border-line bg-surface/40 py-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      role="region"
      aria-label="Technologies used across my projects"
    >
      <div className="marquee flex w-max group-hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
