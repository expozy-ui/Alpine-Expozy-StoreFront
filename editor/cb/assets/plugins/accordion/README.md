# Accordion

> **Deprecated — use the `faq` plugin for new content.** This plugin is kept only so pages already built with `data-cb-type="accordion"` keep working. It won't receive new features.

A vertical list of expand/collapse question–answer items (an FAQ accordion). Clicking a question reveals its answer; by default only one item is open at a time.

- **Server-side required:** No — purely client-side.
- **External dependencies:** SortableJS is loaded on demand from a CDN **in the editor only**, for drag-to-reorder items. The rendered page needs nothing.

## Embed code

```html
<div data-cb-type="accordion" data-cb-allow-multiple="false" data-cb-open-first="true">
    <div class="accordion-item">
        <div class="accordion-header">
            <span class="accordion-question">What is your return policy?</span>
            <span class="accordion-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </span>
        </div>
        <div class="accordion-content">
            <div class="accordion-answer">You can return any item within 30 days.</div>
        </div>
    </div>
    <!-- more .accordion-item blocks … -->
</div>
```

Each item is `.accordion-item` → `.accordion-header` (`.accordion-question` + `.accordion-icon`) + `.accordion-content` (`.accordion-answer`).

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-allow-multiple` | `true` / `false` | `false` | Allow more than one item open at once |
| `data-cb-open-first` | `true` / `false` | `true` | Open the first item on load |

## Behavior notes

- On render, `mount` turns each `.accordion-header` into a `<button>` and wires ARIA state (`aria-expanded` / `aria-controls` / `aria-hidden`) plus keyboard navigation (↑/↓/Home/End). Open state is the `.active` class on the item.
- The settings-panel editor uses the shared `.cbx-*` panel classes; strings run through `builder.out()` for translation. Each item is a collapsible card (drag to reorder) with Question and Answer fields.

## Dark mode

Dark mode for the rendered block is the site's responsibility. The palette (item surface, borders, header states, text, icon, focus ring) is a set of CSS variables and `style.css` ships a ready-made dark palette **commented out** — uncomment it and point the selector at your site's theme trigger. All styling is scoped under `[data-cb-type="accordion"]`.

## Migrating to `faq`

The `faq` plugin is the maintained replacement with the same question/answer model. When you're ready, rebuild these sections with `faq`; existing `accordion` blocks will keep working in the meantime.
