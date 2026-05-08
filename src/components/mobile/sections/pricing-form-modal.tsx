"use client";

import { useCallback, useState } from "react";

import { SelectDropdown } from "@/components/ui/select-dropdown";
import type { FormAnswers as PricingFormAnswers } from "@/lib/pricing/contracts";
import {
  buildAllSteps,
  SUBSIDY_ELIGIBILITY_HELPER_KEY,
} from "@/lib/pricing/wizard";
import { cn } from "@/lib/utils";

function buildMobileSteps(answers: PricingFormAnswers) {
  return buildAllSteps(answers).filter(
    (question) => !(answers.subsidy === "no" && question.id === "servicePeriod")
  );
}

interface MobilePricingFormModalProps {
  answers: PricingFormAnswers;
  onAnswer: (questionId: string, value: string) => void;
  onSubmit: (finalAnswers: PricingFormAnswers) => void;
  isLoading?: boolean;
  "data-component"?: string;
}

export function MobilePricingFormModal({
  answers,
  onAnswer,
  onSubmit,
  "data-component": dataComponent,
}: MobilePricingFormModalProps) {
  const [step, setStep] = useState(0);
  const getComponent = (suffix: string) =>
    dataComponent ? `${dataComponent}_${suffix}` : undefined;

  const allSteps = buildMobileSteps(answers);
  const currentQuestion = allSteps[step];
  const currentHelper =
    currentQuestion?.helperKey === SUBSIDY_ELIGIBILITY_HELPER_KEY ? (
      <>
        지원 대상 여부는{" "}
        <a
          href="https://www.bokjiro.go.kr/ssis-tbu/twatbz/mkclAsis/mkclInsertPwnbPage.do"
          target="_blank"
          rel="noopener noreferrer"
          className="pricing-modal__link"
          data-component={getComponent("question-helper-link")}
        >
          여기
        </a>
        에서 확인하실 수 있어요.
      </>
    ) : (
      currentQuestion?.helperKey ?? null
    );
  const isMultiple = answers.childType && answers.childType !== "단태아";
  const displayStepCount = answers.subsidy ? allSteps.length : 4;

  const handleSelect = useCallback(
    (questionId: string, value: string) => {
      onAnswer(questionId, value);

      const nextAnswers = { ...answers, [questionId]: value };
      const nextSteps = buildMobileSteps(nextAnswers);
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
    <div className="pricing-modal" data-component={dataComponent}>
      <div className="pricing-modal__header" data-component={getComponent("header")}>
        <h3 className="h3 pricing-modal__title" data-component={getComponent("title")}>
          서비스 가격 조회
        </h3>
      </div>

      <div className="wizard-stepper" data-component={getComponent("stepper")}>
        {Array.from({ length: displayStepCount }, (_, index) => (
          <div
            key={index}
            className="wizard-stepper__item"
            data-component={getComponent(`step-${index + 1}`)}
          >
            <div
              className={`wizard-stepper__circle ${
                index === step
                  ? "wizard-stepper__circle--active"
                  : index < step
                    ? "wizard-stepper__circle--done"
                    : "wizard-stepper__circle--pending"
              }`}
              data-component={getComponent(`step-${index + 1}-circle`)}
            >
              {index + 1}
            </div>
            {index < displayStepCount - 1 && (
              <div
                className={`wizard-stepper__connector ${
                  index < step ? "wizard-stepper__connector--done" : ""
                }`}
                data-component={getComponent(`step-${index + 1}-connector`)}
              />
            )}
          </div>
        ))}
      </div>

      <div className="pricing-modal__body" data-component={getComponent("body")}>
        {currentQuestion && (
          <div
            className="form-question form-question--visible"
            data-component={getComponent("question")}
          >
            <div
              className="form-question__header"
              data-component={getComponent("question-header")}
            >
              <h5
                className="h5 form-question__label"
                data-component={getComponent("question-label")}
              >
                {currentQuestion.label}
              </h5>
              {currentHelper && (
                <p
                  className="medium-p form-question__helper"
                  data-component={getComponent("question-helper")}
                >
                  {currentHelper}
                </p>
              )}
            </div>

            {currentQuestion.inputType === "buttons" ? (
              <div
                className="wizard-btn-group"
                data-component={getComponent("question-buttons")}
              >
                {currentQuestion.options.map((option, optionIndex) => (
                  <button
                    key={option.value}
                    type="button"
                    className={cn(
                      "wizard-btn-group__btn",
                      "h6",
                      answers[currentQuestion.id] === option.value &&
                        "wizard-btn-group__btn--selected"
                    )}
                    onClick={() => handleSelect(currentQuestion.id, option.value)}
                    data-component={getComponent(`question-button-${optionIndex + 1}`)}
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
                data-component={getComponent("question-select")}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
