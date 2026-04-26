"use client";

import { useState, useCallback } from "react";

import { PillCta } from "@/components/ui/circle-cta";

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
      <PillCta onClick={() => setOpen(true)}>상담신청</PillCta>
      <DesktopBookingModal open={open} onClose={handleClose} />
    </>
  );
}
