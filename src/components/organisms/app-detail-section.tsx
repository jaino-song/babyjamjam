import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { ListItem } from "@/components/molecules/list-item";
import { calendarMockups } from "@/components/app-detail-calendar-mockups";

const LIST_ITEMS = [
  {
    number: "01",
    description:
      "임신 주차마다 도움이 되는 정보를 확인하고, 서비스 신청에 필요한 절차도 미리 안내받으실 수 있어요.",
  },
  {
    number: "02",
    description:
      "서비스 시작 전에는 배정 예정인 관리사님의 프로필을 확인하고, 미리 전하고 싶은 요청사항도 남기실 수 있어요.",
  },
  {
    number: "03",
    description:
      "예약금 입금부터 본인부담금 결제, 서비스 계약서 작성까지 필요한 절차를 앱에서 간편하게 진행하실 수 있어요.",
  },
  {
    number: "04",
    description:
      "서비스 이용 중 불편하거나 요청하실 내용이 있을 때도 앱에서 바로 접수하실 수 있어요.",
  },
];

interface AppDetailSectionProps {
  className?: string;
}

export function AppDetailSection({ className }: AppDetailSectionProps) {
  return (
    <section
      className={cn("relative w-full h-229 overflow-hidden", className)}
      data-component="organism-app-detail-section"
    >
      <div
        className="flex flex-col items-start gap-10 w-[792px] pb-20"
        data-component="organism-app-detail-content"
      >
        <div
          className="flex flex-col items-start gap-10 w-full"
          data-component="organism-app-detail-title-block"
        >
          <h2
            className="h2-left text-bjj-primary"
            data-component="organism-app-detail-title"
          >
            아가잼잼 공식 앱은
            <br />
            상담부터 환급 신청까지 일사천리.
          </h2>
          <div
            className="text-bjj-text-paragraph"
            data-component="organism-app-detail-subtitle"
          >
            <p className="font-heading font-bold text-[22px] leading-[1.52] tracking-[-0.015em] text-bjj-text-paragraph">
              아가잼잼의 서비스는 출산 전부터 시작돼요. 필요한 정보를 미리 안내해드리고,
              복잡한 신청 절차도 앱에서 더 간편하게 진행하실 수 있어요.
            </p>
          </div>
        </div>
        <div
          className="flex flex-col items-start w-full"
          data-component="organism-app-detail-list"
        >
          {LIST_ITEMS.map((item) => (
            <ListItem
              key={item.number}
              number={item.number}
              description={item.description}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <Button variant="primary" type="button" disabled>
            출시 예정
          </Button>
          <p className="text-xs text-gray-400">*출시 전까지는 유선으로 서비스 제공</p>
        </div>
      </div>
      <div
        className="absolute right-0 top-0"
        data-component="organism-app-detail-phone"
      >
        <div className="relative w-full max-w-[312px] aspect-[1350/2760] drop-shadow-[0_28px_56px_rgba(2,22,56,0.18)]" data-component="organism-app-detail-phone-image">
          <div className="absolute top-[0.85%] left-1/2 w-[calc(100%-26px)] h-[calc(100%-16px)] -translate-x-1/2 translate-y-[5px] rounded-[36px] overflow-hidden bg-[#eef2f6]" />
          <iframe
            srcDoc={calendarMockups[0].html}
            title="아가잼잼 앱 캘린더 목업"
            className="block w-full h-full border-0 bg-[#eef2f6]"
            scrolling="no"
          />
        </div>
      </div>
    </section>
  );
}
