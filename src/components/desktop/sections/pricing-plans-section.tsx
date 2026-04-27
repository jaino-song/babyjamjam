"use client";

import { cn } from "@/lib/utils";
import {
  PricingPlanCard,
  type PlanData,
} from "@/components/molecules/pricing-plan-card";
import type { GradeName } from "@/lib/voucher-type";

const GRADE_NAMES: GradeName[] = ["가", "통합", "라"];

interface DesktopPricingPlansSectionProps {
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

export function DesktopPricingPlansSection({
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
}: DesktopPricingPlansSectionProps) {
  const activeIndex = GRADE_NAMES.indexOf(selectedGradeName);
  const getComponent = (suffix: string) =>
    dataComponent ? `${dataComponent}-${suffix}` : undefined;

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
          className={cn("h3-left", "pricing-plans__title")}
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

        <div className="pricing-plans__grid" data-component={getComponent("grid")}>
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
      </div>
    </section>
  );
}
