"use client";
import { useEffect, useRef } from "react";

interface ScrollExpandImageProps {
  src: string;
  alt: string;
  overlayText?: string;
}

export function ScrollExpandImage({ src, alt, overlayText }: ScrollExpandImageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(hover: none)").matches
    ) {
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
      className="relative w-screen h-[360px] mobile:h-[752px] overflow-hidden will-change-[clip-path]"
      style={{ marginLeft: "calc(-50vw + 50%)", alignSelf: "flex-start" }}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover block" />
      {overlayText && (
        <span className="h2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-bjj-bg [text-shadow:1px_4px_8px_rgba(0,0,0,0.25)] whitespace-normal w-[calc(100%-48px)] mobile:whitespace-nowrap mobile:w-auto">
          {overlayText}
        </span>
      )}
    </div>
  );
}
