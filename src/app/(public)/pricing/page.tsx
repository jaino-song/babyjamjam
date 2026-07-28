import type { Metadata } from "next";

import DesktopPricingPage from "@/components/desktop/pages/pricing";
import MobilePricingPage from "@/components/mobile/pages/pricing";
import { JsonLd } from "@/components/seo/json-ld";
import { getDevice } from "@/lib/device";
import { createBreadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/pricing",
  title: "산후도우미 비용·정부지원 바우처",
  description:
    "아가잼잼 산후도우미 비용과 정부지원 바우처 적용 여부를 확인하고, 출산 조건과 이용 기간에 맞는 예상 플랜을 조회하세요.",
});

export default async function PricingPage() {
  const device = await getDevice();
  const page =
    device === "mobile" ? <MobilePricingPage /> : <DesktopPricingPage />;

  return (
    <>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "홈", path: "/" },
          { name: "산후도우미 비용", path: "/pricing" },
        ])}
      />
      {page}
    </>
  );
}
