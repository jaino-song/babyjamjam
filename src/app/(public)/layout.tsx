import DesktopShell from "@/components/desktop/shell";
import MobileShell from "@/components/mobile/shell";
import { getDevice } from "@/lib/device";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const device = await getDevice();
  return device === "mobile" ? <MobileShell>{children}</MobileShell> : <DesktopShell>{children}</DesktopShell>;
}
