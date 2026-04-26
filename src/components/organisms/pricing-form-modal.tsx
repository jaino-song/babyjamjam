"use client";

import { useState, useCallback, type ReactNode } from "react";

import { SelectDropdown } from "@/components/ui/select-dropdown";
import type { FormAnswers as PricingFormAnswers } from "@/lib/pricing/contracts";
import {
  buildAllSteps,
  SUBSIDY_ELIGIBILITY_HELPER_KEY,
} from "@/lib/pricing/wizard";
import { cn } from "@/lib/utils";

const helperContent: Record<string, ReactNode> = {
  [SUBSIDY_ELIGIBILITY_HELPER_KEY]: (
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
};

interface PricingFormModalProps {
  answers: PricingFormAnswers;
  onAnswer: (questionId: string, value: string) => void;
  onSubmit: (finalAnswers: PricingFormAnswers) => void;
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
  const currentHelper =
    helperContent[currentQuestion?.helperKey ?? ""] ??
    currentQuestion?.helperKey ??
    null;
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
              {currentHelper && (
                <span className="form-question__helper">{currentHelper}</span>
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

      </div>
    </div>
  );
}
