import type { Metadata } from "next";

import {
  SiteFooter,
  SiteMoreSection,
  SiteNavigation,
} from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "지점 찾기 V2 | 아가잼잼",
  description: "올리브영 스타일 — 검색 + 지역 필터 + 카드 그리드",
};

type BranchData = {
  name: string;
  region: string;
  address: string;
  phone: string;
  hours: string;
  tags: string[];
};

const REGIONS = ["전체", "서울", "경기", "부산", "대구"];

const BRANCHES: BranchData[] = [
  {
    name: "서울 강남점",
    region: "서울",
    address: "서울특별시 강남구 테헤란로 152, 5층",
    phone: "02-555-1234",
    hours: "평일 09:00 – 18:00",
    tags: ["본점", "주차가능"],
  },
  {
    name: "서울 마포점",
    region: "서울",
    address: "서울특별시 마포구 월드컵북로 396, 3층",
    phone: "02-332-5678",
    hours: "평일 09:00 – 18:00",
    tags: ["주말상담"],
  },
  {
    name: "경기 분당점",
    region: "경기",
    address: "경기도 성남시 분당구 불정로 6, 7층",
    phone: "031-712-9012",
    hours: "평일 09:00 – 18:00",
    tags: ["주차가능", "키즈룸"],
  },
  {
    name: "부산 해운대점",
    region: "부산",
    address: "부산광역시 해운대구 센텀중앙로 48, 4층",
    phone: "051-747-3456",
    hours: "평일 09:00 – 18:00",
    tags: ["주차가능"],
  },
  {
    name: "대구 수성점",
    region: "대구",
    address: "대구광역시 수성구 동대구로 337, 6층",
    phone: "053-766-7890",
    hours: "평일 09:00 – 18:00",
    tags: ["키즈룸"],
  },
];

/**
 * V2 — 올리브영 스타일
 * 검색바 + 지역 필터 필(pill) + 3열 카드 그리드
 * 태그 뱃지로 편의시설 표시
 */
export default function BranchesV2() {
  return (
    <div className="page">
      <SiteNavigation activeLabel="지점 찾기" />

      <section className="bv2-hero">
        <h1 className="h3 bv2-hero__title">
          <span className="bv2-hero__title-muted">어디서든 가까이. </span>
          <span className="bv2-hero__title-primary">아가잼잼 지점 찾기</span>
        </h1>

        {/* 검색바 */}
        <div className="bv2-search">
          <svg className="bv2-search__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            className="bv2-search__input"
            placeholder="지점명, 지역, 주소로 검색하세요"
            readOnly
          />
        </div>

        {/* 필터 필 */}
        <div className="bv2-filters">
          {REGIONS.map((region, idx) => (
            <button
              key={region}
              className={`bv2-filter${idx === 0 ? " bv2-filter--active" : ""}`}
            >
              {region}
            </button>
          ))}
        </div>
      </section>

      <main className="bv2-main">
        <p className="medium-p bv2-count">
          총 <strong>{BRANCHES.length}</strong>개 지점
        </p>

        <div className="bv2-grid">
          {BRANCHES.map((branch) => (
            <article key={branch.name} className="bv2-card">
              {/* 상단 컬러 바 */}
              <div className="bv2-card__top-bar" />
              <div className="bv2-card__body">
                <div className="bv2-card__header">
                  <h3 className="h7 bv2-card__name">{branch.name}</h3>
                  <div className="bv2-card__tags">
                    {branch.tags.map((tag) => (
                      <span key={tag} className="bv2-card__tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <p className="bv2-card__address">{branch.address}</p>
                <div className="bv2-card__footer">
                  <div className="bv2-card__info">
                    <span className="bv2-card__phone">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                      </svg>
                      <a href={`tel:${branch.phone}`}>{branch.phone}</a>
                    </span>
                    <span className="bv2-card__hours">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {branch.hours}
                    </span>
                  </div>
                  <a href={`tel:${branch.phone}`} className="bv2-card__cta">상담</a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <SiteMoreSection />
      </main>

      <SiteFooter />
    </div>
  );
}
