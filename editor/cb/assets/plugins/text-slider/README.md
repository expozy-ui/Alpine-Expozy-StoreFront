# Text Slider

A carousel of **editable text cards** — rotating quotes, announcements, feature blurbs, or short testimonials. Set how many items show per view for a single or multi-column carousel. The text on each slide is edited **inline on the page**; slides are added, removed, and reordered from the settings panel.

- **Server-side required:** No — purely client-side.
- **External dependencies:** [Swiper](https://swiperjs.com/) 11 is loaded on demand from a CDN at runtime (cached and shared with the `swiper-slider` plugin). SortableJS is loaded from a CDN **in the editor only**, for drag-to-reorder. The rendered page needs network access to fetch Swiper.

## Embed code

```html
<div data-cb-type="text-slider" data-cb-autoplay="true" data-cb-delay="4000" data-cb-transition-speed="600" data-cb-loop="true" data-cb-pause-on-hover="true" data-cb-effect="slide" data-cb-slides-per-view="1" data-cb-space-between="24" data-cb-text-align="center" data-cb-navigation="true" data-cb-pagination="true" data-cb-background="transparent" data-cb-bg-color="#ffffff" data-cb-border="true" data-cb-border-color="#e5e7eb" data-cb-rounded="12" data-cb-accent-color="#1a1a1a">
    <div class="swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <div class="text-slide">
                    <div class="is-subblock edit">
                        <h3 class="text-slide-title">Start with a spark</h3>
                        <p class="text-slide-text">Every big idea begins small. Give yours the room to take shape.</p>
                    </div>
                </div>
            </div>
            <!-- more .swiper-slide blocks … -->
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-pagination"></div>
    </div>
</div>
```

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-autoplay` | `true`, `false` | `true` | Auto-advance slides |
| `data-cb-delay` | ms | `4000` | Time each slide is shown (autoplay on) |
| `data-cb-transition-speed` | ms | `600` | Slide transition duration |
| `data-cb-loop` | `true`, `false` | `true` | Loop back to the first slide |
| `data-cb-pause-on-hover` | `true`, `false` | `true` | Pause autoplay while hovering |
| `data-cb-effect` | `slide`, `fade` | `slide` | Transition style |
| `data-cb-slides-per-view` | `1`–`5` | `1` | Items shown per view (multi-column carousel). Dropdown 1–5. |
| `data-cb-space-between` | px | `24` | Gap between slides |
| `data-cb-text-align` | `left`, `center`, `right` | `center` | Text alignment inside each slide |
| `data-cb-navigation` | `true`, `false` | `true` | Show prev/next arrows |
| `data-cb-pagination` | `true`, `false` | `true` | Show pagination bullets |
| `data-cb-accent-color` | any CSS color | `#1a1a1a` | Active pagination bullet color. (The arrows are neutral — they inherit the text color — and are *not* affected by the accent.) |
| `data-cb-background` | `transparent`, `solid`, `glass` | `transparent` | Card **fill**. `transparent` = no fill; `glass` = fill at reduced opacity + backdrop blur. Independent of the border. |
| `data-cb-bg-color` | any CSS color | `#ffffff` | Card background color (for `solid`/`glass`) |
| `data-cb-border` | `true`, `false` | `true` | Show the card border. Independent of the background — a Transparent background keeps the border; turn this off for plain text. |
| `data-cb-border-color` | any CSS color | `#e5e7eb` | Card border color |
| `data-cb-rounded` | 0–40 (px) | `12` | Card corner radius |

## Structure notes

- `.swiper` → `.swiper-wrapper` → one `.swiper-slide` per item; each slide holds a `.text-slide` whose editable region is `.is-subblock edit` (an `<h3 class="text-slide-title">` + `<p class="text-slide-text">`). Delete the heading or paragraph if you only want one.
- Nav (`.swiper-button-prev` / `.swiper-button-next`) and `.swiper-pagination` live inside `.swiper`.
- **Background and border are independent controls.** Background sets the fill only; the border is its own on/off. So a Transparent background still shows your border — and turning the border off gives genuinely plain rotating text (not locked into a card look).
- `autoHeight` is on, so the track grows to the tallest visible slide — text of any length is fine.
- `mount` loads Swiper, sets the theming vars (`--ts-accent` + Swiper's `--swiper-pagination-color` from the accent, plus `--ts-card-bg` / `--ts-card-border` / `--ts-radius`), and configures the carousel. The arrows deliberately stay neutral — `--swiper-navigation-color` is left as `currentColor` in CSS, not tied to the accent. Background / Border / Text Align are pure CSS off the `data-cb-*` attributes.
- The settings-panel editor manages slides (add / delete / drag-reorder); it skips Swiper's loop clones (`.swiper-slide-duplicate`).

## Dark mode

Every color is a CSS variable. The stylesheet ships a commented `.dark [data-cb-type="text-slider"]` block — point its selector at whatever dark-mode trigger your site uses and uncomment it.
