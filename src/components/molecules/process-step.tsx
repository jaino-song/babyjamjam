import { cn } from "@/lib/utils";

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  className?: string;
}

export function ProcessStep({ number, title, description, className }: ProcessStepProps) {
  return (
    <div
      className={cn(
        "flex-1 flex flex-col gap-10 pt-10 pr-5 pb-3 border-t border-bjj-divider",
        className
      )}
      data-component="molecule-process-step"
    >
      <span
        className="font-number text-process-num font-normal leading-none tracking-[-0.04em] text-bjj-accent"
        data-component="molecule-process-step-number"
      >
        {number}
      </span>
      <div
        className="flex flex-col items-start w-full gap-3"
        data-component="molecule-process-step-content"
      >
        <h3
          className="h6 text-bjj-primary-light"
          data-component="molecule-process-step-title"
        >
          {title}
        </h3>
        <p
          className="medium-p !text-bjj-primary-light"
          data-component="molecule-process-step-description"
        >
          {description}
        </p>
      </div>
    </div>
  );
}
