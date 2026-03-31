import type { Metadata } from "next";

import {
  SiteFooter,
  SiteMoreSection,
  SiteNavigation,
} from "@/components/site-chrome";
import { PricingPageClient } from "@/components/pricing-page-client";

export const metadata: Metadata = {
  title: "서비스 비용 | 아가잼잼",
  description:
    "처음부터 숨김없이 안내하는 아가잼잼 산후도우미 서비스 가격. 정부지원 바우처 대상 여부를 확인하고, 맞춤 플랜을 조회하세요.",
};

export default function PricingPage() {
  return (
    <div className="page">
      <SiteNavigation activeLabel="서비스 비용" />

      <section className="pricing-hero">
        <div className="pricing-hero__bg" />
        <h1 className="h1 pricing-hero__title">
          {"처음부터 숨김없이\n안내하는 서비스 가격"}
        </h1>
      </section>

      <main className="pricing-page-main">
        <PricingPageClient />

        <section className="hero-image pricing-page__banner">
          <img src="/images/hero-image-1a35f6.png" alt="아가잼잼 배너" />
          <span className="h2 hero-image__text">
            검증 됐으니까. 믿을 수 있으니까.
          </span>
        </section>

        <SiteMoreSection />
      </main>

      <SiteFooter />
    </div>
  );
}
