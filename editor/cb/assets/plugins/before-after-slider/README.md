# Before/After Slider

An image comparison slider — drag a handle to wipe between a "before" and an "after" image. Works horizontally or vertically, with optional corner labels. Good for edits/retouching, renovations, or product comparisons. Set the start position, orientation, and labels in the settings; set the two images, their alt text, and label text in the content editor.

- **Server-side required:** No — purely client-side. (Browsing for images uses the editor's own file picker / upload handler.)
- **External dependencies:** None.

## Embed code

```html
<div data-cb-type="before-after-slider" data-cb-start-position="50" data-cb-orientation="horizontal" data-cb-show-labels="true">
    <div class="ba-container">
        <div class="ba-after">
            <img src="assets/after.jpg" alt="After">
        </div>
        <div class="ba-before">
            <img src="assets/before.jpg" alt="Before">
        </div>
        <span class="ba-label-before">Before</span>
        <span class="ba-label-after">After</span>
        <div class="ba-slider">
            <div class="ba-handle"></div>
        </div>
    </div>
</div>
```

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-start-position` | 0–100 (%) | `50` | Initial wipe position |
| `data-cb-orientation` | `horizontal` / `vertical` | `horizontal` | Wipe direction (left↔right vs. top↕bottom) |
| `data-cb-show-labels` | `true` / `false` | `true` | Show the corner "before"/"after" labels |

## Structure & behavior notes

- The `.ba-before` layer sits above `.ba-after` and is revealed via `clip-path` — `mount` updates the clip and the `.ba-slider` position as you drag the `.ba-handle` (mouse **and** touch). The returned instance's `unmount()` removes the document-level move/up listeners it added.
- Both images should be the **same aspect ratio** for a clean wipe; the container is `16/9` (→ `4/3` on small screens) and images are `object-fit: cover`.
- Give both images meaningful **alt text** — set in the editor.
- The settings-panel editor uses the shared `.cbx-*` panel classes (preview + URL/browse row per image); strings run through `builder.out()` for translation.

## Dark mode

Dark mode for the rendered block is the site's responsibility. The chrome colors (container shadow, label background/text, slider line, handle) are CSS variables and `style.css` ships a ready-made dark palette **commented out** — uncomment it and point the selector at your site's theme trigger. The images themselves are unaffected.

All styling is scoped under `[data-cb-type="before-after-slider"]`.
