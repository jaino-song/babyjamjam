# Calendar Range Convention

이 문서는 [app-detail-calendar-mockups.ts](/Users/jaino/Development/babyjamjam/dev/src/components/app-detail-calendar-mockups.ts) 에서 사용한 달력 이벤트 라인 처리 규칙을 정리한다.

## 목적

모바일 월간 달력에서 일정이 여러 날짜에 걸쳐 이어질 때:

- 날짜 숫자 아래에 range line 이 자연스럽게 이어져 보여야 한다.
- 주말을 건너뛰는 경우에도 "다음 주중으로 이어짐"이 느껴져야 한다.
- 셀 경계에서 색이 달라 보이는 anti-alias seam 을 만들지 않아야 한다.

## 기본 구조

날짜 셀은 `.d` 를 기본으로 사용한다.

- 일반 날짜: `.d`
- 범위 시작: `.d.range.rangeStart`
- 범위 중간: `.d.range.rangeMid`
- 범위 종료: `.d.range.rangeEnd`
- 주말 이후 재시작: `.d.range.rangeStart.rangeResume`
- 다음 주로 이어지는 느낌의 금요일 종료: `.d.range.rangeEnd.rangeContinue`

range line 은 셀 자체가 아니라 `::after` 로 그린다.

## 핵심 규칙

### 1. 라인은 `::after` 로 그린다

```css
.range::after {
  content: "";
  position: absolute;
  top: 17px;
  height: 5px;
  background: var(--primary);
  z-index: 0;
}
```

숫자와 dot 은 line 위에 올라와야 하므로 `strong` 과 `.dot` 은 더 높은 stacking context 를 유지한다.

### 2. 시작점은 둥글고, 끝점은 상황에 따라 다르다

일반 시작:

```css
.rangeStart::after {
  left: 13px;
  border-radius: 999px 0 0 999px;
}
```

일반 종료:

```css
.rangeEnd::after {
  right: 11px;
  border-radius: 0 999px 999px 0;
}
```

### 3. 금요일에서 주말을 건너뛰는 종료는 둥글게 끝내지 않는다

금요일 끝에서 바로 주말 때문에 끊기는 경우는 실제 종료가 아니라 다음 주로 이어지는 느낌이어야 한다. 이때는 `rangeContinue` 를 추가한다.

```css
.rangeContinue::after {
  left: 0;
  right: 0;
  border-radius: 0;
}
```

즉, 금요일 셀 안을 직선으로 꽉 채우고 둥근 끝을 만들지 않는다.

### 4. 월요일 재시작도 왼쪽 끝에서 직선으로 시작한다

주말을 지난 다음 월요일은 새로운 일정 시작처럼 보이면 안 된다. 이어지는 같은 일정처럼 보여야 하므로 `rangeResume` 을 사용한다.

```css
.rangeResume::after {
  left: -1px;
  border-radius: 0;
}
```

즉, 월요일 셀의 왼쪽 경계부터 직선으로 시작한다.

### 5. anti-alias seam 회피 규칙

셀 경계에서 line 을 `right: -1px`, `-2px`, `box-shadow`, `::before` 같은 방식으로 억지로 덮으면 끝 픽셀의 색이 달라 보일 수 있다.

이 프로젝트에서는 다음 원칙을 따른다.

- 경계 밖으로 line 을 과도하게 밀지 않는다.
- 특수 덮개를 추가하지 않는다.
- 필요한 경우 셀 안에서 `left: 0; right: 0;` 으로 채운다.

즉, "경계를 넘어 덮기"보다 "셀 내부를 안정적으로 채우기"를 우선한다.

## 현재 적용 패턴

예시:

- `21-23`: 주중 첫 구간
- `24-25`: 주말, line 없음, dot 만 유지
- `26-30`: 다음 주중 구간 재개
- `31`: 현재는 dot 만 유지

구조 예시:

```html
<div class="d range rangeStart">21</div>
<div class="d range rangeMid">22</div>
<div class="d range rangeEnd rangeContinue">23</div>
<div class="d">24</div>
<div class="d">25</div>
<div class="d range rangeStart rangeResume">26</div>
<div class="d range rangeMid">27</div>
<div class="d range rangeMid">28</div>
<div class="d range rangeMid">29</div>
<div class="d range rangeEnd">30</div>
```

## 구현 원칙 요약

- 시작점은 dot 기준에 맞춰 안쪽에서 시작한다.
- 종료점은 진짜 종료일 때만 둥글게 끝낸다.
- 주말 스킵 전 금요일은 끝까지 채우고 radius 를 없앤다.
- 주말 뒤 월요일은 왼쪽 끝부터 직선으로 다시 시작한다.
- seam 이 보이면 덮지 말고 좌우 좌표를 단순화한다.
