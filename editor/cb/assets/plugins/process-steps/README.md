# Process Steps

A numbered "how it works" sequence — horizontal (a row of steps with a connector line) or vertical (a stacked list). Add, remove, reorder, and edit steps (title + description) from the editor. Step numbers are assigned automatically from position, so reordering just works.

- **Server-side required:** No — purely client-side.
- **External dependencies:** SortableJS (loaded on demand from a CDN, editor-only, for drag-to-reorder). The rendered page needs nothing.

## Embed code

```html
<div data-cb-type="process-steps" data-cb-layout="horizontal" data-cb-connector="true" data-cb-accent-color="#3b82f6" role="list" aria-label="Process steps">
    <div class="ps-list">
        <div class="ps-step" role="listitem">
            <div class="ps-num">1</div>
            <div class="ps-body"><h3 class="ps-title">Sign up</h3><p class="ps-desc">Create your free account in seconds.</p></div>
        </div>
        <div class="ps-step" role="listitem">
            <div class="ps-num">2</div>
            <div class="ps-body"><h3 class="ps-title">Customize</h3><p class="ps-desc">Set things up the way you like.</p></div>
        </div>
        <div class="ps-step" role="listitem">
            <div class="ps-num">3</div>
            <div class="ps-body"><h3 class="ps-title">Launch</h3><p class="ps-desc">Go live and share with the world.</p></div>
        </div>
    </div>
</div>
```

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-layout` | `horizontal` / `vertical` | `horizontal` | Row of steps, or a stacked list |
| `data-cb-connector` | `true` / `false` | `true` | Show the connector line between numbers |
| `data-cb-accent-color` | any CSS color | `#3b82f6` | Number-circle color |

## Structure notes

- Each step is `.ps-step` → `.ps-num` (the circle) + `.ps-body` (`.ps-title` + `.ps-desc`). `mount` renumbers `.ps-num` by position, so you never edit numbers by hand.
- In horizontal layout, `mount` sets the grid to one column per step; below 640px it collapses to a stacked column automatically. Vertical layout is always a stacked column.
- The connector is drawn with `::before` between adjacent numbers; the number circle carries a `--ps-surface`-colored ring so the line stops cleanly at the circle. If your section background isn't white, set `--ps-surface` to match.

## Dark mode

Dark mode for the rendered block is the site's responsibility. Colors are CSS variables and `style.css` ships a ready-made dark palette **commented out** — uncomment it and point the selector at your site's theme trigger. The accent (number) color stays as configured.

All styling is scoped under `[data-cb-type="process-steps"]`.
