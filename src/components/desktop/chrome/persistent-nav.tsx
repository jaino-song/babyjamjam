"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV_ITEMS } from "@/data/nav-items";

import { DesktopBookingButton } from "./booking-button";
import { DesktopNavBar } from "./nav-bar";

interface DesktopPersistentNavProps {
  'data-component'?: string;
}

export function DesktopPersistentNav({
  'data-component': dataComponent,
}: DesktopPersistentNavProps = {}) {
  const pathname = usePathname();
  const activeLabel = NAV_ITEMS.find(
    (item) => item.href !== "#" && pathname.startsWith(item.href)
  )?.label;
  const bookingButtonProps = dataComponent
    ? { "data-component": `${dataComponent}_booking-button` }
    : {};

  return (
    <header
      className="flex justify-between items-center w-full h-24 relative"
      data-component={dataComponent}
    >
      <Link
        href="/"
        className="flex-shrink-0"
        data-component={dataComponent ? `${dataComponent}_logo-link` : undefined}
      >
        <img
          src="/images/logo.png"
          alt="아가잼잼 로고"
          className="w-36 h-12 object-cover"
          data-component={dataComponent ? `${dataComponent}_logo-image` : undefined}
        />
      </Link>
      <div
        className="flex-1 flex justify-center"
        data-component={dataComponent ? `${dataComponent}_nav-wrapper` : undefined}
      >
        <DesktopNavBar
          items={NAV_ITEMS}
          activeLabel={activeLabel}
          data-component={dataComponent ? `${dataComponent}_nav-bar` : undefined}
        />
      </div>
      <div
        className="flex items-center gap-2 flex-shrink-0"
        data-component={dataComponent ? `${dataComponent}_cta-wrapper` : undefined}
      >
        <DesktopBookingButton {...bookingButtonProps} />
      </div>
    </header>
  );
}
