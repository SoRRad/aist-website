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
    bio: "Simon J. Laplante, M.D., is a board-certified surgeon in the Division of Metabolic and Abdominal Wall Reconstructive Surgery at Mayo Clinic in Rochester, Minnesota. His work focuses on translating surgical artificial intelligence, computer vision, simulation, and augmented reality into practical tools that improve surgical safety, guidance, coaching, education, and quality improvement. With advanced training in minimally invasive, bariatric, gastrointestinal, and abdominal wall reconstructive surgery, Dr. Laplante combines clinical expertise with rigorous validation of AI systems for real-world surgical decision support and performance assessment.",
    photo: "/team/simon-laplante.jpg",
    initials: "S.L.",
    links: {
      profile: "https://www.mayoclinic.org/biographies/laplante-simon-j-m-d/bio-20573005",
    },
    researchFocus: [
      "Bariatric surgery decision support",
      "Clinical translation of surgical AI",
      "External validation of decision systems",
      "Quantum computing in surgery",
      "Surgical AI",
     "Computer vision",
     "Decision support",
     "Surgical safety",
      "Video assessment",
     "Simulation AI",
    ],
    featured: true,
    order: 1,
  },
  {
    slug: "hojjat-salehinejad",
    name: "Hojjat Salehinejad, Ph.D.",
    role: "AI Lead",
    affiliation: "Mayo Clinic",
    bio: "Leads the AI and machine learning research at AIST. Dr. Salehinejad is an Associate Professor of Health Care Systems Engineering at Mayo Clinic. His research focuses on practical, trustworthy AI for healthcare, especially systems that remain reliable in real-world settings and support clinical decision-making under uncertainty. He earned his PhD from the University of Toronto, where he also completed a postdoctoral fellowship in machine learning. He founded and leads the IEEE AI in Healthcare Task Force and serves as an associate editor for leading IEEE journals.",
    photo: "/team/hojjat-salehinejad.jpg",
    initials: "H.S.",
    links: {
      profile: "https://www.mayo.edu/research/faculty/salehinejad-hojjat-ph-d/bio-20547448"
    },
    researchFocus: [
      "Surgical computer vision",
      "Deep learning for medical imaging",
      "Generative models in surgery",
    ],
    featured: true,
    order: 2,
  },
  {
    slug: "reza-shahriarirad",
    name: "Reza Shahriarirad, M.D.",
    role: "Research Fellow",
    affiliation: "Mayo Clinic",
    bio: "Reza Shahriarirad is a physician-researcher and Research Fellow in Surgical Innovation in the Department of Surgery at Mayo Clinic in Rochester, Minnesota. His work sits at the intersection of surgery, data science, and emerging technology, with a focus on how artificial intelligence, computer vision, and wearable sensing can advance surgical decision-making, intraoperative precision, and patient-centered care. He has authored more than 190 peer-reviewed publications spanning surgical innovation, minimally invasive and reconstructive surgery, surgical AI and predictive modeling, and infectious disease. His work also includes two issued patents and recognition among the World’s Top 2% Scientists by Stanford/Elsevier. He has completed 149 peer reviews across more than 60 international journals and serves as Guest Editor for PLOS ONE and Associate Editor for Shiraz E-Medical Journal. He is also the developer of the AIST platform and SIRIS, and co-developer of MOSI.",
    photo: "/team/reza-shahriarirad.jpg",
    initials: "R.S.",
    links: {
      profile: "https://sorrad.github.io/RezaShahriarirad_CV/",
      github: "https://github.com/SoRRad",
      linkedin: "https://www.linkedin.com/in/reza-shahriarirad/",
    },
    researchFocus: [
      "Surgical Innovation",
      "Outcome Research",
      "Artificial Intelligence",
      "Computer Vision",
      "Large Language Models",
      "Minimally Invasive Surgery",
    ],
    featured: true,
    order: 3,
  },
  {
    slug: "abdulrahman-alomar",
    name: "Abdulrahman Alomar, M.D.",
    role: "Research Fellow",
    affiliation: "Mayo Clinic",
    bio: "Abdulrahman Alomar is a Research Fellow in the Division of Metabolic and Abdominal Wall Reconstructive Surgery at Mayo Clinic and the AIST Surgical AI Lab. He graduated with First Honors from the Royal College of Surgeons in Ireland – Bahrain, where he ranked among the top of his class. His research focuses on artificial intelligence in surgery, computer vision, robotic surgery, surgical education, and outcomes research. He co-leads the Mayo Obesity Staging Index project, with a broader interest in advancing AI-driven clinical decision support and surgical innovation. Outside of work, Abdulrahman enjoys visiting aquariums in every city he travels to; his favorite so far is SeaWorld Abu Dhabi.",
    photo: "/team/abdulrahman-alomar.jpg",
    initials: "A.A.",
    links: {
      linkedin: "https://www.linkedin.com/in/abdulrahman-alomar-aba47a233/",
    },
    researchFocus: [
      "Metabolic and bariatric surgery",
      "Abdominal wall reconstruction",
      "Surgical AI in complex abdominal surgery",
    ],
    featured: true,
    order: 4,
  },
  {
    slug: "intekhab-hossain",
    name: "Intekhab Hossain",
    role: "Research Fellow",
    affiliation: "Mayo Clinic",
    bio: "Dr. Intekhab Hossain is currently a Minimally Invasive and Bariatric Surgery fellow and is also completing his Master of Science in Health Systems Leadership and Innovation, both through the University of Toronto. He completed his General Surgery Residency at Memorial University. His research interests include bariatric surgery, endobariatrics, artificial intelligence and quality improvement in surgery.",
    photo: "/team/intekhab-hossain.jpg",
    initials: "I.H.",
    links: {},
    researchFocus: [
      "Minimally Invasive Surgery",
      "Bariatric Surgery",
    ],
    featured: true,
    order: 5,
  },
  {
    slug: "omar-ghanem",
    name: "Omar M. Ghanem, M.D.",
    role: "Collaborator",
    affiliation: "Mayo Clinic — MARS",
    bio: "Omar M. Ghanem, M.D., is a metabolic surgeon and Chair of the Division of Metabolic and Abdominal Wall Reconstructive Surgery Division at Mayo Clinic in Rochester, Minnesota. He has authored numerous journal articles, book chapters, abstracts, and other written publications. In addition to his clinical and research activities, Dr. Ghanem is the associate program director of the Mayo Clinic Minimally Invasive Surgery fellowship program. He is the associate editor of the Surgery for Obesity and Related Diseases Journal (SOARD), Clinical Obesity Journal and Surgical Innovation Journal. He is also on the editorial board of multiple journals including Annals of Surgery, Obesity Surgery, Surgical Laparoscopy & Percutaneous Techniques (SLEPT) journals. He is the Co-Chair of the Metabolic and Bariatric Surgery Committee at The Society of American Gastrointestinal and Endoscopic Surgeons (SAGES) Metabolic and Bariatric Committee.",
    photo: "/team/omar-ghanem.jpg",
    initials: "O.M.G.",
    links: {
      profile: "https://www.mayoclinic.org/biographies/ghanem-omar-m-m-d/bio-20491179",
    },
      researchFocus: [
      "Minimally Invasive Surgery",
      "Bariatric Surgery",
      "complex & re-operative bariatric revisions",
      "Minimally invasive median arcuate ligament release surgeries",
      "duodenal switch outcomes",
      "revisions after Roux-en-Y gastric bypass",
    ],
    featured: true,
    order: 6,
  },
  {
    slug: "amin-madani",
    name: "Amin Madani, M.D., Ph.D.",
    role: "Collaborator",
    affiliation: "University Health Network — SARA Lab",
    bio: "Director of the Surgical Artificial Intelligence Research Academy (SARA) at the University Health Network, Toronto. Dr. Madani is a leading figure in surgical AI, focusing on real-time operative guidance, computer vision for the OR, and the translation of surgical AI into clinical practice.",
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
