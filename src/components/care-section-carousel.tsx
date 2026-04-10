"use client";

import { useState, useRef, useEffect, useCallback } from "react";

import { cn } from "@/lib/utils";
import { ImageBlock } from "@/components/ui/image-block";

export type CareCardData = {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  label?: string;
  focus?: string;
  highlights?: string[];
};

export type CareSectionData = {
  id: string;
  tone: "maternal" | "newborn";
  tabLabel: string;
  mutedText: string;
  primaryText: string;
  cards: CareCardData[];
};

const DEFAULT_CARE_CARD_IMAGE_BY_TONE = {
  maternal: "/images/hero-image-1a35f6.png",
  newborn: "/images/hero-bg-22ebe1.png",
} as const;

export function CareSectionCarousel({
  sections,
  initialActiveIndex = 0,
}: {
  sections: CareSectionData[];
  initialActiveIndex?: number;
  mirrored?: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const [fanState, setFanState] = useState<"entered" | "entering">("entered");
  const [displayIndex, setDisplayIndex] = useState(initialActiveIndex);
  const [activeDot, setActiveDot] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const section = sections[displayIndex];

  const handleTabSwitch = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      setActiveIndex(index);

      // 1. Collapse
      setFanState("entering");

      // 2. After collapse, swap content and fan out
      setTimeout(() => {
        setDisplayIndex(index);
        // Small delay to let React re-render with new content before fan-out
        requestAnimationFrame(() => {
          setFanState("entered");
        });
        // Reset scroll
        trackRef.current?.scrollTo({ left: 0, behavior: "smooth" });
        setActiveDot(0);
      }, 350);
    },
    [activeIndex],
  );

  // Scroll tracking for dots
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      const cards = track.querySelectorAll<HTMLElement>(
        "[data-care-card]",
      );
      if (cards.length === 0) return;
      const cardWidth = cards[0].offsetWidth;
      const gap = 20;
      const idx = Math.round(track.scrollLeft / (cardWidth + gap));
      setActiveDot(Math.min(idx, cards.length - 1));
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="flex flex-col items-center gap-7 w-full max-mobile:gap-5">
      <div
        className="care-carousel__toggle"
        role="tablist"
        aria-label="케어 섹션"
        style={
          {
            "--care-tab-index": activeIndex,
            "--care-tab-count": sections.length,
          } as React.CSSProperties
        }
      >
        {sections.map((s, index) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            className={cn(
              "relative z-[1] inline-flex items-center justify-center min-w-0 h-10 border-none bg-transparent rounded-full px-5 max-mobile:px-4 font-heading font-extrabold text-[13px] leading-none tracking-[-0.025em] text-bjj-text-paragraph cursor-pointer transition-[color,transform] duration-[250ms] whitespace-nowrap",
              index === activeIndex && "text-bjj-primary-light",
            )}
            onClick={() => handleTabSwitch(index)}
          >
            {s.tabLabel}
          </button>
        ))}
      </div>

      <div className="w-screen overflow-hidden flex flex-col items-center gap-7 pt-7">
        <div
          className="text-center p-0 m-0 transition-[opacity,transform] duration-300"
          style={{
            opacity: fanState === "entering" ? 0 : 1,
            transform: fanState === "entering" ? "translateY(8px)" : "translateY(0)",
          }}
        >
          <h2 className="h2-left">
            <span className="text-bjj-text-muted">
              {section.mutedText}
            </span>
            <br />
            <span className="text-bjj-primary">
              {section.primaryText}
            </span>
          </h2>
        </div>

        <div
          className="flex gap-5 max-mobile:gap-3.5 overflow-x-auto snap-x snap-mandatory scroll-smooth py-20 max-mobile:py-2 max-mobile:pb-4 px-[20vw] max-mobile:px-5 scrollbar-none w-full [&::-webkit-scrollbar]:hidden"
          ref={trackRef}
        >
        {section.cards.map((card, i) => {
          const imageSrc =
            card.imageSrc ?? DEFAULT_CARE_CARD_IMAGE_BY_TONE[section.tone];
          const imageAlt = card.imageAlt ?? `${card.title} 서비스 이미지`;

          return (
            <div
              key={`${section.id}-${card.title}`}
              data-care-card
              className={cn(
                "shrink-0 w-[360px] max-tablet:w-[260px] max-mobile:w-[260px] h-[440px] max-tablet:h-[340px] max-mobile:h-80 rounded-3xl overflow-hidden relative cursor-pointer shadow-[0_16px_48px_rgba(0,0,0,0.12)] snap-start max-tablet:snap-center max-mobile:snap-center",
                "transition-[transform,opacity,box-shadow] duration-[0.65s,0.5s,0.3s] ease-[cubic-bezier(0.34,1.56,0.64,1),ease,ease]",
                "hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_24px_64px_rgba(0,0,0,0.2)]",
                fanState === "entering"
                  ? section.tone === "newborn"
                    ? "opacity-0 -translate-x-10 -rotate-6 scale-90"
                    : "opacity-0 translate-x-10 rotate-6 scale-90"
                  : "opacity-100 translate-x-0 rotate-0 scale-100",
              )}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="w-full h-full relative flex flex-col justify-end">
                <ImageBlock
                  variant="careCard"
                  src={imageSrc}
                  alt={imageAlt}
                  className="absolute inset-0 rounded-3xl w-full h-full object-cover"
                />
                <div
                  className={cn(
                    "absolute inset-0 rounded-3xl",
                    section.tone === "maternal"
                      ? "bg-gradient-to-b from-transparent from-25% to-[rgba(139,90,43,0.85)]"
                      : "bg-gradient-to-b from-transparent from-25% to-[rgba(0,36,87,0.85)]",
                  )}
                />
                <div className="relative z-[1] p-6 text-white">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-bjj-accent text-white font-heading text-[13px] font-extrabold mb-2.5">
                    {i + 1}
                  </span>
                  <h3 className="h6 text-white">
                    {card.title}
                  </h3>
                  <p className="medium-p text-white/90 !text-[13px] leading-[1.55]">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        </div>
      </div>

      <div className="hidden max-mobile:flex justify-center gap-1.5 py-2">
        {section.cards.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === activeDot
                ? "bg-bjj-primary w-[18px] rounded-[3px]"
                : "bg-bjj-divider w-1.5",
            )}
          />
        ))}
      </div>
    </section>
  );
}

export function CareSection({
  section,
  mirrored = false,
}: {
  section: CareSectionData;
  mirrored?: boolean;
}) {
  return (
    <div
      className={cn("care-section", mirrored && "care-section--mirrored")}
      style={{ padding: 0, width: "min-content" }}
    >
      <h2 className="h3-left care-section__title" style={{ whiteSpace: "nowrap" }}>
        <span className="care-section__title-muted">{section.mutedText}</span>
        <br />
        <span className="care-section__title-primary">
          {section.primaryText}
        </span>
      </h2>
      <div className="care-overlay-stack">
        {section.cards.map((card, i) => (
          <article
            key={card.title}
            className={`care-overlay-card care-overlay-card--${section.tone}`}
          >
            <div className="care-overlay-card__overlay">
              <span className="care-overlay-card__badge">{i + 1}</span>
              <div className="care-overlay-card__text">
                <h3 className="h6 care-overlay-card__title">{card.title}</h3>
                <p className="medium-p care-overlay-card__desc">
                  {card.description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
