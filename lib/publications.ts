/**
 * Author lists use "LastName F" format for inline display.
 * AMA/APA/BibTeX formatters in publication-utils.ts handle punctuation.
 */

export type PublicationType =
  | "original-research"
  | "review"
  | "systematic-review"
  | "meta-analysis"
  | "case-report"
  | "editorial"
  | "letter"
  | "conference-abstract"
  | "technical-report"
  | "preprint";

export type PublicationStatus = "published" | "accepted" | "in-press" | "preprint" | "submitted";

export type PublicationTheme =
  | "surgical-ai"
  | "computer-vision"
  | "bariatric-surgery"
  | "robotic-surgery"
  | "patient-education"
  | "clinical-decision-support"
  | "validation"
  | "simulation"
  | "outcomes";

export type Publication = {
  slug: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  date: string;

  type: PublicationType;
  status: PublicationStatus;

  doi?: string;
  pmid?: string;
  url?: string;
  pdfUrl?: string;
  abstract?: string;

  projects: string[];
  team: string[];
  themes: PublicationTheme[];
  tags: string[];

  featured?: boolean;
  selected?: boolean;
  order: number;
  citationCount?: number;
  journalImpact?: string;
  lastUpdated?: string;
};

export const publications: Publication[] = [
  {
    slug: "mosi-novel-classification-2026",
    title:
      "Mayo Obesity Staging and Indication (MOSI): A Novel Obesity Classification System in the Era of Medical, Endoscopic and Surgical Treatments",
    authors: ["Shahriarirad R", "Alomar A", "Ghanem OM", "Laplante SJ"],
    venue: "Surgery for Obesity and Related Diseases",
    year: 2026,
    date: "2026-01-01",
    type: "original-research",
    status: "published",
    url: "https://www.soard.org/article/S1550-7289(26)00376-X/fulltext",
    projects: ["mosi"],
    team: ["reza-shahriarirad", "simon-laplante", "omar-ghanem", "abdulrahman-alomar"],
    themes: ["bariatric-surgery", "clinical-decision-support", "validation"],
    tags: ["MOSI", "Bariatric Surgery", "Risk Stratification", "Decision Support"],
    featured: true,
    selected: true,
    order: 1,
  },
  {
    slug: "bariatric-patient-education-2026",
    title:
      "Online patient education resources in bariatric surgery: a systematic evaluation of quality, readability, transparency, and representation",
    authors: ["AIST Team"],
    venue: "Surgical Endoscopy",
    year: 2026,
    date: "2026-01-01",
    type: "systematic-review",
    status: "published",
    url: "https://link.springer.com/epdf/10.1007/s00464-026-12845-y?sharing_token=X1FFIp8FaTy95IopHMETZ_e4RwlQNchNByi7wbcMAY7UCqoJ8eLSyzymY0S4YSNR4Z8ZRt_alE6w8n6dm3Wa_NVZfYplTx02QsdLOeip0tScGKhhP12nh2GeoeGxDwVsj2y9oRJsVhjBhvFESe9McS7VKQuLW3ohCzTdxliG32U%3D",
    projects: ["siris"],
    team: ["reza-shahriarirad"],
    themes: ["patient-education", "bariatric-surgery"],
    tags: ["SIRIS", "Patient Education", "Bariatric Surgery", "Systematic Review"],
    featured: true,
    selected: true,
    order: 2,
  },
  {
    slug: "surgical-warmup-rounds-2026",
    title:
      "Surgical Warmup Rounds: Concept of Targeted Just-In-Time Robotic Simulation Rehearsal Before and Between Cases",
    authors: ["AIST Team"],
    venue: "Surgical Innovation",
    year: 2026,
    date: "2026-01-01",
    type: "original-research",
    status: "published",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S1931720426000255?via%3Dihub",
    projects: [],
    team: [],
    themes: ["robotic-surgery", "simulation"],
    tags: ["Robotic Surgery", "Simulation", "Training"],
    featured: false,
    order: 3,
  },
];
