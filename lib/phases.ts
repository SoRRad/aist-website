export interface Phase {
  id: string;
  code: string;
  title: string;
  description: string;
  projects: string[];
}

export const phases: Phase[] = [
  {
    id: "pre-operative",
    code: "01",
    title: "Pre-operative",
    description:
      "AI-assisted planning before the patient enters the OR — anatomical segmentation, 3D reconstruction, risk stratification, and patient-specific surgical mapping.",
    projects: ["mosi"],
  },
  {
    id: "intra-operative",
    code: "02",
    title: "Intra-operative",
    description:
      "Real-time decision support during surgery — anatomy recognition, Go/No-Go zone delineation, phase recognition, and instrument tracking.",
    projects: [],
  },
  {
    id: "post-operative",
    code: "03",
    title: "Post-operative",
    description:
      "Outcome prediction, recovery monitoring, complication risk modeling, and patient-facing education tailored to the individual surgical record.",
    projects: ["mosi", "siris"],
  },
  {
    id: "validation",
    code: "04",
    title: "Validation",
    description:
      "Rigorous external testing across independent cohorts before clinical deployment — the standard that separates research prototypes from trusted tools.",
    projects: ["mosi"],
  },
];
