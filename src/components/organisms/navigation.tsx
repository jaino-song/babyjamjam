import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { NavItem } from "@/components/molecules/nav-item";

const NAV_ITEMS = [
  { label: "산후도우미", href: "#" },
  { label: "서비스 비용", href: "/pricing" },
  { label: "지점 찾기", href: "/locations" },
  { label: "문의하기", href: "#" },
  { label: "고객센터", href: "#" },
];

interface NavigationProps {
  className?: string;
}

export function Navigation({ className }: NavigationProps) {
  return (
    <header
      className={cn(
        "flex flex-col justify-center items-center w-full h-37 relative",
        className
      )}
      data-component="organism-navigation"
    >
      <div
        className="flex justify-between items-center w-full"
        data-component="organism-navigation-inner"
      >
        <Logo variant="header" />
        <nav
          className="flex justify-center items-center gap-6 p-5 px-6 bg-bjj-primary backdrop-blur-[30px] rounded-nav absolute left-1/2 -translate-x-1/2"
          data-component="organism-navigation-bar"
        >
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.label} href={item.href}>
              {item.label}
            </NavItem>
          ))}
        </nav>
        <Button variant="cta" href="#">
          예약하기
        </Button>
      </div>
    </header>
  );
}
