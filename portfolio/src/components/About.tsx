import { GraduationCap, Target, Wrench, Compass } from "lucide-react";
import Section from "./Section";
import Reveal from "./Reveal";
import { profile } from "@/data/profile";

const points = [
  {
    icon: GraduationCap,
    title: "Academic foundation",
    text: "B.Tech in Computer Science & Engineering (AI & ML) at Nalla Narasimha Reddy's Group of Institutions, affiliated to JNTUH. Graduated in 2026 with a CGPA of 8.78 and First Class with Distinction. Coursework covers algorithms, databases, machine learning, deep learning, NLP and data analytics.",
  },
  {
    icon: Wrench,
    title: "Practical experience",
    text: "As a Summer of AI intern at Swecha (May to June 2024), I supported AI and data workflows: reviewing AI/LLM outputs for accuracy and consistency, checking data quality, documenting work and collaborating through Git.",
  },
  {
    icon: Compass,
    title: "How I approach problems",
    text: "I like systems that can explain themselves. My projects separate detection from evaluation, validate outputs before reporting them, and document each analytical step so results can be reviewed and reproduced.",
  },
  {
    icon: Target,
    title: "What I am looking for",
    text: `An early-career role in ${profile.seeking.slice(0, -1).join(", ")} or ${profile.seeking.at(-1)}, on a team where careful data handling and clear communication matter.`,
  },
];

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Practical, detail-oriented and focused on data you can trust"
      intro="Early-career engineer with hands-on project work across machine learning, data validation and secure systems."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {points.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06}>
            <div className="card h-full p-6">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent">
                <p.icon size={20} aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
