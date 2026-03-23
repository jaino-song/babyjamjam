import LogoCarousel from '@/components/LogoCarousel';

export default function HomePage() {
  return (
    <div className="page">
      {/* NAVIGATION */}
      <header className="navigation">
        <div className="navigation__inner">
          <img src="/images/logo.png" alt="아가잼잼 로고" className="navigation__logo" />
          <nav className="nav-bar">
            <a href="#" className="nav-bar__item">산후도우미</a>
            <a href="#" className="nav-bar__item">비용계산기</a>
            <a href="#" className="nav-bar__item">지점 찾기</a>
            <a href="#" className="nav-bar__item">문의하기</a>
            <a href="#" className="nav-bar__item">고객센터</a>
          </nav>
          <a href="#" className="short-button">예약하기</a>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero__bg">
          <img src="/images/hero-bg-22ebe1.png" alt="Hero background" className="hero__bg-image" />
        </div>
        <h1 className="h1 hero__text" style={{ color: 'var(--bjj-color-primary)' }}>
          {'엄마의 설레는 첫 만남.\n아기의 완벽한 첫 걸음.'}
        </h1>
      </section>

      {/* MAIN */}
      <main className="main">
        {/* Service Detail */}
        <section className="service-detail">
          <div className="service-detail__header">
            <h2 className="h2-left service-detail__headline">
              <span style={{ color: '#848484' }}>방치되는 공장형?</span>
              <br />
              <span style={{ color: 'var(--bjj-color-primary)' }}>아가잼잼은 맞춤형 운영 시스템</span>
            </h2>
            <p className="big-p service-detail__description">
              바람결에 숫자 같은 소리가 스르르 흘러가고, 둥근 조각들이 모여 사각의 그림자를 만든다. 창가에 놓인 종이배는 길을 잃은 듯 천천히 고개를 돌리며, 고요한 박자에 맞춰 말 없는 문장을 접었다 폈다 한다. 어딘가에서는 반짝이는 점들이 서로를 지나치고, 또 다른 곳에서는 비슷한 모양의 단어들이 줄을 맞춰 서 있다.
            </p>
          </div>
          <div className="service-detail__icons">
            <div className="icon-lockup">
              <img src="/images/icon-cable.svg" alt="전담마크" className="icon-lockup__icon" />
              <div className="icon-lockup__content">
                <span className="h5 icon-lockup__title">전담마크</span>
                <p className="medium-p">바람결에 숫자 같은 소리가 스르르 흘러가고, 둥근 조각들이 모여 사각의 그림자를 만든다.</p>
              </div>
            </div>
            <div className="icon-lockup">
              <img src="/images/icon-earth.svg" alt="임신 기간 전체 관리" className="icon-lockup__icon" />
              <div className="icon-lockup__content">
                <span className="h5 icon-lockup__title">임신 기간 전체 관리</span>
                <p className="medium-p">바람결에 숫자 같은 소리가 스르르 흘러가고, 둥근 조각들이 모여 사각의 그림자를 만든다.</p>
              </div>
            </div>
            <div className="icon-lockup">
              <img src="/images/icon-account.svg" alt="기업형 운영 관리" className="icon-lockup__icon" />
              <div className="icon-lockup__content">
                <span className="h5 icon-lockup__title">기업형 운영 관리</span>
                <p className="medium-p">바람결에 숫자 같은 소리가 스르르 흘러가고, 둥근 조각들이 모여 사각의 그림자를 만든다.</p>
              </div>
            </div>
            <div className="icon-lockup">
              <img src="/images/icon-chart.svg" alt="고객 피드백 응답형" className="icon-lockup__icon" />
              <div className="icon-lockup__content">
                <span className="h5 icon-lockup__title">고객 피드백 응답형</span>
                <p className="medium-p">바람결에 숫자 같은 소리가 스르르 흘러가고, 둥근 조각들이 모여 사각의 그림자를 만든다.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Banner Image */}
        <section className="hero-image">
          <img src="/images/hero-image-1a35f6.png" alt="아가잼잼 배너" />
          <span className="h2 hero-image__text">검증 됐으니까. 믿을 수 있으니까.</span>
        </section>

        {/* App Detail */}
        <section className="app-detail">
          <div className="app-detail__content">
            <div className="app-detail__title-block">
              <h2 className="h2-left app-detail__title">
                아가잼잼의 케어는<br />출산 전부터 시작해요.
              </h2>
              <p className="h3 app-detail__subtitle" style={{ color: 'var(--bjj-color-text-paragraph)' }}>
                바람결에 숫자 같은 소리가 스르르 흘러가고, 둥근 조각들이 모여 사각의 그림자를 만든다.
              </p>
            </div>
            <div className="app-detail__list">
              {['01', '02', '03', '04'].map((num) => (
                <div key={num} className="app-detail__list-item">
                  <span className="app-detail__step-number">{num}</span>
                  <span className="app-detail__step-desc">
                    바람결에 숫자 같은 소리가 스르르 흘러가고, 둥근 조각들이 모여 사각의 그림자를 만든다.
                  </span>
                </div>
              ))}
            </div>
            <a href="#" className="btn-primary">더 알아보기</a>
          </div>
          <div className="app-detail__phone">
            <img src="/images/phone-mockup-294c7f.png" alt="아가잼잼 앱" />
          </div>
        </section>

        {/* Logo Carousel */}
        <LogoCarousel />

        {/* Process */}
        <section className="process">
          <div className="process__header">
            <h2 className="process__title">산후도우미 서비스 진행 절차</h2>
          </div>
          <div className="process__steps">
            {[
              { num: '01', title: '예약금 입금' },
              { num: '02', title: '계약서 작성' },
              { num: '03', title: '서비스 시작' },
              { num: '04', title: '마무리' },
            ].map((step) => (
              <div key={step.num} className="process__step">
                <span className="process__step-number">{step.num}</span>
                <div className="process__step-content">
                  <h3 className="h4 process__step-title">{step.title}</h3>
                  <p className="medium-p process__step-desc">
                    바람결에 숫자 같은 소리가 스르르 흘러가고, 둥근 조각들이 모여 사각의 그림자를 만든다.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* More */}
        <section className="more">
          <h2 className="h2 more__title">아가잼잼이면 해결되니까.</h2>
          <div className="more__cards">
            {[
              { title: '산후도우미 서비스' },
              { title: '아가잼잼 공식 앱' },
              { title: '예약하기' },
            ].map((card) => (
              <div key={card.title} className="link-card">
                <div className="link-card__content">
                  <h3 className="h3 link-card__title">{card.title}</h3>
                  <p className="medium-p link-card__description">
                    바람결에 숫자 같은 소리가 스르르 흘러가고, 둥근 조각들이 모여 사각의 그림자를 만든다.
                  </p>
                </div>
                <a href="#" className="btn-primary">더 알아보기</a>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer__links">
          <nav className="footer__nav">
            {['서비스 규정', '서비스 가격', '서비스 제공 항목', '전국 지점', '인재 영입', '산후도우미 관리사 교육', '고객센터'].map((link) => (
              <a key={link} href="#" className="footer__link link-text">{link}</a>
            ))}
          </nav>
        </div>
        <div className="footer__bottom">
          <img src="/images/footer-logo.png" alt="아가잼잼" className="footer__logo" />
          <span className="caption-text">2025 All Rights Reserved By Jaino Company</span>
        </div>
      </footer>
    </div>
  );
}
