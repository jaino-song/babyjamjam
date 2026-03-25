"use client";

import Link from "next/link";
import { useRef, useEffect, useState, useCallback } from "react";

type NavItem = { label: string; href: string };

export function NavBar({
  items,
  activeLabel,
}: {
  items: NavItem[];
  activeLabel?: string;
}) {
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const initialIndex = items.findIndex((i) => i.label === activeLabel);
  const [activeIndex, setActiveIndex] = useState(initialIndex === -1 ? 0 : initialIndex);
  const [indicator, setIndicator] = useState({ x: 0, width: 0 });
  const [ready, setReady] = useState(false);

  const updateIndicator = useCallback(() => {
    const el = itemRefs.current[activeIndex];
    if (!el) return;
    setIndicator({ x: el.offsetLeft, width: el.offsetWidth });
    setReady(true);
  }, [activeIndex]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  return (
    <nav className="nav-bar" ref={navRef}>
      <span
        className="nav-bar__indicator"
        style={{
          transform: `translateX(${indicator.x}px)`,
          width: indicator.width,
          opacity: ready ? 1 : 0,
        }}
      />
      {items.map((item, index) => {
        const isActive = index === activeIndex;
        const className = `nav-bar__item${isActive ? " nav-bar__item--active" : ""}`;
        const ref = (el: HTMLElement | null) => { itemRefs.current[index] = el; };

        if (item.href.startsWith("/")) {
          return (
            <Link
              key={item.label}
              href={item.href}
              className={className}
              aria-current={isActive ? "page" : undefined}
              ref={ref}
              onClick={() => setActiveIndex(index)}
            >
              {item.label}
            </Link>
          );
        }

        return (
          <a
            key={item.label}
            href={item.href}
            className={className}
            ref={ref}
            onClick={(e) => {
              e.preventDefault();
              setActiveIndex(index);
            }}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
