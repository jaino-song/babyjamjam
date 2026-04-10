export const calendarMockups = [
  {
    title: "October Calendar",
    description: "앱 상세용 단일 10월 달력 프로토타입.",
    html: `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=355, initial-scale=1.0"><style>
      :root{--primary:#004aad;--primary-soft:#eaf3ff;--accent:#ffb27b;--good:#2b8a6e;--text:#16233a;--muted:#68778d;--surface:#fff;--surface-2:#f5f8fc;--shadow:0 18px 44px rgba(5,42,96,.08)}
      *{box-sizing:border-box}html,body{width:100%;height:100%;overflow:hidden}body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo","Pretendard",sans-serif;background:#ffffff;color:var(--text)}
      .mobile{width:100%;height:100%;margin-left:0;padding:36px 10px 0;display:flex;flex-direction:column;gap:11px}
      .month{display:flex;align-items:center;justify-content:space-between;min-height:34px;padding:8px 2px 0;margin-top:0}
      .month strong{display:block;font-size:23px;line-height:1.1;font-weight:800;color:var(--primary)}
      .month span{font-size:10px;color:var(--muted)}
      .weekdays,.grid{display:grid;grid-template-columns:repeat(7,1fr);gap:0}
      .weekdays{padding:0 2px}
      .weekdays span{text-align:center;font-size:9px;color:var(--muted)}
      .grid{width:100%}
      .d{position:relative;width:30px;height:36px;padding:4px 2px 8px;border-radius:10px;background:rgba(255,255,255,.72);display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:1px}
      .d strong{position:relative;z-index:1;font-size:11px;line-height:1;font-weight:700;margin-top:0}
      .sun strong,.sat strong,.holiday strong{color:#7b2846}
      .selected{box-shadow:inset 0 0 0 1px var(--primary);border-radius:10px !important}
      .e{background:transparent;box-shadow:none}
      .p,.a,.g{background:rgba(255,255,255,.72)}
      .dot{position:absolute;left:50%;bottom:7px;transform:translateX(-50%);z-index:1;width:5px;height:5px;border-radius:999px;background:#c4cfdd}.dot.p{background:var(--primary)}.dot.a{background:var(--accent)}.dot.g{background:var(--good)}.dot.b{background:#7b2846}
      .cap{display:none}
      .range::after{content:"";position:absolute;left:-1px;right:-1px;top:17px;height:5px;background:var(--primary);z-index:0}
      .range{width:100%;border-radius:10px}
      .rangeStart::after{left:13px;border-radius:999px 0 0 999px}
      .rangeMid::after{border-radius:0}
      .rangeEnd::after{right:11px;border-radius:0 999px 999px 0}
      .rangeContinue::after{left:0;right:0;border-radius:0}
      .rangeResume::after{left:-1px;border-radius:0}
      .rangeSolo::after{left:13px;right:11px;border-radius:999px}
      .rangeStart{border-radius:10px 0 0 10px}
      .rangeEnd{border-radius:0 10px 10px 0}
      .range .dot{display:block}
      .agenda{margin-top:10px;padding:0 2px;display:flex;flex-direction:column;gap:8px}
      .agendaHeader{display:flex;align-items:flex-end;justify-content:space-between}
      .agendaDate{font-size:14px;line-height:1.2;font-weight:700;color:var(--text)}
      .agendaCount{font-size:10px;color:var(--muted)}
      .agendaList{display:flex;flex-direction:column;border-top:1px solid #e7edf5}
      .agendaItem{display:grid;grid-template-columns:46px 1fr;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid #e7edf5}
      .agendaTime{display:flex;flex-direction:column;gap:1px}
      .agendaTimeMain,.agendaTimeSub{font-size:10px;line-height:1.35;font-weight:700;font-variant-numeric:tabular-nums;font-feature-settings:"tnum" 1}
      .agendaTimeMain{color:var(--primary)}
      .agendaTimeSub{color:var(--muted)}
      .agendaBody{display:flex;flex-direction:column;gap:2px;min-width:0}
      .agendaTitleRow{display:flex;align-items:center;gap:6px}
      .agendaTitle{font-size:11px;line-height:1.35;font-weight:700;color:var(--text)}
      .agendaMeta{font-size:9px;line-height:1.45;color:var(--muted)}
      .bottomNav{align-self:center;margin-top:auto;margin-bottom:16px;display:flex;align-items:center;gap:4px;padding:1px;background:rgba(248,250,255,.6);backdrop-filter:blur(40px) saturate(200%);-webkit-backdrop-filter:blur(40px) saturate(200%);border-radius:999px;box-shadow:0 8px 32px rgba(2,22,56,.1),inset 0 1px 0 rgba(255,255,255,.9)}
      .navItem{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;width:32px;height:32px;border-radius:7px;text-decoration:none;color:#68778d;overflow:hidden}
      .navItem.on{background:rgba(0,74,173,.1);color:#004aad;border-radius:50%}
      .navItem.chat{color:#004aad}
      .navItem span{font-size:7px;font-weight:600;line-height:1;white-space:nowrap}
    </style></head><body><main class="mobile"><section class="month"><strong>10월</strong><span>2026</span></section><section class="weekdays"><span>일</span><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span></section><section class="grid"><div class="d e"></div><div class="d e"></div><div class="d e"></div><div class="d e"></div><div class="d"><strong>1</strong><span class="dot g"></span><span class="cap">상담</span></div><div class="d"><strong>2</strong></div><div class="d sat"><strong>3</strong></div><div class="d sun"><strong>4</strong></div><div class="d holiday"><strong>5</strong></div><div class="d"><strong>6</strong><span class="dot a"></span><span class="cap">서류</span></div><div class="d"><strong>7</strong><span class="dot b"></span></div><div class="d p"><strong>8</strong></div><div class="d holiday"><strong>9</strong></div><div class="d sat"><strong>10</strong></div><div class="d sun"><strong>11</strong></div><div class="d"><strong>12</strong></div><div class="d"><strong>13</strong></div><div class="d selected range rangeStart"><strong>14</strong><span class="dot b"></span><span class="cap">방문</span></div><div class="d range rangeMid"><strong>15</strong></div><div class="d range rangeEnd rangeContinue"><strong>16</strong></div><div class="d sat"><strong>17</strong></div><div class="d sun"><strong>18</strong></div><div class="d range rangeStart rangeResume"><strong>19</strong></div><div class="d range rangeMid"><strong>20</strong></div><div class="d range rangeMid"><strong>21</strong></div><div class="d range rangeMid"><strong>22</strong></div><div class="d range rangeEnd rangeContinue"><strong>23</strong><span class="cap">점검</span></div><div class="d sat"><strong>24</strong></div><div class="d sun"><strong>25</strong></div><div class="d range rangeStart rangeResume"><strong>26</strong></div><div class="d range rangeMid"><strong>27</strong></div><div class="d range rangeMid"><strong>28</strong></div><div class="d range rangeMid"><strong>29</strong></div><div class="d range rangeEnd rangeContinue"><strong>30</strong></div><div class="d sat"><strong>31</strong></div></section><section class="agenda"><div class="agendaHeader"><strong class="agendaDate">10월 14일 수요일</strong><span class="agendaCount">일정 2개</span></div><div class="agendaList"><article class="agendaItem"><span class="agendaTime"><span class="agendaTimeMain">09:00</span><span class="agendaTimeSub">18:00</span></span><div class="agendaBody"><div class="agendaTitleRow"><strong class="agendaTitle">산후도우미 서비스</strong></div></div></article><article class="agendaItem"><span class="agendaTime"><span class="agendaTimeMain">09:30</span><span class="agendaTimeSub">10:00</span></span><div class="agendaBody"><div class="agendaTitleRow"><strong class="agendaTitle">서비스 시작 안내 전화</strong></div></div></article></div></section><nav class="bottomNav"><a class="navItem"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg><span>홈</span></a><a class="navItem on"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg><span>일정</span></a><a class="navItem chat"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg><span>어시스턴트</span></a><a class="navItem"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg><span>계약</span></a><a class="navItem"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg><span>전체</span></a></nav></main></body></html>`,
  },
] as const;
