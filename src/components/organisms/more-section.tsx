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
    title: "아가잼잼 공식 앱",
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

interface MoreSectionProps {
  className?: string;
}

export function MoreSection({ className }: MoreSectionProps) {
  return (
    <section
      className={cn(
        "flex flex-col items-center gap-25 pt-15 border-t border-bjj-divider w-full",
        className
      )}
      data-component="organism-more-section"
    >
      <h2
        className="h3"
        style={{ color: "var(--bjj-color-primary)" }}
        data-component="organism-more-section-title"
      >
        아가잼잼이면 해결되니까.
      </h2>
      <div
        className="flex justify-center items-start gap-15 w-full"
        data-component="organism-more-section-cards"
      >
        {LINK_CARDS.map((card) => (
          <LinkCard
            key={card.title}
            title={card.title}
            description={card.description}
            buttonText={card.buttonText}
            buttonHref={card.buttonHref}
            disabled={"disabled" in card ? card.disabled : false}
          />
        ))}
      </div>
    </section>
  );
}
