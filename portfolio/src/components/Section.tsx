import Reveal from "./Reveal";

export default function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="py-20 sm:py-28">
      <div className="container-x">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent2">{eyebrow}</p>
          <h2 id={`${id}-title`} className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          {intro && <p className="mt-4 max-w-2xl text-muted">{intro}</p>}
        </Reveal>
        <div className="mt-10 sm:mt-12">{children}</div>
      </div>
    </section>
  );
}
