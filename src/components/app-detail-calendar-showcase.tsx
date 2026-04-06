import styles from "./app-detail-calendar-showcase.module.css";
import { calendarMockups } from "./app-detail-calendar-mockups";

export function AppDetailCalendarShowcase() {
  return (
    <section className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>APP DETAIL CALENDAR MOCKUPS</span>
          <h1 className={styles.title}>
            휴대폰 목업 안에 바로 넣어볼 수 있는
            <br />
            10월 달력 모바일 화면
          </h1>
          <p className={styles.description}>
            앱 상세에 넣기 위한 단일 프로토타입입니다. 달력은 화면 전체 폭을 쓰고,
            선택 날짜의 상세 카드가 아래 이어지도록 구성했습니다.
          </p>
        </header>

        <div className={styles.grid}>
          {calendarMockups.map((variant) => (
            <article key={variant.title} className={styles.card}>
              <div className={styles.phoneShell}>
                <div className={styles.screen}>
                  <iframe className={styles.iframe} srcDoc={variant.html} title={variant.title} />
                </div>
                <img
                  className={styles.screenFrame}
                  src="/images/phone-mockup-294c7f.png"
                  alt="아가잼잼 앱 목업"
                />
              </div>
              <div className={styles.meta}>
                <strong>{variant.title}</strong>
                <span>{variant.description}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
