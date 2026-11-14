# DESIGN.md: uxprint gallery

The gallery is a quiet frame around other people's interfaces. The previews carry the colour; the shell stays
neutral grey, flat and left-aligned. Tokens live in `src/app/globals.css`; change them here first.

## Colour

Two themes, both neutral. The system preference decides until the user picks one (stored as `uxprint-theme`).

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `canvas` | `#f6f6f5` | `#101010` | Page background |
| `surface` | `#ffffff` | `#171717` | Cards, panels, inputs, buttons |
| `sunken` | `#efefed` | `#0b0b0b` | Code blocks, demo stages, frame backdrop, hover fill |
| `line` | `#e3e3e0` | `#262626` | 1px borders and dividers |
| `line-strong` | `#cfcfcb` | `#383838` | Hovered borders, dashed empty states |
| `fg` | `#191918` | `#ededeb` | Headings and primary text |
| `fg-2` | `#52524e` | `#b4b4ae` | Body text, table values |
| `fg-3` | `#6b6b66` | `#8f8f89` | Labels, meta, placeholders (AA on canvas and surface) |
| `focus` | `#2563eb` | `#6b9bff` | 2px focus outline, 2px offset |
| `selected` / `on-selected` | `#191918` / `#ffffff` | `#ededeb` / `#101010` | Pressed chip |

Rules: no accent colour in the shell, no gradients, no glow. Print colours appear only inside previews, swatches
and specimens, painted from the print's own tokens.

## Typography

- Sans: Inter Variable (self-hosted, `@fontsource-variable/inter/opsz.css`). Mono: JetBrains Mono Variable.
- Sizes: 28px page title, 22px section title, 15-18px sub-headings, 14px body, 13px controls and tables, 12px meta.
- Weights: 400 body, 500 controls and labels, 600 headings. Nothing heavier.
- Tracking: -0.02em at 28px and up, -0.015em at 22px, 0 below.
- Token values, CSS and commands are always mono.

## Space and layout

- 4px grid. Common steps: 4, 6, 8, 12, 16, 20, 24, 32, 40.
- Page: max width 1400px, 16px gutter on phones, 24px from `sm`.
- Header: 56px, sticky, canvas at 90% with a backdrop blur, 1px `line` below.
- Print page: 200px in-page navigation column beside the content from `lg`; it is sticky, full height and never
  scrolls on its own (nine short links). On narrow screens the same links wrap as chips above the content.
- Sections are separated by a 1px `line` and 40px of space. Everything is left-aligned; nothing is centred
  except a preview inside its frame.
- No horizontal page scroll at 390px. Long values (`code`) break; wide tables sit in `overflow-x-auto`.

## Radius and depth

- 6px buttons and segmented controls, 4px their inner segments, 10px cards, panels and frames, 9999px chips.
- No shadows in the shell. Depth comes from `surface` on `canvas` and 1px `line` borders.

## Components

- **Chip** (`.chip`): 28px pill, 1px border, 13px/500. Pressed state uses `selected`. Used for filters, tags,
  screen pickers and the narrow-screen section links.
- **Button** (`.btn`): 32px, 6px radius, 1px border on `surface`, 13px/500, scale 0.97 on press.
- **Segmented control**: 32px group on `surface`; the current segment gets `sunken` and `fg`. Language and theme.
- **Copy button**: label swaps to the copied label for 1.6s inside the same grid cell, so the width never
  changes; the change is announced with `aria-live="polite"`.
- **Print card**: the image is a live composition from the print's tokens (canvas, a two-line heading in its
  type, primary and secondary buttons, a colour strip). Below it, name on the left, category and theme on the
  right. The whole card is one link. A card without a preview is not allowed.
- **Frame**: a 1440, 768 or 390px wide iframe scaled to fit, 10px radius, 1px `line`, `sunken` while loading.
- **Data table** (`.data-table`): 13px, header in `fg-3`, 1px row rules, first column in `fg`.

## Motion

- Hover colour and border: 120ms `cubic-bezier(0.25, 0.46, 0.45, 0.94)`. Press: scale 0.97 over 120ms.
- Demos never play on their own; each runs only when its Play button is pressed.
- `prefers-reduced-motion: reduce` removes shell transitions.

## Copy

- Menus, buttons and section titles in Title Case (English and Turkish).
- No slogans, helper sentences, eyebrow labels, emoji or decorative icons. If a screen needs explaining, change
  the layout instead.
- Print content (names, specs, principles) stays in English as recorded.

## Accessibility

- Skip link to `#main`, landmarks (`header`, `nav`, `main`, `aside`), one `h1` per page, ordered headings.
- Every control is a real `button`, `a` or `input`; toggles expose `aria-pressed` or `aria-checked`.
- Visible 2px focus outline on everything focusable. Text contrast AA in both themes.
