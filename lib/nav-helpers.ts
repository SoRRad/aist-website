"use client";

import { usePathname } from "next/navigation";
import { useCallback } from "react";

/**
 * Returns a click handler that:
 * - On the home page (/): smooth-scrolls to the element matching sectionId
 * - On any other route: lets the default link navigation proceed to fullHref
 *
 * Usage:
 *   const handler = useSmartNav("/research", "research");
 *   <a href="/research" onClick={handler}>Research</a>
 */
export function useSmartNav(sectionId: string) {
  const pathname = usePathname();

  return useCallback(
    (e: React.MouseEvent) => {
      if (pathname === "/") {
        e.preventDefault();
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          history.replaceState(null, "", `#${sectionId}`);
        }
      }
      // else: let the browser handle normal link navigation
    },
    [pathname, sectionId],
  );
}
