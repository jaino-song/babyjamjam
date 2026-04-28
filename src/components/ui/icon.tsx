import { cn } from "@/lib/utils";

interface IconProps {
  name: string;
  className?: string;
  ["data-component"]?: string;
}

export function Icon({ name, className, "data-component": dataComponent }: IconProps) {
  return (
    <img
      src={`/images/${name}.svg`}
      alt={name}
      className={cn("w-6 h-6", className)}
      data-component={dataComponent}
    />
  );
}
