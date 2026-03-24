"use client";

import { useState } from "react";

export type CareCardData = {
  title: string;
  description: string;
  label: string;
  focus: string;
  highlights: string[];
};

export type CareSectionData = {
  id: string;
  tone: "maternal" | "newborn";
  tabLabel: string;
  mutedText: string;
  primaryText: string;
  cards: CareCardData[];
};

function CareSectionHeading({
  mutedText,
  primaryText,
}: {
  mutedText: string;
  primaryText: string;
}) {
  return (
    <h2 className="h2-left care-section__title">
      <span className="care-section__title-muted">{mutedText}</span>
      <br />
      <span className="care-section__title-primary">{primaryText}</span>
    </h2>
  );
}

function CareCardItem({
  card,
  tone,
}: {
  card: CareCardData;
  tone: "maternal" | "newborn";
}) {
  return (
    <article className={`care-card care-card--${tone}`}>
      <div className="care-card__preview">
        <span className="care-card__label">{card.label}</span>
        <div className="care-card__panel">
          <div className="care-card__metrics">
            <div className="care-card__metric">
              <span className="care-card__metric-label">집중 포인트</span>
              <span className="care-card__metric-value">{card.focus}</span>
            </div>
            <div className="care-card__metric">
              <span className="care-card__metric-label">운영 방식</span>
              <span className="care-card__metric-value">맞춤 케어</span>
            </div>
          </div>
          <ul className="care-card__highlights">
            {card.highlights.map((highlight) => (
              <li key={highlight} className="care-card__highlight">
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="care-card__body">
        <h3 className="care-card__title">{card.title}</h3>
        <p className="medium-p care-card__description">{card.description}</p>
      </div>
    </article>
  );
}

export function CareSectionCarousel({ sections }: { sections: CareSectionData[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + sections.length) % sections.length);
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % sections.length);
  };

  return (
    <section className="service-catalog">
      <div className="care-carousel__toolbar">
        <div className="care-carousel__tabs" role="tablist" aria-label="케어 섹션">
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
        <div className="care-carousel__actions">
          <button
            type="button"
            className="care-carousel__nav"
            onClick={goToPrevious}
            aria-label="이전 케어 섹션"
          >
            이전
          </button>
          <button
            type="button"
            className="care-carousel__nav"
            onClick={goToNext}
            aria-label="다음 케어 섹션"
          >
            다음
          </button>
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
              <div className={`care-section-shell care-section-shell--${section.tone}`}>
                <div className="care-section">
                  <CareSectionHeading
                    mutedText={section.mutedText}
                    primaryText={section.primaryText}
                  />
                  <div className="care-card-grid">
                    {section.cards.map((card) => (
                      <CareCardItem key={card.title} card={card} tone={section.tone} />
                    ))}
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
