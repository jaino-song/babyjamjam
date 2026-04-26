import { DesktopFaqPageClient } from "@/components/desktop/sections/faq-page-client";
import { Footer } from "@/components/organisms/footer";
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
