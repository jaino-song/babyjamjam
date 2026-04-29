"use client";

import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: React.ReactNode;
  "data-component"?: string;
}

export function PageTransition({
  children,
  "data-component": dataComponent,
}: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <div
      key={pathname}
      data-component={dataComponent}
      className="flex flex-col items-center w-full animate-[page-enter_0.35s_ease_both]"
    >
      {children}
    </div>
  );
}
