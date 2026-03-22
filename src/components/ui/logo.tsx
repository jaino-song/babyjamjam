import { cn } from "@/lib/utils";

const LOGO_VARIANT_CLASSES = {
  header: "w-[225px] h-[75px] object-cover",
  footer: "w-[283px] h-[94px] object-contain",
} as const;

type LogoVariant = keyof typeof LOGO_VARIANT_CLASSES;

interface LogoProps {
  variant: LogoVariant;
  className?: string;
}

export function Logo({ variant, className }: LogoProps) {
  return (
    <img
      src="/images/logo.svg"
      alt="BabyJamJam"
      className={cn(LOGO_VARIANT_CLASSES[variant], className)}
      data-component="ui-logo"
    />
  );
}
