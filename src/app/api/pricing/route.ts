import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.BJJ_API_URL ?? "https://api.babyjamjam.com";

/** Subsidized plan features by duration tier. */
const SUBSIDIZED_FEATURES: Record<string, string[]> = {
  short: [
    "프리미엄 출퇴근 산후도우미 서비스",
    "식사 장보기 및 산모님 식사 서비스 제공",
    "실시간 서비스 퀄리티 모니터링",
    "전문가의 신생아 케어 서비스 제공",
    "본인부담금 환급 가능",
    "카드 결제 및 무이자 할부 서비스 제공",
    "첫만남 이용권 및 지역화폐로 결제 가능",
  ],
  medium: [
    "프리미엄 출퇴근 산후도우미 서비스",
    "식사 장보기 및 산모님 식사 서비스 제공",
    "실시간 서비스 퀄리티 모니터링",
    "전문가의 신생아 케어 서비스 제공",
    "유축기 무료 대여 서비스 제공",
    "본인부담금 환급 가능",
    "카드 결제 및 무이자 할부 서비스 제공",
    "첫만남 이용권 및 지역화폐로 결제 가능",
  ],
  long: [
    "프리미엄 출퇴근 산후도우미 서비스",
    "식사 장보기 및 산모님 식사 서비스 제공",
    "실시간 서비스 퀄리티 모니터링",
    "전문가의 신생아 케어 서비스 제공",
    "유축기 무료 대여 서비스 제공",
    "본인부담금 환급 가능",
    "카드 결제 및 무이자 할부 서비스 제공",
    "첫만남 이용권 및 지역화폐로 결제 가능",
    "서비스 연장 시 추가 할인 제공",
  ],
};

/** Hardcoded add-on services (shared for both subsidized and unsubsidized). */
const ADDON_SERVICES = [
  {
    id: "saturday",
    name: "토요일 서비스",
    description: "09:00 부터 14:00 까지\n파트타임 서비스 추가",
    price: "126,500원",
  },
  {
    id: "holiday",
    name: "공휴일 서비스",
    description: "법정공휴일 및 일요일에도 서비스 이용이 필요할 때.",
    price: "202,500원",
  },
  {
    id: "twins",
    name: "쌍둥이 케어 서비스",
    description:
      "우리 집에 찾아온 두배의 기적.\n비용은 두배 보다 적은 또다른 기적.",
    price: "40,000원",
  },
  {
    id: "school-age",
    name: "취학 자녀 케어 서비스",
    description:
      "알아서 잘 하는 우리 아이지만\n엄마의 사랑은 똑같이 필요하니까.",
    price: "5,000원",
  },
  {
    id: "preschool",
    name: "미취학 자녀 케어 서비스",
    description:
      "부모님의 케어가 필요한 우리 아이가\n계속해서 잘 자랄 수 있도록.",
    price: "10,000원",
  },
  {
    id: "family",
    name: "가족 추가",
    description:
      "지켜야할 소중한 가족이 우리 아기만\n있는건 아니니까.",
    price: "5,000원",
  },
  {
    id: "extra-hours",
    name: "서비스 추가 시간",
    note: "정규 서비스 제공 시간 외 추가 시간",
    description: "",
    price: "시간 당 25,300원",
  },
  {
    id: "breast-pump",
    name: "유축기 대여 서비스",
    note: "정규 서비스 제공 시간 외 추가 시간",
    description: "",
    price: "5,000원",
  },
];

type PricingRequest = {
  typeCode?: string;
  year?: number;
  isSubsidized: boolean;
};

export async function POST(request: Request) {
  try {
    const body: PricingRequest = await request.json();
    const year = body.year ?? new Date().getFullYear();

    if (body.isSubsidized && body.typeCode) {
      // Fetch from backend API
      const url = `${BACKEND_URL}/voucher-price-infos/type?type=${encodeURIComponent(body.typeCode)}&year=${year}`;
      const res = await fetch(url, {
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        return NextResponse.json(
          { error: "Failed to fetch pricing from backend" },
          { status: res.status }
        );
      }

      const data: {
        id: number;
        type: string;
        duration: string;
        fullPrice: string;
        grant: string;
        actualPrice: string;
        year: number;
      }[] = await res.json();

      // Sort by duration and map to plan cards
      const sorted = [...data].sort(
        (a, b) => Number(a.duration) - Number(b.duration)
      );

      const plans = sorted.map((entry, i) => {
        const duration = Number(entry.duration);
        const featureKey =
          i === 0 ? "short" : i === sorted.length - 1 ? "long" : "medium";
        return {
          id: `plan-${entry.id}`,
          name: `${duration}일`,
          description: getPlanDescription(i),
          price: `${Number(entry.actualPrice).toLocaleString()}원`,
          badge: "환급 가능",
          features: SUBSIDIZED_FEATURES[featureKey] ?? SUBSIDIZED_FEATURES.short,
        };
      });

      return NextResponse.json({ plans, addons: ADDON_SERVICES });
    }

    // Unsubsidized: hardcoded fallback until backend endpoint exists
    // See: https://github.com/jaino-song/babyjamjam-staff/issues/112
    const unsubsidizedPlans = [
      {
        id: "unsub-5",
        name: "5일",
        description: "소중한 아기와 함께하는 새로운 시작이 힘들지 않도록 필요한 만큼만.",
        price: "조회 후 안내",
        features: ["프리미엄 출퇴근 산후도우미 서비스", "산모 식사 서비스 제공", "신생아 케어 서비스 제공"],
      },
      {
        id: "unsub-10",
        name: "10일",
        description: "임신 기간 동안 지친 몸과 마음을 돌보고 회복할 수 있도록.",
        price: "조회 후 안내",
        features: ["프리미엄 출퇴근 산후도우미 서비스", "산모 식사 서비스 제공", "신생아 케어 서비스 제공"],
      },
      {
        id: "unsub-15",
        name: "15일",
        description: "전문가에게 육아 노하우를 배우고, 지친 몸과 마음의 완벽한 회복을 위해.",
        price: "조회 후 안내",
        features: ["프리미엄 출퇴근 산후도우미 서비스", "산모 식사 서비스 제공", "신생아 케어 서비스 제공"],
      },
    ];

    return NextResponse.json({ plans: unsubsidizedPlans, addons: ADDON_SERVICES });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}

function getPlanDescription(index: number): string {
  const descriptions = [
    "소중한 아기와 함께하는 새로운 시작이 힘들지 않도록 필요한 만큼만.",
    "임신 기간 동안 지친 몸과 마음을 돌보고 회복할 수 있도록.",
    "전문가에게 육아 노하우를 배우고, 지친 몸과 마음의 완벽한 회복을 위해.",
  ];
  return descriptions[index] ?? descriptions[0];
}
