import { cn } from "@/lib/utils";

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  className?: string;
  "data-component"?: string;
}

export function ProcessStep({
  number,
  title,
  description,
  className,
  "data-component": dataComponent,
}: ProcessStepProps) {
  return (
    <div
      className={cn(
        "flex-1 flex flex-col gap-10 pt-10 pr-5 pb-3 border-t border-bjj-divider",
        className
      )}
      data-component={dataComponent}
    >
      <span
        className="font-number text-process-num font-normal leading-none tracking-[-0.04em] text-bjj-accent"
        data-component={dataComponent ? `${dataComponent}_number` : undefined}
      >
        {number}
      </span>
      <div
        className="flex flex-col items-start w-full gap-3"
        data-component={dataComponent ? `${dataComponent}_content` : undefined}
      >
        <h3
          className="h6 text-bjj-primary-light"
          data-component={dataComponent ? `${dataComponent}_title` : undefined}
        >
          {title}
        </h3>
        <p
          className="medium-p !text-bjj-primary-light"
          data-component={
            dataComponent ? `${dataComponent}_description` : undefined
          }
        >
          {description}
        </p>
      </div>
    </div>
  );
}
