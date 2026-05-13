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
};

/**
 * Primary navigation shown in the header.
 * Keep this list short — five to seven items max for clean scanning.
 */
export const primaryNav: NavItem[] = [
  { title: "Research", href: "/research", icon: Compass },
  { title: "Projects", href: "/projects", icon: FlaskConical },
  { title: "Team", href: "/team", icon: Users },
  { title: "Publications", href: "/publications", icon: FileText },
  { title: "News", href: "/news", icon: Newspaper },
  { title: "Join", href: "/join", icon: UserPlus },
];

/**
 * Full navigation — used in the command palette and footer.
 */
export const allNav: NavItem[] = [
  { title: "Home", href: "/", icon: Home },
  { title: "About", href: "/about", icon: Sparkles },
  { title: "Research", href: "/research", icon: Compass },
  { title: "Projects", href: "/projects", icon: FlaskConical },
  { title: "Team", href: "/team", icon: Users },
  { title: "Publications", href: "/publications", icon: FileText },
  { title: "News", href: "/news", icon: Newspaper },
  { title: "Events", href: "/events", icon: Calendar },
  { title: "Resources", href: "/resources", icon: Library },
  { title: "Now", href: "/now", icon: Sparkles },
  { title: "Join Us", href: "/join", icon: UserPlus },
  { title: "Contact", href: "/contact", icon: Mail },
];

/**
 * Footer link groups.
 */
export const footerNav = {
  research: [
    { title: "Research focus", href: "/research" },
    { title: "Projects", href: "/projects" },
    { title: "Publications", href: "/publications" },
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
    { title: "RSS", href: "/rss.xml" },
  ],
};
