"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch — only render the active icon after mount
  React.useEffect(() => setMounted(true), []);

  const current = mounted ? resolvedTheme ?? theme : "light";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={current === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(current === "dark" ? "light" : "dark")}
      className="text-[var(--color-foreground)]"
    >
      <Sun
        className={`h-5 w-5 transition-all ${current === "dark" ? "scale-0 -rotate-90" : "scale-100 rotate-0"}`}
      />
      <Moon
        className={`absolute h-5 w-5 transition-all ${current === "dark" ? "scale-100 rotate-0" : "scale-0 rotate-90"}`}
      />
    </Button>
  );
}
