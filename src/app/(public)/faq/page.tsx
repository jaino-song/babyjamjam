import type { Metadata } from "next";

import DesktopFaqPage from "@/components/desktop/pages/faq";
import MobileFaqPage from "@/components/mobile/pages/faq";
import { JsonLd } from "@/components/seo/json-ld";
import { FAQ_SECTIONS } from "@/data/faq-data";
import { getDevice } from "@/lib/device";
import {
  createBreadcrumbJsonLd,
  createFaqJsonLd,
  createPageMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/faq",
  title: "산후도우미 자주 묻는 질문",
  description:
    "아가잼잼 산후도우미 서비스의 예약, 비용, 정부지원 바우처, 관리사, 이용 시간과 업무 범위에 관한 답변을 확인하세요.",
});

export default async function FaqPage() {
  const device = await getDevice();
  const page = device === "mobile" ? <MobileFaqPage /> : <DesktopFaqPage />;
  const faqItems = FAQ_SECTIONS.find((section) => section.id === "faq")
    ?.categories.flatMap((category) => category.items) ?? [];

  return (
    <>
      <JsonLd
        data={[
          createFaqJsonLd(faqItems),
          createBreadcrumbJsonLd([
            { name: "홈", path: "/" },
            { name: "산후도우미 자주 묻는 질문", path: "/faq" },
          ]),
        ]}
      />
      {page}
    </>
  );
}
