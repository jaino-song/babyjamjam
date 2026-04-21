"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface RibbonConfig {
  enabled: boolean;
  message: string;
  backgroundColor: string;
  textColor: string;
  linkText: string;
  linkHref: string;
  linkColor: string;
}

export function AnnouncementRibbon() {
  const [config, setConfig] = useState<RibbonConfig | null>(null);

  useEffect(() => {
    fetch("/api/ribbon")
      .then((res) => res.json())
      .then((data: RibbonConfig) => setConfig(data))
      .catch(() => setConfig(null));
  }, []);

  if (!config?.enabled || !config.message) return null;

  return (
    <div
      className="flex items-center justify-center gap-2 w-screen px-[var(--bjj-page-padding)] py-2.5 text-nav font-medium font-body tracking-[-0.01em] text-center max-mobile:px-6 max-mobile:text-xs"
      style={{ background: config.backgroundColor, color: config.textColor }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ background: config.linkColor }}
      />
      <span>{config.message}</span>
      {config.linkText && config.linkHref && (
        <Link
          href={config.linkHref}
          className="no-underline font-semibold whitespace-nowrap hover:underline"
          style={{ color: config.linkColor }}
        >
          {config.linkText} ›
        </Link>
      )}
    </div>
  );
}
