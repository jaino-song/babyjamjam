import type { Metadata } from "next";

import DesktopPostpartumCarePage from "@/components/desktop/pages/postpartum-care";
import MobilePostpartumCarePage from "@/components/mobile/pages/postpartum-care";
import { JsonLd } from "@/components/seo/json-ld";
import { getDevice } from "@/lib/device";
import {
  createBreadcrumbJsonLd,
  createPageMetadata,
  createServiceJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/postpartum-care",
  title: "산후도우미 서비스 안내",
  description:
    "산모 회복, 신생아 수유·목욕·위생 관리부터 관리사 교육과 이용 절차까지 아가잼잼 산후도우미 서비스를 자세히 확인하세요.",
});

export default async function PostpartumCarePage() {
  const device = await getDevice();
  const page =
    device === "mobile" ? (
      <MobilePostpartumCarePage />
    ) : (
      <DesktopPostpartumCarePage />
    );

  return (
    <>
      <JsonLd
        data={[
          createServiceJsonLd(),
          createBreadcrumbJsonLd([
            { name: "홈", path: "/" },
            { name: "산후도우미 서비스", path: "/postpartum-care" },
          ]),
        ]}
      />
      {page}
    </>
  );
}
