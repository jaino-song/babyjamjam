import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { PlanData } from "@/components/molecules/pricing-plan-card";
import type { AddonData } from "@/components/molecules/addon-service-card";
import type { FormAnswers as PricingFormAnswers } from "@/lib/pricing/contracts";
import type { GradeName, ChildType } from "@/lib/voucher-type";
import { resolveGrade, resolveTier, buildTypeCode, STAFF_OPTIONS } from "@/lib/voucher-type";

export type PricingState = {
  formAnswers: PricingFormAnswers;
  pricesRevealed: boolean;
  isLoading: boolean;
  plans: PlanData[];
  addons: AddonData[];
  selectedPlanId: string | null;
  addonSelections: Map<string, number>;
  selectedGradeName: GradeName;
};

type PricingActions = {
  answer: (questionId: string, value: string) => void;
  selectPlan: (planId: string) => void;
  clearSelectedPlan: () => void;
  addAddon: (addonId: string) => void;
  removeAddon: (addonId: string) => void;
  setAddonQty: (addonId: string, qty: number) => void;
  setGradeName: (gradeName: GradeName) => void;
  fetchPricing: (
    formAnswers: PricingFormAnswers,
    gradeName: GradeName
  ) => Promise<void>;
};

export const usePricingStore = create<PricingState & PricingActions>()(
  persist(
    (set, get) => ({
      // --- State ---
      formAnswers: {},
      pricesRevealed: false,
      isLoading: false,
      plans: [],
      addons: [],
      selectedPlanId: null,
      addonSelections: new Map(),
      selectedGradeName: "통합",

      // --- Actions ---
      answer: (questionId, value) =>
        set((state) => {
          const next = { ...state.formAnswers, [questionId]: value };
          if (questionId === "subsidy") {
            for (const k of ["childType", "premature", "disability", "birthOrder", "staffCount", "servicePeriod", "liveIn"]) {
              delete next[k];
            }
          }
          if (["childType", "premature", "disability"].includes(questionId)) {
            delete next.birthOrder;
            delete next.staffCount;
          }
          return { formAnswers: next };
        }),

      selectPlan: (planId) =>
        set((state) => {
          const plan = state.plans.find((p) => p.id === planId);
          const duration = plan?.duration ?? 1;
          const m = new Map(state.addonSelections);
          for (const addon of state.addons) {
            if (addon.group === "care" && m.has(addon.id)) {
              m.set(addon.id, duration);
            }
          }
          return { selectedPlanId: planId, addonSelections: m };
        }),

      clearSelectedPlan: () => set({ selectedPlanId: null }),

      addAddon: (addonId) =>
        set((state) => {
          const m = new Map(state.addonSelections);
          const addon = state.addons.find((a) => a.id === addonId);
          const selectedPlan = state.plans.find((p) => p.id === state.selectedPlanId);
          const defaultQty =
            addon?.group === "care" && selectedPlan?.duration
              ? selectedPlan.duration
              : 1;
          m.set(addonId, defaultQty);
          return { addonSelections: m };
        }),

      removeAddon: (addonId) =>
        set((state) => {
          const m = new Map(state.addonSelections);
          m.delete(addonId);
          return { addonSelections: m };
        }),

      setAddonQty: (addonId, qty) =>
        set((state) => {
          const m = new Map(state.addonSelections);
          m.set(addonId, qty);
          return { addonSelections: m };
        }),

      setGradeName: (gradeName) => set({ selectedGradeName: gradeName }),

      fetchPricing: async (formAnswers, gradeName) => {
        set({ isLoading: true });
        try {
          const isSubsidized = formAnswers.subsidy === "yes";
          let typeCode: string | undefined;

          if (isSubsidized) {
            const childType = formAnswers.childType as ChildType;
            const isPremature = formAnswers.premature === "yes";
            const hasDisability = formAnswers.disability === "yes";
            const grade = resolveGrade(childType, isPremature, hasDisability);
            let tier: number | null;

            if (childType === "단태아") {
              tier = 1;
            } else {
              let staffCount: number | undefined;
              if (formAnswers.staffCount) {
                const opts = STAFF_OPTIONS[grade as "B" | "C" | "D"];
                staffCount = formAnswers.staffCount === "yes" ? opts[1] : opts[0];
              }
              tier = resolveTier(grade, { staffCount });
            }

            if (tier !== null) {
              typeCode = buildTypeCode(grade, gradeName, tier);
            }
          }

          const res = await fetch("/api/pricing", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              typeCode,
              childType: formAnswers.childType,
              isSubsidized,
              year: new Date().getFullYear(),
            }),
          });

          if (!res.ok) throw new Error("API error");

          const data = await res.json();
          set({
            isLoading: false,
            pricesRevealed: true,
            plans: data.plans ?? [],
            addons: data.addons ?? [],
            selectedPlanId: null,
            addonSelections: new Map(),
          });
        } catch {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "bjj-pricing",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        formAnswers: state.formAnswers,
        pricesRevealed: state.pricesRevealed,
        plans: state.plans,
        addons: state.addons,
        selectedPlanId: state.selectedPlanId,
        addonSelections: Array.from(state.addonSelections.entries()),
        selectedGradeName: state.selectedGradeName,
      }),
      merge: (persisted, current) => {
        const saved = persisted as Record<string, unknown> | undefined;
        if (!saved) return current;
        return {
          ...current,
          ...saved,
          // Rehydrate Map from entries array
          addonSelections: Array.isArray(saved.addonSelections)
            ? new Map(saved.addonSelections as [string, number][])
            : current.addonSelections,
        };
      },
    }
  )
);
