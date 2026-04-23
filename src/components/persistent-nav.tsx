"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NavBar } from "./nav-bar";
import { BookingButton } from "./booking-button";
import { NAV_ITEMS } from "@/data/nav-items";

export function PersistentNav() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const activeLabel = NAV_ITEMS.find(
    (item) => item.href !== "#" && pathname.startsWith(item.href)
  )?.label;

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
      <header className="flex justify-between items-center w-full h-24 relative max-mobile:h-16">
        <Link href="/" className="flex-shrink-0">
          <img
            src="/images/logo.png"
            alt="아가잼잼 로고"
            className="w-36 h-12 object-cover max-mobile:w-24 max-mobile:h-8"
          />
        </Link>
        <div className="max-mobile:hidden flex-1 flex justify-center">
          <NavBar items={NAV_ITEMS} activeLabel={activeLabel} />
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="max-mobile:hidden">
            <BookingButton />
          </div>
          <button
            type="button"
            className="nav-hamburger"
            onClick={() => setDrawerOpen(true)}
            aria-label="메뉴 열기"
            aria-expanded={drawerOpen}
            aria-controls="nav-drawer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
          />
          <aside
            id="nav-drawer"
            className="nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="메뉴"
          >
            <button
              type="button"
              className="nav-drawer__close"
              onClick={() => setDrawerOpen(false)}
              aria-label="메뉴 닫기"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <nav className="nav-drawer__items">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="nav-drawer__link"
                  aria-current={item.label === activeLabel ? "page" : undefined}
                  onClick={() => setDrawerOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="nav-drawer__cta">
              <BookingButton />
            </div>
          </aside>
        </>
      )}
    </>
  );
}
