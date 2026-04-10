"use client";

import { useMemo, useState, useCallback } from "react";
import { Footer } from "@/components/organisms/footer";
import { KoreaRegionMap, type MunicipalityPin } from "@/components/korea-region-map";
import { BookingModal } from "@/components/booking-modal";
import { Badge } from "@/components/ui/badge";
import { PillCta } from "@/components/ui/circle-cta";

type BranchType = "direct" | "franchise";

type BranchData = {
  id: string;
  name: string;
  region: string;
  district: string;
  type: BranchType;
  address: string;
  phone: string;
  hours: string;
  description: string;
};

const BRANCHES: BranchData[] = [
  {
    id: "incheon-junggu",
    name: "인천 중구점",
    region: "인천",
    district: "중구",
    type: "direct",
    address: "인천광역시 중구 신포로 27, 4층",
    phone: "032-765-1234",
    hours: "평일 09:00 – 18:00",
    description: "인천 중구·영종 지역 전담. 신포역 인근.",
  },
  {
    id: "incheon-donggu",
    name: "인천 동구점",
    region: "인천",
    district: "동구",
    type: "direct",
    address: "인천광역시 동구 솔빛로 105, 3층",
    phone: "032-765-2345",
    hours: "평일 09:00 – 18:00",
    description: "인천 동구 전담. 동인천역 도보 3분.",
  },
  {
    id: "incheon-michuhol",
    name: "인천 미추홀구점",
    region: "인천",
    district: "미추홀구",
    type: "direct",
    address: "인천광역시 미추홀구 경인로 229, 5층",
    phone: "032-765-3456",
    hours: "평일 09:00 – 18:00",
    description: "미추홀구 전담. 주안역 인근.",
  },
  {
    id: "incheon-yeonsu",
    name: "인천 연수구점",
    region: "인천",
    district: "연수구",
    type: "direct",
    address: "인천광역시 연수구 컨벤시아대로 165, 6층",
    phone: "032-765-4567",
    hours: "평일 09:00 – 18:00",
    description: "연수·송도 지역 전담. 센트럴파크역 인근.",
  },
  {
    id: "incheon-namdong",
    name: "인천 남동구점",
    region: "인천",
    district: "남동구",
    type: "direct",
    address: "인천광역시 남동구 인주대로 552, 3층",
    phone: "032-765-5678",
    hours: "평일 09:00 – 18:00",
    description: "남동구 전담. 남동인더스파크역 인근.",
  },
  {
    id: "incheon-bupyeong",
    name: "인천 부평구점",
    region: "인천",
    district: "부평구",
    type: "direct",
    address: "인천광역시 부평구 부평대로 283, 4층",
    phone: "032-765-6789",
    hours: "평일 09:00 – 18:00",
    description: "부평구 전담. 부평역 도보 5분.",
  },
  {
    id: "incheon-gyeyang",
    name: "인천 계양구점",
    region: "인천",
    district: "계양구",
    type: "direct",
    address: "인천광역시 계양구 계양대로 145, 3층",
    phone: "032-765-7890",
    hours: "평일 09:00 – 18:00",
    description: "계양구 전담. 계양역 인근.",
  },
  {
    id: "incheon-seogu",
    name: "인천 서구점",
    region: "인천",
    district: "서구",
    type: "direct",
    address: "인천광역시 서구 청라대로 229, 5층",
    phone: "032-765-8901",
    hours: "평일 09:00 – 18:00",
    description: "서구·청라 지역 전담. 검암역 인근.",
  },
  {
    id: "gyeongsan",
    name: "경북 경산점",
    region: "경북",
    district: "경산시",
    type: "franchise",
    address: "경상북도 경산시 중방로 31, 4층",
    phone: "053-814-3456",
    hours: "평일 09:00 – 18:00",
    description: "경산·영천·청도 지역 담당. 경산시청 인근 접근성 좋은 지점.",
  },
];

export default function LocationsPage() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingRegion, setBookingRegion] = useState<string | null>(null);
  const [bookingDistrict, setBookingDistrict] = useState<string | null>(null);

  // Provinces that are fully available (all districts have branches)
  // 경북 is excluded — only 경산시 is pinned individually
  const PINNED_REGIONS = new Set(["경북"]);

  const availableRegions = useMemo(
    () => new Set(BRANCHES.map((b) => b.region).filter((r) => !PINNED_REGIONS.has(r))),
    []
  );

  const municipalityPins: MunicipalityPin[] = useMemo(
    () => [{ code: "37100", label: "경산시", region: "경북" }],
    []
  );

  const filtered = selectedRegion
    ? BRANCHES.filter((b) => b.region === selectedRegion)
    : BRANCHES;

  const handleRegionSelect = useCallback((region: string | null) => {
    setSelectedRegion(region);
  }, []);

  return (
    <>
      <main className="flex flex-col items-center w-full pb-[var(--bjj-section-gap)]">
        <section className="flex flex-col items-start w-full gap-3 pb-10">
          <h1 className="h1 text-bjj-primary">지점 찾기</h1>
          <p className="big-p max-w-[480px]">
            지도에서 지역을 클릭하면 해당 지점을 바로 확인할 수 있어요.
          </p>
        </section>

        <div className="flex w-full h-[60vh] rounded-card overflow-hidden border border-bjj-divider shadow-card max-mobile:flex-col">
          {/* 지도 영역 */}
          <div className="relative bg-gradient-to-br from-[#eef5ff] to-[#f8faff] h-full aspect-square shrink-0 max-mobile:h-auto max-mobile:aspect-[520/580]">
            <KoreaRegionMap
              availableRegions={availableRegions}
              municipalityPins={municipalityPins}
              selectedRegion={selectedRegion}
              onRegionSelect={handleRegionSelect}
            />
          </div>

          {/* 사이드바 리스트 */}
          <aside className="flex flex-col border-l border-bjj-divider bg-bjj-bg flex-1 min-w-0 max-mobile:border-l-0 max-mobile:border-t max-mobile:border-bjj-divider">
            <div className="flex justify-between items-center py-5 px-6 border-b border-bjj-divider">
              <h2 className="h6 text-bjj-text-headline">
                {selectedRegion ? `${selectedRegion} 지점` : "전체 지점"}
              </h2>
              <span className="small-p text-bjj-primary">{filtered.length}개</span>
            </div>

            {selectedRegion && (
              <button
                className="medium-p flex items-center gap-1 py-2.5 px-6 border-none border-b border-bjj-divider bg-[rgba(0,74,173,0.04)] cursor-pointer text-bjj-primary transition-colors duration-150 hover:bg-[rgba(0,74,173,0.08)]"
                onClick={() => setSelectedRegion(null)}
              >
                ← 전체 지점 보기
              </button>
            )}

            <ul className="list-none p-0 m-0 overflow-y-auto flex-1 max-mobile:max-h-[400px]">
              {filtered.map((branch) => (
                <li
                  key={branch.id}
                  className="flex items-center gap-4 py-4 px-6 border-b border-bjj-divider cursor-pointer transition-colors duration-150 hover:bg-[rgba(0,74,173,0.02)]"
                >
                  <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Badge tone={branch.type === "direct" ? "primary" : "green"}>
                        {branch.type === "direct" ? "직영점" : "가맹점"}
                      </Badge>
                      <h3 className="h7 text-bjj-text-dark">{branch.name}</h3>
                    </div>
                    <p className="medium-p">{branch.address}</p>
                    <div className="flex justify-between items-center">
                      <a href={`tel:${branch.phone}`} className="medium-p text-bjj-primary no-underline hover:underline">
                        {branch.phone}
                      </a>
                    </div>
                  </div>
                  <PillCta
                    onClick={(e) => {
                      e.stopPropagation();
                      setBookingRegion(branch.region);
                      setBookingDistrict(branch.district);
                      setBookingOpen(true);
                    }}
                  >
                    상담 신청
                  </PillCta>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </main>

      <Footer />

      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialRegion={bookingRegion}
        initialDistrict={bookingDistrict}
      />
    </>
  );
}
