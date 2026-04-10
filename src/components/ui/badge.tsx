import { cn } from "@/lib/utils";

type BadgeProps = {
  tone?: "primary" | "green";
  children: React.ReactNode;
  className?: string;
};

const TONE_CLASSES = {
  primary: "text-bjj-primary bg-[rgba(0,74,173,0.06)]",
  green: "text-bjj-text-caption bg-[rgba(72,92,17,0.08)]",
} as const;

export function Badge({ tone = "primary", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full font-semibold font-body text-[12px] leading-[27px] tracking-[0.231px]",
        TONE_CLASSES[tone],
        className,
      )}
      data-component="ui-badge"
    >
      {children}
    </span>
  );
}
