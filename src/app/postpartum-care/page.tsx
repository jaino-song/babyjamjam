import type { Metadata } from "next";

import {
  CareSectionCarousel,
  type CareCardData,
  type CareSectionData,
} from "@/components/care-section-carousel";
import {
  SiteFooter,
  SiteMoreSection,
  SiteNavigation,
  SiteProcessSection,
} from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "산후도우미 서비스 | 아가잼잼",
  description:
    "아가잼잼이 자신있게 소개하는 산후도우미 서비스. 산모 케어와 신생아 케어를 한 페이지에서 확인하세요.",
};

const MATERNAL_CARE_CARDS: CareCardData[] = [
  {
    title: "산모 식사",
    description: "회복 속도와 수유 리듬을 고려해 균형 잡힌 산모 식사 준비를 도와드려요.",
    image: "",
  },
  {
    title: "산모 좌욕",
    description: "산후 회복 단계에 맞는 좌욕 준비와 편안한 사용 환경 정돈을 함께 챙겨드려요.",
    image: "",
  },
  {
    title: "유방 케어",
    description: "수유 전후 컨디션을 살피며 부담을 줄이는 유방 관리 루틴을 보조해요.",
    image: "",
  },
  {
    title: "복부 케어",
    description: "산후 회복에 맞춰 복부 컨디션을 살피고 일상 움직임이 무리 없도록 도와드려요.",
    image: "",
  },
  {
    title: "다리/발 케어",
    description: "붓기와 피로가 쌓이기 쉬운 다리와 발의 휴식 루틴을 편안하게 이어가요.",
    image: "",
  },
  {
    title: "기타가족관리",
    description: "가족의 일정과 생활 리듬을 고려해 산후 회복에 집중할 수 있는 환경을 만들어요.",
    image: "",
  },
];

const NEWBORN_CARE_CARDS: CareCardData[] = [
  {
    title: "아기 케어",
    description: "수유와 수면, 안정을 중심으로 신생아의 하루 리듬을 세심하게 돌봐드려요.",
    image: "",
  },
  {
    title: "위생 관리",
    description: "아기의 생활 공간과 손위생, 사용 물품까지 위생 기준으로 차분히 관리해요.",
    image: "",
  },
  {
    title: "신생아 빨래",
    description: "손수건과 의류를 분리해 세탁하고, 자주 쓰는 아기 용품을 정돈해드려요.",
    image: "",
  },
  {
    title: "육아 트러블 관리",
    description: "초보 부모가 당황하기 쉬운 순간을 함께 정리하며 육아 리듬을 맞춰드려요.",
    image: "",
  },
  {
    title: "자녀 돌보기",
    description: "첫째와 신생아의 일과가 충돌하지 않도록 가족 전체의 흐름을 부드럽게 연결해요.",
    image: "",
  },
  {
    title: "간단한 청소 및 세탁",
    description: "회복과 돌봄에 필요한 기본 생활 공간을 무리 없이 안정적으로 유지해드려요.",
    image: "",
  },
];

const CARE_SECTIONS: CareSectionData[] = [
  {
    id: "maternal",
    tone: "maternal",
    tabLabel: "산모 케어",
    mutedText: "이 세상 가장 강한 당신을 위해.",
    primaryText: "산모케어서비스",
    cards: MATERNAL_CARE_CARDS,
  },
  {
    id: "newborn",
    tone: "newborn",
    tabLabel: "신생아 케어",
    mutedText: "어서와, 세상은 처음이지?",
    primaryText: "신생아케어서비스",
    cards: NEWBORN_CARE_CARDS,
  },
];

export default function PostpartumCarePage() {
  return (
    <div className="page">
      <SiteNavigation activeLabel="산후도우미" />

      <section className="service-hero">
        <div className="service-hero__canvas">
          <div className="service-hero__orb service-hero__orb--left" />
          <div className="service-hero__orb service-hero__orb--right" />
          <div className="service-hero__note">
            <span className="service-hero__eyebrow">POSTPARTUM CARE SYSTEM</span>
            <div className="service-hero__metrics">
              <div className="service-hero__metric-card">
                <span className="service-hero__metric-label">회복 루틴</span>
                <strong className="service-hero__metric-value">산모 케어</strong>
              </div>
              <div className="service-hero__metric-card">
                <span className="service-hero__metric-label">돌봄 범위</span>
                <strong className="service-hero__metric-value">신생아 케어</strong>
              </div>
              <div className="service-hero__metric-card">
                <span className="service-hero__metric-label">생활 밸런스</span>
                <strong className="service-hero__metric-value">가정 운영</strong>
              </div>
            </div>
          </div>
        </div>
        <h1 className="h1 service-hero__title">
          {"아가잼잼이 자신있게 소개하는\n산후도우미 서비스"}
        </h1>
      </section>

      <main className="service-page-main">
        <CareSectionCarousel sections={CARE_SECTIONS} />

        <section className="hero-image service-page__banner">
          <img src="/images/hero-image-1a35f6.png" alt="아가잼잼 배너" />
          <span className="h2 hero-image__text">검증 됐으니까. 믿을 수 있으니까.</span>
        </section>

        <SiteProcessSection />
        <SiteMoreSection />
      </main>

      <SiteFooter />
    </div>
  );
}
