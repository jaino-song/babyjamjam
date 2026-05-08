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
  "data-component": dataComponent,
}: {
  sections: CareSectionData[];
  initialActiveIndex?: number;
  ["data-component"]?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const [fanState, setFanState] = useState<"entered" | "entering">("entered");
  const [displayIndex, setDisplayIndex] = useState(initialActiveIndex);
  const [activeDot, setActiveDot] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const section = sections[displayIndex];
  const sectionBase = dataComponent
    ? `${dataComponent}_section-${section.id}`
    : undefined;

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

  const sub = (suffix: string) =>
    dataComponent ? `${dataComponent}_${suffix}` : undefined;

  return (
    <section className="care-carousel" data-component={dataComponent}>
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
        data-component={sub("toggle")}
      >
        {sections.map((s, index) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            className={`care-carousel__toggle-btn${index === activeIndex ? " care-carousel__toggle-btn--active" : ""}`}
            onClick={() => handleTabSwitch(index)}
            data-component={sub(`toggle-btn-${s.id}`)}
          >
            {s.tabLabel}
          </button>
        ))}
      </div>

      <div
        className="care-carousel__track-section"
        data-component={sectionBase ? `${sectionBase}_track-section` : undefined}
      >
        <div
          className="care-carousel__heading"
          style={{
            opacity: fanState === "entering" ? 0 : 1,
            transform:
              fanState === "entering" ? "translateY(8px)" : "translateY(0)",
          }}
          data-component={sectionBase ? `${sectionBase}_heading` : undefined}
        >
          <h2
            className="h2-left"
            data-component={sectionBase ? `${sectionBase}_title` : undefined}
          >
            <span
              className="h3 care-carousel__heading-muted"
              data-component={
                sectionBase ? `${sectionBase}_title-muted` : undefined
              }
            >
              {section.mutedText}
            </span>
            <br
              data-component={sectionBase ? `${sectionBase}_title-break` : undefined}
            />
            <span
              className="care-carousel__heading-primary"
              data-component={
                sectionBase ? `${sectionBase}_title-primary` : undefined
              }
            >
              {section.primaryText}
            </span>
          </h2>
        </div>

        <div
          className="care-carousel__track-wrap"
          data-component={sectionBase ? `${sectionBase}_track-wrap` : undefined}
        >
          <div
            className="care-carousel__track"
            ref={trackRef}
            data-component={sectionBase ? `${sectionBase}_track` : undefined}
          >
            {section.cards.map((card, i) => {
              const imageSrc =
                card.imageSrc ?? DEFAULT_CARE_CARD_IMAGE_BY_TONE[section.tone];
              const imageAlt = card.imageAlt ?? `${card.title} 서비스 이미지`;
              const cardBase = sectionBase
                ? `${sectionBase}_card-${i + 1}`
                : undefined;

              return (
                <div
                  key={`${section.id}-${card.title}`}
                  className={`care-carousel__card care-carousel__card--fan-${fanState} care-carousel__card--${section.tone}`}
                  style={{ transitionDelay: `${i * 0.1}s` }}
                  data-component={cardBase}
                >
                  <div
                    className="care-carousel__card-inner"
                    data-component={cardBase ? `${cardBase}_inner` : undefined}
                  >
                    <ImageBlock
                      variant="careCard"
                      src={imageSrc}
                      alt={imageAlt}
                      className="care-carousel__card-img"
                      data-component={cardBase ? `${cardBase}_image` : undefined}
                    />
                  </div>
                  <div
                    className="care-carousel__caption"
                    data-component={cardBase ? `${cardBase}_caption` : undefined}
                  >
                    <h6
                      className="h6 care-carousel__caption-title"
                      data-component={cardBase ? `${cardBase}_title` : undefined}
                    >
                      {card.title}
                    </h6>
                    <p
                      className="big-p care-carousel__caption-desc"
                      data-component={
                        cardBase ? `${cardBase}_description` : undefined
                      }
                    >
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
            data-component={sectionBase ? `${sectionBase}_paddlenav` : undefined}
          />
        </div>
      </div>

      <div
        className="care-carousel__dots"
        data-component={sub("dots")}
      >
        {section.cards.map((_, i) => (
          <div
            key={i}
            className={`care-carousel__dot${i === activeDot ? " care-carousel__dot--active" : ""}`}
            data-component={sectionBase ? `${sectionBase}_dot-${i + 1}` : undefined}
          />
        ))}
      </div>
    </section>
  );
}
