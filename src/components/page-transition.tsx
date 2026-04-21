"use client";

import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="flex flex-col items-center w-full animate-[page-enter_0.35s_ease_both] mt-16">
      {children}
    </div>
  );
}
