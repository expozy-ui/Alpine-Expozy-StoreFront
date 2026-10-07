# Floating Showcase

A 3D showcase of images or videos (screenshots of your work) floating in perspective — they drift slowly, shift with the cursor (parallax), gently tilt as a group, and the one you hover scales forward while the others recede. Great for a portfolio hero or a "featured work" strip. Images stay real, SEO-friendly HTML, and each item can link out.

- **Server-side required:** No — purely client-side. (Browsing for images uses the editor's own file picker / upload handler.)
- **External dependencies:** SortableJS is loaded on demand from a CDN **in the editor only**, for drag-to-reorder. The rendered page needs nothing.

## Embed code

Give the block a height. Each item is an `.fg-item` inside the `.fg-stage`; mark one `fg-featured` to center it.

```html
<div data-cb-type="floating-showcase" data-cb-transparent-bg="false" data-cb-bg-color="#0b0b12" data-cb-corner-radius="12" data-cb-shadow="true" data-cb-drift="45" data-cb-parallax="55" data-cb-depth="50" data-cb-spread="100" style="min-height: 560px;">
    <div class="fg-stage">
        <div class="fg-item fg-featured">
            <a class="fg-card"><img class="fg-img" src="assets/minimalist-blocks/images/ai-01Opn.jpg" alt="Project one"></a>
        </div>
        <div class="fg-item">
            <a class="fg-card" href="https://example.com" target="_blank" rel="noopener noreferrer"><img class="fg-img" src="assets/minimalist-blocks/images/ai-0Yhoi.jpg" alt="Project two"></a>
        </div>
        <div class="fg-item">
            <a class="fg-card"><img class="fg-img" src="assets/minimalist-blocks/images/ai-1ANxo.jpg" alt="Project three"></a>
        </div>
    </div>
</div>
```

Each item is `.fg-item` → `.fg-card` (the visual card; add an `href` to make it a link) → `.fg-img`. A card without `href` is just a container.

### Using a video

An item can be a video instead of an image — pick a video in the editor's browse dialog, or write it by hand. Videos autoplay muted and loop (no controls — they're decorative tiles), so they float exactly like the image cards:

```html
<div class="fg-item">
    <a class="fg-card">
        <video class="fg-img fg-video" muted loop autoplay playsinline aria-label="Reel">
            <source src="assets/minimalist-blocks/images/ai-cQ5ST.mp4" type="video/mp4">
        </video>
    </a>
</div>
```

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-transparent-bg` | `true` / `false` | `true` | Transparent stage background (set `false` to use the color below) |
| `data-cb-bg-color` | any CSS color | `#0b0b12` | Background color when not transparent |
| `data-cb-corner-radius` | 0–40 (px) | `12` | Card corner radius |
| `data-cb-shadow` | `true` / `false` | `true` | Card drop shadow |
| `data-cb-featured-size` | 80–400 (px) | `135` | Width of a `fg-featured` card (still capped by 40vw on narrow screens) |
| `data-cb-drift` | 0–100 (%) | `45` | Ambient float amount/speed (slow) |
| `data-cb-parallax` | 0–100 (%) | `55` | How much the cursor shifts and tilts the scene |
| `data-cb-depth` | 0–100 (%) | `50` | 3D depth strength (higher = more dramatic) |
| `data-cb-spread` | 50–150 (%) | `100` | How far apart the cards are arranged |
| `data-cb-dim-others` | `true` / `false` | `true` | Dim & blur the other cards while one is hovered |
| `data-cb-hover-speed` | `fast` / `normal` / `slow` / `slower` | `normal` | How quickly the hovered card scales/eases forward |

Mark an item **featured** (add `fg-featured` to its `.fg-item`, or tick "Featured" in the editor) to center it; its width is set by the **Featured Size** option (`data-cb-featured-size`, default `135px`). Front-to-back overlap follows document order (later items sit in front), so `Depth` only changes size/distance — it never re-orders which card overlaps which.

## Structure & behavior notes

- `mount` gives each card a slot in 3D (a golden-angle scatter, featured cards centered), sizes them front-to-back by document order (so overlap never changes when `Depth` changes), then runs a `requestAnimationFrame` loop that drifts each card, applies cursor **parallax by depth** (closer cards move more), tilts the whole `.fg-stage` toward the pointer, and eases the hovered card forward. The returned instance's `destroy()` (on `unmount`) cancels the loop and removes all listeners — no leaks.
- **Hover a card** to bring it forward — it scales up and (unless `dimOthers` is off) the others dim back. `hoverSpeed` sets how quickly that scale/ease happens, and the dim fade matches it. Hover is resolved from the topmost card under the pointer, so it stays reliable even where cards overlap. If a card has a link, clicking it navigates there.
- Non-featured cards are small and scattered toward the edges; a `fg-featured` card is centered.
- Positions are computed from the stage size, so it re-flows on resize.
- **Before** `mount` runs, the cards fall back to a simple centered flow layout (so they're never a broken pile); `mount` switches them to the floating 3D layout.
- Respects `prefers-reduced-motion`: drift and parallax are disabled (cards sit still), and hover still works gently.
- **Images and videos** are interchangeable: paste (or browse to) an image URL and the item is an `<img>`; paste a video URL (`.mp4` / `.webm` / `.ogg` / `.mov`) and it becomes an autoplaying, muted, looping `<video>` — same floating, hover, and link behavior. The **Alt / Label** field is the image's `alt` for images and the video's `aria-label` for videos (both optional). **Link** works the same for either.
- **Tip:** videos autoplay and loop, so a few are fine but many at once can slow the page. Favor mostly images, with video used sparingly.
- The settings-panel editor uses the shared `.cbx-*` panel classes; strings run through `builder.out()` for translation. Add / remove / reorder items, and per item set the image/video URL, alt/label, an optional link, and the featured flag.

## Dark mode

Not a separate CSS theme — leave **Transparent Background** on to sit over your own section, or turn it off and pick a **Background Color** (e.g. a dark tone for a hero). All styling is scoped under `[data-cb-type="floating-showcase"]`.
