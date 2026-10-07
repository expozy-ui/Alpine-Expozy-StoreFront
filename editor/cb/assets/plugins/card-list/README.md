# Card List

A responsive grid of cards, each with media (image **or** video), a title, an optional description, and an optional link. Good for product listings, feature grids, portfolios, or team members. Set the number of columns, gap, and card aspect ratio in the settings; edit each card's content in the content editor (drag to reorder).

- **Server-side required:** No — purely client-side. (Browsing for media uses the editor's own file picker / upload handler.)
- **External dependencies:** SortableJS is loaded on demand from a CDN **in the editor only**, for drag-to-reorder. The rendered page needs nothing.

## Embed code

```html
<div data-cb-type="card-list" data-cb-items-per-row="3" data-cb-gap="16" data-cb-aspect-ratio="16/9" data-cb-accent-color="#0066cc">
    <div class="card-list-grid">
        <div class="card-item">
            <div class="item-media">
                <img src="assets/sample.jpg" alt="Sample Title">
            </div>
            <div class="item-content">
                <h3 class="item-title">Sample Title</h3>
                <p class="item-description">Description</p>
                <a href="/product/1" class="item-link" target="_blank" rel="noopener noreferrer">Learn More →</a>
            </div>
        </div>
        <!-- more .card-item blocks … -->
    </div>
</div>
```

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-items-per-row` | 1–6 | `3` | Number of columns |
| `data-cb-gap` | 0–48 (px) | `16` | Gap between cards |
| `data-cb-aspect-ratio` | `16/9`, `4/3`, `1/1`, `3/4`, `auto` | `16/9` | Card media aspect ratio (`auto` = content height) |
| `data-cb-background` | `solid`, `transparent`, `glass` | `solid` | Card fill. `glass` = fill at reduced opacity + backdrop blur |
| `data-cb-bg-color` | any CSS color | `#ffffff` | Card background color (for the `solid`/`glass` backgrounds) |
| `data-cb-border-color` | any CSS color | `#e5e7eb` | Card border color |
| `data-cb-hover` | `none`, `lift`, `lift-shadow` | `lift-shadow` | Hover behavior of the card |
| `data-cb-rounded` | `true`, `false` | `true` | Rounded card corners |
| `data-cb-accent-color` | any CSS color | `#0066cc` | Title-hover and link color; `mount` derives a lighter shade automatically |

## Structure notes

- Each card is `.card-item` → `.item-media` (holds an `<img>` or `<video>`) + `.item-content` (`.item-title`, optional `.item-description`, optional `a.item-link`).
- Media auto-switches between image and video by file extension (`.mp4/.webm/.ogg/.mov` → `<video>`). Give each image meaningful **alt text**.
- Links open in a new tab with `rel="noopener noreferrer"`.
- `mount` applies the grid columns, gap, and per-card aspect ratio, and sets `--accent-color` / `--accent-color-light` on the container. Background Color / Border Color, when set, override `--cl-card-bg` / `--cl-card-border`; left empty they fall back to the stylesheet defaults. Background / Hover / Rounded are pure CSS off the `data-cb-*` attributes.
- The settings-panel editor uses the shared `.cbx-*` panel classes; strings run through `builder.out()` for translation.

## Dark mode

Dark mode for the rendered block is the site's responsibility. The card palette (surface, border, media backdrop, title, description) is a set of CSS variables and `style.css` ships a ready-made dark palette **commented out** — uncomment it and point the selector at your site's theme trigger. The accent color stays as configured.

All styling is scoped under `[data-cb-type="card-list"]`.
