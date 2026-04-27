import { cn } from "@/lib/utils";

interface ListItemProps {
  number: string;
  description: string;
  className?: string;
  "data-component"?: string;
}

export function ListItem({
  number,
  description,
  className,
  "data-component": dataComponent,
}: ListItemProps) {
  return (
    <div
      className={cn(
        "flex items-center w-full gap-7 py-5 pr-20 border-t border-bjj-divider",
        className
      )}
      data-component={dataComponent}
    >
      <span
        className="medium-p shrink-0"
        data-component={dataComponent ? `${dataComponent}-number` : undefined}
      >
        {number}
      </span>
      <span
        className="medium-p"
        data-component={
          dataComponent ? `${dataComponent}-description` : undefined
        }
      >
        {description}
      </span>
    </div>
  );
}
