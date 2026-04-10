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
}

export function PricingPlanCard({
  plan,
  selected = false,
  onSelect,
}: PricingPlanCardProps) {
  return (
    <div
      className={cn(
        "p-px bg-bjj-bg rounded-card shadow-[0_1px_2px_-1px_rgba(0,0,0,0.1),0_1px_3px_0_rgba(0,0,0,0.1)] outline outline-1 -outline-offset-1 outline-bjj-divider flex flex-col overflow-hidden",
        selected && "outline-bjj-primary outline-2",
      )}
      data-component="molecule-pricing-plan-card"
    >
      <div className="p-5 flex flex-col items-center gap-[18px]">
        <div className="flex justify-between items-start w-full">
          <h3 className="font-heading font-extrabold text-[24px] leading-[1.2] text-bjj-text-dark">
            {plan.name}
          </h3>
          {plan.badge && (
            <span className="py-1 px-2.5 bg-bjj-primary rounded-full font-body font-medium text-[12px] leading-[1.5] tracking-[0.03em] text-white whitespace-nowrap">
              {plan.badge}
            </span>
          )}
        </div>

        {plan.description && (
          <p className="font-body font-medium text-[16px] leading-[1.5] tracking-[0.03em] text-bjj-text-paragraph w-full min-h-12">
            {plan.description}
          </p>
        )}

        <p className="font-heading font-extrabold text-[24px] leading-[1.2] text-bjj-text-dark w-full">
          {plan.price}
        </p>

        <button
          type="button"
          className={cn(
            "w-full py-2.5 rounded-full border-none font-heading font-semibold text-[13px] leading-[1.5] cursor-pointer transition-opacity duration-200 hover:opacity-90",
            selected
              ? "bg-white text-bjj-primary border border-bjj-primary"
              : "bg-bjj-primary text-white border border-bjj-primary",
          )}
          onClick={onSelect}
        >
          {selected ? "선택 완료" : "플랜 선택하기"}
        </button>
      </div>

      <div className="p-5 border-t border-[#f3f4f6] flex flex-col gap-2.5">
        {plan.features.map((feature) => (
          <div key={feature} className="flex items-start gap-2">
            <span
              className="flex items-center justify-center w-4 h-4 shrink-0 rounded-full bg-[#f9fafb] text-bjj-primary mt-0.5"
              aria-hidden="true"
            >
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
            <span className="font-body font-medium text-[10px] leading-[1.5] tracking-[0.03em] text-bjj-text-paragraph">
              {feature}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
