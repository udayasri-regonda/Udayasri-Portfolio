export const profile = {
  name: "Regonda Udayasri",
  shortName: "Udayasri",
  initials: "RU",
  role: "AI/ML & Data Engineering Graduate",
  headline: "Building reliable, testable data and ML systems.",
  intro:
    "B.Tech graduate in Computer Science & Engineering (AI & ML). I build Python and SQL workflows that validate their own results: an LSTM traffic-forecasting dashboard, a blockchain-secured health-records platform, and a factory-safety analytics system that proves its detection quality against ground truth.",
  focus: ["Data analytics & quality", "Machine learning", "Python & SQL engineering"],
  location: "Hyderabad, India",
  email: "uregonda@gmail.com",
  github: "https://github.com/udayasri-regonda",
  linkedin: "https://www.linkedin.com/in/regonda-udayasri-66006b355",
  resumeUrl: "/Regonda_Udayasri_Resume.pdf",
  resumeFileName: "Regonda_Udayasri_Resume.pdf",
  /** Set to e.g. "/profile.jpg" after adding the file to /public to replace the monogram placeholder. */
  profileImage: null as string | null,
  seeking: ["Software Engineering", "AI/ML Engineering", "Data Engineering", "Technical / Data Analyst"],
};

export const highlights: {
  label: string;
  value: string;
  note: string;
  count?: { to: number; decimals?: number; suffix?: string };
}[] = [
  { label: "B.Tech CGPA", value: "8.78", note: "First Class with Distinction", count: { to: 8.78, decimals: 2 } },
  { label: "Generative AI Hackathon", value: "1st Place", note: "Achievement" },
  { label: "Summer of AI Intern", value: "Swecha", note: "May – Jun 2024" },
  { label: "HackerRank", value: "100+", note: "Problems solved", count: { to: 100, suffix: "+" } },
];

export const workingWith = [
  "Python data pipelines",
  "SQL and data validation",
  "LSTM forecasting models",
  "anomaly-detection rules",
  "Flask REST APIs",
];

export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "lab", label: "Lab" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];
