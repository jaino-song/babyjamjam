"use client";

import { useState, useCallback } from "react";
import { BookingModal } from "./booking-modal";

export function BookingButton() {
  const [open, setOpen] = useState(false);
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        className="inline-flex justify-center items-center h-10 px-5 bg-bjj-primary rounded-pill font-heading font-[800] text-nav leading-[1.4] tracking-[-0.025em] text-bjj-primary-light no-underline border-none cursor-pointer"
        onClick={() => setOpen(true)}
      >
        예약하기
      </button>
      <BookingModal open={open} onClose={handleClose} />
    </>
  );
}
