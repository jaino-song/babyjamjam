import Image from "next/image";

import { cn } from "@/lib/utils";

const LOGO_VARIANTS = {
  header: { src: "/images/logo.png", alt: "아가잼잼 로고", className: "w-[224px] h-[76px] object-cover" },
  footer: { src: "/images/footer-logo.png", alt: "아가잼잼", className: "w-[284px] h-[96px] object-contain" },
} as const;

type LogoVariant = keyof typeof LOGO_VARIANTS;

interface LogoProps {
  variant: LogoVariant;
  className?: string;
  ["data-component"]?: string;
}

export function Logo({ variant, className, "data-component": dataComponent }: LogoProps) {
  const config = LOGO_VARIANTS[variant];
  return (
    <Image
      src={config.src}
      alt={config.alt}
      width={750}
      height={250}
      sizes={variant === "footer" ? "180px" : "224px"}
      className={cn(config.className, className)}
      data-component={dataComponent}
    />
  );
}
