import { Building2, CalendarCheck2, MessageSquareMore, UserCheck, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { DualColorHeading } from "@/components/molecules/dual-color-heading";
import { IconLockup } from "@/components/molecules/icon-lockup";

const ICON_LOCKUP_ITEMS = [
  {
    icon: UserCheck,
    title: "전담마크",
    description:
      "한 명의 담당자가 첫 상담부터 사후처리까지 전담해, 작은 내용 하나까지 빠짐없이 챙깁니다.",
  },
  {
    icon: CalendarCheck2,
    title: "임신 기간 전체 관리",
    description:
      "출산 전부터 필요한 정보를 안내하고 산모님의 상황을 세심히 살펴, 서비스 종료 후까지 꼼꼼히 챙깁니다.",
  },
  {
    icon: Building2,
    title: "기업형 운영 관리",
    description:
      "주먹구구식 운영이 아닌, 체계적인 운영 기준으로 높은 서비스 품질을 안정적으로 유지합니다.",
  },
  {
    icon: MessageSquareMore,
    title: "실시간 고객 피드백 응답형",
    description:
      "서비스를 이용하시는 동안 불편함이 없으시도록, 서비스 시작 후엔 산모님의 피드백을 실시간으로 확인하고 반영합니다.",
  },
] satisfies Array<{ icon: LucideIcon; title: string; description: string }>;

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
          아가잼잼은 서비스 시작 전 준비부터 진행 중 실시간 고객 응대, 서비스 종료 후 환급
          지원까지 각 산모님의 상황에 맞춰 관리합니다. 방치되는 공장형이 아닌, 필요한
          서비스가 정확히 제공되도록 운영합니다.
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
