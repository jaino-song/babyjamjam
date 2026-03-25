"use client";

import { useState } from "react";

export type CareCardData = {
  title: string;
  description: string;
  image: string;
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
        <div className="care-card__panel">
          <img src={card.image} alt={card.title} className="care-card__image" />
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

  return (
    <section className="service-catalog">
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
