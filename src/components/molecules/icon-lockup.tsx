import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface IconLockupProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function IconLockup({ icon, title, description, className }: IconLockupProps) {
  const Icon = icon;

  return (
    <div
      className={cn(
        "flex-1 flex flex-col items-start gap-6 border-t border-bjj-divider p-10 pt-10 pr-5 pb-10",
        className
      )}
      data-component="molecule-icon-lockup"
    >
      <Icon className="icon-lockup__icon" aria-hidden="true" data-component="molecule-icon-lockup-icon" />
      <div
        className="flex flex-col"
        data-component="molecule-icon-lockup-content"
      >
        <h5
          className="text-h5 font-bold font-heading text-bjj-text-headline"
          data-component="molecule-icon-lockup-title"
        >
          {title}
        </h5>
        <p
          className="text-medium-p font-medium font-body text-bjj-text-paragraph tracking-wide leading-relaxed"
          data-component="molecule-icon-lockup-description"
        >
          {description}
        </p>
      </div>
    </div>
  );
}
