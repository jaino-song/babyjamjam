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
  { label: "인재 영입", href: "#" },
  { label: "고객센터", href: "#" },
];

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        "flex flex-col items-center w-full gap-[52px] pt-6 pb-3 mt-25 border-t border-bjj-divider",
        "max-mobile:gap-6",
        className
      )}
      data-component="organism-footer"
    >
      <div
        className="flex justify-between items-center w-full max-mobile:flex-col max-mobile:items-start max-mobile:gap-4"
        data-component="organism-footer-links"
      >
        <nav
          className="flex items-center gap-4 max-mobile:flex-wrap max-mobile:row-gap-2"
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
        className="flex justify-between items-end w-full max-mobile:flex-col max-mobile:items-start max-mobile:gap-4"
        data-component="organism-footer-bottom"
      >
        <Link href="/">
          <Logo variant="footer" className="!w-[180px] !h-[60px]" />
        </Link>
        <span
          className="caption-text"
          data-component="organism-footer-caption"
        >
          2025 All Rights Reserved By Jaino Company
        </span>
      </div>
    </footer>
  );
}
