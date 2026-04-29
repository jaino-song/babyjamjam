"use client";

import { X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

import type { AddonData } from "@/components/molecules/addon-service-card";
import type { PlanData } from "@/components/molecules/pricing-plan-card";
import { PillCta } from "@/components/ui/circle-cta";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import type { ConsultationSelectedServices as SelectedServicesPayload } from "@/lib/consultation/contracts";

import { DesktopBookingModal } from "./booking-modal";

type SelectedAddonCartItem = {
  addon: AddonData;
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

interface DesktopFloatingBubbleProps {
  "data-component"?: string;
  distinctCount: number;
  showCart?: boolean;
  selectedPlan?: PlanData | null;
  selectedAddons?: SelectedAddonCartItem[];
  selectedServices?: SelectedServicesPayload;
  onRemovePlan?: () => void;
  onRemoveAddon?: (addonId: string) => void;
  onQuantityChange?: (addonId: string, quantity: number) => void;
}

export function DesktopFloatingBubble({
  "data-component": dataComponent,
  distinctCount,
  showCart = true,
  selectedPlan = null,
  selectedAddons = [],
  selectedServices = { plan: null, addons: [] },
  onRemovePlan = () => {},
  onRemoveAddon = () => {},
  onQuantityChange = () => {},
}: DesktopFloatingBubbleProps) {
  const [mounted, setMounted] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const cartPanelId = useId();
  const cartTitleId = useId();
  const cartButtonRef = useRef<HTMLButtonElement>(null);
  const getDataComponent = (suffix?: string) =>
    dataComponent ? (suffix ? `${dataComponent}_${suffix}` : dataComponent) : undefined;

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
      className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3"
      data-component={getDataComponent()}
    >
      {showCart && isCartOpen && (
        <aside
          id={cartPanelId}
          className="floating-cart-panel"
          role="dialog"
          aria-modal={false}
          aria-labelledby={cartTitleId}
          data-component={getDataComponent("cart-panel")}
        >
          <header
            className="floating-cart-panel__header"
            data-component={getDataComponent("cart-panel-header")}
          >
            <div
              className="floating-cart-panel__title-group"
              data-component={getDataComponent("cart-panel-title-group")}
            >
              <h2
                id={cartTitleId}
                className="floating-cart-panel__title"
                data-component={getDataComponent("cart-panel-title")}
              >
                장바구니
              </h2>
              <p
                className="floating-cart-panel__count"
                data-component={getDataComponent("cart-panel-count")}
              >
                선택한 서비스 {distinctCount}개
              </p>
            </div>
            <PillCta
              className="floating-cart-panel__cta"
              onClick={() => setIsBookingOpen(true)}
              data-component={getDataComponent("cart-panel-cta")}
            >
              상담 신청
            </PillCta>
          </header>

          <div
            className="floating-cart-panel__body"
            data-component={getDataComponent("cart-panel-body")}
          >
            {!hasSelectedItems && (
              <div
                className="floating-cart-panel__empty"
                data-component={getDataComponent("cart-panel-empty")}
              >
                <p
                  className="floating-cart-panel__empty-title"
                  data-component={getDataComponent("cart-panel-empty-title")}
                >
                  선택한 서비스가 없습니다.
                </p>
                <p
                  className="floating-cart-panel__empty-copy"
                  data-component={getDataComponent("cart-panel-empty-copy")}
                >
                  플랜과 추가 서비스를 선택하면 여기에 표시됩니다.
                </p>
              </div>
            )}

            {selectedPlan && (
              <article
                className="floating-cart-panel__item"
                style={cartItemStyle}
                data-component={getDataComponent("cart-panel-plan-item")}
              >
                <div
                  className="floating-cart-panel__item-main"
                  data-component={getDataComponent("cart-panel-plan-main")}
                >
                  <span
                    className="floating-cart-panel__eyebrow"
                    data-component={getDataComponent("cart-panel-plan-eyebrow")}
                  >
                    산후도우미서비스 플랜
                  </span>
                  <h3
                    className="floating-cart-panel__item-name"
                    data-component={getDataComponent("cart-panel-plan-name")}
                  >
                    {selectedPlan.name}
                  </h3>
                  <p
                    className="floating-cart-panel__item-price"
                    data-component={getDataComponent("cart-panel-plan-price")}
                  >
                    {selectedPlan.price}
                  </p>
                </div>
                <button
                  type="button"
                  className="floating-cart-panel__item-remove"
                  style={removeButtonStyle}
                  onClick={onRemovePlan}
                  aria-label={`${selectedPlan.name} 플랜 삭제`}
                  data-component={getDataComponent("cart-panel-plan-remove")}
                >
                  <X
                    size={16}
                    aria-hidden="true"
                    data-component={getDataComponent("cart-panel-plan-remove-icon")}
                  />
                </button>
              </article>
            )}

            {selectedAddons.map(({ addon, quantity }) => (
              <article
                key={addon.id}
                className="floating-cart-panel__item floating-cart-panel__item--addon"
                style={cartItemStyle}
                data-component={getDataComponent("cart-panel-addon-item")}
              >
                <div
                  className="floating-cart-panel__item-main"
                  data-component={getDataComponent("cart-panel-addon-main")}
                >
                  <span
                    className="floating-cart-panel__eyebrow"
                    data-component={getDataComponent("cart-panel-addon-eyebrow")}
                  >
                    추가 서비스
                  </span>
                  <h3
                    className="floating-cart-panel__item-name"
                    data-component={getDataComponent("cart-panel-addon-name")}
                  >
                    {addon.name}
                  </h3>
                  <p
                    className="floating-cart-panel__item-price"
                    data-component={getDataComponent("cart-panel-addon-price")}
                  >
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
                  data-component={getDataComponent("cart-panel-addon-quantity")}
                />
                <button
                  type="button"
                  className="floating-cart-panel__item-remove"
                  style={removeButtonStyle}
                  onClick={() => onRemoveAddon(addon.id)}
                  aria-label={`${addon.name} 삭제`}
                  data-component={getDataComponent("cart-panel-addon-remove")}
                >
                  <X
                    size={16}
                    aria-hidden="true"
                    data-component={getDataComponent("cart-panel-addon-remove-icon")}
                  />
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
        data-component={getDataComponent("scroll-top-button")}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          data-component={getDataComponent("scroll-top-icon")}
        >
          <path
            d="M6 15L12 9L18 15"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            data-component={getDataComponent("scroll-top-icon-path")}
          />
        </svg>
      </button>

      {showCart && (
        <>
          <div
            className="relative"
            data-component={getDataComponent("cart")}
          >
            <button
              ref={cartButtonRef}
              type="button"
              className="w-14 h-14 rounded-full border-none bg-bjj-primary cursor-pointer flex items-center justify-center shadow-[0_4px_6px_-4px_rgba(0,0,0,0.1),0_10px_15px_rgba(0,0,0,0.1)] transition-[transform,box-shadow] duration-200 hover:scale-105 hover:shadow-[0_6px_12px_rgba(0,0,0,0.15)]"
              onClick={() => setIsCartOpen((current) => !current)}
              aria-label={`선택한 서비스 ${distinctCount}개`}
              aria-expanded={isCartOpen}
              aria-controls={cartPanelId}
              data-component={getDataComponent("cart-button")}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                data-component={getDataComponent("cart-icon")}
              >
                <path
                  d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  data-component={getDataComponent("cart-icon-outline-path")}
                />
                <path
                  d="M3 6H21"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  data-component={getDataComponent("cart-icon-rim-path")}
                />
                <path
                  d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  data-component={getDataComponent("cart-icon-handle-path")}
                />
              </svg>
            </button>

            {distinctCount > 0 && (
              <span
                className="absolute -top-1 -right-1 min-w-5 h-5 px-1.5 bg-red-500 rounded-full flex items-center justify-center font-heading font-bold text-xs leading-none text-white shadow-[0_2px_4px_-2px_rgba(0,0,0,0.1)]"
                data-component={getDataComponent("cart-badge")}
              >
                {distinctCount}
              </span>
            )}
          </div>
          <DesktopBookingModal
            open={isBookingOpen}
            onClose={closeBooking}
            selectedServices={selectedServices}
            data-component={getDataComponent("booking-modal")}
          />
        </>
      )}
    </div>,
    document.body
  );
}
