import { AnnouncementRibbon } from "@/components/announcement-ribbon";
import { PersistentNav } from "@/components/persistent-nav";
import { PageTransition } from "@/components/page-transition";
import { GlobalFloatingBubble } from "@/components/organisms/global-floating-bubble";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col items-center w-full px-[var(--bjj-page-padding)] max-w-[var(--bjj-page-max-width)] mx-auto">
        <PersistentNav />
        <AnnouncementRibbon />
        <PageTransition>{children}</PageTransition>
      </div>
      <GlobalFloatingBubble />
    </>
  );
}
