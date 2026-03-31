"use client";

import { cn } from "@/lib/utils";

export type PlanData = {
  id: string;
  name: string;
  description: string;
  price: string;
  badge?: string;
  features: string[];
};

interface PricingPlanCardProps {
  plan: PlanData;
  selected?: boolean;
  onSelect?: () => void;
}

export function PricingPlanCard({
  plan,
  selected = false,
  onSelect,
}: PricingPlanCardProps) {
  return (
    <div
      className={cn("plan-card", selected && "plan-card--selected")}
      data-component="molecule-pricing-plan-card"
    >
      <div className="plan-card__top">
        <div className="plan-card__header">
          <h3 className="plan-card__name">{plan.name}</h3>
          {plan.badge && <span className="plan-card__badge">{plan.badge}</span>}
        </div>

        {plan.description && (
          <p className="plan-card__description">{plan.description}</p>
        )}

        <p className="plan-card__price">{plan.price}</p>

        <button
          type="button"
          className={cn(
            "plan-card__btn",
            selected ? "plan-card__btn--selected" : "plan-card__btn--default"
          )}
          onClick={onSelect}
        >
          {selected ? "선택 완료" : "플랜 선택하기"}
        </button>
      </div>

      <div className="plan-card__features">
        {plan.features.map((feature) => (
          <div key={feature} className="plan-card__feature">
            <span className="plan-card__check" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2.33 7L5.83 10.5L11.67 3.5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="plan-card__feature-text">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
