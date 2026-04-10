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
      return NextResponse.json(
        { enabled: false },
        { status: 200 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { enabled: false },
      { status: 200 }
    );
  }
}
