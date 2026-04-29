import { DesktopPricingClient } from "@/components/desktop/pages/pricing-client";
import { DesktopBannerImageSection as BannerImageSection } from "@/components/desktop/sections/banner-image-section";
import { DesktopFooter as Footer } from "@/components/desktop/sections/footer";
import { DesktopMoreSection as MoreSection } from "@/components/desktop/sections/more-section";

export default function DesktopPricingPage() {
  return (
    <>
      <main
        className="flex w-full flex-col items-center gap-[var(--bjj-section-gap)]"
        data-component="desktop_pricing_page-main"
      >
        <section
          className="flex w-full flex-col items-center overflow-hidden"
          data-component="desktop_pricing_page_hero_section"
        >
          <div
            className="relative mb-16 h-[488px] w-full overflow-hidden rounded-card"
            data-component="desktop_pricing_page_hero_image_wrap"
          >
            <img
              src="/images/pricing-hero-mother-baby.jpg"
              alt="산모와 아기 휴식 이미지"
              className="h-full w-full object-cover"
              data-component="desktop_pricing_page_hero_image"
            />
          </div>
          <h1
            className="h1 w-full whitespace-pre-line text-bjj-primary"
            data-component="desktop_pricing_page_headline"
          >
            {"처음부터 숨김없이\n안내하는 서비스 가격"}
          </h1>
        </section>

        <DesktopPricingClient data-component="desktop_pricing-client_root" />

        <BannerImageSection
          className="h-[576px]"
          imageAlt="식사 준비 식탁"
          imageSrc="/images/pricing-banner-meal-prep.png"
          data-component="desktop_pricing_banner-image-section"
        />

        <MoreSection data-component="desktop_pricing_more-section" />
      </main>

      <Footer data-component="desktop_pricing_footer-section" />
    </>
  );
}
