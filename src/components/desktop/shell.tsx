import { DesktopAnnouncementRibbon } from "@/components/desktop/chrome/announcement-ribbon";
import { DesktopGlobalFloatingBubble } from "@/components/desktop/chrome/global-floating-bubble";
import { DesktopPersistentNav } from "@/components/desktop/chrome/persistent-nav";
import { PageTransition } from "@/components/shared/page-transition";

export default function DesktopShell({ children }: { children: React.ReactNode }) {
  const dataComponentBase = "desktop-shell";

  return (
    <>
      <div
        data-bjj-shell="desktop"
        data-component={`${dataComponentBase}-outer`}
        className="flex flex-col items-center w-full px-[var(--bjj-page-padding)] max-w-[var(--bjj-page-max-width)] mx-auto"
      >
        <div
          data-component={`${dataComponentBase}-header-region`}
          className="w-full"
        >
          <DesktopPersistentNav data-component="desktop-chrome-persistent-nav" />
        </div>
        <div
          data-component={`${dataComponentBase}-announcement-region`}
          className="w-full"
        >
          <DesktopAnnouncementRibbon data-component="desktop-chrome-announcement-ribbon" />
        </div>
        <div
          data-component={`${dataComponentBase}-page-transition-wrap`}
          className="w-full"
        >
          <PageTransition data-component={`${dataComponentBase}-content`}>
            {children}
          </PageTransition>
        </div>
      </div>
      <div data-component={`${dataComponentBase}-bubble-region`}>
        <DesktopGlobalFloatingBubble data-component="desktop-chrome-global-floating-bubble" />
      </div>
    </>
  );
}
