"use client";

import { useState, useCallback } from "react";
import { PillCta } from "./ui/circle-cta";
import { BookingModal } from "./booking-modal";

export function BookingButton() {
  const [open, setOpen] = useState(false);
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <>
      <PillCta onClick={() => setOpen(true)}>예약하기</PillCta>
      <BookingModal open={open} onClose={handleClose} />
    </>
  );
}
