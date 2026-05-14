import type { Publication, PublicationTheme } from "./publications";

export type PublicationFilterState = {
  query: string;
  project: string;
  type: string;
  theme: string;
  year: string;
  status: string;
};

export const defaultFilters: PublicationFilterState = {
  query: "",
  project: "all",
  type: "all",
  theme: "all",
  year: "all",
  status: "all",
};

export function filterPublications(
  publications: Publication[],
  filters: PublicationFilterState,
): Publication[] {
  const q = filters.query.trim().toLowerCase();

  return publications.filter((pub) => {
    const searchable = [
      pub.title,
      pub.authors.join(" "),
      pub.venue,
      String(pub.year),
      pub.doi ?? "",
      pub.pmid ?? "",
      pub.abstract ?? "",
      pub.projects.join(" "),
      pub.themes.join(" "),
      pub.tags.join(" "),
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery = !q || searchable.includes(q);
    const matchesProject =
      filters.project === "all" ||
      (filters.project === "unlinked"
        ? pub.projects.length === 0
        : pub.projects.includes(filters.project));
    const matchesType = filters.type === "all" || pub.type === filters.type;
    const matchesTheme =
      filters.theme === "all" ||
      pub.themes.includes(filters.theme as PublicationTheme);
    const matchesYear = filters.year === "all" || String(pub.year) === filters.year;
    const matchesStatus = filters.status === "all" || pub.status === filters.status;

    return (
      matchesQuery &&
      matchesProject &&
      matchesType &&
      matchesTheme &&
      matchesYear &&
      matchesStatus
    );
  });
}

export function getPublicationMetrics(publications: Publication[]) {
  if (publications.length === 0) {
    return {
      total: 0,
      featured: 0,
      projectLinked: 0,
      latestYear: new Date().getFullYear(),
      uniqueVenues: 0,
    };
  }
  const latestYear = Math.max(...publications.map((p) => p.year));
  return {
    total: publications.length,
    featured: publications.filter((p) => p.featured).length,
    projectLinked: publications.filter((p) => p.projects.length > 0).length,
    latestYear,
    uniqueVenues: new Set(publications.map((p) => p.venue)).size,
  };
}

/* ── Citation formatters ── */

export function toAMA(pub: Publication): string {
  const authors =
    pub.authors.slice(0, 3).join(", ") +
    (pub.authors.length > 3 ? ", et al" : "");
  return `${authors}. ${pub.title}. ${pub.venue}. ${pub.year}${pub.doi ? `. doi:${pub.doi}` : ""}.`;
}

export function toAPA(pub: Publication): string {
  const authors = pub.authors.join(", ");
  return `${authors} (${pub.year}). ${pub.title}. ${pub.venue}.${
    pub.doi ? ` https://doi.org/${pub.doi}` : ""
  }`;
}

export function toBibTeX(pub: Publication): string {
  const cleanTitle = pub.title.replace(/[{}]/g, "");
  return `@article{${pub.slug},
  title   = {${cleanTitle}},
  author  = {${pub.authors.join(" and ")}},
  journal = {${pub.venue}},
  year    = {${pub.year}}${pub.doi ? `,\n  doi     = {${pub.doi}}` : ""}${
    pub.url ? `,\n  url     = {${pub.url}}` : ""
  }
}`;
}

export function toRIS(pub: Publication): string {
  const lines = [
    "TY  - JOUR",
    `TI  - ${pub.title}`,
    ...pub.authors.map((a) => `AU  - ${a}`),
    `JO  - ${pub.venue}`,
    `PY  - ${pub.year}`,
  ];
  if (pub.doi) lines.push(`DO  - ${pub.doi}`);
  if (pub.url) lines.push(`UR  - ${pub.url}`);
  lines.push("ER  - ");
  return lines.join("\n");
}

export function toCSVRow(pub: Publication): string {
  const escape = (s: string) => `"${s.replace(/"/g, '""')}"`;
  return [
    escape(pub.slug),
    escape(pub.title),
    escape(pub.authors.join("; ")),
    escape(pub.venue),
    String(pub.year),
    pub.status,
    pub.type,
    pub.doi ?? "",
    pub.url ?? "",
    pub.projects.join("; "),
  ].join(",");
}

export const CSV_HEADER =
  "slug,title,authors,venue,year,status,type,doi,url,projects";

export function downloadTextFile(content: string, filename: string, mimeType = "text/plain") {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
