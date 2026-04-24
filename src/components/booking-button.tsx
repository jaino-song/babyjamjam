"use client";

import { useState, useCallback } from "react";
import { PillCta } from "./ui/circle-cta";
import { BookingModal } from "./booking-modal";

interface BookingButtonProps {
  onModalClose?: () => void;
}

export function BookingButton({ onModalClose }: BookingButtonProps = {}) {
  const [open, setOpen] = useState(false);
  const handleClose = useCallback(() => {
    setOpen(false);
    onModalClose?.();
  }, [onModalClose]);

  return (
    <>
      <PillCta onClick={() => setOpen(true)}>상담신청</PillCta>
      <BookingModal open={open} onClose={handleClose} />
    </>
  );
}
