export type NewsCategory =
  | "conference"
  | "publication"
  | "award"
  | "press"
  | "lab-update"
  | "newsletter";

export type NewsImageEntry = {
  src: string;
  alt: string;
  caption?: string;
};

export type NewsRelatedLink = {
  label: string;
  url: string;
};

export type NewsItem = {
  slug: string;
  title: string;
  date: string;
  category: NewsCategory;
  image?: string;
  imageAlt?: string;
  images?: NewsImageEntry[];
  excerpt: string;
  body: string;
  people: string[];
  projects: string[];
  publications: string[];
  externalLink?: string;
  relatedLinks?: NewsRelatedLink[];
  featured: boolean;
};

export const news: NewsItem[] = [
  {
    slug: "balfour-symposium-2025",
    title: "AIST Lab Presents at the 31st Annual Balfour Surgery Research Symposium",
    date: "2025-10-10",
    category: "conference",
    image: "/news/balfour-symposium-2025.jpg",
    imageAlt: "AIST Lab poster presentation at Balfour Symposium",
    excerpt:
      "AIST Lab presented an abstract poster titled \"Development of a Computer Vision Deep Learning Model to Predict Optimal Surgical Management in Abdominal Wall Reconstruction\" at the 31st Annual Balfour Surgery Research Symposium.",
    body: `On October 10, 2025, the AIST Lab presented an abstract poster at the 31st Annual Balfour Surgery Research Symposium.

The poster, titled "Development of a Computer Vision Deep Learning Model to Predict Optimal Surgical Management in Abdominal Wall Reconstruction," highlighted ongoing work focused on applying computer vision and deep learning to support surgical decision-making in complex abdominal wall reconstruction.

The presentation reflects the AIST Lab's continued commitment to developing innovative AI-driven tools that can enhance operative planning and improve patient-centered surgical care.`,
    people: [],
    projects: [],
    publications: [],
    featured: false,
  },
  {
    slug: "madani-visit-2025",
    title: "AIST Lab Welcomes Dr. Amin Madani to Mayo Clinic",
    date: "2025-11-10",
    category: "lab-update",
    image: "/news/madani-visit-2025.jpg",
    imageAlt: "Dr. Amin Madani delivering a lecture at Mayo Clinic",
    images: [
      {
        src: "/news/madani-visit-2025.jpg",
        alt: "Dr. Amin Madani delivering a lecture at Mayo Clinic",
        caption: "Dr. Amin Madani visiting Mayo Clinic for a Department of Surgery lecture",
      },
      {
        src: "/news/madani-visit-2025-2.jpg",
        alt: "AIST Lab team members with Dr. Amin Madani during his Mayo Clinic visit",
        caption: "AIST Lab team members with Dr. Madani during his Mayo Clinic visit",
      },
    ],
    excerpt:
      "Dr. Amin Madani, founder of the Surgical Artificial Intelligence Research Academy (SARA) at UHN Toronto, visited Mayo Clinic and delivered a Department of Surgery lecture on AI in surgery.",
    body: `On November 10, 2025, Amin Madani, MD, PhD, founder of the Surgical Artificial Intelligence Research Academy (SARA) at the University Health Network (UHN) in Toronto and a collaborator of the AIST Lab, visited Mayo Clinic.

During his visit, Dr. Madani delivered a Department of Surgery lecture titled "Artificial Intelligence for Augmentation of Surgical Performance: Promises, Perils, and Realistic Expectations." His talk explored the evolving role of artificial intelligence in surgery, highlighting both the opportunities and challenges of integrating AI tools into surgical practice, education, and performance improvement.

Dr. Madani's visit reflected the growing collaboration between Mayo Clinic and UHN in advancing surgical AI research and innovation.`,
    people: ["amin-madani"],
    projects: [],
    publications: [],
    featured: false,
  },
  {
    slug: "sages-2026",
    title: "AIST Lab Attends the 2026 SAGES Annual Meeting",
    date: "2026-03-27",
    category: "conference",
    image: "/news/sages-2026.jpg",
    imageAlt: "AIST Lab members at SAGES 2026 in Tampa",
    excerpt:
      "Dr. Simon J. Laplante and Dr. Abdulrahman Alomar represented the AIST Lab at the 2026 SAGES Annual Meeting in Tampa, Florida (March 24–27, 2026).",
    body: `From March 24–27, 2026, members of the AIST Lab attended the annual conference of the Society of American Gastrointestinal and Endoscopic Surgeons (SAGES), held in Tampa, Florida.

Dr. Simon J. Laplante, founder of the AIST Lab, and Dr. Abdulrahman Alomar, research fellow in the AIST Lab, represented the team at the meeting. Their attendance provided an opportunity to engage with leaders in minimally invasive surgery, explore emerging innovations in surgical technology, and connect with colleagues advancing the future of surgical care.

The AIST Lab's participation reflects its continued commitment to collaboration, innovation, and the integration of artificial intelligence into surgical practice.`,
    people: ["simon-laplante", "abdulrahman-alomar"],
    projects: [],
    publications: [],
    featured: false,
  },
  {
    slug: "asmbs-2026",
    title: "AIST Lab Represents Mayo Clinic at the 2026 ASMBS Annual Meeting",
    date: "2026-05-07",
    category: "conference",
    image: "/news/asmbs-2026.jpg",
    imageAlt: "Dr. Laplante presenting at ASMBS 2026 in San Antonio",
    images: [
      {
        src: "/news/asmbs-2026.jpg",
        alt: "Dr. Laplante presenting at ASMBS 2026 in San Antonio",
        caption: "AIST Lab representation at the 2026 ASMBS Annual Meeting",
      },
      {
        src: "/news/asmbs-poster1-2026.jpg",
        alt: "MOSI abstract poster presented by the AIST Lab at the 2026 ASMBS Annual Meeting",
        caption: "MOSI abstract poster: Mayo Obesity Staging Index, a novel obesity classification system",
      },
    ],
    excerpt:
      "Dr. Simon J. Laplante delivered an invited talk on \"Quantum Computing: Solving Complex Surgical Data Challenges\" and the AIST Lab presented the MOSI abstract poster at the 2026 ASMBS Annual Meeting in San Antonio, Texas.",
    body: `From May 4–7, 2026, Dr. Simon J. Laplante and Dr. Abdulrahman Alomar represented the AIST Lab at the annual American Society for Metabolic and Bariatric Surgery (ASMBS) conference, held this year in San Antonio, Texas.

During the meeting, Dr. Laplante delivered an invited talk titled "Quantum Computing: Solving Complex Surgical Data Challenges" as part of the session "No Longer The Future: AI, Digital Surgery, Machine Learning and Quantum Computing in Today's OR." He also served as moderator for the Innovation Without Borders session, contributing to discussions on emerging technologies and their role in the future of surgery.

The AIST Lab also presented an abstract poster titled "[Mayo Obesity Staging Index: A Novel Obesity Classification System](https://www.soard.org/article/S1550-7289(26)00376-X/fulltext)," highlighting ongoing work to develop a clinically meaningful framework for obesity classification and surgical decision-making.

The lab's participation at ASMBS reflects its growing role in advancing innovation at the intersection of bariatric surgery, artificial intelligence, and emerging computational technologies.`,
    people: ["simon-laplante", "abdulrahman-alomar"],
    projects: ["mosi"],
    publications: ["mosi-novel-classification-2026"],
    relatedLinks: [
      {
        label: "Published abstract — SOARD",
        url: "https://www.soard.org/article/S1550-7289(26)00376-X/fulltext",
      },
    ],
    featured: true,
  },
];

export const allNews = [...news].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export const featuredNews = allNews.find((n) => n.featured) ?? allNews[0];

export function getNewsImages(item: NewsItem): NewsImageEntry[] {
  if (item.images?.length) return item.images;
  if (item.image) {
    return [{ src: item.image, alt: item.imageAlt ?? item.title }];
  }
  return [];
}

export function getNewsPrimaryImage(item: NewsItem): NewsImageEntry | undefined {
  return getNewsImages(item)[0];
}

export function getNewsByPerson(slug: string): NewsItem[] {
  return allNews.filter((n) => n.people.includes(slug));
}

export function getNewsByProject(slug: string): NewsItem[] {
  return allNews.filter((n) => n.projects.includes(slug));
}

export function getNewsByPublication(slug: string): NewsItem[] {
  return allNews.filter((n) => n.publications.includes(slug));
}

export function hasRecentNews(daysWindow = 14): boolean {
  const now = Date.now();
  const windowMs = daysWindow * 24 * 60 * 60 * 1000;
  return allNews.some((item) => {
    const itemDate = new Date(item.date).getTime();
    return now - itemDate <= windowMs;
  });
}

export const CATEGORY_LABELS: Record<NewsCategory, string> = {
  conference: "Conference",
  publication: "Publication",
  award: "Award",
  press: "Press",
  "lab-update": "Lab Update",
  newsletter: "Newsletter",
};

export const CATEGORY_COLORS: Record<NewsCategory, string> = {
  conference: "border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 text-[var(--color-accent)]",
  publication: "border-blue-300/40 bg-blue-300/10 text-blue-300",
  award: "border-yellow-400/40 bg-yellow-400/10 text-yellow-400",
  press: "border-purple-400/40 bg-purple-400/10 text-purple-400",
  "lab-update": "border-emerald-400/40 bg-emerald-400/10 text-emerald-400",
  newsletter: "border-[var(--color-muted-foreground)]/40 bg-[var(--color-muted)] text-[var(--color-muted-foreground)]",
};
