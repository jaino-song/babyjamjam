import Link from "next/link";

export default function NotFound() {
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
        페이지를 찾을 수 없습니다
      </h1>
      <p style={{ marginBottom: "1.5rem", lineHeight: 1.6 }}>
        주소를 다시 확인해 주세요.
      </p>
      <Link
        href="/"
        style={{
          display: "inline-block",
          padding: "0.625rem 1.25rem",
          fontSize: "0.9375rem",
          fontWeight: 600,
          color: "#fff",
          backgroundColor: "#1a1a1a",
          borderRadius: "9999px",
          textDecoration: "none",
        }}
      >
        홈으로
      </Link>
    </main>
  );
}
