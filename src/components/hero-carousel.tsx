"use client";
import { useState, useEffect, useRef } from "react";


const SLIDES = [
  { src: "/images/hero-bg-22ebe1.png", alt: "Hero background 1" },
  { src: "/images/hero-bg-2.png", alt: "Hero background 2" },
];

// Infinite loop track: [last, ...slides, first]
const TRACK = [SLIDES[SLIDES.length - 1], ...SLIDES, SLIDES[0]];

const AUTOPLAY_MS = 5000;

export default function HeroCarousel() {
  const [index, setIndex] = useState(1); // start at first real slide
  const [animating, setAnimating] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [progressKey, setProgressKey] = useState(0);
  const animatingRef = useRef(false);

  const go = (dir: 1 | -1) => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    setAnimating(true);
    setIndex((i) => i + dir);
    setProgressKey((k) => k + 1);
  };

  const goToReal = (realTarget: number) => {
    if (animatingRef.current) return;
    const currentReal = ((index - 1) % SLIDES.length + SLIDES.length) % SLIDES.length;
    if (realTarget === currentReal) return;
    animatingRef.current = true;
    setAnimating(true);
    setIndex(realTarget + 1);
    setProgressKey((k) => k + 1);
  };

  // Autoplay timer — keyed on progressKey so the snap-back transitionEnd
  // (which only changes index, not progressKey) does not reset the timer.
  useEffect(() => {
    if (!playing) return;
    const id = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progressKey, playing]);

  // Pause when tab hidden
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) setPlaying(false);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
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

  const realIndex = ((index - 1) % SLIDES.length + SLIDES.length) % SLIDES.length;

  return (
    <div className="relative w-full h-[380px] mobile:h-[560px] rounded-[20px] overflow-hidden bg-[#f7f4ef]">
      <div
        className="flex w-full h-full"
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
            className="w-full h-full object-cover object-[center_top] shrink-0"
          />
        ))}
      </div>

      {SLIDES.length > 1 && (
        <>
          <div
            className="carousel__controls !top-auto bottom-6 z-10 backdrop-blur-[40px] saturate-[180%] shadow-[0_8px_32px_rgba(0,0,0,0.18)]"
            data-theme="light"
            style={{ ["--carousel-duration" as string]: `${AUTOPLAY_MS}ms` }}
          >
            <button
              type="button"
              className="carousel__playpause"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "슬라이드 일시 정지" : "슬라이드 재생"}
            >
              {playing ? (
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                  <rect x="2" y="1.5" width="3" height="11" rx="0.8" fill="currentColor" />
                  <rect x="9" y="1.5" width="3" height="11" rx="0.8" fill="currentColor" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                  <path d="M3 1.8 L12 7 L3 12.2 Z" fill="currentColor" />
                </svg>
              )}
            </button>
            <div className="carousel__dotnav" role="tablist">
              {SLIDES.map((_, i) => {
                const isActive = i === realIndex;
                return (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`슬라이드 ${i + 1}`}
                    className={`carousel__dot${isActive ? " carousel__dot--active" : ""}${
                      isActive && !playing ? " is-paused" : ""
                    }`}
                    onClick={() => goToReal(i)}
                  >
                    {isActive && (
                      <span key={progressKey} className="carousel__dot-fill" aria-hidden="true" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
