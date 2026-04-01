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
        align === "left" ? "h3-left" : "h3",
        className
      )}
      data-component="molecule-dual-color-heading"
    >
      <span
        style={{ color: "var(--bjj-color-text-muted)" }}
        data-component="molecule-dual-color-heading-muted"
      >
        {mutedText}
      </span>
      <br />
      <span
        style={{ color: "var(--bjj-color-primary)" }}
        data-component="molecule-dual-color-heading-primary"
      >
        {primaryText}
      </span>
    </Tag>
  );
}
