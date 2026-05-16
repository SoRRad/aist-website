"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { toAMA, toAPA, toBibTeX, toRIS } from "@/lib/publication-utils";
import type { Publication } from "@/lib/publications";

type CitationFormat = "AMA" | "APA" | "BibTeX" | "RIS";

interface CitationDropdownProps {
  publication: Publication;
  onClose: () => void;
}

export function CitationDropdown({ publication, onClose }: CitationDropdownProps) {
  const [activeFormat, setActiveFormat] = React.useState<CitationFormat>("AMA");
  const [copied, setCopied] = React.useState(false);

  const citations: Record<CitationFormat, string> = {
    AMA: toAMA(publication),
    APA: toAPA(publication),
    BibTeX: toBibTeX(publication),
    RIS: toRIS(publication),
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(citations[activeFormat]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API not available
    }
  };

  // Close on outside click
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="absolute left-0 top-full z-20 mt-1 w-[min(360px,calc(100vw-2rem))] rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] shadow-xl shadow-black/10 sm:w-full sm:min-w-[360px]">
      {/* Format tabs */}
      <div className="flex border-b border-[var(--color-border)]">
        {(["AMA", "APA", "BibTeX", "RIS"] as CitationFormat[]).map((fmt) => (
          <button
            key={fmt}
            onClick={() => setActiveFormat(fmt)}
            className={cn(
              "flex-1 px-3 py-2 font-mono text-[11px] font-semibold transition-colors",
              activeFormat === fmt
                ? "border-b-2 border-[var(--color-accent)] text-[var(--color-accent)]"
                : "text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]",
            )}
          >
            {fmt}
          </button>
        ))}
      </div>

      {/* Citation text */}
      <div className="p-3">
        <pre className="overflow-x-auto whitespace-pre-wrap break-words rounded-md bg-[var(--color-muted)] p-3 font-mono text-[11px] leading-relaxed text-[var(--color-foreground)]">
          {citations[activeFormat]}
        </pre>
      </div>

      {/* Copy button */}
      <div className="flex items-center justify-between border-t border-[var(--color-border)] px-3 py-2">
        <button
          onClick={onClose}
          className="text-xs text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
        >
          Close
        </button>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
        >
          {copied ? (
            <><Check className="h-3.5 w-3.5" /> Copied!</>
          ) : (
            <><Copy className="h-3.5 w-3.5" /> Copy {activeFormat}</>
          )}
        </button>
      </div>
    </div>
  );
}
