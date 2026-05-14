export type TeamRole =
  | "Principal Investigator"
  | "AI Lead"
  | "Research Fellow"
  | "Resident"
  | "Engineer"
  | "Collaborator"
  | "Alumni";

export type TeamMember = {
  slug: string;
  name: string;
  role: TeamRole;
  affiliation: string;
  bio: string;
  photo: string;
  initials: string;
  links: {
    profile?: string;
    email?: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
    scholar?: string;
  };
  featured?: boolean;
  order: number;
};

export const team: TeamMember[] = [
  {
    slug: "simon-laplante",
    name: "Simon J. Laplante, M.D.",
    role: "Principal Investigator",
    affiliation: "Mayo Clinic",
    bio: "Principal investigator of AIST, with a focus on translational surgical AI and clinical decision support.",
    photo: "/team/simon-laplante.jpg",
    initials: "S.L.",
    links: {
      profile: "https://www.mayoclinic.org/biographies/laplante-simon-j-m-d/bio-20573005",
    },
    featured: true,
    order: 1,
  },
  {
    slug: "hojjat-salehinejad",
    name: "Hojjat Salehinejad, Ph.D.",
    role: "AI Lead",
    affiliation: "Mayo Clinic",
    bio: "Leads the AI and machine learning research at AIST, spanning computer vision, deep learning, and generative models for surgery.",
    photo: "/team/hojjat-salehinejad.jpg",
    initials: "H.S.",
    links: {},
    featured: true,
    order: 2,
  },
  {
    slug: "reza-shahriarirad",
    name: "Reza Shahriarirad, M.D.",
    role: "Research Fellow",
    affiliation: "Mayo Clinic",
    bio: "Research fellow in Surgery Innovation, leading the development of MOSI and SIRIS platforms.",
    photo: "/team/reza-shahriarirad.jpg",
    initials: "R.S.",
    links: {
      profile: "https://sorrad.github.io/RezaShahriarirad_CV/",
      github: "https://github.com/SoRRad",
    },
    featured: true,
    order: 3,
  },
  {
    slug: "abdulrahman-alomar",
    name: "Abdulrahman Alomar, M.D.",
    role: "Research Fellow",
    affiliation: "Mayo Clinic",
    bio: "Research fellow in the Department of Metabolic and Abdominal Wall Reconstructive Surgery.",
    photo: "/team/abdulrahman-alomar.jpg",
    initials: "A.A.",
    links: {
      linkedin: "https://www.linkedin.com/in/abdulrahman-alomar-aba47a233/",
    },
    featured: true,
    order: 4,
  },
  {
    slug: "intekhab-hossain",
    name: "Intekhab Hossain",
    role: "Engineer",
    affiliation: "Mayo Clinic",
    bio: "Software and ML engineering across the AIST platform stack.",
    photo: "/team/intekhab-hossain.jpg",
    initials: "I.H.",
    links: {},
    featured: true,
    order: 5,
  },
  {
    slug: "omar-ghanem",
    name: "Omar M. Ghanem, M.D.",
    role: "Collaborator",
    affiliation: "Mayo Clinic — MARS",
    bio: "Consultant bariatric and metabolic surgeon; clinical collaborator on MOSI.",
    photo: "/team/omar-ghanem.jpg",
    initials: "O.G.",
    links: {
      profile: "https://www.mayoclinic.org/biographies/ghanem-omar-m-m-d/bio-20491179",
    },
    featured: true,
    order: 6,
  },
  {
    slug: "amin-madani",
    name: "Amin Madani, M.D., Ph.D.",
    role: "Collaborator",
    affiliation: "University Health Network — SARA Lab",
    bio: "Surgical AI collaborator; director of the SARA Lab at UHN, Toronto.",
    photo: "/team/amin-madani.jpg",
    initials: "A.M.",
    links: {
      profile: "https://www.uhnresearch.ca/researcher/amin-madani",
    },
    featured: true,
    order: 7,
  },
];


export const mainTeam = team
  .filter((m) => m.role !== "Collaborator" && m.role !== "Alumni")
  .sort((a, b) => a.order - b.order);

export const collaboratorTeam = team
  .filter((m) => m.role === "Collaborator")
  .sort((a, b) => a.order - b.order);

export const alumniTeam = team
  .filter((m) => m.role === "Alumni")
  .sort((a, b) => a.order - b.order);
