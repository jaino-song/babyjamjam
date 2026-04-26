import { DesktopPricingClient } from "@/components/desktop/pages/pricing-client";
import { DesktopBannerImageSection as BannerImageSection } from "@/components/desktop/sections/banner-image-section";
import { Footer } from "@/components/organisms/footer";
import { DesktopMoreSection as MoreSection } from "@/components/desktop/sections/more-section";

export default function DesktopPricingPage() {
  return (
    <>
      <main className="flex w-full flex-col items-center gap-[var(--bjj-section-gap)]">
        <section className="flex w-full flex-col items-center overflow-hidden">
          <div className="relative mb-16 h-[488px] w-full overflow-hidden rounded-card">
            <img
              src="/images/hero-bg-22ebe1.png"
              alt="Hero background"
              className="h-full w-full object-cover"
            />
          </div>
          <h1 className="h1 w-full whitespace-pre-line text-bjj-primary">
            {"처음부터 숨김없이\n안내하는 서비스 가격"}
          </h1>
        </section>

        <DesktopPricingClient />

        <BannerImageSection className="h-[576px]" />

        <MoreSection />
      </main>

      <Footer />
    </>
  );
}
