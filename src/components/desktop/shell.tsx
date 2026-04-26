import { DesktopAnnouncementRibbon } from "@/components/desktop/chrome/announcement-ribbon";
import { DesktopPersistentNav } from "@/components/desktop/chrome/persistent-nav";
import { GlobalFloatingBubble } from "@/components/organisms/global-floating-bubble";
import { PageTransition } from "@/components/shared/page-transition";

export default function DesktopShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        data-bjj-shell="desktop"
        className="flex flex-col items-center w-full px-[var(--bjj-page-padding)] max-w-[var(--bjj-page-max-width)] mx-auto"
      >
        <DesktopPersistentNav />
        <DesktopAnnouncementRibbon />
        <PageTransition>{children}</PageTransition>
      </div>
      <GlobalFloatingBubble />
    </>
  );
}
