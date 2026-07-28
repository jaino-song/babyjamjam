import type { Metadata } from "next";

import DesktopLocationsPage from "@/components/desktop/pages/locations";
import MobileLocationsPage from "@/components/mobile/pages/locations";
import { JsonLd } from "@/components/seo/json-ld";
import { BRANCHES } from "@/data/branches";
import { getDevice } from "@/lib/device";
import {
  createBreadcrumbJsonLd,
  createLocalBusinessJsonLd,
  createPageMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/locations",
  title: "지역별 산후도우미 지점 찾기",
  description:
    "인천, 김포, 부천, 고양, 파주, 경산의 아가잼잼 산후도우미 지점과 서비스 가능 지역, 주소, 상담 연락처를 확인하세요.",
});

export default async function LocationsPage() {
  const device = await getDevice();
  const page =
    device === "mobile" ? <MobileLocationsPage /> : <DesktopLocationsPage />;

  return (
    <>
      <JsonLd
        data={[
          ...createLocalBusinessJsonLd(BRANCHES),
          createBreadcrumbJsonLd([
            { name: "홈", path: "/" },
            { name: "산후도우미 지점", path: "/locations" },
          ]),
        ]}
      />
      {page}
    </>
  );
}
