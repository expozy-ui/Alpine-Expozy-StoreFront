# Typewriter

A headline with a rotating word or phrase — typed out character by character, or cross-faded. Edit the prefix/suffix inline; manage the rotating words (add/remove/reorder) from the content editor.

- **Server-side required:** No — purely client-side.
- **External dependencies:** SortableJS (loaded on demand from a CDN, editor-only, for drag-to-reorder). The rendered page needs nothing.

## Embed code

```html
<div data-cb-type="typewriter" data-cb-effect="type" data-cb-type-speed="70" data-cb-pause="1400" data-cb-cursor="true" data-cb-loop="true" data-cb-accent-color="#3b82f6">
    <h2 class="tw-line">
        <span class="tw-prefix edit">We build </span>
        <span class="tw-rotate" aria-hidden="true">websites</span>
        <span class="tw-suffix edit"></span>
    </h2>
    <ul class="tw-words">
        <li>websites</li>
        <li>brands</li>
        <li>experiences</li>
    </ul>
</div>
```

The headline sits in a real heading (`.tw-line`) so search engines read it as a heading, and `.tw-rotate` is pre-filled with the first word so the full phrase exists before JavaScript runs. Pick the tag (**H1 / H2 / H3 / Paragraph**) with the **Heading Level** control in the content editor — `H2` is the safe default; use `H1` only when the block is the page's single main title.

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-effect` | `type` / `fade` | `type` | Typewriter or cross-fade |
| `data-cb-cursor` | `true` / `false` | `true` | Blinking caret (typewriter effect) |
| `data-cb-loop` | `true` / `false` | `true` | Loop, or stop on the last word |
| `data-cb-type-speed` | number (ms) | `70` | Per-character speed |
| `data-cb-pause` | number (ms) | `1400` | Hold time on a full word |
| `data-cb-accent-color` | any CSS color | `#3b82f6` | Rotating-word color |

## Structure notes

- **SEO:** the rotating words are **real HTML** (`<ul class="tw-words">`, hidden with the accessible `clip` technique — not `display:none`, not a JS array), so crawlers and screen readers get them as text. The headline sits in a **heading tag** (`.tw-line`, level chosen in the editor) so it carries heading weight, and `.tw-rotate` is **pre-filled with the first word** so the complete phrase is in the static HTML before JS runs (no empty gap / layout shift).
- `.tw-prefix` and `.tw-suffix` are inline-editable static text; `.tw-rotate` is animated by `mount` (and `aria-hidden`). The `<ul class="tw-words">` is the word source — visually hidden but kept in the accessibility tree.
- Respects **`prefers-reduced-motion`**: shows the first word statically, no typing/caret.
- The effect runs in the editor too (`mount` cleans up its timer on unmount, so it survives re-mounts / undo-redo without stacking).
- The block ships as a large bold headline by default; wrap or restyle as needed — the static text uses `--tw-text`, the rotating word uses the accent color.

## Dark mode

Dark mode for the rendered block is the site's responsibility. Colors are CSS variables and `style.css` ships a small dark override **commented out** — uncomment it and point the selector at your site's theme trigger. The rotating-word color stays as configured.

All styling is scoped under `[data-cb-type="typewriter"]`.
