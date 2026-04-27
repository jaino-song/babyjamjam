import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface IconLockupProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  "data-component"?: string;
}

export function IconLockup({
  icon,
  title,
  description,
  className,
  "data-component": dataComponent,
}: IconLockupProps) {
  const Icon = icon;

  return (
    <div
      className={cn(
        "flex-1 flex flex-col items-start gap-6 border-t border-bjj-divider p-10 pt-10 pr-5 pb-10",
        className
      )}
      data-component={dataComponent}
    >
      <Icon
        className="w-4 h-4"
        aria-hidden="true"
        data-component={dataComponent ? `${dataComponent}-icon` : undefined}
      />
      <div
        className="flex flex-col"
        data-component={dataComponent ? `${dataComponent}-content` : undefined}
      >
        <h5
          className="text-h5 font-bold font-heading text-bjj-text-headline"
          data-component={dataComponent ? `${dataComponent}-title` : undefined}
        >
          {title}
        </h5>
        <p
          className="text-medium-p font-medium font-body text-bjj-text-paragraph tracking-wide leading-relaxed"
          data-component={
            dataComponent ? `${dataComponent}-description` : undefined
          }
        >
          {description}
        </p>
      </div>
    </div>
  );
}
