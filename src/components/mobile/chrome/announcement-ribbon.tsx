"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface RibbonConfig {
  enabled: boolean;
  message: string;
  backgroundColor: string;
  textColor: string;
  linkText: string;
  linkHref: string;
  linkColor: string;
}

interface MobileAnnouncementRibbonProps {
  'data-component'?: string;
}

export function MobileAnnouncementRibbon({
  'data-component': dataComponent,
}: MobileAnnouncementRibbonProps) {
  const [config, setConfig] = useState<RibbonConfig | null>(null);
  const messageDataComponent = dataComponent
    ? `${dataComponent}_message`
    : undefined;
  const linkDataComponent = dataComponent ? `${dataComponent}_link` : undefined;
  const iconDataComponent = dataComponent ? `${dataComponent}_icon` : undefined;

  useEffect(() => {
    fetch("/api/ribbon")
      .then((res) => res.json())
      .then((data: RibbonConfig) => setConfig(data))
      .catch(() => setConfig(null));
  }, []);

  if (!config?.enabled || !config.message) return null;

  return (
    <div
      data-component={dataComponent}
      className="flex items-center justify-center gap-2 w-screen px-[var(--bjj-page-padding)] py-2.5 text-xs font-medium font-body tracking-[-0.01em] text-center"
      style={{ background: config.backgroundColor, color: config.textColor }}
    >
      <span
        data-component={iconDataComponent}
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ background: config.linkColor }}
      />
      <span data-component={messageDataComponent}>{config.message}</span>
      {config.linkText && config.linkHref && (
        <Link
          data-component={linkDataComponent}
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
