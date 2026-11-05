export type SkillGroup = { title: string; blurb: string; items: string[] };

/** Every item below appears in the resume or the verified grade memos. */
export const skillGroups: SkillGroup[] = [
  {
    title: "Programming Languages",
    blurb: "Primary tools for building and analysing.",
    items: ["Python", "SQL", "Java", "C"],
  },
  {
    title: "Databases & Data",
    blurb: "Working with, validating and reporting on data.",
    items: ["SQL", "Data Validation", "Data Quality", "Data Management", "Pandas", "NumPy"],
  },
  {
    title: "Computer Science Fundamentals",
    blurb: "Foundations from the B.Tech curriculum.",
    items: [
      "Data Structures",
      "Design & Analysis of Algorithms",
      "Object-Oriented Programming (Java)",
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks",
    ],
  },
  {
    title: "AI / Machine Learning",
    blurb: "Coursework plus applied project work.",
    items: ["Machine Learning", "Deep Learning", "LSTM", "TensorFlow", "NLP", "Generative AI"],
  },
  {
    title: "Developer Tools",
    blurb: "Day-to-day engineering environment.",
    items: ["Git / GitHub", "Linux", "VS Code", "Microsoft Excel"],
  },
  {
    title: "Frameworks & Technologies",
    blurb: "Used across my projects.",
    items: ["Flask", "REST APIs", "Plotly", "Solidity", "Ethereum", "IPFS", "AES"],
  },
];

export const professionalSkills = [
  "Analytical thinking",
  "Attention to detail",
  "Documentation",
  "Quality assurance",
  "Team collaboration",
  "Time management",
];
