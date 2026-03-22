import type { Metadata } from "next";
import localFont from "next/font/local";
import { DM_Sans, Roboto_Mono } from "next/font/google";
import "./globals.css";

const pretendard = localFont({
  src: "./fonts/Pretendard.woff2",
  variable: "--font-pretendard",
  display: "swap",
});

const paperlogy = localFont({
  src: [
    { path: "../../public/fonts/Paperlogy-5Medium.woff2", weight: "500" },
    { path: "../../public/fonts/Paperlogy-4Regular.woff2", weight: "400" },
  ],
  variable: "--font-paperlogy",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "아가잼잼 - 산후도우미 서비스",
  description:
    "엄마의 설레는 첫 만남. 아기의 완벽한 첫 걸음. 아가잼잼 산후도우미 서비스",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.variable} ${paperlogy.variable} ${dmSans.variable} ${robotoMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
