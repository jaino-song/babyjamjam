import MobileHeroCarousel from "@/components/mobile/sections/hero-carousel";
import { MobileScrollExpandImage } from "@/components/mobile/sections/scroll-expand-image";
import { MobileServiceDetailSection } from "@/components/mobile/sections/service-detail-section";
import { calendarMockups } from "@/components/app-detail-calendar-mockups";
import LogoCarousel from "@/components/LogoCarousel";
import { Footer } from "@/components/organisms/footer";
import { MoreSection } from "@/components/organisms/more-section";
import { ProcessSection } from "@/components/organisms/process-section";

export default function MobileHomePage() {
  const appDetailSteps = [
    "임신 주차마다 도움이 되는 정보를 확인하고, 서비스 신청에 필요한 절차도 미리 안내받으실 수 있어요.",
    "서비스 시작 전에는 배정 예정인 관리사님의 프로필을 확인하고, 미리 전하고 싶은 요청사항도 남기실 수 있어요.",
    "예약금 입금부터 본인부담금 결제, 서비스 계약서 작성까지 필요한 절차를 앱에서 간편하게 진행하실 수 있어요.",
    "서비스 이용 중 불편하거나 요청하실 내용이 있을 때도 앱에서 바로 접수하실 수 있어요.",
  ];

  return (
    <>
      <main className="flex w-full flex-col items-center gap-[var(--bjj-section-gap)]">
        <section className="flex w-full flex-col items-center gap-10">
          <MobileHeroCarousel
            headlineLines={["엄마의 설레는 첫 만남.", "아기의 완벽한 첫 걸음."]}
          />
        </section>
        <MobileServiceDetailSection />

        <MobileScrollExpandImage
          src="/images/hero-image-1a35f6.png"
          alt="아가잼잼 배너"
          overlayText="검증 됐으니까. 믿을 수 있으니까."
        />

        <LogoCarousel />

        <section className="flex h-auto min-h-[588px] w-full flex-col items-center justify-between gap-8">
          <div className="flex w-full flex-[7_1_0] flex-col items-start gap-6 pb-[52px]">
            <div className="flex w-full flex-col items-start gap-6">
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
            <div className="flex w-full flex-col items-start">
              {["01", "02", "03", "04"].map((number, index) => (
                <div
                  key={number}
                  className="flex w-full items-center gap-5 border-t border-bjj-divider py-3 pr-[52px]"
                >
                  <span className="shrink-0 font-body text-[16px] font-medium leading-[1.5] text-bjj-text-paragraph">
                    {number}
                  </span>
                  <span className="font-heading text-[16px] font-bold leading-[1.45] tracking-[-0.015em] text-bjj-text-paragraph">
                    {appDetailSteps[index]}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                className="inline-flex h-10 w-[164px] items-center justify-center rounded-[640px] border-none bg-bjj-primary px-5 font-heading text-[13px] font-extrabold leading-[1.4] tracking-[-0.025em] text-bjj-primary-light no-underline disabled:pointer-events-none disabled:cursor-default disabled:opacity-45"
                disabled
              >
                출시 예정
              </button>
              <p className="text-xs text-gray-400">*출시 전까지는 유선으로 서비스 제공</p>
            </div>
          </div>
          <div className="flex w-full items-center justify-center">
            <div className="relative aspect-[1350/2760] w-full max-w-[312px] drop-shadow-[0_28px_56px_rgba(2,22,56,0.18)]">
              <div className="absolute left-1/2 top-[0.85%] h-[calc(100%-16px)] w-[calc(100%-26px)] -translate-x-1/2 translate-y-[5px] overflow-hidden rounded-[36px] bg-[#eef2f6]">
                <iframe
                  srcDoc={calendarMockups[0].html}
                  title="아가잼잼 앱 캘린더 목업"
                  className="block h-full w-full border-0 bg-[#eef2f6]"
                  scrolling="no"
                />
              </div>
              <img
                className="pointer-events-none absolute inset-0 h-full w-full object-contain"
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
