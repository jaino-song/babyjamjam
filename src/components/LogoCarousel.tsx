'use client';

import { useRef, useState, useEffect } from 'react';

const slides = [
  {
    title: (
      <h2 className="h3" style={{ textAlign: 'left' }}>
        <span style={{ display: 'block', color: '#848484' }}>국가인증업체라서</span>
        <span style={{ display: 'block', color: 'var(--bjj-color-primary)' }}>
          믿을 수 있으니까.
        </span>
      </h2>
    ),
    description:
      '아가잼잼은 대한민국 정부 인증을 받은 산모·신생아 건강관리 지원사업 제공기관으로, 안심하고 함께하실 수 있어요.',
    logos: [
      { src: '/images/logo-bokjiro.png', alt: '복지로' },
      { src: '/images/logo-ssis.png', alt: 'SSIS', scale: 1.3 },
      { src: '/images/logo-mohw.png', alt: '보건복지부' },
      { src: '/images/logo-cert.png', alt: '인증마크' },
    ],
  },
  {
    title: (
      <h2 className="h3" style={{ textAlign: 'left', color: 'var(--bjj-color-text-muted)' }}>
        자격증만 딴다고<br />다 <strong style={{ color: 'var(--bjj-color-primary)' }}>전문가</strong>는 아니죠.
      </h2>
    ),
    description:
      '아가잼잼은 관리사님들이 더 좋은 서비스를 제공할 수 있도록 꾸준히 교육하고 있어요. 자체 컨퍼런스를 통해 다양한 사례를 함께 공부하고, 필수 교육은 물론 공인 기관과 함께 신생아 케어에 맞춘 전문 교육도 이어가고 있어요. 자격증만으로 충분하다고 생각하지 않고, 늘 더 세심하고 믿음직한 서비스를 고민해요.',
    logos: [
      { src: '/images/edu-logo-1.png', alt: '교육기관 1' },
      { src: '/images/edu-logo-2.png', alt: '교육기관 2', scale: 0.9 },
      { src: '/images/edu-logo-3.png', alt: '교육기관 3' },
    ],
  },
];

export default function LogoCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[index] as HTMLElement | undefined;
    if (!slide) return;
    track.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' });
  };

  const handlePrev = () => scrollTo(Math.max(0, activeIndex - 1));
  const handleNext = () => scrollTo(Math.min(slides.length - 1, activeIndex + 1));

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      const { scrollLeft, clientWidth } = track;
      const index = Math.round(scrollLeft / clientWidth);
      setActiveIndex(index);
    };

    track.addEventListener('scroll', handleScroll, { passive: true });
    return () => track.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="carousel">
      {slides.length > 2 && (
        <button
          className="carousel__btn carousel__btn--prev"
          onClick={handlePrev}
          aria-label="이전 슬라이드"
        >
          ‹
        </button>
      )}
      {slides.length > 2 && (
        <button
          className="carousel__btn carousel__btn--next"
          onClick={handleNext}
          aria-label="다음 슬라이드"
        >
          ›
        </button>
      )}

      <div className="carousel__track" ref={trackRef}>
        {slides.map((slide, i) => (
          <div key={i} className="carousel__slide">
            <div className="carousel__card">
              <div className="carousel__card-header">
                {slide.title}
                <p className="big-p logo-section__description" style={{ color: 'var(--bjj-color-text-dark)' }}>
                  {slide.description}
                </p>
              </div>
              <div className="carousel__card-footer">
                <div className="carousel__logo-grid">
                  {slide.logos.map((logo) => (
                    <div key={logo.alt} className="carousel__logo-cell">
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        style={logo.scale ? { transform: `scale(${logo.scale})` } : undefined}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {slides.length > 2 && (
        <div className="carousel__dots">
          {Array.from({ length: Math.ceil(slides.length / 2) }, (_, i) => (
            <button
              key={i}
              className={`carousel__dot ${i === Math.floor(activeIndex / 2) ? 'carousel__dot--active' : ''}`}
              onClick={() => scrollTo(i * 2)}
              aria-label={`페이지 ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
