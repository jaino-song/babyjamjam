import * as Sentry from "@sentry/nextjs";
import { NextResponse } from "next/server";
import { getPostHogClient } from "@/lib/posthog-server";

const BACKEND_URL =
  process.env.BJJ_API_URL ?? "https://api.babyjamjam.com";

interface ConsultationInquiryBody {
  branchSlug?: string;
  motherName?: string;
  phone?: string;
  address?: string;
  dueDate?: string;
  preferredCaregiverName?: string;
  referralSource?: string;
  birthExperience?: string;
}

export async function POST(request: Request) {
  const posthog = getPostHogClient();
  let body: ConsultationInquiryBody | null = null;

  try {
    body = await request.json();
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
    Sentry.captureException(error, {
      tags: { route: "/api/consultation-inquiries" },
      extra: {
        hasBody: !!body,
        fieldPresence: body
          ? {
              branchSlug: !!body.branchSlug,
              motherName: !!body.motherName,
              phone: !!body.phone,
              address: !!body.address,
              dueDate: !!body.dueDate,
              preferredCaregiverName: !!body.preferredCaregiverName,
              referralSource: !!body.referralSource,
            }
          : null,
      },
    });
    posthog.captureException(error, "anonymous");
    return NextResponse.json(
      { error: "상담 신청에 실패했습니다." },
      { status: 500 }
    );
  }
}
