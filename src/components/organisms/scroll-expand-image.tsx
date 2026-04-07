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
      className="hero-image-expand"
      style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)", alignSelf: "flex-start" }}
    >
      <img src={src} alt={alt} />
      {overlayText && <span className="h2 hero-image__text">{overlayText}</span>}
    </div>
  );
}
