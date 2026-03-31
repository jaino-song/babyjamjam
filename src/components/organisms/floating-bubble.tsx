"use client";

interface FloatingBubbleProps {
  distinctCount: number;
}

export function FloatingBubble({ distinctCount }: FloatingBubbleProps) {
  const handleScrollDown = () => {
    window.scrollBy({ top: window.innerHeight * 0.6, behavior: "smooth" });
  };

  return (
    <div className="floating-bubble" data-component="organism-floating-bubble">
      {/* Scroll indicator */}
      <button
        type="button"
        className="floating-bubble__btn"
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
      <div className="floating-bubble__cart-wrapper">
        <button
          type="button"
          className="floating-bubble__btn"
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
          <span className="floating-bubble__badge">{distinctCount}</span>
        )}
      </div>
    </div>
  );
}
