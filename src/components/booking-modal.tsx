"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { RadioPill } from "./ui/radio-pill";
import {
  KoreaRegionMap,
  type KoreaRegionMapHandle,
  type BreadcrumbPart,
} from "./korea-region-map";

const AVAILABLE_REGIONS = new Set(["서울", "인천", "경기도", "경북"]);

type ModalView = "map" | "form";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  /** If provided, skip map and go directly to form with this region pre-selected */
  initialRegion?: string | null;
  /** District/구 within the region (e.g. "강남구") */
  initialDistrict?: string | null;
}

export function BookingModal({ open, onClose, initialRegion, initialDistrict }: BookingModalProps) {
  const [view, setView] = useState<ModalView>("map");
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbPart[]>([
    { label: "대한민국" },
  ]);
  const [showBack, setShowBack] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedMuni, setSelectedMuni] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<KoreaRegionMapHandle>(null);

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      if (initialRegion) {
        // Skip map, go directly to form with pre-selected region + district
        setView("form");
        setSelectedProvince(initialRegion);
        setSelectedMuni(initialDistrict ?? null);
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
        mapRef.current?.reset();
      }
      setFormValid(false);
    }
  }, [open, initialRegion]);

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

  const validateForm = useCallback(() => {
    if (!formRef.current) return;
    const requiredInputs = formRef.current.querySelectorAll<
      HTMLInputElement | HTMLSelectElement
    >("[data-required]");
    const radioChecked = formRef.current.querySelector<HTMLInputElement>(
      'input[name="birthExp"]:checked'
    );
    let valid = !!radioChecked;
    requiredInputs.forEach((el) => {
      if (!el.value.trim()) valid = false;
    });
    setFormValid(valid);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!formValid) return;
    alert("상담 신청이 완료되었습니다!\n빠른 시일 내에 연락 드리겠습니다.");
    onClose();
  }, [formValid, onClose]);

  if (!open) return null;

  const headerTitle = view === "map" ? "지역을 선택해 주세요" : "상담 신청";

  return (
    <div
      className="fixed inset-0 bg-black/45 backdrop-blur-[4px] flex items-center justify-center z-[1000]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-bjj-bg rounded-3xl w-[780px] max-h-[90vh] overflow-hidden shadow-[0_32px_80px_rgba(0,36,87,0.18)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-6 shrink-0">
          <h2 className="font-heading text-[24px] font-extrabold text-bjj-text-headline leading-[1.2]">
            {headerTitle}
          </h2>
          <button
            className="w-9 h-9 border-none bg-[#f5f5f5] rounded-full text-[18px] cursor-pointer flex items-center justify-center text-[#666] transition-colors duration-200 hover:bg-[#e8e8e8]"
            onClick={onClose}
            aria-label="닫기"
          >
            ✕
          </button>
        </div>

        {/* Nav bar wrap: breadcrumb + back button */}
        <div className="flex flex-col gap-4 px-8 py-4 shrink-0 border-b border-bjj-divider relative z-[1]">
          <div className="flex items-center gap-1 font-heading text-[13px] font-semibold">
            {breadcrumb.map((part, i) => (
              <span key={i}>
                {i > 0 && <span className="text-[#ccc] mx-1">›</span>}
                {i === breadcrumb.length - 1 ? (
                  <span className="text-bjj-primary font-bold">{part.label}</span>
                ) : (
                  <span
                    className="text-[#999] cursor-pointer transition-colors duration-200 hover:text-bjj-primary"
                    onClick={part.action}
                  >
                    {part.label}
                  </span>
                )}
              </span>
            ))}
          </div>
          {showBack && (
            <button
              className="px-5 h-10 inline-flex items-center bg-bjj-bg border border-bjj-primary rounded-[32px] font-heading text-[15px] font-medium text-bjj-primary cursor-pointer transition-all duration-200 self-start hover:bg-bjj-primary hover:text-white"
              onClick={handleBack}
            >
              ← 이전
            </button>
          )}
        </div>

        {/* Map view */}
        <div
          className="flex-1 px-8 py-4 pb-6 flex items-center justify-center min-h-[460px]"
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
        {view === "map" && (
          <div className="px-8 py-4 flex items-center gap-2 bg-[#f9fafb] border-t border-bjj-divider shrink-0">
            <div className="w-5 h-5 bg-bjj-primary text-white rounded-full flex items-center justify-center font-heading text-[12px] font-extrabold shrink-0">
              !
            </div>
            <p className="font-body text-[13px] text-[#666] font-medium">
              서비스 가능 지역만 선택할 수 있습니다. 추가 지역은 순차적으로
              오픈 예정이에요.
            </p>
          </div>
        )}

        {/* Form view */}
        {view === "form" && (
          <div className="px-10 py-6 flex flex-col gap-4 overflow-y-auto max-h-[70vh]" ref={formRef}>
            <div>
              <p className="big-p text-bjj-text-paragraph">
                산후도우미 서비스에 대해서 궁금한 점이 있으시다면,
                <br />
                부담없이 상담 받으세요. 바로 예약하지 않으셔도 괜찮아요!
              </p>
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <label className="font-heading text-[16px] font-semibold text-bjj-text-dark">
                  담당 지점
                </label>
                <input
                  className="h-11 px-4 border-2 border-bjj-divider rounded-[32px] font-body text-[15px] font-medium text-bjj-text-headline transition-[border-color] duration-200 outline-none bg-bjj-surface-muted text-bjj-text-muted cursor-default pointer-events-none"
                  type="text"
                  value={selectedMuni ? `${selectedMuni.replace(/[구시군]$/, "")}점` : selectedProvince ?? ""}
                  readOnly
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-heading text-[16px] font-semibold text-bjj-text-dark">
                  산모님 성함 <span className="text-[#e74c3c] text-[14px]">*</span>
                </label>
                <input
                  className="h-11 px-4 border-2 border-bjj-divider rounded-[32px] font-body text-[15px] font-medium text-bjj-text-headline transition-[border-color] duration-200 outline-none bg-bjj-bg focus:border-bjj-primary placeholder:text-bjj-text-muted"
                  type="text"
                  placeholder="성함을 입력해 주세요"
                  data-required
                  onInput={validateForm}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-heading text-[16px] font-semibold text-bjj-text-dark">
                  산모님 연락처 <span className="text-[#e74c3c] text-[14px]">*</span>
                </label>
                <input
                  className="h-11 px-4 border-2 border-bjj-divider rounded-[32px] font-body text-[15px] font-medium text-bjj-text-headline transition-[border-color] duration-200 outline-none bg-bjj-bg focus:border-bjj-primary placeholder:text-bjj-text-muted"
                  type="tel"
                  placeholder="010-0000-0000"
                  data-required
                  onInput={validateForm}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-heading text-[16px] font-semibold text-bjj-text-dark">
                  주소 <span className="text-[#e74c3c] text-[14px]">*</span>
                </label>
                <input
                  className="h-11 px-4 border-2 border-bjj-divider rounded-[32px] font-body text-[15px] font-medium text-bjj-text-headline transition-[border-color] duration-200 outline-none bg-bjj-bg focus:border-bjj-primary placeholder:text-bjj-text-muted"
                  type="text"
                  placeholder="00구 00동 까지"
                  data-required
                  onInput={validateForm}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-heading text-[16px] font-semibold text-bjj-text-dark">
                  출산 예정일 <span className="text-[#e74c3c] text-[14px]">*</span>
                </label>
                <input
                  className="h-11 px-4 border-2 border-bjj-divider rounded-[32px] font-body text-[15px] font-medium text-bjj-text-headline transition-[border-color] duration-200 outline-none bg-bjj-bg focus:border-bjj-primary placeholder:text-bjj-text-muted"
                  type="date"
                  data-required
                  onInput={validateForm}
                  onChange={validateForm}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-heading text-[16px] font-semibold text-bjj-text-dark">
                  출산 경험 <span className="text-[#e74c3c] text-[14px]">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  <RadioPill name="birthExp" value="초산" onChange={validateForm}>
                    초산
                  </RadioPill>
                  <RadioPill name="birthExp" value="경산" onChange={validateForm}>
                    경산
                  </RadioPill>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-heading text-[16px] font-semibold text-bjj-text-dark">
                  정부지원 바우처 유형
                </label>
                <input
                  className="h-11 px-4 border-2 border-bjj-divider rounded-[32px] font-body text-[15px] font-medium text-bjj-text-headline transition-[border-color] duration-200 outline-none bg-bjj-bg focus:border-bjj-primary placeholder:text-bjj-text-muted"
                  type="text"
                  placeholder="A통합-0형 (없으면 무기재)"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-heading text-[16px] font-semibold text-bjj-text-dark">
                  원하시는 관리사님 성함
                </label>
                <input
                  className="h-11 px-4 border-2 border-bjj-divider rounded-[32px] font-body text-[15px] font-medium text-bjj-text-headline transition-[border-color] duration-200 outline-none bg-bjj-bg focus:border-bjj-primary placeholder:text-bjj-text-muted"
                  type="text"
                  placeholder="없으면 무기재"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-heading text-[16px] font-semibold text-bjj-text-dark">
                  아가잼잼을 어떻게 알게 되셨나요?{" "}
                  <span className="text-[#e74c3c] text-[14px]">*</span>
                </label>
                <select
                  className="h-11 px-4 border-2 border-bjj-divider rounded-[32px] font-body text-[15px] font-medium text-bjj-text-headline transition-[border-color] duration-200 outline-none bg-bjj-bg focus:border-bjj-primary appearance-none cursor-pointer bg-no-repeat bg-[right_16px_center] pr-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236b7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                  }}
                  defaultValue=""
                  data-required
                  onChange={validateForm}
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

              <div className="flex justify-end">
                <button
                  className="py-3.5 px-8 bg-bjj-primary text-white border-none rounded-[640px] font-heading font-extrabold text-[14px] cursor-pointer transition-opacity duration-200 hover:opacity-90 disabled:opacity-40 disabled:cursor-default"
                  disabled={!formValid}
                  onClick={handleSubmit}
                >
                  상담 신청하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
