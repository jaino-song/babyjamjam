"use client";
import { useEffect, useRef } from "react";

const START_INSET_MULTIPLIER = 2.2;
const START_RADIUS_PX = 24;

interface ScrollExpandImageProps {
  src: string;
  alt: string;
  overlayText?: string;
}

export function ScrollExpandImage({ src, alt, overlayText }: ScrollExpandImageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const el = wrapperRef.current;
    if (!el) return;
    let frameId = 0;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const contentLeft = el.parentElement?.getBoundingClientRect().left ?? 0;
      const sideInset = (contentLeft / window.innerWidth) * 100;
      const startInset = sideInset * START_INSET_MULTIPLIER;

      const startLine = vh * 1.16;
      const endLine = vh * 0.18;
      const progress = Math.max(0, Math.min(1, (startLine - rect.top) / (startLine - endLine)));
      const eased = 1 - Math.pow(1 - progress, 2);

      el.style.clipPath = `inset(0% ${startInset * (1 - eased)}% round ${START_RADIUS_PX * (1 - eased)}px)`;
    };

    const requestUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        update();
      });
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    update();
    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative w-screen h-[360px] mobile:h-[752px] overflow-hidden will-change-[clip-path]"
      style={{
        marginLeft: "calc(-50vw + 50%)",
        alignSelf: "flex-start",
        clipPath: "inset(0% 23.3213% round 24px)",
        transition: "clip-path 160ms ease-out",
      }}
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
