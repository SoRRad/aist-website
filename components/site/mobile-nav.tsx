"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { allNav } from "@/lib/navigation";
import { Logo } from "@/components/site/logo";
import { ThemeToggle } from "@/components/theme-toggle";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          aria-label="Open menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-[var(--color-foreground)] hover:bg-[var(--color-muted)] md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </DialogTrigger>
      <DialogContent
        className="left-0 top-0 h-full max-w-xs translate-x-0 translate-y-0 rounded-none rounded-r-lg p-0"
        hideClose
      >
        <VisuallyHidden asChild>
          <DialogTitle>Navigation</DialogTitle>
        </VisuallyHidden>
        <div className="flex items-center justify-between border-b border-[var(--color-border)] p-4">
          <Logo variant="wordmark" />
          <ThemeToggle />
        </div>
        <nav className="flex flex-col gap-1 p-4">
          {allNav.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-muted)]"
              >
                {Icon && (
                  <Icon className="h-4 w-4 text-[var(--color-muted-foreground)]" />
                )}
                {item.title}
              </Link>
            );
          })}
        </nav>
      </DialogContent>
    </Dialog>
  );
}
