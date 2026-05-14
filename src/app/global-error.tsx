"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="ko">
      <body>
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
            일시적인 문제가 발생했습니다
          </h1>
          <p style={{ marginBottom: "1.5rem", lineHeight: 1.6 }}>
            잠시 후 다시 시도해 주세요. 문제가 계속되면 고객센터로 문의 부탁드립니다.
          </p>
          {error.digest && (
            <p style={{ marginBottom: "1.5rem", fontSize: "0.875rem", color: "#666" }}>
              오류 코드: <code>{error.digest}</code>
            </p>
          )}
          <button
            type="button"
            onClick={() => window.location.reload()}
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
      </body>
    </html>
  );
}
