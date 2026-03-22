import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
}

export function Divider({ className }: DividerProps) {
  return (
    <div
      className={cn("border-t border-bjj-divider w-full", className)}
      data-component="ui-divider"
    />
  );
}
