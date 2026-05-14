import * as Sentry from "@sentry/nextjs";
import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.BJJ_API_URL ?? "https://api.babyjamjam.com";

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_URL}/settings/ribbon-config`, {
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      Sentry.captureMessage("ribbon non-2xx response", {
        level: "warning",
        tags: { route: "/api/ribbon", upstream_status: String(res.status) },
      });
      return NextResponse.json(
        { enabled: false },
        { status: 200 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    Sentry.captureMessage("ribbon fallback triggered", {
      level: "warning",
      tags: { route: "/api/ribbon" },
      extra: { reason: err instanceof Error ? err.message : "unknown" },
    });
    return NextResponse.json(
      { enabled: false },
      { status: 200 }
    );
  }
}
