import { MobilePricingClient } from "@/components/mobile/pages/pricing-client";
import { MobileBannerImageSection as BannerImageSection } from "@/components/mobile/sections/banner-image-section";
import { MobileFooter as Footer } from "@/components/mobile/sections/footer";
import { MobileMoreSection as MoreSection } from "@/components/mobile/sections/more-section";

export default function MobilePricingPage() {
  return (
    <>
      <main
        className="flex w-full flex-col items-center gap-[var(--bjj-section-gap)]"
        data-component="mobile-pricing-page-main"
      >
        <section
          className="flex w-full flex-col items-center overflow-hidden"
          data-component="mobile-pricing-page-hero-section"
        >
          <div
            className="relative mb-10 h-80 w-full overflow-hidden rounded-card"
            data-component="mobile-pricing-page-hero-image-wrap"
          >
            <img
              src="/images/hero-bg-22ebe1.png"
              alt="Hero background"
              className="h-full w-full object-cover"
              data-component="mobile-pricing-page-hero-image"
            />
          </div>
          <h1
            className="h1 w-full whitespace-pre-line text-bjj-primary"
            data-component="mobile-pricing-page-headline"
          >
            {"처음부터 숨김없이\n안내하는 서비스 가격"}
          </h1>
        </section>

        <MobilePricingClient data-component="mobile-pricing-client" />

        <BannerImageSection
          className="h-[360px]"
          data-component="mobile-pricing-banner-image-section"
        />

        <MoreSection data-component="mobile-pricing-more-section" />
      </main>

      <Footer data-component="mobile-pricing-footer" />
    </>
  );
}
