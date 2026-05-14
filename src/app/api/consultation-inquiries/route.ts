import { NextResponse } from "next/server";
import { getPostHogClient } from "@/lib/posthog-server";

const BACKEND_URL =
  process.env.BJJ_API_URL ?? "https://api.babyjamjam.com";

export async function POST(request: Request) {
  const posthog = getPostHogClient();

  try {
    const body = await request.json();
    const res = await fetch(`${BACKEND_URL}/public/consultation-inquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const payload = await res.json().catch(() => null);

    if (!res.ok) {
      posthog.capture({
        distinctId: body?.branchSlug ?? "anonymous",
        event: "consultation_inquiry_failed",
        properties: {
          branch_slug: body?.branchSlug,
          status_code: res.status,
          error: payload?.error ?? "상담 신청에 실패했습니다.",
        },
      });

      return NextResponse.json(
        payload ?? { error: "상담 신청에 실패했습니다." },
        { status: res.status }
      );
    }

    posthog.capture({
      distinctId: body?.branchSlug ?? "anonymous",
      event: "consultation_inquiry_submitted",
      properties: {
        branch_slug: body?.branchSlug,
        referral_source: body?.referralSource,
        birth_experience: body?.birthExperience,
      },
    });

    return NextResponse.json(payload, { status: res.status });
  } catch (error) {
    posthog.captureException(error, "anonymous");
    return NextResponse.json(
      { error: "상담 신청에 실패했습니다." },
      { status: 500 }
    );
  }
}
