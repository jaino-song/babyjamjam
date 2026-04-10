import type { Metadata } from "next";

import {
  SiteFooter,
  SiteMoreSection,
} from "@/components/site-chrome";
import { PricingPageClient } from "@/components/pricing-page-client";
import { BannerImageSection } from "@/components/organisms/banner-image-section";

export const metadata: Metadata = {
  title: "서비스 비용 | 아가잼잼",
  description:
    "처음부터 숨김없이 안내하는 아가잼잼 산후도우미 서비스 가격. 정부지원 바우처 대상 여부를 확인하고, 맞춤 플랜을 조회하세요.",
};

export default function PricingPage() {
  return (
    <>
      <main className="pricing-page-main">
        <section className="pricing-hero">
          <div className="pricing-hero__bg">
            <img
              src="/images/hero-bg-22ebe1.png"
              alt="Hero background"
              className="pricing-hero__bg-image"
            />
          </div>
          <h1 className="h1 pricing-hero__title">
            {"처음부터 숨김없이\n안내하는 서비스 가격"}
          </h1>
        </section>

        <PricingPageClient />

        <BannerImageSection className="pricing-page__banner" />

        <SiteMoreSection />
      </main>

      <SiteFooter />
    </>
  );
}
