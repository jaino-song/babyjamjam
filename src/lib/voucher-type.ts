/**
 * Voucher type code resolution for the Korean government postpartum care subsidy system.
 *
 * Type code format: {등급}{등급명}{형}
 * Example: "A통합1형", "B가2형", "C라1형"
 *
 * - 등급 (A/B/C/D): determined by child type + premature/disability upgrade
 * - 등급명 (가/통합/라): user's health center grade (selected via toggle, not form)
 * - 형 (1/2/3): determined by birth order (A) or staff count (B/C/D)
 */

export type GradeLetter = "A" | "B" | "C" | "D";
export type GradeName = "가" | "통합" | "라";
export type ChildType = "단태아" | "쌍태아" | "삼태아" | "사태아이상";

export type SubsidizedFormAnswers = {
  childType: ChildType;
  isPremature: boolean;
  hasDisability: boolean;
  /** For A grade: birth order. For B/C/D: staff count. */
  birthOrder?: "첫째아" | "둘째아" | "셋째아이상";
  staffCount?: number;
};

const CHILD_TYPE_TO_BASE_GRADE: Record<ChildType, GradeLetter> = {
  단태아: "A",
  쌍태아: "B",
  삼태아: "C",
  사태아이상: "D",
};

const CHILD_TYPES: readonly ChildType[] = [
  "단태아",
  "쌍태아",
  "삼태아",
  "사태아이상",
];

const GRADE_LETTERS: readonly GradeLetter[] = ["A", "B", "C", "D"];
const GRADE_NAMES: readonly GradeName[] = ["가", "통합", "라"];
const GRADE_TIER_OPTIONS: Record<GradeLetter, readonly number[]> = {
  A: [1, 2, 3],
  B: [1, 2],
  C: [1, 2],
  D: [1, 2],
};

const GRADE_UPGRADE: Record<GradeLetter, GradeLetter> = {
  A: "B",
  B: "C",
  C: "D",
  D: "D",
};

const BIRTH_ORDER_TO_TIER: Record<string, number> = {
  첫째아: 1,
  둘째아: 2,
  셋째아이상: 3,
};

/** Staff count options available for each grade (B/C/D). */
export const STAFF_OPTIONS: Record<"B" | "C" | "D", number[]> = {
  B: [1, 2],
  C: [2, 3],
  D: [2, 4],
};

/** Maps staff count → tier number for each grade. */
const STAFF_TO_TIER: Record<"B" | "C" | "D", Record<number, number>> = {
  B: { 1: 1, 2: 2 },
  C: { 2: 1, 3: 2 },
  D: { 2: 1, 4: 2 },
};

/**
 * Resolve the grade letter (A-D) from child type and upgrade conditions.
 * Max 1-step upgrade even if both premature AND disability apply.
 */
export function resolveGrade(
  childType: ChildType,
  isPremature: boolean,
  hasDisability: boolean
): GradeLetter {
  const base = CHILD_TYPE_TO_BASE_GRADE[childType];
  if (isPremature || hasDisability) {
    return GRADE_UPGRADE[base];
  }
  return base;
}

/**
 * Resolve the tier number from grade + birth order or staff count.
 * - A grade: uses birth order (1/2/3형)
 * - B/C/D grades: uses staff count (1/2형)
 */
export function resolveTier(
  grade: GradeLetter,
  answers: Pick<SubsidizedFormAnswers, "birthOrder" | "staffCount">
): number | null {
  if (grade === "A") {
    if (!answers.birthOrder) return null;
    return BIRTH_ORDER_TO_TIER[answers.birthOrder] ?? null;
  }

  if (!answers.staffCount) return null;
  const mapping = STAFF_TO_TIER[grade];
  return mapping[answers.staffCount] ?? null;
}

/**
 * Build the full voucher type code string.
 * Example: buildTypeCode("A", "통합", 1) → "A통합1형"
 */
export function buildTypeCode(
  grade: GradeLetter,
  gradeName: GradeName,
  tier: number
): string {
  return `${grade}${gradeName}${tier}형`;
}

export const VOUCHER_TYPE_OPTIONS = GRADE_LETTERS.flatMap((grade) =>
  GRADE_NAMES.flatMap((gradeName) =>
    GRADE_TIER_OPTIONS[grade].map((tier) =>
      buildTypeCode(grade, gradeName, tier)
    )
  )
);

/**
 * Convenience: resolve all form answers into a complete type code.
 * Returns null if tier cannot be determined (missing answers).
 */
export function resolveTypeCode(
  answers: SubsidizedFormAnswers,
  gradeName: GradeName
): string | null {
  const grade = resolveGrade(
    answers.childType,
    answers.isPremature,
    answers.hasDisability
  );
  const tier = resolveTier(grade, answers);
  if (tier === null) return null;
  return buildTypeCode(grade, gradeName, tier);
}

function isChildType(value: string | undefined): value is ChildType {
  return CHILD_TYPES.includes(value as ChildType);
}

/**
 * Resolve the voucher code from pricing wizard answers.
 * This mirrors the typeCode used by the pricing API request.
 */
export function resolveVoucherTypeFromPricingAnswers(
  formAnswers: Record<string, string | undefined>,
  gradeName: GradeName
): string | null {
  if (formAnswers.subsidy !== "yes" || !isChildType(formAnswers.childType)) {
    return null;
  }

  const grade = resolveGrade(
    formAnswers.childType,
    formAnswers.premature === "yes",
    formAnswers.disability === "yes"
  );

  let tier: number | null;
  if (grade === "A") {
    tier = resolveTier(grade, {
      birthOrder: formAnswers.birthOrder as
        | SubsidizedFormAnswers["birthOrder"]
        | undefined,
    });
  } else {
    let staffCount: number | undefined;
    if (formAnswers.staffCount) {
      const staffOptions = STAFF_OPTIONS[grade];
      staffCount =
        formAnswers.staffCount === "yes" ? staffOptions[1] : staffOptions[0];
    }
    tier = resolveTier(grade, { staffCount });
  }

  if (tier === null) return null;
  return buildTypeCode(grade, gradeName, tier);
}
