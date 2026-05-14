export interface GlossaryEntry {
  slug: string;
  term: string;
  definition: string;
  related?: string[];
  category?: string;
}

export const glossary: GlossaryEntry[] = [
  {
    slug: "surgical-phase-recognition",
    term: "Surgical phase recognition",
    definition:
      "Automated identification of the current stage in a surgical procedure — such as dissection, clipping, or extraction — from intra-operative video. Enables context-aware AI assistance and real-time safety guidance without manual annotation.",
    related: ["anatomy-segmentation", "intra-operative"],
    category: "Computer Vision",
  },
  {
    slug: "tool-tracking",
    term: "Tool tracking",
    definition:
      "Continuous detection and localisation of surgical instruments in laparoscopic or robotic video. Used to infer surgical activity, measure operative efficiency, and trigger safety alerts when instruments enter restricted anatomical zones.",
    related: ["surgical-phase-recognition", "go-no-go-zones"],
    category: "Computer Vision",
  },
  {
    slug: "anatomy-segmentation",
    term: "Anatomy segmentation",
    definition:
      "The process of delineating anatomical structures or regions of interest in medical images — a prerequisite for 3D pre-operative planning and intra-operative guidance. Deep neural networks now approach radiologist-level accuracy on specific structures.",
    related: ["tool-tracking", "intra-operative"],
    category: "Computer Vision",
  },
  {
    slug: "go-no-go-zones",
    term: "Go/No-Go zones",
    definition:
      "Intra-operative safety boundaries computed by AI to flag anatomical regions where instrument entry carries elevated risk of injury to critical structures such as bile ducts, major vessels, or neural tissue.",
    related: ["anatomy-segmentation", "tool-tracking"],
    category: "Safety Systems",
  },
  {
    slug: "external-validation",
    term: "External validation",
    definition:
      "Testing a trained model on a dataset that is geographically and temporally independent of the training data. Considered the minimum standard for clinical AI credibility. Contrasted with internal cross-validation, which overestimates real-world performance.",
    related: ["irb-approval", "validation-cohort"],
    category: "Scientific Rigour",
  },
  {
    slug: "irb-approval",
    term: "IRB approval",
    definition:
      "Institutional Review Board approval — ethical clearance granted by an independent committee before any study involving human participants or patient data may begin. All AIST studies involving patient records are IRB-approved.",
    related: ["external-validation"],
    category: "Ethics & Governance",
  },
  {
    slug: "digital-twin",
    term: "Digital twin",
    definition:
      "A patient-specific computational model built from imaging, lab values, and clinical history that simulates physiological responses to surgical interventions. Enables pre-operative rehearsal and personalised outcome prediction.",
    related: ["anatomy-segmentation"],
    category: "Emerging Concepts",
  },
  {
    slug: "human-in-the-loop",
    term: "Human-in-the-loop annotation",
    definition:
      "A labelling workflow in which AI pre-annotates data and a human expert reviews, corrects, and approves each label before it enters the training set. Dramatically reduces annotation cost while maintaining quality for rare or ambiguous cases.",
    related: ["surgical-phase-recognition"],
    category: "Data & Methods",
  },
  {
    slug: "decision-support-system",
    term: "Decision support system",
    definition:
      "AI-generated recommendations presented to a clinician at a defined decision point — such as procedure selection or dosing — to augment (not replace) clinical judgement. The clinician retains full authority; the system provides evidence-based prompts.",
    related: ["mosi", "risk-stratification"],
    category: "Clinical AI",
  },
  {
    slug: "risk-stratification",
    term: "Risk stratification",
    definition:
      "Systematic classification of patients into risk tiers — low, moderate, high — based on clinical factors. In surgical AI, stratification informs procedure selection, resource allocation, and consent discussions. MOSI performs risk stratification for bariatric surgery candidates.",
    related: ["mosi", "decision-support-system"],
    category: "Clinical AI",
  },
  {
    slug: "mosi",
    term: "MOSI (Mayo Obesity Staging Index)",
    definition:
      "A novel obesity staging and surgical indication classification system developed at AIST. MOSI integrates BMI, comorbidity burden, and predicted weight-loss outcomes into a four-tier score that guides bariatric procedure selection. Validated on 3,097 patients.",
    related: ["risk-stratification", "twl", "bariatric-surgery"],
    category: "AIST Projects",
  },
  {
    slug: "iris-platform",
    term: "IRIS platform",
    definition:
      "Mayo Clinic's clinical AI infrastructure that provides data governance, model hosting, and patient-facing interfaces for AI tools developed within the institution. SIRIS (the AIST patient education system) runs on the IRIS platform.",
    related: ["siris"],
    category: "Infrastructure",
  },
  {
    slug: "twl",
    term: "Total Weight Loss (TWL)",
    definition:
      "Total Weight Loss percentage — a primary outcome metric in bariatric surgery research, representing weight lost as a fraction of total pre-operative body weight. Preferred over Excess Weight Loss (EWL) in contemporary literature due to its independence from ideal body weight assumptions.",
    related: ["mosi", "bariatric-surgery"],
    category: "Clinical Metrics",
  },
  {
    slug: "bariatric-surgery",
    term: "Bariatric surgery",
    definition:
      "Metabolic and weight-loss surgery — a family of procedures (sleeve gastrectomy, Roux-en-Y gastric bypass, adjustable gastric banding) that reduce stomach volume and alter gastrointestinal anatomy to achieve sustained weight loss and comorbidity resolution.",
    related: ["mosi", "twl", "risk-stratification"],
    category: "Clinical Domain",
  },
  {
    slug: "federated-learning",
    term: "Federated learning",
    definition:
      "A distributed machine learning paradigm in which model training occurs locally at each participating institution and only model parameters (not raw patient data) are aggregated centrally. Enables multi-site collaboration without sharing identifiable records — critical for privacy-preserving surgical AI research.",
    related: ["external-validation", "irb-approval"],
    category: "Data & Methods",
  },
];

export function getGlossaryByLetter(): Map<string, GlossaryEntry[]> {
  const map = new Map<string, GlossaryEntry[]>();
  for (const entry of glossary) {
    const letter = entry.term[0].toUpperCase();
    if (!map.has(letter)) map.set(letter, []);
    map.get(letter)!.push(entry);
  }
  return new Map([...map.entries()].sort());
}
