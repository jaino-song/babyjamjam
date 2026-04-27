import { MobileFaqPageClient } from "@/components/mobile/sections/faq-page-client";
import { MobileFooter as Footer } from "@/components/mobile/sections/footer";
import { MobileMoreSection as MoreSection } from "@/components/mobile/sections/more-section";

export default function MobileFaqPage() {
  return (
    <>
      <main
        className="flex flex-col items-center w-full gap-[var(--bjj-section-gap)]"
        data-component="mobile_faq_page-main"
      >
        <MobileFaqPageClient data-component="mobile_faq_page-client" />
        <MoreSection
          currentPage="faq"
          data-component="mobile_faq_more-section"
        />
      </main>

      <Footer data-component="mobile_faq_footer-section" />
    </>
  );
}
