"use client";

import { useState, useCallback } from "react";

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
      <PillCta onClick={() => setOpen(true)}>상담신청</PillCta>
      <MobileBookingModal open={open} onClose={handleClose} />
    </>
  );
}
