# Chart

A dependency-free chart — **bar**, **line**, or **donut** — rendered with plain SVG + CSS. No Chart.js, no CDN, nothing loaded at runtime. Edit the data (label + value, add/remove/reorder) from the content editor. The chart intentionally has no built-in title — add a heading above the block with the normal editor for full formatting control.

- **Server-side required:** No — purely client-side.
- **External dependencies:** SortableJS (loaded on demand from a CDN, editor-only, for drag-to-reorder). The rendered page needs nothing.

## Embed code

```html
<div data-cb-type="chart" data-cb-chart-type="bar" data-cb-accent-color="#3b82f6" data-cb-height="320" data-cb-show-values="true" data-cb-show-grid="true">
    <ul class="chart-data">
        <li data-value="40">Jan</li>
        <li data-value="65">Feb</li>
        <li data-value="52">Mar</li>
        <li data-value="78">Apr</li>
        <li data-value="90">May</li>
    </ul>
    <div class="chart-canvas" aria-hidden="true"></div>
</div>
```

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-chart-type` | `bar` / `line` / `donut` | `bar` | Chart type |
| `data-cb-accent-color` | any CSS color | `#3b82f6` | Bar / line color (donut uses a fixed palette) |
| `data-cb-height` | number (px) | `320` | Plot height (also caps the donut size) |
| `data-cb-show-values` | `true` / `false` | `true` | Show numeric values / donut total |
| `data-cb-show-grid` | `true` / `false` | `true` | Horizontal gridlines (bar / line) |

## Structure & data

- The `<ul class="chart-data">` is the **single source of truth** (`<li data-value="65">Feb</li>`). It's visually hidden but kept in the accessibility tree, so the chart has a real text alternative. `mount` reads it and paints into `.chart-canvas` (which is `aria-hidden`).
- **Bar/line** use the accent color; **donut** slices come from a fixed 10-color palette. Line uses a `preserveAspectRatio="none"` SVG with a non-scaling stroke plus HTML dot markers, so it stays crisp and responsive.

## Dark mode

Dark mode for the rendered block is the site's responsibility. Colors are CSS variables and `style.css` ships a ready-made dark palette **commented out** — uncomment it and point the selector at your site's theme trigger.

All styling is scoped under `[data-cb-type="chart"]`.
