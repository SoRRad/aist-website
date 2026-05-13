"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";

/**
 * Application-wide providers.
 *
 * Currently only the theme provider; this file exists as the single place
 * to add new app-wide providers later (analytics, query client, modals,
 * tooltip provider, etc.) without touching the root layout.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      {children}
    </ThemeProvider>
  );
}
