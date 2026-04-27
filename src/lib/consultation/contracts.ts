export type ConsultationSelectedServices = {
  plan: {
    id: string;
    name: string;
    priceLabel: string;
    durationDays: number | null;
  } | null;
  addons: Array<{
    id: string;
    name: string;
    priceLabel: string;
    quantity: number;
    group: string | null;
  }>;
};

export type ConsultationFormState = {
  motherName: string;
  phone: string;
  address: string;
  dueDate: string;
  birthExperience: string;
  voucherType: string;
  preferredCaregiverName: string;
  referralSource: string;
  privacyAccepted: boolean;
};

export type ConsultationFieldKey = keyof ConsultationFormState | "branchSlug";

export type ConsultationTouchedState = Partial<
  Record<ConsultationFieldKey, boolean>
>;

export type ConsultationFieldErrors = Partial<
  Record<ConsultationFieldKey, string>
>;

export interface ConsultationInquiryPayload {
  branchSlug: string;
  motherName: string;
  phone: string;
  address: string;
  dueDate: string;
  birthExperience: string;
  voucherType: string;
  preferredCaregiverName: string;
  referralSource: string;
  privacyAccepted: boolean;
  selectedServices: ConsultationSelectedServices;
}
