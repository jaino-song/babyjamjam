"use client";

import { cn } from "@/lib/utils";
import { QuantityStepper } from "@/components/ui/quantity-stepper";

export type AddonData = {
  id: string;
  name: string;
  description: string;
  price: string;
  /** Optional check-mark note shown below description */
  note?: string;
  /** Group key for visual grouping */
  group?: string;
};

interface AddonServiceCardProps {
  addon: AddonData;
  quantity: number;
  added: boolean;
  onAdd?: () => void;
  onRemove?: () => void;
  onQuantityChange?: (qty: number) => void;
}

export function AddonServiceCard({
  addon,
  quantity,
  added,
  onAdd,
  onRemove,
  onQuantityChange,
}: AddonServiceCardProps) {
  return (
    <div
      className="w-full p-6 bg-bjj-bg rounded-xl shadow-[0_0_6px_3px_rgba(0,0,0,0.06)] overflow-hidden"
      data-component="molecule-addon-service-card"
    >
      <div className="p-5 flex flex-col items-center gap-[18px]">
        <h3 className="font-heading font-extrabold text-[24px] leading-[1.2] text-bjj-text-dark w-full">
          {addon.name}
        </h3>

        {addon.note ? (
          <div className="flex items-center gap-2 w-full">
            <span
              className="flex items-center justify-center w-4 h-4 shrink-0 rounded-full bg-[#f9fafb] text-bjj-primary"
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
            <span className="font-body font-medium text-[16px] leading-[1.5] tracking-[0.03em] text-bjj-text-paragraph">
              {addon.note}
            </span>
          </div>
        ) : (
          <p className="font-body font-medium text-[16px] leading-[1.5] tracking-[0.03em] text-bjj-text-paragraph w-full">
            {addon.description}
          </p>
        )}

        <p className="font-heading font-extrabold text-[24px] leading-[1.2] text-bjj-text-dark w-full">
          {addon.price}
        </p>

        <div className="flex items-center gap-2 w-full">
          <QuantityStepper
            value={quantity}
            min={1}
            onChange={onQuantityChange}
          />
          <button
            type="button"
            className={cn(
              "flex-1 py-2.5 rounded-full border-none font-heading font-semibold text-[13px] leading-[1.5] cursor-pointer transition-opacity duration-200 hover:opacity-90",
              added
                ? "bg-white text-bjj-primary border border-bjj-primary"
                : "bg-bjj-primary text-white border border-bjj-primary",
            )}
            onClick={added ? onRemove : onAdd}
          >
            {added ? "추가 완료" : "서비스 추가하기"}
          </button>
        </div>
      </div>
    </div>
  );
}
