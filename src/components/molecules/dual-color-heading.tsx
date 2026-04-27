import { cn } from "@/lib/utils";

interface DualColorHeadingProps {
  mutedText: string;
  primaryText: string;
  align?: "left" | "center";
  level?: "h1" | "h2";
  className?: string;
  "data-component"?: string;
}

export function DualColorHeading({
  mutedText,
  primaryText,
  align = "center",
  level = "h2",
  className,
  "data-component": dataComponent,
}: DualColorHeadingProps) {
  const Tag = level;

  return (
    <Tag
      className={cn(
        align === "left" ? "h2-left" : "h3",
        className
      )}
      data-component={dataComponent}
    >
      <span
        style={{ color: "var(--bjj-color-text-muted)" }}
        data-component={dataComponent ? `${dataComponent}_muted` : undefined}
      >
        {mutedText}
      </span>
      <br />
      <span
        style={{ color: "var(--bjj-color-primary)" }}
        data-component={dataComponent ? `${dataComponent}_primary` : undefined}
      >
        {primaryText}
      </span>
    </Tag>
  );
}
