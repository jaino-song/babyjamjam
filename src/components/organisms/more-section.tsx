import { cn } from "@/lib/utils";

import { LinkCard } from "@/components/molecules/link-card";

const LINK_CARDS = [
  {
    title: "산후도우미 서비스",
    description:
      "바람결에 숫자 같은 소리가 스르르 흘러가고, 둥근 조각들이 모여 사각의 그림자를 만든다.",
    buttonText: "더 알아보기",
    buttonHref: "#",
  },
  {
    title: "아가잼잼 공식 앱",
    description:
      "바람결에 숫자 같은 소리가 스르르 흘러가고, 둥근 조각들이 모여 사각의 그림자를 만든다.",
    buttonText: "더 알아보기",
    buttonHref: "#",
  },
  {
    title: "예약하기",
    description:
      "바람결에 숫자 같은 소리가 스르르 흘러가고, 둥근 조각들이 모여 사각의 그림자를 만든다.",
    buttonText: "더 알아보기",
    buttonHref: "#",
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
        className="h2"
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
          />
        ))}
      </div>
    </section>
  );
}
