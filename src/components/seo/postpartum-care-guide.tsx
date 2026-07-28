import Link from "next/link";

import { cn } from "@/lib/utils";

const CHECKLIST_ITEMS = [
  {
    title: "업무 범위가 분명한가요?",
    description:
      "산모 식사와 휴식 지원, 신생아 수유·목욕·위생 관리처럼 기본 서비스에 포함되는 내용을 먼저 확인하세요.",
  },
  {
    title: "관리사 교육과 대응 체계가 있나요?",
    description:
      "제공인력의 교육 이수 여부와 서비스 중 요청사항, 불편 접수, 관리사 교체 절차를 함께 확인하는 것이 좋습니다.",
  },
  {
    title: "정부지원과 본인부담금을 확인했나요?",
    description:
      "산모·신생아 건강관리 지원은 태아 유형, 출산 순위, 소득 기준과 지역에 따라 달라질 수 있어 관할 보건소 확인이 필요합니다.",
  },
  {
    title: "내 지역에서 이용할 수 있나요?",
    description:
      "서비스 제공 지역과 담당 지점, 상담 연락처를 확인한 뒤 출산예정일과 희망 이용 기간을 기준으로 상담하세요.",
  },
] as const;

const RESOURCE_LINKS = [
  {
    href: "/pricing",
    eyebrow: "비용 확인",
    title: "산후도우미 비용과 정부지원",
    description: "이용 기간과 조건에 맞는 예상 비용을 확인하세요.",
  },
  {
    href: "/locations",
    eyebrow: "지역 확인",
    title: "서비스 가능 지역과 담당 지점",
    description: "인천·경기·경북의 아가잼잼 지점을 찾아보세요.",
  },
  {
    href: "/faq",
    eyebrow: "이용 준비",
    title: "예약 전 자주 묻는 질문",
    description: "예약, 결제, 관리사, 서비스 범위를 미리 확인하세요.",
  },
] as const;

interface PostpartumCareGuideProps {
  variant: "mobile" | "desktop";
  "data-component": string;
}

export function PostpartumCareGuide({
  variant,
  "data-component": dataComponent,
}: PostpartumCareGuideProps) {
  const isMobile = variant === "mobile";

  return (
    <section
      className={cn(
        "w-full rounded-[32px] bg-[#f7f4ef]",
        isMobile ? "px-6 py-10" : "px-12 py-16",
      )}
      data-component={dataComponent}
    >
      <div
        className={cn("flex flex-col", isMobile ? "gap-10" : "gap-14")}
        data-slot="content"
      >
        <header
          className={cn(
            "flex flex-col",
            isMobile ? "gap-4" : "max-w-[900px] gap-5",
          )}
          data-slot="intro"
        >
          <p
            className="small-p font-bold text-bjj-primary"
            data-slot="eyebrow"
          >
            산모·신생아 건강관리 서비스
          </p>
          <h2 className="h2-left text-bjj-primary" data-slot="heading">
            산후도우미,
            <br />
            출산 후 일상을 함께 준비하는 서비스
          </h2>
          <p className="big-p text-bjj-text-paragraph" data-slot="description">
            흔히 산후도우미라고 부르는 서비스의 정식 명칭은 산모·신생아
            건강관리 서비스입니다. 건강관리사가 출산가정을 방문해 산모의
            회복과 신생아 돌봄을 지원하며, 아가잼잼은 상담부터 관리사 배정,
            이용 중 요청사항과 종료 후 절차까지 한 흐름으로 안내합니다.
          </p>
          <a
            className="small-p w-fit font-bold text-bjj-primary underline decoration-1 underline-offset-4"
            href="https://www.mohw.go.kr/menu.es?mid=a10711020100"
            target="_blank"
            rel="noreferrer"
            data-slot="official-source"
          >
            보건복지부 산모·신생아 건강관리 지원사업 안내
          </a>
        </header>

        <div
          className={cn(
            "grid",
            isMobile ? "grid-cols-1 gap-3" : "grid-cols-2 gap-4",
          )}
          data-slot="checklist"
        >
          {CHECKLIST_ITEMS.map((item, index) => (
            <article
              key={item.title}
              className="rounded-[24px] bg-white p-6"
              data-slot={`checklist-item-${index + 1}`}
            >
              <span
                className="small-p font-bold text-bjj-primary"
                data-slot="number"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3
                className="h6 mt-4 text-bjj-text-dark"
                data-slot="item-heading"
              >
                {item.title}
              </h3>
              <p
                className="medium-p mt-3 text-bjj-text-paragraph"
                data-slot="item-description"
              >
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <div
          className={cn(
            "grid",
            isMobile ? "grid-cols-1 gap-3" : "grid-cols-3 gap-4",
          )}
          data-slot="resources"
        >
          {RESOURCE_LINKS.map((resource, index) => (
            <Link
              key={resource.href}
              href={resource.href}
              className="group flex min-h-[184px] flex-col justify-between rounded-[24px] border border-bjj-divider bg-white p-6 no-underline transition-transform duration-200 hover:-translate-y-1"
              data-slot={`resource-${index + 1}`}
            >
              <span
                className="small-p font-bold text-bjj-primary"
                data-slot="resource-eyebrow"
              >
                {resource.eyebrow}
              </span>
              <div className="mt-8" data-slot="resource-copy">
                <h3 className="h6 text-bjj-text-dark" data-slot="resource-heading">
                  {resource.title}
                </h3>
                <p
                  className="medium-p mt-2 text-bjj-text-paragraph"
                  data-slot="resource-description"
                >
                  {resource.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <p className="small-p text-bjj-text-paragraph" data-slot="notice">
          정부지원 대상과 서비스 가격은 출산 시점 및 지자체 기준에 따라 달라질
          수 있습니다. 최종 자격은 관할 보건소 또는 복지로에서 확인해 주세요.
        </p>
      </div>
    </section>
  );
}
