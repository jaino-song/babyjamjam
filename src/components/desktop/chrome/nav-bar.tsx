"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

type NavItem = { label: string; href: string };

interface DesktopNavBarProps {
  items: NavItem[];
  activeLabel?: string;
  'data-component'?: string;
}

export function DesktopNavBar({
  items,
  activeLabel,
  'data-component': dataComponent,
}: DesktopNavBarProps) {
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(() =>
    items.findIndex((i) => i.label === activeLabel)
  );
  const [indicator, setIndicator] = useState({ x: 0, width: 0 });
  const [ready, setReady] = useState(false);

  // Sync with activeLabel prop (shared layout navigation)
  useEffect(() => {
    const idx = items.findIndex((i) => i.label === activeLabel);
    setActiveIndex(idx);
  }, [activeLabel, items]);

  // Position indicator synchronously before paint — prevents spurious slide-in animation
  useLayoutEffect(() => {
    if (activeIndex < 0) {
      setReady(false);
      return;
    }
    const el = itemRefs.current[activeIndex];
    if (!el) return;
    setIndicator({ x: el.offsetLeft, width: el.offsetWidth });
    setReady(true);
  }, [activeIndex]);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      if (activeIndex < 0) return;
      const el = itemRefs.current[activeIndex];
      if (!el) return;
      setIndicator({ x: el.offsetLeft, width: el.offsetWidth });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex]);

  return (
    <nav
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-stretch h-10 gap-0 bg-bjj-primary backdrop-blur-[32px] rounded-nav p-0"
      data-component={dataComponent}
    >
      <span
        className="nav-indicator"
        style={{
          transform: `translateX(${indicator.x}px)`,
          width: indicator.width,
          opacity: ready ? 1 : 0,
        }}
        data-component={dataComponent ? `${dataComponent}-active-indicator` : undefined}
      />
      {items.map((item, index) => {
        const isActive = index === activeIndex;
        const itemBase = dataComponent ? `${dataComponent}-item-${index}` : undefined;
        const itemClasses =
          "relative z-[1] flex items-center font-heading font-[800] text-nav leading-[1.4] tracking-[-0.025em] text-bjj-primary-light no-underline whitespace-nowrap px-4 rounded-nav";
        const ref = (el: HTMLElement | null) => {
          itemRefs.current[index] = el;
        };

        if (item.href.startsWith("/")) {
          return (
            <Link
              key={item.label}
              href={item.href}
              className={itemClasses}
              aria-current={isActive ? "page" : undefined}
              ref={ref}
              onClick={() => setActiveIndex(index)}
              data-component={itemBase ? `${itemBase}-link` : undefined}
            >
              {item.label}
            </Link>
          );
        }

        return (
          <a
            key={item.label}
            href={item.href}
            className={itemClasses}
            ref={ref}
            onClick={(e) => {
              e.preventDefault();
              setActiveIndex(index);
            }}
            data-component={itemBase ? `${itemBase}-link` : undefined}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
