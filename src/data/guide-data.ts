export type GuideSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type GuideFaq = {
  id: string;
  question: string;
  answer: string;
};

export type GuideSource = {
  label: string;
  href: string;
};

export type PostpartumGuide = {
  slug: string;
  category: string;
  title: string;
  shortTitle: string;
  description: string;
  directAnswer: string;
  reviewedAt: string;
  readingTime: string;
  sections: GuideSection[];
  faqs: GuideFaq[];
  sources: GuideSource[];
};

const MINISTRY_GUIDE =
  "https://www.mohw.go.kr/menu.es?mid=a10711020100";
const BOKJIRO_SERVICE =
  "https://m.bokjiro.go.kr/ssis-tem/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001188&wlfareInfoReldBztpCd=01";
const SOCIAL_SERVICE = "https://www.socialservice.or.kr/";

export const POSTPARTUM_GUIDES: PostpartumGuide[] = [
  {
    slug: "service-scope",
    category: "서비스 이해",
    title: "산후도우미는 무슨 일을 하나요?",
    shortTitle: "산후도우미 업무 범위",
    description:
      "산모 회복 지원, 신생아 돌봄, 관련 세탁과 식사 준비 등 산후도우미의 기본 업무와 제외 업무를 구분해 안내합니다.",
    directAnswer:
      "산후도우미의 정식 서비스 명칭은 산모·신생아 건강관리입니다. 산모의 회복을 돕고 신생아의 목욕·수유·위생 관리를 지원하며, 산모와 신생아에게 필요한 식사 준비와 세탁물 관리가 기본 범위에 포함됩니다. 다른 가족 돌봄, 일반 가사, 의료행위는 기본 서비스와 구분해 계약 전에 확인해야 합니다.",
    reviewedAt: "2026-07-28",
    readingTime: "약 4분",
    sections: [
      {
        heading: "산모를 위한 지원",
        paragraphs: [
          "건강관리사는 출산 후 산모가 충분히 쉬고 일상을 회복할 수 있도록 식사와 생활 환경을 지원합니다. 구체적인 제공 범위는 정부지원 표준서비스인지, 별도로 계약한 민간 서비스인지에 따라 달라질 수 있습니다.",
        ],
        bullets: [
          "산모의 영양을 고려한 식사 준비",
          "산모의 위생과 편안한 회복 환경 지원",
          "수유와 산후 생활에 필요한 일상 보조",
        ],
      },
      {
        heading: "신생아를 위한 지원",
        paragraphs: [
          "신생아 돌봄은 수유를 돕고 청결한 환경을 유지하는 데 초점을 둡니다. 아기의 상태를 살피되 진단이나 처치가 필요한 경우에는 의료기관과 상담해야 합니다.",
        ],
        bullets: [
          "수유 지원과 젖병 세척·소독",
          "목욕, 기저귀 교체와 위생 관리",
          "아기 세탁물과 생활 공간 정리",
        ],
      },
      {
        heading: "기본 업무가 아닌 항목",
        paragraphs: [
          "정부지원 표준서비스에서 산모·신생아 외 가족 돌봄과 일반 가사활동은 기본 범위가 아닙니다. 대청소, 많은 양의 가족 식사, 다른 가족의 돌봄처럼 범위를 벗어나는 요청은 제공기관과 별도 협의가 필요합니다.",
        ],
        bullets: [
          "의료적 진단, 처치 또는 치료 행위",
          "이사 수준의 정리, 대청소와 무거운 가구 이동",
          "산모·신생아 외 가족의 상시 돌봄과 일반 가사",
        ],
      },
      {
        heading: "서비스 시작 전에 확인할 것",
        paragraphs: [
          "같은 표현이라도 가정마다 기대하는 범위가 다릅니다. 첫날에 식사 준비, 세탁, 휴게시간, 가족 돌봄 여부를 함께 확인하고 요청사항을 제공기관과 관리사에게 같은 내용으로 전달하는 것이 좋습니다.",
        ],
      },
    ],
    faqs: [
      {
        id: "service-scope-family-meal",
        question: "가족 식사 준비도 기본 서비스에 포함되나요?",
        answer:
          "표준서비스는 산모 식사 준비를 중심으로 합니다. 다른 가족의 식사 준비는 기본 범위와 구분될 수 있으므로 계약 전에 제공기관과 확인해야 합니다.",
      },
      {
        id: "service-scope-medical",
        question: "산후도우미가 의료행위를 할 수 있나요?",
        answer:
          "아니요. 건강관리 서비스는 의료행위가 아니며, 진단이나 치료가 필요한 증상은 의료기관과 상담해야 합니다.",
      },
    ],
    sources: [
      { label: "보건복지부 산모·신생아 건강관리 지원사업", href: MINISTRY_GUIDE },
      { label: "사회서비스 전자바우처", href: SOCIAL_SERVICE },
    ],
  },
  {
    slug: "cost-and-support",
    category: "비용과 지원",
    title: "산후도우미 비용과 정부지원은 어떻게 정해지나요?",
    shortTitle: "비용·정부지원 확인",
    description:
      "태아 유형, 출산 순위, 이용 기간, 소득구간에 따라 달라지는 산후도우미 비용과 정부지원 바우처 확인 순서를 안내합니다.",
    directAnswer:
      "산후도우미 본인부담금은 서비스 가격에서 정부지원금을 뺀 금액입니다. 정부지원금은 태아 유형, 출산 순위, 소득구간, 단축·표준·연장 이용 기간에 따라 달라지며 지자체의 예외지원 여부도 영향을 줍니다. 따라서 관할 보건소에서 자격을 확인한 뒤 제공기관의 최종 견적을 비교해야 합니다.",
    reviewedAt: "2026-07-28",
    readingTime: "약 5분",
    sections: [
      {
        heading: "비용을 결정하는 네 가지 기준",
        paragraphs: [
          "정부지원 산모·신생아 건강관리 서비스는 모든 가정에 같은 금액이 적용되는 상품이 아닙니다. 먼저 자격 유형과 원하는 이용 기간을 확인해야 실제 본인부담금을 계산할 수 있습니다.",
        ],
        bullets: [
          "단태아·쌍태아·삼태아 이상 등 태아 유형",
          "첫째아·둘째아·셋째아 이상 등 출산 순위",
          "자격확인·소득구간·지자체 예외지원 여부",
          "단축·표준·연장 중 선택한 서비스 기간",
        ],
      },
      {
        heading: "정부지원 여부를 먼저 확인하세요",
        paragraphs: [
          "중앙사업의 기본 선정기준 외에도 지방자치단체가 별도의 예외지원 기준을 둘 수 있습니다. 같은 소득과 출산 조건이라도 거주 지역에 따라 결과가 달라질 수 있으므로 온라인 정보만으로 자격을 확정하면 안 됩니다.",
        ],
        bullets: [
          "복지로 또는 관할 보건소에서 자격 신청",
          "보건소의 서비스 유형과 자격 결정 통지 확인",
          "등록 제공기관을 선택하고 이용 계약 체결",
        ],
      },
      {
        heading: "견적을 비교할 때 확인할 항목",
        paragraphs: [
          "표시된 총액만 비교하기보다 정부지원금, 본인부담금, 추가 서비스, 계약 변경 조건을 나누어 확인해야 합니다. 제공기관별 상품과 우수인력 가격 적용 여부에 따라 최종 금액이 달라질 수 있습니다.",
        ],
        bullets: [
          "정부지원 적용 전 서비스 총가격",
          "정부지원금과 최종 본인부담금",
          "추가 시간·가족 돌봄 등 부가서비스 비용",
          "일정 변경·취소·연장 시 적용되는 조건",
        ],
      },
      {
        heading: "아가잼잼에서 확인하는 방법",
        paragraphs: [
          "아가잼잼 가격 페이지에서 출산 조건과 원하는 기간을 입력해 예상 플랜을 확인할 수 있습니다. 실제 계약 금액은 보건소 자격 판정과 상담 내용을 기준으로 최종 안내합니다.",
        ],
      },
    ],
    faqs: [
      {
        id: "cost-support-over-income",
        question: "기준중위소득 150%를 넘으면 지원을 받을 수 없나요?",
        answer:
          "지자체가 별도의 예외지원 기준을 운영할 수 있습니다. 소득기준을 넘더라도 거주지 관할 보건소에 예외지원 여부를 확인하는 것이 정확합니다.",
      },
      {
        id: "cost-support-final",
        question: "홈페이지 예상 금액이 최종 결제금액인가요?",
        answer:
          "아닙니다. 자격 판정, 이용 기간, 추가 요청사항에 따라 달라질 수 있으므로 상담과 계약 단계에서 최종 금액을 확인해야 합니다.",
      },
    ],
    sources: [
      { label: "복지로 산모·신생아 건강관리 지원사업", href: BOKJIRO_SERVICE },
      { label: "보건복지부 산모·신생아 건강관리 지원사업", href: MINISTRY_GUIDE },
    ],
  },
  {
    slug: "application-timing",
    category: "신청과 예약",
    title: "산후도우미는 언제, 어떻게 신청해야 하나요?",
    shortTitle: "신청 시기와 절차",
    description:
      "정부지원 바우처 신청기간과 보건소 자격 확인, 제공기관 상담부터 이용계약까지 산후도우미 신청 순서를 안내합니다.",
    directAnswer:
      "보건복지부 안내 기준으로 정부지원 산모·신생아 건강관리 서비스는 출산예정일 40일 전부터 출산일로부터 60일까지 신청할 수 있습니다. 복지로 또는 산모 주소지 관할 보건소에서 자격 판정을 받은 뒤 등록 제공기관을 선택해 계약합니다. 지역별 추가지원과 일정은 다를 수 있으므로 출산 전에 보건소와 제공기관을 함께 확인하는 것이 좋습니다.",
    reviewedAt: "2026-07-28",
    readingTime: "약 4분",
    sections: [
      {
        heading: "1. 출산 전에 자격과 일정을 확인합니다",
        paragraphs: [
          "출산일은 예정일과 달라질 수 있지만 자격 기준과 희망 이용 기간은 미리 확인할 수 있습니다. 조리원 이용 여부, 퇴원 예상일, 원하는 서비스 기간을 정리하면 상담이 빨라집니다.",
        ],
      },
      {
        heading: "2. 복지로 또는 보건소에 신청합니다",
        paragraphs: [
          "온라인 신청은 복지로에서, 방문 신청은 산모 주소지 관할 시·군·구 보건소에서 할 수 있습니다. 필요한 서류와 지역별 예외지원 여부는 신청 전에 관할 보건소에 확인하세요.",
        ],
      },
      {
        heading: "3. 자격 결정 통지를 확인합니다",
        paragraphs: [
          "정부지원 유형과 서비스 기간 선택지는 보건소의 자격 판정 결과를 기준으로 확인합니다. 이용계약을 전자바우처 시스템에 등록해 바우처가 생성된 뒤에는 선택한 상품을 변경할 수 없다는 점도 확인해야 합니다.",
        ],
      },
      {
        heading: "4. 등록 제공기관과 계약합니다",
        paragraphs: [
          "서비스 가능 지역, 시작 예정일, 업무 범위, 본인부담금과 변경 조건을 확인한 뒤 계약합니다. 실제 출산일이나 퇴원일이 달라지면 가능한 빨리 제공기관에 알려 일정을 조정하세요.",
        ],
      },
    ],
    faqs: [
      {
        id: "application-timing-late",
        question: "출산 후에도 정부지원 서비스를 신청할 수 있나요?",
        answer:
          "보건복지부 안내 기준 신청기간은 출산일로부터 60일까지입니다. 다만 실제 이용 가능 기간과 지역별 기준이 있으므로 즉시 관할 보건소에 확인하세요.",
      },
      {
        id: "application-timing-before-approval",
        question: "보건소 자격 판정 전에 제공기관과 계약해도 되나요?",
        answer:
          "정부지원 이용권은 보건소에서만 자격을 판정합니다. 정부지원 등록 제공기관인지 확인하고 자격 판정 후 계약하는 것이 안전합니다.",
      },
    ],
    sources: [
      { label: "보건복지부 신청기간·이용절차 안내", href: MINISTRY_GUIDE },
      { label: "복지로 산모·신생아 건강관리 지원사업", href: BOKJIRO_SERVICE },
    ],
  },
  {
    slug: "provider-checklist",
    category: "업체 선택",
    title: "좋은 산후도우미 업체는 어떻게 고르나요?",
    shortTitle: "업체 선택 체크리스트",
    description:
      "정부지원 등록 여부, 관리사 교육, 업무 범위, 비용, 일정 변경과 불편 대응 체계를 중심으로 산후도우미 업체 선택 기준을 안내합니다.",
    directAnswer:
      "정부지원 서비스를 이용한다면 먼저 관할 보건소 또는 사회서비스 전자바우처에서 등록 제공기관인지 확인하세요. 그다음 관리사의 교육 이수, 업무 범위와 비용, 일정 변경·교체·불편 접수 절차가 계약 전에 명확하게 안내되는지 비교하는 것이 좋습니다.",
    reviewedAt: "2026-07-28",
    readingTime: "약 5분",
    sections: [
      {
        heading: "등록된 제공기관인지 확인하세요",
        paragraphs: [
          "정부지원 서비스를 제공하려면 관련 법에 따라 등록된 제공기관이어야 합니다. 행사장이나 온라인 광고의 표현만 믿기보다 관할 보건소 또는 사회서비스 전자바우처에서 직접 확인하세요.",
        ],
      },
      {
        heading: "관리사 교육과 배정 기준을 물어보세요",
        paragraphs: [
          "정부지원 제공인력은 정해진 교육과정을 수료해야 합니다. 업체가 교육 이수 여부를 어떻게 확인하는지, 가정의 요청과 관리사의 경험을 어떤 기준으로 맞추는지 질문해 보세요.",
        ],
        bullets: [
          "제공인력 교육 이수 확인 방식",
          "배정 전에 확인하는 경험과 요청사항",
          "서비스 중 품질 확인과 피드백 절차",
        ],
      },
      {
        heading: "말로 들은 내용을 계약서와 비교하세요",
        paragraphs: [
          "업무 범위, 이용시간, 휴게시간, 본인부담금, 추가요금과 취소 조건은 계약서에서 다시 확인해야 합니다. 상담 내용과 계약 조건이 다르면 계약 전에 정리해 두세요.",
        ],
      },
      {
        heading: "문제가 생겼을 때의 대응을 확인하세요",
        paragraphs: [
          "관리사와 가정의 방식이 맞지 않을 수 있으므로 교체 가능 여부만 묻기보다 접수 창구, 처리 순서, 대체 인력 가능 범위를 함께 확인하는 것이 중요합니다.",
        ],
        bullets: [
          "불편사항을 접수할 대표 연락처",
          "관리사 교체 요청 시 확인 절차",
          "갑작스러운 결근이나 일정 변경 대응",
        ],
      },
    ],
    faqs: [
      {
        id: "provider-checklist-registration",
        question: "정부지원 등록기관은 어디에서 확인하나요?",
        answer:
          "산모 주소지 관할 보건소 또는 사회서비스 전자바우처 홈페이지에서 확인할 수 있습니다.",
      },
      {
        id: "provider-checklist-review",
        question: "후기만 보고 업체를 선택해도 될까요?",
        answer:
          "후기는 참고자료 중 하나입니다. 등록 여부, 계약 조건, 교육·배정 기준과 문제 대응 절차를 함께 확인하는 것이 좋습니다.",
      },
    ],
    sources: [
      { label: "보건복지부 제공기관·제공인력 안내", href: MINISTRY_GUIDE },
      { label: "사회서비스 전자바우처 제공기관 검색", href: SOCIAL_SERVICE },
    ],
  },
];

export function getPostpartumGuide(slug: string) {
  return POSTPARTUM_GUIDES.find((guide) => guide.slug === slug);
}
