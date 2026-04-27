import DesktopLocationsPage from "@/components/desktop/pages/locations";
import MobileLocationsPage from "@/components/mobile/pages/locations";
import { getDevice } from "@/lib/device";

export default async function LocationsPage() {
  const device = await getDevice();
  return device === "mobile" ? <MobileLocationsPage /> : <DesktopLocationsPage />;
}
