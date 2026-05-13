export type ProjectStatus = "concept" | "development" | "validation" | "clinical" | "deployed";
export type SurgicalPhase = "pre-operative" | "intra-operative" | "post-operative" | "validation";

export type Project = {
  slug: string;
  name: string;
  longName: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  phases: SurgicalPhase[];
  liveUrl: string;
  githubUrl?: string;
  team: string[];
  collaborators: string[];
  featured?: boolean;
  order: number;
  // TODO Step 4: approach, results, roadmap, etc.
};

export const projects: Project[] = [
  {
    slug: "mosi",
    name: "MOSI",
    longName: "Metabolic & Obesity Staging Index",
    tagline: "Decision support and prospective validation for bariatric surgery.",
    description:
      "A staging algorithm and clinical audit platform for bariatric surgery, validated on 3,097 patients. MOSI scores patients across BMI, comorbidities, and severity to recommend procedures and target weight-loss tiers.",
    status: "validation",
    phases: ["pre-operative", "post-operative", "validation"],
    liveUrl: "https://sorrad.github.io/MOSI-System/",
    githubUrl: "https://github.com/SoRRad/MOSI-System",
    team: ["simon-laplante", "reza-shahriarirad", "abdulrahman-alomar"],
    collaborators: ["mayo-clinic-mars"],
    featured: true,
    order: 1,
  },
  {
    slug: "siris",
    name: "SIRIS",
    longName: "Surgical-IRIS Education",
    tagline: "AI-powered surgical patient education built on Mayo Clinic's IRIS platform.",
    description:
      "SIRIS helps patients ask specialty-focused education questions, review Mayo Clinic resources, and prepare questions for their care team — bridging the information gap between booking and operation.",
    status: "deployed",
    phases: ["pre-operative", "post-operative"],
    liveUrl: "https://siris-1029209978489.us-central1.run.app",
    team: ["reza-shahriarirad"],
    collaborators: ["mayo-clinic-mars"],
    featured: true,
    order: 2,
  },
];
