"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { RadioPill } from "./ui/radio-pill";
import {
  KoreaRegionMap,
  type KoreaRegionMapHandle,
  type BreadcrumbPart,
} from "./korea-region-map";
import {
  findBranchByRegionDistrict,
  findBranchBySlug,
} from "@/data/branches";

const AVAILABLE_REGIONS = new Set(["인천", "경기도", "경북"]);

type ModalView = "map" | "form";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  /** If provided, skip map and go directly to form with this region pre-selected */
  initialRegion?: string | null;
  /** District/구 within the region (e.g. "강남구") */
  initialDistrict?: string | null;
  /** Public branch slug used by the staff backend for inquiry routing */
  initialBranchSlug?: string | null;
  selectedServices?: ConsultationSelectedServices;
}

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

type ConsultationFormState = {
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

type ConsultationTouchedState = Partial<Record<keyof ConsultationFormState | "branchSlug", boolean>>;

const EMPTY_FORM: ConsultationFormState = {
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

const PHONE_REGEX = /^01[016789]-?\d{3,4}-?\d{4}$/;
const NAME_PATTERN = /^[\p{L} ]+$/u;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function sanitizeNameInput(value: string): string {
  return value.replace(/[^\p{L} ]+/gu, "");
}

function formatPhoneInput(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (!digits) return "";
  if (digits[0] !== "0") return "";
  if (digits.length === 1) return "0";
  if (digits[1] !== "1") return "0";
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;

  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

function isValidDateValue(value: string): boolean {
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

function getServerFieldError(message: string): keyof ConsultationFormState | "branchSlug" | null {
  if (message.includes("전화번호")) return "phone";
  if (message.includes("성함") || message.includes("이름")) return "motherName";
  if (message.includes("주소")) return "address";
  if (message.includes("출산") || message.includes("날짜")) return "dueDate";
  if (message.includes("지점") || message.includes("지역")) return "branchSlug";
  if (message.includes("동의")) return "privacyAccepted";
  return null;
}

function getFieldErrors(
  form: ConsultationFormState,
  branchSlug: string | null
): Partial<Record<keyof ConsultationFormState | "branchSlug", string>> {
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

function InlineFieldError({ message }: { message?: string }) {
  return (
    <span
      aria-hidden={!message}
      className={`bm__field-error ${message ? "" : "bm__field-error--empty"}`}
    >
      {message ?? "\u00A0"}
    </span>
  );
}

function FieldLabel({
  children,
  required = false,
  error,
}: {
  children: React.ReactNode;
  required?: boolean;
  error?: string;
}) {
  return (
    <div className="bm__form-label-row">
      <label className="bm__form-label">
        {children} {required && <span className="bm__required">*</span>}
      </label>
      <InlineFieldError message={error} />
    </div>
  );
}

export function BookingModal({
  open,
  onClose,
  initialRegion,
  initialDistrict,
  initialBranchSlug,
  selectedServices = { plan: null, addons: [] },
}: BookingModalProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const [view, setView] = useState<ModalView>("map");
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbPart[]>([
    { label: "대한민국" },
  ]);
  const [showBack, setShowBack] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedMuni, setSelectedMuni] = useState<string | null>(null);
  const [selectedBranchSlug, setSelectedBranchSlug] = useState<string | null>(null);
  const [form, setForm] = useState<ConsultationFormState>(EMPTY_FORM);
  const [touched, setTouched] = useState<ConsultationTouchedState>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const mapRef = useRef<KoreaRegionMapHandle>(null);

  const selectedBranch =
    findBranchBySlug(selectedBranchSlug) ??
    findBranchByRegionDistrict(selectedProvince, selectedMuni);

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      if (initialRegion) {
        // Skip map, go directly to form with pre-selected region + district
        setView("form");
        setSelectedProvince(initialRegion);
        setSelectedMuni(initialDistrict ?? null);
        setSelectedBranchSlug(
          initialBranchSlug ??
          findBranchByRegionDistrict(initialRegion, initialDistrict)?.id ??
          null
        );
        const bc: BreadcrumbPart[] = [
          { label: "대한민국" },
          { label: initialRegion },
        ];
        if (initialDistrict) {
          bc.push({ label: initialDistrict });
        }
        setBreadcrumb(bc);
        setShowBack(false);
      } else {
        setView("map");
        setBreadcrumb([{ label: "대한민국" }]);
        setShowBack(false);
        setSelectedProvince(null);
        setSelectedMuni(null);
        setSelectedBranchSlug(null);
        mapRef.current?.reset();
      }
      setForm(EMPTY_FORM);
      setTouched({});
      setSubmitAttempted(false);
      setSubmitError(null);
      setSubmitted(false);
    }
  }, [open, initialRegion, initialDistrict, initialBranchSlug]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Prevent body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleBreadcrumbChange = useCallback((parts: BreadcrumbPart[]) => {
    setBreadcrumb(parts);
  }, []);

  const handleShowBack = useCallback((show: boolean) => {
    setShowBack(show);
  }, []);

  const handleMunicipalitySelect = useCallback(
    (province: string, municipality: string) => {
      setSelectedProvince(province);
      setSelectedMuni(municipality);
      setSelectedBranchSlug(findBranchByRegionDistrict(province, municipality)?.id ?? null);
      setView("form");
      setShowBack(true);
      setBreadcrumb([
        {
          label: "대한민국",
          action: () => {
            setView("map");
            mapRef.current?.reset();
          },
        },
        {
          label: province,
          action: () => {
            setView("map");
            mapRef.current?.goBack();
            // drillToMunicipalities will be called by the map internally after goBack
            // Actually goBack goes to provinces. We need to re-drill.
            // The map component handles this - goBack from municipalities goes to provinces
          },
        },
        { label: municipality },
      ]);
    },
    []
  );

  const handleBack = useCallback(() => {
    if (view === "form") {
      // Go back to municipality map
      setView("map");
      // The map should still be showing municipalities for the selected province
      // We need to trigger a re-drill. Actually the map state persists.
      // But we hid the map, so we need to just show it again.
      // The map's internal state should still be on municipalities view.
      if (selectedProvince) {
        setBreadcrumb([
          {
            label: "대한민국",
            action: () => {
              mapRef.current?.reset();
            },
          },
          { label: selectedProvince },
        ]);
      }
    } else {
      mapRef.current?.goBack();
    }
  }, [view, selectedProvince]);

  const updateField = useCallback(<K extends keyof ConsultationFormState>(
    key: K,
    value: ConsultationFormState[K]
  ) => {
    const normalizedValue =
      key === "motherName" && typeof value === "string"
        ? sanitizeNameInput(value)
        : key === "phone" && typeof value === "string"
          ? formatPhoneInput(value)
          : value;

    setForm((prev) => ({ ...prev, [key]: normalizedValue }));
    setSubmitError(null);
    setSubmitted(false);
  }, []);

  const markTouched = useCallback((key: keyof ConsultationFormState | "branchSlug") => {
    setTouched((prev) => ({ ...prev, [key]: true }));
  }, []);

  const handleSubmit = useCallback(async () => {
    const branchSlug = selectedBranch?.id ?? selectedBranchSlug;
    const nextErrors = getFieldErrors(form, branchSlug);
    setSubmitAttempted(true);

    if (Object.values(nextErrors).some(Boolean)) {
      setSubmitError(null);
      return;
    }

    if (!branchSlug) {
      setSubmitError("상담 가능한 지점을 찾을 수 없습니다. 지역을 다시 선택해 주세요.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/consultation-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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
        }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => null);
        const message = Array.isArray(payload?.message)
          ? payload.message[0]
          : payload?.message || payload?.error || "상담 신청에 실패했습니다.";
        const field = getServerFieldError(String(message));

        if (field) {
          setTouched((prev) => ({ ...prev, [field]: true }));
        }

        throw new Error(String(message));
      }

      setSubmitted(true);
      setForm(EMPTY_FORM);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "상담 신청에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  }, [form, selectedBranch?.id, selectedBranchSlug, selectedServices]);

  const handleSuccessBack = useCallback(() => {
    setSubmitted(false);
    onClose();
  }, [onClose]);

  if (!open || !mounted) return null;

  const headerTitle = view === "map" ? "지역을 선택해 주세요" : "상담 신청";
  const branchSlug = selectedBranch?.id ?? selectedBranchSlug;
  const fieldErrors = getFieldErrors(form, branchSlug);
  const visibleError = (key: keyof typeof fieldErrors) =>
    submitAttempted || touched[key] ? fieldErrors[key] : undefined;
  const showChrome = !submitted;

  return createPortal(
    <div
      className="bm-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bm">
        {/* Header */}
        {showChrome && (
          <div className="bm__header">
            <h2 className="bm__title">{headerTitle}</h2>
            <button className="bm__close" onClick={onClose} aria-label="닫기">
              ✕
            </button>
          </div>
        )}

        {/* Nav bar wrap: breadcrumb + back button */}
        {showChrome && (
          <div className="bm__nav-wrap">
            <div className="bm__breadcrumb">
              {breadcrumb.map((part, i) => (
                <span key={i}>
                  {i > 0 && <span className="bm__breadcrumb-sep">›</span>}
                  {i === breadcrumb.length - 1 ? (
                    <span className="bm__breadcrumb-current">{part.label}</span>
                  ) : (
                    <span
                      className="bm__breadcrumb-link"
                      onClick={part.action}
                    >
                      {part.label}
                    </span>
                  )}
                </span>
              ))}
            </div>
            {showBack && (
              <button className="bm__back" onClick={handleBack}>
                ← 이전
              </button>
            )}
          </div>
        )}

        {/* Map view */}
        {showChrome && (
          <div
            className="bm__map-container"
            style={{ display: view === "map" ? "flex" : "none" }}
          >
            <KoreaRegionMap
              ref={mapRef}
              availableRegions={AVAILABLE_REGIONS}
              onBreadcrumbChange={handleBreadcrumbChange}
              onShowBack={handleShowBack}
              onMunicipalitySelect={handleMunicipalitySelect}
            />
          </div>
        )}
        {showChrome && view === "map" && (
          <div className="bm__footer">
            <div className="bm__footer-icon">!</div>
            <p>
              서비스 가능 지역만 선택할 수 있습니다. 추가 지역은 순차적으로
              오픈 예정이에요.
            </p>
          </div>
        )}

        {/* Form view */}
        {view === "form" && submitted && (
          <div className="bm-success-card">
            <h2 className="bm-success-card__title">상담 신청 완료</h2>
            <p className="bm-success-card__label">담당자가 곧 연락드릴 거예요 :)</p>
            <button
              type="button"
              className="bm-success-card__btn"
              onClick={handleSuccessBack}
            >
              돌아가기
            </button>
          </div>
        )}

        {view === "form" && !submitted && (
          <div className="bm__form-panel">
            <div className="bm__form-intro">
              <p className="big-p">
                산후도우미 서비스에 대해서 궁금한 점이 있으시다면,
                <br />
                부담없이 상담 받으세요. 바로 예약하지 않으셔도 괜찮아요!
              </p>
            </div>

            <div className="bm__form-fields">
              <div className="bm__form-group">
                <FieldLabel error={visibleError("branchSlug")}>담당 지점</FieldLabel>
                <input
                  className={`bm__form-input ${visibleError("branchSlug") ? "bm__form-input--error" : ""}`}
                  type="text"
                  value={selectedBranch?.name ?? (selectedMuni ? `${selectedMuni.replace(/시$/, "")}점` : selectedProvince ?? "")}
                  readOnly
                />
              </div>

              <div className="bm__form-group">
                <FieldLabel required error={visibleError("motherName")}>산모님 성함</FieldLabel>
                <input
                  className={`bm__form-input ${visibleError("motherName") ? "bm__form-input--error" : ""}`}
                  type="text"
                  placeholder="성함을 입력해 주세요"
                  value={form.motherName}
                  onChange={(event) => updateField("motherName", event.target.value)}
                  onBlur={() => markTouched("motherName")}
                />
              </div>

              <div className="bm__form-group">
                <FieldLabel
                  required
                  error={form.phone.trim() ? fieldErrors.phone : visibleError("phone")}
                >
                  산모님 연락처
                </FieldLabel>
                <input
                  className={`bm__form-input ${(form.phone.trim() ? fieldErrors.phone : visibleError("phone")) ? "bm__form-input--error" : ""}`}
                  type="tel"
                  placeholder="010-0000-0000"
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  onBlur={() => markTouched("phone")}
                />
              </div>

              <div className="bm__form-group">
                <FieldLabel required error={visibleError("address")}>주소</FieldLabel>
                <input
                  className={`bm__form-input ${visibleError("address") ? "bm__form-input--error" : ""}`}
                  type="text"
                  placeholder="00구 00동 까지"
                  value={form.address}
                  onChange={(event) => updateField("address", event.target.value)}
                  onBlur={() => markTouched("address")}
                />
              </div>

              <div className="bm__form-group">
                <FieldLabel required error={visibleError("dueDate")}>출산 예정일</FieldLabel>
                <input
                  className={`bm__form-input ${visibleError("dueDate") ? "bm__form-input--error" : ""}`}
                  type="date"
                  value={form.dueDate}
                  onChange={(event) => updateField("dueDate", event.target.value)}
                  onBlur={() => markTouched("dueDate")}
                />
              </div>

              <div className="bm__form-group">
                <FieldLabel required error={visibleError("birthExperience")}>출산 경험</FieldLabel>
                <div className="bm__radio-group">
                  <RadioPill
                    name="birthExp"
                    value="초산"
                    checked={form.birthExperience === "초산"}
                    onChange={(event) => {
                      updateField("birthExperience", event.target.value);
                      markTouched("birthExperience");
                    }}
                  >
                    초산
                  </RadioPill>
                  <RadioPill
                    name="birthExp"
                    value="경산"
                    checked={form.birthExperience === "경산"}
                    onChange={(event) => {
                      updateField("birthExperience", event.target.value);
                      markTouched("birthExperience");
                    }}
                  >
                    경산
                  </RadioPill>
                </div>
              </div>

              <div className="bm__form-group">
                <FieldLabel>정부지원 바우처 유형</FieldLabel>
                <input
                  className="bm__form-input"
                  type="text"
                  placeholder="A통합-0형 (없으면 무기재)"
                  value={form.voucherType}
                  onChange={(event) => updateField("voucherType", event.target.value)}
                />
              </div>

              <div className="bm__form-group">
                <FieldLabel>원하시는 관리사님 성함</FieldLabel>
                <input
                  className="bm__form-input"
                  type="text"
                  placeholder="없으면 무기재"
                  value={form.preferredCaregiverName}
                  onChange={(event) => updateField("preferredCaregiverName", event.target.value)}
                />
              </div>

              <div className="bm__form-group">
                <FieldLabel required error={visibleError("referralSource")}>아가잼잼을 어떻게 알게 되셨나요?</FieldLabel>
                <select
                  className={`bm__form-select ${visibleError("referralSource") ? "bm__form-input--error" : ""}`}
                  value={form.referralSource}
                  onChange={(event) => updateField("referralSource", event.target.value)}
                  onBlur={() => markTouched("referralSource")}
                >
                  <option value="" disabled>
                    항목을 선택해 주세요
                  </option>
                  <option value="시군구청">시·군·구청 또는 보건소</option>
                  <option value="지인소개">친척 또는 지인 소개</option>
                  <option value="블로그">블로그</option>
                  <option value="카페">네이버 카페</option>
                  <option value="검색">네이버 검색</option>
                  <option value="타기관">타기관 소개</option>
                </select>
              </div>

              <label className="bm__privacy">
                <input
                  type="checkbox"
                  checked={form.privacyAccepted}
                  onChange={(event) => updateField("privacyAccepted", event.target.checked)}
                />
                <span>
                  상담 안내를 위한 개인정보 수집 및 이용에 동의합니다.
                  <InlineFieldError message={visibleError("privacyAccepted")} />
                </span>
              </label>

              {submitError && (
                <p className="bm__form-message bm__form-message--error">{submitError}</p>
              )}
              <div className="bm__form-submit-row">
                <button
                  className="bm__form-submit"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                >
                  {isSubmitting ? "전송 중..." : "상담 신청하기"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
