"use client";

import { FormQuestion } from "@/components/molecules/form-question";
import {
  type GradeLetter,
  STAFF_OPTIONS,
  resolveGrade,
} from "@/lib/voucher-type";

const YES_NO_OPTIONS = [
  { label: "네", value: "yes" },
  { label: "아니오", value: "no" },
];

const CHILD_TYPE_OPTIONS = [
  { label: "단태아", value: "단태아" },
  { label: "쌍태아", value: "쌍태아" },
  { label: "삼태아", value: "삼태아" },
  { label: "사태아 이상", value: "사태아이상" },
];

const BIRTH_ORDER_OPTIONS = [
  { label: "첫째아", value: "첫째아" },
  { label: "둘째아", value: "둘째아" },
  { label: "셋째아 이상", value: "셋째아이상" },
];

function staffOptions(grade: "B" | "C" | "D") {
  return STAFF_OPTIONS[grade].map((n) => ({
    label: `${n}명`,
    value: String(n),
  }));
}

// Unsubsidized service period options
const SERVICE_PERIOD_OPTIONS = [
  { label: "5일", value: "5" },
  { label: "10일", value: "10" },
  { label: "15일", value: "15" },
  { label: "20일", value: "20" },
];

const LIVE_IN_OPTIONS = [
  { label: "네, 입주 서비스 희망", value: "yes" },
  { label: "아니오, 출퇴근 서비스 희망", value: "no" },
];

export type FormAnswers = Record<string, string>;

interface PricingFormModalProps {
  answers: FormAnswers;
  onAnswer: (questionId: string, value: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
}

export function PricingFormModal({
  answers,
  onAnswer,
  onSubmit,
  isLoading = false,
}: PricingFormModalProps) {
  const isSubsidized = answers.subsidy === "yes";
  const isUnsubsidized = answers.subsidy === "no";

  // Resolve grade for subsidized path
  const childType = answers.childType as
    | "단태아"
    | "쌍태아"
    | "삼태아"
    | "사태아이상"
    | undefined;
  const isPremature = answers.premature === "yes";
  const hasDisability = answers.disability === "yes";

  const resolvedGrade: GradeLetter | null =
    childType ? resolveGrade(childType, isPremature, hasDisability) : null;

  // Determine which questions are answerable (progressive disclosure)
  const subsidizedQuestions = buildSubsidizedQuestions(resolvedGrade);
  const unsubsidizedQuestions = buildUnsubsidizedQuestions();

  const questions = isSubsidized
    ? subsidizedQuestions
    : isUnsubsidized
      ? unsubsidizedQuestions
      : [];

  // Calculate how many questions are visible (answered + next one)
  const visibleCount = getVisibleCount(questions, answers);

  // All questions answered?
  const allAnswered =
    answers.subsidy !== undefined &&
    questions.length > 0 &&
    questions.every((q) => answers[q.id] !== undefined);

  return (
    <div className="pricing-modal" data-component="organism-pricing-form-modal">
      <div className="pricing-modal__header">
        <h2 className="pricing-modal__title">서비스 가격 조회</h2>
      </div>

      <div className="pricing-modal__body">
        {/* Q1: Always visible */}
        <FormQuestion
          label="정부지원 바우처 지원 대상이신가요?"
          helperText={
            <>
              지원 대상 여부는{" "}
              <a
                href="https://www.bokjiro.go.kr/ssis-tbu/twatbz/mkclAsis/mkclInsertPwnbPage.do"
                target="_blank"
                rel="noopener noreferrer"
                className="pricing-modal__link"
              >
                여기
              </a>
              에서 확인하실 수 있어요.
            </>
          }
          options={YES_NO_OPTIONS}
          value={answers.subsidy}
          placeholder="항목을 선택해 주세요"
          onChange={(v) => onAnswer("subsidy", v)}
          visible
        />

        {/* Conditional questions */}
        {questions.map((q, i) => (
          <FormQuestion
            key={q.id}
            label={q.label}
            helperText={q.helperText}
            options={q.options}
            value={answers[q.id]}
            placeholder={q.placeholder}
            onChange={(v) => onAnswer(q.id, v)}
            visible={i < visibleCount}
          />
        ))}

        {/* Submit button */}
        {allAnswered && (
          <div className="pricing-modal__footer">
            <button
              type="button"
              className="pricing-modal__submit"
              onClick={onSubmit}
              disabled={isLoading}
            >
              {isLoading ? "조회 중..." : "서비스 가격 보기"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Question builders ---

type QuestionDef = {
  id: string;
  label: string;
  helperText?: React.ReactNode;
  options: { label: string; value: string }[];
  placeholder?: string;
};

function buildSubsidizedQuestions(
  resolvedGrade: GradeLetter | null
): QuestionDef[] {
  const questions: QuestionDef[] = [
    {
      id: "childType",
      label: "다태아인가요?",
      options: CHILD_TYPE_OPTIONS,
    },
    {
      id: "premature",
      label: "미숙아인가요?",
      helperText:
        "37주 또는 체중 2.5kg 미만 출생아 가정은 더 많은 지원을 받을 수 있어요.",
      options: YES_NO_OPTIONS,
    },
    {
      id: "disability",
      label: "중증 장애 등급이 있으신가요?",
      helperText: "몸이 불편하신 분들께선 더 많은 지원을 받으실 수 있어요.",
      options: YES_NO_OPTIONS,
    },
  ];

  // Last question depends on resolved grade
  if (resolvedGrade === "A") {
    questions.push({
      id: "birthOrder",
      label: "몇번째 출산이신가요?",
      options: BIRTH_ORDER_OPTIONS,
    });
  } else if (
    resolvedGrade === "B" ||
    resolvedGrade === "C" ||
    resolvedGrade === "D"
  ) {
    questions.push({
      id: "staffCount",
      label: "추가 인력이 필요하신가요?",
      options: YES_NO_OPTIONS,
    });
  }

  return questions;
}

function buildUnsubsidizedQuestions(): QuestionDef[] {
  return [
    {
      id: "servicePeriod",
      label: "서비스 기간",
      options: SERVICE_PERIOD_OPTIONS,
      placeholder: "기간을 선택해 주세요",
    },
    {
      id: "liveIn",
      label: "입주 서비스를 찾고 계시나요?",
      options: LIVE_IN_OPTIONS,
    },
    {
      id: "childType",
      label: "다태아인가요?",
      options: CHILD_TYPE_OPTIONS,
    },
  ];
}

function getVisibleCount(
  questions: QuestionDef[],
  answers: FormAnswers
): number {
  let count = 0;
  for (const q of questions) {
    count++;
    if (answers[q.id] === undefined) break;
  }
  return count;
}
