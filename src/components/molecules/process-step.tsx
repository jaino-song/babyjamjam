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
        "flex-1 flex flex-col items-start border-t border-bjj-divider gap-15 pt-15 pr-7 pb-5",
        className
      )}
      data-component="molecule-process-step"
    >
      <span
        className="font-number text-process-num font-normal leading-none tracking-tighter text-bjj-accent"
        data-component="molecule-process-step-number"
      >
        {number}
      </span>
      <div
        className="flex flex-col gap-5"
        data-component="molecule-process-step-content"
      >
        <h4
          className="text-h4 font-bold font-heading text-bjj-primary-light"
          data-component="molecule-process-step-title"
        >
          {title}
        </h4>
        <p
          className="text-medium-p font-medium font-body text-bjj-primary-light tracking-wide leading-relaxed"
          data-component="molecule-process-step-description"
        >
          {description}
        </p>
      </div>
    </div>
  );
}
