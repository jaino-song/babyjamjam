"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { BookingButton } from "@/components/booking-button";
import { NAV_ITEMS } from "@/data/nav-items";

import { DesktopNavBar } from "./nav-bar";

export function DesktopPersistentNav() {
  const pathname = usePathname();
  const activeLabel = NAV_ITEMS.find(
    (item) => item.href !== "#" && pathname.startsWith(item.href)
  )?.label;

  return (
    <header className="flex justify-between items-center w-full h-24 relative max-mobile:h-16">
      <Link href="/" className="flex-shrink-0">
        <img
          src="/images/logo.png"
          alt="아가잼잼 로고"
          className="w-36 h-12 object-cover"
        />
      </Link>
      <div className="flex-1 flex justify-center">
        <DesktopNavBar items={NAV_ITEMS} activeLabel={activeLabel} />
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <BookingButton />
      </div>
    </header>
  );
}
