import { cn } from "@/lib/utils";

interface ListItemProps {
  number: string;
  description: string;
  className?: string;
}

export function ListItem({ number, description, className }: ListItemProps) {
  return (
    <div
      className={cn(
        "flex items-center w-full gap-7 py-5 pr-20 border-t border-bjj-divider",
        className
      )}
      data-component="molecule-list-item"
    >
      <span
        className="medium-p shrink-0"
        data-component="molecule-list-item-number"
      >
        {number}
      </span>
      <span
        className="medium-p"
        data-component="molecule-list-item-description"
      >
        {description}
      </span>
    </div>
  );
}
