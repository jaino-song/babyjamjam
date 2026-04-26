"use client";

import { usePathname } from "next/navigation";

import { usePricingStore } from "@/lib/pricing-store";

import { MobileFloatingBubble } from "./floating-bubble";

export function MobileGlobalFloatingBubble() {
  const pathname = usePathname();
  const selectedPlanId = usePricingStore((state) => state.selectedPlanId);
  const addonSelections = usePricingStore((state) => state.addonSelections);
  const distinctCount = (selectedPlanId ? 1 : 0) + addonSelections.size;
  const isPricingPage = pathname?.startsWith("/pricing") ?? false;

  if (isPricingPage) return null;

  return <MobileFloatingBubble distinctCount={distinctCount} showCart={false} />;
}
