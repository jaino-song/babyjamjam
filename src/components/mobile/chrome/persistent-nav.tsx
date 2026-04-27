"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { NAV_ITEMS } from "@/data/nav-items";

import { MobileBookingButton } from "./booking-button";

interface MobilePersistentNavProps {
  'data-component'?: string;
}

export function MobilePersistentNav({
  'data-component': dataComponent,
}: MobilePersistentNavProps = {}) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const activeLabel = NAV_ITEMS.find(
    (item) => item.href !== "#" && pathname.startsWith(item.href)
  )?.label;
  const bookingButtonProps = dataComponent
    ? { "data-component": `${dataComponent}_drawer-booking-button` }
    : {};

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [drawerOpen]);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className="flex justify-between items-center w-full h-16 relative"
        data-component={dataComponent}
      >
        <Link
          href="/"
          className="flex-shrink-0"
          data-component={dataComponent ? `${dataComponent}_logo-link` : undefined}
        >
          <img
            src="/images/logo.svg"
            alt="아가잼잼 로고"
            className="h-[58px] w-[58px] object-contain"
            data-component={dataComponent ? `${dataComponent}_logo-image` : undefined}
          />
        </Link>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            className="nav-hamburger"
            onClick={() => setDrawerOpen(true)}
            aria-label="메뉴 열기"
            aria-expanded={drawerOpen}
            aria-controls="nav-drawer"
            data-component={dataComponent ? `${dataComponent}_hamburger-button` : undefined}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              data-component={dataComponent ? `${dataComponent}_hamburger-icon` : undefined}
            >
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </header>
      {drawerOpen && (
        <>
          <div
            className="nav-overlay"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
            data-component={dataComponent ? `${dataComponent}_overlay` : undefined}
          />
          <aside
            id="nav-drawer"
            className="nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="메뉴"
            data-component={dataComponent ? `${dataComponent}_drawer` : undefined}
          >
            <button
              type="button"
              className="nav-drawer__close"
              onClick={() => setDrawerOpen(false)}
              aria-label="메뉴 닫기"
              data-component={dataComponent ? `${dataComponent}_drawer-close` : undefined}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                data-component={dataComponent ? `${dataComponent}_drawer-close-icon` : undefined}
              >
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <nav
              className="nav-drawer__items"
              data-component={dataComponent ? `${dataComponent}_drawer-items` : undefined}
            >
              {NAV_ITEMS.map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="nav-drawer__link"
                  aria-current={item.label === activeLabel ? "page" : undefined}
                  onClick={() => setDrawerOpen(false)}
                  data-component={
                    dataComponent ? `${dataComponent}_drawer-link-${index}` : undefined
                  }
                >
                  {item.label}
                </Link>
              ))}
              <MobileBookingButton
                onModalClose={() => setDrawerOpen(false)}
                {...bookingButtonProps}
              />
            </nav>
          </aside>
        </>
      )}
    </>
  );
}
