# Particle Constellation

A generative canvas animation of drifting particles that link up with lines when they're close, forming a shifting "constellation" web that also reacts to the mouse. Highly tunable — particle count/size/shape, connection distance and line style, colors, and glow/blur are all settings. There's no per-block content to edit.

- **Server-side required:** No — purely client-side, rendered on a `<canvas>`.
- **External dependencies:** None.

## Embed code

```html
<div data-cb-type="particle-constellation" data-cb-particle-count="80" data-cb-color="#6464ff" data-cb-connection-distance="120" data-cb-canvas-size="600">
</div>
```

The element can be empty — `mount` creates the `<canvas>`, sizes it, and draws into it.

## Options (`data-cb-*` attributes)

**Animation:** `data-cb-speed` (0.1–3), `data-cb-movement-speed` (0–2), `data-cb-mouse-influence` (0–300px — how far the cursor pushes/pulls particles).

**Particles:** `data-cb-particle-count` (10–200), `data-cb-particle-size` (1–10), `data-cb-particle-opacity` (0.1–1), `data-cb-particle-shape` (`circle` / `square` / `triangle`).

**Colors:** `data-cb-color` (primary), `data-cb-bg-color` (background), `data-cb-transparent-bg` (`true`/`false`), `data-cb-color-variation` (0–180°, hue spread).

**Connections:** `data-cb-connection-distance` (50–250px), `data-cb-line-width` (0.5–3), `data-cb-line-opacity` (0.1–1), `data-cb-fade-mode` (`distance` / `fixed` / `pulse`).

**Visual effects:** `data-cb-blur` (0–10px), `data-cb-glow` (0–20).

**Layout:** `data-cb-canvas-size` (400–1000px).

Defaults for every option live in the `settings` block of `index.js`.

## Structure & behavior notes

- The visual is generated in `mount` on a `requestAnimationFrame` loop, drawn into a `<canvas>` the plugin creates and appends. The returned instance's `unmount()` cancels the frame so it stops cleanly when the block is removed or re-rendered.
- `canvasSize` sets the canvas's **drawing buffer** (internal resolution); on screen it's capped at `max-width: 100%` and scales down responsively.
- Colors are read from the settings, so `transparentBg` lets the constellation sit over any section background; otherwise `bgColor` fills the canvas.
- The settings panel is auto-generated from the `settings` schema, so its field labels are translated by the editor's built-in mechanism — no custom editor code.

## Dark mode

The visual (including its background) is drawn on the canvas from the `color` / `bgColor` / `transparentBg` settings, so it looks right in light or dark sections once you pick those — there's no theme-dependent CSS to override.

All styling is scoped under `[data-cb-type="particle-constellation"]`.
