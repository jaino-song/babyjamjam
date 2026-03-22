import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface LinkCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  className?: string;
}

export function LinkCard({ title, description, buttonText, buttonHref, className }: LinkCardProps) {
  return (
    <div
      className={cn("flex-1 flex flex-col items-center w-full gap-10", className)}
      data-component="molecule-link-card"
    >
      <div
        className="flex flex-col items-center gap-10"
        data-component="molecule-link-card-content"
      >
        <h3
          className="text-h3 font-extrabold font-heading text-bjj-primary"
          data-component="molecule-link-card-title"
        >
          {title}
        </h3>
        <p
          className="text-medium-p font-medium font-body text-bjj-text-paragraph max-w-[350px]"
          data-component="molecule-link-card-description"
        >
          {description}
        </p>
      </div>
      <Button
        href={buttonHref}
        variant="primary"
        data-component="molecule-link-card-button"
      >
        {buttonText}
      </Button>
    </div>
  );
}
