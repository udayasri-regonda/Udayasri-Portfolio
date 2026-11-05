export type FlowStep = { label: string; sub?: string };

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  featured?: boolean;
  summary: string;
  problem: string;
  solution: string;
  contribution: string;
  features: string[];
  tech: string[];
  filters: string[];
  flowTitle: string;
  flow: FlowStep[];
  flowNote?: string;
  facts?: { label: string; value: string }[];
  factsNote?: string;
  repo?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    slug: "factory-safety-monitoring",
    title: "Factory Safety Monitoring & Analysis",
    tagline: "Alarm analytics, anomaly detection and safety-risk reporting, evaluated against ground truth.",
    featured: true,
    summary:
      "A data-driven industrial safety analysis system. It generates realistic factory event data, applies safety rules, detects recurring unsafe conditions and data-quality exceptions, validates integrity, and measures detection quality against a separate ground-truth file.",
    problem:
      "Factory alarm logs are large and noisy. Recurring unsafe conditions, slow acknowledgements and data-quality defects are easy to miss, and findings are only useful if a reviewer can trace each one back to its evidence.",
    solution:
      "A pipeline of seeded data generation, rule-based detection, structural validation and evaluation, with an investigation workbench where every finding shows its rule, evidence and corrective actions. Detection code never sees the answer key: labels live in a separate ground-truth folder read only by the evaluation step.",
    contribution:
      "Author and maintainer of the public repository: pipeline, detection rules, validation, tests, documentation and the investigation dashboard.",
    features: [
      "Seeded, reproducible generator: the same profile and seed produce identical files",
      "Five anomaly rules plus operational classification (unsafe, delayed, nuisance, flood, recurring)",
      "Validation of primary and foreign keys, enums, timelines and lifecycle rules",
      "Evaluation with precision, recall and F1 against a separate ground-truth file, with hard-negative controls",
      "Investigation workbench: filters, evidence timeline, machine risk, corrective actions, data quality and export",
      "Advisory-only design: closing an action without verification is recorded as CLOSED_UNVERIFIED",
      "Vendor-feed ingestion through a column-mapping file",
      "SQL schema and seed scripts, SQLite database, Dockerfile and 28 unit tests",
    ],
    tech: ["Python", "SQL", "SQLite", "Docker", "unittest", "HTML Dashboard"],
    filters: ["Python", "SQL", "Data Analytics"],
    flowTitle: "Technical workflow",
    flow: [
      { label: "Generate", sub: "Seeded factory data" },
      { label: "Detect", sub: "5 rules + classification" },
      { label: "Validate", sub: "Keys, enums, timelines" },
      { label: "Evaluate", sub: "vs. ground truth" },
      { label: "Report", sub: "Findings & workbench" },
    ],
    flowNote:
      "Separation of truth and detection: detector.py reads only data/csv; labels in ground_truth/ are read only by the evaluation step.",
    facts: [
      { label: "Plants", value: "4" },
      { label: "Machines", value: "60" },
      { label: "Alarm definitions", value: "200" },
      { label: "Alarm events", value: "50,000" },
      { label: "Injected anomalies", value: "325" },
      { label: "Unit tests", value: "28" },
    ],
    factsNote:
      "Figures describe the repository's synthetic full-profile dataset (seed 20261022). As the README itself notes, the 100% precision and recall on this synthetic ground truth is not a field-performance claim.",
    repo: "https://github.com/udayasri-regonda/factory-safety-monitoring-analysis-",
  },
  {
    slug: "ai-traffic-management",
    title: "AI-Integrated Traffic Management System",
    tagline: "LSTM forecasting on traffic data with a reporting interface.",
    summary:
      "A forecasting workflow that takes traffic datasets through collection, processing, validation and analysis, then predicts with an LSTM model and presents the results in a reporting interface.",
    problem:
      "Traffic decisions depend on forecasts, and forecasts are only as trustworthy as the data and checks behind them.",
    solution:
      "Reusable Python data-processing steps feed an LSTM forecasting workflow. Outputs are monitored and validated, and the analytical process is documented, with results presented through a Flask and Plotly interface.",
    contribution:
      "Data collection, processing, validation, analysis and visualisation; built the LSTM forecasting workflow and reporting interface; documented the analytical process.",
    features: [
      "Data collection, processing and validation on traffic datasets",
      "LSTM forecasting workflow supporting data-driven decisions",
      "Reporting interface with Plotly visualisations",
      "Monitored and validated model outputs",
      "Reusable Python data-processing steps that support workflow automation",
    ],
    tech: ["Python", "Pandas", "TensorFlow", "LSTM", "Flask", "Plotly"],
    filters: ["Python", "Machine Learning", "Data Analytics", "Flask"],
    flowTitle: "Technical workflow",
    flow: [
      { label: "Collect", sub: "Traffic datasets" },
      { label: "Process & validate", sub: "Pandas" },
      { label: "Forecast", sub: "TensorFlow LSTM" },
      { label: "Report", sub: "Flask + Plotly" },
    ],
  },
  {
    slug: "blockchain-patient-ehr-security",
    title: "Blockchain-Based Security System for Patient EHRs",
    tagline: "Controlled access and integrity checks for sensitive health records.",
    summary:
      "A secure data platform for electronic health records, combining blockchain, decentralised storage and encryption with a tested REST API layer.",
    problem:
      "Electronic health records are sensitive, so access must be controlled and tampering must be detectable.",
    solution:
      "A platform with controlled access and integrity checks, built on Ethereum smart contracts (Solidity), IPFS storage and AES encryption, exposed through a Flask REST API with documented workflows and process controls.",
    contribution:
      "Developed the platform; built and tested REST APIs; validated system outputs; applied structured data-management, quality-verification and documentation practices.",
    features: [
      "Controlled access to electronic health records",
      "Data integrity checks",
      "Tested REST APIs with validated outputs",
      "AES encryption, IPFS storage and Ethereum smart contracts",
      "Documented workflows and process controls for sensitive data",
    ],
    tech: ["Python", "Flask", "Solidity", "Ethereum", "IPFS", "AES"],
    filters: ["Python", "Flask", "Blockchain"],
    flowTitle: "Technology layers",
    flow: [
      { label: "REST API", sub: "Flask" },
      { label: "Encryption", sub: "AES" },
      { label: "Storage", sub: "IPFS" },
      { label: "Ledger & contracts", sub: "Solidity / Ethereum" },
    ],
    flowNote: "High-level view of the technologies used; not a data-flow specification.",
  },
];

export const filterOptions = ["All", "Python", "SQL", "Machine Learning", "Data Analytics", "Flask", "Blockchain"];
