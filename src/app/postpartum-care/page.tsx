import type { Metadata } from "next";

import {
  CareSectionCarousel,
  type CareCardData,
  type CareSectionData,
} from "@/components/care-section-carousel";
import {
  SiteFooter,
  SiteMoreSection,
  SiteProcessSection,
} from "@/components/site-chrome";
import { BannerImageSection } from "@/components/organisms/banner-image-section";

export const metadata: Metadata = {
  title: "산후도우미 서비스 | 아가잼잼",
  description:
    "아가잼잼이 자신있게 소개하는 산후도우미 서비스. 산모 케어와 신생아 케어를 한 페이지에서 확인하세요.",
};

const MATERNAL_CARE_CARDS: CareCardData[] = [
  {
    title: "산모 식사",
    description: "산모님의 빠른 회복을 위한 식사를 제공합니다. 필요 시 장보기 후에 식사 준비까지 제공됩니다.",
    imageSrc: "/images/care-maternal-meal.jpg",
    imageAlt: "산모 식사 서비스 이미지",
  },
  {
    title: "산모 휴식 제공",
    description: "신생아 돌봄으로 편히 쉬기 어려운 산모님께서 편히 숙면 및 휴식 하실 수 있도록 도와드립니다.",
    imageSrc: "/images/care-maternal-rest.png",
    imageAlt: "산모 휴식 제공 서비스 이미지",
  },
  {
    title: "집안 정리",
    description: "산모님 및 신생아의 일상복 빨래와 집안 청소를 진행합니다.",
    imageSrc: "/images/care-maternal-cleaning.png",
    imageAlt: "집안 정리 서비스 이미지",
  },
];

const NEWBORN_CARE_CARDS: CareCardData[] = [
  {
    title: "아기 수유",
    description: "아기 목욕, 기저귀 관리, 젖병 소독 등 신생아 건강에 필수적인 위생 관리를 실시합니다.",
    imageSrc: "/images/care-newborn-feeding.png",
    imageAlt: "아기 수유 서비스 이미지",
  },
  {
    title: "아기 위생 관리",
    description: "아기 목욕, 기저귀 관리, 젖병 소독 등 신생아 건강에 필수적인 위생 관리를 실시합니다.",
    imageSrc: "/images/care-newborn-hygiene.png",
    imageAlt: "아기 위생 관리 서비스 이미지",
  },
  {
    title: "전문가의 육아 팁 전수",
    description: "수유, 목욕, 수면 등 신생아 건강에 필수적인 전문가의 지식과 노하우를 전수합니다.",
    imageSrc: "/images/care-newborn-tips.png",
    imageAlt: "전문가의 육아 팁 전수 서비스 이미지",
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
    <>
      <main className="service-page-main">
        <section className="service-hero">
          <div className="hero__bg">
            <img
              src="/images/hero-bg-22ebe1.png"
              alt="Hero background"
              className="hero__bg-image"
            />
          </div>
          <h1 className="h1 service-hero__title">
            {"아가잼잼이 자신있게 소개하는\n산후도우미 서비스"}
          </h1>
        </section>
        <CareSectionCarousel sections={CARE_SECTIONS} initialActiveIndex={0} />

        <BannerImageSection />

        <SiteProcessSection />
        <SiteMoreSection />
      </main>

      <SiteFooter />
    </>
  );
}
