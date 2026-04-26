"use client";

import { useState, useRef, useEffect, useCallback } from "react";

import { ImageBlock } from "@/components/ui/image-block";
import { GalleryPaddlenav } from "@/components/ui/gallery-paddlenav";

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

export function DesktopCareSectionCarousel({
  sections,
  initialActiveIndex = 0,
}: {
  sections: CareSectionData[];
  initialActiveIndex?: number;
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

      setFanState("entering");

      setTimeout(() => {
        setDisplayIndex(index);
        requestAnimationFrame(() => {
          setFanState("entered");
        });
        trackRef.current?.scrollTo({ left: 0, behavior: "smooth" });
        setActiveDot(0);
      }, 350);
    },
    [activeIndex],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      const cards = track.querySelectorAll<HTMLElement>(".care-carousel__card");
      if (cards.length === 0) return;
      const cardWidth = cards[0].offsetWidth;
      const gap = 20;
      const idx = Math.round(track.scrollLeft / (cardWidth + gap));
      setActiveDot(Math.min(idx, cards.length - 1));
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollCard = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(
      track.querySelectorAll<HTMLElement>(".care-carousel__card"),
    );
    if (!cards.length) return;

    const nextIndex = Math.max(
      0,
      Math.min(cards.length - 1, activeDot + direction),
    );

    cards[nextIndex]?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
    setActiveDot(nextIndex);
  };

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
            transform:
              fanState === "entering" ? "translateY(8px)" : "translateY(0)",
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

        <div className="care-carousel__track-wrap">
          <div className="care-carousel__track" ref={trackRef}>
            {section.cards.map((card, i) => {
              const imageSrc =
                card.imageSrc ?? DEFAULT_CARE_CARD_IMAGE_BY_TONE[section.tone];
              const imageAlt = card.imageAlt ?? `${card.title} 서비스 이미지`;

              return (
                <div
                  key={`${section.id}-${card.title}`}
                  className={`care-carousel__card care-carousel__card--fan-${fanState} care-carousel__card--${section.tone}`}
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div className="care-carousel__card-inner">
                    <ImageBlock
                      variant="careCard"
                      src={imageSrc}
                      alt={imageAlt}
                      className="care-carousel__card-img"
                    />
                  </div>
                  <div className="care-carousel__caption">
                    <h3 className="h6 care-carousel__caption-title">
                      {card.title}
                    </h3>
                    <p className="medium-p care-carousel__caption-desc">
                      {card.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <GalleryPaddlenav
            className="care-carousel__paddlenav"
            previousLabel="이전 케어 서비스"
            nextLabel="다음 케어 서비스"
            previousDisabled={activeDot === 0}
            nextDisabled={activeDot === section.cards.length - 1}
            onPrevious={() => scrollCard(-1)}
            onNext={() => scrollCard(1)}
          />
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
