import Link from "next/link";
import { NavBar } from "./nav-bar";
import { BookingButton } from "./booking-button";

const NAV_ITEMS = [
  { label: "산후도우미", href: "/postpartum-care" },
  { label: "서비스 비용", href: "/pricing" },
  { label: "지점 찾기", href: "/branches" },
  { label: "문의하기", href: "#" },
  { label: "고객센터", href: "#" },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "예약금 입금",
    description:
      "바람결에 숫자 같은 소리가 스르르 흘러가고, 둥근 조각들이 모여 사각의 그림자를 만든다.",
  },
  {
    num: "02",
    title: "계약서 작성",
    description:
      "바람결에 숫자 같은 소리가 스르르 흘러가고, 둥근 조각들이 모여 사각의 그림자를 만든다.",
  },
  {
    num: "03",
    title: "서비스 시작",
    description:
      "바람결에 숫자 같은 소리가 스르르 흘러가고, 둥근 조각들이 모여 사각의 그림자를 만든다.",
  },
  {
    num: "04",
    title: "마무리",
    description:
      "바람결에 숫자 같은 소리가 스르르 흘러가고, 둥근 조각들이 모여 사각의 그림자를 만든다.",
  },
];

const MORE_CARDS = [
  {
    title: "산후도우미 서비스",
    description:
      "회복과 돌봄의 균형을 맞춘 아가잼잼의 핵심 서비스를 한눈에 살펴보세요.",
    href: "/postpartum-care",
  },
  {
    title: "아가잼잼 공식 앱",
    description:
      "서비스 일정과 컨디션 기록, 케어 히스토리를 더 편하게 확인할 수 있어요.",
    href: "#",
  },
  {
    title: "예약하기",
    description:
      "출산 일정과 원하는 돌봄 범위를 먼저 정리해 두면 상담이 훨씬 빨라집니다.",
    href: "#",
  },
];

const FOOTER_LINKS = [
  "서비스 규정",
  "서비스 가격",
  "서비스 제공 항목",
  "전국 지점",
  "인재 영입",
  "산후도우미 관리사 교육",
  "고객센터",
];

type SmartLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
  "aria-current"?: "page";
};

function SmartLink({ href, className, children, ...rest }: SmartLinkProps) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  );
}

interface SiteNavigationProps {
  activeLabel?: string;
}

export function SiteNavigation({ activeLabel }: SiteNavigationProps) {
  return (
    <header className="navigation">
      <div className="navigation__inner">
        <Link href="/">
          <img src="/images/logo.png" alt="아가잼잼 로고" className="navigation__logo" />
        </Link>
        <NavBar items={NAV_ITEMS} activeLabel={activeLabel} />
        <BookingButton />
      </div>
    </header>
  );
}

export function SiteProcessSection() {
  return (
    <section className="process">
      <div className="process__header">
        <h2 className="process__title">산후도우미 서비스 진행 절차</h2>
      </div>
      <div className="process__steps">
        {PROCESS_STEPS.map((step) => (
          <div key={step.num} className="process__step">
            <span className="process__step-number">{step.num}</span>
            <div className="process__step-content">
              <h3 className="h4 process__step-title">{step.title}</h3>
              <p className="medium-p process__step-desc">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SiteMoreSection() {
  return (
    <section className="more">
      <h2 className="h2 more__title">아가잼잼이면 해결되니까.</h2>
      <div className="more__cards">
        {MORE_CARDS.map((card) => (
          <div key={card.title} className="link-card">
            <div className="link-card__content">
              <h3 className="h4 link-card__title">{card.title}</h3>
              <p className="medium-p link-card__description">{card.description}</p>
            </div>
            <SmartLink href={card.href} className="btn-primary">
              더 알아보기
            </SmartLink>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer__links">
        <nav className="footer__nav">
          {FOOTER_LINKS.map((link) => (
            <a key={link} href="#" className="footer__link link-text">
              {link}
            </a>
          ))}
        </nav>
      </div>
      <div className="footer__bottom">
        <Link href="/">
          <img src="/images/footer-logo.png" alt="아가잼잼" className="footer__logo" />
        </Link>
        <span className="caption-text">2025 All Rights Reserved By Jaino Company</span>
      </div>
    </footer>
  );
}
