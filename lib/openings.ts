export type Opening = {
  slug: string;
  title: string;
  type: "Research Fellow" | "Postdoc" | "PhD" | "RA" | "Engineer";
  location: string;
  summary: string;
  applyUrl: string;
  postedAt: string;
};

export const openings: Opening[] = [
  {
    slug: "research-fellow-surgical-ai",
    title: "Research Fellow in Surgical AI",
    type: "Research Fellow",
    location: "Mayo Clinic, Rochester, MN",
    summary:
      "Two-year research fellowship in surgical AI, working across decision support, computer vision, and clinical validation projects.",
    applyUrl:
      "https://jobs.mayoclinic.org/job/rochester/research-fellow-in-surgical-ai/33647/92856889248",
    postedAt: "2026-04-01",
  },
];
