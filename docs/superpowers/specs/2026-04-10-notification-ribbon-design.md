# Notification Ribbon — Design Spec

## Context

Babyjamjam needs a multi-purpose notification ribbon to communicate promotions, service updates, and important notices to users. Inspired by Apple's site ribbon, it should feel native to the existing design system (primary blue #004AAD, peach accent #FFB27B, Pretendard/Paperlogy fonts, glassmorphism patterns).

The user chose **Mockup #2 — Brand Primary**: a bold blue banner with peach dot accent and peach-colored link text.

## Design

### Visual Spec

- **Position:** Below the navigation bar, above `{children}` in `layout.tsx`
- **Background:** `#004AAD` (primary blue)
- **Text:** White, 13px, font-weight 500 (Paperlogy/body font)
- **Link text:** `#FFB27B` (peach accent), font-weight 600, with `›` arrow
- **Peach dot:** 6px circle `#FFB27B` before the message text
- **Padding:** 10px vertical, 48px horizontal (matches page padding at desktop)
- **Alignment:** Centered, flex row with gap 8px
- **Always visible:** No dismiss/close button
- **Responsive:** Text wraps naturally; padding reduces on mobile (24px)

### Component

A single `AnnouncementRibbon` component in `src/components/announcement-ribbon.tsx`.

Props:
- `message: string` — the notification text
- `linkText?: string` — optional CTA text (e.g., "자세히 보기")
- `linkHref?: string` — optional CTA URL

When no `linkText`/`linkHref` is provided, just the message + dot is shown.

### Integration

In `src/app/layout.tsx`, the ribbon renders between `<PersistentNav />` and `{children}` inside the `.page` div:

```tsx
<div className="page">
  <PersistentNav />
  <AnnouncementRibbon
    message="6월 특별 할인 — 첫 예약 시 10% 할인 혜택을 드립니다."
    linkText="자세히 보기"
    linkHref="/pricing"
  />
  {children}
</div>
```

To hide the ribbon, simply remove or comment out the component — no feature flag needed.

### CSS

Add `.announcement-ribbon` styles to `globals.css` following the existing BEM pattern:

```css
.announcement-ribbon {
  background: var(--bjj-color-primary);
  padding: 10px var(--bjj-page-padding);
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  color: var(--bjj-color-primary-light);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
}

.announcement-ribbon__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--bjj-color-accent);
  flex-shrink: 0;
}

.announcement-ribbon__link {
  color: var(--bjj-color-accent);
  text-decoration: none;
  font-weight: 600;
}
```

Responsive: at mobile breakpoint (780px), padding switches to 24px.

## Files to Modify

1. **`src/components/announcement-ribbon.tsx`** — New component (create)
2. **`src/app/globals.css`** — Add `.announcement-ribbon` styles
3. **`src/app/layout.tsx`** — Import and render the ribbon

## Verification

1. Run `npm run dev` and check all pages — ribbon should appear below nav on every page
2. Verify responsive behavior at desktop (>1100px), tablet (780–1100px), and mobile (<780px)
3. Verify the peach dot, white text, and peach link render correctly
4. Verify the link navigates to the correct href
