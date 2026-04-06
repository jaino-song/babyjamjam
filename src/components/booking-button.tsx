"use client";

import { useState, useCallback } from "react";
import { BookingModal } from "./booking-modal";

export function BookingButton() {
  const [open, setOpen] = useState(false);
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <>
      <button className="short-button" onClick={() => setOpen(true)}>
        예약하기
      </button>
      <BookingModal open={open} onClose={handleClose} />
    </>
  );
}
