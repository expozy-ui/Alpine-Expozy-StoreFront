# Sticky Category Nav

> **ContentBox plugin.** This is built for **ContentBox** pages (which wrap content in `div.is-section`), not for editing inside ContentBuilder. It belongs in a sticky section that pins to the top as you scroll.

A horizontal in-page navigation bar that sticks to the top and **highlights the current section** as you scroll (scrollspy). Each link points at a section `id` on the page (`#hero`, `#articles`, …). A visually-hidden "Skip navigation" link is added for keyboard users.

- **Server-side required:** No — purely client-side.
- **External dependencies:** SortableJS is loaded on demand from a CDN **in the editor only**, for drag-to-reorder links. The rendered page needs nothing.

## Embed code

Place the plugin inside a sticky section (in ContentBox, a `div.is-section`):

```html
<div class="is-section is-box is-section-auto" style="position: sticky; height: 70px; top: 0; z-index: 1;">
    <div class="is-overlay">
        <div class="is-overlay-content">
            <div data-cb-type="sticky-category-nav" role="navigation" aria-label="Category navigation">
                <div class="category-nav-container" role="list">
                    <ul class="category-nav-list">
                        <li role="listitem"><a href="#hero">Hero</a></li>
                        <li role="listitem"><a href="#articles">Articles</a></li>
                        <li role="listitem"><a href="#contact">Contact</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
```

Each target section elsewhere on the page needs a matching `id` (e.g. `<div class="is-section" id="hero">`).

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-background-color` | any CSS color | `#f5f5f5` | Bar background |
| `data-cb-color` | any CSS color | `#666` | Link color |
| `data-cb-accent-color` | any CSS color | `#1a1a1a` | Active / hover link color |
| `data-cb-top` | 0–400 (px) | `0` | Sticky offset from the top |

## Structure & behavior notes

- `mount` makes the wrapping `.is-section` sticky (falling back to the plugin element itself if there's no `.is-section`), sets the color variables, and wires a throttled `scroll` listener that adds `.active` / `aria-current` to the link whose section is in view. Its `unmount()` removes the scroll listener; the skip link is only inserted once (guarded against re-mount).
- The settings-panel editor uses the shared `.cbx-*` panel classes; strings run through `builder.out()` for translation. Each link is a collapsible card (drag to reorder) with **Link Text** and **Target Section ID** fields (a leading `#` is added automatically).

## Dark mode

No dark-mode CSS needed — the bar/link/accent colors are your settings (`--background-color` / `--color` / `--accent-color`), so pick values that suit a light or dark page. All styling is scoped under `[data-cb-type="sticky-category-nav"]`.
