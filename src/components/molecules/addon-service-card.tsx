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
      className={cn("addon-card", added && "addon-card--added")}
      data-component="molecule-addon-service-card"
    >
      <div className="addon-card__inner">
        <h3 className="addon-card__name">{addon.name}</h3>

        {addon.note ? (
          <div className="addon-card__note">
            <span className="addon-card__note-check" aria-hidden="true">
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
            <span className="addon-card__note-text">{addon.note}</span>
          </div>
        ) : (
          <p className="addon-card__description">{addon.description}</p>
        )}

        <p className="addon-card__price">{addon.price}</p>

        <div className="addon-card__actions">
          <QuantityStepper
            value={quantity}
            min={1}
            onChange={onQuantityChange}
          />
          <button
            type="button"
            className={cn(
              "addon-card__btn",
              added ? "addon-card__btn--added" : "addon-card__btn--default"
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
