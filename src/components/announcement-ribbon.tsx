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
      className="announcement-ribbon"
      style={{ background: config.backgroundColor, color: config.textColor }}
    >
      <span
        className="announcement-ribbon__dot"
        style={{ background: config.linkColor }}
      />
      <span>{config.message}</span>
      {config.linkText && config.linkHref && (
        <Link
          href={config.linkHref}
          className="announcement-ribbon__link"
          style={{ color: config.linkColor }}
        >
          {config.linkText} ›
        </Link>
      )}
    </div>
  );
}
