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
  onSubmit: (finalAnswers: FormAnswers) => void;
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
  const isMultiple = answers.childType && answers.childType !== "단태아";
  const displayStepCount = answers.subsidy === "yes" ? (isMultiple ? 5 : 4) : 4;

  const handleSelect = useCallback(
    (questionId: string, value: string) => {
      onAnswer(questionId, value);

      // Pre-compute steps with the new answer to know where to go
      const newAnswers = { ...answers, [questionId]: value };
      const newSteps = buildAllSteps(newAnswers);
      const newIsLast = step >= newSteps.length - 1;

      setTimeout(() => {
        if (newIsLast) {
          onSubmit(newAnswers);
        } else {
          setStep((s) => s + 1);
        }
      }, 200);
    },
    [answers, onAnswer, onSubmit, step]
  );

  return (
    <div
      className="p-10 bg-bjj-bg rounded-3xl shadow-[0_32px_80px_rgba(0,36,87,0.18)] flex flex-col gap-6 w-[780px] h-[340px] max-h-[80vh] overflow-visible z-10"
      data-component="organism-pricing-form-modal"
    >
      <div className="flex justify-between items-start">
        <h2 className="font-heading font-extrabold text-[40px] leading-[1.2] text-bjj-primary">
          서비스 가격 조회
        </h2>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-center gap-0 min-h-10 overflow-visible py-1">
        {Array.from({ length: displayStepCount }, (_, i) => (
          <div key={i} className="contents">
            <div
              className={cn(
                "flex items-center justify-center w-7 h-7 rounded-full font-heading text-[12px] font-bold transition-all duration-300 shrink-0",
                i === step
                  ? "bg-bjj-primary text-white scale-110 shadow-[0_2px_12px_rgba(0,74,173,0.3)]"
                  : i < step
                    ? "bg-bjj-primary text-white opacity-60"
                    : "bg-[#f9fafb] text-bjj-text-muted border-2 border-bjj-divider",
              )}
            >
              {i + 1}
            </div>
            {i < displayStepCount - 1 && (
              <div
                className={cn(
                  "mx-1.5 h-0.5 w-10 rounded-full shrink-0",
                  i < step ? "bg-bjj-primary opacity-40" : "bg-bjj-divider",
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Current question */}
      <div className="flex flex-col gap-6">
        {currentQuestion && (
          <div className="flex flex-col gap-4 opacity-100" data-component="molecule-form-question">
            <div className="flex flex-col gap-1">
              <span className="font-heading font-extrabold text-[24px] leading-[1.2] text-bjj-text-dark">
                {currentQuestion.label}
              </span>
              {currentQuestion.helperText && (
                <span className="font-body font-medium text-[16px] leading-[1.5] text-bjj-text-muted">
                  {currentQuestion.helperText}
                </span>
              )}
            </div>

            {currentQuestion.inputType === "buttons" ? (
              <div className="flex gap-3 w-full">
                {currentQuestion.options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className={cn(
                      "flex-1 h-12 rounded-full cursor-pointer font-heading font-bold text-[16px] transition-all duration-200",
                      answers[currentQuestion.id] === opt.value
                        ? "bg-bjj-primary text-white border-2 border-bjj-primary"
                        : "bg-white text-bjj-text-dark border-2 border-bjj-divider hover:border-bjj-primary hover:text-bjj-primary",
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
          <p className="font-body text-[16px] font-medium text-bjj-text-muted text-center py-6">
            조회 중...
          </p>
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
            className="text-bjj-primary no-underline font-medium hover:underline"
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
      { id: "childType", label: "다태아인가요?", helperText: "다태아는 더 많은 지원을 받을 수 있어요.", options: CHILD_TYPE_OPTIONS, inputType: "dropdown" },
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
    if (childType && childType !== "단태아") {
      steps.push({ id: "staffCount", label: "추가 인력이 필요하신가요?", helperText: "다태아 출산 가정은 2명 이상의 관리사 고용이 가능해요.", options: YES_NO_OPTIONS, inputType: "buttons" });
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
