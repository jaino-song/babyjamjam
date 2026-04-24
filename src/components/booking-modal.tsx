"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { RadioPill } from "./ui/radio-pill";
import {
  KoreaRegionMap,
  type KoreaRegionMapHandle,
  type BreadcrumbPart,
} from "./korea-region-map";

const AVAILABLE_REGIONS = new Set(["인천", "경기도", "경북"]);

type ModalView = "map" | "form" | "success";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  /** If provided, skip map and go directly to form with this region pre-selected */
  initialRegion?: string | null;
  /** District/구 within the region (e.g. "강남구") */
  initialDistrict?: string | null;
}

export function BookingModal({ open, onClose, initialRegion, initialDistrict }: BookingModalProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
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
    setView("success");
    setShowBack(false);
    setBreadcrumb([]);
  }, [formValid]);

  if (!open || !mounted) return null;

  const headerTitle = view === "map"
    ? "지역을 선택해 주세요"
    : view === "form"
      ? "상담 신청"
      : "상담 신청 완료";

  return createPortal(
    <div
      className="bm-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bm">
        {/* Header */}
        <div className="bm__header">
          <h2 className="bm__title">{headerTitle}</h2>
          <button className="bm__close" onClick={onClose} aria-label="닫기">
            ✕
          </button>
        </div>

        {/* Nav bar wrap: breadcrumb + back button */}
        {view !== "success" && (
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
        {view === "map" && (
          <div className="bm__footer">
            <div className="bm__footer-icon">!</div>
            <p>
              서비스 가능 지역만 선택할 수 있습니다. 추가 지역은 순차적으로
              오픈 예정이에요.
            </p>
          </div>
        )}

        {/* Form view */}
        {view === "form" && (
          <div className="bm__form-panel" ref={formRef}>
            <div className="bm__form-intro">
              <p className="big-p">
                산후도우미 서비스에 대해서 궁금한 점이 있으시다면,
                <br />
                부담없이 상담 받으세요. 바로 예약하지 않으셔도 괜찮아요!
              </p>
            </div>

            <div className="bm__form-fields">
              <div className="bm__form-group">
                <label className="bm__form-label">담당 지점</label>
                <input
                  className="bm__form-input"
                  type="text"
                  value={selectedMuni ? `${selectedMuni.replace(/시$/, "")}점` : selectedProvince ?? ""}
                  readOnly
                />
              </div>

              <div className="bm__form-group">
                <label className="bm__form-label">
                  산모님 성함 <span className="bm__required">*</span>
                </label>
                <input
                  className="bm__form-input"
                  type="text"
                  placeholder="성함을 입력해 주세요"
                  data-required
                  onInput={validateForm}
                />
              </div>

              <div className="bm__form-group">
                <label className="bm__form-label">
                  산모님 연락처 <span className="bm__required">*</span>
                </label>
                <input
                  className="bm__form-input"
                  type="tel"
                  placeholder="010-0000-0000"
                  data-required
                  onInput={validateForm}
                />
              </div>

              <div className="bm__form-group">
                <label className="bm__form-label">
                  주소 <span className="bm__required">*</span>
                </label>
                <input
                  className="bm__form-input"
                  type="text"
                  placeholder="00구 00동 까지"
                  data-required
                  onInput={validateForm}
                />
              </div>

              <div className="bm__form-group">
                <label className="bm__form-label">
                  출산 예정일 <span className="bm__required">*</span>
                </label>
                <input
                  className="bm__form-input"
                  type="date"
                  data-required
                  onInput={validateForm}
                  onChange={validateForm}
                />
              </div>

              <div className="bm__form-group">
                <label className="bm__form-label">
                  출산 경험 <span className="bm__required">*</span>
                </label>
                <div className="bm__radio-group">
                  <RadioPill name="birthExp" value="초산" onChange={validateForm}>
                    초산
                  </RadioPill>
                  <RadioPill name="birthExp" value="경산" onChange={validateForm}>
                    경산
                  </RadioPill>
                </div>
              </div>

              <div className="bm__form-group">
                <label className="bm__form-label">정부지원 바우처 유형</label>
                <input
                  className="bm__form-input"
                  type="text"
                  placeholder="A통합-0형 (없으면 무기재)"
                />
              </div>

              <div className="bm__form-group">
                <label className="bm__form-label">
                  원하시는 관리사님 성함
                </label>
                <input
                  className="bm__form-input"
                  type="text"
                  placeholder="없으면 무기재"
                />
              </div>

              <div className="bm__form-group">
                <label className="bm__form-label">
                  아가잼잼을 어떻게 알게 되셨나요?{" "}
                  <span className="bm__required">*</span>
                </label>
                <select
                  className="bm__form-select"
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

              <div className="bm__form-submit-row">
                <button
                  className="bm__form-submit"
                  disabled={!formValid}
                  onClick={handleSubmit}
                >
                  상담 신청하기
                </button>
              </div>
            </div>
          </div>
        )}
        {view === "success" && (
          <div className="bm__success-panel" role="status" aria-live="polite">
            <div className="bm__success-mark" aria-hidden="true">✓</div>
            <div className="bm__success-copy">
              <h3 className="bm__success-title">상담 신청이 완료되었습니다</h3>
              <p className="bm__success-description">
                빠른 시일 내에 담당 지점에서 연락드리겠습니다.
              </p>
            </div>
            <button className="bm__success-button" onClick={onClose}>
              확인
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
