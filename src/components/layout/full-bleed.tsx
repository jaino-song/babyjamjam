import { cn } from "@/lib/utils";

interface FullBleedProps {
  children: React.ReactNode;
  className?: string;
}

export function FullBleed({ children, className }: FullBleedProps) {
  return (
    <section
      className={cn("w-screen max-w-480 px-50", className)}
      data-component="layout-full-bleed"
    >
      {children}
    </section>
  );
}
