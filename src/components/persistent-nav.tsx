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
    <header className="navigation">
      <div className="navigation__inner">
        <Link href="/">
          <img
            src="/images/logo.png"
            alt="아가잼잼 로고"
            className="navigation__logo"
          />
        </Link>
        <NavBar items={NAV_ITEMS} activeLabel={activeLabel} />
        <BookingButton />
      </div>
    </header>
  );
}
