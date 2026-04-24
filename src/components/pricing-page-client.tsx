"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import {
  PricingFormModal,
  type FormAnswers,
} from "@/components/organisms/pricing-form-modal";
import {
  PricingPlansSection,
} from "@/components/organisms/pricing-plans-section";
import {
  AddonServicesSection,
} from "@/components/organisms/addon-services-section";
import type { PlanData } from "@/components/molecules/pricing-plan-card";
import type { AddonData } from "@/components/molecules/addon-service-card";
import { usePricingStore } from "@/lib/pricing-store";

// --- Placeholder data shown behind blur ---

const PLACEHOLDER_PLANS: PlanData[] = [
  { id: "ph-1", name: "5일", description: "소중한 아기와 함께하는 새로운 시작이 힘들지 않도록 필요한 만큼만.", price: "---,---원", badge: "환급 가능", features: ["프리미엄 출퇴근 산후도우미 서비스", "식사 장보기 및 산모님 식사 서비스 제공", "실시간 서비스 퀄리티 모니터링", "전문가의 신생아 케어 서비스 제공", "본인부담금 환급 가능"] },
  { id: "ph-2", name: "10일", description: "임신 기간 동안 지친 몸과 마음을 돌보고 회복할 수 있도록.", price: "---,---원", badge: "환급 가능", features: ["프리미엄 출퇴근 산후도우미 서비스", "식사 장보기 및 산모님 식사 서비스 제공", "실시간 서비스 퀄리티 모니터링", "전문가의 신생아 케어 서비스 제공", "유축기 무료 대여 서비스 제공", "본인부담금 환급 가능"] },
  { id: "ph-3", name: "15일", description: "전문가에게 육아 노하우를 배우고, 지친 몸과 마음의 완벽한 회복을 위해.", price: "---,---원", badge: "환급 가능", features: ["프리미엄 출퇴근 산후도우미 서비스", "식사 장보기 및 산모님 식사 서비스 제공", "실시간 서비스 퀄리티 모니터링", "전문가의 신생아 케어 서비스 제공", "유축기 무료 대여 서비스 제공", "본인부담금 환급 가능", "서비스 연장 시 추가 할인 제공"] },
];

const PLACEHOLDER_ADDONS: AddonData[] = [
  { id: "ph-twin", name: "쌍둥이 케어 서비스", description: "우리 집에 찾아온 두배의 기적.\n비용은 두배 보다 적은 또다른 기적.", price: "---,---원", group: "care" },
  { id: "ph-school", name: "취학 자녀 케어 서비스", description: "알아서 잘 하는 우리 아이지만\n엄마의 사랑은 똑같이 필요하니까.", price: "---,---원", group: "care" },
  { id: "ph-preschool", name: "미취학 자녀 케어 서비스", description: "부모님의 케어가 필요한 우리 아이가\n계속해서 잘 자랄 수 있도록.", price: "---,---원", group: "care" },
  { id: "ph-family", name: "가족 추가", description: "지켜야할 소중한 가족이 우리 아기만\n있는건 아니니까.", price: "---,---원", group: "care" },
  { id: "ph-pump", name: "유축기 대여 서비스", description: "", note: "정규 서비스 제공 시간 외 추가 시간", price: "---,---원", group: "care" },
  { id: "ph-sat", name: "토요일 서비스", description: "09:00 부터 14:00 까지\n파트타임 서비스 추가", price: "---,---원", group: "schedule" },
  { id: "ph-hol", name: "공휴일 서비스", description: "법정공휴일 및 일요일에도 서비스 이용이 필요할 때.", price: "---,---원", group: "schedule" },
  { id: "ph-hours", name: "서비스 추가 시간", description: "", note: "정규 서비스 제공 시간 외 추가 시간", price: "시간 당 ---,---원", group: "schedule" },
];

// --- Component ---

export function PricingPageClient() {
  const store = usePricingStore();
  const [showFormModal, setShowFormModal] = useState(false);
  const plansRef = useRef<HTMLDivElement>(null);

  const isSubsidized = store.formAnswers.subsidy === "yes";

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showFormModal) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [showFormModal]);

  // Re-fetch when grade name changes (subsidized only)
  useEffect(() => {
    if (!store.pricesRevealed || !isSubsidized) return;
    store.fetchPricing(store.formAnswers, store.selectedGradeName);
  }, [store.selectedGradeName]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = useCallback(async (finalAnswers: FormAnswers) => {
    await store.fetchPricing(finalAnswers, store.selectedGradeName);
    setShowFormModal(false);
    setTimeout(() => {
      plansRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, [store.selectedGradeName, store.fetchPricing]);

  const displayPlans = store.pricesRevealed ? store.plans : PLACEHOLDER_PLANS;
  const displayAddons = store.pricesRevealed ? store.addons : PLACEHOLDER_ADDONS;

  return (
    <>
      <div className="pricing-plans-wrapper" ref={plansRef}>
        <PricingPlansSection
            plans={displayPlans}
            selectedPlanId={store.selectedPlanId}
            onSelectPlan={store.selectPlan}
            showGradeToggle={store.pricesRevealed && isSubsidized}
            selectedGradeName={store.selectedGradeName}
            onGradeNameChange={store.setGradeName}
            onRequery={() => setShowFormModal(true)}
            blurred={!store.pricesRevealed}
            isLoading={store.isLoading}
          />

          {!store.pricesRevealed && (
            <div className="pricing-modal-overlay">
              <div className="pricing-cta-card">
                <h2 className="pricing-cta-card__title">서비스 가격 조회</h2>
                <p className="pricing-cta-card__label">정확한 가격을 알아볼까요?</p>
                <button
                  type="button"
                  className="pricing-cta-card__btn"
                  onClick={() => setShowFormModal(true)}
                >
                  시작하기
                </button>
              </div>
            </div>
          )}
      </div>

      <AddonServicesSection
        addons={displayAddons}
        selections={store.addonSelections}
        onAdd={store.addAddon}
        onRemove={store.removeAddon}
        onQuantityChange={store.setAddonQty}
        blurred={!store.pricesRevealed}
        planDuration={store.plans.find((p) => p.id === store.selectedPlanId)?.duration}
      />

      {showFormModal && typeof window !== "undefined" &&
        createPortal(
          <div className="pricing-form-overlay" onClick={() => setShowFormModal(false)}>
            <div onClick={(e) => e.stopPropagation()}>
              <PricingFormModal
                answers={store.formAnswers}
                onAnswer={store.answer}
                onSubmit={handleSubmit}
                isLoading={store.isLoading}
              />
            </div>
          </div>,
          document.body
        )
      }
    </>
  );
}
