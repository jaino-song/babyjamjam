import type { Metadata } from "next";

import {
  SiteFooter,
  SiteMoreSection,
  SiteNavigation,
} from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "지점 찾기 | 아가잼잼",
  description:
    "전국 아가잼잼 지점을 확인하세요. 가까운 지점에서 산후도우미 서비스를 상담받으실 수 있습니다.",
};

type BranchData = {
  name: string;
  region: string;
  address: string;
  phone: string;
  hours: string;
  description: string;
};

const BRANCHES: BranchData[] = [
  {
    name: "서울 강남점",
    region: "서울",
    address: "서울특별시 강남구 테헤란로 152, 5층",
    phone: "02-555-1234",
    hours: "평일 09:00 – 18:00",
    description:
      "강남역 3번 출구에서 도보 5분 거리에 위치한 본점입니다. 서울 전 지역 산후도우미 서비스를 총괄합니다.",
  },
  {
    name: "서울 마포점",
    region: "서울",
    address: "서울특별시 마포구 월드컵북로 396, 3층",
    phone: "02-332-5678",
    hours: "평일 09:00 – 18:00",
    description:
      "마포·서대문·은평 지역 산모님을 전담하는 서울 서부 거점 지점입니다.",
  },
  {
    name: "경기 분당점",
    region: "경기",
    address: "경기도 성남시 분당구 불정로 6, 7층",
    phone: "031-712-9012",
    hours: "평일 09:00 – 18:00",
    description:
      "분당·판교·수지 지역을 담당하며, 경기 남부 산후도우미 서비스의 중심입니다.",
  },
  {
    name: "부산 해운대점",
    region: "부산",
    address: "부산광역시 해운대구 센텀중앙로 48, 4층",
    phone: "051-747-3456",
    hours: "평일 09:00 – 18:00",
    description:
      "부산·울산·경남 지역 산모님을 위한 남부 대표 지점입니다. 센텀시티역 바로 앞에 있습니다.",
  },
  {
    name: "대구 수성점",
    region: "대구",
    address: "대구광역시 수성구 동대구로 337, 6층",
    phone: "053-766-7890",
    hours: "평일 09:00 – 18:00",
    description:
      "대구·경북 지역을 담당하며, 수성못 인근에 위치한 접근성 좋은 지점입니다.",
  },
];

export default function BranchesPage() {
  return (
    <div className="page">
      <SiteNavigation activeLabel="지점 찾기" />

      <section className="branches-hero">
        <div className="branches-hero__canvas">
          <div className="branches-hero__orb branches-hero__orb--left" />
          <div className="branches-hero__orb branches-hero__orb--right" />
          <div className="branches-hero__note">
            <span className="branches-hero__eyebrow">NATIONWIDE BRANCHES</span>
            <div className="branches-hero__metrics">
              <div className="branches-hero__metric-card">
                <span className="branches-hero__metric-label">전국 지점</span>
                <strong className="branches-hero__metric-value">5개 지점</strong>
              </div>
              <div className="branches-hero__metric-card">
                <span className="branches-hero__metric-label">상담 가능</span>
                <strong className="branches-hero__metric-value">평일 운영</strong>
              </div>
              <div className="branches-hero__metric-card">
                <span className="branches-hero__metric-label">서비스 범위</span>
                <strong className="branches-hero__metric-value">전국 커버</strong>
              </div>
            </div>
          </div>
        </div>
        <h1 className="h1 branches-hero__title">
          {"가까운 아가잼잼 지점에서\n편하게 상담받으세요"}
        </h1>
      </section>

      <main className="branches-page-main">
        <section className="branches-list">
          <div className="branches-list__header">
            <h2 className="h2-left branches-list__title">
              <span className="branches-list__title-muted">전국 어디서나. </span>
              <span className="branches-list__title-primary">아가잼잼 지점 안내</span>
            </h2>
            <p className="big-p branches-list__description">
              각 지점에서 산후도우미 서비스 상담, 예약, 관리사 배정까지 원스톱으로 도와드립니다.
            </p>
          </div>

          <div className="branches-grid">
            {BRANCHES.map((branch) => (
              <article key={branch.name} className="branch-card">
                <div className="branch-card__accent" />
                <div className="branch-card__body">
                  <div className="branch-card__header">
                    <span className="branch-card__region">{branch.region}</span>
                    <h3 className="h3 branch-card__name">{branch.name}</h3>
                  </div>
                  <p className="medium-p branch-card__description">
                    {branch.description}
                  </p>
                  <dl className="branch-card__details">
                    <div className="branch-card__detail">
                      <dt className="branch-card__detail-label">주소</dt>
                      <dd className="branch-card__detail-value">{branch.address}</dd>
                    </div>
                    <div className="branch-card__detail">
                      <dt className="branch-card__detail-label">전화</dt>
                      <dd className="branch-card__detail-value">
                        <a href={`tel:${branch.phone}`} className="branch-card__phone">
                          {branch.phone}
                        </a>
                      </dd>
                    </div>
                    <div className="branch-card__detail">
                      <dt className="branch-card__detail-label">운영시간</dt>
                      <dd className="branch-card__detail-value">{branch.hours}</dd>
                    </div>
                  </dl>
                </div>
                <div className="branch-card__footer">
                  <a href={`tel:${branch.phone}`} className="btn-primary branch-card__cta">
                    전화 상담하기
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="hero-image branches-page__banner">
          <img src="/images/hero-image-1a35f6.png" alt="아가잼잼 배너" />
          <span className="h2 hero-image__text">전국 어디서든. 아가잼잼이니까.</span>
        </section>

        <SiteMoreSection />
      </main>

      <SiteFooter />
    </div>
  );
}
