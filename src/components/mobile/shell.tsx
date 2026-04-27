import { MobileAnnouncementRibbon } from "@/components/mobile/chrome/announcement-ribbon";
import { MobileGlobalFloatingBubble } from "@/components/mobile/chrome/global-floating-bubble";
import { MobilePersistentNav } from "@/components/mobile/chrome/persistent-nav";
import { PageTransition } from "@/components/shared/page-transition";

export default function MobileShell({ children }: { children: React.ReactNode }) {
  const dataComponentBase = "mobile_shell";

  return (
    <>
      <div
        data-bjj-shell="mobile"
        data-component={`${dataComponentBase}_outer`}
        className="flex flex-col items-center w-full px-[var(--bjj-page-padding)] max-w-[var(--bjj-page-max-width)] mx-auto"
      >
        <div
          data-component={`${dataComponentBase}_header-region`}
          className="w-full"
        >
          <MobilePersistentNav data-component="mobile_chrome_persistent-nav" />
        </div>
        <div
          data-component={`${dataComponentBase}_announcement-region`}
          className="w-full"
        >
          <MobileAnnouncementRibbon data-component="mobile_chrome_announcement-ribbon" />
        </div>
        <div
          data-component={`${dataComponentBase}_page-transition-wrap`}
          className="w-full"
        >
          <PageTransition data-component={`${dataComponentBase}_content`}>
            {children}
          </PageTransition>
        </div>
      </div>
      <div data-component={`${dataComponentBase}_bubble-region`}>
        <MobileGlobalFloatingBubble data-component="mobile_chrome_global-floating-bubble" />
      </div>
    </>
  );
}
