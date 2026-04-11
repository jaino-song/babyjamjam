"use client";

import { cn } from "@/lib/utils";
import {
  PricingPlanCard,
  type PlanData,
} from "@/components/molecules/pricing-plan-card";
import type { GradeName } from "@/lib/voucher-type";

const GRADE_NAMES: GradeName[] = ["가", "통합", "라"];

interface PricingPlansSectionProps {
  plans: PlanData[];
  selectedPlanId: string | null;
  onSelectPlan: (id: string) => void;
  /** Show grade toggle only for subsidized */
  showGradeToggle?: boolean;
  selectedGradeName?: GradeName;
  onGradeNameChange?: (name: GradeName) => void;
  onRequery?: () => void;
  blurred?: boolean;
}

export function PricingPlansSection({
  plans,
  selectedPlanId,
  onSelectPlan,
  showGradeToggle = false,
  selectedGradeName = "통합",
  onGradeNameChange,
  onRequery,
  blurred = false,
}: PricingPlansSectionProps) {
  const activeIndex = GRADE_NAMES.indexOf(selectedGradeName);

  return (
    <section
      className={cn(
        "pricing-plans",
        blurred && "pricing-section--blurred"
      )}
      data-component="organism-pricing-plans-section"
    >
      <div className="pricing-plans__heading">
        <h2 className="h3-left pricing-plans__title">
          <span className="pricing-plans__title-muted">
            뭘 좋아하실지 몰라서 다 준비해 봤어요.
          </span>
          <br />
          <span className="pricing-plans__title-primary">
            산후도우미서비스 플랜
          </span>
        </h2>
      </div>

      {showGradeToggle && (
        <div className="pricing-plans__toggle-row">
          <div
            className="pricing-plans__grade-toggle"
            role="tablist"
            aria-label="등급 선택"
            style={{
              "--grade-tab-index": activeIndex,
              "--grade-tab-count": GRADE_NAMES.length,
            } as React.CSSProperties}
          >
            {GRADE_NAMES.map((name) => (
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
              >
                {name} 등급
              </button>
            ))}
          </div>
          {onRequery && (
            <button
              type="button"
              className="pricing-plans__requery-btn"
              onClick={onRequery}
            >
              다시 조회
            </button>
          )}
        </div>
      )}

      <div className="pricing-plans__grid">
        {plans.map((plan) => (
          <PricingPlanCard
            key={plan.id}
            plan={plan}
            selected={plan.id === selectedPlanId}
            onSelect={() => onSelectPlan(plan.id)}
          />
        ))}
      </div>
    </section>
  );
}
