"use client";

import { cn } from "@/lib/utils";

import { ProcessStep } from "@/components/molecules/process-step";

const PROCESS_STEPS = [
  {
    number: "01",
    title: "예약금 입금",
    description:
      "예약금 입금으로 서비스 예약이 확정되면, 아가잼잼은 관리사 배정, 계약서 준비, 산모 등록 등 서비스 진행을 위한 절차를 준비합니다.",
  },
  {
    number: "02",
    title: "계약서 작성",
    description:
      "서비스 진행에 필요한 계약서 작성을 모바일에서 전자문서로 완료합니다. 번거로운 종이 작성없이, 휴대폰으로 계약서 작성이 가능합니다.",
  },
  {
    number: "03",
    title: "서비스 시작",
    description:
      "서비스 기간 동안 실시간 고객 응대를 진행하며, 서비스 중 발생하는 문의 사항에 대해 즉각적으로 대응합니다.",
  },
  {
    number: "04",
    title: "마무리",
    description:
      "서비스 종료 전에 종료 안내 연락을 드리고, 모니터링 설문과 환급 절차 설명 등 서비스 종료에 필요한 절차를 진행하고 종료하게 됩니다.",
  },
];

interface ProcessSectionProps {
  className?: string;
}

export function DesktopProcessSection({ className }: ProcessSectionProps) {
  return (
    <section
      className={cn(
        "flex flex-col items-center gap-6 bg-bjj-primary w-screen self-start",
        "py-16",
        "px-[calc((100vw-var(--bjj-page-max-width))/2+var(--bjj-page-padding))]",
        "ml-[calc(-50vw+50%)]",
        className
      )}
      data-component="organism-process-section"
    >
      <div
        className="flex justify-between w-full gap-6"
        data-component="organism-process-header"
      >
        <h2 className="h2 text-bjj-primary-light" data-component="organism-process-title">
          산후도우미 서비스 진행 절차
        </h2>
      </div>
      <div
        className="flex w-full gap-3 max-tablet:flex-wrap"
        data-component="organism-process-steps"
      >
        {PROCESS_STEPS.map((step) => (
          <ProcessStep
            key={step.number}
            number={step.number}
            title={step.title}
            description={step.description}
          />
        ))}
      </div>
    </section>
  );
}
