import { projects } from "@/lib/projects";
import { publications } from "@/lib/publications";
import { activeTeamMembers } from "@/lib/team";

/**
 * Lab statistics displayed in the "By the numbers" section.
 * Values are computed from source data so the home page updates with content.
 */

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
  sublabel?: string;
}

const activeProjects = projects;
export const stats: Stat[] = [
  {
    value: activeTeamMembers.length,
    label: "Team members",
    sublabel: "Current AIST people and collaborators",
  },
  {
    value: activeProjects.length,
    label: "Active projects",
    sublabel: activeProjects.map((project) => project.name).join(" and "),
  },
  {
    value: publications.length,
    label: "Publications",
    sublabel: "Research outputs in the publication index",
  },
];
