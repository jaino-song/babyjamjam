"use client";
import { useState, useEffect, useRef } from "react";

const SLIDES = [
  { src: "/images/hero-bg-22ebe1.png", alt: "Hero background 1" },
  { src: "/images/hero-bg-2.png", alt: "Hero background 2" },
];

// Infinite loop track: [last, ...slides, first]
const TRACK = [SLIDES[SLIDES.length - 1], ...SLIDES, SLIDES[0]];

export default function HeroCarousel() {
  const [index, setIndex] = useState(1); // start at first real slide
  const [animating, setAnimating] = useState(false);
  const [hovered, setHovered] = useState(false);
  const animatingRef = useRef(false);

  const go = (dir: 1 | -1) => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    setAnimating(true);
    setIndex((i) => i + dir);
  };

  useEffect(() => {
    const id = setInterval(() => go(1), 5000);
    return () => clearInterval(id);
  }, []);

  const handleTransitionEnd = () => {
    // Snap without animation when we land on a clone
    if (index <= 0) {
      setIndex(SLIDES.length);
    } else if (index >= TRACK.length - 1) {
      setIndex(1);
    }
    animatingRef.current = false;
    setAnimating(false);
  };

  return (
    <div
      className="hero__bg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="hero__carousel-track"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: animating ? "transform 1s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {TRACK.map((slide, i) => (
          <img
            key={i}
            src={slide.src}
            alt={slide.alt}
            className="hero__bg-image"
          />
        ))}
      </div>

      {SLIDES.length > 1 && (
        <>
          <button
            className="hero__carousel-btn hero__carousel-btn--prev"
            style={{ opacity: hovered ? 1 : 0 }}
            onClick={() => go(-1)}
            aria-label="Previous slide"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            className="hero__carousel-btn hero__carousel-btn--next"
            style={{ opacity: hovered ? 1 : 0 }}
            onClick={() => go(1)}
            aria-label="Next slide"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
