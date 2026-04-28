"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { GalleryPaddlenav } from "@/components/ui/gallery-paddlenav";

import { PROCESS_STEPS } from "./process-section.data";

type ProcessStep = { number: string; title: string; description: string };

interface ProcessSectionProps {
  className?: string;
  title?: ReactNode;
  steps?: ProcessStep[];
  "data-component"?: string;
}

export function MobileProcessSection({
  className,
  title = <>산후도우미 서비스<br />진행 절차</>,
  steps = PROCESS_STEPS,
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
      Math.min(steps.length - 1, mobileActiveIndex + direction),
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
        <h2 className="h2-left text-bjj-primary" data-component={getComponent("header_title")}>
          {title}
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
            data-component={getComponent("gallery_track")}
          >
            {steps.map((step, index) => (
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
                data-component={getComponent(`gallery_card-${index + 1}`)}
              >
                <span
                  className="process-gallery__number"
                  data-component={getComponent(`gallery_card-${index + 1}_number`)}
                >
                  {step.number}
                </span>
                <div
                  className="process-gallery__content"
                  data-component={getComponent(`gallery_card-${index + 1}_content`)}
                >
                  <h5
                    className="h5 process-gallery__title"
                    data-component={getComponent(`gallery_card-${index + 1}_title`)}
                  >
                    {step.title}
                  </h5>
                  <p
                    className="medium-p process-gallery__description"
                    data-component={getComponent(`gallery_card-${index + 1}_description`)}
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
            nextDisabled={mobileActiveIndex === steps.length - 1}
            onPrevious={() => scrollMobileStep(-1)}
            onNext={() => scrollMobileStep(1)}
            data-component={getComponent("gallery_paddle")}
          />
        </div>
      </div>
    </section>
  );
}
