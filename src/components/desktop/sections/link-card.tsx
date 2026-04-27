import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface LinkCardProps {
  title: string;
  description?: string;
  buttonText: string;
  buttonHref: string;
  disabled?: boolean;
  className?: string;
  "data-component"?: string;
}

export function DesktopLinkCard({
  title,
  description,
  buttonText,
  buttonHref,
  disabled,
  className,
  "data-component": dataComponent,
}: LinkCardProps) {
  const getComponent = (suffix: string) =>
    dataComponent ? `${dataComponent}-${suffix}` : undefined;

  return (
    <div
      className={cn("flex-1 flex flex-col items-center w-full gap-6", className)}
      data-component={dataComponent}
    >
      <div
        className="flex flex-col items-center w-full gap-6"
        data-component={getComponent("content")}
      >
        <h3
          className="h6 text-bjj-primary text-center"
          data-component={getComponent("title")}
        >
          {title}
        </h3>
        {description && (
          <p
            className="medium-p max-w-[224px] text-center"
            data-component={getComponent("description")}
          >
            {description}
          </p>
        )}
      </div>
      {disabled ? (
        <Button variant="primary" disabled data-component={getComponent("button")}>
          {buttonText}
        </Button>
      ) : (
        <Button
          href={buttonHref}
          variant="primary"
          data-component={getComponent("button")}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
}
