export type EventType = "journal-club" | "seminar" | "conference" | "workshop" | "talk";
export type EventFormat = "in-person" | "virtual" | "hybrid";
export type EventStatus = "upcoming" | "past" | "tbd";

export type LabEvent = {
  slug: string;
  title: string;
  series?: string;
  type: EventType;
  format: EventFormat;
  date: string;
  endDate?: string;
  time?: string;
  location?: string;
  description: string;
  status: EventStatus;
  rsvpRequired: boolean;
  rsvpEmail?: string;
  recurring?: boolean;
  recurrencePattern?: string;
  people?: string[];
  projects?: string[];
  externalUrl?: string;
  featured?: boolean;
};

export const events: LabEvent[] = [
  {
    slug: "aist-journal-club-may-2026",
    title: "A-STAR Lab Journal Club",
    series: "A-STAR Lab Journal Club",
    type: "journal-club",
    format: "hybrid",
    date: "2026-05-27",
    time: "TBD",
    location: "Mayo Clinic, Rochester, MN — and virtual",
    description:
      "During this session, participants will discuss recent advances in artificial intelligence in surgery and brainstorm new ideas for future research and innovation. This event is limited to Mayo Clinic employees.",
    status: "upcoming",
    rsvpRequired: true,
    rsvpEmail: "alomar.abdulrahman@mayo.edu",
    recurring: true,
    recurrencePattern: "Recurring · Next session: May 27, 2026",
    featured: true,
  },
  {
    slug: "ai-research-summit-2026",
    title: "A-STAR Lab Abstract Accepted for the 2026 AI Research Summit",
    series: "AI Research Summit",
    type: "conference",
    format: "in-person",
    date: "2026-06-04",
    endDate: "2026-06-05",
    time: "All day",
    location: "Mayo Civic Center, Rochester, MN",
    description:
      "An abstract presentation by Dr. Reza Shahriarirad, titled 'Biological Age Reversal Following Bariatric Surgery: A Longitudinal Cohort Study Using AI-Derived ECG Age,' has been accepted for poster presentation at the 2026 AI Research Summit. This work highlights the A-STAR Lab's continued efforts to apply AI to clinically meaningful questions in bariatric surgery, including the use of AI-derived biomarkers to better understand physiologic changes following surgical weight loss.",
    status: "upcoming",
    rsvpRequired: false,
    recurring: false,
    people: ["reza-shahriarirad"],
    projects: [],
    featured: true,
  },
];

export const upcomingEvents = events
  .filter((e) => e.status === "upcoming")
  .sort((a, b) => a.date.localeCompare(b.date));

export const pastEvents = events
  .filter((e) => e.status === "past")
  .sort((a, b) => b.date.localeCompare(a.date));
