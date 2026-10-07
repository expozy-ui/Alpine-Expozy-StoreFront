# Browser Mockup

Frames a screenshot inside a 3D-tilted browser/app window (with the classic three traffic-light dots) — great for showcasing a product, app, or website. Set the screenshot in the content editor; tune the tilt and size in the settings.

- **Server-side required:** No — purely client-side. (Uploading a screenshot uses the editor's own file picker / upload handler.)
- **External dependencies:** None.

## Embed code

```html
<div data-cb-type="browser-mockup" data-cb-max-width="1100" data-cb-rotate-x="8" data-cb-rotate-y="-8" data-cb-enable-hover="true">
    <div class="app-showcase">
        <div class="app-container">
            <div class="app-window">
                <div class="window-header">
                    <span class="window-dot"></span>
                    <span class="window-dot"></span>
                    <span class="window-dot"></span>
                </div>
                <div class="app-screenshot">
                    <img class="screenshot-image" src="assets/screenshot.jpg" alt="App Mockup">
                </div>
            </div>
        </div>
    </div>
</div>
```

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-max-width` | 600–1600 (px) | `1100` | Window width |
| `data-cb-rotate-x` | 0–20 (deg) | `8` | Tilt around the X axis |
| `data-cb-rotate-y` | −20–20 (deg) | `-8` | Tilt around the Y axis |
| `data-cb-enable-hover` | `true` / `false` | `true` | Ease the tilt (and slightly scale) on hover |

## Structure notes

- The frame is `.app-window` → `.window-header` (three `.window-dot`s) + `.app-screenshot` (the `<img class="screenshot-image">`). `mount` applies the tilt transform and, if enabled, the hover easing.
- Give the screenshot meaningful **alt text**.
- The settings-panel editor uses the shared `.cbx-*` panel classes; strings run through `builder.out()` for translation.

## Dark mode

Dark mode for the rendered block is the site's responsibility. Colors (the window surface, header, and screenshot backdrop) are CSS variables and `style.css` ships a ready-made dark palette **commented out** — uncomment it and point the selector at your site's theme trigger.

All styling is scoped under `[data-cb-type="browser-mockup"]`.
