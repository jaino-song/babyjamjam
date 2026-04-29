import {
  DesktopCareSectionCarousel,
  type CareCardData,
  type CareSectionData,
} from "@/components/desktop/sections/care-section-carousel";
import { DesktopBannerImageSection as BannerImageSection } from "@/components/desktop/sections/banner-image-section";
import { DesktopFooter as Footer } from "@/components/desktop/sections/footer";
import { DesktopMoreSection as MoreSection } from "@/components/desktop/sections/more-section";
import { DesktopProcessSection as ProcessSection } from "@/components/desktop/sections/process-section";
import { PROCESS_STEPS } from "@/components/mobile/sections/process-section.data";

const POSTPARTUM_CARE_PROCESS_STEPS = PROCESS_STEPS.map((step, i) => {
  if (i === 0) return { ...step, title: "자격증 보유 전문가만", description: "국가공인자격증을 보유하시고, 아가잼잼의 자체 산후관리 교육을 받으신 믿을 수 있는 산후도우미 전문가만 파견합니다." };
  if (i === 1) return { ...step, title: "남들과는 다른 아동학대방지교육", description: "외부 전문기관을 통해 전문적인 아동학대방지교육을 정기적으로 진행하고 있어요." };
  if (i === 2) return { ...step, title: <>배상책임보험 가입으로<br />맘 편히</>, description: "배상책임보험으로 관리사의 실수로 인한 피해 발생 시에도 피해 배상 걱정 없이 서비스 이용이 가능합니다." };
  if (i === 3) return { ...step, title: "본인부담금 환급 신청 지원", description: "복잡하고 까다로운 본인부담금 환급 신청. 아가잼잼에서 상세히 도와드려요." };
  return step;
});

const MATERNAL_CARE_CARDS: CareCardData[] = [
  {
    title: "산모 식사",
    description:
      "산모님의 빠른 회복을 위한 식사를 제공합니다. 필요 시 장보기 후에 식사 준비까지 제공됩니다.",
    imageSrc: "/images/care-maternal-meal.jpg",
    imageAlt: "산모 식사 서비스 이미지",
  },
  {
    title: "산모 휴식 제공",
    description:
      "신생아 돌봄으로 편히 쉬기 어려운 산모님께서 편히 숙면 및 휴식 하실 수 있도록 도와드립니다.",
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
    description:
      "아기 목욕, 기저귀 관리, 젖병 소독 등 신생아 건강에 필수적인 위생 관리를 실시합니다.",
    imageSrc: "/images/care-newborn-feeding.png",
    imageAlt: "아기 수유 서비스 이미지",
  },
  {
    title: "아기 위생 관리",
    description:
      "아기 목욕, 기저귀 관리, 젖병 소독 등 신생아 건강에 필수적인 위생 관리를 실시합니다.",
    imageSrc: "/images/care-newborn-hygiene.png",
    imageAlt: "아기 위생 관리 서비스 이미지",
  },
  {
    title: "전문가의 육아 팁 전수",
    description:
      "수유, 목욕, 수면 등 신생아 건강에 필수적인 전문가의 지식과 노하우를 전수합니다.",
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

export default function DesktopPostpartumCarePage() {
  return (
    <>
      <main
        className="flex flex-col items-center w-full gap-[var(--bjj-section-gap)]"
        data-component="desktop_postpartum-care_page-main"
      >
        <section
          className="flex flex-col items-center w-full gap-16"
          data-component="desktop_postpartum-care_hero_section"
        >
          <div
            className="relative w-full h-[560px] rounded-[20px] overflow-hidden bg-[#f7f4ef]"
            data-component="desktop_postpartum-care_hero_banner"
          >
            <img
              src="/images/hero-bg-22ebe1.png"
              alt="Hero background"
              className="w-full h-full object-cover object-[center_top] shrink-0"
              data-component="desktop_postpartum-care_hero_banner-image"
            />
          </div>
          <h1
            className="h1 text-bjj-primary whitespace-pre-line w-full"
            data-component="desktop_postpartum-care_hero_headline"
          >
            {"아가잼잼이 자신있게 소개하는\n산후도우미 서비스"}
          </h1>
        </section>
        <DesktopCareSectionCarousel
          sections={CARE_SECTIONS}
          initialActiveIndex={0}
          data-component="desktop_postpartum-care_care-section-carousel"
        />

        <BannerImageSection
          data-component="desktop_postpartum-care_banner-image-section"
          imageSrc="/images/postpartum-care-banner.png"
          imageClassName="object-[center_70%]"
          text="누구보다 전문적이게, 남들보다 믿을 수 있게."
        />

        <ProcessSection data-component="desktop_postpartum-care_process-section" title="아가잼잼이면 걱정없죠." steps={POSTPARTUM_CARE_PROCESS_STEPS} titleClassName="min-h-[2.3em]" />
        <MoreSection
          currentPage="postpartum-care"
          data-component="desktop_postpartum-care_more-section"
        />
      </main>

      <Footer data-component="desktop_postpartum-care_footer" />
    </>
  );
}
