import { Building2, CalendarCheck2, MessageSquareMore, UserCheck } from "lucide-react";

import HeroCarousel from "@/components/hero-carousel";
import LogoCarousel from "@/components/LogoCarousel";
import { ScrollExpandImage } from "@/components/organisms/scroll-expand-image";
import { KakaoChatPhone } from "@/components/kakao-chat-prototype";
import { calendarMockups } from "@/components/app-detail-calendar-mockups";
import { ProcessSection } from "@/components/organisms/process-section";
import { MoreSection } from "@/components/organisms/more-section";
import { Footer } from "@/components/organisms/footer";

const SERVICE_DETAIL_ITEMS = [
  {
    icon: UserCheck,
    title: "전담마크",
    description: "한 명의 담당자가 첫 상담부터 사후처리까지 전담해, 작은 내용 하나까지 빠짐없이 챙깁니다.",
  },
  {
    icon: CalendarCheck2,
    title: "임신 기간 전체 관리",
    description: "출산 전부터 필요한 정보를 안내하고 산모님의 상황을 세심히 살펴, 서비스 종료 후까지 꼼꼼히 챙깁니다.",
  },
  {
    icon: Building2,
    title: "기업형 운영 관리",
    description: "주먹구구식 운영이 아닌, 체계적인 운영 기준으로 높은 서비스 품질을 안정적으로 유지합니다.",
  },
  {
    icon: MessageSquareMore,
    title: "실시간 고객 피드백 응답형",
    description: "서비스를 이용하시는 동안 불편함이 없으시도록, 서비스 시작 후엔 산모님의 피드백을 실시간으로 확인하고 반영합니다.",
  },
];

export default function HomePage() {
  const appDetailSteps = [
    "임신 주차마다 도움이 되는 정보를 확인하고, 서비스 신청에 필요한 절차도 미리 안내받으실 수 있어요.",
    "서비스 시작 전에는 배정 예정인 관리사님의 프로필을 확인하고, 미리 전하고 싶은 요청사항도 남기실 수 있어요.",
    "예약금 입금부터 본인부담금 결제, 서비스 계약서 작성까지 필요한 절차를 앱에서 간편하게 진행하실 수 있어요.",
    "서비스 이용 중 불편하거나 요청하실 내용이 있을 때도 앱에서 바로 접수하실 수 있어요.",
  ];

  return (
    <>
      <main className="flex flex-col items-center w-full gap-[var(--bjj-section-gap)]">
        <section className="flex flex-col items-center w-full gap-16 max-mobile:gap-10">
          <HeroCarousel />
          <h1
            className="h1 whitespace-pre-line w-full"
            style={{ color: "var(--bjj-color-primary)" }}
          >
            엄마의 설레는 첫 만남.<br />아기의 완벽한 첫 걸음.
          </h1>
        </section>
        <section className="flex flex-row justify-between items-center w-full gap-12 max-mobile:flex-col">
          <div className="flex-[0_1_650px] min-w-[650px] flex flex-col items-start gap-8 max-mobile:flex-[unset] max-mobile:w-full max-mobile:min-w-0">
            <div className="flex flex-col items-start gap-8 w-full">
              <h2 className="h2-left whitespace-pre-line">
                <span style={{ color: "#848484" }}>방치되는 공장형?</span>
                <br />
                <span style={{ color: "var(--bjj-color-primary)" }}>
                  아가잼잼은 맞춤형 운영 시스템
                </span>
              </h2>
              <p className="max-w-none font-heading font-bold text-[22px] leading-[1.52] tracking-[-0.015em] text-bjj-text-paragraph">
                아가잼잼은 서비스 시작 전 준비부터 진행 중 실시간 고객 응대, 서비스 종료 후 환급
                지원까지 각 산모님의 상황에 맞춰 관리합니다. 방치되는 공장형이 아닌, 필요한
                서비스가 정확히 제공되도록 운영합니다.
              </p>
            </div>
            <div className="grid grid-cols-2 w-full gap-0 max-mobile:grid-cols-1">
              {SERVICE_DETAIL_ITEMS.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="flex flex-col gap-4 py-6 pr-3 border-t-2 border-bjj-divider">
                    <Icon className="w-4 h-4" aria-hidden="true" />
                    <div className="flex flex-col items-start w-full gap-3">
                      <span className="h7 text-bjj-text-headline">{item.title}</span>
                      <p className="medium-p">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex-[0_1_360px] flex justify-center items-center max-mobile:flex-[unset] max-mobile:w-full">
            <KakaoChatPhone />
          </div>
        </section>

        <ScrollExpandImage
          src="/images/hero-image-1a35f6.png"
          alt="아가잼잼 배너"
          overlayText="검증 됐으니까. 믿을 수 있으니까."
        />

        <LogoCarousel />

        <section className="flex justify-between items-center gap-12 w-full min-h-[588px] max-mobile:h-auto max-mobile:flex-col max-mobile:gap-8">
          <div className="flex flex-col items-start gap-6 pb-[52px] flex-[7_1_0] max-mobile:w-full">
            <div className="flex flex-col items-start gap-6 w-full">
              <h2 className="h2-left text-bjj-primary">
                아가잼잼 공식 앱은
                <br />
                상담부터 환급 신청까지 일사천리.
              </h2>
              <div className="text-bjj-text-paragraph">
                <p className="font-heading font-bold text-[22px] leading-[1.52] tracking-[-0.015em] text-bjj-text-paragraph">
                  아가잼잼의 서비스는 출산 전부터 시작돼요. 필요한 정보를 미리 안내해드리고,
                  복잡한 신청 절차도 앱에서 더 간편하게 진행하실 수 있어요.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start w-full">
              {["01", "02", "03", "04"].map((num, index) => (
                <div key={num} className="flex items-center w-full gap-5 py-3 pr-[52px] border-t border-bjj-divider">
                  <span className="font-body font-medium text-[16px] leading-[1.5] text-bjj-text-paragraph shrink-0">{num}</span>
                  <span className="font-heading font-bold text-[16px] leading-[1.45] tracking-[-0.015em] text-bjj-text-paragraph">{appDetailSteps[index]}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                className="inline-flex justify-center items-center h-10 px-5 w-[164px] bg-bjj-primary rounded-[640px] font-heading font-extrabold text-[13px] leading-[1.4] tracking-[-0.025em] text-bjj-primary-light no-underline border-none cursor-pointer disabled:opacity-45 disabled:cursor-default disabled:pointer-events-none"
                disabled
              >
                출시 예정
              </button>
              <p className="text-xs text-gray-400">*출시 전까지는 유선으로 서비스 제공</p>
            </div>
          </div>
          <div className="flex justify-center items-center flex-[3_1_0] max-mobile:static max-mobile:w-full">
            <div className="relative w-full max-w-[312px] aspect-[1350/2760] drop-shadow-[0_28px_56px_rgba(2,22,56,0.18)]">
              <div className="absolute top-[0.85%] left-1/2 w-[calc(100%-26px)] h-[calc(100%-16px)] -translate-x-1/2 translate-y-[5px] rounded-[36px] overflow-hidden bg-[#eef2f6]">
                <iframe
                  srcDoc={calendarMockups[0].html}
                  title="아가잼잼 앱 캘린더 목업"
                  className="block w-full h-full border-0 bg-[#eef2f6]"
                  scrolling="no"
                />
              </div>
              <img
                className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                src="/images/phone-mockup-294c7f.png"
                alt="아가잼잼 앱 목업"
              />
            </div>
          </div>
        </section>

        <ProcessSection />
        <MoreSection />
      </main>

      <Footer />
    </>
  );
}
