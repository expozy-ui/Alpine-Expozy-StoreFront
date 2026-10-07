# Text Ticker / Marquee

A seamless, infinitely-scrolling strip of text items — announcements, headlines, "now playing", and the like. Manage the items (add/remove/reorder) from the content editor.

- **Server-side required:** No — purely client-side.
- **External dependencies:** SortableJS (loaded on demand from a CDN, editor-only, for drag-to-reorder). The rendered page needs nothing.

## Embed code

```html
<div data-cb-type="marquee" data-cb-direction="left" data-cb-speed="60" data-cb-separator="•" data-cb-pause-on-hover="true">
    <div class="mq-viewport">
        <div class="mq-track" aria-hidden="true"></div>
    </div>
    <ul class="mq-items">
        <li>Breaking news: we just shipped something great</li>
        <li>50% off for a limited time</li>
        <li>Free shipping worldwide</li>
    </ul>
</div>
```

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-direction` | `left` / `right` | `left` | Scroll direction |
| `data-cb-speed` | 10–300 (px/s) | `60` | Constant speed in pixels per second |
| `data-cb-pause-on-hover` | `true` / `false` | `true` | Pause while hovered |
| `data-cb-separator` | any text | `•` | Character shown between items (clear it for none) |
| `data-cb-font-size` | 10–64 (px) | `16` | Text size |
| `data-cb-use-custom-color` | `true` / `false` | `false` | Turn on to override the inherited color |
| `data-cb-text-color` | any CSS color | `#111827` | Text color (only when custom color is on) |

## How it works

- `<ul class="mq-items">` is the **source of truth** — visually hidden but kept in the accessibility tree, so the ticker has a real text alternative. `mount` reads it and builds the `.mq-track` (which is `aria-hidden`).
- For a gap-free loop, `mount` renders **two identical copies** of the items and animates the track by `-50%`. Speed is constant (px/s): it measures one copy's width and derives the animation duration, so short and long tickers scroll at the same visual pace.
- **Editing is via the panel**, not inline — editing text that's scrolling isn't practical.
- Respects **`prefers-reduced-motion`**: no animation; the strip becomes horizontally scrollable so every item stays reachable.

## Styling / dark mode

By default the ticker is neutral — text and separator **inherit `color`** from the surrounding content, so it adapts to light/dark automatically with your page. Turn on **Custom Text Color** only if you want to override that (a fixed color won't auto-adapt). **Font Size** always applies (default 16px). Adjust spacing with the `--mq-gap` variable if needed.

All styling is scoped under `[data-cb-type="marquee"]`.
