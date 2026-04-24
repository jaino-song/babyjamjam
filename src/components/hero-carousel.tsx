"use client";
import {
  type PointerEvent as ReactPointerEvent,
  type TouchEvent as ReactTouchEvent,
  useEffect,
  useRef,
  useState,
} from "react";


const SLIDES = [
  { src: "/images/hero-bg-22ebe1.png", alt: "Hero background 1" },
  { src: "/images/hero-bg-2.png", alt: "Hero background 2" },
];

// Infinite loop track: [last, ...slides, first]
const TRACK = [SLIDES[SLIDES.length - 1], ...SLIDES, SLIDES[0]];

const AUTOPLAY_MS = 5000;

interface HeroCarouselProps {
  headlineLines?: [string, string];
}

export default function HeroCarousel({ headlineLines }: HeroCarouselProps) {
  const [index, setIndex] = useState(1); // start at first real slide
  const [animating, setAnimating] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [progressKey, setProgressKey] = useState(0);
  const animatingRef = useRef(false);
  const swipeStateRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    hasMoved: boolean;
  } | null>(null);
  const settleTimerRef = useRef<number | null>(null);

  const go = (dir: 1 | -1) => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    setAnimating(true);
    setIndex((i) => i + dir);
    setProgressKey((k) => k + 1);
    if (settleTimerRef.current !== null) {
      window.clearTimeout(settleTimerRef.current);
    }
    settleTimerRef.current = window.setTimeout(() => {
      animatingRef.current = false;
      setAnimating(false);
    }, 1100);
  };

  const goToReal = (realTarget: number) => {
    if (animatingRef.current) return;
    const currentReal = ((index - 1) % SLIDES.length + SLIDES.length) % SLIDES.length;
    if (realTarget === currentReal) return;
    animatingRef.current = true;
    setAnimating(true);
    setIndex(realTarget + 1);
    setProgressKey((k) => k + 1);
    if (settleTimerRef.current !== null) {
      window.clearTimeout(settleTimerRef.current);
    }
    settleTimerRef.current = window.setTimeout(() => {
      animatingRef.current = false;
      setAnimating(false);
    }, 1100);
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
    if (settleTimerRef.current !== null) {
      window.clearTimeout(settleTimerRef.current);
      settleTimerRef.current = null;
    }
    // Snap without animation when we land on a clone
    if (index <= 0) {
      setIndex(SLIDES.length);
    } else if (index >= TRACK.length - 1) {
      setIndex(1);
    }
    animatingRef.current = false;
    setAnimating(false);
  };

  const touchPointFromEvent = (event: ReactTouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0] ?? event.changedTouches[0];
    return touch ? { clientX: touch.clientX, clientY: touch.clientY } : null;
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") return;
    swipeStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      hasMoved: false,
    };
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const state = swipeStateRef.current;
    if (!state || state.pointerId !== event.pointerId) return;
    const dx = event.clientX - state.startX;
    const dy = event.clientY - state.startY;
    if (Math.abs(dx) > 12 || Math.abs(dy) > 12) {
      state.hasMoved = true;
    }
  };

  const finishSwipe = (event: ReactPointerEvent<HTMLDivElement>) => {
    const state = swipeStateRef.current;
    if (!state || state.pointerId !== event.pointerId) return;

    const dx = event.clientX - state.startX;
    const dy = event.clientY - state.startY;
    swipeStateRef.current = null;

    if (!state.hasMoved || Math.abs(dx) < 48 || Math.abs(dx) <= Math.abs(dy)) {
      return;
    }

    if (dx < 0) {
      go(1);
    } else {
      go(-1);
    }
  };

  const handleTouchStart = (event: ReactTouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 1) return;
    const point = touchPointFromEvent(event);
    if (!point) return;
    swipeStateRef.current = {
      pointerId: 1,
      startX: point.clientX,
      startY: point.clientY,
      hasMoved: false,
    };
  };

  const handleTouchMove = (event: ReactTouchEvent<HTMLDivElement>) => {
    const state = swipeStateRef.current;
    if (!state) return;
    const point = touchPointFromEvent(event);
    if (!point) return;
    const dx = point.clientX - state.startX;
    const dy = point.clientY - state.startY;
    if (Math.abs(dx) > 12 || Math.abs(dy) > 12) {
      state.hasMoved = true;
    }
  };

  const handleTouchEnd = (event: ReactTouchEvent<HTMLDivElement>) => {
    const state = swipeStateRef.current;
    if (!state) return;
    const point = touchPointFromEvent(event);
    swipeStateRef.current = null;
    if (!point) return;

    const dx = point.clientX - state.startX;
    const dy = point.clientY - state.startY;
    if (!state.hasMoved || Math.abs(dx) < 48 || Math.abs(dx) <= Math.abs(dy)) {
      return;
    }

    if (dx < 0) {
      go(1);
    } else {
      go(-1);
    }
  };

  const realIndex = ((index - 1) % SLIDES.length + SLIDES.length) % SLIDES.length;

  return (
    <section
      className="relative w-full overflow-hidden max-mobile:ml-[calc(50%-50vw)] max-mobile:mr-[calc(50%-50vw)] max-mobile:w-screen max-mobile:max-w-none max-mobile:bg-[#f7f4ef]"
      data-component="home-hero"
    >
      <div className="flex min-h-[460px] flex-col bg-[#f7f4ef] max-mobile:h-auto mobile:h-[560px] mobile:block mobile:rounded-[20px] mobile:overflow-hidden">
        {headlineLines ? (
          <div
            className="pointer-events-none flex shrink-0 flex-col items-center bg-white pt-12 pb-6 mobile:hidden"
            data-component="home-hero-copy"
          >
            <h1
              className="h1 w-full whitespace-nowrap text-center text-bjj-primary"
              data-component="home-hero-headline-line-1"
            >
              {headlineLines[0]}
            </h1>
            <h1
              className="h1 w-full whitespace-nowrap text-center text-bjj-primary"
              data-component="home-hero-headline-line-2"
            >
              {headlineLines[1]}
            </h1>
          </div>
        ) : null}

        <div className="relative min-h-0 flex-1 overflow-hidden max-mobile:h-[320px] max-mobile:flex-none">
          <div
            className="flex h-full w-full"
            data-component="home-hero-track"
            style={{
              transform: `translateX(-${index * 100}%)`,
              transition: animating ? "transform 1s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
              touchAction: "pan-y",
            }}
            onTransitionEnd={handleTransitionEnd}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={finishSwipe}
            onPointerCancel={finishSwipe}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
          >
            {TRACK.map((slide, i) => (
              <div
                key={i}
                className="h-full w-full shrink-0 bg-[#f7f4ef] mobile:bg-transparent"
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="h-full w-full shrink-0 object-cover object-[center_8%] mobile:object-[center_top]"
                />
              </div>
            ))}
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[30%] bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.992)_14%,rgba(255,255,255,0.9)_30%,rgba(255,255,255,0.68)_48%,rgba(255,255,255,0.3)_70%,rgba(255,255,255,0)_100%)] mobile:hidden"
            data-component="home-hero-image-gradient"
          />

          {SLIDES.length > 1 && (
            <div
              className="carousel__controls !top-auto bottom-6 z-10 backdrop-blur-[40px] saturate-[180%] shadow-[0_8px_32px_rgba(0,0,0,0.18)] mobile:bottom-8"
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
          )}
        </div>
      </div>
    </section>
  );
}
