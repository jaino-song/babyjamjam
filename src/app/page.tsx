import { Building2, CalendarCheck2, MessageSquareMore, UserCheck } from "lucide-react";

import HeroCarousel from "@/components/hero-carousel";
import LogoCarousel from "@/components/LogoCarousel";
import { ScrollExpandImage } from "@/components/organisms/scroll-expand-image";
import { KakaoChatPhone } from "@/components/kakao-chat-prototype";
import { calendarMockups } from "@/components/app-detail-calendar-mockups";
import {
  SiteFooter,
  SiteMoreSection,
  SiteNavigation,
  SiteProcessSection,
} from "@/components/site-chrome";

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
    <div className="page">
      <SiteNavigation />

      <main className="main">
        <section className="hero">
          <HeroCarousel />
          <h1 className="h1 hero__text" style={{ color: "var(--bjj-color-primary)" }}>
            엄마의 설레는 첫 만남.<br />아기의 완벽한 첫 걸음.
          </h1>
        </section>
        <section className="service-detail">
          <div className="service-detail__content">
            <div className="service-detail__header">
              <h2 className="h2-left service-detail__headline">
                <span style={{ color: "#848484" }}>방치되는 공장형?</span>
                <br />
                <span style={{ color: "var(--bjj-color-primary)" }}>
                  아가잼잼은 맞춤형 운영 시스템
                </span>
              </h2>
              <p className="big-p service-detail__description">
                아가잼잼은 서비스 시작 전 준비부터 진행 중 실시간 고객 응대, 서비스 종료 후 환급
                지원까지 각 산모님의 상황에 맞춰 관리합니다. 방치되는 공장형이 아닌, 필요한
                서비스가 정확히 제공되도록 운영합니다.
              </p>
            </div>
            <div className="service-detail__icons">
              {SERVICE_DETAIL_ITEMS.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="icon-lockup">
                    <Icon className="icon-lockup__icon" aria-hidden="true" />
                    <div className="icon-lockup__content">
                      <span className="h7 icon-lockup__title">{item.title}</span>
                      <p className="medium-p">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="service-detail__phone">
            <KakaoChatPhone />
          </div>
        </section>

        <ScrollExpandImage
          src="/images/hero-image-1a35f6.png"
          alt="아가잼잼 배너"
          overlayText="검증 됐으니까. 믿을 수 있으니까."
        />

        <LogoCarousel />

        <section className="app-detail">
          <div className="app-detail__content">
            <div className="app-detail__title-block">
              <h2 className="h2-left app-detail__hero-title">
                아가잼잼 공식 앱은
                <br />
                상담부터 환급 신청까지 일사천리.
              </h2>
              <div className="app-detail__subtitle">
                <p className="app-detail__body-copy">
                  아가잼잼의 서비스는 출산 전부터 시작돼요. 필요한 정보를 미리 안내해드리고,
                  복잡한 신청 절차도 앱에서 더 간편하게 진행하실 수 있어요.
                </p>
              </div>
            </div>
            <div className="app-detail__list">
              {["01", "02", "03", "04"].map((num, index) => (
                <div key={num} className="app-detail__list-item">
                  <span className="app-detail__step-number">{num}</span>
                  <span className="app-detail__step-desc">{appDetailSteps[index]}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <button type="button" className="btn-primary" disabled>
                출시 예정
              </button>
              <p className="text-xs text-gray-400">*출시 전까지는 유선으로 서비스 제공</p>
            </div>
          </div>
          <div className="app-detail__phone">
            <div className="app-detail__phone-shell">
              <div className="app-detail__phone-screen-area">
                <iframe
                  srcDoc={calendarMockups[0].html}
                  title="아가잼잼 앱 캘린더 목업"
                  className="app-detail__phone-screen"
                  scrolling="no"
                />
              </div>
              <img
                className="app-detail__phone-frame"
                src="/images/phone-mockup-294c7f.png"
                alt="아가잼잼 앱 목업"
              />
            </div>
          </div>
        </section>

        <SiteProcessSection />
        <SiteMoreSection />
      </main>

      <SiteFooter />
    </div>
  );
}
