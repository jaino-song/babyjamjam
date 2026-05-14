export type BranchType = "direct" | "franchise";

export type BranchData = {
  id: string;
  name: string;
  region: string;
  district: string;
  type: BranchType;
  address: string;
  phone: string;
  hours: string;
  description: string;
};

export const BRANCHES: BranchData[] = [
  {
    id: "incheon-junggu",
    name: "인천 중구점",
    region: "인천",
    district: "중구",
    type: "direct",
    address: "인천광역시 중구 신포로 27, 4층",
    phone: "1661-2386",
    hours: "평일 09:00 – 18:00",
    description: "인천 중구·영종 지역 전담. 신포역 인근.",
  },
  {
    id: "incheon-donggu",
    name: "인천 동구점",
    region: "인천",
    district: "동구",
    type: "direct",
    address: "인천광역시 동구 솔빛로 105, 3층",
    phone: "1661-2386",
    hours: "평일 09:00 – 18:00",
    description: "인천 동구 전담. 동인천역 도보 3분.",
  },
  {
    id: "incheon-michuhol",
    name: "인천 미추홀구점",
    region: "인천",
    district: "미추홀구",
    type: "direct",
    address: "인천광역시 미추홀구 경인로 229, 5층",
    phone: "1661-2386",
    hours: "평일 09:00 – 18:00",
    description: "미추홀구 전담. 주안역 인근.",
  },
  {
    id: "incheon-yeonsu",
    name: "인천 연수구점",
    region: "인천",
    district: "연수구",
    type: "direct",
    address: "인천광역시 연수구 컨벤시아대로 165, 6층",
    phone: "1661-2386",
    hours: "평일 09:00 – 18:00",
    description: "연수·송도 지역 전담. 센트럴파크역 인근.",
  },
  {
    id: "incheon-namdong",
    name: "인천 남동구점",
    region: "인천",
    district: "남동구",
    type: "direct",
    address: "인천광역시 남동구 인주대로 552, 3층",
    phone: "1661-2386",
    hours: "평일 09:00 – 18:00",
    description: "남동구 전담. 남동인더스파크역 인근.",
  },
  {
    id: "incheon-bupyeong",
    name: "인천 부평구점",
    region: "인천",
    district: "부평구",
    type: "direct",
    address: "인천광역시 부평구 부평대로 283, 4층",
    phone: "1661-2386",
    hours: "평일 09:00 – 18:00",
    description: "부평구 전담. 부평역 도보 5분.",
  },
  {
    id: "incheon-gyeyang",
    name: "인천 계양구점",
    region: "인천",
    district: "계양구",
    type: "direct",
    address: "인천광역시 계양구 계양대로 145, 3층",
    phone: "1661-2386",
    hours: "평일 09:00 – 18:00",
    description: "계양구 전담. 계양역 인근.",
  },
  {
    id: "incheon-seogu",
    name: "인천 서구점",
    region: "인천",
    district: "서구",
    type: "direct",
    address: "인천광역시 서구 청라대로 229, 5층",
    phone: "1661-2386",
    hours: "평일 09:00 – 18:00",
    description: "서구·청라 지역 전담. 검암역 인근.",
  },
  {
    id: "gyeongsan",
    name: "경북 경산점",
    region: "경북",
    district: "경산시",
    type: "franchise",
    address: "경북 경산시 하양읍 대학로1516",
    phone: "053-851-9807",
    hours: "평일 09:00 – 18:00",
    description: "경산·영천·청도 지역 담당. 경산시청 인근 접근성 좋은 지점.",
  },
  {
    id: "goyang-paju",
    name: "고양파주점",
    region: "경기도",
    district: "고양파주",
    type: "direct",
    address: "경기도 고양시 덕양구 중앙로 1205, 3층",
    phone: "1661-2386",
    hours: "평일 09:00 – 18:00",
    description: "고양·파주 지역 전담. 덕양구·일산·파주 접근성 좋은 지점.",
  },
  {
    id: "bucheon",
    name: "부천점",
    region: "경기도",
    district: "부천시",
    type: "direct",
    address: "경기도 부천시 중동로 248, 4층",
    phone: "1661-2386",
    hours: "평일 09:00 – 18:00",
    description: "부천 원미·소사·오정 지역 전담. 중동역 인근.",
  },
  {
    id: "gimpo",
    name: "김포점",
    region: "경기도",
    district: "김포시",
    type: "direct",
    address: "경기도 김포시 김포한강9로 76, 3층",
    phone: "1661-2386",
    hours: "평일 09:00 – 18:00",
    description: "김포 한강신도시·사우 지역 전담.",
  },
];

export function findBranchBySlug(slug: string | null | undefined): BranchData | null {
  if (!slug) return null;
  return BRANCHES.find((branch) => branch.id === slug) ?? null;
}

export function findBranchByRegionDistrict(
  region: string | null | undefined,
  district: string | null | undefined
): BranchData | null {
  if (!region || !district) return null;

  const exact = BRANCHES.find(
    (branch) => branch.region === region && branch.district === district
  );
  if (exact) return exact;

  if (region === "경기도") {
    if (district.includes("고양") || district.includes("파주")) {
      return findBranchBySlug("goyang-paju");
    }
    if (district.includes("부천")) {
      return findBranchBySlug("bucheon");
    }
    if (district.includes("김포")) {
      return findBranchBySlug("gimpo");
    }
  }

  return null;
}
