# Hero Animation

A generative canvas animation for hero sections and section backdrops — pick from 12 algorithmic visuals (neural network, pendulum harmonics, oscillating rings, fractal tree, Fourier series, Lorenz attractor, Bezier curves, circular packing, Lissajous curves, graph network, spline interpolation, circular waves). The visual is drawn from a single base color, at a chosen speed and canvas size. Everything is configured in the settings — there's no per-block content to edit.

- **Server-side required:** No — purely client-side, rendered on a `<canvas>`.
- **External dependencies:** None.

## Embed code

```html
<div data-cb-type="hero-animation" data-cb-animation-type="neural" data-cb-speed="1" data-cb-base-color="#6464ff" data-cb-canvas-width="600" data-cb-canvas-height="600">
    <canvas></canvas>
</div>
```

The empty `<canvas>` is required — `mount` sizes and draws into it.

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-animation-type` | `neural`, `pendulum`, `rings`, `fractal`, `fourier`, `lorenz`, `bezier`, `packing`, `lissajous`, `graph`, `spline`, `waves` | `neural` | Which generative visual to render |
| `data-cb-speed` | 0.2–3 | `1` | Animation speed multiplier |
| `data-cb-base-color` | any CSS color (hex or rgb/rgba) | `#6464ff` | Color the visual is drawn from |
| `data-cb-canvas-width` | 300–1200 (px) | `600` | Canvas drawing width |
| `data-cb-canvas-height` | 300–1200 (px) | `600` | Canvas drawing height |

## Structure & behavior notes

- The visual is fully generated in `mount` on a `requestAnimationFrame` loop; the returned instance's `unmount()` cancels the frame, so it stops cleanly when the block is removed or re-rendered.
- `canvasWidth`/`canvasHeight` set the canvas's **drawing buffer** size (its internal resolution / aspect ratio). On screen the canvas is capped at `max-width: 100%` and scales down responsively; on small screens it goes full-width.
- The base color is parsed from hex **or** `rgb()/rgba()`, so it works with the editor's color picker output.
- The settings panel is auto-generated from the `settings` schema, so its field labels are translated by the editor's built-in mechanism — no custom editor code.

## Dark mode

The canvas draws from the `baseColor` setting, so it looks the same in light and dark — set the color to suit your section. The only theme-dependent CSS is a subtle ambient **glow** behind the canvas: it's a CSS variable (`--ha-glow`) and `style.css` ships a slightly stronger dark value **commented out** — uncomment it and point the selector at your site's theme trigger.

All styling is scoped under `[data-cb-type="hero-animation"]`.
