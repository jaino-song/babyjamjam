export const calendarMockups = [
  {
    title: "October Calendar",
    description: "앱 상세용 단일 10월 달력 프로토타입.",
    html: `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>
      :root{--primary:#004aad;--primary-soft:#eaf3ff;--accent:#ffb27b;--good:#2b8a6e;--text:#16233a;--muted:#68778d;--surface:#fff;--surface-2:#f5f8fc;--shadow:0 18px 44px rgba(5,42,96,.08)}
      *{box-sizing:border-box}html,body{width:100%;height:100%;overflow:hidden}body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo","Pretendard",sans-serif;background:#ffffff;color:var(--text)}
      .mobile{width:100%;min-height:100%;margin-left:0;padding:36px 10px 12px;display:flex;flex-direction:column;gap:11px}
      .month{display:flex;align-items:center;justify-content:space-between;min-height:34px;padding:8px 2px 0;margin-top:0}
      .month strong{display:block;font-size:23px;line-height:1.1;font-weight:800;color:var(--primary)}
      .month span{font-size:10px;color:var(--muted)}
      .weekdays,.grid{display:grid;grid-template-columns:repeat(7,1fr);gap:0}
      .weekdays{padding:0 2px}
      .weekdays span{text-align:center;font-size:9px;color:var(--muted)}
      .grid{width:100%}
      .d{position:relative;width:30px;height:36px;padding:4px 2px 8px;border-radius:10px;background:rgba(255,255,255,.72);display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:1px}
      .d strong{position:relative;z-index:1;font-size:11px;line-height:1;font-weight:700;margin-top:0}
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
    </style></head><body><main class="mobile"><section class="month"><strong>10월</strong><span>2026</span></section><section class="weekdays"><span>일</span><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span></section><section class="grid"><div class="d e"></div><div class="d e"></div><div class="d e"></div><div class="d e"></div><div class="d"><strong>1</strong></div><div class="d"><strong>2</strong></div><div class="d"><strong>3</strong></div><div class="d"><strong>4</strong></div><div class="d"><strong>5</strong></div><div class="d"><strong>6</strong></div><div class="d"><strong>7</strong></div><div class="d p"><strong>8</strong><span class="dot p"></span><span class="cap">상담</span></div><div class="d"><strong>9</strong></div><div class="d"><strong>10</strong></div><div class="d"><strong>11</strong></div><div class="d"><strong>12</strong></div><div class="d a"><strong>13</strong><span class="dot a"></span><span class="cap">서류</span></div><div class="d"><strong>14</strong><span class="dot b"></span></div><div class="d"><strong>15</strong></div><div class="d"><strong>16</strong></div><div class="d"><strong>17</strong></div><div class="d"><strong>18</strong></div><div class="d"><strong>19</strong></div><div class="d"><strong>20</strong></div><div class="d range rangeStart"><strong>21</strong><span class="dot p"></span><span class="cap">방문</span></div><div class="d range rangeMid"><strong>22</strong><span class="dot p"></span></div><div class="d range rangeEnd rangeContinue"><strong>23</strong><span class="dot p"></span></div><div class="d"><strong>24</strong><span class="dot p"></span></div><div class="d"><strong>25</strong><span class="dot p"></span></div><div class="d range rangeStart rangeResume"><strong>26</strong><span class="dot p"></span></div><div class="d range rangeMid"><strong>27</strong><span class="dot p"></span></div><div class="d range rangeMid"><strong>28</strong><span class="dot p"></span></div><div class="d range rangeMid"><strong>29</strong><span class="dot p"></span></div><div class="d range rangeEnd"><strong>30</strong><span class="dot p"></span><span class="cap">점검</span></div><div class="d"><strong>31</strong><span class="dot p"></span></div></section></main></body></html>`,
  },
] as const;
