"use client";

import { usePathname } from "next/navigation";

import { usePricingStore } from "@/lib/pricing-store";

import { DesktopFloatingBubble } from "./floating-bubble";

interface DesktopGlobalFloatingBubbleProps {
  "data-component"?: string;
}

export function DesktopGlobalFloatingBubble({
  "data-component": dataComponent,
}: DesktopGlobalFloatingBubbleProps) {
  const pathname = usePathname();
  const selectedPlanId = usePricingStore((state) => state.selectedPlanId);
  const addonSelections = usePricingStore((state) => state.addonSelections);
  const distinctCount = (selectedPlanId ? 1 : 0) + addonSelections.size;
  const isPricingPage = pathname?.startsWith("/pricing") ?? false;

  if (isPricingPage) return null;

  return (
    <DesktopFloatingBubble
      distinctCount={distinctCount}
      showCart={false}
      data-component={
        dataComponent ? `${dataComponent}_floating-bubble` : undefined
      }
    />
  );
}
