export interface Phase {
  id: string;
  code: string;
  title: string;
  description: string;
  projects: string[];
}

export const phases: Phase[] = [
  {
    id: "risk-stratification",
    code: "01",
    title: "Risk Stratification & Planning",
    description:
      "Pre-operative risk assessment, candidate identification, and surgical decision support driven by validated algorithms.",
    projects: ["mosi"],
  },
  {
    id: "intra-op-intelligence",
    code: "02",
    title: "Intra-operative Intelligence",
    description:
      "Real-time anatomy recognition, surgical phase detection, and Go/No-Go zone guidance for the operating theatre.",
    projects: [],
  },
  {
    id: "patient-journey",
    code: "03",
    title: "Patient Journey & Education",
    description:
      "AI-powered surgical patient education, visit preparation, and care-team communication.",
    projects: ["siris"],
  },
  {
    id: "outcomes-validation",
    code: "04",
    title: "Outcomes & Validation",
    description:
      "Prospective external validation of surgical AI, real-world outcomes analysis, and clinical trial readiness.",
    projects: ["mosi"],
  },
];
