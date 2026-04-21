import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.BJJ_API_URL ?? "https://api.babyjamjam.com";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const res = await fetch(`${BACKEND_URL}/public/consultation-inquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const payload = await res.json().catch(() => null);

    if (!res.ok) {
      return NextResponse.json(
        payload ?? { error: "상담 신청에 실패했습니다." },
        { status: res.status }
      );
    }

    return NextResponse.json(payload, { status: res.status });
  } catch {
    return NextResponse.json(
      { error: "상담 신청에 실패했습니다." },
      { status: 500 }
    );
  }
}
