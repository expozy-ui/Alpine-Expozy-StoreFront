# Vector Force Field

A big display-text headline whose letters behave like a **force field**: as the cursor moves near them, each letter is pushed away and springs back on a little physics simulation (spring + damping), with a custom ring cursor and glow. Optional proximity color-shift, rotation, and scale. The text stays real, selectable HTML (SEO-friendly). Best on a **dark section** (default text color is white).

- **Server-side required:** No — purely client-side.
- **External dependencies:** None.

## Embed code

```html
<div data-cb-type="vector-force"
     data-cb-font-size="6" data-cb-font-weight="900" data-cb-letter-spacing="0.05" data-cb-text-color="#4970ff"
     data-cb-force-radius="200" data-cb-force-strength="0.8" data-cb-spring-strength="0.15" data-cb-damping="0.85" data-cb-max-displacement="100"
     data-cb-cursor-size="30" data-cb-cursor-color="#4970ff" data-cb-show-glow="true" data-cb-glow-color="#6496ff"
     data-cb-enable-color-change="true" data-cb-enable-rotation="false" data-cb-enable-scale="false" data-cb-rotation-intensity="2" data-cb-scale-intensity="0.3">
    <h1 class="vf-text">FORCE FIELD</h1>
</div>
```

> The default text color is a visible blue (`#4970ff`) so it shows on a light background. If your section is dark, white (`#ffffff`) works well too.

`mount` splits `.vf-text` into `.vf-letter` spans and animates them; edit the words in the content editor's Text Content field.

## Options (`data-cb-*` attributes)

**Content:** `data-cb-font-size` (2–20rem), `data-cb-font-weight` (300–900), `data-cb-letter-spacing` (0–0.3em), `data-cb-text-color`.

**Physics:** `data-cb-force-radius` (50–400px, how close the cursor must be), `data-cb-force-strength` (0.1–2), `data-cb-spring-strength` (0.05–0.3, pull back to home), `data-cb-damping` (0.5–0.95, settle speed), `data-cb-max-displacement` (30–200px, how far a letter can move).

**Appearance:** `data-cb-cursor-size` (10–60px), `data-cb-cursor-color`, `data-cb-show-glow` (`true`/`false`), `data-cb-glow-color`.

**Effects:** `data-cb-enable-color-change` (`true`/`false`, brighten near cursor), `data-cb-enable-rotation` (`true`/`false`) + `data-cb-rotation-intensity` (0–10), `data-cb-enable-scale` (`true`/`false`) + `data-cb-scale-intensity` (0–1).

Defaults for every option live in the `settings` block of `index.js`.

## Structure & behavior notes

- The block is a single `<h1 class="vf-text">`; `mount` wraps each character in a `.vf-letter` span, then runs a `requestAnimationFrame` physics loop reacting to the pointer. The ring cursor (`.vf-cursor`) and glow (`.vf-glow`) are appended to `document.body` so they can track the pointer across the viewport.
- The returned instance's `destroy()` (called on `unmount`) cancels the animation frame, removes all pointer/scroll/resize listeners, **and** removes the body-appended cursor/glow — no leaks.
- On touch devices (no hover), the custom cursor/glow are hidden and the pointer effect is effectively idle; the text still renders normally.
- The settings panel is auto-generated; the content editor is a single Text Content field (the words are stored in your HTML, so they're readable/SEO-friendly). Its strings run through `builder.out()` for translation.

## Dark mode

No dark-mode CSS: the text, cursor, and glow colors are all **settings** (`textColor` / `cursorColor` / `glowColor`), and the block background is transparent — so pick colors to suit your section (the defaults are white text for a dark background). In-flow styling is scoped under `[data-cb-type="vector-force"]`; the body-appended cursor/glow use uniquely-prefixed `.vf-cursor` / `.vf-glow` classes.
