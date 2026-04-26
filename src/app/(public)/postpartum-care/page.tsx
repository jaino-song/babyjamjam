import type { Metadata } from "next";

import DesktopPostpartumCarePage from "@/components/desktop/pages/postpartum-care";
import MobilePostpartumCarePage from "@/components/mobile/pages/postpartum-care";
import { getDevice } from "@/lib/device";

export const metadata: Metadata = {
  title: "산후도우미 서비스 | 아가잼잼",
  description:
    "아가잼잼이 자신있게 소개하는 산후도우미 서비스. 산모 케어와 신생아 케어를 한 페이지에서 확인하세요.",
};

export default async function PostpartumCarePage() {
  const device = await getDevice();
  return device === "mobile" ? <MobilePostpartumCarePage /> : <DesktopPostpartumCarePage />;
}
