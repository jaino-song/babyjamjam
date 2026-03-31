"use client";

import { cn } from "@/lib/utils";

interface QuantityStepperProps {
  value: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  className?: string;
  disabled?: boolean;
}

export function QuantityStepper({
  value,
  min = 1,
  max = 99,
  onChange,
  className,
  disabled = false,
}: QuantityStepperProps) {
  const canDecrement = value > min && !disabled;
  const canIncrement = value < max && !disabled;

  return (
    <div
      className={cn("qty-stepper", className)}
      data-component="ui-quantity-stepper"
    >
      <button
        type="button"
        className="qty-stepper__btn"
        onClick={() => canDecrement && onChange?.(value - 1)}
        disabled={!canDecrement}
        aria-label="수량 줄이기"
      >
        <svg width="12" height="2" viewBox="0 0 12 2" fill="none" aria-hidden="true">
          <path
            d="M1 1H11"
            stroke="currentColor"
            strokeWidth="1.67"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <span className="qty-stepper__value">{value}</span>

      <button
        type="button"
        className="qty-stepper__btn"
        onClick={() => canIncrement && onChange?.(value + 1)}
        disabled={!canIncrement}
        aria-label="수량 늘리기"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path
            d="M1 6H11M6 1V11"
            stroke="currentColor"
            strokeWidth="1.67"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
