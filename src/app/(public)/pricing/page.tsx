import type { Metadata } from "next";

import DesktopPricingPage from "@/components/desktop/pages/pricing";
import MobilePricingPage from "@/components/mobile/pages/pricing";
import { getDevice } from "@/lib/device";

export const metadata: Metadata = {
  title: "서비스 비용 | 아가잼잼",
  description:
    "처음부터 숨김없이 안내하는 아가잼잼 산후도우미 서비스 가격. 정부지원 바우처 대상 여부를 확인하고, 맞춤 플랜을 조회하세요.",
};

export default async function PricingPage() {
  const device = await getDevice();
  return device === "mobile" ? <MobilePricingPage /> : <DesktopPricingPage />;
}
