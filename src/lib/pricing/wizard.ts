import type { FormAnswers as PricingFormAnswers, QuestionDef, SelectOption } from "@/lib/pricing/contracts";
import type { ChildType } from "@/lib/voucher-type";

const YES_NO_OPTIONS: SelectOption[] = [
  { label: "네", value: "yes" },
  { label: "아니오", value: "no" },
];

const CHILD_TYPE_OPTIONS: SelectOption[] = [
  { label: "단태아", value: "단태아" },
  { label: "쌍태아", value: "쌍태아" },
  { label: "삼태아", value: "삼태아" },
  { label: "사태아 이상", value: "사태아이상" },
];

const SERVICE_PERIOD_OPTIONS: SelectOption[] = [
  { label: "5일", value: "5" },
  { label: "10일", value: "10" },
  { label: "15일", value: "15" },
  { label: "20일", value: "20" },
];

const LIVE_IN_OPTIONS: SelectOption[] = [
  { label: "네, 입주 서비스 희망", value: "yes" },
  { label: "아니오, 출퇴근 서비스 희망", value: "no" },
];

export const SUBSIDY_ELIGIBILITY_HELPER_KEY = "subsidy-eligibility-link";

export function buildAllSteps(
  answers: PricingFormAnswers
): QuestionDef[] {
  const steps: QuestionDef[] = [
    {
      id: "subsidy",
      label: "정부지원 바우처 지원 대상이신가요?",
      helperKey: SUBSIDY_ELIGIBILITY_HELPER_KEY,
      options: YES_NO_OPTIONS,
      inputType: "buttons",
    },
  ];

  if (answers.subsidy === "yes") {
    steps.push(
      {
        id: "childType",
        label: "다태아인가요?",
        helperKey: "다태아는 더 많은 지원을 받을 수 있어요.",
        options: CHILD_TYPE_OPTIONS,
        inputType: "dropdown",
      },
      {
        id: "premature",
        label: "미숙아인가요?",
        helperKey:
          "37주 또는 체중 2.5kg 미만 출생아 가정은 더 많은 지원을 받을 수 있어요.",
        options: YES_NO_OPTIONS,
        inputType: "buttons",
      },
      {
        id: "disability",
        label: "중증 장애 등급이 있으신가요?",
        helperKey: "몸이 불편하신 분들께선 더 많은 지원을 받으실 수 있어요.",
        options: YES_NO_OPTIONS,
        inputType: "buttons",
      }
    );

    const childType = answers.childType as ChildType | undefined;
    if (childType && childType !== "단태아") {
      steps.push({
        id: "staffCount",
        label: "추가 인력이 필요하신가요?",
        helperKey: "다태아 출산 가정은 2명 이상의 관리사 고용이 가능해요.",
        options: YES_NO_OPTIONS,
        inputType: "buttons",
      });
    }
  } else if (answers.subsidy === "no") {
    steps.push(
      {
        id: "servicePeriod",
        label: "서비스 기간",
        options: SERVICE_PERIOD_OPTIONS,
        placeholder: "기간을 선택해 주세요",
        inputType: "dropdown",
      },
      {
        id: "liveIn",
        label: "입주 서비스를 찾고 계시나요?",
        options: LIVE_IN_OPTIONS,
        inputType: "buttons",
      },
      {
        id: "childType",
        label: "다태아인가요?",
        options: CHILD_TYPE_OPTIONS,
        inputType: "dropdown",
      }
    );
  }

  return steps;
}
