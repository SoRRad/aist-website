export type Collaborator = {
  slug: string;
  name: string;
  shortName?: string;
  description: string;
  logo: string;
  url: string;
  featured?: boolean;
  order: number;
};

export const collaborators: Collaborator[] = [
  {
    slug: "mayo-clinic-mars",
    name: "Mayo Clinic — Metabolic, Abdominal Wall & Reconstructive Surgery",
    shortName: "Mayo Clinic — MARS",
    description: "Clinical home and primary partner of AIST.",
    logo: "/logos/partners/mayo-clinic-mars.png",
    url: "https://www.mayoclinic.org/departments-centers/metabolic-abdominal-wall-reconstructive-surgery-rochester/sections/overview/ovc-20599238",
    featured: true,
    order: 1,
  },
  {
    slug: "surgical-ai2-lab",
    name: "Surgical AI² Lab",
    shortName: "Surgical AI² Lab",
    description: "Collaborating laboratory in surgical artificial intelligence research.",
    logo: "/logos/partners/surgical-ai2-lab.png",
    url: "https://surgicalai2.com/",
    featured: true,
    order: 2,
  },
  {
    slug: "sara-lab",
    name: "Surgical Artificial Intelligence Research Academy (SARA)",
    shortName: "SARA Lab",
    description: "Affiliated research academy at Temerty Simulation Centre, University Health Network, Toronto.",
    logo: "/logos/partners/sara-lab.png",
    url: "https://temertysimcentre.com/surgical-artificial-intelligence-research-academy-sara/",
    featured: true,
    order: 3,
  },
];
