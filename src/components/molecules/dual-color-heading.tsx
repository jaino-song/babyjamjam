import { cn } from "@/lib/utils";

interface DualColorHeadingProps {
  mutedText: string;
  primaryText: string;
  align?: "left" | "center";
  level?: "h1" | "h2";
  className?: string;
}

export function DualColorHeading({
  mutedText,
  primaryText,
  align = "center",
  level = "h2",
  className,
}: DualColorHeadingProps) {
  const Tag = level;

  return (
    <Tag
      className={cn(
        "text-h2 font-extrabold font-heading",
        align === "left" ? "text-left" : "text-center",
        className
      )}
      data-component="molecule-dual-color-heading"
    >
      <span
        className="text-bjj-text-muted"
        data-component="molecule-dual-color-heading-muted"
      >
        {mutedText}
      </span>
      <br />
      <span
        className="text-bjj-primary"
        data-component="molecule-dual-color-heading-primary"
      >
        {primaryText}
      </span>
    </Tag>
  );
}
