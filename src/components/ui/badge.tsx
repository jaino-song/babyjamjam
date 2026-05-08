import { cn } from "@/lib/utils";

type BadgeProps = {
  tone?: "primary" | "green";
  children: React.ReactNode;
  className?: string;
  ["data-component"]?: string;
};

const TONE_CLASSES = {
  primary: "text-bjj-primary bg-bjj-primary/[0.06]",
  green: "text-bjj-text-caption bg-bjj-text-caption/[0.08]",
} as const;

export function Badge({
  tone = "primary",
  className,
  children,
  "data-component": dataComponent,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "small-p inline-flex items-center px-2 py-0.5 rounded-full font-semibold text-[0.75rem] leading-[27px] tracking-[0.231px]",
        TONE_CLASSES[tone],
        className,
      )}
      data-component={dataComponent}
    >
      {children}
    </span>
  );
}
