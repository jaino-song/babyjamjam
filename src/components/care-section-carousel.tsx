"use client";

import { useState } from "react";

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

function CareSectionHeading({
  mutedText,
  primaryText,
}: {
  mutedText: string;
  primaryText: string;
}) {
  return (
    <h2 className="h3-left care-section__title">
      <span className="care-section__title-muted">{mutedText}</span>
      <br />
      <span className="care-section__title-primary">{primaryText}</span>
    </h2>
  );
}

function CareCardOverlay({
  card,
  index,
  tone,
}: {
  card: CareCardData;
  index: number;
  tone: "maternal" | "newborn";
}) {
  const imageSrc = card.imageSrc ?? DEFAULT_CARE_CARD_IMAGE_BY_TONE[tone];
  const imageAlt = card.imageAlt ?? `${card.title} 서비스 이미지`;

  return (
    <article className={`care-overlay-card care-overlay-card--${tone}`}>
      <ImageBlock
        variant="careCard"
        src={imageSrc}
        alt={imageAlt}
        className="care-overlay-card__image"
      />
      <div className="care-overlay-card__overlay">
        <span className="care-overlay-card__badge">{index + 1}</span>
        <div className="care-overlay-card__text">
          <h3 className="h6 care-overlay-card__title">{card.title}</h3>
          <p className="medium-p care-overlay-card__desc">{card.description}</p>
        </div>
      </div>
    </article>
  );
}

export function CareSectionCarousel({
  sections,
  initialActiveIndex = 0,
  mirrored = false,
}: {
  sections: CareSectionData[];
  initialActiveIndex?: number;
  mirrored?: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  return (
    <section className={`service-catalog${mirrored ? " service-catalog--mirrored" : ""}`}>
      <div className="care-carousel__toolbar">
        <div
          className="care-carousel__tabs"
          role="tablist"
          aria-label="케어 섹션"
          style={
            {
              "--care-tab-index": activeIndex,
              "--care-tab-count": sections.length,
            } as React.CSSProperties
          }
        >
          {sections.map((section, index) => (
            <button
              key={section.id}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              className={`care-carousel__tab${index === activeIndex ? " care-carousel__tab--active" : ""}`}
              onClick={() => setActiveIndex(index)}
            >
              {section.tabLabel}
            </button>
          ))}
        </div>
      </div>

      <div className="care-carousel__stage">
        {sections.map((section, index) => {
          const distance = (index - activeIndex + sections.length) % sections.length;
          const stateClass =
            distance === 0
              ? "care-carousel__slide--active"
              : distance === 1
                ? "care-carousel__slide--stacked"
                : "care-carousel__slide--hidden";

          return (
            <section
              key={section.id}
              className={`care-carousel__slide ${stateClass}`}
              onClick={distance === 1 ? () => setActiveIndex(index) : undefined}
              aria-hidden={distance > 1}
            >
              <div className="care-carousel__panel">
                <div className={`care-section-shell care-section-shell--${section.tone}`}>
                  <div className="care-section">
                    <CareSectionHeading
                      mutedText={section.mutedText}
                      primaryText={section.primaryText}
                    />
                    <div className="care-overlay-stack">
                      {section.cards.map((card, i) => (
                        <CareCardOverlay key={card.title} card={card} index={i} tone={section.tone} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
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
    <div className={`care-section${mirrored ? " care-section--mirrored" : ""}`} style={{ padding: 0, width: "min-content" }}>
      <h2 className="h3-left care-section__title" style={{ whiteSpace: "nowrap" }}>
        <span className="care-section__title-muted">{section.mutedText}</span>
        <br />
        <span className="care-section__title-primary">{section.primaryText}</span>
      </h2>
      <div className="care-overlay-stack">
        {section.cards.map((card, i) => (
          <article key={card.title} className={`care-overlay-card care-overlay-card--${section.tone}`}>
            <div className="care-overlay-card__overlay">
              <span className="care-overlay-card__badge">{i + 1}</span>
              <div className="care-overlay-card__text">
                <h3 className="h6 care-overlay-card__title">{card.title}</h3>
                <p className="medium-p care-overlay-card__desc">{card.description}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
