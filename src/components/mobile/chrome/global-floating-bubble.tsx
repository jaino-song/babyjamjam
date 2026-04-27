"use client";

import { usePathname } from "next/navigation";

import { usePricingStore } from "@/lib/pricing-store";

import { MobileFloatingBubble } from "./floating-bubble";

interface MobileGlobalFloatingBubbleProps {
  "data-component"?: string;
}

export function MobileGlobalFloatingBubble({
  "data-component": dataComponent,
}: MobileGlobalFloatingBubbleProps) {
  const pathname = usePathname();
  const selectedPlanId = usePricingStore((state) => state.selectedPlanId);
  const addonSelections = usePricingStore((state) => state.addonSelections);
  const distinctCount = (selectedPlanId ? 1 : 0) + addonSelections.size;
  const isPricingPage = pathname?.startsWith("/pricing") ?? false;

  if (isPricingPage) return null;

  return (
    <MobileFloatingBubble
      distinctCount={distinctCount}
      showCart={false}
      data-component={
        dataComponent ? `${dataComponent}_floating-bubble` : undefined
      }
    />
  );
}
