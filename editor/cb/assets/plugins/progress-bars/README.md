# Progress / Skill Bars

A list of labelled bars with a percentage each. The fill animates in when the block scrolls into view. Add / remove / reorder bars and set each label + percentage from the editor.

- **Server-side required:** No — purely client-side.
- **External dependencies:** None at runtime. (The editor loads SortableJS from a CDN on demand, only for drag-to-reorder.)

## Embed code

```html
<div data-cb-type="progress-bars" data-cb-accent-color="#3b82f6" data-cb-show-percent="true" data-cb-animate="true" data-cb-size="medium" data-cb-rounded="true" role="group" aria-label="Skills">
    <div class="pb-list">
        <div class="pb-item">
            <div class="pb-head"><span class="pb-label">HTML &amp; CSS</span><span class="pb-percent">90%</span></div>
            <div class="pb-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="90">
                <div class="pb-fill" data-value="90" style="width:90%"></div>
            </div>
        </div>
        <div class="pb-item">
            <div class="pb-head"><span class="pb-label">JavaScript</span><span class="pb-percent">80%</span></div>
            <div class="pb-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="80">
                <div class="pb-fill" data-value="80" style="width:80%"></div>
            </div>
        </div>
    </div>
</div>
```

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-size` | `small` / `medium` / `large` | `medium` | Bar height |
| `data-cb-show-percent` | `true` / `false` | `true` | Show the percentage label |
| `data-cb-animate` | `true` / `false` | `true` | Animate the fill when it first scrolls into view |
| `data-cb-accent-color` | any CSS color | `#3b82f6` | Fill color |
| `data-cb-rounded` | `true` / `false` | `true` | Rounded vs square bar ends |

## Structure notes

- Each bar is a `.pb-item`: a `.pb-head` (`.pb-label` + `.pb-percent`) and a `.pb-track` containing a `.pb-fill`.
- **The percentage lives on `.pb-fill` as `data-value` (0–100)**, with a matching inline `width` (so it's correct without JS). The `.pb-track` carries `role="progressbar"` + `aria-valuenow`. Use the editor's Percentage field rather than hand-editing.
- With `animate` on, `mount` starts each fill at 0 and grows it to `data-value%` when the block enters the viewport (via `IntersectionObserver`). Reduced-motion users get the final value with no animation.

## Dark mode

Dark mode for the rendered block is the site's responsibility. Colors are CSS variables and `style.css` ships a ready-made dark palette **commented out** — uncomment it and point the selector at your site's theme trigger. The accent (fill) color stays as configured.

All styling is scoped under `[data-cb-type="progress-bars"]`.
