"use client";

import { useCallback, useState, type ReactNode } from "react";

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

interface DesktopPricingFormModalProps {
  answers: PricingFormAnswers;
  onAnswer: (questionId: string, value: string) => void;
  onSubmit: (finalAnswers: PricingFormAnswers) => void;
  isLoading?: boolean;
}

export function DesktopPricingFormModal({
  answers,
  onAnswer,
  onSubmit,
}: DesktopPricingFormModalProps) {
  const [step, setStep] = useState(0);

  const allSteps = buildAllSteps(answers);
  const currentQuestion = allSteps[step];
  const currentHelper =
    helperContent[currentQuestion?.helperKey ?? ""] ??
    currentQuestion?.helperKey ??
    null;
  const isMultiple = answers.childType && answers.childType !== "단태아";
  const displayStepCount = answers.subsidy === "yes" ? (isMultiple ? 5 : 4) : 4;

  const handleSelect = useCallback(
    (questionId: string, value: string) => {
      onAnswer(questionId, value);

      const nextAnswers = { ...answers, [questionId]: value };
      const nextSteps = buildAllSteps(nextAnswers);
      const shouldSubmit = step >= nextSteps.length - 1;

      setTimeout(() => {
        if (shouldSubmit) {
          onSubmit(nextAnswers);
          return;
        }

        setStep((currentStep) => currentStep + 1);
      }, 200);
    },
    [answers, onAnswer, onSubmit, step]
  );

  return (
    <div className="pricing-modal" data-component="organism-pricing-form-modal">
      <div className="pricing-modal__header">
        <h2 className="pricing-modal__title">서비스 가격 조회</h2>
      </div>

      <div className="wizard-stepper">
        {Array.from({ length: displayStepCount }, (_, index) => (
          <div key={index} className="wizard-stepper__item">
            <div
              className={`wizard-stepper__circle ${
                index === step
                  ? "wizard-stepper__circle--active"
                  : index < step
                    ? "wizard-stepper__circle--done"
                    : "wizard-stepper__circle--pending"
              }`}
            >
              {index + 1}
            </div>
            {index < displayStepCount - 1 && (
              <div
                className={`wizard-stepper__connector ${
                  index < step ? "wizard-stepper__connector--done" : ""
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="pricing-modal__body">
        {currentQuestion && (
          <div
            className="form-question form-question--visible"
            data-component="molecule-form-question"
          >
            <div className="form-question__header">
              <span className="form-question__label">{currentQuestion.label}</span>
              {currentHelper && (
                <span className="form-question__helper">{currentHelper}</span>
              )}
            </div>

            {currentQuestion.inputType === "buttons" ? (
              <div className="wizard-btn-group">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={cn(
                      "wizard-btn-group__btn",
                      answers[currentQuestion.id] === option.value &&
                        "wizard-btn-group__btn--selected"
                    )}
                    onClick={() => handleSelect(currentQuestion.id, option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            ) : (
              <SelectDropdown
                options={currentQuestion.options}
                value={answers[currentQuestion.id]}
                placeholder={currentQuestion.placeholder}
                onChange={(value) => handleSelect(currentQuestion.id, value)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
