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

const TRACK = [SLIDES[SLIDES.length - 1], ...SLIDES, SLIDES[0]];

const AUTOPLAY_MS = 5000;

interface HeroCarouselProps {
  "data-component"?: string;
}

export default function DesktopHeroCarousel({
  "data-component": dataComponent,
}: HeroCarouselProps) {
  const [index, setIndex] = useState(1);
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
    setIndex((currentIndex) => currentIndex + dir);
    setProgressKey((currentKey) => currentKey + 1);
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
    setProgressKey((currentKey) => currentKey + 1);
    if (settleTimerRef.current !== null) {
      window.clearTimeout(settleTimerRef.current);
    }
    settleTimerRef.current = window.setTimeout(() => {
      animatingRef.current = false;
      setAnimating(false);
    }, 1100);
  };

  useEffect(() => {
    if (!playing) return;
    const timeoutId = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(timeoutId);
  }, [progressKey, playing]);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) {
        setPlaying(false);
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  const handleTransitionEnd = () => {
    if (settleTimerRef.current !== null) {
      window.clearTimeout(settleTimerRef.current);
      settleTimerRef.current = null;
    }

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
    const swipeState = swipeStateRef.current;
    if (!swipeState || swipeState.pointerId !== event.pointerId) return;
    const dx = event.clientX - swipeState.startX;
    const dy = event.clientY - swipeState.startY;
    if (Math.abs(dx) > 12 || Math.abs(dy) > 12) {
      swipeState.hasMoved = true;
    }
  };

  const finishSwipe = (event: ReactPointerEvent<HTMLDivElement>) => {
    const swipeState = swipeStateRef.current;
    if (!swipeState || swipeState.pointerId !== event.pointerId) return;

    const dx = event.clientX - swipeState.startX;
    const dy = event.clientY - swipeState.startY;
    swipeStateRef.current = null;

    if (!swipeState.hasMoved || Math.abs(dx) < 48 || Math.abs(dx) <= Math.abs(dy)) {
      return;
    }

    if (dx < 0) {
      go(1);
      return;
    }

    go(-1);
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
    const swipeState = swipeStateRef.current;
    if (!swipeState) return;
    const point = touchPointFromEvent(event);
    if (!point) return;
    const dx = point.clientX - swipeState.startX;
    const dy = point.clientY - swipeState.startY;
    if (Math.abs(dx) > 12 || Math.abs(dy) > 12) {
      swipeState.hasMoved = true;
    }
  };

  const handleTouchEnd = (event: ReactTouchEvent<HTMLDivElement>) => {
    const swipeState = swipeStateRef.current;
    if (!swipeState) return;
    const point = touchPointFromEvent(event);
    swipeStateRef.current = null;
    if (!point) return;

    const dx = point.clientX - swipeState.startX;
    const dy = point.clientY - swipeState.startY;
    if (!swipeState.hasMoved || Math.abs(dx) < 48 || Math.abs(dx) <= Math.abs(dy)) {
      return;
    }

    if (dx < 0) {
      go(1);
      return;
    }

    go(-1);
  };

  const realIndex = ((index - 1) % SLIDES.length + SLIDES.length) % SLIDES.length;
  const getComponent = (suffix: string) =>
    dataComponent ? `${dataComponent}-${suffix}` : undefined;

  return (
    <section className="relative w-full overflow-hidden" data-component={dataComponent}>
      <div
        className="h-[560px] w-full overflow-hidden rounded-[20px] bg-[#f7f4ef]"
        data-component={getComponent("viewport")}
      >
        <div
          className="relative min-h-0 flex-1 overflow-hidden"
          data-component={getComponent("image-stage")}
        >
          <div
            className="flex h-full w-full"
            data-component={getComponent("track")}
            style={{
              transform: `translateX(-${index * 100}%)`,
              transition: animating ? "transform 1s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
              touchAction: "pan-y",
            }}
            onTransitionEnd={handleTransitionEnd}
            onPointerCancel={finishSwipe}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={finishSwipe}
            onTouchCancel={handleTouchEnd}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
            onTouchStart={handleTouchStart}
          >
            {TRACK.map((slide, slideIndex) => {
              const slideBase = getComponent(`slide-${slideIndex + 1}`);

              return (
                <div
                  key={slideIndex}
                  className="h-full w-full shrink-0 bg-transparent"
                  data-component={slideBase}
                >
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="h-full w-full shrink-0 object-cover object-[center_top]"
                    data-component={slideBase ? `${slideBase}-image` : undefined}
                  />
                </div>
              );
            })}
          </div>

          {SLIDES.length > 1 && (
            <div
              className="carousel__controls !top-auto bottom-8 z-10 backdrop-blur-[40px] saturate-[180%] shadow-[0_8px_32px_rgba(0,0,0,0.18)]"
              data-theme="light"
              data-component={getComponent("controls")}
              style={{ ["--carousel-duration" as string]: `${AUTOPLAY_MS}ms` }}
            >
              <button
                type="button"
                className="carousel__playpause"
                onClick={() => setPlaying((current) => !current)}
                aria-label={playing ? "슬라이드 일시 정지" : "슬라이드 재생"}
                data-component={getComponent("playpause-button")}
              >
                {playing ? (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    aria-hidden="true"
                    data-component={getComponent("playpause-icon-pause")}
                  >
                    <rect
                      x="2"
                      y="1.5"
                      width="3"
                      height="11"
                      rx="0.8"
                      fill="currentColor"
                      data-component={getComponent("playpause-icon-pause-bar-1")}
                    />
                    <rect
                      x="9"
                      y="1.5"
                      width="3"
                      height="11"
                      rx="0.8"
                      fill="currentColor"
                      data-component={getComponent("playpause-icon-pause-bar-2")}
                    />
                  </svg>
                ) : (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    aria-hidden="true"
                    data-component={getComponent("playpause-icon-play")}
                  >
                    <path
                      d="M3 1.8 L12 7 L3 12.2 Z"
                      fill="currentColor"
                      data-component={getComponent("playpause-icon-play-path")}
                    />
                  </svg>
                )}
              </button>
              <div
                className="carousel__dotnav"
                role="tablist"
                data-component={getComponent("dotnav")}
              >
                {SLIDES.map((_, slideIndex) => {
                  const isActive = slideIndex === realIndex;
                  const dotBase = getComponent(`dot-${slideIndex + 1}`);
                  return (
                    <button
                      key={slideIndex}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`슬라이드 ${slideIndex + 1}`}
                      className={`carousel__dot${isActive ? " carousel__dot--active" : ""}${
                        isActive && !playing ? " is-paused" : ""
                      }`}
                      onClick={() => goToReal(slideIndex)}
                      data-component={dotBase}
                    >
                      {isActive && (
                        <span
                          key={progressKey}
                          className="carousel__dot-fill"
                          aria-hidden="true"
                          data-component={dotBase ? `${dotBase}-fill` : undefined}
                        />
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
