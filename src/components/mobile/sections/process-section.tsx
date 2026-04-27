"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { GalleryPaddlenav } from "@/components/ui/gallery-paddlenav";

const PROCESS_STEPS = [
  {
    number: "01",
    title: "예약금 입금",
    description:
      "예약금 입금으로 서비스 예약이 확정되면, 아가잼잼은 관리사 배정, 계약서 준비, 산모 등록 등 서비스 진행을 위한 절차를 준비합니다.",
  },
  {
    number: "02",
    title: "계약서 작성",
    description:
      "서비스 진행에 필요한 계약서 작성을 모바일에서 전자문서로 완료합니다. 번거로운 종이 작성없이, 휴대폰으로 계약서 작성이 가능합니다.",
  },
  {
    number: "03",
    title: "서비스 시작",
    description:
      "서비스 기간 동안 실시간 고객 응대를 진행하며, 서비스 중 발생하는 문의 사항에 대해 즉각적으로 대응합니다.",
  },
  {
    number: "04",
    title: "마무리",
    description:
      "서비스 종료 전에 종료 안내 연락을 드리고, 모니터링 설문과 환급 절차 설명 등 서비스 종료에 필요한 절차를 진행하고 종료하게 됩니다.",
  },
];

interface ProcessSectionProps {
  className?: string;
  "data-component"?: string;
}

export function MobileProcessSection({
  className,
  "data-component": dataComponent,
}: ProcessSectionProps) {
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const mobileCardRefs = useRef<Array<HTMLElement | null>>([]);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const getComponent = (suffix: string) =>
    dataComponent ? `${dataComponent}_${suffix}` : undefined;

  useEffect(() => {
    const track = mobileTrackRef.current;
    if (!track) return;

    let frameId = 0;

    const updateActiveIndex = () => {
      const trackRect = track.getBoundingClientRect();
      const trackCenter = trackRect.left + trackRect.width / 2;
      let nearestIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      mobileCardRefs.current.forEach((card, index) => {
        if (!card) return;
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(cardCenter - trackCenter);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      setMobileActiveIndex(nearestIndex);
    };

    const requestUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        updateActiveIndex();
      });
    };

    updateActiveIndex();
    track.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      track.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  const scrollMobileStep = (direction: -1 | 1) => {
    const nextIndex = Math.max(
      0,
      Math.min(PROCESS_STEPS.length - 1, mobileActiveIndex + direction),
    );
    const nextCard = mobileCardRefs.current[nextIndex];
    nextCard?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    setMobileActiveIndex(nextIndex);
  };

  return (
    <section
      className={cn(
        "flex flex-col items-center gap-6 w-screen self-start",
        "py-12 px-[var(--bjj-page-padding)] bg-white",
        "ml-[calc(-50vw+50%)]",
        className
      )}
      data-component={dataComponent}
    >
      <div className="flex justify-between w-full gap-6" data-component={getComponent("header")}>
        <h2 className="h2 text-bjj-primary" data-component={getComponent("title")}>
          산후도우미 서비스 진행 절차
        </h2>
      </div>
      <div className="flex w-full flex-col gap-4" data-component={getComponent("gallery")}>
        <div
          className="process-gallery__frame"
          data-component={getComponent("gallery-frame")}
        >
          <div
            ref={mobileTrackRef}
            className="process-gallery__track"
            aria-label="산후도우미 서비스 진행 절차"
            data-component={getComponent("steps")}
          >
            {PROCESS_STEPS.map((step, index) => (
              <article
                key={step.number}
                ref={(node) => {
                  mobileCardRefs.current[index] = node;
                }}
                className={cn(
                  "process-gallery__card",
                  index === mobileActiveIndex && "process-gallery__card--active",
                )}
                aria-current={index === mobileActiveIndex ? "true" : undefined}
                data-component={getComponent(`step-${index + 1}`)}
              >
                <span
                  className="process-gallery__number"
                  data-component={getComponent(`step-${index + 1}-number`)}
                >
                  {step.number}
                </span>
                <div
                  className="process-gallery__content"
                  data-component={getComponent(`step-${index + 1}-content`)}
                >
                  <h3
                    className="h6 process-gallery__title"
                    data-component={getComponent(`step-${index + 1}-title`)}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="medium-p process-gallery__description"
                    data-component={getComponent(`step-${index + 1}-description`)}
                  >
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <GalleryPaddlenav
            className="process-gallery__paddlenav"
            previousLabel="이전 단계"
            nextLabel="다음 단계"
            previousDisabled={mobileActiveIndex === 0}
            nextDisabled={mobileActiveIndex === PROCESS_STEPS.length - 1}
            onPrevious={() => scrollMobileStep(-1)}
            onNext={() => scrollMobileStep(1)}
            data-component={getComponent("gallery-paddlenav")}
          />
        </div>
      </div>
    </section>
  );
}
