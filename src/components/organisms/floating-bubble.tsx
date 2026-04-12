"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface FloatingBubbleProps {
  distinctCount: number;
}

export function FloatingBubble({ distinctCount }: FloatingBubbleProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const handleScrollDown = () => {
    window.scrollBy({ top: window.innerHeight * 0.6, behavior: "smooth" });
  };

  if (!mounted) return null;

  return createPortal(
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-3" data-component="organism-floating-bubble">
      {/* Scroll indicator */}
      <button
        type="button"
        className="w-14 h-14 rounded-full border-none bg-bjj-primary cursor-pointer flex items-center justify-center shadow-[0_4px_6px_-4px_rgba(0,0,0,0.1),0_10px_15px_rgba(0,0,0,0.1)] transition-[transform,box-shadow] duration-200 hover:scale-105 hover:shadow-[0_6px_12px_rgba(0,0,0,0.15)]"
        onClick={handleScrollDown}
        aria-label="아래로 스크롤"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6 9L12 15L18 9"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Cart button with badge */}
      <div className="relative">
        <button
          type="button"
          className="w-14 h-14 rounded-full border-none bg-bjj-primary cursor-pointer flex items-center justify-center shadow-[0_4px_6px_-4px_rgba(0,0,0,0.1),0_10px_15px_rgba(0,0,0,0.1)] transition-[transform,box-shadow] duration-200 hover:scale-105 hover:shadow-[0_6px_12px_rgba(0,0,0,0.15)]"
          aria-label={`선택한 서비스 ${distinctCount}개`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M3 6H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {distinctCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1.5 bg-red-500 rounded-full flex items-center justify-center font-heading font-bold text-xs leading-none text-white shadow-[0_2px_4px_-2px_rgba(0,0,0,0.1)]">{distinctCount}</span>
        )}
      </div>
    </div>,
    document.body
  );
}
