import { MobileAnnouncementRibbon } from "@/components/mobile/chrome/announcement-ribbon";
import { MobileGlobalFloatingBubble } from "@/components/mobile/chrome/global-floating-bubble";
import { MobilePersistentNav } from "@/components/mobile/chrome/persistent-nav";
import { PageTransition } from "@/components/shared/page-transition";

export default function MobileShell({ children }: { children: React.ReactNode }) {
  const dataComponentBase = "mobile-shell";

  return (
    <>
      <div
        data-bjj-shell="mobile"
        data-component={`${dataComponentBase}-outer`}
        className="flex flex-col items-center w-full px-[var(--bjj-page-padding)] max-w-[var(--bjj-page-max-width)] mx-auto"
      >
        <div
          data-component={`${dataComponentBase}-header-region`}
          className="w-full"
        >
          <MobilePersistentNav data-component="mobile-chrome-persistent-nav" />
        </div>
        <div
          data-component={`${dataComponentBase}-announcement-region`}
          className="w-full"
        >
          <MobileAnnouncementRibbon data-component="mobile-chrome-announcement-ribbon" />
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
        <MobileGlobalFloatingBubble data-component="mobile-chrome-global-floating-bubble" />
      </div>
    </>
  );
}
