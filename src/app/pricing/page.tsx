import type { Metadata } from "next";

import { MoreSection } from "@/components/organisms/more-section";
import { Footer } from "@/components/organisms/footer";
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
      <main className="flex flex-col items-center w-full gap-[var(--bjj-section-gap)]">
        <section className="flex flex-col items-center w-full overflow-hidden">
          <div className="relative w-full h-[488px] rounded-card overflow-hidden mb-16 max-mobile:h-80 max-mobile:mb-10">
            <img
              src="/images/hero-bg-22ebe1.png"
              alt="Hero background"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="h1 text-bjj-primary whitespace-pre-line w-full">
            {"처음부터 숨김없이\n안내하는 서비스 가격"}
          </h1>
        </section>

        <PricingPageClient />

        <BannerImageSection className="h-[576px] max-mobile:h-[360px]" />

        <MoreSection />
      </main>

      <Footer />
    </>
  );
}
