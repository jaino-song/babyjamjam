"use client";

import { useState, useCallback } from "react";

import { PillCta } from "@/components/ui/circle-cta";

import { LegacyBookingModal } from "./booking-modal";

interface BookingButtonProps {
  onModalClose?: () => void;
}

export function LegacyBookingButton({ onModalClose }: BookingButtonProps = {}) {
  const [open, setOpen] = useState(false);
  const handleClose = useCallback(() => {
    setOpen(false);
    onModalClose?.();
  }, [onModalClose]);

  return (
    <>
      <PillCta onClick={() => setOpen(true)}>상담신청</PillCta>
      <LegacyBookingModal open={open} onClose={handleClose} />
    </>
  );
}
