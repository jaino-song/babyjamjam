import type { Metadata } from "next";

import DesktopFaqPage from "@/components/desktop/pages/faq";
import MobileFaqPage from "@/components/mobile/pages/faq";
import { getDevice } from "@/lib/device";

export const metadata: Metadata = {
  title: "FAQ & 이용약관 | 아가잼잼",
  description:
    "아가잼잼 산후도우미 서비스에 대해 자주 묻는 질문과 이용약관을 확인하세요.",
};

export default async function FaqPage() {
  const device = await getDevice();
  return device === "mobile" ? <MobileFaqPage /> : <DesktopFaqPage />;
}
