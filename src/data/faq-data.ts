export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  subItems?: string[];
};

export type FaqCategory = {
  id: string;
  label: string;
  icon: string;
  items: FaqItem[];
};

export type FaqSection = {
  id: string;
  title: string;
  categories: FaqCategory[];
};

export const FAQ_SECTIONS: FaqSection[] = [
  {
    id: "faq",
    title: "자주 묻는 질문",
    categories: [
      {
        id: "faq-service",
        label: "서비스 안내",
        icon: "MessageCircle",
        items: [
          {
            id: "faq-service-1",
            question: "서비스 가능한 지역은 어디인가요?",
            answer:
              "현재 아가잼잼은 인천광역시 전 지역에서 서비스를 제공하고 있습니다. 서울 및 경기 일부 지역도 확대 예정이오니, 자세한 내용은 상담 시 문의해 주세요.",
          },
          {
            id: "faq-service-2",
            question: "예약은 어떻게 하나요?",
            answer:
              "홈페이지 상담 신청 또는 전화(032-442-5992)로 예약하실 수 있습니다. 출산예정일과 원하시는 서비스 기간을 말씀해 주시면 맞춤 상담을 도와드립니다.",
          },
          {
            id: "faq-service-3",
            question: "서비스는 언제부터 시작되나요?",
            answer:
              "서비스는 출산 후 퇴원일부터 시작됩니다. 출산예정일 기준으로 미리 예약해 주시면, 실제 출산일에 맞춰 서비스를 시작합니다.",
          },
          {
            id: "faq-service-4",
            question: "하루 서비스 시간은 얼마나 되나요?",
            answer:
              "기본 서비스 시간은 출퇴근형 기준 9시간(09:00~18:00)입니다. 추가 시간이 필요하신 경우 부가 서비스로 연장이 가능합니다.",
          },
        ],
      },
      {
        id: "faq-booking",
        label: "예약 및 결제",
        icon: "CalendarDays",
        items: [
          {
            id: "faq-booking-1",
            question: "결제는 어떤 방법으로 하나요?",
            answer:
              "계좌이체 및 카드 결제가 가능합니다. 예약 시 계약금을 입금하시면 예약이 확정되며, 잔금은 서비스 시작 전까지 납부해 주시면 됩니다.",
          },
          {
            id: "faq-booking-2",
            question: "정부 바우처도 사용할 수 있나요?",
            answer:
              "네, 정부에서 지원하는 산모·신생아 건강관리 지원사업 바우처를 사용하실 수 있습니다. 바우처 대상 여부는 주민센터 또는 복지로에서 확인해 주세요.",
          },
          {
            id: "faq-booking-3",
            question: "예약 변경이 가능한가요?",
            answer:
              "출산예정일 변경 등으로 서비스 일정 조정이 필요한 경우, 가능한 빨리 연락해 주시면 최대한 맞춰드리겠습니다.",
          },
        ],
      },
      {
        id: "faq-caregiver",
        label: "산후관리사",
        icon: "Heart",
        items: [
          {
            id: "faq-caregiver-1",
            question: "산후관리사는 어떤 자격을 갖추고 있나요?",
            answer:
              "아가잼잼의 모든 산후관리사는 산모·신생아 건강관리사 자격을 보유하고 있으며, 정기적인 교육과 평가를 통해 서비스 품질을 유지하고 있습니다.",
          },
          {
            id: "faq-caregiver-2",
            question: "산후관리사 교체가 가능한가요?",
            answer:
              "서비스 이용 중 관리사 교체가 필요하신 경우, 아가잼잼에 연락해 주시면 가능한 범위 내에서 교체를 도와드립니다.",
          },
          {
            id: "faq-caregiver-3",
            question: "특별한 요청사항이 있으면 어떻게 하나요?",
            answer:
              "예약 시 또는 서비스 시작 전에 요청사항을 말씀해 주시면, 가능한 범위 내에서 반영하여 서비스를 제공합니다.",
          },
        ],
      },
      {
        id: "faq-usage",
        label: "서비스 이용",
        icon: "HelpCircle",
        items: [
          {
            id: "faq-usage-1",
            question: "산후관리사의 업무 범위는 어디까지인가요?",
            answer:
              "산모 케어(산후 식단 준비, 좌욕·반신욕 보조, 유방 관리 등)와 신생아 케어(목욕, 수유 보조, 기저귀 교체 등)가 기본 업무입니다. 가벼운 청소와 빨래도 포함됩니다.",
          },
          {
            id: "faq-usage-2",
            question: "서비스 연장이 가능한가요?",
            answer:
              "서비스 기간 중 연장을 원하시면 아가잼잼에 문의해 주세요. 관리사 일정에 따라 연장이 가능하며, 연장 시 추가 할인 혜택이 있습니다.",
          },
          {
            id: "faq-usage-3",
            question: "서비스에 불만이 있으면 어떻게 하나요?",
            answer:
              "서비스 이용 중 불편사항이 있으시면 즉시 아가잼잼 고객센터(032-442-5992)로 연락해 주세요. 실시간 모니터링을 통해 신속하게 대응합니다.",
          },
        ],
      },
    ],
  },
  {
    id: "terms",
    title: "이용약관",
    categories: [
      {
        id: "terms-cancel",
        label: "예약 및 취소",
        icon: "CalendarX2",
        items: [
          {
            id: "terms-cancel-1",
            question: "서비스 예약 취소",
            answer:
              "이용자(산모)는 개인 사정에 의한 부득이한 경우 서비스 예약을 취소할 수 있습니다.",
          },
          {
            id: "terms-cancel-2",
            question: "예약 취소 절차",
            answer:
              "서비스 예약 취소는 출산예정일로부터 최소 15일 이상의 기간 이전에 이용자가 전화로 예약취소 의사를 밝히고, '아가잼잼'이 이를 확인함으로써 이루어짐을 원칙으로 합니다.",
          },
        ],
      },
      {
        id: "terms-refund",
        label: "환불 규정",
        icon: "Wallet",
        items: [
          {
            id: "terms-refund-1",
            question: "환불 규정",
            answer:
              "이용자의 귀책사유로 서비스 예약취소 시 환불규정은 다음과 같습니다.",
            subItems: [
              "계약일 ~ 서비스 개시 8일 전: 계약금 전액 환급",
              "서비스 개시 7일 ~ 4일 전: 계약금의 60% 환급",
              "서비스 개시 3일 이내: 계약금 전액 미환급",
              "출산예정일과 실제 출산일이 다른 경우 빠른 날짜를 기준일로 적용합니다.",
              "코로나 바이러스에 대한 염려로 인한 취소는 고객님의 선택으로 인한 것임으로 고객님의 귀책사유에 포함됩니다.",
              "계약의 성립은 계약금이 입금된 시점부터입니다.",
            ],
          },
        ],
      },
      {
        id: "terms-duty",
        label: "이용자 의무",
        icon: "Handshake",
        items: [
          {
            id: "terms-duty-1",
            question: "제공인력 존중 의무",
            answer:
              "이용자는 제공인력(산후관리사)을 인격적으로 존중하며, 계약에 명시된 업무 외에 과도한 업무를 맡기지 않아야 합니다. 제공인력의 업무는 산모와 신생아의 케어 임을 기억하며 존중해 주시기 바랍니다. 이를 어길시, 서비스 제공이 거부될 수 있습니다.",
            subItems: [
              "서비스 제외 항목 예시:",
              "과도한 청소 업무 (대청소, 베란다 청소, 가구 재배치, 묵은 빨래, 이불 빨래, 옷장 정리 등)",
              "과도한 부엌 업무 (김장, 방문손님 상차리기, 저녁 9시 이후 가족식사 음식 준비, 많은 양의 반찬 준비 등)",
            ],
          },
          {
            id: "terms-duty-2",
            question: "법정 휴게시간 준수",
            answer:
              "이용자는 제공인력의 근로기준법에 따른 법정휴게시간을 지키도록 해야 합니다. 법정휴게시간은 일 1시간 입니다. 만약 근무 중에 법정휴게시간을 채우지 못했다면, 부족한 시간 만큼 일찍 퇴근하도록 해야 합니다. 이를 어길시, 서비스 제공이 거부될 수 있습니다.",
          },
          {
            id: "terms-duty-3",
            question: "제공인력 교체 요구",
            answer:
              "이용자는 서비스 이용 중에 제공인력의 교체를 요구할 수 있습니다. 그러나, 무분별한 교체 요구는 거부될 수 있으며, 상식을 벗어난 교체 요구가 지속 되는 경우엔 서비스 제공이 거부될 수 있습니다.",
          },
        ],
      },
      {
        id: "terms-privacy",
        label: "개인정보 보호",
        icon: "Shield",
        items: [
          {
            id: "terms-privacy-1",
            question: "중대 과실 보고 의무",
            answer:
              "제공인력의 중대한 과실이 발생한 경우엔 바로 '아가잼잼'에 알려야 합니다.",
          },
          {
            id: "terms-privacy-2",
            question: "CCTV 설치 고지 의무",
            answer:
              "개인정보보호법의 의거하여, 이용자는 제공인력의 근무장소 (산모님 댁)에 CCTV가 설치되어 있는 경우, '아가잼잼'과 제공인력에게 서비스 시작 전에 알려야 합니다. 제공인력이 옷을 갈아입는 방이나 화장실에 CCTV 설치는 명백한 사생활 침해이며, 사전에 공지되지 않은 CCTV가 발견될 경우 형사 및 민사 소송에 처해질 수 있습니다.",
          },
        ],
      },
    ],
  },
];
