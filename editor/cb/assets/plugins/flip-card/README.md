# Flip Card

A card with a front and a back face that flips on hover or click. Both faces are inline-editable rich text. Flip horizontally or vertically, set the height, and pick the back-face color.

- **Server-side required:** No — purely client-side.
- **External dependencies:** None.

## Embed code

```html
<div data-cb-type="flip-card" data-cb-trigger="hover" data-cb-axis="horizontal" data-cb-height="280" data-cb-accent-color="#3b82f6">
    <div class="fc-inner">
        <div class="fc-face fc-front">
            <div class="is-subblock edit">
                <h3>Hover to flip</h3>
                <p>The front of the card.</p>
            </div>
        </div>
        <div class="fc-face fc-back">
            <div class="is-subblock edit">
                <h3>The back</h3>
                <p>More details revealed on flip.</p>
            </div>
        </div>
    </div>
</div>
```

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-trigger` | `hover` / `click` | `hover` | What flips the card |
| `data-cb-axis` | `horizontal` / `vertical` | `horizontal` | Flip around the Y axis (horizontal) or X axis (vertical) |
| `data-cb-height` | number (px) | `280` | Card height |
| `data-cb-accent-color` | any CSS color | `#3b82f6` | Back-face background |

## Editing (both faces)

The real 3D flip stays live while you edit — the card is not flattened. Because a hover-flip would keep you pinned to the back face (mouse-over = flipped) and you'd never reach the front, **the editor flips on click** regardless of the configured trigger:

- **Click an empty area of a face** to flip the card.
- **Click the text** to edit it (that click edits, it doesn't flip).

So to edit the back: click a blank part of the front to flip, then click the back's text. The configured **hover** behavior is fully live on the published page and in **Preview**.

While editing, each card shows a small **"Click to flip"** badge (editor-only — never saved, never on the live page). It's **localizable**: add `_txt["Click to flip"] = "…"` to your ContentBuilder language file and it will follow the editor's language (falls back to English otherwise).

## Behavior notes

- **Live page — hover:** pure CSS. **Live page — click:** `mount` toggles `.is-flipped` and manages `role="button"`, `tabindex`, `aria-pressed`, and Enter/Space.
- Clicks on real controls (`a`, `button`, form fields) inside a face never trigger a flip; in the editor, clicks inside an `.edit` region don't either (so text editing works).
- Respects `prefers-reduced-motion` (no transition).
- The front face is a light surface with dark text; the back face uses the accent color with light text. Both faces are normal rich-text regions, so inline formatting overrides the defaults.

## Dark mode

Dark mode for the rendered block is the site's responsibility. Colors are CSS variables and `style.css` ships a ready-made dark palette **commented out** — uncomment it and point the selector at your site's theme trigger. The back (accent) color stays as configured.

All styling is scoped under `[data-cb-type="flip-card"]`.
