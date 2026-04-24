import { cn } from "@/lib/utils";

import { LinkCard } from "@/components/molecules/link-card";

const LINK_CARDS = [
  {
    title: "산후도우미 서비스",
    description:
      "회복과 돌봄의 균형을 맞춘 아가잼잼의 핵심 서비스를 한눈에 살펴보세요.",
    buttonText: "더 알아보기",
    buttonHref: "/postpartum-care",
  },
  {
    title: "아가잼잼\n공식 앱",
    description:
      "서비스 일정과 컨디션 기록, 케어 히스토리를 더 편하게 확인할 수 있어요.",
    buttonText: "출시 예정",
    buttonHref: "#",
    disabled: true,
  },
  {
    title: "자주하는 질문",
    description:
      "출산 일정과 원하는 돌봄 범위를 먼저 정리해 두면 상담이 훨씬 빨라집니다.",
    buttonText: "더 알아보기",
    buttonHref: "/faq",
  },
];

const FAQ_PAGE_LINK_CARDS = LINK_CARDS.map((card) =>
  card.buttonHref === "/faq"
    ? {
        title: "지점 찾기",
        description:
          "가까운 아가잼잼 지점을 확인하고 우리 지역 서비스 가능 여부를 살펴보세요.",
        buttonText: "더 알아보기",
        buttonHref: "/locations",
      }
    : card
);

const POSTPARTUM_CARE_PAGE_LINK_CARDS = LINK_CARDS.map((card) =>
  card.buttonHref === "/postpartum-care"
    ? {
        title: "서비스 비용",
        description:
          "정부지원 유형과 이용 기간에 따라 달라지는 서비스 비용을 확인해 보세요.",
        buttonText: "더 알아보기",
        buttonHref: "/pricing",
      }
    : card
);

interface MoreSectionProps {
  className?: string;
  currentPage?: "faq" | "postpartum-care";
}

export function MoreSection({ className, currentPage }: MoreSectionProps) {
  const cards =
    currentPage === "faq"
      ? FAQ_PAGE_LINK_CARDS
      : currentPage === "postpartum-care"
        ? POSTPARTUM_CARE_PAGE_LINK_CARDS
        : LINK_CARDS;

  return (
    <section
      className={cn(
        "flex flex-col items-center gap-16 pt-10 border-t border-bjj-divider w-full",
        className
      )}
      data-component="organism-more-section"
    >
      <h2
        className="h2 text-bjj-primary"
        data-component="organism-more-section-title"
      >
        아가잼잼이면 해결되니까.
      </h2>
      <div
        className="flex justify-center items-start gap-10 w-full max-tablet:flex-wrap max-mobile:items-stretch max-mobile:gap-4"
        data-component="organism-more-section-cards"
      >
        {cards.map((card) => (
          <LinkCard
            key={card.title}
            title={card.title}
            buttonText={card.buttonText}
            buttonHref={card.buttonHref}
            disabled={"disabled" in card ? card.disabled : false}
          />
        ))}
      </div>
    </section>
  );
}
