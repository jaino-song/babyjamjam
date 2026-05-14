"use client";

import { useState, useCallback } from "react";
import posthog from "posthog-js";

import { PillCta } from "@/components/ui/circle-cta";

import { MobileBookingModal } from "./booking-modal";

interface MobileBookingButtonProps {
  onModalClose?: () => void;
}

export function MobileBookingButton({
  onModalClose,
}: MobileBookingButtonProps = {}) {
  const [open, setOpen] = useState(false);
  const handleClose = useCallback(() => {
    setOpen(false);
    onModalClose?.();
  }, [onModalClose]);

  return (
    <>
      <PillCta
        data-component="mobile_chrome_booking-button_trigger"
        onClick={() => {
          posthog.capture("consultation_modal_opened", { source: "mobile" });
          setOpen(true);
        }}
      >
        상담 신청
      </PillCta>
      <MobileBookingModal
        open={open}
        onClose={handleClose}
        data-component="mobile_chrome_booking-modal"
      />
    </>
  );
}
