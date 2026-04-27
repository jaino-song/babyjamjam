"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import {
  PricingPlanCard,
  type PlanData,
} from "@/components/molecules/pricing-plan-card";
import { GalleryPaddlenav } from "@/components/ui/gallery-paddlenav";
import type { GradeName } from "@/lib/voucher-type";

const GRADE_NAMES: GradeName[] = ["가", "통합", "라"];

interface MobilePricingPlansSectionProps {
  plans: PlanData[];
  selectedPlanId: string | null;
  onSelectPlan: (id: string) => void;
  showGradeToggle?: boolean;
  selectedGradeName?: GradeName;
  onGradeNameChange?: (name: GradeName) => void;
  onRequery?: () => void;
  blurred?: boolean;
  isLoading?: boolean;
  "data-component"?: string;
}

export function MobilePricingPlansSection({
  plans,
  selectedPlanId,
  onSelectPlan,
  showGradeToggle = false,
  selectedGradeName = "통합",
  onGradeNameChange,
  onRequery,
  blurred = false,
  isLoading = false,
  "data-component": dataComponent,
}: MobilePricingPlansSectionProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const activeIndex = GRADE_NAMES.indexOf(selectedGradeName);
  const [mobileGalleryIndex, setMobileGalleryIndex] = useState(0);
  const getComponent = (suffix: string) =>
    dataComponent ? `${dataComponent}-${suffix}` : undefined;

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) {
      return;
    }

    let frameId = 0;

    const updateIndex = () => {
      const cards = Array.from(grid.children) as HTMLElement[];
      if (!cards.length) {
        setMobileGalleryIndex(0);
        return;
      }

      const gridRect = grid.getBoundingClientRect();
      const gridCenter = gridRect.left + gridRect.width / 2;
      let nearestIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        const distance = Math.abs(center - gridCenter);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      setMobileGalleryIndex(nearestIndex);
    };

    const requestUpdate = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        updateIndex();
      });
    };

    updateIndex();
    grid.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      grid.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [plans.length]);

  const scrollMobileGallery = (direction: -1 | 1) => {
    const grid = gridRef.current;
    if (!grid) {
      return;
    }

    const cards = Array.from(grid.children) as HTMLElement[];
    if (!cards.length) {
      return;
    }

    const nextIndex = Math.max(
      0,
      Math.min(cards.length - 1, mobileGalleryIndex + direction)
    );
    const nextCard = cards[nextIndex];
    nextCard?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
    setMobileGalleryIndex(nextIndex);
  };

  return (
    <section
      className={cn("pricing-plans", blurred && "pricing-section--blurred")}
      data-component={dataComponent}
    >
      <div
        className="pricing-plans__heading"
        data-component={getComponent("heading")}
      >
        <h2
          className={cn("h2-left", "pricing-plans__title")}
          data-component={getComponent("title")}
        >
          <span
            className="pricing-plans__title-muted"
            data-component={getComponent("title-muted")}
          >
            뭘 좋아하실지 몰라서
            <br data-component={getComponent("title-muted-break")} />
            다 준비해 봤어요.
          </span>
          <br data-component={getComponent("title-break")} />
          <span
            className="pricing-plans__title-primary"
            data-component={getComponent("title-primary")}
          >
            산후도우미서비스 플랜
          </span>
        </h2>
      </div>

      {showGradeToggle && (
        <div
          className="pricing-plans__toggle-row"
          data-component={getComponent("toggle-row")}
        >
          <div
            className="pricing-plans__grade-toggle"
            role="tablist"
            aria-label="등급 선택"
            data-component={getComponent("grade-toggle")}
            style={
              {
                "--grade-tab-index": activeIndex,
                "--grade-tab-count": GRADE_NAMES.length,
              } as React.CSSProperties
            }
          >
            {GRADE_NAMES.map((name, index) => (
              <button
                key={name}
                type="button"
                role="tab"
                aria-selected={name === selectedGradeName}
                className={cn(
                  "pricing-plans__grade-tab",
                  name === selectedGradeName && "pricing-plans__grade-tab--active"
                )}
                onClick={() => onGradeNameChange?.(name)}
                data-component={getComponent(`grade-tab-${index + 1}`)}
              >
                {name} 등급
              </button>
            ))}
          </div>
        </div>
      )}

      <div
        className="pricing-plans__grid-wrapper"
        data-component={getComponent("grid-wrapper")}
      >
        {onRequery && (
          <div
            className="pricing-plans__requery-row"
            data-component={getComponent("requery-row")}
          >
            <button
              type="button"
              className="pricing-plans__requery-btn"
              onClick={onRequery}
              data-component={getComponent("requery-button")}
            >
              다시 조회
            </button>
          </div>
        )}

        <div
          className="pricing-plans__grid"
          ref={gridRef}
          data-component={getComponent("grid")}
        >
          {plans.map((plan, index) => (
            <PricingPlanCard
              key={plan.id}
              plan={plan}
              selected={plan.id === selectedPlanId}
              onSelect={() => onSelectPlan(plan.id)}
              isLoading={isLoading}
              data-component={getComponent(`card-${index + 1}`)}
            />
          ))}
        </div>

        <GalleryPaddlenav
          className="pricing-plans__paddlenav"
          previousLabel="이전 플랜"
          nextLabel="다음 플랜"
          previousDisabled={mobileGalleryIndex === 0}
          nextDisabled={mobileGalleryIndex === plans.length - 1}
          onPrevious={() => scrollMobileGallery(-1)}
          onNext={() => scrollMobileGallery(1)}
          data-component={getComponent("paddlenav")}
        />
      </div>
    </section>
  );
}
