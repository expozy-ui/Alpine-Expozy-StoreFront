# Testimonials

A responsive grid of testimonial cards — quote, avatar, name, role, and an optional star rating. Built from semantic `figure`/`blockquote`/`figcaption` markup for SEO and accessibility.

- **Server-side required:** No — purely client-side.
- **External dependencies:** None at runtime. (The editor loads SortableJS from a CDN on demand, only for drag-to-reorder inside the settings panel.)

## Embed code

```html
<div data-cb-type="testimonials" data-cb-columns="3" data-cb-variant="cards" data-cb-background="solid" data-cb-bg-color="#ffffff" data-cb-border-color="#e5e7eb" data-cb-gap="24" data-cb-show-rating="true" data-cb-accent-color="#3b82f6" data-cb-rounded="true" data-cb-hover="lift" role="region" aria-label="Testimonials">
    <div class="testimonials-grid">
        <figure class="testimonial">
            <div class="testimonial-rating" data-rating="5" aria-label="Rated 5 out of 5">
                <span class="star is-filled">★</span><span class="star is-filled">★</span><span class="star is-filled">★</span><span class="star is-filled">★</span><span class="star is-filled">★</span>
            </div>
            <blockquote class="testimonial-quote"><p>This tool completely changed how our team ships pages. Worth every penny.</p></blockquote>
            <figcaption class="testimonial-author">
                <img class="testimonial-avatar" src="assets/minimalist-blocks/images/ai-cvlfg.jpg" alt="Jane Doe">
                <span class="testimonial-meta">
                    <span class="testimonial-name">Jane Doe</span>
                    <span class="testimonial-role">CEO, Acme</span>
                </span>
            </figcaption>
        </figure>
        <figure class="testimonial">
            <div class="testimonial-rating" data-rating="4" aria-label="Rated 4 out of 5">
                <span class="star is-filled">★</span><span class="star is-filled">★</span><span class="star is-filled">★</span><span class="star is-filled">★</span><span class="star">★</span>
            </div>
            <blockquote class="testimonial-quote"><p>A polished experience with just the right amount of flexibility.</p></blockquote>
            <figcaption class="testimonial-author">
                <img class="testimonial-avatar" src="assets/minimalist-blocks/images/ai-HzKor.jpg" alt="Sara Kim">
                <span class="testimonial-meta">
                    <span class="testimonial-name">Sara Kim</span>
                    <span class="testimonial-role">Designer, Studio</span>
                </span>
            </figcaption>
        </figure>
    </div>
</div>
```

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-columns` | 1–4 | `3` | Number of columns |
| `data-cb-variant` | `cards` / `minimal` / `divided` | `cards` | Style: bordered cards, plain (no card), or vertical dividers between columns |
| `data-cb-background` | `solid` / `transparent` / `glass` | `solid` | Card background (Cards style): solid fill, see-through, or frosted glass (backdrop blur) |
| `data-cb-bg-color` | any CSS color | `#ffffff` | Card background / glass tint color |
| `data-cb-border-color` | any CSS color (alpha OK) | `#e5e7eb` | Card border color; use a translucent or transparent value to soften / remove it |
| `data-cb-gap` | 0–80 (px) | `24` | Gap between cards |
| `data-cb-show-rating` | `true` / `false` | `true` | Show/hide the star ratings |
| `data-cb-accent-color` | any CSS color | `#3b82f6` | Filled-star and accent color |
| `data-cb-rounded` | `true` / `false` | `true` | Rounded card corners (Cards style). Set `false` for square corners (avatars stay circular) |
| `data-cb-hover` | `none` / `lift` / `lift-shadow` | `lift` | Hover: none, lift, or lift + shadow (shadow on Cards only) |

> For a flat, card-less look use **Style → `minimal`**.

## Structure notes

- Each card is a `<figure class="testimonial">` containing a rating, a `<blockquote class="testimonial-quote">`, and a `<figcaption class="testimonial-author">` with avatar + name + role.
- **Rating:** the `.testimonial-rating` element carries `data-rating="1..5"` and five `.star` spans; filled stars have `is-filled`. Use the editor's Rating dropdown rather than editing by hand.
- **Avatar is optional** — remove the `.testimonial-avatar` image (or clear the Avatar field in the editor) and the layout adjusts.

All styling is scoped under `[data-cb-type="testimonials"]`.

## Dark mode

**Dark mode is the site's responsibility** (your site owns its theme and toggle). To make it easy, every color is a CSS variable and `style.css` ships a ready-made dark palette **commented out**. To enable it: uncomment that block and change the selector (`.dark`, `[data-theme="dark"]`, `@media (prefers-color-scheme: dark)`, …) to match your site's theme system. The accent color stays as configured.

> `.dark` is also the ContentBuilder editor's own UI theme — on a page that runs the editor, key your site's dark mode to a *different* class so the editor doesn't repaint your content while you edit.
