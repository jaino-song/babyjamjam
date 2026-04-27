"use client";

import { cn } from "@/lib/utils";

export type PlanData = {
  id: string;
  name: string;
  description: string;
  price: string;
  badge?: string;
  features: string[];
  duration?: number;
};

interface PricingPlanCardProps {
  plan: PlanData;
  selected?: boolean;
  onSelect?: () => void;
  isLoading?: boolean;
  "data-component"?: string;
}

export function PricingPlanCard({
  plan,
  selected = false,
  onSelect,
  isLoading = false,
  "data-component": dataComponent,
}: PricingPlanCardProps) {
  return (
    <div
      className={cn("plan-card", selected && "plan-card--selected")}
      data-component={dataComponent}
    >
      <div className="plan-card__top">
        <div
          className="plan-card__header"
          data-component={dataComponent ? `${dataComponent}-header` : undefined}
        >
          <h3
            className="plan-card__name"
            data-component={dataComponent ? `${dataComponent}-name` : undefined}
          >
            {plan.name}
          </h3>
          {plan.badge && (
            <span
              className="plan-card__badge"
              data-component={dataComponent ? `${dataComponent}-badge` : undefined}
            >
              {plan.badge}
            </span>
          )}
        </div>

        {plan.description && (
          <p
            className="plan-card__description"
            data-component={dataComponent ? `${dataComponent}-description` : undefined}
          >
            {plan.description}
          </p>
        )}

        <p
          className={cn(
            "plan-card__price",
            isLoading && "plan-card__price--loading"
          )}
          data-component={dataComponent ? `${dataComponent}-price` : undefined}
        >
          <span className="plan-card__price-value">{plan.price}</span>
          <span className="skeleton skeleton--price" aria-hidden="true" />
        </p>

        <button
          type="button"
          disabled={isLoading}
          className={cn(
            "plan-card__btn",
            selected ? "plan-card__btn--selected" : "plan-card__btn--default"
          )}
          onClick={onSelect}
          data-component={dataComponent ? `${dataComponent}-button` : undefined}
        >
          {selected ? "선택 완료" : "플랜 선택하기"}
        </button>
      </div>

      <div
        className="plan-card__features"
        data-component={dataComponent ? `${dataComponent}-features` : undefined}
      >
        {plan.features.map((feature, index) => (
          <div
            key={feature}
            className="plan-card__feature"
            data-component={
              dataComponent ? `${dataComponent}-feature-${index}` : undefined
            }
          >
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
