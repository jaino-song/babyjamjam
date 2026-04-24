"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface GalleryPaddlenavProps {
  className?: string;
  previousLabel: string;
  nextLabel: string;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export function GalleryPaddlenav({
  className,
  previousLabel,
  nextLabel,
  previousDisabled = false,
  nextDisabled = false,
  onPrevious,
  onNext,
}: GalleryPaddlenavProps) {
  return (
    <div className={cn("gallery-paddlenav", className)} aria-hidden="false">
      <button
        type="button"
        className="gallery-paddlenav__paddle gallery-paddlenav__paddle-left"
        onClick={onPrevious}
        disabled={previousDisabled}
        aria-label={previousLabel}
      >
        <ChevronLeft size={18} strokeWidth={2.5} aria-hidden="true" />
      </button>
      <button
        type="button"
        className="gallery-paddlenav__paddle gallery-paddlenav__paddle-right"
        onClick={onNext}
        disabled={nextDisabled}
        aria-label={nextLabel}
      >
        <ChevronRight size={18} strokeWidth={2.5} aria-hidden="true" />
      </button>
    </div>
  );
}
