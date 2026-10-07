# Simple Stats

A clean row of headline numbers, each with a label — no icons, optional vertical dividers between them. Numbers count up from zero when they scroll into view, and support a prefix/suffix (e.g. `$`, `+`, `%`) and non-numeric values like `24/7`. Good for quick "by the numbers" strips. Set layout, animation, and sizes in the settings; edit each stat in the content editor.

- **Server-side required:** No — purely client-side.
- **External dependencies:** None.

## Embed code

```html
<div data-cb-type="simple-stats" data-cb-alignment="center" data-cb-duration="2" data-cb-delay="0.1" data-cb-easing="ease-out" data-cb-number-size="60" data-cb-label-size="14" data-cb-show-dividers="true">
    <div class="stat-item" data-target="250" data-prefix="" data-suffix="+">
        <div class="stat-number">250</div>
        <div class="stat-label">Projects Delivered</div>
    </div>
    <!-- more .stat-item blocks … -->
</div>
```

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-columns` | 1–6 | `4` | Intended stats per row (the row is flexible and wraps) |
| `data-cb-alignment` | `left` / `center` / `right` | `center` | Text alignment within each stat |
| `data-cb-duration` | 0.5–5 (s) | `2` | Count-up animation duration |
| `data-cb-delay` | 0–1 (s) | `0.1` | Stagger delay between stats |
| `data-cb-easing` | `linear` / `ease-out` / `ease-in-out` | `ease-out` | Count-up easing |
| `data-cb-number-size` | 24–96 (px) | `60` | Number font size |
| `data-cb-label-size` | 12–24 (px) | `14` | Label font size |
| `data-cb-show-dividers` | `true` / `false` | `true` | Vertical divider between stats (becomes a horizontal rule when stacked on mobile) |

### Per-stat attributes (`.stat-item`)

| Attribute | Description |
|---|---|
| `data-target` | The value to count up to — numeric (`250`, `4.9`) or free text (`24/7`, shown as-is) |
| `data-prefix` | Text before the number (e.g. `$`) |
| `data-suffix` | Text after the number (e.g. `+`, `%`, `K`) |

## Structure & behavior notes

- The count-up runs once, triggered by an `IntersectionObserver` (threshold 0.3) when the stat scrolls in. If `data-target` isn't numeric (e.g. `24/7`), it's shown verbatim with any prefix/suffix. Numbers use `font-variant-numeric: tabular-nums` so they don't jitter while animating.
- `mount` lays out the row (flex, wrapping), applies alignment/sizes/dividers inline, and returns an instance whose `destroy()` disconnects the observer; the module's `unmount` calls it on teardown.
- The settings-panel editor uses the shared `.cbx-*` panel classes; strings run through `builder.out()` for translation. Each stat is a collapsible card with fields for target number, prefix, suffix, and label.

## Dark mode

Dark mode for the rendered block is the site's responsibility. The number and label colors are CSS variables and `style.css` ships a ready-made dark palette **commented out** — uncomment it and point the selector at your site's theme trigger. (The divider color is applied inline by `mount`; the commented block's `border-color` rule recolors it for dark.)

All styling is scoped under `[data-cb-type="simple-stats"]`.
