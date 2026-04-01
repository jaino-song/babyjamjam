"use client";

import { useMemo, useState, useCallback } from "react";
import {
  SiteFooter,
  SiteNavigation,
} from "@/components/site-chrome";
import { KoreaRegionMap } from "@/components/korea-region-map";
import { BookingModal } from "@/components/booking-modal";

type BranchData = {
  id: string;
  name: string;
  region: string;
  address: string;
  phone: string;
  hours: string;
  description: string;
};

const BRANCHES: BranchData[] = [
  {
    id: "gangnam",
    name: "서울 강남점",
    region: "서울",
    address: "서울특별시 강남구 테헤란로 152, 5층",
    phone: "02-555-1234",
    hours: "평일 09:00 – 18:00",
    description: "강남역 3번 출구 도보 5분. 서울 전 지역 총괄 본점.",
  },
  {
    id: "mapo",
    name: "서울 마포점",
    region: "서울",
    address: "서울특별시 마포구 월드컵북로 396, 3층",
    phone: "02-332-5678",
    hours: "평일 09:00 – 18:00",
    description: "마포·서대문·은평 지역 전담 서울 서부 거점.",
  },
  {
    id: "bundang",
    name: "경기 분당점",
    region: "경기",
    address: "경기도 성남시 분당구 불정로 6, 7층",
    phone: "031-712-9012",
    hours: "평일 09:00 – 18:00",
    description: "분당·판교·수지 담당 경기 남부 중심 지점.",
  },
  {
    id: "namdong",
    name: "인천 남동구점",
    region: "인천",
    address: "인천광역시 남동구 인주대로 552, 3층",
    phone: "032-431-5678",
    hours: "평일 09:00 – 18:00",
    description: "인천 남동·연수·미추홀 지역 전담. 남동인더스파크역 인근.",
  },
  {
    id: "gyeongsan",
    name: "경북 경산점",
    region: "경북",
    address: "경상북도 경산시 중방로 31, 4층",
    phone: "053-814-3456",
    hours: "평일 09:00 – 18:00",
    description: "경산·영천·청도 지역 담당. 경산시청 인근 접근성 좋은 지점.",
  },
];

export default function BranchesPage() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingRegion, setBookingRegion] = useState<string | null>(null);

  const availableRegions = useMemo(
    () => new Set(BRANCHES.map((b) => b.region)),
    []
  );

  const filtered = selectedRegion
    ? BRANCHES.filter((b) => b.region === selectedRegion)
    : BRANCHES;

  const handleRegionSelect = useCallback((region: string | null) => {
    setSelectedRegion(region);
  }, []);

  return (
    <div className="page">
      <SiteNavigation activeLabel="지점 찾기" />

      <section className="bv1-hero">
        <h1 className="h1 bv1-hero__title">지점 찾기</h1>
        <p className="big-p bv1-hero__subtitle">
          지도에서 지역을 클릭하면 해당 지점을 바로 확인할 수 있어요.
        </p>
      </section>

      <main className="bv1-main">
        <div className="bv1-split">
          {/* 지도 영역 */}
          <div className="bv1-map">
            <KoreaRegionMap
              availableRegions={availableRegions}
              selectedRegion={selectedRegion}
              onRegionSelect={handleRegionSelect}
            />
          </div>

          {/* 사이드바 리스트 */}
          <aside className="bv1-sidebar">
            <div className="bv1-sidebar__header">
              <h2 className="h6 bv1-sidebar__title">
                {selectedRegion ? `${selectedRegion} 지점` : "전체 지점"}
              </h2>
              <span className="bv1-sidebar__count">{filtered.length}개</span>
            </div>

            {selectedRegion && (
              <button
                className="bv1-sidebar__reset"
                onClick={() => setSelectedRegion(null)}
              >
                ← 전체 지점 보기
              </button>
            )}

            <ul className="bv1-list">
              {filtered.map((branch, idx) => (
                <li
                  key={branch.id}
                  className={`bv1-list__item${idx === 0 ? " bv1-list__item--active" : ""}`}
                >
                  <div className="bv1-list__item-content">
                    <div className="bv1-list__top">
                      <span className="bv1-list__region">{branch.region}</span>
                      <h3 className="h7 bv1-list__name">{branch.name}</h3>
                    </div>
                    <p className="bv1-list__address">{branch.address}</p>
                    <div className="bv1-list__meta">
                      <a href={`tel:${branch.phone}`} className="bv1-list__phone">
                        {branch.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    className="bv1-list__cta"
                    onClick={(e) => {
                      e.stopPropagation();
                      setBookingRegion(branch.region);
                      setBookingOpen(true);
                    }}
                  >
                    상담
                  </button>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </main>

      <SiteFooter />

      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialRegion={bookingRegion}
      />
    </div>
  );
}
