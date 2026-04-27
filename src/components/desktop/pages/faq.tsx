import { DesktopFaqPageClient } from "@/components/desktop/sections/faq-page-client";
import { DesktopFooter as Footer } from "@/components/desktop/sections/footer";
import { DesktopMoreSection as MoreSection } from "@/components/desktop/sections/more-section";

export default function DesktopFaqPage() {
  return (
    <>
      <main
        className="flex flex-col items-center w-full gap-[var(--bjj-section-gap)]"
        data-component="desktop_faq_page-main"
      >
        <DesktopFaqPageClient data-component="desktop_faq_page-client" />
        <MoreSection
          currentPage="faq"
          data-component="desktop_faq_more-section"
        />
      </main>

      <Footer data-component="desktop_faq_footer-section" />
    </>
  );
}
