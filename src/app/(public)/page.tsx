import { JsonLd } from "@/components/seo/json-ld";
import DesktopHomePage from "@/components/desktop/pages/home";
import MobileHomePage from "@/components/mobile/pages/home";
import { getDevice } from "@/lib/device";
import { createOrganizationJsonLd, createWebsiteJsonLd } from "@/lib/seo";

export default async function HomePage() {
  const device = await getDevice();
  const page = device === "mobile" ? <MobileHomePage /> : <DesktopHomePage />;

  return (
    <>
      <JsonLd data={[createOrganizationJsonLd(), createWebsiteJsonLd()]} />
      {page}
    </>
  );
}
