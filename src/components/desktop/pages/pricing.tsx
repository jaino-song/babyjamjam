import { DesktopPricingClient } from "@/components/desktop/pages/pricing-client";
import { DesktopBannerImageSection as BannerImageSection } from "@/components/desktop/sections/banner-image-section";
import { DesktopFooter as Footer } from "@/components/desktop/sections/footer";
import { DesktopMoreSection as MoreSection } from "@/components/desktop/sections/more-section";

export default function DesktopPricingPage() {
  return (
    <>
      <main
        className="flex w-full flex-col items-center gap-[var(--bjj-section-gap)]"
        data-component="desktop-pricing-page-main"
      >
        <section
          className="flex w-full flex-col items-center overflow-hidden"
          data-component="desktop-pricing-page-hero-section"
        >
          <div
            className="relative mb-16 h-[488px] w-full overflow-hidden rounded-card"
            data-component="desktop-pricing-page-hero-image-wrap"
          >
            <img
              src="/images/hero-bg-22ebe1.png"
              alt="Hero background"
              className="h-full w-full object-cover"
              data-component="desktop-pricing-page-hero-image"
            />
          </div>
          <h1
            className="h1 w-full whitespace-pre-line text-bjj-primary"
            data-component="desktop-pricing-page-headline"
          >
            {"처음부터 숨김없이\n안내하는 서비스 가격"}
          </h1>
        </section>

        <DesktopPricingClient data-component="desktop-pricing-client-root" />

        <BannerImageSection
          className="h-[576px]"
          data-component="desktop-pricing-banner-image-section"
        />

        <MoreSection data-component="desktop-pricing-more-section" />
      </main>

      <Footer data-component="desktop-pricing-footer-section" />
    </>
  );
}
