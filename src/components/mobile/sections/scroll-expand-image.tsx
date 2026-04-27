"use client";

import { useEffect, useRef } from "react";

const START_INSET_MULTIPLIER = 2.2;
const START_RADIUS_PX = 24;

interface ScrollExpandImageProps {
  src: string;
  alt: string;
  overlayText?: string;
  ["data-component"]?: string;
}

export function MobileScrollExpandImage({
  src,
  alt,
  overlayText,
  "data-component": dataComponent,
}: ScrollExpandImageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sub = (s: string) =>
    dataComponent ? `${dataComponent}_${s}` : undefined;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const element = wrapperRef.current;
    if (!element) return;
    let frameId = 0;

    const update = () => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const contentLeft = element.parentElement?.getBoundingClientRect().left ?? 0;
      const sideInset = (contentLeft / window.innerWidth) * 100;
      const startInset = sideInset * START_INSET_MULTIPLIER;

      const startLine = viewportHeight * 1.16;
      const endLine = viewportHeight * 0.18;
      const progress = Math.max(
        0,
        Math.min(1, (startLine - rect.top) / (startLine - endLine)),
      );
      const eased = 1 - Math.pow(1 - progress, 2);

      element.style.clipPath = `inset(0% ${startInset * (1 - eased)}% round ${
        START_RADIUS_PX * (1 - eased)
      }px)`;
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
      className="relative h-[360px] w-screen overflow-hidden will-change-[clip-path]"
      style={{
        marginLeft: "calc(-50vw + 50%)",
        alignSelf: "flex-start",
        clipPath: "inset(0% 23.3213% round 24px)",
        transition: "clip-path 160ms ease-out",
      }}
      data-component={dataComponent}
    >
      <img
        src={src}
        alt={alt}
        className="block h-full w-full object-cover"
        data-component={sub("image")}
      />
      {overlayText ? (
        <span
          className="h2 absolute left-1/2 top-1/2 w-[calc(100%-48px)] -translate-x-1/2 -translate-y-1/2 whitespace-normal text-center text-bjj-bg [text-shadow:1px_4px_8px_rgba(0,0,0,0.25)]"
          data-component={sub("overlay-text")}
        >
          {overlayText}
        </span>
      ) : null}
    </div>
  );
}
