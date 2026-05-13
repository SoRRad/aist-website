"use client";

import * as React from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { allNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";

/**
 * Site-wide command palette.
 *
 * Opens with Cmd+K (or Ctrl+K). Initial corpus is the site nav.
 * In later steps, we extend this to include team members, publications,
 * projects, and news items via a build-time generated index.
 */
export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Search the site"
        className={cn(
          "group hidden h-9 items-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-muted)] px-3 text-xs text-[var(--color-muted-foreground)] transition-colors hover:bg-[var(--color-muted)]/80 sm:inline-flex",
        )}
      >
        <Search className="h-3.5 w-3.5" />
        <span className="font-sans">Search</span>
        <kbd className="ml-2 inline-flex items-center gap-0.5 rounded border border-[var(--color-border)] bg-[var(--color-background)] px-1.5 py-0.5 font-mono text-[10px] font-medium">
          <span className="text-base leading-none">⌘</span>K
        </kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-xl gap-0 overflow-hidden p-0"
          hideClose
        >
          <VisuallyHidden asChild>
            <DialogTitle>Site search</DialogTitle>
          </VisuallyHidden>
          <Command
            label="Site search"
            className="[&_[cmdk-input]]:h-12 [&_[cmdk-input]]:w-full [&_[cmdk-input]]:border-b [&_[cmdk-input]]:border-[var(--color-border)] [&_[cmdk-input]]:bg-transparent [&_[cmdk-input]]:px-4 [&_[cmdk-input]]:text-sm [&_[cmdk-input]]:outline-none [&_[cmdk-input]]:placeholder:text-[var(--color-muted-foreground)]"
          >
            <Command.Input placeholder="Search pages, projects, people…" />
            <Command.List className="max-h-80 overflow-y-auto p-2">
              <Command.Empty className="p-6 text-center text-sm text-[var(--color-muted-foreground)]">
                No results found.
              </Command.Empty>

              <Command.Group
                heading="Pages"
                className="px-2 pb-2 text-xs uppercase tracking-wider text-[var(--color-muted-foreground)] [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5"
              >
                {allNav.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Command.Item
                      key={item.href}
                      value={`${item.title} ${item.href}`}
                      onSelect={() => go(item.href)}
                      className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-[var(--color-foreground)] aria-selected:bg-[var(--color-muted)]"
                    >
                      {Icon && <Icon className="h-4 w-4 text-[var(--color-muted-foreground)]" />}
                      <span>{item.title}</span>
                      <ArrowRight className="ml-auto h-3.5 w-3.5 opacity-0 group-aria-selected:opacity-100" />
                    </Command.Item>
                  );
                })}
              </Command.Group>
            </Command.List>
            <div className="flex items-center justify-between border-t border-[var(--color-border)] px-3 py-2 text-[10px] text-[var(--color-muted-foreground)]">
              <span>
                <kbd className="font-mono">↑↓</kbd> to navigate
                <span className="mx-2">·</span>
                <kbd className="font-mono">↵</kbd> to open
                <span className="mx-2">·</span>
                <kbd className="font-mono">esc</kbd> to close
              </span>
              <span className="font-mono">AIST</span>
            </div>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
