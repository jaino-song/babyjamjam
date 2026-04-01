import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { ListItem } from "@/components/molecules/list-item";

const LIST_ITEMS = [
  {
    number: "01",
    description:
      "바람결에 숫자 같은 소리가 스르르 흘러가고, 둥근 조각들이 모여 사각의 그림자를 만든다.",
  },
  {
    number: "02",
    description:
      "바람결에 숫자 같은 소리가 스르르 흘러가고, 둥근 조각들이 모여 사각의 그림자를 만든다.",
  },
  {
    number: "03",
    description:
      "바람결에 숫자 같은 소리가 스르르 흘러가고, 둥근 조각들이 모여 사각의 그림자를 만든다.",
  },
  {
    number: "04",
    description:
      "바람결에 숫자 같은 소리가 스르르 흘러가고, 둥근 조각들이 모여 사각의 그림자를 만든다.",
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
            className="text-h2 font-extrabold font-heading text-bjj-primary text-left"
            data-component="organism-app-detail-title"
          >
            아가잼잼의 케어는
            <br />
            출산 전부터 시작해요.
          </h2>
          <p
            className="text-h4 font-extrabold font-heading text-bjj-text-paragraph"
            data-component="organism-app-detail-subtitle"
          >
            바람결에 숫자 같은 소리가 스르르 흘러가고, 둥근 조각들이 모여 사각의 그림자를 만든다.
          </p>
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
        <Button variant="primary" href="#">
          더 알아보기
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
