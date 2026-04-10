import Link from "next/link";
import { cn } from "@/lib/utils";

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function FooterLink({ href, children, className }: FooterLinkProps) {
  const classes = cn(
    "font-number text-link font-bold tracking-tight text-bjj-text-link no-underline hover:underline",
    className
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} data-component="molecule-footer-link">
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} data-component="molecule-footer-link">
      {children}
    </a>
  );
}
