'use client';

import { useEffect, useState, type ReactNode } from 'react';

type Theme = 'dark' | 'light';

type Slide = {
  theme: Theme;
  renderTitle: (dataComponent?: string) => ReactNode;
  renderDescription: (dataComponent?: string) => ReactNode;
  logos: { src: string; alt: string; scale?: number }[];
};

const slides: Slide[] = [
  {
    theme: 'dark',
    renderTitle: (dataComponent) => (
      <h3
        className="h3"
        style={{ textAlign: 'left' }}
        data-component={dataComponent ? `${dataComponent}-title` : undefined}
      >
        <span
          style={{ display: 'block', color: 'rgba(251, 253, 255, 0.7)' }}
          data-component={dataComponent ? `${dataComponent}-title-line-1` : undefined}
        >
          국가인증업체라서
        </span>
        <span
          style={{ display: 'block', color: 'var(--bjj-color-primary-light)' }}
          data-component={dataComponent ? `${dataComponent}-title-line-2` : undefined}
        >
          믿을 수 있으니까.
        </span>
      </h3>
    ),
    renderDescription: (dataComponent) => (
      <p
        className="big-p"
        style={{ color: 'rgba(251, 253, 255, 0.85)' }}
        data-component={dataComponent ? `${dataComponent}-description` : undefined}
      >
        아가잼잼은 대한민국 정부 인증을 받은 산모·신생아 건강관리 지원사업 제공기관으로,
        안심하고 함께하실 수 있어요.
      </p>
    ),
    logos: [
      { src: '/images/logo-bokjiro.png', alt: '복지로' },
      { src: '/images/logo-ssis.png', alt: 'SSIS', scale: 1.3 },
      { src: '/images/logo-mohw.png', alt: '보건복지부' },
      { src: '/images/logo-cert.png', alt: '인증마크' },
    ],
  },
  {
    theme: 'light',
    renderTitle: (dataComponent) => (
      <h3
        className="h3"
        style={{ textAlign: 'left', color: 'var(--bjj-color-text-muted)' }}
        data-component={dataComponent ? `${dataComponent}-title` : undefined}
      >
        자격증만 딴다고
        <br data-component={dataComponent ? `${dataComponent}-title-break` : undefined} />다{' '}
        <strong
          style={{ color: 'var(--bjj-color-primary)' }}
          data-component={dataComponent ? `${dataComponent}-title-emphasis` : undefined}
        >
          전문가
        </strong>
        는 아니죠.
      </h3>
    ),
    renderDescription: (dataComponent) => (
      <p
        className="big-p"
        style={{ color: 'var(--bjj-color-text-dark)' }}
        data-component={dataComponent ? `${dataComponent}-description` : undefined}
      >
        아가잼잼은 관리사님들이 더 좋은 서비스를 제공할 수 있도록 꾸준히 교육하고 있어요. 자체
        컨퍼런스를 통해 다양한 사례를 함께 공부하고, 필수 교육은 물론 공인 기관과 함께 신생아
        케어에 맞춘 전문 교육도 이어가고 있어요. 자격증만으로 충분하다고 생각하지 않고, 늘 더
        세심하고 믿음직한 서비스를 고민해요.
      </p>
    ),
    logos: [
      { src: '/images/edu-logo-1.png', alt: '교육기관 1' },
      { src: '/images/edu-logo-2.png', alt: '교육기관 2', scale: 0.9 },
      { src: '/images/edu-logo-3.png', alt: '교육기관 3' },
    ],
  },
];

const AUTOPLAY_MS = 7000;

type LogoCarouselProps = {
  'data-component'?: string;
};

export default function LogoCarousel({ 'data-component': dataComponent }: LogoCarouselProps) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progressKey, setProgressKey] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Pause when tab hidden
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) setPlaying(false);
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // Autoplay timer
  useEffect(() => {
    if (!playing || reducedMotion) return;
    const id = setTimeout(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index, playing, progressKey, reducedMotion]);

  const goTo = (i: number) => {
    setIndex(i);
    setProgressKey((k) => k + 1);
  };

  const togglePlay = () => setPlaying((p) => !p);

  // Controls invert the card theme so they remain visible against the backdrop
  // (light controls float over dark cards, dark controls float over light cards).
  const controlsTheme = slides[index].theme === 'dark' ? 'light' : 'dark';

  return (
    <section
      className="carousel"
      aria-roledescription="carousel"
      data-component={dataComponent}
    >
      <div
        className="carousel__viewport"
        data-component={dataComponent ? `${dataComponent}-viewport` : undefined}
      >
        <div
          className="carousel__track"
          style={{ transform: `translateX(-${index * 100}%)` }}
          data-component={dataComponent ? `${dataComponent}-track` : undefined}
        >
          {slides.map((slide, i) => {
            const slideBase = dataComponent ? `${dataComponent}-slide-${i + 1}` : undefined;

            return (
              <div
                key={i}
                className="carousel__slide"
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} / ${slides.length}`}
                aria-hidden={i !== index}
                data-component={slideBase}
              >
                <article
                  className="carousel__card"
                  data-theme={slide.theme}
                  data-component={slideBase ? `${slideBase}-card` : undefined}
                >
                  <div
                    className="carousel__card-caption"
                    data-component={slideBase ? `${slideBase}-caption` : undefined}
                  >
                    {slide.renderTitle(slideBase)}
                    {slide.renderDescription(slideBase)}
                  </div>
                  <div
                    className="carousel__logo-row"
                    data-component={slideBase ? `${slideBase}-logo-row` : undefined}
                  >
                    {slide.logos.map((logo, logoIndex) => (
                      <div
                        key={logo.alt}
                        className="carousel__logo-cell"
                        data-component={
                          slideBase ? `${slideBase}-logo-cell-${logoIndex + 1}` : undefined
                        }
                      >
                        <img
                          src={logo.src}
                          alt={logo.alt}
                          style={logo.scale ? { transform: `scale(${logo.scale})` } : undefined}
                          data-component={
                            slideBase ? `${slideBase}-logo-image-${logoIndex + 1}` : undefined
                          }
                        />
                      </div>
                    ))}
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="carousel__controls"
        data-theme={controlsTheme}
        data-component={dataComponent ? `${dataComponent}-controls` : undefined}
      >
        <button
          type="button"
          className="carousel__playpause"
          onClick={togglePlay}
          aria-label={playing ? '슬라이드 일시 정지' : '슬라이드 재생'}
          data-component={dataComponent ? `${dataComponent}-playpause-button` : undefined}
        >
          {playing ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              aria-hidden="true"
              data-component={dataComponent ? `${dataComponent}-playpause-icon-pause` : undefined}
            >
              <rect
                x="2"
                y="1.5"
                width="3"
                height="11"
                rx="0.8"
                fill="currentColor"
                data-component={
                  dataComponent ? `${dataComponent}-playpause-icon-pause-bar-1` : undefined
                }
              />
              <rect
                x="9"
                y="1.5"
                width="3"
                height="11"
                rx="0.8"
                fill="currentColor"
                data-component={
                  dataComponent ? `${dataComponent}-playpause-icon-pause-bar-2` : undefined
                }
              />
            </svg>
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              aria-hidden="true"
              data-component={dataComponent ? `${dataComponent}-playpause-icon-play` : undefined}
            >
              <path
                d="M3 1.8 L12 7 L3 12.2 Z"
                fill="currentColor"
                data-component={
                  dataComponent ? `${dataComponent}-playpause-icon-play-shape` : undefined
                }
              />
            </svg>
          )}
        </button>
        <div
          className="carousel__dotnav"
          role="tablist"
          data-component={dataComponent ? `${dataComponent}-dotnav` : undefined}
        >
          {slides.map((_, i) => {
            const isActive = i === index;
            return (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`슬라이드 ${i + 1}`}
                className={`carousel__dot${isActive ? ' carousel__dot--active' : ''}${
                  isActive && !playing ? ' is-paused' : ''
                }`}
                onClick={() => goTo(i)}
                data-component={dataComponent ? `${dataComponent}-dot-${i + 1}` : undefined}
              >
                {isActive && !reducedMotion && (
                  <span
                    key={progressKey}
                    className="carousel__dot-fill"
                    aria-hidden="true"
                    data-component={
                      dataComponent ? `${dataComponent}-dot-${i + 1}-fill` : undefined
                    }
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
