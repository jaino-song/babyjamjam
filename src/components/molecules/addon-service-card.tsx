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
  "data-component"?: string;
}

export function AddonServiceCard({
  addon,
  quantity,
  added,
  onAdd,
  onRemove,
  onQuantityChange,
  "data-component": dataComponent,
}: AddonServiceCardProps) {
  return (
    <div
      className={cn("addon-card", added && "addon-card--added")}
      data-component={dataComponent}
    >
      <div
        className="addon-card__inner"
        data-component={dataComponent ? `${dataComponent}-inner` : undefined}
      >
        <h3
          className="addon-card__name"
          data-component={dataComponent ? `${dataComponent}-name` : undefined}
        >
          {addon.name}
        </h3>

        {addon.note ? (
          <div
            className="addon-card__note"
            data-component={dataComponent ? `${dataComponent}-note` : undefined}
          >
            <span className="addon-card__note-text">{addon.note}</span>
          </div>
        ) : (
          <p
            className="addon-card__description"
            data-component={dataComponent ? `${dataComponent}-description` : undefined}
          >
            {addon.description}
          </p>
        )}

        <p
          className="addon-card__price"
          data-component={dataComponent ? `${dataComponent}-price` : undefined}
        >
          {addon.price}
        </p>

        <div
          className="addon-card__actions"
          data-component={dataComponent ? `${dataComponent}-actions` : undefined}
        >
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
            data-component={dataComponent ? `${dataComponent}-button` : undefined}
          >
            {added ? "추가 완료" : "서비스 추가하기"}
          </button>
        </div>
      </div>
    </div>
  );
}
