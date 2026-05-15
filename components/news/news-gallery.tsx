"use client";

import { NewsImage } from "./news-image";
import type { NewsItem } from "@/lib/news";

interface NewsGalleryProps {
  item: NewsItem;
}

export function NewsGallery({ item }: NewsGalleryProps) {
  const galleryImages = item.images && item.images.length > 1 ? item.images : [];

  if (galleryImages.length === 0) return null;

  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      {galleryImages.map((image) => (
        <figure
          key={image.src}
          className="overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-card)]"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <NewsImage
              src={image.src}
              alt={image.alt}
              category={item.category}
              date={item.date}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          {image.caption && (
            <figcaption className="border-t border-[var(--color-border)] px-3 py-2 text-xs leading-relaxed text-[var(--color-muted-foreground)]">
              {image.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
