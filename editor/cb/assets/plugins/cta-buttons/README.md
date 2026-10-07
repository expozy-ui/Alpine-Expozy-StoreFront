# CTA Buttons

A pair of call-to-action buttons (primary + secondary), each independently styled — gradient, solid, outline, or ghost — with its own colors, padding, radius, font, shadow, and hover-lift. Set each button's text and link in the content editor; style them and set the row gap/alignment in the settings.

- **Server-side required:** No — purely client-side.
- **External dependencies:** None.

## Embed code

```html
<div data-cb-type="cta-buttons" data-cb-gap="16" data-cb-alignment="center"
     data-cb-primary-text="Start Building" data-cb-primary-link="#signup" data-cb-primary-style="gradient" data-cb-primary-color1="#6366f1" data-cb-primary-color2="#8b5cf6" data-cb-primary-text-color="#ffffff"
     data-cb-secondary-text="View Docs" data-cb-secondary-link="#docs" data-cb-secondary-style="outline" data-cb-secondary-color1="#e5e5e5" data-cb-secondary-color2="#cdcdcd" data-cb-secondary-text-color="#0f172a">
    <a href="#signup" class="cta-btn">Start Building</a>
    <a href="#docs" class="cta-btn">View Docs</a>
</div>
```

The first `.cta-btn` is the **primary**, the second is the **secondary**.

## Options (`data-cb-*` attributes)

**Layout:** `data-cb-gap` (px, space between buttons), `data-cb-alignment` (`flex-start` / `center` / `flex-end`).

**Per button** — replace `<prefix>` with `primary` or `secondary`:

| Attribute | Values | Description |
|---|---|---|
| `data-cb-<prefix>-style` | `gradient` / `solid` / `outline` / `ghost` | Button style |
| `data-cb-<prefix>-color1` | any CSS color | Main color (gradient start / solid / border / ghost text) |
| `data-cb-<prefix>-color2` | any CSS color | Gradient end / solid-hover / outline-hover color |
| `data-cb-<prefix>-text-color` | any CSS color | Label color |
| `data-cb-<prefix>-padding-y` / `-padding-x` | px | Vertical / horizontal padding |
| `data-cb-<prefix>-border-radius` | px | Corner radius |
| `data-cb-<prefix>-font-size` | px | Label size |
| `data-cb-<prefix>-font-weight` | `true` / `false` | Bold (600) vs. normal (400) |
| `data-cb-<prefix>-shadow` | `true` / `false` | Drop shadow |
| `data-cb-<prefix>-hover-lift` | `true` / `false` | Lift on hover |

Text/link are stored as `data-cb-<prefix>-text` / `data-cb-<prefix>-link`, but the editor writes them straight into the `.cta-btn` element (its text content and `href`).

## Structure & behavior notes

- `mount` lays out the container (flex, gap, alignment) and applies each button's style **inline** from the settings, including the hover in/out handlers. It's a fixed pair — exactly two `.cta-btn` elements (primary first).
- The settings panel for styling is auto-generated from the `settings` schema (labels translated automatically). The content editor (text + link per button) uses the shared `.cbx-*` panel classes with strings run through `builder.out()`.

## Dark mode

Button colors are your chosen settings, so they carry across light/dark. The only theme-dependent CSS is the **outline** style's surface (white on light), routed through `--cta-outline-bg`; `style.css` ships a dark value **commented out** — uncomment it and point the selector at your site's theme trigger. (Note: `mount` applies button styles inline, so the commented dark rule affects the CSS-only rendering path.)

All styling is scoped under `[data-cb-type="cta-buttons"]`.
