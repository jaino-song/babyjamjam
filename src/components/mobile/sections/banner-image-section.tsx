"use client";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface BannerImageSectionProps {
  className?: string;
}

export function MobileBannerImageSection({ className }: BannerImageSectionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const el = wrapperRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const h = el.offsetHeight;
      const contentLeft = el.parentElement?.getBoundingClientRect().left ?? 0;
      const sideInset = (contentLeft / window.innerWidth) * 100;

      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh / 2 + h / 2)));
      const eased = 1 - Math.pow(1 - progress, 2);

      el.style.clipPath = `inset(0% ${sideInset * (1 - eased)}% round ${20 * (1 - eased)}px)`;
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={cn("relative w-screen h-[360px] overflow-hidden will-change-[clip-path] flex items-center justify-center", className)}
      style={{ marginLeft: "calc(-50vw + 50%)", alignSelf: "flex-start" }}
      data-component="organism-banner-image-section"
    >
      <img
        src="/images/hero-image-1a35f6.png"
        alt="아가잼잼 배너"
        className="absolute! inset-0 w-full h-full object-cover"
        data-component="organism-banner-image-section-image"
      />
      <span
        className="h3 relative! z-[1] text-bjj-bg [text-shadow:1px_4px_8px_rgba(0,0,0,0.25)] text-center whitespace-normal w-[calc(100%-48px)]"
        style={{ transform: "none" }}
        data-component="organism-banner-image-section-text"
      >
        검증 됐으니까. 믿을 수 있으니까.
      </span>
    </div>
  );
}
