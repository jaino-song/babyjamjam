"use client";

import { useState, useCallback } from "react";

import { PillCta } from "@/components/ui/circle-cta";
import { capturePostHogEvent } from "@/lib/posthog-client";

import { DesktopBookingModal } from "./booking-modal";

interface DesktopBookingButtonProps {
  onModalClose?: () => void;
}

export function DesktopBookingButton({
  onModalClose,
}: DesktopBookingButtonProps = {}) {
  const [open, setOpen] = useState(false);
  const handleClose = useCallback(() => {
    setOpen(false);
    onModalClose?.();
  }, [onModalClose]);

  return (
    <>
      <PillCta
        data-component="desktop_chrome_booking-button_trigger"
        onClick={() => {
          capturePostHogEvent("consultation_modal_opened", { source: "desktop" });
          setOpen(true);
        }}
      >
        상담 신청
      </PillCta>
      <DesktopBookingModal
        open={open}
        onClose={handleClose}
        data-component="desktop_chrome_booking-modal"
      />
    </>
  );
}
