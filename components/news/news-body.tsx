import * as React from "react";

/** Parses inline markdown: [text](url) links and **bold** within a single paragraph. */
function parseInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/);
  return parts.map((part, i) => {
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, url] = linkMatch;
      if (/^https?:\/\//.test(url)) {
        return (
          <a
            key={i}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-accent)] underline underline-offset-2 decoration-[var(--color-accent)]/40 transition-[text-decoration-color] hover:decoration-[var(--color-accent)]"
          >
            {label}
          </a>
        );
      }
      return part;
    }
    const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
    if (boldMatch) {
      return <strong key={i}>{boldMatch[1]}</strong>;
    }
    return part;
  });
}

interface NewsBodyProps {
  body: string;
}

export function NewsBody({ body }: NewsBodyProps) {
  const paragraphs = body.split("\n\n").filter(Boolean);
  return (
    <div className="space-y-5">
      {paragraphs.map((para, i) => (
        <p key={i} className="text-pretty text-base leading-relaxed text-[var(--color-muted-foreground)] sm:text-lg">
          {parseInline(para.trim())}
        </p>
      ))}
    </div>
  );
}
