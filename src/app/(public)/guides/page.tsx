import type { Metadata } from "next";

import { DesktopFooter } from "@/components/desktop/sections/footer";
import { MobileFooter } from "@/components/mobile/sections/footer";
import { GuideHub } from "@/components/seo/guide-pages";
import { JsonLd } from "@/components/seo/json-ld";
import { getDevice } from "@/lib/device";
import { createBreadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/guides",
  title: "산후도우미 가이드",
  description:
    "산후도우미 업무 범위, 비용과 정부지원, 신청 시기와 절차, 업체 선택 기준을 질문별로 확인하세요.",
});

export default async function GuidesPage() {
  const device = await getDevice();
  const isMobile = device === "mobile";

  return (
    <>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "홈", path: "/" },
          { name: "산후도우미 가이드", path: "/guides" },
        ])}
      />
      <GuideHub
        variant={device}
        data-component={`${device}_guides_hub`}
      />
      {isMobile ? (
        <MobileFooter data-component="mobile_guides_footer-section" />
      ) : (
        <DesktopFooter data-component="desktop_guides_footer-section" />
      )}
    </>
  );
}
