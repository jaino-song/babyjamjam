import { PageTransition } from "@/components/shared/page-transition";

import { LegacyAnnouncementRibbon } from "./announcement-ribbon";
import { LegacyGlobalFloatingBubble } from "./global-floating-bubble";
import { LegacyPersistentNav } from "./persistent-nav";

export default function LegacyShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col items-center w-full px-[var(--bjj-page-padding)] max-w-[var(--bjj-page-max-width)] mx-auto">
        <LegacyPersistentNav />
        <LegacyAnnouncementRibbon />
        <PageTransition>{children}</PageTransition>
      </div>
      <LegacyGlobalFloatingBubble />
    </>
  );
}
