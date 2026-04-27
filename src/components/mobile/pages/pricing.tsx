import { MobilePricingClient } from "@/components/mobile/pages/pricing-client";
import { MobileBannerImageSection as BannerImageSection } from "@/components/mobile/sections/banner-image-section";
import { MobileFooter as Footer } from "@/components/mobile/sections/footer";
import { MobileMoreSection as MoreSection } from "@/components/mobile/sections/more-section";

export default function MobilePricingPage() {
  return (
    <>
      <main
        className="flex w-full flex-col items-center gap-[var(--bjj-section-gap)]"
        data-component="mobile_pricing_page-main"
      >
        <section
          className="flex w-full flex-col items-center overflow-hidden"
          data-component="mobile_pricing_page_hero_section"
        >
          <div
            className="relative mb-10 h-80 w-full overflow-hidden rounded-card"
            data-component="mobile_pricing_page_hero_image_wrap"
          >
            <img
              src="/images/pricing-hero-mother-baby.jpg"
              alt="산모와 아기 휴식 이미지"
              className="h-full w-full object-cover"
              data-component="mobile_pricing_page_hero_image"
            />
          </div>
          <h1
            className="h1 w-full whitespace-pre-line text-bjj-primary"
            data-component="mobile_pricing_page_headline"
          >
            {"처음부터 숨김없이\n안내하는 서비스 가격"}
          </h1>
        </section>

        <MobilePricingClient data-component="mobile_pricing-client_root" />

        <BannerImageSection
          className="h-[360px]"
          imageAlt="식사 준비 식탁"
          imageSrc="/images/pricing-banner-meal-prep.png"
          data-component="mobile_pricing_banner-image-section"
        />

        <MoreSection data-component="mobile_pricing_more-section" />
      </main>

      <Footer data-component="mobile_pricing_footer-section" />
    </>
  );
}
