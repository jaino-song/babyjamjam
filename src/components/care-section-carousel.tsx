"use client";

import { useState, useRef, useEffect, useCallback } from "react";

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
        ".care-carousel__card",
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
    <section className="care-carousel">
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
            className={`care-carousel__toggle-btn${index === activeIndex ? " care-carousel__toggle-btn--active" : ""}`}
            onClick={() => handleTabSwitch(index)}
          >
            {s.tabLabel}
          </button>
        ))}
      </div>

      <div className="care-carousel__track-section">
        <div
          className="care-carousel__heading"
          style={{
            opacity: fanState === "entering" ? 0 : 1,
            transform: fanState === "entering" ? "translateY(8px)" : "translateY(0)",
          }}
        >
          <h2 className="h2-left">
            <span className="care-carousel__heading-muted">
              {section.mutedText}
            </span>
            <br />
            <span className="care-carousel__heading-primary">
              {section.primaryText}
            </span>
          </h2>
        </div>

        <div className="care-carousel__track" ref={trackRef}>
        {section.cards.map((card, i) => {
          const imageSrc =
            card.imageSrc ?? DEFAULT_CARE_CARD_IMAGE_BY_TONE[section.tone];
          const imageAlt = card.imageAlt ?? `${card.title} 서비스 이미지`;

          return (
            <div
              key={`${section.id}-${card.title}`}
              className={`care-carousel__card care-carousel__card--fan-${fanState}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="care-carousel__card-inner">
                <ImageBlock
                  variant="careCard"
                  src={imageSrc}
                  alt={imageAlt}
                  className="care-carousel__card-img"
                />
                <div
                  className={`care-carousel__card-gradient care-carousel__card-gradient--${section.tone}`}
                />
                <div className="care-carousel__card-overlay">
                  <span className="care-carousel__card-badge">{i + 1}</span>
                  <h3 className="h6 care-carousel__card-title">
                    {card.title}
                  </h3>
                  <p className="medium-p care-carousel__card-desc">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        </div>
      </div>

      <div className="care-carousel__dots">
        {section.cards.map((_, i) => (
          <div
            key={i}
            className={`care-carousel__dot${i === activeDot ? " care-carousel__dot--active" : ""}`}
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
      className={`care-section${mirrored ? " care-section--mirrored" : ""}`}
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
