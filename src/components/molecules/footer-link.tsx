import { cn } from "@/lib/utils";

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function FooterLink({ href, children, className }: FooterLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "font-number text-link font-bold tracking-tight text-bjj-text-link no-underline hover:underline",
        className
      )}
      data-component="molecule-footer-link"
    >
      {children}
    </a>
  );
}
