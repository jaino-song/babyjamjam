# Figma Conversion Pattern

This document explains how the raw Figma export should be translated into the current BabyJamJam React UI.

## Canonical Source of Truth

Use these files as the baseline for future imports:

- `src/app/page.tsx`
- `src/app/globals.css`
- `docs/DESIGN_SYSTEM.md`

Do **not** treat the current `src/components/*` refactor as the source of truth yet. It contains useful atomic naming, but several values still mirror raw Figma export dimensions and some Tailwind-style token classes are not wired to a theme.

## What The Current React UI Actually Does

The live homepage is **not** a direct Figma JSX dump.

It follows this pattern:

1. Break the page into semantic sections: navigation, hero, service detail, banner, app detail, logos, process, more, footer.
2. Replace raw numeric Figma classes with a small set of CSS tokens and semantic text styles.
3. Collapse repeated blocks into mapped data arrays where possible.
4. Keep section-level layout in semantic class names instead of preserving raw export wrappers.
5. Swap placeholder or generic design content for project-specific assets where the final UI intentionally differs from Figma.

## Core Conversion Rule: Scale First

The production page is based on the original Figma artboard scaled down from `1920px` to about `1232px`.

Use this rule:

`production size = floor_to_4px(figma size * 0.64)`

Examples:

| Figma | React UI |
| --- | --- |
| `1920` | `1232` |
| `200` | `128` |
| `150` | `96` |
| `100` | `64` |
| `72` | `48` |
| `40` | `24` |
| `28` | `18` |
| `24` | `16` |
| `20` | `13` |
| `80` | `52` |
| `60` | `40` |
| `760` | `488` |
| `1018` | `652` |
| `917` | `588` |

This is the main reason the text sizes in React look smaller than the raw Figma export. That difference is intentional and systemic.

## Token Mapping

Map raw Figma color/font names into the repo tokens instead of preserving Figma labels.

### Colors

| Figma intent | React token |
| --- | --- |
| `Primary` | `var(--bjj-color-primary)` |
| light text on blue | `var(--bjj-color-primary-light)` |
| orange step number | `var(--bjj-color-accent)` |
| headline black | `var(--bjj-color-text-headline)` |
| paragraph gray | `var(--bjj-color-text-paragraph)` |
| muted heading gray | `var(--bjj-color-text-muted)` |
| dark paragraph | `var(--bjj-color-text-dark)` |
| divider | `var(--bjj-color-divider)` |

### Fonts

| Figma font | React token |
| --- | --- |
| `Pretendard_Variable` / `Pretendard` | `var(--bjj-font-heading)` |
| `Paperlogy` | `var(--bjj-font-body)` |
| `DM Sans` | `var(--bjj-font-number)` |
| `Roboto Mono` | `var(--bjj-font-caption)` |

## Typography Mapping

Do not carry `text-8xl`, `text-7xl`, `text-4xl`, etc. directly from Figma export.

Convert them to the semantic scale already used by the live page:

| React semantic style | Final size |
| --- | --- |
| `h1` | `64px` |
| `h2` / `h2-left` | `48px` |
| `h3` / section subtitle emphasis | `24px` |
| `h4` | `24px` |
| `h5` | `18px` |
| `big-p` | `18px` |
| `medium-p` | `16px` |
| `link-text` | `9px` |
| `caption-text` | `8px` |

When converting line-height, prefer the production ratio rather than raw Figma pixel line-height. The current UI generally uses unitless ratios like `1.2`, `1.4`, and `1.5`.

## Layout Mapping

Translate raw wrappers into these higher-level structures:

| Raw Figma export pattern | Current React pattern |
| --- | --- |
| page root `w-[1920px] px-48 ...` | `.page` with `max-width: 1232px`, centered, `padding-inline: 128px` |
| large section gaps like `gap-24`, `py-48` | normalized section gap token `--bjj-section-gap: 128px` |
| repeated icon/info columns | shared `icon-lockup` pattern |
| numbered list rows | shared `app-detail__list-item` pattern |
| repeated process cards | mapped step data + shared process-step structure |
| repeated CTA cards | mapped card data + shared link-card structure |

## Atomic Structure To Reuse

The repo is moving toward this structure:

- `ui`: button, logo, icon, divider, image
- `molecules`: nav item, footer link, dual-color heading, icon lockup, list item, process step, link card
- `organisms`: each full homepage section

That is the correct mental model for future imports even though the live route still renders a mostly monolithic page file.

For new Figma sections:

1. Identify whether the section is truly new or is another instance of an existing molecule/organism pattern.
2. Reuse the existing pattern before introducing new wrappers.
3. Keep repeated content as arrays and `.map(...)`, not duplicated JSX copied from Figma output.

## Known Exceptions

### Government Logos and Education Logos

Do not directly convert those blocks from Figma export.

The current UI intentionally diverges:

- assets were redesigned manually
- logo sizing was normalized for the live site
- the two sections are currently presented through `LogoCarousel`, not as literal exported Figma rows

For those sections, the canonical source is the current React implementation and the assets in `public/images/`, not the original Figma geometry.

### Placeholder Assets

Never preserve `placehold.co` output from Figma export. Replace those with real project assets or final local image paths.

## Important Mismatch In The Repo

The `src/components/*` refactor is useful as a naming guide, but it is not yet a faithful implementation baseline.

Examples:

- some components still use raw Figma dimensions such as `225x75`, `283x94`, and `453x925`
- some classes like `text-h1`, `max-w-480`, `rounded-pill`, and `bg-bjj-primary` imply a tokenized Tailwind setup that is not declared in the current global theme
- `src/components/ui/logo.tsx` points to `/images/logo.svg`, while the live page uses `/images/logo.png`

If more Figma sections are imported right now, target the live page conventions first. Only move them into `src/components/*` after those abstractions are aligned with the real styles and tokens.

## Suggested Import Workflow

For each new Figma block:

1. Identify the section type and compare it against an existing section in `src/app/page.tsx`.
2. Scale all Figma measurements by `0.64` and snap to the nearest lower `4px` value.
3. Replace Figma token names with `--bjj-*` CSS variables.
4. Convert text into the existing semantic typography classes instead of preserving raw exported text sizes.
5. Replace repeated sibling nodes with arrays and mapped JSX.
6. Reuse existing image assets where the production design intentionally differs from Figma.
7. Only after the section visually matches the live site style should it be abstracted into atoms, molecules, or organisms.

## Quick Example

Raw Figma export:

```jsx
<div className="w-[1920px] px-48 bg-white ...">
  <div className="self-stretch h-36 ...">
    <img className="w-56 h-20" />
    <div className="w-[600px] h-16 ... bg-Primary rounded-[100px]">
      ...
    </div>
  </div>
</div>
```

Current React pattern:

```tsx
<div className="page">
  <header className="navigation">
    <div className="navigation__inner">
      <img src="/images/logo.png" className="navigation__logo" />
      <nav className="nav-bar">...</nav>
      <a className="short-button">예약하기</a>
    </div>
  </header>
</div>
```

The key transformation is:

- remove raw export wrappers
- scale down dimensions
- convert Figma colors/fonts to tokens
- collapse repeated text nodes into data-driven nav items
- use semantic classes that match the existing page system
