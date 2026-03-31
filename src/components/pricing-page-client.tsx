"use client";

import { useReducer, useCallback, useEffect, useRef } from "react";

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
import { FloatingBubble } from "@/components/organisms/floating-bubble";
import type { PlanData } from "@/components/molecules/pricing-plan-card";
import type { AddonData } from "@/components/molecules/addon-service-card";
import type { GradeName, ChildType } from "@/lib/voucher-type";
import { resolveGrade, resolveTier, buildTypeCode } from "@/lib/voucher-type";

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

// --- State ---

type State = {
  formAnswers: FormAnswers;
  pricesRevealed: boolean;
  isLoading: boolean;
  plans: PlanData[];
  addons: AddonData[];
  selectedPlanId: string | null;
  addonSelections: Map<string, number>;
  selectedGradeName: GradeName;
};

type Action =
  | { type: "ANSWER"; questionId: string; value: string }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS"; plans: PlanData[]; addons: AddonData[] }
  | { type: "SUBMIT_ERROR" }
  | { type: "SELECT_PLAN"; planId: string }
  | { type: "ADD_ADDON"; addonId: string }
  | { type: "REMOVE_ADDON"; addonId: string }
  | { type: "SET_ADDON_QTY"; addonId: string; qty: number }
  | { type: "SET_GRADE_NAME"; gradeName: GradeName };

const initialState: State = {
  formAnswers: {},
  pricesRevealed: false,
  isLoading: false,
  plans: [],
  addons: [],
  selectedPlanId: null,
  addonSelections: new Map(),
  selectedGradeName: "통합",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ANSWER": {
      const next = { ...state.formAnswers, [action.questionId]: action.value };
      if (action.questionId === "subsidy") {
        const resetKeys = [
          "childType", "premature", "disability",
          "birthOrder", "staffCount",
          "servicePeriod", "liveIn",
        ];
        for (const k of resetKeys) delete next[k];
      }
      if (["childType", "premature", "disability"].includes(action.questionId)) {
        delete next.birthOrder;
        delete next.staffCount;
      }
      return { ...state, formAnswers: next };
    }
    case "SUBMIT_START":
      return { ...state, isLoading: true };
    case "SUBMIT_SUCCESS":
      return {
        ...state,
        isLoading: false,
        pricesRevealed: true,
        plans: action.plans,
        addons: action.addons,
        selectedPlanId: null,
        addonSelections: new Map(),
      };
    case "SUBMIT_ERROR":
      return { ...state, isLoading: false };
    case "SELECT_PLAN": {
      const plan = state.plans.find((p) => p.id === action.planId);
      const duration = plan?.duration ?? 1;
      // Sync care group addon quantities to the selected plan's duration
      const m = new Map(state.addonSelections);
      for (const addon of state.addons) {
        if (addon.group === "care" && m.has(addon.id)) {
          m.set(addon.id, duration);
        }
      }
      return { ...state, selectedPlanId: action.planId, addonSelections: m };
    }
    case "ADD_ADDON": {
      const m = new Map(state.addonSelections);
      const addon = state.addons.find((a) => a.id === action.addonId);
      const selectedPlan = state.plans.find((p) => p.id === state.selectedPlanId);
      // Care group addons default to the selected plan's duration
      const defaultQty =
        addon?.group === "care" && selectedPlan?.duration
          ? selectedPlan.duration
          : 1;
      m.set(action.addonId, defaultQty);
      return { ...state, addonSelections: m };
    }
    case "REMOVE_ADDON": {
      const m = new Map(state.addonSelections);
      m.delete(action.addonId);
      return { ...state, addonSelections: m };
    }
    case "SET_ADDON_QTY": {
      const m = new Map(state.addonSelections);
      m.set(action.addonId, action.qty);
      return { ...state, addonSelections: m };
    }
    case "SET_GRADE_NAME":
      return { ...state, selectedGradeName: action.gradeName };
    default:
      return state;
  }
}

// --- Component ---

export function PricingPageClient() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const plansRef = useRef<HTMLDivElement>(null);

  const isSubsidized = state.formAnswers.subsidy === "yes";

  // Re-fetch when grade name changes (subsidized only)
  useEffect(() => {
    if (!state.pricesRevealed || !isSubsidized) return;
    fetchPricing(state.formAnswers, state.selectedGradeName, dispatch);
  }, [state.selectedGradeName]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAnswer = useCallback(
    (questionId: string, value: string) => {
      dispatch({ type: "ANSWER", questionId, value });
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    await fetchPricing(state.formAnswers, state.selectedGradeName, dispatch);
    // Scroll to plans after reveal
    setTimeout(() => {
      plansRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, [state.formAnswers, state.selectedGradeName]);

  const distinctCount =
    (state.selectedPlanId ? 1 : 0) + state.addonSelections.size;

  // Show placeholder data when not yet revealed
  const displayPlans = state.pricesRevealed ? state.plans : PLACEHOLDER_PLANS;
  const displayAddons = state.pricesRevealed ? state.addons : PLACEHOLDER_ADDONS;

  return (
    <>
      <div className="pricing-content-area" ref={plansRef}>
        {/* Plans section with blur + modal overlay */}
        <div className="pricing-plans-wrapper">
          <PricingPlansSection
            plans={displayPlans}
            selectedPlanId={state.selectedPlanId}
            onSelectPlan={(id) => dispatch({ type: "SELECT_PLAN", planId: id })}
            showGradeToggle={state.pricesRevealed && isSubsidized}
            selectedGradeName={state.selectedGradeName}
            onGradeNameChange={(n) =>
              dispatch({ type: "SET_GRADE_NAME", gradeName: n })
            }
            blurred={!state.pricesRevealed}
          />

          {!state.pricesRevealed && (
            <div className="pricing-modal-overlay">
              <PricingFormModal
                answers={state.formAnswers}
                onAnswer={handleAnswer}
                onSubmit={handleSubmit}
                isLoading={state.isLoading}
              />
            </div>
          )}
        </div>

        {/* Addon services with blur */}
        <AddonServicesSection
          addons={displayAddons}
          selections={state.addonSelections}
          onAdd={(id) => dispatch({ type: "ADD_ADDON", addonId: id })}
          onRemove={(id) => dispatch({ type: "REMOVE_ADDON", addonId: id })}
          onQuantityChange={(id, qty) =>
            dispatch({ type: "SET_ADDON_QTY", addonId: id, qty })
          }
          blurred={!state.pricesRevealed}
        />
      </div>

      {state.pricesRevealed && (
        <FloatingBubble distinctCount={distinctCount} />
      )}
    </>
  );
}

// --- API call ---

async function fetchPricing(
  formAnswers: FormAnswers,
  gradeName: GradeName,
  dispatch: React.Dispatch<Action>
) {
  dispatch({ type: "SUBMIT_START" });

  try {
    const isSubsidized = formAnswers.subsidy === "yes";
    let typeCode: string | undefined;

    if (isSubsidized) {
      const childType = formAnswers.childType as ChildType;
      const isPremature = formAnswers.premature === "yes";
      const hasDisability = formAnswers.disability === "yes";
      const grade = resolveGrade(childType, isPremature, hasDisability);
      const tier = resolveTier(grade, {
        birthOrder: formAnswers.birthOrder as
          | "첫째아"
          | "둘째아"
          | "셋째아이상"
          | undefined,
        staffCount: formAnswers.staffCount
          ? Number(formAnswers.staffCount)
          : undefined,
      });
      if (tier !== null) {
        typeCode = buildTypeCode(grade, gradeName, tier);
      }
    }

    const res = await fetch("/api/pricing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        typeCode,
        isSubsidized,
        year: new Date().getFullYear(),
      }),
    });

    if (!res.ok) throw new Error("API error");

    const data = await res.json();
    dispatch({
      type: "SUBMIT_SUCCESS",
      plans: data.plans ?? [],
      addons: data.addons ?? [],
    });
  } catch {
    dispatch({ type: "SUBMIT_ERROR" });
  }
}
