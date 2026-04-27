import Link from "next/link";
import { cn } from "@/lib/utils";

import { Logo } from "@/components/ui/logo";
import { FooterLink } from "@/components/molecules/footer-link";

const FOOTER_LINKS = [
  { id: "service-rules", label: "서비스 규정", href: "#" },
  { id: "pricing", label: "서비스 가격", href: "/pricing" },
  { id: "service-items", label: "서비스 제공 항목", href: "#" },
  { id: "locations", label: "전국 지점", href: "/locations" },
  { id: "faq-terms", label: "FAQ & 이용약관", href: "/faq" },
];

interface FooterProps {
  className?: string;
  "data-component"?: string;
}

export function MobileFooter({
  className,
  "data-component": dataComponent,
}: FooterProps) {
  const getComponent = (suffix: string) =>
    dataComponent ? `${dataComponent}-${suffix}` : undefined;

  return (
    <footer
      className={cn(
        "flex flex-col items-center w-full gap-6 pt-6 pb-3 mt-[100px] border-t border-bjj-divider",
        className
      )}
      data-component={dataComponent}
    >
      <div
        className="flex flex-col items-start gap-4 w-full"
        data-component={getComponent("links")}
      >
        <nav
          className="flex flex-wrap items-center gap-x-4 gap-y-2"
          data-component={getComponent("nav")}
        >
          {FOOTER_LINKS.map((link) => (
            <FooterLink
              key={link.id}
              href={link.href}
              data-component={getComponent(`nav-link-${link.id}`)}
            >
              {link.label}
            </FooterLink>
          ))}
        </nav>
      </div>
      <div
        className="flex flex-col items-start gap-4 w-full"
        data-component={getComponent("bottom")}
      >
        <Link href="/" data-component={getComponent("logo-link")}>
          <Logo
            variant="footer"
            className="!w-[180px] !h-[60px]"
            data-component={getComponent("logo")}
          />
        </Link>
        <span className="caption-text" data-component={getComponent("caption")}>
          2026 All Rights Reserved By Covenant Labs
        </span>
      </div>
    </footer>
  );
}
