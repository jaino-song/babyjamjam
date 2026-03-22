import { cn } from "@/lib/utils";

import { DualColorHeading } from "@/components/molecules/dual-color-heading";
import { IconLockup } from "@/components/molecules/icon-lockup";

const ICON_LOCKUP_ITEMS = [
  {
    icon: "/images/icon-cable.svg",
    title: "전담마크",
    description:
      "바람결에 숫자 같은 소리가 스르르 흘러가고, 둥근 조각들이 모여 사각의 그림자를 만든다.",
  },
  {
    icon: "/images/icon-earth.svg",
    title: "임신 기간 전체 관리",
    description:
      "바람결에 숫자 같은 소리가 스르르 흘러가고, 둥근 조각들이 모여 사각의 그림자를 만든다.",
  },
  {
    icon: "/images/icon-account.svg",
    title: "기업형 운영 관리",
    description:
      "바람결에 숫자 같은 소리가 스르르 흘러가고, 둥근 조각들이 모여 사각의 그림자를 만든다.",
  },
  {
    icon: "/images/icon-chart.svg",
    title: "고객 피드백 응답형",
    description:
      "바람결에 숫자 같은 소리가 스르르 흘러가고, 둥근 조각들이 모여 사각의 그림자를 만든다.",
  },
];

interface ServiceDetailSectionProps {
  className?: string;
}

export function ServiceDetailSection({ className }: ServiceDetailSectionProps) {
  return (
    <section
      className={cn("flex flex-col items-center w-full", className)}
      data-component="organism-service-detail-section"
    >
      <div
        className="flex flex-col items-start gap-12 pt-15 pr-[400px] w-full"
        data-component="organism-service-detail-header"
      >
        <DualColorHeading
          mutedText="방치되는 공장형?"
          primaryText="아가잼잼은 맞춤형 운영 시스템"
          align="left"
        />
        <p
          className="text-big-p font-medium font-body text-bjj-text-paragraph max-w-[1000px] tracking-wide leading-relaxed"
          data-component="organism-service-detail-description"
        >
          바람결에 숫자 같은 소리가 스르르 흘러가고, 둥근 조각들이 모여 사각의 그림자를 만든다. 창가에 놓인 종이배는 길을 잃은 듯 천천히 고개를 돌리며, 고요한 박자에 맞춰 말 없는 문장을 접었다 폈다 한다. 어딘가에서는 반짝이는 점들이 서로를 지나치고, 또 다른 곳에서는 비슷한 모양의 단어들이 줄을 맞춰 서 있다.
        </p>
      </div>
      <div
        className="flex flex-nowrap w-full gap-5 pt-10"
        data-component="organism-service-detail-icons"
      >
        {ICON_LOCKUP_ITEMS.map((item) => (
          <IconLockup
            key={item.title}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
}
