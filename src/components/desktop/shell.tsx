import { DesktopAnnouncementRibbon } from "@/components/desktop/chrome/announcement-ribbon";
import { DesktopGlobalFloatingBubble } from "@/components/desktop/chrome/global-floating-bubble";
import { DesktopPersistentNav } from "@/components/desktop/chrome/persistent-nav";
import { PageTransition } from "@/components/shared/page-transition";

export default function DesktopShell({ children }: { children: React.ReactNode }) {
  const dataComponentBase = "desktop_shell";

  return (
    <>
      <div
        data-bjj-shell="desktop"
        data-component={`${dataComponentBase}_outer`}
        className="flex flex-col items-center w-full px-[var(--bjj-page-padding)] max-w-[var(--bjj-page-max-width)] mx-auto"
      >
        <div
          data-component={`${dataComponentBase}_header_region`}
          className="w-full"
        >
          <DesktopPersistentNav data-component="desktop_chrome_persistent-nav" />
        </div>
        <div
          data-component={`${dataComponentBase}_announcement_region`}
          className="w-full"
        >
          <DesktopAnnouncementRibbon data-component="desktop_chrome_announcement-ribbon" />
        </div>
        <div
          data-component={`${dataComponentBase}_pre-transition_slot`}
          className="w-full"
        />
        <div
          data-component={`${dataComponentBase}_page-transition_wrap`}
          className="w-full"
        >
          <PageTransition data-component={`${dataComponentBase}_content`}>
            {children}
          </PageTransition>
        </div>
      </div>
      <div data-component={`${dataComponentBase}_bubble_region`}>
        <DesktopGlobalFloatingBubble data-component="desktop_chrome_global-floating-bubble" />
      </div>
    </>
  );
}
