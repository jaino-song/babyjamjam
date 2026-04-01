# 아가잼잼 Design System

Figma Source: `jGowMtudTsckCqCGKKetT5`
Mockup Reference: `mockup/index.html` (원본 1920px)
Production: `babyjamjam/` (×0.64 축소, 1232px)

Related: `docs/FIGMA_CONVERSION_PATTERN.md` explains how raw Figma export should be translated into the current React implementation.

> 모든 값은 Figma 원본 ×0.64 → 4px 배수 내림 적용.

---

## 1. CSS Tokens (`--bjj-*`)

```css
:root {
  /* Colors: Brand */
  --bjj-color-primary: #004AAD;
  --bjj-color-primary-light: #FBFDFF;
  --bjj-color-accent: #FFB27B;

  /* Colors: Text */
  --bjj-color-text-headline: #000000;
  --bjj-color-text-paragraph: #6F6F6F;
  --bjj-color-text-dark: #333D4B;
  --bjj-color-text-muted: #858585;
  --bjj-color-text-caption: #485C11;
  --bjj-color-text-link: #000000;

  /* Colors: Surface */
  --bjj-color-bg: #FFFFFF;
  --bjj-color-divider: #E9E9E9;

  /* Fonts */
  --bjj-font-heading: var(--font-pretendard), 'Pretendard Variable', system-ui, sans-serif;
  --bjj-font-body: var(--font-paperlogy), 'Paperlogy', sans-serif;
  --bjj-font-number: var(--font-dm-sans), 'DM Sans', sans-serif;
  --bjj-font-caption: var(--font-roboto-mono), 'Roboto Mono', monospace;

  /* Layout */
  /* Page uses padding: 0 20% instead of max-width + margin centering */
  --bjj-section-gap: 128px;
}
```

---

## 2. Typography Scale

| Token | Size | Weight | LH | LS | Font | Align |
|-------|------|--------|----|----|------|-------|
| H1 | 64px | 800 | 1.2 | 0.05em | heading | left |
| H2 | 48px | 800 | 1.2 | — | heading | center |
| H2-left | 48px | 800 | 1.2 | — | heading | left |
| H3 | 36px | 800 | 1.2 | — | heading | left |
| H4 | 24px | 800 | 1.2 | — | heading | left |
| H5 | 18px | 800 | 1.2 | — | heading | left |
| Big P | 18px | 500 | 1.5 | 0.03em | body | left |
| Medium P | 16px | 500 | 1.5 | 0.03em | body | left |
| Small P | 10px | 500 | 1.5 | 0.03em | body | left |
| Nav / Button | 13px | 800 | 1.4 | -0.025em | heading | center |
| Link | 9px | 700 | 1.4 | -0.025em | number | center |
| Caption | 8px | 400 | 1.4 | -0.01em | caption | center |
| Process Number | 52px | 400 | 1.0 | -0.04em | number | left |
| Process Title | 40px | 800 | 1.2 | — | heading | left |

### Dual-Color Heading

| Pattern | Part 1 | Part 2 | Usage |
|---------|--------|--------|-------|
| Muted → Primary | `#858585` | `#004AAD` | Service Detail, Govt Logo |
| Muted + Keyword | `#858585` base | `#004AAD` on keyword | Edu Logo ("전문가") |

---

## 3. Atoms

### Logo
| Variant | Size |
|---------|------|
| Header | 144 × 48px |
| Footer | 180 × 60px |

### Icon
| Property | Value |
|----------|-------|
| Size | 16 × 16px |

### Divider
| Property | Value |
|----------|-------|
| Style | 1px solid `--bjj-color-divider` |

### Image
| Variant | Size | Radius | Fit |
|---------|------|--------|-----|
| Hero Background | 100% × 488px | 0 0 20px 20px | cover |
| Banner | 100% × 652px | 20px | cover |
| Phone Mockup | 290 × 592px | — | contain |
| Partner Logo | auto × 48px | — | contain |

### Button
| Variant | Height | Width | Padding | Radius | Font | BG | Text |
|---------|--------|-------|---------|--------|------|----|------|
| Primary | 40px | 164px | 0 20px | 640px | 13px/800 heading | primary | primary-light |
| Short (CTA) | 40px | auto | 0 20px | 640px | 13px/800 heading | primary | bg |

---

## 4. Molecules

### Nav Item
```
font-heading 13px/800 tracking-tight primary-light whitespace-nowrap
```

### Footer Link
```
font-number 9px/700 tracking-tight text-link hover:underline
```

### Icon Lockup
| Property | Value |
|----------|-------|
| Layout | flex col, items-start |
| Border | top 1px divider |
| Padding | 24px 12px 24px 0 |
| Gap (icon→content) | 16px |
| Gap (title→desc) | 12px |
| Icon | 16 × 16px |
| Title | H5 (18px/700), text-headline |
| Description | Medium P (16px/500), text-paragraph |

### Process Step
| Property | Value |
|----------|-------|
| Layout | flex-1 col, items-start |
| Border | top 1px divider |
| Padding | 40px 20px 12px 0 |
| Gap (number→content) | 40px |
| Gap (title→desc) | 12px |
| Number | 52px/400 number, accent |
| Title | H4 (24px/700), primary-light |
| Description | Medium P (16px/500), primary-light |

### Link Card
| Property | Value |
|----------|-------|
| Layout | flex-1 col, items-center |
| Gap (content→button) | 24px |
| Gap (title→desc) | 24px |
| Title | H3 (24px/800), primary |
| Description | Medium P (16px/500), max-w 224px |

### List Item (App Detail)
| Property | Value |
|----------|-------|
| Layout | flex row, items-center |
| Border | top 1px divider |
| Padding | 12px 52px 12px 0 |
| Gap | 20px |
| Number/Desc | 16px/500 body, text-paragraph |

---

## 5. Organisms

### Navigation
| Property | Value |
|----------|-------|
| Height | 96px |
| Logo | 144 × 48px |
| **Nav Bar** | height: 40px, gap: 20px, px: 20px, radius: 64px, bg: primary, blur: 30px |
| **Nav Items** | 13px/800 heading, primary-light |
| **CTA Button** | Short variant (40px height, px: 20px) |
| Position | nav-bar: absolute center |

### Hero Section
| Property | Value |
|----------|-------|
| Gap (bg→text) | 64px |
| BG | 100% × 488px, radius: 0 0 20px 20px, gradient overlay 15% |
| Text | H1 (64px), primary, pre-line |

### Service Detail
| Property | Value |
|----------|-------|
| Header | flex col, items-start, gap: 32px, padding: 40px 256px 0 0 |
| Headline | Dual-Color Heading (H2-left) |
| Description | Big P, max-w: 640px |
| Icons Row | flex nowrap, gap: 12px, pt: 24px |
| Icons | 4× Icon Lockup (flex: 1) |

### Banner Image
| Property | Value |
|----------|-------|
| Size | 100% × 652px |
| Radius | 20px |
| Text | H2, white, absolute center, text-shadow |

### App Detail
| Property | Value |
|----------|-------|
| Container | relative, 100% × 588px, overflow hidden |
| Content | flex col, items-start, w: 504px, gap: 24px, pb: 52px |
| Title | H2-left, primary |
| Subtitle | H3, text-paragraph |
| List | 4× List Item |
| Button | Primary |
| Phone | absolute right-0 top-0, 290 × 592px |

### Logo Section
| Property | Value |
|----------|-------|
| Layout | flex col, items-start, gap: 32px |
| Padding | 64px 128px |
| Width | 100vw, max: 1232px |
| Title Container | w: 744px |
| Title | Dual-Color Heading (H2, left) |
| Description | Big P, text-dark, max-w: 640px |
| Logo Row | flex center wrap, gap: 44px, self-center |
| Logo img | h: 48px |
| **Edu variant** | pt: 40px, pb: 0 |

### Process Section
| Property | Value |
|----------|-------|
| Layout | flex col, items-center, gap: 52px |
| Padding | 64px 128px |
| Width | 100vw, max: 1232px |
| Background | primary |
| Border | top 1px divider |
| Title | 40px/800 heading, primary-light |
| Steps | flex row, gap: 12px, 4× Process Step |

### More Section
| Property | Value |
|----------|-------|
| Layout | flex col, items-center, gap: 64px |
| Padding Top | 40px |
| Border | top 1px divider |
| Title | H2, primary, center |
| Cards | flex row, items-start, gap: 40px, 3× Link Card |

### Footer
| Property | Value |
|----------|-------|
| Layout | flex col, items-center, gap: 52px |
| Padding | 24px 0 12px |
| Border | top 1px divider |
| Links Nav | flex row, gap: 16px |
| Bottom | flex row, space-between, items-end |
| Logo | 180 × 60px |
| Caption | 8px/400 caption, text-caption |

---

## 6. Page Layout

### Page Container
```
flex col center, padding: 0 20%
```

### Hero Pattern (all pages must match)
```
.hero__bg: height 488px, border-radius 0 0 20px 20px, gradient fade overlay
hero → title gap: 64px
<main> padding: var(--bjj-section-gap) 0, gap: var(--bjj-section-gap)
```

### Full-Bleed Sections
Logo Section, Process Section:
```
width: 100vw, px: 20%
```

### Section Order (Home `/`)
```
1. Navigation         ← h: 96px
2. Hero               ← bg 488px + H1, gap: 64px
3. Main               ← flex col, gap: 128px, py: 128px
   3.1 Service Detail  ← headline + 4 icon lockups (nowrap)
   3.2 Banner Image    ← 652px, radius 20px, centered text
   3.3 App Detail      ← 588px, text left + phone right
   3.4 Logo Section    ← full-bleed, govt logos
   3.5 Edu Logo        ← full-bleed, edu logos
   3.6 Process         ← full-bleed, bg primary, 4 steps
   3.7 More            ← 3 link cards
4. Footer              ← links + logo + copyright
```

---

## 7. Scale Reference (Figma → Production)

| Figma 원본 | ×0.64 | Production | TW equiv |
|-----------|-------|------------|----------|
| 1920px | 1228 | 1232px | max-w-[1232px] |
| 200px | 128 | 128px | p-32 |
| 150px | 96 | 96px | h-24 |
| 100px (H1) | 64 | 64px | text-[64px] |
| 72px (H2) | 46 | 48px | text-5xl |
| 40px (H3) | 25 | 24px | text-2xl |
| 28px (H5/BigP) | 18 | 18px | text-lg |
| 24px (MedP) | 15 | 16px | text-base |
| 20px (Nav) | 13 | 13px | text-[13px] |
| 760px (hero) | 486 | 488px | h-[488px] |
| 1018px (banner) | 651 | 652px | h-[652px] |
| 917px (app) | 587 | 588px | h-[588px] |
| 453×925 (phone) | 290×592 | 290×592 | — |
| 256×64 (btn) | 164×40 | 164×40 | w-[164px] h-10 |
| 72px (logo img) | 46 | 48px | h-12 |
| 283×94 (footer logo) | 181×60 | 180×60 | — |
| 80px (process num) | 51 | 52px | text-[52px] |
| 60px (process title) | 38 | 40px | text-[40px] |
