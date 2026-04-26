import type { Metadata } from "next";

import { MoreSection } from "@/components/organisms/more-section";
import { Footer } from "@/components/organisms/footer";
import { FaqPageClient } from "@/components/faq-page-client";

export const metadata: Metadata = {
  title: "FAQ & 이용약관 | 아가잼잼",
  description:
    "아가잼잼 산후도우미 서비스에 대해 자주 묻는 질문과 이용약관을 확인하세요.",
};

export default function FaqPage() {
  return (
    <>
      <main className="flex flex-col items-center w-full gap-[var(--bjj-section-gap)]">
        <FaqPageClient />
        <MoreSection currentPage="faq" />
      </main>

      <Footer />
    </>
  );
}
