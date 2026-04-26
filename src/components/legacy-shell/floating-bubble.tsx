"use client";

import { X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

import type { ConsultationSelectedServices as SelectedServicesPayload } from "@/lib/consultation/contracts";

import { LegacyBookingModal } from "./booking-modal";
import { PillCta } from "@/components/ui/circle-cta";
import { QuantityStepper } from "@/components/ui/quantity-stepper";

type LegacyAddonData = {
  id: string;
  name: string;
  description: string;
  price: string;
  note?: string;
  group?: string;
};

type LegacyPlanData = {
  id: string;
  name: string;
  description: string;
  price: string;
  badge?: string;
  features: string[];
  duration?: number;
};

type SelectedAddonCartItem = {
  addon: LegacyAddonData;
  quantity: number;
};

const cartItemStyle = {
  position: "relative",
} as const;

const removeButtonStyle = {
  position: "absolute",
  top: 5,
  right: 5,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 24,
  height: 24,
  padding: 0,
  border: "none",
  borderRadius: 0,
  background: "transparent",
  color: "var(--bjj-color-text-muted)",
  cursor: "pointer",
  lineHeight: 1,
} as const;

interface FloatingBubbleProps {
  distinctCount: number;
  showCart?: boolean;
  selectedPlan?: LegacyPlanData | null;
  selectedAddons?: SelectedAddonCartItem[];
  selectedServices?: SelectedServicesPayload;
  onRemovePlan?: () => void;
  onRemoveAddon?: (addonId: string) => void;
  onQuantityChange?: (addonId: string, quantity: number) => void;
}

export function LegacyFloatingBubble({
  distinctCount,
  showCart = true,
  selectedPlan = null,
  selectedAddons = [],
  selectedServices = { plan: null, addons: [] },
  onRemovePlan = () => {},
  onRemoveAddon = () => {},
  onQuantityChange = () => {},
}: FloatingBubbleProps) {
  const [mounted, setMounted] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const cartPanelId = useId();
  const cartTitleId = useId();
  const cartButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeCart = useCallback(() => {
    setIsCartOpen(false);
    requestAnimationFrame(() => cartButtonRef.current?.focus());
  }, []);

  const closeBooking = useCallback(() => setIsBookingOpen(false), []);

  useEffect(() => {
    if (!isCartOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      closeCart();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeCart, isCartOpen]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hasSelectedItems = selectedPlan !== null || selectedAddons.length > 0;

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3 max-mobile:bottom-4 max-mobile:right-4"
      data-component="organism-floating-bubble"
    >
      {showCart && isCartOpen && (
        <aside
          id={cartPanelId}
          className="floating-cart-panel"
          role="dialog"
          aria-modal={false}
          aria-labelledby={cartTitleId}
          data-component="organism-floating-cart-panel"
        >
          <header
            className="floating-cart-panel__header"
            data-component="organism-floating-cart-panel-header"
          >
            <div
              className="floating-cart-panel__title-group"
              data-component="organism-floating-cart-panel-title-group"
            >
              <h2
                id={cartTitleId}
                className="floating-cart-panel__title"
                data-component="organism-floating-cart-panel-title"
              >
                장바구니
              </h2>
              <p
                className="floating-cart-panel__count"
                data-component="organism-floating-cart-panel-count"
              >
                선택한 서비스 {distinctCount}개
              </p>
            </div>
            <PillCta
              className="floating-cart-panel__cta"
              onClick={() => setIsBookingOpen(true)}
            >
              상담신청
            </PillCta>
          </header>

          <div
            className="floating-cart-panel__body"
            data-component="organism-floating-cart-panel-body"
          >
            {!hasSelectedItems && (
              <div
                className="floating-cart-panel__empty"
                data-component="organism-floating-cart-panel-empty"
              >
                <p className="floating-cart-panel__empty-title">
                  선택한 서비스가 없습니다.
                </p>
                <p className="floating-cart-panel__empty-copy">
                  플랜과 추가 서비스를 선택하면 여기에 표시됩니다.
                </p>
              </div>
            )}

            {selectedPlan && (
              <article
                className="floating-cart-panel__item"
                style={cartItemStyle}
                data-component="organism-floating-cart-panel-plan-item"
              >
                <div
                  className="floating-cart-panel__item-main"
                  data-component="organism-floating-cart-panel-plan-main"
                >
                  <span className="floating-cart-panel__eyebrow">
                    산후도우미서비스 플랜
                  </span>
                  <h3 className="floating-cart-panel__item-name">
                    {selectedPlan.name}
                  </h3>
                  <p className="floating-cart-panel__item-price">
                    {selectedPlan.price}
                  </p>
                </div>
                <button
                  type="button"
                  className="floating-cart-panel__item-remove"
                  style={removeButtonStyle}
                  onClick={onRemovePlan}
                  aria-label={`${selectedPlan.name} 플랜 삭제`}
                  data-component="organism-floating-cart-panel-plan-remove"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              </article>
            )}

            {selectedAddons.map(({ addon, quantity }) => (
              <article
                key={addon.id}
                className="floating-cart-panel__item floating-cart-panel__item--addon"
                style={cartItemStyle}
                data-component="organism-floating-cart-panel-addon-item"
              >
                <div
                  className="floating-cart-panel__item-main"
                  data-component="organism-floating-cart-panel-addon-main"
                >
                  <span className="floating-cart-panel__eyebrow">
                    추가 서비스
                  </span>
                  <h3 className="floating-cart-panel__item-name">
                    {addon.name}
                  </h3>
                  <p className="floating-cart-panel__item-price">
                    {addon.price}
                  </p>
                </div>
                <QuantityStepper
                  value={quantity}
                  min={1}
                  onChange={(nextQuantity) =>
                    onQuantityChange(addon.id, nextQuantity)
                  }
                  className="floating-cart-panel__qty"
                />
                <button
                  type="button"
                  className="floating-cart-panel__item-remove"
                  style={removeButtonStyle}
                  onClick={() => onRemoveAddon(addon.id)}
                  aria-label={`${addon.name} 삭제`}
                  data-component="organism-floating-cart-panel-addon-remove"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              </article>
            ))}
          </div>
        </aside>
      )}

      <button
        type="button"
        className="w-14 h-14 rounded-full border-none bg-bjj-primary cursor-pointer flex items-center justify-center shadow-[0_4px_6px_-4px_rgba(0,0,0,0.1),0_10px_15px_rgba(0,0,0,0.1)] transition-[transform,box-shadow] duration-200 hover:scale-105 hover:shadow-[0_6px_12px_rgba(0,0,0,0.15)]"
        onClick={handleScrollToTop}
        aria-label="위로 스크롤"
        data-component="organism-floating-bubble-scroll-top-button"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 15L12 9L18 15"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {showCart && (
        <>
          <div
            className="relative"
            data-component="organism-floating-bubble-cart"
          >
            <button
              ref={cartButtonRef}
              type="button"
              className="w-14 h-14 rounded-full border-none bg-bjj-primary cursor-pointer flex items-center justify-center shadow-[0_4px_6px_-4px_rgba(0,0,0,0.1),0_10px_15px_rgba(0,0,0,0.1)] transition-[transform,box-shadow] duration-200 hover:scale-105 hover:shadow-[0_6px_12px_rgba(0,0,0,0.15)]"
              onClick={() => setIsCartOpen((current) => !current)}
              aria-label={`선택한 서비스 ${distinctCount}개`}
              aria-expanded={isCartOpen}
              aria-controls={cartPanelId}
              data-component="organism-floating-bubble-cart-button"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 6H21"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {distinctCount > 0 && (
              <span
                className="absolute -top-1 -right-1 min-w-5 h-5 px-1.5 bg-red-500 rounded-full flex items-center justify-center font-heading font-bold text-xs leading-none text-white shadow-[0_2px_4px_-2px_rgba(0,0,0,0.1)]"
                data-component="organism-floating-bubble-cart-badge"
              >
                {distinctCount}
              </span>
            )}
          </div>
          <LegacyBookingModal
            open={isBookingOpen}
            onClose={closeBooking}
            selectedServices={selectedServices}
          />
        </>
      )}
    </div>,
    document.body
  );
}
