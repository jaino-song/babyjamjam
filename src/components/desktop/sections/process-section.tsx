"use client";

import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

import { ProcessStep } from "@/components/molecules/process-step";
import { PROCESS_STEPS } from "@/components/mobile/sections/process-section.data";

type ProcessStepData = { number: string; title: ReactNode; description: string };

interface ProcessSectionProps {
  className?: string;
  title?: ReactNode;
  steps?: ProcessStepData[];
  titleClassName?: string;
  "data-component"?: string;
}

export function DesktopProcessSection({
  className,
  title = "산후도우미 서비스 진행 절차",
  steps = PROCESS_STEPS,
  titleClassName,
  "data-component": dataComponent,
}: ProcessSectionProps) {
  const getComponent = (suffix: string) =>
    dataComponent ? `${dataComponent}_${suffix}` : undefined;

  return (
    <section
      className={cn(
        "flex flex-col items-center gap-6 bg-bjj-primary w-screen self-start",
        "py-16",
        "px-[calc((100vw-var(--bjj-page-max-width))/2+var(--bjj-page-padding))]",
        "ml-[calc(-50vw+50%)]",
        className
      )}
      data-component={dataComponent}
    >
      <div className="flex justify-between w-full gap-6" data-component={getComponent("header")}>
        <h2 className="h2 text-bjj-primary-light" data-component={getComponent("header_title")}>
          {title}
        </h2>
      </div>
      <div className="flex w-full gap-3 max-tablet:flex-wrap" data-component={getComponent("steps")}>
        {steps.map((step) => (
          <ProcessStep
            key={step.number}
            number={step.number}
            title={step.title}
            description={step.description}
            titleClassName={titleClassName}
            data-component={getComponent(`step-${Number(step.number)}`)}
          />
        ))}
      </div>
    </section>
  );
}
