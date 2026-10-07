# Media Slider

A horizontal carousel of cards, each with media (image **or** video), a title, an optional description, and an optional link. Shows one or more items per view, with optional arrows, dots, counter, autoplay, loop, and touch/keyboard navigation. Good for product carousels, featured content, or galleries. Set layout and behavior in the settings; edit each card in the content editor (drag to reorder).

- **Server-side required:** No — purely client-side. (Browsing for media uses the editor's own file picker / upload handler.)
- **External dependencies:** SortableJS is loaded on demand from a CDN **in the editor only**, for drag-to-reorder. The rendered page needs nothing.

## Embed code

```html
<div data-cb-type="media-slider" data-cb-items-per-slide="1" data-cb-gap="16" data-cb-aspect-ratio="16/9" data-cb-accent-color="#0066cc" data-cb-border-color="#e5e7eb" data-cb-rounded="true" data-cb-autoplay="false" data-cb-autoplay-speed="5000" data-cb-loop="true" data-cb-pause-on-hover="true" data-cb-show-arrows="true" data-cb-show-dots="true" data-cb-show-counter="false">
    <div class="media-slider-track">
        <div class="slider-item">
            <div class="item-media">
                <img src="assets/sample.jpg" alt="Product showcase">
            </div>
            <div class="item-content">
                <h3 class="item-title">Premium Widget</h3>
                <p class="item-description">High-quality craftsmanship</p>
                <a href="/product/1" class="item-link" target="_blank" rel="noopener noreferrer">Learn More →</a>
            </div>
        </div>
        <!-- more .slider-item blocks … -->
    </div>
</div>
```

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-items-per-slide` | 1–6 | `1` | Items visible per view |
| `data-cb-gap` | 0–48 (px) | `16` | Gap between items |
| `data-cb-aspect-ratio` | `16/9`, `4/3`, `1/1`, `3/4`, `auto` | `16/9` | Card media aspect ratio (`auto` = content height) |
| `data-cb-accent-color` | any CSS color | `#0066cc` | Title-hover, link, and active-dot color; `mount` derives a lighter shade automatically |
| `data-cb-border-color` | any CSS color | `#e5e7eb` | Card border color |
| `data-cb-rounded` | `true` / `false` | `true` | Rounded card corners |
| `data-cb-autoplay` | `true` / `false` | `false` | Auto-advance |
| `data-cb-autoplay-speed` | 1000–10000 (ms) | `5000` | Autoplay interval |
| `data-cb-loop` | `true` / `false` | `true` | Wrap around at the ends |
| `data-cb-pause-on-hover` | `true` / `false` | `true` | Pause autoplay while hovered |
| `data-cb-show-arrows` | `true` / `false` | `true` | Show prev/next arrows |
| `data-cb-show-dots` | `true` / `false` | `true` | Show dot indicators |
| `data-cb-show-counter` | `true` / `false` | `false` | Show an "x / n" counter |

## Structure notes

- Each card is `.slider-item` → `.item-media` (holds an `<img>` or `<video>`) + `.item-content` (`.item-title`, optional `.item-description`, optional `a.item-link`).
- Media auto-switches between image and video by file extension (`.mp4/.webm/.ogg/.mov` → `<video>`). Give each image meaningful **alt text**.
- Links open in a new tab with `rel="noopener noreferrer"`.
- `mount` builds the arrows/dots/counter, wires autoplay, touch swipe, keyboard (←/→) and screen-reader announcements, applies the per-item width and aspect ratio, and sets `--accent-color` / `--accent-color-light` (and `--ms-card-border` when Border Color is set) on the container. Rounded Corners is pure CSS off the `data-cb-rounded` attribute. Its returned instance's `destroy()` clears the autoplay timer and touch listeners on `unmount`.
- The settings-panel editor uses the shared `.cbx-*` panel classes; strings run through `builder.out()` for translation.

## Dark mode

Dark mode for the rendered block is the site's responsibility. The card and control palette (surfaces, borders, media backdrop, title, description, arrows, dots, counter) is a set of CSS variables and `style.css` ships a ready-made dark palette **commented out** — uncomment it and point the selector at your site's theme trigger. The accent color stays as configured.

All styling is scoped under `[data-cb-type="media-slider"]`.
