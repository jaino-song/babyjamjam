import { cn } from "@/lib/utils";

type BadgeProps = {
  tone?: "primary" | "green";
  children: React.ReactNode;
  className?: string;
};

export function Badge({ tone = "primary", className, children }: BadgeProps) {
  return (
    <span
      className={cn("badge small-p", `badge--${tone}`, className)}
      data-component="ui-badge"
    >
      {children}
    </span>
  );
}
