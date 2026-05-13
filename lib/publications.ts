/**
 * Author lists are placeholders — please fill in real authors when ready,
 * and add any missing publications.
 */

export type Publication = {
  slug: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  date: string;
  doi?: string;
  url: string;
  pdfUrl?: string;
  abstract?: string;
  projects: string[];
  team: string[];
  featured?: boolean;
  order: number;
  lastUpdated?: string;
};

export const publications: Publication[] = [
  {
    slug: "mosi-novel-classification-2026",
    title:
      "Mayo Obesity Staging and Indication (MOSI): A Novel Obesity Classification System in the Era of Medical, Endoscopic and Surgical Treatments",
    authors: ["AIST Team"],
    venue: "Surgery for Obesity and Related Diseases",
    year: 2026,
    date: "2026-01-01",
    url: "https://www.soard.org/article/S1550-7289(26)00376-X/fulltext",
    projects: ["mosi"],
    team: ["simon-laplante", "reza-shahriarirad", "omar-ghanem"],
    featured: true,
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
    url: "https://link.springer.com/epdf/10.1007/s00464-026-12845-y?sharing_token=X1FFIp8FaTy95IopHMETZ_e4RwlQNchNByi7wbcMAY7UCqoJ8eLSyzymY0S4YSNR4Z8ZRt_alE6w8n6dm3Wa_NVZfYplTx02QsdLOeip0tScGKhhP12nh2GeoeGxDwVsj2y9oRJsVhjBhvFESe9McS7VKQuLW3ohCzTdxliG32U%3D",
    projects: ["siris"],
    team: ["reza-shahriarirad"],
    featured: true,
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
    url: "https://www.sciencedirect.com/science/article/abs/pii/S1931720426000255?via%3Dihub",
    projects: [],
    team: [],
    featured: false,
    order: 3,
  },
];
