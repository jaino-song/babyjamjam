import { ArrowLeft, ArrowRight, Check, ExternalLink } from "lucide-react";
import Link from "next/link";

import {
  POSTPARTUM_GUIDES,
  type PostpartumGuide,
} from "@/data/guide-data";
import { cn } from "@/lib/utils";

interface GuidePageProps {
  variant: "mobile" | "desktop";
  "data-component": string;
}

export function GuideHub({
  variant,
  "data-component": dataComponent,
}: GuidePageProps) {
  const isMobile = variant === "mobile";

  return (
    <main
      className={cn(
        "flex w-full flex-col",
        isMobile ? "gap-10 py-10" : "gap-16 py-16",
      )}
      data-component={dataComponent}
    >
      <header
        className={cn(
          "flex flex-col rounded-[32px] bg-[#f7f4ef]",
          isMobile ? "gap-5 px-6 py-10" : "gap-7 px-12 py-16",
        )}
        data-slot="hero"
      >
        <p className="small-p font-bold text-bjj-primary" data-slot="eyebrow">
          아가잼잼 산후도우미 가이드
        </p>
        <h1
          className="h1 max-w-[900px] text-bjj-primary"
          data-slot="heading"
        >
          궁금한 질문부터,
          <br />
          필요한 답까지.
        </h1>
        <p
          className="big-p max-w-[820px] text-bjj-text-paragraph"
          data-slot="description"
        >
          산후도우미의 업무 범위, 비용과 정부지원, 신청 절차와 업체 선택
          기준을 질문별로 정리했습니다. 먼저 짧은 답을 확인하고 필요한
          부분만 자세히 읽어보세요.
        </p>
        <div
          className="flex flex-wrap gap-2"
          aria-label="가이드 작성 원칙"
          data-slot="principles"
        >
          {["공식 자료 확인", "적용 범위 표시", "2026년 7월 검토"].map(
            (principle) => (
              <span
                key={principle}
                className="small-p rounded-full border border-bjj-divider bg-white px-4 py-2 font-bold text-bjj-text-paragraph"
                data-slot="principle"
              >
                {principle}
              </span>
            ),
          )}
        </div>
      </header>

      <section
        aria-labelledby="guide-list-heading"
        className="flex flex-col gap-6"
        data-slot="guide-list"
      >
        <div
          className="flex items-end justify-between gap-4"
          data-slot="guide-list-header"
        >
          <div data-slot="guide-list-copy">
            <p
              className="small-p font-bold text-bjj-primary"
              data-slot="guide-list-eyebrow"
            >
              질문별 안내
            </p>
            <h2
              id="guide-list-heading"
              className="h2-left mt-2 text-bjj-text-dark"
              data-slot="guide-list-heading"
            >
              지금 가장 필요한 답을 골라보세요.
            </h2>
          </div>
          {!isMobile && (
            <span
              className="small-p text-bjj-text-paragraph"
              data-slot="guide-count"
            >
              {POSTPARTUM_GUIDES.length}개의 가이드
            </span>
          )}
        </div>

        <div
          className={cn(
            "grid",
            isMobile ? "grid-cols-1 gap-4" : "grid-cols-2 gap-5",
          )}
          data-slot="guide-grid"
        >
          {POSTPARTUM_GUIDES.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className={cn(
                "group flex min-h-[280px] flex-col justify-between rounded-[28px] border border-bjj-divider bg-white no-underline transition-all duration-200",
                "hover:-translate-y-1 hover:border-bjj-primary hover:shadow-[0_18px_45px_rgba(0,74,173,0.08)]",
                isMobile ? "p-6" : "p-8",
              )}
              data-slot={`guide-card-${guide.slug}`}
            >
              <div data-slot="guide-card-copy">
                <span
                  className="small-p font-bold text-bjj-primary"
                  data-slot="guide-card-category"
                >
                  {guide.category}
                </span>
                <h3
                  className="h4 mt-5 text-bjj-text-dark"
                  data-slot="guide-card-heading"
                >
                  {guide.title}
                </h3>
                <p
                  className="medium-p mt-4 text-bjj-text-paragraph"
                  data-slot="guide-card-description"
                >
                  {guide.description}
                </p>
              </div>
              <span
                className="mt-8 inline-flex items-center gap-2 font-bold text-bjj-primary"
                data-slot="guide-card-link"
              >
                답 확인하기
                <ArrowRight
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                  size={18}
                />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <aside
        className={cn(
          "flex rounded-[28px] border border-bjj-divider bg-white",
          isMobile
            ? "flex-col gap-3 p-6"
            : "items-center justify-between gap-8 p-8",
        )}
        data-slot="notice"
      >
        <div data-slot="notice-copy">
          <h2 className="h6 text-bjj-text-dark" data-slot="notice-heading">
            최종 자격과 가격은 관할 보건소에서 확인하세요.
          </h2>
          <p
            className="medium-p mt-2 text-bjj-text-paragraph"
            data-slot="notice-description"
          >
            정부지원 기준과 추가지원은 지역과 신청 시점에 따라 달라질 수
            있습니다.
          </p>
        </div>
        <a
          href="https://www.mohw.go.kr/menu.es?mid=a10711020100"
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-2 font-bold text-bjj-primary underline decoration-1 underline-offset-4"
          data-slot="notice-link"
        >
          보건복지부 안내
          <ExternalLink aria-hidden="true" size={16} />
        </a>
      </aside>
    </main>
  );
}

interface GuideArticleProps extends GuidePageProps {
  guide: PostpartumGuide;
}

export function GuideArticle({
  guide,
  variant,
  "data-component": dataComponent,
}: GuideArticleProps) {
  const isMobile = variant === "mobile";
  const relatedGuides = POSTPARTUM_GUIDES.filter(
    (candidate) => candidate.slug !== guide.slug,
  ).slice(0, 3);

  return (
    <main
      className={cn(
        "flex w-full flex-col",
        isMobile ? "gap-10 py-8" : "gap-16 py-14",
      )}
      data-component={dataComponent}
    >
      <article
        className={cn("flex flex-col", isMobile ? "gap-10" : "gap-14")}
        data-slot="article"
      >
        <header
          className={cn(
            "flex flex-col rounded-[32px] bg-[#f7f4ef]",
            isMobile ? "gap-5 px-6 py-9" : "gap-7 px-12 py-14",
          )}
          data-slot="article-header"
        >
          <Link
            href="/guides"
            className="small-p inline-flex w-fit items-center gap-2 font-bold text-bjj-primary no-underline"
            data-slot="back-link"
          >
            <ArrowLeft aria-hidden="true" size={16} />
            산후도우미 가이드
          </Link>
          <div
            className="flex flex-wrap items-center gap-x-3 gap-y-2"
            data-slot="article-meta"
          >
            <span
              className="small-p font-bold text-bjj-primary"
              data-slot="article-category"
            >
              {guide.category}
            </span>
            <span aria-hidden="true" className="text-bjj-divider">
              /
            </span>
            <span
              className="small-p text-bjj-text-paragraph"
              data-slot="reading-time"
            >
              {guide.readingTime}
            </span>
          </div>
          <h1
            className="h1 max-w-[980px] text-bjj-primary"
            data-slot="article-heading"
          >
            {guide.title}
          </h1>
          <p
            className="big-p max-w-[860px] text-bjj-text-paragraph"
            data-slot="article-description"
          >
            {guide.description}
          </p>
          <div
            className={cn(
              "rounded-[24px] border border-[rgba(0,74,173,0.16)] bg-white",
              isMobile ? "p-6" : "p-8",
            )}
            data-slot="direct-answer"
          >
            <span
              className="small-p font-bold text-bjj-primary"
              data-slot="direct-answer-label"
            >
              한눈에 답
            </span>
            <p
              className="big-p mt-3 font-medium text-bjj-text-dark"
              data-slot="direct-answer-copy"
            >
              {guide.directAnswer}
            </p>
          </div>
          <p
            className="small-p text-bjj-text-paragraph"
            data-slot="reviewed-at"
          >
            최근 검토{" "}
            <time dateTime={guide.reviewedAt}>{guide.reviewedAt}</time>
          </p>
        </header>

        <div
          className={cn(
            "grid items-start",
            isMobile
              ? "grid-cols-1 gap-10"
              : "grid-cols-[minmax(0,1fr)_280px] gap-14",
          )}
          data-slot="article-layout"
        >
          <div
            className="flex min-w-0 flex-col gap-12"
            data-slot="article-body"
          >
            {guide.sections.map((section, sectionIndex) => (
              <section
                key={section.heading}
                className="border-b border-bjj-divider pb-12 last:border-b-0 last:pb-0"
                data-slot={`section-${sectionIndex + 1}`}
              >
                <h2
                  className="h3 text-bjj-text-dark"
                  data-slot="section-heading"
                >
                  {section.heading}
                </h2>
                <div
                  className="mt-5 flex flex-col gap-4"
                  data-slot="section-copy"
                >
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="big-p text-bjj-text-paragraph"
                      data-slot="section-paragraph"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                {section.bullets && (
                  <ul
                    className="mt-6 flex flex-col gap-3"
                    data-slot="section-list"
                  >
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="medium-p flex items-start gap-3 text-bjj-text-paragraph"
                        data-slot="section-list-item"
                      >
                        <span
                          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eef5ff] text-bjj-primary"
                          aria-hidden="true"
                        >
                          <Check size={14} strokeWidth={2.5} />
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <aside
            className={cn(
              "flex flex-col gap-5 rounded-[24px] border border-bjj-divider bg-white p-6",
              !isMobile && "sticky top-6",
            )}
            data-slot="source-panel"
          >
            <div data-slot="source-panel-copy">
              <h2 className="h6 text-bjj-text-dark" data-slot="source-heading">
                확인한 공식 자료
              </h2>
              <p
                className="small-p mt-2 text-bjj-text-paragraph"
                data-slot="source-description"
              >
                제도와 지원금은 바뀔 수 있어 신청 시점에 다시 확인해야 합니다.
              </p>
            </div>
            <div
              className="flex flex-col gap-3"
              data-slot="source-links"
            >
              {guide.sources.map((source) => (
                <a
                  key={source.href}
                  href={source.href}
                  target="_blank"
                  rel="noreferrer"
                  className="small-p inline-flex items-start gap-2 font-bold text-bjj-primary underline decoration-1 underline-offset-4"
                  data-slot="source-link"
                >
                  <span>{source.label}</span>
                  <ExternalLink
                    aria-hidden="true"
                    className="mt-0.5 shrink-0"
                    size={14}
                  />
                </a>
              ))}
            </div>
          </aside>
        </div>
      </article>

      <section
        aria-labelledby="guide-faq-heading"
        className={cn(
          "flex flex-col rounded-[32px] bg-[#f7f4ef]",
          isMobile ? "gap-6 px-6 py-9" : "gap-8 px-10 py-12",
        )}
        data-slot="faq"
      >
        <div data-slot="faq-header">
          <p className="small-p font-bold text-bjj-primary" data-slot="faq-eyebrow">
            이어서 많이 묻는 질문
          </p>
          <h2
            id="guide-faq-heading"
            className="h2-left mt-2 text-bjj-text-dark"
            data-slot="faq-heading"
          >
            짧게 다시 확인해 보세요.
          </h2>
        </div>
        <div
          className={cn(
            "grid",
            isMobile ? "grid-cols-1 gap-3" : "grid-cols-2 gap-4",
          )}
          data-slot="faq-grid"
        >
          {guide.faqs.map((faq) => (
            <article
              key={faq.id}
              className="rounded-[24px] bg-white p-6"
              data-slot={`faq-${faq.id}`}
            >
              <h3 className="h6 text-bjj-text-dark" data-slot="faq-question">
                {faq.question}
              </h3>
              <p
                className="medium-p mt-3 text-bjj-text-paragraph"
                data-slot="faq-answer"
              >
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="related-guides-heading"
        className="flex flex-col gap-6"
        data-slot="related-guides"
      >
        <h2
          id="related-guides-heading"
          className="h3 text-bjj-text-dark"
          data-slot="related-guides-heading"
        >
          다음 질문도 확인해 보세요.
        </h2>
        <div
          className={cn(
            "grid",
            isMobile ? "grid-cols-1 gap-3" : "grid-cols-3 gap-4",
          )}
          data-slot="related-guides-grid"
        >
          {relatedGuides.map((relatedGuide) => (
            <Link
              key={relatedGuide.slug}
              href={`/guides/${relatedGuide.slug}`}
              className="group flex min-h-[170px] flex-col justify-between rounded-[24px] border border-bjj-divider bg-white p-6 no-underline transition-colors hover:border-bjj-primary"
              data-slot={`related-guide-${relatedGuide.slug}`}
            >
              <div data-slot="related-guide-copy">
                <span
                  className="small-p font-bold text-bjj-primary"
                  data-slot="related-guide-category"
                >
                  {relatedGuide.category}
                </span>
                <h3
                  className="h6 mt-3 text-bjj-text-dark"
                  data-slot="related-guide-heading"
                >
                  {relatedGuide.shortTitle}
                </h3>
              </div>
              <ArrowRight
                aria-hidden="true"
                className="mt-5 text-bjj-primary transition-transform group-hover:translate-x-1"
                size={18}
              />
            </Link>
          ))}
        </div>
      </section>

      <section
        className={cn(
          "flex rounded-[28px] bg-bjj-primary text-white",
          isMobile
            ? "flex-col items-start gap-5 p-7"
            : "items-center justify-between gap-8 p-10",
        )}
        data-slot="next-action"
      >
        <div data-slot="next-action-copy">
          <h2 className="h4 text-white" data-slot="next-action-heading">
            우리 가족에게 맞는 조건을 확인해 보세요.
          </h2>
          <p
            className="medium-p mt-2 text-white/80"
            data-slot="next-action-description"
          >
            예상 비용과 서비스 가능 지역을 확인한 뒤 상담을 준비할 수 있습니다.
          </p>
        </div>
        <div
          className="flex flex-wrap gap-3"
          data-slot="next-action-links"
        >
          <Link
            href="/pricing"
            className="rounded-full bg-white px-5 py-3 font-bold text-bjj-primary no-underline"
            data-slot="pricing-link"
          >
            비용 확인
          </Link>
          <Link
            href="/locations"
            className="rounded-full border border-white/50 px-5 py-3 font-bold text-white no-underline"
            data-slot="locations-link"
          >
            지역 확인
          </Link>
        </div>
      </section>
    </main>
  );
}
