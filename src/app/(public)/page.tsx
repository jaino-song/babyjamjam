import HeroCarousel from "@/components/hero-carousel";
import LogoCarousel from "@/components/LogoCarousel";
import { ScrollExpandImage } from "@/components/organisms/scroll-expand-image";
import { calendarMockups } from "@/components/app-detail-calendar-mockups";
import { ProcessSection } from "@/components/organisms/process-section";
import { MoreSection } from "@/components/organisms/more-section";
import { Footer } from "@/components/organisms/footer";
import { ServiceDetailSection } from "@/components/organisms/service-detail-section";

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
          <HeroCarousel
            headlineLines={["엄마의 설레는 첫 만남.", "아기의 완벽한 첫 걸음."]}
          />
          <h1
            className="h1 hidden w-full whitespace-pre-line text-bjj-primary mobile:block"
            data-component="desktop-home-hero-headline"
          >
            엄마의 설레는 첫 만남.<br />아기의 완벽한 첫 걸음.
          </h1>
        </section>
        <ServiceDetailSection />

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
                <p className="big-p">
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
