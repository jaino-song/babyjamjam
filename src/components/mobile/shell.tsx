import { MobileAnnouncementRibbon } from "@/components/mobile/chrome/announcement-ribbon";
import { MobileGlobalFloatingBubble } from "@/components/mobile/chrome/global-floating-bubble";
import { MobilePersistentNav } from "@/components/mobile/chrome/persistent-nav";
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
      <MobileGlobalFloatingBubble />
    </>
  );
}
