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

export function MobileLinkCard({
  title,
  description,
  buttonText,
  buttonHref,
  disabled,
  className,
  "data-component": dataComponent,
}: LinkCardProps) {
  const getComponent = (suffix: string) =>
    dataComponent ? `${dataComponent}_${suffix}` : undefined;

  return (
    <div
      className={cn("flex-1 flex flex-col items-center w-full gap-6 justify-between", className)}
      data-component={dataComponent}
    >
      <div
        className="flex flex-col items-center w-full gap-6 flex-1"
        data-component={getComponent("content")}
      >
        <h5
          className="h5 text-bjj-primary text-center whitespace-pre-line"
          data-component={getComponent("title")}
        >
          {title}
        </h5>
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
        <Button
          variant="primary"
          disabled
          className="w-full px-2 text-[0.6875rem]"
          data-component={getComponent("button")}
        >
          {buttonText}
        </Button>
      ) : (
        <Button
          href={buttonHref}
          variant="primary"
          className="w-full px-2 text-[0.6875rem]"
          data-component={getComponent("button")}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
}
