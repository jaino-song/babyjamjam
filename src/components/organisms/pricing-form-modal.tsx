"use client";

import { useState } from "react";
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

type QuestionDef = {
  id: string;
  label: string;
  helperText?: React.ReactNode;
  options: { label: string; value: string }[];
  placeholder?: string;
};

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
  const [step, setStep] = useState(0);

  // Build all steps: Q1 (subsidy) + conditional questions
  const allSteps = buildAllSteps(answers);
  const totalSteps = allSteps.length;
  const currentQuestion = allSteps[step];
  const isLastStep = step === totalSteps - 1;
  const currentAnswered = currentQuestion
    ? answers[currentQuestion.id] !== undefined
    : false;

  const handleNext = () => {
    if (isLastStep && currentAnswered) {
      onSubmit();
    } else if (currentAnswered && step < totalSteps - 1) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="pricing-modal" data-component="organism-pricing-form-modal">
      <div className="pricing-modal__header">
        <h2 className="pricing-modal__title">서비스 가격 조회</h2>
      </div>

      {/* Stepper */}
      <div className="wizard-stepper">
        {allSteps.map((_, i) => (
          <div key={i} className="wizard-stepper__item">
            <div
              className={`wizard-stepper__circle ${
                i === step
                  ? "wizard-stepper__circle--active"
                  : i < step
                    ? "wizard-stepper__circle--done"
                    : "wizard-stepper__circle--pending"
              }`}
            >
              {i + 1}
            </div>
            {i < allSteps.length - 1 && (
              <div
                className={`wizard-stepper__connector ${
                  i < step ? "wizard-stepper__connector--done" : ""
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Current question */}
      <div className="pricing-modal__body">
        {currentQuestion && (
          <FormQuestion
            key={currentQuestion.id}
            label={currentQuestion.label}
            helperText={currentQuestion.helperText}
            options={currentQuestion.options}
            value={answers[currentQuestion.id]}
            placeholder={currentQuestion.placeholder}
            onChange={(v) => onAnswer(currentQuestion.id, v)}
            visible
          />
        )}
      </div>

      {/* Actions */}
      <div className="wizard-actions">
        <button
          type="button"
          className={`wizard-actions__btn wizard-actions__btn--prev ${step === 0 ? "wizard-actions__btn--hidden" : ""}`}
          onClick={handlePrev}
          disabled={step === 0}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
          </svg>
          이전
        </button>
        <button
          type="button"
          className="wizard-actions__btn wizard-actions__btn--next"
          onClick={handleNext}
          disabled={!currentAnswered || isLoading}
        >
          {isLoading
            ? "조회 중..."
            : isLastStep
              ? "서비스 가격 보기"
              : "다음"}
          {!isLastStep && !isLoading && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m9 18 6-6-6-6" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

// --- Build all steps as a flat array ---

function buildAllSteps(answers: FormAnswers): QuestionDef[] {
  const steps: QuestionDef[] = [
    {
      id: "subsidy",
      label: "정부지원 바우처 지원 대상이신가요?",
      helperText: (
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
      ),
      options: [
        { label: "네", value: "yes" },
        { label: "아니오", value: "no" },
      ],
    },
  ];

  if (answers.subsidy === "yes") {
    steps.push(
      { id: "childType", label: "다태아인가요?", options: CHILD_TYPE_OPTIONS },
      {
        id: "premature",
        label: "미숙아인가요?",
        helperText: "37주 또는 체중 2.5kg 미만 출생아 가정은 더 많은 지원을 받을 수 있어요.",
        options: YES_NO_OPTIONS,
      },
      {
        id: "disability",
        label: "중증 장애 등급이 있으신가요?",
        helperText: "몸이 불편하신 분들께선 더 많은 지원을 받으실 수 있어요.",
        options: YES_NO_OPTIONS,
      },
    );

    // Last question depends on resolved grade
    const childType = answers.childType as "단태아" | "쌍태아" | "삼태아" | "사태아이상" | undefined;
    if (childType) {
      const grade = resolveGrade(childType, answers.premature === "yes", answers.disability === "yes");
      if (grade === "A") {
        steps.push({ id: "birthOrder", label: "몇번째 출산이신가요?", options: BIRTH_ORDER_OPTIONS });
      } else {
        steps.push({ id: "staffCount", label: "추가 인력이 필요하신가요?", options: YES_NO_OPTIONS });
      }
    }
  } else if (answers.subsidy === "no") {
    steps.push(
      { id: "servicePeriod", label: "서비스 기간", options: SERVICE_PERIOD_OPTIONS, placeholder: "기간을 선택해 주세요" },
      { id: "liveIn", label: "입주 서비스를 찾고 계시나요?", options: LIVE_IN_OPTIONS },
      { id: "childType", label: "다태아인가요?", options: CHILD_TYPE_OPTIONS },
    );
  }

  return steps;
}
