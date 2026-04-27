"use client";

import { type CSSProperties, useState } from "react";

import {
  Building2,
  CalendarCheck2,
  MessageSquareMore,
  UserCheck,
  type LucideIcon,
} from "lucide-react";

import { KakaoChatPhone } from "@/components/kakao-chat-prototype";
import { DualColorHeading } from "@/components/molecules/dual-color-heading";
import { cn } from "@/lib/utils";

const SERVICE_DETAIL_ITEMS = [
  {
    icon: UserCheck,
    title: "전담마크",
    labelLines: ["전담마크"],
    description:
      "한 명의 담당자가 첫 상담부터 사후처리까지 전담해, 작은 내용 하나까지 빠짐없이 챙깁니다.",
  },
  {
    icon: CalendarCheck2,
    title: "임신 기간 전체 관리",
    labelLines: ["임신 기간", "전체 관리"],
    description:
      "출산 전부터 필요한 정보를 안내하고 산모님의 상황을 세심히 살펴, 서비스 종료 후까지 꼼꼼히 챙깁니다.",
  },
  {
    icon: Building2,
    title: "기업형 운영 관리",
    labelLines: ["기업형", "운영 관리"],
    description:
      "주먹구구식 운영이 아닌, 체계적인 운영 기준으로 높은 서비스 품질을 안정적으로 유지합니다.",
  },
  {
    icon: MessageSquareMore,
    title: "실시간 고객 피드백 응답형",
    labelLines: ["실시간 고객", "피드백 응답형"],
    description:
      "서비스를 이용하시는 동안 불편함이 없으시도록, 서비스 시작 후엔 산모님의 피드백을 실시간으로 확인하고 반영합니다.",
  },
] satisfies Array<{ icon: LucideIcon; title: string; labelLines: string[]; description: string }>;

interface ServiceDetailSectionProps {
  className?: string;
}

export function DesktopServiceDetailSection({ className }: ServiceDetailSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = SERVICE_DETAIL_ITEMS[activeIndex];
  const canGoPrevious = activeIndex > 0;
  const canGoNext = activeIndex < SERVICE_DETAIL_ITEMS.length - 1;

  const selectPrevious = () => {
    setActiveIndex((currentIndex) => Math.max(0, currentIndex - 1));
  };

  const selectNext = () => {
    setActiveIndex((currentIndex) =>
      Math.min(SERVICE_DETAIL_ITEMS.length - 1, currentIndex + 1),
    );
  };

  return (
    <section
      className={cn("w-full rounded-[36px] py-12", className)}
      data-component={"organism-service-detail-section"}
    >
      <div
        className="grid grid-cols-[minmax(0,1fr)_360px] items-center gap-12"
        data-component={"organism-service-detail-grid"}
      >
        <div
          className="flex flex-col items-start gap-8"
          data-component={"organism-service-detail-content"}
        >
          <div className="flex max-w-[760px] flex-col items-start gap-5">
            <DualColorHeading
              mutedText="방치되는 공장형?"
              primaryText="아가잼잼은 맞춤형 운영 시스템"
              align="left"
            />
            <p
              className="big-p max-w-[720px]"
              data-component={"organism-service-detail-description"}
            >
              아가잼잼은 서비스 시작 전 준비부터 진행 중 실시간 고객 응대, 서비스 종료 후 환급
              지원까지 각 산모님의 상황에 맞춰 관리합니다. 방치되는 공장형이 아닌, 필요한
              서비스가 정확히 제공되도록 운영합니다.
            </p>
          </div>

          <div
            className="service-tabs"
            data-component={"organism-service-detail-tabs"}
            style={
              {
                ["--service-tab-count" as string]: SERVICE_DETAIL_ITEMS.length,
                ["--service-tab-index" as string]: activeIndex,
              } as CSSProperties
            }
          >
            <div className="tabnav-wrapper" data-gallery-id="service-detail-gallery">
              <div className="tabnav tabnav-pill" data-nav-type="pill">
                <div className="tabnav-platter">
                  <div className="tabnav-mask">
                    <ul className="tabnav-items" role="tablist" aria-label="아가잼잼 운영 강점">
                      {SERVICE_DETAIL_ITEMS.map((item, itemIndex) => {
                        const Icon = item.icon;
                        const isActive = itemIndex === activeIndex;

                        return (
                          <li
                            key={item.title}
                            className={cn(
                              "tabnav-item",
                              isActive && "tabnav-item-active",
                              itemIndex === 0 && "tabnav-item-first",
                              itemIndex === SERVICE_DETAIL_ITEMS.length - 1 && "tabnav-item-last",
                            )}
                            role="presentation"
                            data-gallery-index={itemIndex}
                          >
                            <button
                              type="button"
                              role="tab"
                              tabIndex={isActive ? 0 : -1}
                              aria-selected={isActive}
                              aria-controls={`service-detail-panel-${itemIndex}`}
                              id={`service-detail-tab-${itemIndex}`}
                              className="tabnav-link service-tabs__button"
                              onClick={() => setActiveIndex(itemIndex)}
                            >
                              <span className="tabnav-icon service-tabs__icon" aria-hidden="true">
                                <Icon size={25} strokeWidth={1.65} />
                              </span>
                              <span className="tabnav-label service-tabs__label">
                                {item.labelLines.map((line) => (
                                  <span key={line}>{line}</span>
                                ))}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="tabnav-indicator" aria-hidden="true" />
                  <div className="tabnav-paddles" aria-hidden="false">
                    <button
                      type="button"
                      className="tabnav-paddle tabnav-paddle-left"
                      aria-label="이전 운영 강점"
                      disabled={!canGoPrevious}
                      onClick={selectPrevious}
                    >
                      <svg width="7px" height="12px" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <g transform="translate(-23.5, -32)">
                          <g transform="translate(6, 16)">
                            <path fill="currentColor" d="M22.6745939,27.6865883 L17.8045148,22.7298827 C17.3970998,22.314824 17.3984999,21.6470593 17.808715,21.234824 L22.7088952,16.3091774 C23.1184103,15.8962362 23.7848348,15.8969421 24.1936498,16.311295 C24.6031649,16.7256479 24.6017648,17.3962361 24.1915498,17.8084714 L20.0326968,21.9887063 L24.1656488,26.1957648 C24.5737638,26.6115295 24.5716637,27.2814118 24.1593486,27.6929412 C23.954941,27.8976471 23.6875312,28 23.4201214,28 C23.1499114,28 22.8797015,27.8955294 22.6745939,27.6865883 Z" />
                          </g>
                        </g>
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="tabnav-paddle tabnav-paddle-right"
                      aria-label="다음 운영 강점"
                      disabled={!canGoNext}
                      onClick={selectNext}
                    >
                      <svg width="7px" height="12px" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <g transform="translate(-41.5, -32)">
                          <g transform="translate(22, 16)">
                            <path fill="currentColor" d="M20.5798786,28 C20.3124688,28 20.045059,27.8976471 19.8406514,27.6929412 C19.4283363,27.2814118 19.4262362,26.6115295 19.8343512,26.1957648 L23.9673032,21.9887063 L19.8084502,17.8084714 C19.3982352,17.3962361 19.3968351,16.7256479 19.8063502,16.311295 C20.2151652,15.8969421 20.8815897,15.8962362 21.2911048,16.3091774 L26.191285,21.234824 C26.6015001,21.6470593 26.6029002,22.314824 26.1954852,22.7298827 L21.3254061,27.6865883 C21.1202985,27.8955294 20.8500886,28 20.5798786,28" />
                          </g>
                        </g>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="service-tabs__caption"
            role="tabpanel"
            id={`service-detail-panel-${activeIndex}`}
            aria-labelledby={`service-detail-tab-${activeIndex}`}
            data-component={"organism-service-detail-caption"}
          >
            <div key={activeItem.title} className="service-tabs__caption-inner">
              <p className="h5 service-tabs__caption-text">{activeItem.description}</p>
            </div>
          </div>
        </div>

        <div
          className="flex items-center justify-center"
          data-component={"organism-service-detail-preview"}
        >
          <KakaoChatPhone data-component="desktop-home-service-detail-kakao-chat-phone" />
        </div>
      </div>
    </section>
  );
}
