"use client";

import { usePathname } from "next/navigation";

import { FloatingBubble } from "@/components/organisms/floating-bubble";
import { usePricingStore } from "@/lib/pricing-store";

export function GlobalFloatingBubble() {
  const pathname = usePathname();
  const selectedPlanId = usePricingStore((state) => state.selectedPlanId);
  const addonSelections = usePricingStore((state) => state.addonSelections);
  const distinctCount = (selectedPlanId ? 1 : 0) + addonSelections.size;
  const isPricingPage = pathname?.startsWith("/pricing") ?? false;

  if (isPricingPage) return null;

  return (
    <FloatingBubble
      distinctCount={distinctCount}
      showCart={false}
    />
  );
}
