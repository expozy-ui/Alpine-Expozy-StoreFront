# Slider (Swiper)

A full-featured image/video slider built on [Swiper](https://swiperjs.com/): autoplay, loop, transition effects, zoom, navigation, pagination, captions with positioning, and **responsive video sources** (a different video per screen size).

- **Server-side required:** No.
- **External dependencies (runtime):** **Swiper 11** — `mount` loads `swiper-bundle.min.js` + `swiper-bundle.min.css` from a CDN on demand, so the live page needs internet (or self-host Swiper and point the URLs at your copy). SortableJS is also loaded on demand, but editor-only (drag-to-reorder).

## Embed code

```html
<div data-cb-type="swiper-slider" data-cb-autoplay="true" data-cb-loop="true" data-cb-effect="slide" data-cb-navigation="true" data-cb-pagination="true">
    <div class="swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <div class="slide-image">
                    <img src="assets/slide-1.jpg" alt="A description">
                    <div class="slide-overlay"></div>
                    <div class="slide-caption">
                        <div class="is-subblock edit">
                            <h3 class="slide-caption-title">Title</h3>
                            <p class="slide-caption-description">A short caption.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="swiper-slide">
                <div class="slide-image"><img src="assets/slide-2.jpg" alt=""></div>
            </div>
        </div>
    </div>
</div>
```

## Options (`data-cb-*` attributes)

Grouped as **Behavior** and **Layout** in the settings panel. The main ones:

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-autoplay` / `data-cb-delay` | bool / ms | `true` / `3000` | Autoplay + delay |
| `data-cb-loop` / `data-cb-pause-on-hover` | bool | `true` / `true` | Loop; pause on hover |
| `data-cb-effect` | `slide`/`fade`/`cube`/`coverflow`/`flip` | `slide` | Transition effect |
| `data-cb-transition-speed` | ms | `800` | Transition duration |
| `data-cb-zoom-effect` / `data-cb-zoom-scale` | bool / % | `true` / `108` | Ken-Burns zoom on the active slide |
| `data-cb-aspect-ratio` | `16/9`, `4/3`, `1/1`, `3/4`, `auto` | `16/9` | Slide aspect ratio |
| `data-cb-slides-per-view` / `data-cb-space-between` | number / px | `1` / `0` | Slides shown; gap |
| `data-cb-text-position` | `position-…` (9 anchors) | `position-bottom-left` | Caption placement |
| `data-cb-navigation` / `data-cb-navigation-style` | bool / `transparent`,`solid`,`arrow` | `true` / `transparent` | Prev/next arrows |
| `data-cb-pagination` / `data-cb-pagination-style` | bool / `dots`,`rounded-rectangle`,`lines` | `true` / `dots` | Pagination |

## Structure notes

- Each slide is `.swiper-slide` → `.slide-image` containing an `<img>` **or** `<video>`, an optional `.slide-overlay`, and an optional `.slide-caption` (rich-text `.is-subblock edit`). The caption is edited inline; everything else via the content editor.
- **Responsive video:** a slide's `<video>` can carry `data-src-large` / `data-src-desktop` / `data-src-tablet` / `data-src-mobile`; `mount` swaps the `<source>` to the best match for the viewport (and on resize). Set these per slide in the editor.
- The settings-panel editor uses the shared `.cbx-*` panel classes; strings run through `builder.out()` for translation.

## Theming / dark mode

The slider is media-first (images/videos with caption overlays), so there's no fixed color palette to theme — the overlay/caption colors are neutral over your media. All styling is scoped under `[data-cb-type="swiper-slider"]`.
