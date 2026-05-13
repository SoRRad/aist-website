"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MemberAvatarProps {
  photo: string;
  name: string;
  initials: string;
  size?: "md" | "lg";
}

/**
 * Avatar with photo-over-initials fallback (client-only due to useState).
 * Defaults to showing initials; fades in the photo on successful load.
 */
export function MemberAvatar({ photo, name, initials, size = "md" }: MemberAvatarProps) {
  const [imgLoaded, setImgLoaded] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);
  const showPhoto = imgLoaded && !imgError;

  const sizeClass = size === "lg" ? "h-40 w-40 rounded-2xl" : "h-32 w-32 rounded-2xl";
  const initialsSize = size === "lg" ? "text-4xl" : "text-3xl";

  return (
    <div className={cn("relative shrink-0 overflow-hidden", sizeClass)}>
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--color-navy-800)] to-[var(--color-navy-600)] transition-opacity duration-300",
          sizeClass,
          showPhoto ? "opacity-0" : "opacity-100",
        )}
        aria-hidden={showPhoto}
      >
        <span className={cn("font-display font-semibold text-[var(--color-ink-100)]", initialsSize)}>
          {initials}
        </span>
      </div>
      <Image
        src={photo}
        alt={name}
        fill
        sizes={size === "lg" ? "160px" : "128px"}
        className={cn(
          "object-cover transition-opacity duration-300",
          sizeClass,
          showPhoto ? "opacity-100" : "opacity-0",
        )}
        onLoad={() => setImgLoaded(true)}
        onError={() => setImgError(true)}
      />
    </div>
  );
}
