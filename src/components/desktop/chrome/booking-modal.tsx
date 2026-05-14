"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import posthog from "posthog-js";

import {
  findBranchByRegionDistrict,
  findBranchBySlug,
} from "@/data/branches";
import {
  buildConsultationInquiryPayload,
  EMPTY_CONSULTATION_FORM,
  formatPhoneInput,
  getConsultationSubmitErrorMessage,
  getFieldErrors,
  getServerFieldError,
  sanitizeNameInput,
} from "@/lib/consultation/booking-helpers";
import type {
  ConsultationFormState,
  ConsultationSelectedServices as SelectedServicesPayload,
  ConsultationTouchedState,
} from "@/lib/consultation/contracts";

import {
  KoreaRegionMap,
  type KoreaRegionMapHandle,
  type BreadcrumbPart,
} from "@/components/korea-region-map";
import { RadioPill } from "@/components/ui/radio-pill";

const AVAILABLE_REGIONS = new Set(["인천", "경기도", "경북"]);

type ModalView = "map" | "form" | "success";

interface DesktopBookingModalProps {
  "data-component"?: string;
  open: boolean;
  onClose: () => void;
  initialRegion?: string | null;
  initialDistrict?: string | null;
  initialBranchSlug?: string | null;
  selectedServices?: SelectedServicesPayload;
}

function InlineFieldError({
  message,
  "data-component": dataComponent,
}: {
  message?: string;
  "data-component"?: string;
}) {
  return (
    <span
      aria-hidden={!message}
      className={`bm__field-error ${message ? "" : "bm__field-error--empty"}`}
      data-component={dataComponent}
    >
      {message ?? "\u00A0"}
    </span>
  );
}

function FieldLabel({
  children,
  required = false,
  error,
  "data-component": dataComponent,
}: {
  children: React.ReactNode;
  required?: boolean;
  error?: string;
  "data-component"?: string;
}) {
  return (
    <div
      className="bm__form-label-row"
      data-component={dataComponent ? `${dataComponent}_label-row` : undefined}
    >
      <label
        className="bm__form-label"
        data-component={dataComponent ? `${dataComponent}_label` : undefined}
      >
        {children}{" "}
        {required && (
          <span
            className="bm__required"
            data-component={dataComponent ? `${dataComponent}_required` : undefined}
          >
            *
          </span>
        )}
      </label>
      <InlineFieldError
        message={error}
        data-component={dataComponent ? `${dataComponent}_error` : undefined}
      />
    </div>
  );
}

export function DesktopBookingModal({
  "data-component": dataComponent,
  open,
  onClose,
  initialRegion,
  initialDistrict,
  initialBranchSlug,
  selectedServices = { plan: null, addons: [] },
}: DesktopBookingModalProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const [view, setView] = useState<ModalView>("map");
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbPart[]>([
    { label: "대한민국" },
  ]);
  const [showBack, setShowBack] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedMuni, setSelectedMuni] = useState<string | null>(null);
  const [selectedBranchSlug, setSelectedBranchSlug] = useState<string | null>(
    null
  );
  const [form, setForm] = useState<ConsultationFormState>(
    EMPTY_CONSULTATION_FORM
  );
  const [touched, setTouched] = useState<ConsultationTouchedState>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const mapRef = useRef<KoreaRegionMapHandle>(null);

  const selectedBranch =
    findBranchBySlug(selectedBranchSlug) ??
    findBranchByRegionDistrict(selectedProvince, selectedMuni);

  useEffect(() => {
    if (open) {
      if (initialRegion) {
        setView("form");
        setSelectedProvince(initialRegion);
        setSelectedMuni(initialDistrict ?? null);
        setSelectedBranchSlug(
          initialBranchSlug ??
            findBranchByRegionDistrict(initialRegion, initialDistrict)?.id ??
            null
        );
        const nextBreadcrumb: BreadcrumbPart[] = [
          { label: "대한민국" },
          { label: initialRegion },
        ];
        if (initialDistrict) {
          nextBreadcrumb.push({ label: initialDistrict });
        }
        setBreadcrumb(nextBreadcrumb);
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
      setForm(EMPTY_CONSULTATION_FORM);
      setTouched({});
      setSubmitAttempted(false);
      setSubmitError(null);
      setSubmitted(false);
    }
  }, [open, initialRegion, initialDistrict, initialBranchSlug]);

  useEffect(() => {
    if (!open) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

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
      posthog.capture("consultation_region_selected", {
        province,
        municipality,
        source: "desktop",
      });
      setSelectedProvince(province);
      setSelectedMuni(municipality);
      setSelectedBranchSlug(
        findBranchByRegionDistrict(province, municipality)?.id ?? null
      );
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
          },
        },
        { label: municipality },
      ]);
    },
    []
  );

  const handleBack = useCallback(() => {
    if (view === "form") {
      setView("map");
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

  const updateField = useCallback(
    <K extends keyof ConsultationFormState>(
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
    },
    []
  );

  const markTouched = useCallback(
    (key: keyof ConsultationFormState | "branchSlug") => {
      setTouched((prev) => ({ ...prev, [key]: true }));
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    const branchSlug = selectedBranch?.id ?? selectedBranchSlug;
    const nextErrors = getFieldErrors(form, branchSlug);
    setSubmitAttempted(true);

    if (Object.values(nextErrors).some(Boolean)) {
      setSubmitError(null);
      return;
    }

    if (!branchSlug) {
      setSubmitError(
        "상담 가능한 지점을 찾을 수 없습니다. 지역을 다시 선택해 주세요."
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/consultation-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...buildConsultationInquiryPayload(
            branchSlug,
            form,
            selectedServices
          ),
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        const message = getConsultationSubmitErrorMessage(payload);
        const field = getServerFieldError(message);

        if (field) {
          setTouched((prev) => ({ ...prev, [field]: true }));
        }

        throw new Error(message);
      }

      posthog.capture("consultation_form_submitted", {
        branch_slug: branchSlug,
        referral_source: form.referralSource,
        birth_experience: form.birthExperience,
        has_plan: selectedServices.plan !== null,
        addon_count: selectedServices.addons.length,
        source: "desktop",
      });
      setSubmitted(true);
      setShowBack(false);
      setBreadcrumb([]);
      setForm(EMPTY_CONSULTATION_FORM);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "상담 신청에 실패했습니다.";
      posthog.capture("consultation_submission_failed", {
        error_message: errorMessage,
        branch_slug: branchSlug,
        source: "desktop",
      });
      posthog.captureException(error);
      setSubmitError(errorMessage);
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
  const getComponent = (suffix: string) =>
    dataComponent ? `${dataComponent}_${suffix}` : undefined;
  const getFieldComponent = (name: string, suffix?: string) => {
    const base = getComponent(`field-${name}`);
    return base && suffix ? `${base}_${suffix}` : base;
  };

  return createPortal(
    <div
      className="bm-overlay"
      data-component={dataComponent}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="bm" data-component={getComponent("dialog")}>
        {showChrome && (
          <div className="bm__header" data-component={getComponent("header")}>
            <h2 className="bm__title" data-component={getComponent("header-title")}>
              {headerTitle}
            </h2>
            <button
              className="bm__close"
              onClick={onClose}
              aria-label="닫기"
              data-component={getComponent("close-button")}
            >
              ✕
            </button>
          </div>
        )}

        {showChrome && (
          <div className="bm__nav-wrap" data-component={getComponent("nav-wrap")}>
            <div className="bm__breadcrumb" data-component={getComponent("breadcrumb")}>
              {breadcrumb.map((part, index) => (
                <span
                  key={index}
                  data-component={getComponent(`breadcrumb-item-${index + 1}`)}
                >
                  {index > 0 && (
                    <span
                      className="bm__breadcrumb-sep"
                      data-component={getComponent(`breadcrumb-separator-${index + 1}`)}
                    >
                      ›
                    </span>
                  )}
                  {index === breadcrumb.length - 1 ? (
                    <span
                      className="bm__breadcrumb-current"
                      data-component={getComponent(`breadcrumb-current-${index + 1}`)}
                    >
                      {part.label}
                    </span>
                  ) : (
                    <span
                      className="bm__breadcrumb-link"
                      onClick={part.action}
                      data-component={getComponent(`breadcrumb-link-${index + 1}`)}
                    >
                      {part.label}
                    </span>
                  )}
                </span>
              ))}
            </div>
            {showBack && (
              <button
                className="bm__back"
                onClick={handleBack}
                data-component={getComponent("back-button")}
              >
                ← 이전
              </button>
            )}
          </div>
        )}

        {showChrome && (
          <div
            className="bm__map-container"
            style={{ display: view === "map" ? "flex" : "none" }}
            data-component={getComponent("map-view")}
          >
            <KoreaRegionMap
              ref={mapRef}
              availableRegions={AVAILABLE_REGIONS}
              onBreadcrumbChange={handleBreadcrumbChange}
              onShowBack={handleShowBack}
              onMunicipalitySelect={handleMunicipalitySelect}
              data-component={getComponent("map")}
            />
          </div>
        )}
        {showChrome && view === "map" && (
          <div className="bm__footer" data-component={getComponent("map-footer")}>
            <div
              className="bm__footer-icon"
              data-component={getComponent("map-footer-icon")}
            >
              !
            </div>
            <p data-component={getComponent("map-footer-copy")}>
              서비스 가능 지역만 선택할 수 있습니다. 추가 지역은 순차적으로
              오픈 예정이에요.
            </p>
          </div>
        )}

        {submitted && (
          <div
            className="bm__success-panel"
            role="status"
            aria-live="polite"
            data-component={getComponent("success-view")}
          >
            <div
              className="bm__success-mark"
              aria-hidden="true"
              data-component={getComponent("success-mark")}
            >
              ✓
            </div>
            <div
              className="bm__success-copy"
              data-component={getComponent("success-copy")}
            >
              <h3
                className="bm__success-title"
                data-component={getComponent("success-title")}
              >
                상담 신청이 완료되었습니다
              </h3>
              <p
                className="bm__success-description"
                data-component={getComponent("success-description")}
              >
                빠른 시일 내에 담당 지점에서 연락드리겠습니다.
              </p>
            </div>
            <button
              className="bm__success-button"
              onClick={handleSuccessBack}
              data-component={getComponent("success-button")}
            >
              확인
            </button>
          </div>
        )}

        {view === "form" && !submitted && (
          <div className="bm__form-panel" data-component={getComponent("form-view")}>
            <div className="bm__form-intro" data-component={getComponent("form-intro")}>
              <p className="big-p" data-component={getComponent("form-intro-copy")}>
                산후도우미 서비스에 대해서 궁금한 점이 있으시다면,
                <br data-component={getComponent("form-intro-break")} />
                부담없이 상담 받으세요. 바로 예약하지 않으셔도 괜찮아요!
              </p>
            </div>

            <div className="bm__form-fields" data-component={getComponent("form-fields")}>
              <div
                className="bm__form-group"
                data-component={getFieldComponent("branch")}
              >
                <FieldLabel
                  error={visibleError("branchSlug")}
                  data-component={getFieldComponent("branch")}
                >
                  담당 지점
                </FieldLabel>
                <input
                  className={`bm__form-input ${visibleError("branchSlug") ? "bm__form-input--error" : ""}`}
                  type="text"
                  value={
                    selectedBranch?.name ??
                    (selectedMuni
                      ? `${selectedMuni.replace(/시$/, "")}점`
                      : selectedProvince ?? "")
                  }
                  readOnly
                  data-component={getFieldComponent("branch", "input")}
                />
              </div>

              <div
                className="bm__form-group"
                data-component={getFieldComponent("mother-name")}
              >
                <FieldLabel
                  required
                  error={visibleError("motherName")}
                  data-component={getFieldComponent("mother-name")}
                >
                  산모님 성함
                </FieldLabel>
                <input
                  className={`bm__form-input ${visibleError("motherName") ? "bm__form-input--error" : ""}`}
                  type="text"
                  placeholder="성함을 입력해 주세요"
                  value={form.motherName}
                  onChange={(event) =>
                    updateField("motherName", event.target.value)
                  }
                  onBlur={() => markTouched("motherName")}
                  data-component={getFieldComponent("mother-name", "input")}
                />
              </div>

              <div
                className="bm__form-group"
                data-component={getFieldComponent("phone")}
              >
                <FieldLabel
                  required
                  error={
                    form.phone.trim()
                      ? fieldErrors.phone
                      : visibleError("phone")
                  }
                  data-component={getFieldComponent("phone")}
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
                  data-component={getFieldComponent("phone", "input")}
                />
              </div>

              <div
                className="bm__form-group"
                data-component={getFieldComponent("address")}
              >
                <FieldLabel
                  required
                  error={visibleError("address")}
                  data-component={getFieldComponent("address")}
                >
                  주소
                </FieldLabel>
                <input
                  className={`bm__form-input ${visibleError("address") ? "bm__form-input--error" : ""}`}
                  type="text"
                  placeholder="00구 00동 까지"
                  value={form.address}
                  onChange={(event) =>
                    updateField("address", event.target.value)
                  }
                  onBlur={() => markTouched("address")}
                  data-component={getFieldComponent("address", "input")}
                />
              </div>

              <div
                className="bm__form-group"
                data-component={getFieldComponent("due-date")}
              >
                <FieldLabel
                  required
                  error={visibleError("dueDate")}
                  data-component={getFieldComponent("due-date")}
                >
                  출산 예정일
                </FieldLabel>
                <input
                  className={`bm__form-input ${visibleError("dueDate") ? "bm__form-input--error" : ""}`}
                  type="date"
                  value={form.dueDate}
                  onChange={(event) =>
                    updateField("dueDate", event.target.value)
                  }
                  onBlur={() => markTouched("dueDate")}
                  data-component={getFieldComponent("due-date", "input")}
                />
              </div>

              <div
                className="bm__form-group"
                data-component={getFieldComponent("birth-experience")}
              >
                <FieldLabel
                  required
                  error={visibleError("birthExperience")}
                  data-component={getFieldComponent("birth-experience")}
                >
                  출산 경험
                </FieldLabel>
                <div
                  className="bm__radio-group"
                  data-component={getFieldComponent("birth-experience", "options")}
                >
                  <RadioPill
                    name="birthExp"
                    value="초산"
                    checked={form.birthExperience === "초산"}
                    onChange={(event) => {
                      updateField("birthExperience", event.target.value);
                      markTouched("birthExperience");
                    }}
                    data-component={getFieldComponent("birth-experience", "option-first")}
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
                    data-component={getFieldComponent("birth-experience", "option-repeat")}
                  >
                    경산
                  </RadioPill>
                </div>
              </div>

              <div
                className="bm__form-group"
                data-component={getFieldComponent("voucher-type")}
              >
                <FieldLabel data-component={getFieldComponent("voucher-type")}>
                  정부지원 바우처 유형
                </FieldLabel>
                <input
                  className="bm__form-input"
                  type="text"
                  placeholder="A통합-0형 (없으면 무기재)"
                  value={form.voucherType}
                  onChange={(event) =>
                    updateField("voucherType", event.target.value)
                  }
                  data-component={getFieldComponent("voucher-type", "input")}
                />
              </div>

              <div
                className="bm__form-group"
                data-component={getFieldComponent("preferred-caregiver-name")}
              >
                <FieldLabel
                  data-component={getFieldComponent("preferred-caregiver-name")}
                >
                  원하시는 관리사님 성함
                </FieldLabel>
                <input
                  className="bm__form-input"
                  type="text"
                  placeholder="없으면 무기재"
                  value={form.preferredCaregiverName}
                  onChange={(event) =>
                    updateField(
                      "preferredCaregiverName",
                      event.target.value
                    )
                  }
                  data-component={getFieldComponent("preferred-caregiver-name", "input")}
                />
              </div>

              <div
                className="bm__form-group"
                data-component={getFieldComponent("referral-source")}
              >
                <FieldLabel
                  required
                  error={visibleError("referralSource")}
                  data-component={getFieldComponent("referral-source")}
                >
                  아가잼잼을 어떻게 알게 되셨나요?
                </FieldLabel>
                <select
                  className={`bm__form-select ${visibleError("referralSource") ? "bm__form-input--error" : ""}`}
                  value={form.referralSource}
                  onChange={(event) =>
                    updateField("referralSource", event.target.value)
                  }
                  onBlur={() => markTouched("referralSource")}
                  data-component={getFieldComponent("referral-source", "select")}
                >
                  <option
                    value=""
                    disabled
                    data-component={getFieldComponent("referral-source", "option-placeholder")}
                  >
                    항목을 선택해 주세요
                  </option>
                  <option
                    value="시군구청"
                    data-component={getFieldComponent("referral-source", "option-government-office")}
                  >
                    시·군·구청 또는 보건소
                  </option>
                  <option
                    value="지인소개"
                    data-component={getFieldComponent("referral-source", "option-referral")}
                  >
                    친척 또는 지인 소개
                  </option>
                  <option
                    value="블로그"
                    data-component={getFieldComponent("referral-source", "option-blog")}
                  >
                    블로그
                  </option>
                  <option
                    value="카페"
                    data-component={getFieldComponent("referral-source", "option-cafe")}
                  >
                    네이버 카페
                  </option>
                  <option
                    value="검색"
                    data-component={getFieldComponent("referral-source", "option-search")}
                  >
                    네이버 검색
                  </option>
                  <option
                    value="타기관"
                    data-component={getFieldComponent("referral-source", "option-other-agency")}
                  >
                    타기관 소개
                  </option>
                </select>
              </div>

              <label
                className="bm__privacy"
                data-component={getComponent("privacy")}
              >
                <input
                  type="checkbox"
                  checked={form.privacyAccepted}
                  onChange={(event) =>
                    updateField("privacyAccepted", event.target.checked)
                  }
                  data-component={getComponent("privacy-checkbox")}
                />
                <span data-component={getComponent("privacy-copy")}>
                  상담 안내를 위한 개인정보 수집 및 이용에 동의합니다.
                  <InlineFieldError
                    message={visibleError("privacyAccepted")}
                    data-component={getComponent("privacy-error")}
                  />
                </span>
              </label>

              {submitError && (
                <p
                  className="bm__form-message bm__form-message--error"
                  data-component={getComponent("submit-error")}
                >
                  {submitError}
                </p>
              )}
              <div
                className="bm__form-submit-row"
                data-component={getComponent("submit-row")}
              >
                <button
                  className="bm__form-submit"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  data-component={getComponent("submit-button")}
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
