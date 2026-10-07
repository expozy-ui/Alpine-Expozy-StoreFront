# Section Divider

A decorative in-flow divider between sections. Choose a style — plain line, dashed, dotted, gradient, three dots, a centered icon, or a centered editable label — and set the color, thickness, width, and vertical spacing.

- **Server-side required:** No — purely client-side.
- **External dependencies:** None.

## Embed code

```html
<div data-cb-type="section-divider" data-cb-style="line" data-cb-color="#d1d5db" data-cb-thickness="1" data-cb-width="100" data-cb-space="24">
    <span class="sd-line sd-line-left"></span>
    <span class="sd-center"><span class="sd-label edit">Section</span></span>
    <span class="sd-line sd-line-right"></span>
</div>
```

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-style` | `line` / `dashed` / `dotted` / `gradient` / `dots` / `icon` / `label` | `line` | Divider style |
| `data-cb-color` | any CSS color | `#d1d5db` | Line / dots / icon color |
| `data-cb-thickness` | 1–8 (px) | `1` | Line thickness |
| `data-cb-width` | 20–100 (%) | `100` | Divider width (centered when < 100%) |
| `data-cb-space` | 0–96 (px) | `24` | Vertical spacing above/below |

## Structure notes

- The block is a flex row: `.sd-line-left` + `.sd-center` + `.sd-line-right`. For plain styles the center is hidden and the two lines meet to form one continuous line; for `label` / `dots` / `icon` the center appears and the lines break around it.
- **Label** style shows `.sd-label` (inline-editable — `class="edit"`); the other styles hide it. **Dots** and **icon** are rendered with CSS (`• • •` and `✦`) in the line color.

## Dark mode

Dark mode for the rendered block is the site's responsibility. The line color is whatever you configure; only the label color has a default, and `style.css` ships a small commented-out `.dark` override for it.

All styling is scoped under `[data-cb-type="section-divider"]`.
