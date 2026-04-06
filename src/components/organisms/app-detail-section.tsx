import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { ListItem } from "@/components/molecules/list-item";

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
        className="flex flex-col items-start gap-10 w-[790px] pb-20"
        data-component="organism-app-detail-content"
      >
        <div
          className="flex flex-col items-start gap-10 w-full"
          data-component="organism-app-detail-title-block"
        >
          <h2
            className="h3-left"
            style={{ color: "var(--bjj-color-primary)" }}
            data-component="organism-app-detail-title"
          >
            아가잼잼 공식 앱은
            <br />
            상담부터 환급 신청까지 일사천리.
          </h2>
          <div
            className="app-detail__subtitle"
            style={{ color: "var(--bjj-color-text-paragraph)" }}
            data-component="organism-app-detail-subtitle"
          >
            <p className="h6">
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
        <Button variant="primary" type="button" disabled>
          출시 예정
        </Button>
      </div>
      <div
        className="absolute right-0 top-0"
        data-component="organism-app-detail-phone"
      >
        <img
          src="/images/phone-mockup-294c7f.png"
          alt="아가잼잼 앱"
          className="w-[453px] h-[925px] object-contain"
          data-component="organism-app-detail-phone-image"
        />
      </div>
    </section>
  );
}
