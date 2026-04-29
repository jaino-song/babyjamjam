import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
  ["data-component"]?: string;
}

export function Divider({ className, "data-component": dataComponent }: DividerProps) {
  return (
    <div
      className={cn("border-t border-bjj-divider w-full", className)}
      data-component={dataComponent}
    />
  );
}
