import { cn } from "@/lib/utils";

import { Logo } from "@/components/ui/logo";
import { FooterLink } from "@/components/molecules/footer-link";

const FOOTER_LINKS = [
  "서비스 규정",
  "서비스 가격",
  "서비스 제공 항목",
  "전국 지점",
  "인재 영입",
  "산후도우미 관리사 교육",
  "고객센터",
];

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        "flex flex-col items-center w-full gap-20 pt-10 pb-5 border-t border-bjj-divider",
        className
      )}
      data-component="organism-footer"
    >
      <div
        className="flex justify-between items-center w-full"
        data-component="organism-footer-links"
      >
        <nav
          className="flex items-center gap-6"
          data-component="organism-footer-nav"
        >
          {FOOTER_LINKS.map((label) => (
            <FooterLink key={label} href="#">
              {label}
            </FooterLink>
          ))}
        </nav>
      </div>
      <div
        className="flex justify-between items-end w-full"
        data-component="organism-footer-bottom"
      >
        <Logo variant="footer" />
        <span
          className="font-caption text-caption font-normal text-bjj-text-caption tracking-tight"
          data-component="organism-footer-caption"
        >
          2025 All Rights Reserved By Jaino Company
        </span>
      </div>
    </footer>
  );
}
