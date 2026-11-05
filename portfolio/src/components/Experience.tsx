import { Award, BadgeCheck, Briefcase, Code2, Trophy } from "lucide-react";
import Section from "./Section";
import Reveal from "./Reveal";

const internship = {
  role: "Summer of AI Intern",
  org: "Swecha Organization",
  period: "May 2024 – Jun 2024",
  bullets: [
    "Supported AI and data workflows covering data processing, validation, quality verification, documentation and monitoring.",
    "Reviewed AI/LLM outputs for accuracy and consistency to identify potential data-quality issues.",
    "Collaborated with team members using Git, reported progress and supported workflow improvements.",
    "Delivered assigned tasks within deadlines with accurate documentation and consistent output quality.",
  ],
};

const achievements = [
  { icon: Trophy, title: "1st Place, Generative AI Hackathon", meta: "Achievement" },
  { icon: Code2, title: "100+ HackerRank problems solved", meta: "Problem solving" },
  { icon: Award, title: "National-level handball player", meta: "Sport" },
];

const certifications = [
  { title: "NPTEL: Data Analytics", meta: "Certification" },
  { title: "NPTEL: Cloud Computing", meta: "Certification" },
  { title: "IELTS Academic: Band 6.5", meta: "English proficiency" },
];

export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience & achievements"
      title="Hands-on experience, recognised results"
      intro="One internship, three substantial projects and a record of competitive and certified learning."
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal>
          <div className="card h-full p-7">
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                <Briefcase size={22} aria-hidden />
              </span>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-accent2">{internship.period}</p>
                <h3 className="mt-1 font-display text-xl font-bold">{internship.role}</h3>
                <p className="text-sm text-muted">{internship.org}</p>
              </div>
            </div>
            <ul className="mt-6 space-y-3 border-l border-line pl-5">
              {internship.bullets.map((b) => (
                <li key={b} className="relative text-sm leading-relaxed text-muted">
                  <span className="absolute -left-[25px] top-2 h-2 w-2 rounded-full bg-accent2" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="grid gap-6">
          <Reveal delay={0.06}>
            <div className="card p-6">
              <h3 className="font-display text-lg font-semibold">Achievements</h3>
              <ul className="mt-4 space-y-3">
                {achievements.map((a) => (
                  <li key={a.title} className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent2/10 text-accent2">
                      <a.icon size={18} aria-hidden />
                    </span>
                    <span>
                      <span className="block text-sm font-medium">{a.title}</span>
                      <span className="text-xs text-muted">{a.meta}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="card p-6">
              <h3 className="font-display text-lg font-semibold">Certifications</h3>
              <ul className="mt-4 space-y-3">
                {certifications.map((c) => (
                  <li key={c.title} className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                      <BadgeCheck size={18} aria-hidden />
                    </span>
                    <span>
                      <span className="block text-sm font-medium">{c.title}</span>
                      <span className="text-xs text-muted">{c.meta}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
