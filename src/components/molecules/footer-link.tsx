import Link from "next/link";
import { cn } from "@/lib/utils";

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  "data-component"?: string;
}

export function FooterLink({
  href,
  children,
  className,
  "data-component": dataComponent,
}: FooterLinkProps) {
  const classes = cn(
    "font-number text-[0.5625rem] leading-[1.52] tracking-[-0.015em] font-bold text-bjj-text-link no-underline hover:underline",
    className
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} data-component={dataComponent}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} data-component={dataComponent}>
      {children}
    </a>
  );
}
