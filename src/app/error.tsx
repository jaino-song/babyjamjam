"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <main
      style={{
        padding: "2rem",
        fontFamily: "system-ui, -apple-system, sans-serif",
        maxWidth: "32rem",
        margin: "4rem auto",
        color: "#1a1a1a",
      }}
    >
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
        페이지를 표시할 수 없습니다
      </h1>
      <p style={{ marginBottom: "1.5rem", lineHeight: 1.6 }}>
        일시적인 문제일 수 있어요. 다시 시도해 주세요.
      </p>
      {error.digest && (
        <p style={{ marginBottom: "1.5rem", fontSize: "0.875rem", color: "#666" }}>
          오류 코드: <code>{error.digest}</code>
        </p>
      )}
      <button
        type="button"
        onClick={reset}
        style={{
          padding: "0.625rem 1.25rem",
          fontSize: "0.9375rem",
          fontWeight: 600,
          color: "#fff",
          backgroundColor: "#1a1a1a",
          border: "none",
          borderRadius: "9999px",
          cursor: "pointer",
        }}
      >
        다시 시도
      </button>
    </main>
  );
}
