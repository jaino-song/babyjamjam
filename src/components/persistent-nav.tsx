"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { NavBar } from "./nav-bar";
import { BookingButton } from "./booking-button";
import { NAV_ITEMS } from "@/data/nav-items";

export function PersistentNav() {
  const pathname = usePathname();
  const activeLabel = NAV_ITEMS.find(
    (item) => item.href !== "#" && pathname.startsWith(item.href)
  )?.label;

  return (
    <header className="flex flex-col justify-center items-center w-full h-24 relative max-mobile:h-auto max-mobile:py-6">
      <div className="flex justify-between items-center w-full max-mobile:flex-col max-mobile:gap-4">
        <Link href="/">
          <img
            src="/images/logo.png"
            alt="아가잼잼 로고"
            className="w-36 h-12 object-cover"
          />
        </Link>
        <NavBar items={NAV_ITEMS} activeLabel={activeLabel} />
        <BookingButton />
      </div>
    </header>
  );
}
