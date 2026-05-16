import type { LucideIcon } from "lucide-react";
import {
  Home,
  Users,
  FlaskConical,
  FileText,
  Newspaper,
  Calendar,
  Library,
  UserPlus,
  Mail,
  Compass,
  Sparkles,
} from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
  /** Section id on the home page for smart anchor scrolling */
  sectionId?: string;
};

/**
 * Primary navigation shown in the header.
 * Research and Projects are merged under /research.
 */
export const primaryNav: NavItem[] = [
  { title: "Home", href: "/", icon: Home, sectionId: "top" },
  { title: "News", href: "/news", icon: Newspaper, sectionId: "news" },
  { title: "Research & Projects", href: "/research", icon: Compass, sectionId: "research" },
  { title: "Team", href: "/team", icon: Users, sectionId: "team" },
  { title: "Publications", href: "/publications", icon: FileText, sectionId: "publications" },
  { title: "Events", href: "/events", icon: Calendar, sectionId: "events" },
  { title: "Archive", href: "/archive", icon: Library, sectionId: "archive" },
  { title: "Join", href: "/join", icon: UserPlus, sectionId: "join" },
];

/**
 * Full navigation — used in command palette, mobile nav, footer.
 */
export const allNav: NavItem[] = [
  { title: "Home", href: "/", icon: Home },
  { title: "News", href: "/news", icon: Newspaper },
  { title: "Research & Projects", href: "/research", icon: Compass },
  { title: "Projects", href: "/projects", icon: FlaskConical },
  { title: "Team", href: "/team", icon: Users },
  { title: "Publications", href: "/publications", icon: FileText },
  { title: "Events", href: "/events", icon: Calendar },
  { title: "Archive", href: "/archive", icon: Library },
  { title: "Join Us", href: "/join", icon: UserPlus },
  { title: "About", href: "/about", icon: Sparkles },
  { title: "Now", href: "/now", icon: Sparkles },
  { title: "Resources", href: "/resources", icon: FlaskConical },
  { title: "Contact", href: "/contact", icon: Mail },
];

export const footerNav = {
  research: [
    { title: "Research & Projects", href: "/research" },
    { title: "Projects", href: "/projects" },
    { title: "Publications", href: "/publications" },
    { title: "Archive", href: "/archive" },
    { title: "Resources", href: "/resources" },
  ],
  lab: [
    { title: "About", href: "/about" },
    { title: "Team", href: "/team" },
    { title: "News", href: "/news" },
    { title: "Now", href: "/now" },
  ],
  connect: [
    { title: "Join Us", href: "/join" },
    { title: "Events", href: "/events" },
    { title: "Contact", href: "/contact" },
  ],
};
