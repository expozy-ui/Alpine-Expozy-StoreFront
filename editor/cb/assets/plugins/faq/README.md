# Accordion / FAQ

A collapsible list of questions and answers. Add, remove, reorder, and rename items from the editor; the answer of each item is a rich-text region edited inline. Fully keyboard-accessible (Arrow/Home/End) with correct ARIA wiring.

- **Server-side required:** No — purely client-side.
- **External dependencies:** SortableJS (loaded on demand from a CDN, editor-only, for drag-to-reorder). The rendered page needs nothing.

## Embed code

```html
<div data-cb-type="faq" data-cb-allow-multiple="false" data-cb-open-first="true" data-cb-border-radius="10">
    <div class="accordion-item">
        <div class="accordion-header">
            <span class="accordion-question edit">What is this platform about?</span>
            <span class="accordion-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </span>
        </div>
        <div class="accordion-content">
            <div class="accordion-answer is-subblock edit">
                <p>A short, helpful answer goes here.</p>
            </div>
        </div>
    </div>
    <div class="accordion-item">
        <div class="accordion-header">
            <span class="accordion-question edit">How do I get started?</span>
            <span class="accordion-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </span>
        </div>
        <div class="accordion-content">
            <div class="accordion-answer is-subblock edit">
                <p>Another answer goes here.</p>
            </div>
        </div>
    </div>
</div>
```

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-allow-multiple` | `true` / `false` | `false` | Allow more than one item open at once |
| `data-cb-open-first` | `true` / `false` | `true` | Open the first item on load |
| `data-cb-border-radius` | number (px) | `10` | Corner radius of the items |

## Structure notes

- Each item is `.accordion-item` → `.accordion-header` (with `.accordion-question edit` + `.accordion-icon`) and `.accordion-content` (with `.accordion-answer is-subblock edit`). The question is single-line editable; the answer is rich text.
- `mount` upgrades each header to a real `<button>` and wires `aria-expanded` / `aria-controls` / `aria-hidden`, single-open vs. multi-open behavior, and keyboard navigation.
- The settings-panel editor uses the shared `.cbx-*` panel classes; strings run through `builder.out()` for translation.

## Dark mode

Dark mode for the rendered block is the site's responsibility. Colors are CSS variables and `style.css` ships a ready-made dark palette **commented out** — uncomment it and point the selector at your site's theme trigger.

All styling is scoped under `[data-cb-type="faq"]`.
