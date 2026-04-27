import { MobileFaqPageClient } from "@/components/mobile/sections/faq-page-client";
import { MobileFooter as Footer } from "@/components/mobile/sections/footer";
import { MobileMoreSection as MoreSection } from "@/components/mobile/sections/more-section";

export default function MobileFaqPage() {
  return (
    <>
      <main
        className="flex flex-col items-center w-full gap-[var(--bjj-section-gap)]"
        data-component="mobile-faq-page-main"
      >
        <MobileFaqPageClient data-component="mobile-faq-page-client" />
        <MoreSection
          currentPage="faq"
          data-component="mobile-faq-more-section"
        />
      </main>

      <Footer data-component="mobile-faq-footer-section" />
    </>
  );
}
