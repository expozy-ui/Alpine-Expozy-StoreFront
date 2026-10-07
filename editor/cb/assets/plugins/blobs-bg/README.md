# Gradient Blobs

A content block filled with soft, animated blurred-gradient "blobs" that slowly drift and morph — a warm decorative panel. Pick a color scheme, intensity, blob count, animation speed, opacity, and blur in the settings. There's no per-block content to edit.

- **Server-side required:** No — purely client-side (CSS-animated `<div>`s, no canvas).
- **External dependencies:** None.

## Embed code

It's a normal in-flow block — give it a height (e.g. `min-height`) so the blobs have room to show. `mount` writes the `--blob-*` CSS variables and builds the blob layers, so the element itself is empty in saved content:

```html
<div data-cb-type="blobs-bg"
     data-cb-color-scheme="autumn"
     data-cb-intensity="medium"
     data-cb-blob-count="4"
     data-cb-animation-speed="medium"
     data-cb-blob-opacity="70"
     data-cb-blob-blur="80"
     style="min-height: 50px;">
</div>
```

At render time `mount` adds inline CSS variables to the element — `--blob-opacity`, `--blob-blur`, `--animation-duration`, and per-blob `--blob-size-N` / `--blob-gradient-N` — then appends a `.cb-warm-blobs-bg__container` with one `.cb-warm-blobs-bg__blob` per blob.

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-color-scheme` | `sunset`, `peach`, `autumn`, `warmPink`, `terracotta` | `peach` | Warm gradient palette |
| `data-cb-intensity` | `subtle` / `medium` / `bold` | `medium` | Blob size scale |
| `data-cb-blob-count` | 2–5 | `4` | How many blobs to render |
| `data-cb-animation-speed` | `slow` / `medium` / `fast` | `slow` | Drift speed (15s / 10s / 6s per cycle) |
| `data-cb-blob-opacity` | 10–80 (%) | `40` | Blob opacity |
| `data-cb-blob-blur` | 30–100 (px) | `60` | Blur amount |

## Structure & behavior notes

- `mount` rebuilds the blob layers from the options on each render and returns an instance whose `destroy()` clears them on `unmount`.
- Respects `prefers-reduced-motion` (blobs fade in but don't drift) and shrinks/softens on small screens.
- The settings panel is auto-generated from the `settings` schema, so its field labels are translated by the editor's built-in mechanism — no custom editor code.

## Dark mode

No dark-mode CSS is needed: the look is entirely the chosen **color scheme** (the warm gradients are the point), and the blobs are semi-transparent, so they blend over whatever sits beneath. Pick a scheme that suits a light or dark section.

## Styling notes

The animated blob layers use uniquely-prefixed `.cb-warm-blobs-bg__*` BEM classes and `cb-`-prefixed keyframes, so they don't collide with other page styles.
