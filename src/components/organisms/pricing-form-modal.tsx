"use client";

import { useState, useCallback } from "react";
import {
  SelectDropdown,
  type SelectOption,
} from "@/components/ui/select-dropdown";
import {
  type GradeLetter,
  resolveGrade,
} from "@/lib/voucher-type";
import { cn } from "@/lib/utils";

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

const BIRTH_ORDER_OPTIONS: SelectOption[] = [
  { label: "첫째아", value: "첫째아" },
  { label: "둘째아", value: "둘째아" },
  { label: "셋째아 이상", value: "셋째아이상" },
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

export type FormAnswers = Record<string, string>;

type QuestionDef = {
  id: string;
  label: string;
  helperText?: React.ReactNode;
  options: SelectOption[];
  placeholder?: string;
  /** "buttons" for 2-option yes/no, "dropdown" for multi-option */
  inputType: "buttons" | "dropdown";
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

  const allSteps = buildAllSteps(answers);
  const totalSteps = allSteps.length;
  const currentQuestion = allSteps[step];
  const isLastStep = step === totalSteps - 1;
  const displayStepCount = answers.subsidy === "yes" ? 5 : 4;

  const advance = useCallback(() => {
    if (isLastStep) {
      onSubmit();
    } else if (step < totalSteps - 1) {
      setStep((s) => s + 1);
    }
  }, [isLastStep, onSubmit, step, totalSteps]);

  const handleSelect = useCallback(
    (questionId: string, value: string) => {
      onAnswer(questionId, value);
      // Auto-advance after a short delay for visual feedback
      setTimeout(advance, 200);
    },
    [onAnswer, advance]
  );

  return (
    <div className="pricing-modal" data-component="organism-pricing-form-modal">
      <div className="pricing-modal__header">
        <h2 className="pricing-modal__title">서비스 가격 조회</h2>
      </div>

      {/* Stepper */}
      <div className="wizard-stepper">
        {Array.from({ length: displayStepCount }, (_, i) => (
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
            {i < displayStepCount - 1 && (
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
          <div className="form-question form-question--visible" data-component="molecule-form-question">
            <div className="form-question__header">
              <span className="form-question__label">{currentQuestion.label}</span>
              {currentQuestion.helperText && (
                <span className="form-question__helper">{currentQuestion.helperText}</span>
              )}
            </div>

            {currentQuestion.inputType === "buttons" ? (
              <div className="wizard-btn-group">
                {currentQuestion.options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className={cn(
                      "wizard-btn-group__btn",
                      answers[currentQuestion.id] === opt.value && "wizard-btn-group__btn--selected"
                    )}
                    onClick={() => handleSelect(currentQuestion.id, opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            ) : (
              <SelectDropdown
                options={currentQuestion.options}
                value={answers[currentQuestion.id]}
                placeholder={currentQuestion.placeholder}
                onChange={(v) => handleSelect(currentQuestion.id, v)}
              />
            )}
          </div>
        )}

        {isLoading && (
          <p className="pricing-modal__loading">조회 중...</p>
        )}
      </div>
    </div>
  );
}

// --- Build all steps ---

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
      options: YES_NO_OPTIONS,
      inputType: "buttons",
    },
  ];

  if (answers.subsidy === "yes") {
    steps.push(
      { id: "childType", label: "다태아인가요?", options: CHILD_TYPE_OPTIONS, inputType: "dropdown" },
      {
        id: "premature",
        label: "미숙아인가요?",
        helperText: "37주 또는 체중 2.5kg 미만 출생아 가정은 더 많은 지원을 받을 수 있어요.",
        options: YES_NO_OPTIONS,
        inputType: "buttons",
      },
      {
        id: "disability",
        label: "중증 장애 등급이 있으신가요?",
        helperText: "몸이 불편하신 분들께선 더 많은 지원을 받으실 수 있어요.",
        options: YES_NO_OPTIONS,
        inputType: "buttons",
      },
    );

    const childType = answers.childType as "단태아" | "쌍태아" | "삼태아" | "사태아이상" | undefined;
    if (childType) {
      const grade = resolveGrade(childType, answers.premature === "yes", answers.disability === "yes");
      if (grade === "A") {
        steps.push({ id: "birthOrder", label: "몇번째 출산이신가요?", options: BIRTH_ORDER_OPTIONS, inputType: "dropdown" });
      } else {
        steps.push({ id: "staffCount", label: "추가 인력이 필요하신가요?", options: YES_NO_OPTIONS, inputType: "buttons" });
      }
    }
  } else if (answers.subsidy === "no") {
    steps.push(
      { id: "servicePeriod", label: "서비스 기간", options: SERVICE_PERIOD_OPTIONS, placeholder: "기간을 선택해 주세요", inputType: "dropdown" },
      { id: "liveIn", label: "입주 서비스를 찾고 계시나요?", options: LIVE_IN_OPTIONS, inputType: "buttons" },
      { id: "childType", label: "다태아인가요?", options: CHILD_TYPE_OPTIONS, inputType: "dropdown" },
    );
  }

  return steps;
}
