import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface LinkCardProps {
  title: string;
  description?: string;
  buttonText: string;
  buttonHref: string;
  disabled?: boolean;
  className?: string;
}

export function MobileLinkCard({ title, description, buttonText, buttonHref, disabled, className }: LinkCardProps) {
  return (
    <div
      className={cn("flex-1 flex flex-col items-center w-full gap-6 justify-between", className)}
      data-component="molecule-link-card"
    >
      <div
        className="flex flex-col items-center w-full gap-6 flex-1"
        data-component="molecule-link-card-content"
      >
        <h3
          className="h6 text-bjj-primary text-center whitespace-pre-line"
          data-component="molecule-link-card-title"
        >
          {title}
        </h3>
        {description && (
          <p
            className="medium-p max-w-[224px] text-center"
            data-component="molecule-link-card-description"
          >
            {description}
          </p>
        )}
      </div>
      {disabled ? (
        <Button variant="primary" disabled className="w-full px-2 text-[11px]" data-component="molecule-link-card-button">
          {buttonText}
        </Button>
      ) : (
        <Button href={buttonHref} variant="primary" className="w-full px-2 text-[11px]" data-component="molecule-link-card-button">
          {buttonText}
        </Button>
      )}
    </div>
  );
}
