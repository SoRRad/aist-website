/**
 * Lab statistics displayed in the "By the numbers" section.
 * Edit this file to update the figures — they feed directly into the
 * ScrambleCounter component on the home page.
 */

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
  sublabel?: string;
}

export const stats: Stat[] = [
  { value: 7, label: "Team members", sublabel: "Across research and engineering" },
  { value: 2, label: "Active projects", sublabel: "MOSI and SIRIS" },
  { value: 3, label: "Publications", sublabel: "Peer-reviewed journals" },
];
