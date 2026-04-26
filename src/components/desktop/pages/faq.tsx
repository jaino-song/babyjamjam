import { DesktopFaqPageClient } from "@/components/desktop/sections/faq-page-client";
import { DesktopFooter as Footer } from "@/components/desktop/sections/footer";
import { DesktopMoreSection as MoreSection } from "@/components/desktop/sections/more-section";

export default function DesktopFaqPage() {
  return (
    <>
      <main className="flex flex-col items-center w-full gap-[var(--bjj-section-gap)]">
        <DesktopFaqPageClient />
        <MoreSection currentPage="faq" />
      </main>

      <Footer />
    </>
  );
}
