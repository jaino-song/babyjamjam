import { cn } from "@/lib/utils";

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function NavItem({ href, children, className }: NavItemProps) {
  return (
    <a
      href={href}
      className={cn(
        "font-heading text-nav font-extrabold tracking-tight text-bjj-primary-light whitespace-nowrap no-underline",
        className
      )}
      data-component="molecule-nav-item"
    >
      {children}
    </a>
  );
}
