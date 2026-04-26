import { MobileAnnouncementRibbon } from "@/components/mobile/chrome/announcement-ribbon";
import { MobilePersistentNav } from "@/components/mobile/chrome/persistent-nav";
import { GlobalFloatingBubble } from "@/components/organisms/global-floating-bubble";
import { PageTransition } from "@/components/shared/page-transition";

export default function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        data-bjj-shell="mobile"
        className="flex flex-col items-center w-full px-[var(--bjj-page-padding)] max-w-[var(--bjj-page-max-width)] mx-auto"
      >
        <MobilePersistentNav />
        <MobileAnnouncementRibbon />
        <PageTransition>{children}</PageTransition>
      </div>
      <GlobalFloatingBubble />
    </>
  );
}
