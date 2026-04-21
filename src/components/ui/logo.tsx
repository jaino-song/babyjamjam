import { cn } from "@/lib/utils";

const LOGO_VARIANTS = {
  header: { src: "/images/logo.png", alt: "아가잼잼 로고", className: "w-[224px] h-[76px] object-cover" },
  footer: { src: "/images/footer-logo.png", alt: "아가잼잼", className: "w-[284px] h-[96px] object-contain" },
} as const;

type LogoVariant = keyof typeof LOGO_VARIANTS;

interface LogoProps {
  variant: LogoVariant;
  className?: string;
}

export function Logo({ variant, className }: LogoProps) {
  const config = LOGO_VARIANTS[variant];
  return (
    <img
      src={config.src}
      alt={config.alt}
      className={cn(config.className, className)}
      data-component="ui-logo"
    />
  );
}
