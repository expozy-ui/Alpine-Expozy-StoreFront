# Animated Stats

A row of statistics that count up from zero when they scroll into view. Each stat has an icon (emoji, icon font, or inline SVG), a target number with optional prefix/suffix, and a label. Good for "trusted by", results, or key metrics. Set columns, alignment, animation timing, and sizes in the settings; edit each stat in the content editor.

- **Server-side required:** No — purely client-side.
- **External dependencies:** None required. Icon fonts (Bootstrap Icons, Tabler, Lucide, …) render if the host page already loads them; Lucide icons are refreshed automatically when `window.lucide` is present.

## Embed code

```html
<div data-cb-type="animated-stats" data-cb-columns="4" data-cb-alignment="center" data-cb-variant="cards" data-cb-background="solid" data-cb-bg-color="#ffffff" data-cb-border-color="#e5e7eb" data-cb-gap="32" data-cb-hover="lift" data-cb-rounded="true" data-cb-duration="2" data-cb-delay="0.1" data-cb-easing="ease-out" data-cb-show-icon="true" data-cb-icon-size="48" data-cb-number-size="42" data-cb-number-weight="500" data-cb-label-size="16">
    <div class="stat-item" data-target="1000" data-prefix="" data-suffix="+">
        <div class="stat-icon" data-icon-type="emoji">📊</div>
        <div class="stat-number">1000</div>
        <div class="stat-label">Happy Clients</div>
    </div>
    <!-- more .stat-item blocks … -->
</div>
```

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-columns` | 1–6 | `4` | Number of columns |
| `data-cb-alignment` | `left` / `center` / `right` | `center` | Text/content alignment within each stat |
| `data-cb-variant` | `cards` / `minimal` / `divided` | `cards` | Style: bordered cards, plain (no card), or vertical dividers between columns |
| `data-cb-background` | `solid` / `transparent` / `glass` | `solid` | Card background (Cards style): solid fill, see-through, or frosted glass (backdrop blur) |
| `data-cb-bg-color` | any CSS color | `#ffffff` | Card background / glass tint color |
| `data-cb-border-color` | any CSS color (alpha OK) | `#e5e7eb` | Card border color; use a translucent or transparent value to soften / remove it |
| `data-cb-gap` | 0–80 (px) | `32` | Gap between stats |
| `data-cb-hover` | `none` / `lift` / `lift-shadow` | `lift` | Hover: none, lift, or lift + shadow (shadow on Cards only). Stats also zoom the icon |
| `data-cb-rounded` | `true` / `false` | `true` | Rounded card corners (Cards style); `false` = square |
| `data-cb-duration` | 0.5–5 (s) | `2` | Count-up animation duration |
| `data-cb-delay` | 0–1 (s) | `0.1` | Stagger delay between stats |
| `data-cb-easing` | `linear` / `ease-out` / `ease-in-out` | `ease-out` | Count-up easing |
| `data-cb-show-icon` | `true` / `false` | `true` | Show the icon above each number |
| `data-cb-icon-size` | 24–96 (px) | `48` | Icon size (applied to emoji & icon fonts; SVGs use their own size) |
| `data-cb-number-size` | 24–120 (px) | `42` | Number font size |
| `data-cb-number-weight` | `300`–`700` | `500` | Number font weight (Light → Bold) |
| `data-cb-number-color` | any CSS color | *(inherit)* | Number color; empty = inherit the section's text color |
| `data-cb-label-size` | 12–24 (px) | `16` | Label font size |

### Per-stat attributes (`.stat-item`)

| Attribute | Description |
|---|---|
| `data-target` | The number to count up to (supports decimals, e.g. `4.9`) |
| `data-prefix` | Text shown before the number (e.g. `$`) |
| `data-suffix` | Text shown after the number (e.g. `+`, `%`, `K`) |

The `.stat-icon` holds an emoji, an inline `<svg>`, or an icon tag (`<i class="bi bi-heart-fill"></i>`); its `data-icon-type` records which, so sizing is applied correctly.

## Structure & behavior notes

- The count-up runs once, triggered by an `IntersectionObserver` (threshold 0.3) when the stat scrolls into view. The returned instance's `destroy()` disconnects the observer on `unmount`.
- Numbers keep one decimal place if `data-target` has a decimal, otherwise they're floored — and use `font-variant-numeric: tabular-nums` so they don't jitter while animating.
- The settings-panel editor uses the shared `.cbx-*` panel classes; strings run through `builder.out()` for translation. The per-stat editor includes a live icon preview and an icon-picker (`builder.openIconPicker`).

## Dark mode

Dark mode for the rendered block is the site's responsibility. The card palette (surface, border, number, label) is a set of CSS variables and `style.css` ships a ready-made dark palette **commented out** — uncomment it and point the selector at your site's theme trigger.

All styling is scoped under `[data-cb-type="animated-stats"]`. The **Style** option (`data-cb-variant`) switches between `cards` (bordered), `minimal` (no card), and `divided` (vertical rules between columns) — e.g. for a clean, icon-less figures row set `variant="divided"`, `show-icon="false"`, a larger `number-size`, and a lighter `number-weight`.
