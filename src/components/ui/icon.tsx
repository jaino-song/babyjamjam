import { cn } from "@/lib/utils";

interface IconProps {
  name: string;
  className?: string;
}

export function Icon({ name, className }: IconProps) {
  return (
    <img
      src={`/images/${name}.svg`}
      alt={name}
      className={cn("w-6 h-6", className)}
      data-component="ui-icon"
    />
  );
}
