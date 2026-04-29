import DesktopHomePage from "@/components/desktop/pages/home";
import MobileHomePage from "@/components/mobile/pages/home";
import { getDevice } from "@/lib/device";

export default async function HomePage() {
  const device = await getDevice();
  return device === "mobile" ? <MobileHomePage /> : <DesktopHomePage />;
}
