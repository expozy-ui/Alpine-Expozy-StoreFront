# Logo Loop

A continuously scrolling marquee of logos (or any small images) — the classic "as seen in / trusted by" strip. Add, edit, and remove logos from the content editor.

- **Server-side required:** No — purely client-side.
- **External dependencies:** None. (Uploading a logo uses the editor's own file picker / upload handler, if enabled.)

## Embed code

```html
<div data-cb-type="logo-loop" data-cb-speed="20" data-cb-direction="left" data-cb-gap="40" data-cb-pause-on-hover="true">
    <div class="logo-item"><img src="assets/logo-1.svg" alt="Acme"></div>
    <div class="logo-item"><img src="assets/logo-2.svg" alt="Globex"></div>
    <div class="logo-item"><img src="assets/logo-3.svg" alt="Initech"></div>
</div>
```

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-speed` | 5–60 (s) | `20` | Seconds for one full loop |
| `data-cb-direction` | `left` / `right` | `left` | Scroll direction |
| `data-cb-gap` | 0–200 (px) | `40` | Gap between logos |
| `data-cb-pause-on-hover` | `true` / `false` | `true` | Pause the scroll on hover |

## Structure notes

- Each logo is a `.logo-item` wrapping an `<img>`. `mount` builds a duplicated track so the loop is seamless, and swaps the source per screen where needed; the rendered element carries the `.cb-logo-loop*` (BEM-namespaced) classes.
- Give every logo meaningful **alt text** — it's shown in the editor's item list and read by screen readers.
- Respects `prefers-reduced-motion` (no animation; only the original logos show).
- The settings-panel editor uses the shared `.cbx-*` panel classes; strings run through `builder.out()` for translation.

## Theming / dark mode

Logos are your own artwork, so there's no palette to theme. The only optional touch — dimming logos slightly on a dark background — ships **commented out** in `style.css`; uncomment it and point the selector at your site's theme trigger.

Front-end styles are namespaced under the `.cb-logo-loop` class.
