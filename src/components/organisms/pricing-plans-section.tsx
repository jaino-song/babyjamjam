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
        "flex flex-col items-center w-full gap-10",
        blurred && "blur-[12px] pointer-events-none select-none transition-[filter] duration-500",
      )}
      data-component="organism-pricing-plans-section"
    >
      <div className="w-full">
        <h2 className="h3-left">
          <span className="text-bjj-text-muted">
            뭘 좋아하실지 몰라서 다 준비해 봤어요.
          </span>
          <br />
          <span className="text-bjj-primary">
            산후도우미서비스 플랜
          </span>
        </h2>
      </div>

      {showGradeToggle && (
        <div className="relative flex justify-center items-center w-full">
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
                  "relative z-[1] inline-flex items-center justify-center h-10 border-none bg-transparent rounded-full px-5 font-heading font-extrabold text-[13px] leading-none tracking-[-0.025em] text-bjj-text-paragraph cursor-pointer transition-colors duration-[250ms] whitespace-nowrap",
                  name === selectedGradeName && "text-bjj-primary-light",
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
              className="absolute right-0 inline-flex items-center justify-center h-10 px-5 border-none rounded-full bg-bjj-primary text-bjj-primary-light font-heading font-extrabold text-[13px] leading-none tracking-[-0.025em] cursor-pointer whitespace-nowrap transition-opacity duration-200 hover:opacity-85"
              onClick={onRequery}
            >
              다시 조회
            </button>
          )}
        </div>
      )}

      <div className="grid grid-cols-3 gap-5 w-full max-tablet:grid-cols-2 max-mobile:grid-cols-1">
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
