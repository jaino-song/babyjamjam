import { MobileFaqPageClient } from "@/components/mobile/sections/faq-page-client";
import { Footer } from "@/components/organisms/footer";
import { MobileMoreSection as MoreSection } from "@/components/mobile/sections/more-section";

export default function MobileFaqPage() {
  return (
    <>
      <main className="flex flex-col items-center w-full gap-[var(--bjj-section-gap)]">
        <MobileFaqPageClient />
        <MoreSection currentPage="faq" />
      </main>

      <Footer />
    </>
  );
}
