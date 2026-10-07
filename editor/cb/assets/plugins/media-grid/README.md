# Media Grid

A masonry-style grid of images and videos, each with an optional hover caption (title, description, link) and optional lightbox. Add, remove, reorder, and edit items from the content editor.

- **Server-side required:** No — purely client-side. (Uploading media uses the editor's own file picker / upload handler.)
- **External dependencies:** SortableJS (loaded on demand from a CDN, editor-only, for drag-to-reorder). The rendered page needs nothing.

## Embed code

```html
<div data-cb-type="media-grid" data-cb-columns="3" data-cb-gap="16" data-cb-padding="0" data-cb-rounded="8" data-cb-content-theme="dark">
    <div class="gallery-item">
        <img src="assets/photo-1.jpg" alt="A description">
        <div class="item-content">
            <h4>Title</h4>
            <div>A short caption.</div>
            <a class="item-link" href="https://example.com">Learn More →</a>
        </div>
    </div>
    <div class="gallery-item">
        <img src="assets/photo-2.jpg" alt="">
    </div>
</div>
```

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-columns` | 1–6 | `3` | Number of columns |
| `data-cb-gap` | 0–48 (px) | `16` | Gap between items |
| `data-cb-padding` | 0–48 (px) | `0` | Padding around the grid |
| `data-cb-rounded` | 0–24 (px) | `8` | Item corner radius |
| `data-cb-content-theme` | `dark` / `light` | `dark` | Caption color theme |

## Structure notes

- Each item is `.gallery-item` containing an `<img>` or `<video>`, plus an optional `.item-content` caption (`<h4>` title, `<div>` description, `<a class="item-link">`). The caption reveals on hover.
- Paste an image or a **video** URL (`.mp4/.webm/.ogg/.mov`) — the editor swaps the media type automatically. Images can also be wrapped in an `<a class="is-lightbox">` for a lightbox.
- The settings-panel editor uses the shared `.cbx-*` panel classes; strings run through `builder.out()` for translation.

## Theming / dark mode

The grid is media-first, so there's no fixed color palette to theme. The only colors are the **caption**, controlled by the **Caption Theme** setting (dark/light) via CSS variables (`--caption-background` / `--caption-color`), so pick whichever reads best over your images.

All styling is scoped under `[data-cb-type="media-grid"]`.
