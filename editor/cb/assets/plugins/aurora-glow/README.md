# Aurora Glow

A flowing **aurora** background on a `<canvas>` — several large, soft color clouds that drift organically and glow where they overlap, finished with a subtle film grain. Great as a hero backdrop or a section background. Choose a dark (glowing), light (pastel), or transparent (overlay) treatment. There's no per-block content to edit.

- **Server-side required:** No — purely client-side (`<canvas>`).
- **External dependencies:** None.

## Embed code

Give the block a height — `mount` fills it with the animated canvas (it sets `position: relative; overflow: hidden` itself). For a hero, put your heading/CTA in a separate element stacked above it.

```html
<div data-cb-type="aurora-glow"
     data-cb-background="light"
     data-cb-color-a="#5b8cff"
     data-cb-color-b="#c15bff"
     data-cb-color-c="#38e8c6"
     data-cb-speed="1"
     data-cb-intensity="100"
     data-cb-blur="40"
     data-cb-grain="12"
     style="min-height: 480px;">
</div>
```

The element can be empty — `mount` clears it and appends the canvas.

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-background` | `dark` / `light` / `transparent` | `dark` | **dark** = glowing neon aurora (colors add where they overlap); **light** = soft pastel wash; **transparent** = no backdrop, so it overlays whatever is behind the block |
| `data-cb-color-a` | any hex/rgb color | `#5b8cff` | Color cloud A |
| `data-cb-color-b` | any hex/rgb color | `#c15bff` | Color cloud B |
| `data-cb-color-c` | any hex/rgb color | `#38e8c6` | Color cloud C |
| `data-cb-speed` | 0.1–10 (×) | `1` | Drift speed |
| `data-cb-intensity` | 20–160 (%) | `100` | Glow/color strength |
| `data-cb-blur` | 0–120 (px) | `40` | Softness of the clouds |
| `data-cb-grain` | 0–40 (%) | `12` | Film-grain texture (0 = off) |

## Look & feel notes

- **Dark** uses additive blending, so overlapping clouds brighten into a neon glow — the classic aurora hero look. **Light** and **transparent** use normal blending for a softer, translucent wash. Pick colors to match: vivid on dark, gentler on light.
- **Transparent** is for layering over an existing (ideally darker) section — set the block's own background elsewhere and let the aurora glow on top.
- Higher **blur** + lower **intensity** reads calm and premium; lower blur + higher intensity reads bold and vivid.

## Structure & behavior notes

- Rendered in `mount` on a `requestAnimationFrame` loop. For softness and performance it paints the clouds to a half-resolution offscreen canvas, then composites them up with a blur; it's DPR-aware and re-fits on window resize **and** container resize (a `ResizeObserver`).
- The returned instance's `destroy()` (called on `unmount`) stops the loop, removes the resize listener, and disconnects the observer — no leaks.
- Respects `prefers-reduced-motion`: the drift slows to a gentle minimum and the grain stops shimmering.
- The settings panel is auto-generated from the `settings` schema, so its field labels are translated by the editor's built-in mechanism — no custom editor code.

## Dark mode

Dark mode isn't a separate CSS theme here — the look is set by the **Background** option (dark / light / transparent) and your chosen colors, all drawn on the canvas. Pick `dark` for a dark section, `light` for a light one, or `transparent` to inherit the section behind it. Styling is scoped under `[data-cb-type="aurora-glow"]`.
