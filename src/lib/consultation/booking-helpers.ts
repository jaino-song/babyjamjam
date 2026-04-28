import type {
  ConsultationFieldErrors,
  ConsultationFieldKey,
  ConsultationFormState,
  ConsultationInquiryPayload,
  ConsultationSelectedServices as SelectedServicesPayload,
} from "@/lib/consultation/contracts";

const PHONE_REGEX = /^01[016789]-?\d{3,4}-?\d{4}$/;
const NAME_PATTERN = /^[\p{L} ]+$/u;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const CONSULTATION_SUBMIT_ERROR_MESSAGE =
  "상담 신청에 실패했습니다.";

export const EMPTY_CONSULTATION_FORM: ConsultationFormState = {
  motherName: "",
  phone: "",
  address: "",
  dueDate: "",
  birthExperience: "",
  voucherType: "",
  preferredCaregiverName: "",
  referralSource: "",
  privacyAccepted: false,
};

export function sanitizeNameInput(value: string): string {
  return value.replace(/[^\p{L} ]+/gu, "");
}

export function formatPhoneInput(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (!digits) return "";
  if (digits[0] !== "0") return "";
  if (digits.length === 1) return "0";
  if (digits[1] !== "1") return "0";
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;

  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

export function isValidDateValue(value: string): boolean {
  if (!DATE_PATTERN.test(value)) return false;

  const [yearText, monthText, dayText] = value.split("-");
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

export function getServerFieldError(
  message: string
): ConsultationFieldKey | null {
  if (message.includes("전화번호")) return "phone";
  if (message.includes("성함") || message.includes("이름")) return "motherName";
  if (message.includes("주소")) return "address";
  if (message.includes("출산") || message.includes("날짜")) return "dueDate";
  if (message.includes("지점") || message.includes("지역")) return "branchSlug";
  if (message.includes("동의")) return "privacyAccepted";
  return null;
}

export function getFieldErrors(
  form: ConsultationFormState,
  branchSlug: string | null
): ConsultationFieldErrors {
  const motherName = form.motherName.trim();
  const phone = form.phone.trim();
  const address = form.address.trim();

  return {
    branchSlug: branchSlug ? undefined : "지역을 다시 선택해 주세요.",
    motherName: !motherName
      ? "필수"
      : NAME_PATTERN.test(motherName)
        ? undefined
        : "숫자나 특수문자는 입력할 수 없습니다.",
    phone: !phone
      ? "필수"
      : PHONE_REGEX.test(phone)
        ? undefined
        : "유효한 전화번호를 입력해주세요.",
    address: !address
      ? "필수"
      : address.length >= 2
        ? undefined
        : "주소를 조금 더 입력해 주세요.",
    dueDate: !form.dueDate.trim()
      ? "필수"
      : isValidDateValue(form.dueDate)
        ? undefined
        : "유효한 날짜를 입력해 주세요.",
    birthExperience: form.birthExperience.trim() ? undefined : "필수",
    referralSource: form.referralSource.trim() ? undefined : "필수",
    privacyAccepted: form.privacyAccepted ? undefined : "동의가 필요합니다.",
  };
}

export function buildConsultationInquiryPayload(
  branchSlug: string,
  form: ConsultationFormState,
  selectedServices: SelectedServicesPayload
): ConsultationInquiryPayload {
  return {
    branchSlug,
    motherName: form.motherName.trim(),
    phone: form.phone.trim(),
    address: form.address.trim(),
    dueDate: form.dueDate,
    birthExperience: form.birthExperience,
    voucherType: form.voucherType.trim(),
    preferredCaregiverName: form.preferredCaregiverName.trim(),
    referralSource: form.referralSource,
    privacyAccepted: form.privacyAccepted,
    selectedServices,
  };
}

export function getConsultationSubmitErrorMessage(payload: unknown): string {
  if (!payload || typeof payload !== "object") {
    return CONSULTATION_SUBMIT_ERROR_MESSAGE;
  }

  const errorPayload = payload as {
    error?: unknown;
    message?: unknown;
  };

  if (Array.isArray(errorPayload.message)) {
    const [firstMessage] = errorPayload.message;
    return typeof firstMessage === "string"
      ? firstMessage
      : CONSULTATION_SUBMIT_ERROR_MESSAGE;
  }

  if (typeof errorPayload.message === "string") {
    return errorPayload.message;
  }

  if (typeof errorPayload.error === "string") {
    return errorPayload.error;
  }

  return CONSULTATION_SUBMIT_ERROR_MESSAGE;
}
