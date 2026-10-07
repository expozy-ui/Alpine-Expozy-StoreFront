# Pendulum Harmonics

A generative canvas animation of many pendulums swinging at slightly different frequencies, tracing evolving harmonic (pendulum-wave) patterns. Highly tunable — physics (count, angles, frequency spread), drawing style (lines / bezier curves / dots, trail length and fade, blur), colors, and layout are all settings. There's no per-block content to edit.

- **Server-side required:** No — purely client-side, rendered on a `<canvas>`.
- **External dependencies:** None.

## Embed code

```html
<div data-cb-type="pendulum" data-cb-speed="2.1" data-cb-color="#6464ff" data-cb-pendulum-count="10" data-cb-trail-length="100" data-cb-bg-color="#ffffff" data-cb-color-variation="100" data-cb-line-width="3.5" data-cb-trail-opacity="0.1" data-cb-pendulum-opacity="0" data-cb-ball-size="3" data-cb-ball-opacity="0.1" data-cb-blur="0" data-cb-draw-mode="curves" data-cb-fade-curve="linear" data-cb-swing-angle="60" data-cb-start-angle="45" data-cb-length-ratio="0.3" data-cb-base-freq="0.005" data-cb-freq-increment="0.001" data-cb-freq-distribution="linear" data-cb-pivot-y="20" data-cb-canvas-size="600" data-cb-margin="10" data-cb-transparent-bg="true">
</div>
```

The block can be empty — `mount` creates the `<canvas>` if it isn't already there (or you can include an empty `<canvas></canvas>` yourself), then sizes and draws into it.

## Options (`data-cb-*` attributes)

**Animation:** `data-cb-speed` (0.1–3), `data-cb-trail-length` (20–300).

**Colors:** `data-cb-color` (primary), `data-cb-bg-color` (background), `data-cb-transparent-bg` (`true`/`false`), `data-cb-color-variation` (0–180°, hue spread across pendulums).

**Drawing style:** `data-cb-line-width` (0.5–5), `data-cb-trail-opacity` (0.1–1), `data-cb-pendulum-opacity` (0–1, the pendulum arms), `data-cb-ball-size` (2–15px), `data-cb-ball-opacity` (0.1–1), `data-cb-blur` (0–10px), `data-cb-draw-mode` (`lines` / `curves` / `dots`), `data-cb-fade-curve` (`linear` / `exponential` / `easeIn` / `easeOut`).

**Physics:** `data-cb-pendulum-count` (3–15), `data-cb-swing-angle` (15–120°), `data-cb-start-angle` (0–90°), `data-cb-length-ratio` (0.3–0.9), `data-cb-base-freq` (0.005–0.05), `data-cb-freq-increment` (0.001–0.02), `data-cb-freq-distribution` (`linear` / `logarithmic` / `exponential`).

**Layout:** `data-cb-pivot-y` (5–40%), `data-cb-canvas-size` (400–1000px), `data-cb-margin` (10–50px).

Defaults for every option live in the `settings` block of `index.js`.

## Structure & behavior notes

- The visual is generated in `mount` on a `requestAnimationFrame` loop; the returned instance's `unmount()` cancels the frame so it stops cleanly when the block is removed or re-rendered.
- `canvasSize` sets the canvas's **drawing buffer** (internal resolution); on screen it's capped at `max-width: 100%` and scales down responsively.
- Colors are read from the settings, so `transparentBg` lets the animation sit over any section background; otherwise `bgColor` fills the canvas.
- The settings panel is auto-generated from the `settings` schema, so its field labels are translated by the editor's built-in mechanism — no custom editor code.

## Dark mode

The visual (including its background) is drawn on the canvas from the `color` / `bgColor` / `transparentBg` settings, so it looks right in light or dark sections once you pick those — there's no theme-dependent CSS to override.

All styling is scoped under `[data-cb-type="pendulum"]`.
