"use client";

import { useReducer, useCallback, useEffect } from "react";

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
      // If subsidy answer changed, reset downstream answers
      if (action.questionId === "subsidy") {
        const resetKeys = [
          "childType", "premature", "disability",
          "birthOrder", "staffCount",
          "servicePeriod", "liveIn",
        ];
        for (const k of resetKeys) delete next[k];
      }
      // If childType/premature/disability changed, reset tier question
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
    case "SELECT_PLAN":
      return { ...state, selectedPlanId: action.planId };
    case "ADD_ADDON": {
      const m = new Map(state.addonSelections);
      m.set(action.addonId, 1);
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

  const isSubsidized = state.formAnswers.subsidy === "yes";

  // Body scroll lock when modal is open
  useEffect(() => {
    if (!state.pricesRevealed) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [state.pricesRevealed]);

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
  }, [state.formAnswers, state.selectedGradeName]);

  // Count distinct selected services for the bubble badge
  const distinctCount =
    (state.selectedPlanId ? 1 : 0) + state.addonSelections.size;

  return (
    <>
      <div className="pricing-content-area">
        <div className="pricing-plans-wrapper">
          <PricingPlansSection
            plans={state.plans}
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

        <AddonServicesSection
          addons={state.addons}
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
