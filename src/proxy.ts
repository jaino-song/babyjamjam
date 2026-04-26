import { NextRequest, NextResponse } from "next/server";

const MOBILE_UA = /Mobile|iPhone|Android.*Mobile|webOS|IEMobile|Opera Mini/i;
const DEV = process.env.NODE_ENV !== "production";

export function proxy(req: NextRequest) {
  const ua = req.headers.get("user-agent") ?? "";

  // Dev-only: ?device= override + bjj-device cookie. Production ignores both.
  const override = DEV ? req.nextUrl.searchParams.get("device") : null;
  const cookie = DEV ? req.cookies.get("bjj-device")?.value : null;

  const device =
    override === "mobile" || override === "desktop"
      ? override
      : cookie === "mobile" || cookie === "desktop"
        ? cookie
        : MOBILE_UA.test(ua)
          ? "mobile"
          : "desktop";

  const reqHeaders = new Headers(req.headers);
  reqHeaders.set("x-bjj-device", device);

  const res = NextResponse.next({ request: { headers: reqHeaders } });
  if (DEV && override) res.cookies.set("bjj-device", device, { path: "/", maxAge: 60 * 60 });
  // Do NOT mutate `Vary` — Next.js App Router manages its own Vary keys.
  return res;
}

export const config = {
  matcher: [
    "/",
    "/pricing/:path*",
    "/faq/:path*",
    "/postpartum-care/:path*",
    "/locations/:path*",
  ],
};
