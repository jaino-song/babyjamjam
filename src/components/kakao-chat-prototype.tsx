"use client";

import { useEffect, useState } from "react";

import styles from "./kakao-chat-prototype.module.css";

type Message = {
  id: number;
  sender: "incoming" | "outgoing";
  text: string;
  time: string;
  large?: boolean;
};

const MOCK_MESSAGES: Message[] = [
  { id: 1, sender: "incoming", text: "안녕하세요,\n아가잼잼 채널입니다.\n무엇을 도와드릴까요? :)", time: "오후 2:18" },
  { id: 2, sender: "outgoing", text: "안녕하세요! 저번에 말씀드린 요청사항은 반영이 되는 걸까요?", time: "오후 2:19" },
  { id: 3, sender: "incoming", text: "안녕하세요 산모님 :) 그럼요, 저번에 말씀해주신 내용은 관리사님께 잘 전달하였으니 염려하지 않으셔도 됩니다.", time: "오후 2:20" },
  { id: 4, sender: "outgoing", text: "다행이네요~ 감사합니다.", time: "오후 2:21" },
  { id: 5, sender: "incoming", text: "추가로 궁금하시거나 필요하신 사항이 있으시면 언제든지 연락주세요 :)", time: "오후 2:21" },
  { id: 6, sender: "outgoing", text: "😆", time: "오후 2:22", large: true },
];

const STEP_MS = 2000;
const RESET_DELAY_MS = 2600;

export function KakaoChatPhone() {
  const [cycle, setCycle] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    setVisibleCount(1);

    const timeoutIds = MOCK_MESSAGES.slice(1).map((_, index) =>
      window.setTimeout(() => {
        setVisibleCount(index + 2);
      }, STEP_MS * (index + 1))
    );

    const resetTimeoutId = window.setTimeout(() => {
      setCycle((current) => current + 1);
    }, STEP_MS * MOCK_MESSAGES.length + RESET_DELAY_MS);

    return () => {
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
      window.clearTimeout(resetTimeoutId);
    };
  }, [cycle]);

  return (
    <div className={styles.phoneStage}>
      <div className={styles.phoneShell}>
        <div className={styles.screen}>
          <div className={styles.screenTop}>
            <div className={styles.topSpacer} aria-hidden="true" />
            <div className={styles.navRow}>
              <div className={styles.navLeft}>
                <span className={styles.navBack} aria-hidden="true" />
                <span className={styles.navCount}>42</span>
              </div>
              <div className={styles.navCenter}>
                <strong className={styles.navTitle}>아가잼잼</strong>
              </div>
              <div className={styles.navActions}>
                <span className={styles.navSearch} aria-hidden="true" />
                <span className={styles.navMenu} aria-hidden="true" />
              </div>
            </div>
          </div>
          <div className={styles.messagesViewport}>
            <div className={styles.messagesTrack}>
              <div className={styles.dateChip}>2026년 4월 3일 금요일</div>
              {MOCK_MESSAGES.map((message, index) => {
                const isVisible = index < visibleCount;
                const isOutgoing = message.sender === "outgoing";
                return (
                  <div
                    key={message.id}
                    className={`${styles.messageRow} ${isOutgoing ? styles.right : styles.left}`}
                  >
                    {!isOutgoing && (
                      <img
                        className={`${styles.avatar} ${styles.animateIn} ${isVisible ? styles.animateInVisible : ""}`}
                        src="/images/logo-agajamjam-icon.svg"
                        alt="아가잼잼"
                      />
                    )}
                    <div className={`${styles.bubbleWrap} ${styles.animateIn} ${isVisible ? styles.animateInVisible : ""}`}>
                      {!isOutgoing && <span className={styles.senderName}>아가잼잼</span>}
                      <div className={`${styles.bubbleAndTime} ${isOutgoing ? styles.bubbleAndTimeOutgoing : ""}`}>
                        {isOutgoing && <span className={styles.meta}>{message.time}</span>}
                        <div className={`${styles.bubble} ${isOutgoing ? styles.bubbleOutgoing : styles.bubbleIncoming}`} style={message.large ? { fontSize: "22px" } : undefined}>
                          {message.text}
                        </div>
                        {!isOutgoing && <span className={styles.meta}>{message.time}</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.composer}>
            <div className={styles.composerBar}>
              <span className={styles.plusButton} />
              <span className={styles.composerPlaceholder}>메시지 입력</span>
              <span className={styles.sendButton} />
            </div>
          </div>
        </div>
        <img className={styles.phoneFrame} src="/images/phone-mockup-294c7f.png" alt="아가잼잼 앱 목업" />
      </div>
    </div>
  );
}

export function KakaoChatPrototype() {
  const [cycle, setCycle] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    setVisibleCount(1);

    const timeoutIds = MOCK_MESSAGES.slice(1).map((_, index) =>
      window.setTimeout(() => {
        setVisibleCount(index + 2);
      }, STEP_MS * (index + 1))
    );

    const resetTimeoutId = window.setTimeout(() => {
      setCycle((current) => current + 1);
    }, STEP_MS * MOCK_MESSAGES.length + RESET_DELAY_MS);

    return () => {
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
      window.clearTimeout(resetTimeoutId);
    };
  }, [cycle]);

  return (
    <section className={styles.page}>
      <div className={styles.layout}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>KAKAO PROTOTYPE</span>
          <h1 className={styles.title}>
            목업 위에 메시지가 올라오는
            <br />
            <span className={styles.titleAccent}>카카오톡 프로토타입</span>
          </h1>
          <p className={styles.description}>
            지금은 더미 문구로 움직임만 잡아둔 상태입니다. 나중에 실제 메시지 내용을 주시면
            `MOCK_MESSAGES` 배열만 교체해서 바로 같은 형식의 데모 영상으로 바꿀 수 있습니다.
          </p>
          <ol className={styles.steps}>
            <li className={styles.step}>
              <span className={styles.stepNumber}>01</span>
              채팅 버블이 1.2초 간격으로 순서대로 등장합니다.
            </li>
            <li className={styles.step}>
              <span className={styles.stepNumber}>02</span>
              휴대폰 목업 내부에만 채팅이 보이도록 화면 영역을 분리했습니다.
            </li>
            <li className={styles.step}>
              <span className={styles.stepNumber}>03</span>
              메시지 확정 후에는 이 화면을 그대로 녹화하거나 Remotion 렌더링으로 넘기면 됩니다.
            </li>
          </ol>
          <p className={styles.hint}>
            추천 비율은 `1080x1920` 또는 `1170x2532` 세로형입니다.
          </p>
        </div>

        <div className={styles.phoneStage}>
          <div className={styles.phoneShell}>
            <div className={styles.screen}>
              <div className={styles.screenTop}>
                <div className={styles.topSpacer} aria-hidden="true" />

                <div className={styles.navRow}>
                  <div className={styles.navLeft}>
                    <span className={styles.navBack} aria-hidden="true" />
                    <span className={styles.navCount}>42</span>
                  </div>
                  <div className={styles.navCenter}>
                    <strong className={styles.navTitle}>아가잼잼</strong>
                  </div>
                  <div className={styles.navActions}>
                    <span className={styles.navSearch} aria-hidden="true" />
                    <span className={styles.navMenu} aria-hidden="true" />
                  </div>
                </div>
              </div>

              <div className={styles.messagesViewport}>
                <div className={styles.messagesTrack}>
                  <div className={styles.dateChip}>2026년 4월 3일 금요일</div>
                  {MOCK_MESSAGES.map((message, index) => {
                    const isVisible = index < visibleCount;
                    const isOutgoing = message.sender === "outgoing";

                    return (
                      <div
                        key={message.id}
                        className={`${styles.messageRow} ${
                          isOutgoing ? styles.right : styles.left
                        }`}
                      >
                        {!isOutgoing && (
                          <img
                            className={`${styles.avatar} ${styles.animateIn} ${isVisible ? styles.animateInVisible : ""}`}
                            src="/images/logo-agajamjam-icon.svg"
                            alt="아가잼잼"
                          />
                        )}
                        <div
                          className={`${styles.bubbleWrap} ${styles.animateIn} ${
                            isVisible ? styles.animateInVisible : ""
                          }`}
                        >
                          {!isOutgoing && (
                            <span className={styles.senderName}>아가잼잼</span>
                          )}
                          <div className={`${styles.bubbleAndTime} ${isOutgoing ? styles.bubbleAndTimeOutgoing : ""}`}>
                            {isOutgoing && (
                              <span className={styles.meta}>{message.time}</span>
                            )}
                            <div
                              className={`${styles.bubble} ${
                                isOutgoing ? styles.bubbleOutgoing : styles.bubbleIncoming
                              }`}
                            >
                              {message.text}
                            </div>
                            {!isOutgoing && (
                              <span className={styles.meta}>{message.time}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className={styles.composer}>
                <div className={styles.composerBar}>
                  <span className={styles.plusButton} />
                  <span className={styles.composerPlaceholder}>메시지 입력</span>
                  <span className={styles.sendButton} />
                </div>
              </div>
            </div>

            <img
              className={styles.phoneFrame}
              src="/images/phone-mockup-294c7f.png"
              alt="아가잼잼 앱 목업"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
