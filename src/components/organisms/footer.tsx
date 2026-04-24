import Link from "next/link";
import { cn } from "@/lib/utils";

import { Logo } from "@/components/ui/logo";
import { FooterLink } from "@/components/molecules/footer-link";

const FOOTER_LINKS = [
  { label: "서비스 규정", href: "#" },
  { label: "서비스 가격", href: "/pricing" },
  { label: "서비스 제공 항목", href: "#" },
  { label: "전국 지점", href: "/locations" },
  { label: "FAQ & 이용약관", href: "/faq" },
];

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        "flex flex-col items-center w-full gap-6 pt-6 pb-3 mt-[100px] border-t border-bjj-divider",
        "mobile:gap-[52px]",
        className
      )}
      data-component="organism-footer"
    >
      <div
        className="flex flex-col items-start gap-4 w-full mobile:flex-row mobile:items-center mobile:justify-between mobile:gap-0"
        data-component="organism-footer-links"
      >
        <nav
          className="flex flex-wrap items-center gap-x-4 gap-y-2 mobile:flex-nowrap"
          data-component="organism-footer-nav"
        >
          {FOOTER_LINKS.map((link) => (
            <FooterLink key={link.label} href={link.href}>
              {link.label}
            </FooterLink>
          ))}
        </nav>
      </div>
      <div
        className="flex flex-col items-start gap-4 w-full mobile:flex-row mobile:items-end mobile:justify-between mobile:gap-0"
        data-component="organism-footer-bottom"
      >
        <Link href="/">
          <Logo variant="footer" className="!w-[180px] !h-[60px]" />
        </Link>
        <span
          className="caption-text"
          data-component="organism-footer-caption"
        >
          2026 All Rights Reserved By Covenant Labs
        </span>
      </div>
    </footer>
  );
}
