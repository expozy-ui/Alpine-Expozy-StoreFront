# Marquee Wall

A "wall of work": several columns of images (or videos) scrolling continuously, with columns alternating direction at slightly different speeds — a lively portfolio band or hero. You add one flat list of media; it splits them across the columns and loops each seamlessly. Images stay real, SEO-friendly HTML, and each item can link out.

- **Server-side required:** No — purely client-side. (Browsing for images uses the editor's own file picker / upload handler.)
- **External dependencies:** SortableJS is loaded on demand from a CDN **in the editor only**, for drag-to-reorder. The rendered page needs nothing.

## Embed code

Put every image as a `.mw-item` inside the single `.mw-wall` — they're distributed across the columns automatically. Give the block a height with the `Height` option.

```html
<div data-cb-type="marquee-wall" data-cb-columns="3" data-cb-gap="16" data-cb-height="520" data-cb-corner-radius="12" data-cb-shadow="true" data-cb-transparent-bg="true" data-cb-speed="45" data-cb-direction="alternate" data-cb-pause-on-hover="true" data-cb-fade-edges="true" data-cb-tilt-x="0" data-cb-tilt-y="-8" data-cb-perspective="1600">
    <div class="mw-wall">
        <div class="mw-item"><a class="mw-card"><img class="mw-img" src="assets/minimalist-blocks/images/ai-01Opn.jpg" alt="Project one"></a></div>
        <div class="mw-item"><a class="mw-card" href="https://example.com" target="_blank" rel="noopener noreferrer"><img class="mw-img" src="assets/minimalist-blocks/images/ai-0Yhoi.jpg" alt="Project two"></a></div>
        <div class="mw-item"><a class="mw-card"><img class="mw-img" src="assets/minimalist-blocks/images/ai-1ANxo.jpg" alt="Project three"></a></div>
        <div class="mw-item"><a class="mw-card"><img class="mw-img" src="assets/minimalist-blocks/images/ai-1owT9.jpg" alt="Project four"></a></div>
        <div class="mw-item"><a class="mw-card"><img class="mw-img" src="assets/minimalist-blocks/images/ai-2JkRP.jpg" alt="Project five"></a></div>
        <div class="mw-item"><a class="mw-card"><img class="mw-img" src="assets/minimalist-blocks/images/ai-2K7j5.jpg" alt="Project six"></a></div>
    </div>
</div>
```

Each item is `.mw-item` → `.mw-card` (add an `href` to make it a link) → `.mw-img`. Use enough items to fill the columns nicely (roughly 2–3 per column).

### Using a video

An item can be a video instead of an image — pick a video in the editor's browse dialog, or write it by hand. Videos autoplay muted and loop (no controls — they're decorative tiles), so they behave just like the image tiles:

```html
<div class="mw-item">
    <a class="mw-card">
        <video class="mw-video" muted loop autoplay playsinline aria-label="Reel">
            <source src="assets/minimalist-blocks/images/ai-cQ5ST.mp4" type="video/mp4">
        </video>
    </a>
</div>
```

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-columns` | 2–5 | `3` | Number of scrolling columns |
| `data-cb-gap` | 0–48 (px) | `16` | Gap between images and columns |
| `data-cb-height` | 240–900 (px) | `520` | Height of the wall band |
| `data-cb-corner-radius` | 0–40 (px) | `12` | Image corner radius |
| `data-cb-shadow` | `true` / `false` | `true` | Card drop shadow |
| `data-cb-transparent-bg` | `true` / `false` | `true` | Transparent block background (set `false` to use the color below) |
| `data-cb-bg-color` | any CSS color | `#0b0b12` | Background color when not transparent |
| `data-cb-speed` | 0–100 (%) | `45` | Scroll speed |
| `data-cb-direction` | `alternate` / `up` / `down` | `alternate` | Column direction (`alternate` = odd columns go the other way) |
| `data-cb-pause-on-hover` | `true` / `false` | `true` | Pause the scrolling while hovering the wall |
| `data-cb-fade-edges` | `true` / `false` | `true` | Soft fade at the top and bottom edges |
| `data-cb-tilt-x` | -70–70 (°) | `0` | 3D tilt up/down (`rotateX`); `0` = none |
| `data-cb-tilt-y` | -70–70 (°) | `-8` | 3D tilt left/right (`rotateY`); `0` = none |
| `data-cb-perspective` | 100–1600 (px) | `1600` | Perspective depth for the tilt (lower = stronger) |
| `data-cb-offset-y` | -120–120 (px) | `0` | Nudge the wall up (negative) or down (positive) to balance it against neighbouring text — doesn't affect layout |

## Structure & behavior notes

- `mount` moves the flat `.mw-item` list into the columns (round-robin), then for each column repeats the images to fill the height and duplicates them into two identical halves. It animates each column by exactly one half, so the loop is seamless with no jump. Columns alternate direction and run at slightly different speeds. It re-measures on resize (`ResizeObserver`) and after images load, so the loop stays gap-free.
- `destroy()` (on `unmount`) disconnects the observer, removes the clones and column wrappers, and restores the original flat list — so re-editing and re-saving always work from a clean source.
- **Pause on hover** stops the motion so a visitor can read a card; hovering an image lifts it slightly, and a linked card navigates on click.
- **Before** `mount` runs, the images fall back to a simple centered vertical stack (never a broken layout).
- **Optional 3D tilt** (`tiltX` / `tiltY` / `perspective`) rotates the whole wall for a "designed object" look — perspective is set on the block and the rotation on the wall (like the browser-mockup plugin). Keep the angles small so the images stay readable; set both to `0` for a flat wall.
- Respects `prefers-reduced-motion`: scrolling is disabled and the wall shows a static stack of the images.
- **Images and videos** are interchangeable: paste (or browse to) an image URL and the item is an `<img>`; paste a video URL (`.mp4` / `.webm` / `.ogg` / `.mov`) and it becomes an autoplaying, muted, looping `<video>` — same size, hover, and link behavior. The **Alt / Label** field is the image's `alt` for images and the video's `aria-label` for videos (both optional). **Link** works the same for either.
- **Tip:** videos autoplay and loop, so a few are fine but many at once can slow the page. Favor mostly images, with video used sparingly.
- The settings-panel editor uses the shared `.cbx-*` panel classes; strings run through `builder.out()` for translation. Add / remove / reorder items, and per item set the image/video URL, alt/label, and an optional link.

## Dark mode

Not a separate CSS theme — leave **Transparent Background** on to sit over your own section, or turn it off and pick a **Background Color** (a dark tone suits a hero). All styling is scoped under `[data-cb-type="marquee-wall"]`.
