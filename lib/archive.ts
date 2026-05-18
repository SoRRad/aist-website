export type ArchiveCategory =
  | "presentation"
  | "video"
  | "webinar"
  | "journal-club"
  | "document";

export type ArchiveAccess = "public" | "mayo-only" | "restricted";

export type ArchiveItem = {
  slug: string;
  title: string;
  date: string;
  category: ArchiveCategory;
  description: string;
  fileUrl?: string;
  videoUrl?: string;
  thumbnail?: string;
  people: string[];
  projects: string[];
  news: string[];
  publications: string[];
  access: ArchiveAccess;
  externalReference?: string;
  duration?: string;
};

export const archiveItems: ArchiveItem[] = [
  {
    slug: "asmbs-2026-mosi-poster",
    title: "MOSI — A Novel Obesity Classification System (ASMBS 2026 Poster)",
    date: "2026-05-07",
    category: "presentation",
    description:
      "Conference poster presented at the 2026 ASMBS Annual Meeting in San Antonio. Introduces the Mayo Obesity Staging and Indication system for bariatric surgery decision support.",
    fileUrl: "",
    externalReference:
      "https://www.soard.org/article/S1550-7289(26)00376-X/fulltext",
    people: ["simon-laplante", "abdulrahman-alomar"],
    projects: ["mosi"],
    publications: ["mosi-novel-classification-2026"],
    news: ["asmbs-2026"],
    access: "public",
  },
  {
    slug: "madani-lecture-2025",
    title:
      "AI for Augmentation of Surgical Performance — Mayo Department of Surgery Lecture",
    date: "2025-11-10",
    category: "webinar",
    description:
      "Dr. Amin Madani's Department of Surgery lecture on the evolving role of AI in surgery — promises, perils, and realistic expectations.",
    videoUrl: "",
    people: ["amin-madani"],
    projects: [],
    publications: [],
    news: ["madani-visit-2025"],
    access: "mayo-only",
    duration: "60 min",
  },
  {
    slug: "journal-club-template",
    title: "A-STAR Journal Club — [Topic] [Month] [Year]",
    date: "2026-05-27",
    category: "journal-club",
    description:
      "Template entry for upcoming A-STAR Lab Journal Club recordings. Duplicate and rename to add a real journal club archive entry.",
    videoUrl: "",
    people: [],
    projects: [],
    publications: [],
    news: [],
    access: "restricted",
    duration: "TBD",
  },
];

export const ARCHIVE_CATEGORY_LABELS: Record<ArchiveCategory, string> = {
  presentation: "Presentation",
  video: "Video",
  webinar: "Webinar",
  "journal-club": "Journal Club",
  document: "Document",
};

export const ARCHIVE_ACCESS_LABELS: Record<ArchiveAccess, string> = {
  public: "Public",
  "mayo-only": "Mayo employees",
  restricted: "Restricted",
};

export function getArchiveByProject(slug: string): ArchiveItem[] {
  return archiveItems.filter((a) => a.projects.includes(slug));
}

export function getArchiveByPerson(slug: string): ArchiveItem[] {
  return archiveItems.filter((a) => a.people.includes(slug));
}

export function getArchiveByNews(slug: string): ArchiveItem[] {
  return archiveItems.filter((a) => a.news.includes(slug));
}
