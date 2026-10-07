# Media Slider (Fullscreen)

A fullscreen background slideshow of images **and/or** videos, with a slow Ken-Burns zoom, a darkening overlay, and optional text content per slide. Built for hero sections — autoplay, keyboard nav, pagination dots, a slide counter, and prev/next buttons are all optional. Designed to sit inside a ContentBox section (`.is-section` / `.is-overlay`).

- **Server-side required:** No — purely client-side. (Browsing for media uses the editor's own file picker / upload handler.)
- **External dependencies:** SortableJS is loaded on demand from a CDN **in the editor only**, for drag-to-reorder. The rendered page needs nothing.

## Embed code

```html
<div data-cb-type="fullscreen-slider" data-cb-autoplay-duration="6000" data-cb-transition-speed="1200" data-cb-zoom-effect="true" data-cb-zoom-scale="108" data-cb-overlay-opacity="30">
    <div class="media-overlay"></div>
    <div class="media-slide" data-slide-id="slide-1">
        <div class="media-slide-inner">
            <img src="assets/photo-1.jpg" alt="Mountain view">
        </div>
    </div>
    <div class="media-slide" data-slide-id="slide-2">
        <div class="media-slide-inner">
            <video autoplay loop muted playsinline data-src-desktop="assets/clip.mp4"></video>
        </div>
    </div>
    <!-- more .media-slide blocks … -->
</div>
```

Each slide is `.media-slide` → `.media-slide-inner` holding an `<img>` **or** a `<video>`. A slide can also carry an `.item-content` block for overlaid text (enable "Include text overlay" when adding a slide).

## Options (`data-cb-*` attributes)

**General:** `data-cb-text-position` (`position-top-left` … `position-bottom-right`, 9 positions), `data-cb-autoplay-duration` (2000–15000ms), `data-cb-transition-speed` (300–3000ms), `data-cb-enable-keyboard` (`true`/`false`), `data-cb-pause-on-hover` (`true`/`false`).

**Controls:** `data-cb-show-counter`, `data-cb-show-nav-buttons`, `data-cb-show-pagination`, `data-cb-show-keyboard-hint` (all `true`/`false`).

**Animation:** `data-cb-zoom-effect` (`true`/`false`), `data-cb-zoom-scale` (100–120%), `data-cb-overlay-opacity` (0–70%).

### Responsive video (per `<video>`)

Videos can carry several sources as data attributes so the runtime picks the right one for the viewport: `data-src-large` (4K, >1920px), `data-src-desktop`, `data-src-tablet` (≤1280px), `data-src-mobile` (≤970px). Set these in the slide's editor.

## Structure & behavior notes

- `mount` instantiates the slider engine (`FullscreenMediaSlider`) and returns it; the engine's `unmount()` tears down its timers/listeners when the block is removed or re-rendered.
- The settings-panel editor uses the shared `.cbx-*` panel classes; strings run through `builder.out()` for translation. Each slide is a collapsible card (drag handle to reorder) with media-type toggle, image/video URL(s), and alt text.

## Dark mode

Not applicable as a CSS theme: slides are media with a configurable dark **overlay** (`overlayOpacity`) and light text, so the look is driven by your media and the overlay setting, not a light/dark palette. All styling is scoped under `[data-cb-type="fullscreen-slider"]`.
