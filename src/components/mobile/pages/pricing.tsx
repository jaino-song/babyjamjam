import { MobilePricingClient } from "@/components/mobile/pages/pricing-client";
import { MobileBannerImageSection as BannerImageSection } from "@/components/mobile/sections/banner-image-section";
import { Footer } from "@/components/organisms/footer";
import { MoreSection } from "@/components/organisms/more-section";

export default function MobilePricingPage() {
  return (
    <>
      <main className="flex w-full flex-col items-center gap-[var(--bjj-section-gap)]">
        <section className="flex w-full flex-col items-center overflow-hidden">
          <div className="relative mb-10 h-80 w-full overflow-hidden rounded-card">
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

        <MobilePricingClient />

        <BannerImageSection className="h-[360px]" />

        <MoreSection />
      </main>

      <Footer />
    </>
  );
}
