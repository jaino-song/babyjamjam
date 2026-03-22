import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div
      className={cn("max-w-480 mx-auto flex flex-col items-center px-50", className)}
      data-component="layout-page-container"
    >
      {children}
    </div>
  );
}
