"use client";

import { useMemo, useState, useCallback } from "react";
import { Footer } from "@/components/organisms/footer";
import { KoreaRegionMap } from "@/components/korea-region-map";
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

  const availableRegions = useMemo(
    () => new Set(["서울", "인천", "경기도", "경북"]),
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
      <main className="location-main">
        <section className="location-hero">
          <h1 className="h1 location-hero__title">지점 찾기</h1>
          <p className="big-p location-hero__subtitle">
            지도에서 지역을 클릭하면 해당 지점을 바로 확인할 수 있어요.
          </p>
        </section>

        <div className="location-split">
          {/* 지도 영역 */}
          <div className="location-map">
            <KoreaRegionMap
              availableRegions={availableRegions}
              selectedRegion={selectedRegion}
              onRegionSelect={handleRegionSelect}
            />
          </div>

          {/* 사이드바 리스트 */}
          <aside className="location-sidebar">
            <div className="location-sidebar__header">
              <h2 className="h6 location-sidebar__title">
                {selectedRegion ? `${selectedRegion} 지점` : "전체 지점"}
              </h2>
              <span className="small-p location-sidebar__count">{filtered.length}개</span>
            </div>

            {selectedRegion && (
              <button
                className="medium-p location-sidebar__reset"
                onClick={() => setSelectedRegion(null)}
              >
                ← 전체 지점 보기
              </button>
            )}

            <ul className="location-list">
              {filtered.map((branch, idx) => (
                <li
                  key={branch.id}
                  className="location-list__item"
                >
                  <div className="location-list__item-content">
                    <div className="location-list__top">
                      <Badge tone={branch.type === "direct" ? "primary" : "green"}>
                        {branch.type === "direct" ? "직영점" : "가맹점"}
                      </Badge>
                      <h3 className="h7 location-list__name">{branch.name}</h3>
                    </div>
                    <p className="medium-p location-list__address">{branch.address}</p>
                    <div className="location-list__meta">
                      <a href={`tel:${branch.phone}`} className="medium-p location-list__phone">
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
