"use client";

import { usePathname } from "next/navigation";

import { usePricingStore } from "@/lib/pricing-store";

import { LegacyFloatingBubble } from "./floating-bubble";

export function LegacyGlobalFloatingBubble() {
  const pathname = usePathname();
  const selectedPlanId = usePricingStore((state) => state.selectedPlanId);
  const addonSelections = usePricingStore((state) => state.addonSelections);
  const distinctCount = (selectedPlanId ? 1 : 0) + addonSelections.size;
  const isPricingPage = pathname?.startsWith("/pricing") ?? false;

  if (isPricingPage) return null;

  return (
    <LegacyFloatingBubble
      distinctCount={distinctCount}
      showCart={false}
    />
  );
}
