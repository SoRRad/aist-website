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
  researchFocus?: string[];
  featured?: boolean;
  order: number;
  isOpenPosition?: boolean;
  openPositionUrl?: string;
};

export const team: TeamMember[] = [
  {
    slug: "simon-laplante",
    name: "Simon J. Laplante, M.D.",
    role: "Principal Investigator",
    affiliation: "Mayo Clinic",
    bio: "Principal investigator of AIST, with a focus on translational surgical AI and clinical decision support. Dr. Laplante bridges the operating room and the algorithm, with a particular emphasis on bariatric surgery decision-making and the prospective validation of AI tools in clinical practice.", // TODO: Refine bio
    photo: "/team/simon-laplante.jpg",
    initials: "S.L.",
    links: {
      profile: "https://www.mayoclinic.org/biographies/laplante-simon-j-m-d/bio-20573005",
    },
    researchFocus: [
      "Bariatric surgery decision support",
      "Clinical translation of surgical AI",
      "External validation of decision systems",
      "Quantum computing in surgery", // TODO: Refine focus areas
    ],
    featured: true,
    order: 1,
  },
  {
    slug: "hojjat-salehinejad",
    name: "Hojjat Salehinejad, Ph.D.",
    role: "AI Lead",
    affiliation: "Mayo Clinic",
    bio: "Leads the AI and machine learning research at AIST, spanning computer vision, deep learning, and generative models for surgery. Dr. Salehinejad's work focuses on building robust, clinically deployable models that operate reliably across diverse patient populations.", // TODO: Refine bio
    photo: "/team/hojjat-salehinejad.jpg",
    initials: "H.S.",
    links: {},
    researchFocus: [
      "Surgical computer vision",
      "Deep learning for medical imaging",
      "Generative models in surgery", // TODO: Refine focus areas
    ],
    featured: true,
    order: 2,
  },
  {
    slug: "reza-shahriarirad",
    name: "Reza Shahriarirad, M.D.",
    role: "Research Fellow",
    affiliation: "Mayo Clinic",
    bio: "Research fellow in the Surgery Innovation Lab, leading the development of the MOSI and SIRIS platforms. Dr. Shahriarirad's work spans AI-driven decision support, patient education, and the application of advanced biomarkers to understand surgical outcomes.", // TODO: Refine bio
    photo: "/team/reza-shahriarirad.jpg",
    initials: "R.S.",
    links: {
      profile: "https://sorrad.github.io/RezaShahriarirad_CV/",
      github: "https://github.com/SoRRad",
    },
    researchFocus: [
      "MOSI — bariatric staging system",
      "SIRIS — patient education platform",
      "AI-derived biomarkers in bariatric surgery",
      "ECG-based biological age prediction", // TODO: Refine focus areas
    ],
    featured: true,
    order: 3,
  },
  {
    slug: "abdulrahman-alomar",
    name: "Abdulrahman Alomar, M.D.",
    role: "Research Fellow",
    affiliation: "Mayo Clinic",
    bio: "Research fellow in the Department of Metabolic and Abdominal Wall Reconstructive Surgery at Mayo Clinic. Dr. Alomar contributes to AIST's clinical research in bariatric surgery, abdominal wall reconstruction, and the integration of AI tools into surgical planning.", // TODO: Refine bio
    photo: "/team/abdulrahman-alomar.jpg",
    initials: "A.A.",
    links: {
      linkedin: "https://www.linkedin.com/in/abdulrahman-alomar-aba47a233/",
    },
    researchFocus: [
      "Metabolic and bariatric surgery",
      "Abdominal wall reconstruction",
      "Surgical AI in complex abdominal surgery", // TODO: Refine focus areas
    ],
    featured: true,
    order: 4,
  },
  {
    slug: "intekhab-hossain",
    name: "Intekhab Hossain",
    role: "Engineer",
    affiliation: "Mayo Clinic",
    bio: "Software and ML engineering across the AIST platform stack. Intekhab builds and maintains the infrastructure that bridges AIST's research algorithms and clinical-facing tools, with a focus on reliability, scalability, and developer ergonomics.", // TODO: Refine bio
    photo: "/team/intekhab-hossain.jpg",
    initials: "I.H.",
    links: {},
    researchFocus: [
      "ML infrastructure and deployment",
      "Clinical software engineering",
      "Platform reliability", // TODO: Refine focus areas
    ],
    featured: true,
    order: 5,
  },
  {
    slug: "omar-ghanem",
    name: "Omar M. Ghanem, M.D.",
    role: "Collaborator",
    affiliation: "Mayo Clinic — MARS",
    bio: "Consultant bariatric and metabolic surgeon at Mayo Clinic, and clinical collaborator on the MOSI project. Dr. Ghanem brings deep expertise in complex bariatric and revisional surgery, and provides critical clinical validation for AIST's decision-support tools.", // TODO: Refine bio
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
    bio: "Director of the Surgical Artificial Intelligence Research Academy (SARA) at the University Health Network, Toronto. Dr. Madani is a leading figure in surgical AI, focusing on real-time operative guidance, computer vision for the OR, and the translation of surgical AI into clinical practice.", // TODO: Refine bio
    photo: "/team/amin-madani.jpg",
    initials: "A.M.",
    links: {
      profile: "https://www.uhnresearch.ca/researcher/amin-madani",
    },
    featured: true,
    order: 7,
  },
  {
    slug: "ai-engineer-open",
    name: "AI Engineer",
    role: "Engineer",
    affiliation: "Mayo Clinic — AIST Lab",
    bio: "We are actively recruiting an AI Engineer to join the AIST Lab. The right candidate will work across the lab's surgical AI portfolio — computer vision, decision support, and validation — alongside our research fellows and clinical collaborators.",
    photo: "",
    initials: "?",
    links: {
      profile:
        "https://jobs.mayoclinic.org/job/rochester/research-fellow-in-surgical-ai/33647/92856889248",
    },
    researchFocus: ["Position open — apply via Mayo Careers"],
    featured: true,
    order: 8,
    isOpenPosition: true,
    openPositionUrl:
      "https://jobs.mayoclinic.org/job/rochester/research-fellow-in-surgical-ai/33647/92856889248",
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
