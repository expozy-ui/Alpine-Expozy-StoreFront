# Interactive Timeline

A vertical or horizontal timeline of events, each with a date, title, description, and a status (completed / current / upcoming) that styles its marker. Items reveal on scroll. Good for company history, roadmaps, or process steps. Set orientation, animation, and appearance in the settings; edit and reorder events in the content editor (drag to reorder).

- **Server-side required:** No — purely client-side.
- **External dependencies:** SortableJS is loaded on demand from a CDN **in the editor only**, for drag-to-reorder. The rendered page needs nothing.

## Embed code

```html
<div data-cb-type="timeline" data-cb-orientation="vertical" data-cb-animate="true" data-cb-accent-color="#3b82f6" data-cb-border-color="#e5e7eb" data-cb-rounded="true" data-cb-hover="lift-shadow" data-cb-line-width="2" data-cb-dot-size="12">
    <div>
        <div class="timeline-item" data-status="completed">
            <div class="timeline-marker" aria-hidden="true"></div>
            <div class="timeline-content">
                <span class="timeline-date">Q1 2023</span>
                <h3 class="timeline-title">Company Founded</h3>
                <p class="timeline-desc">Started with a vision to build something meaningful.</p>
            </div>
        </div>
        <!-- more .timeline-item blocks … -->
    </div>
</div>
```

The `.timeline-item`s live inside an **inner `<div>` wrapper** (that wrapper is what becomes the horizontal scroll track) — keep it.

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-orientation` | `vertical` / `horizontal` | `vertical` | Timeline direction |
| `data-cb-animate` | `true` / `false` | `true` | Reveal items on scroll |
| `data-cb-accent-color` | any CSS color | `#3b82f6` | Marker / date / hover accent |
| `data-cb-border-color` | any CSS color | `#e5e7eb` | Content-card border color |
| `data-cb-rounded` | `true` / `false` | `true` | Rounded content-card corners |
| `data-cb-hover` | `none`, `lift`, `lift-shadow` | `lift-shadow` | Content-card hover: raise, raise + shadow, or off |
| `data-cb-line-width` | 1–6 (px) | `2` | Connector line thickness |
| `data-cb-dot-size` | 8–24 (px) | `12` | Marker dot diameter |

### Per-item attribute (`.timeline-item`)

| Attribute | Values | Description |
|---|---|---|
| `data-status` | `completed` / `current` / `upcoming` | Styles the marker — `completed` fills it with a ✓, `current` fills and pulses it, `upcoming` leaves it hollow |

## Structure & behavior notes

- `mount` sets `--timeline-accent` / `--timeline-line-width` / `--timeline-dot-size` on the container and applies the `timeline-vertical` / `timeline-horizontal` class. When animation is on, an `IntersectionObserver` adds `timeline-visible` as each item scrolls in; the returned instance's `unmount()` disconnects it.
- The settings-panel editor uses the shared `.cbx-*` panel classes; strings run through `builder.out()` for translation. Each event is a collapsible card (drag handle to reorder), with fields for date, title, description, and status.

## Dark mode

Dark mode for the rendered block is the site's responsibility. The palette (line, card surface/border, text) is a set of CSS variables and `style.css` ships a ready-made dark palette **commented out** — uncomment it and point the selector at your site's theme trigger. The accent color stays as configured, and the markers pick up the dark card background automatically.

All styling is scoped under `[data-cb-type="timeline"]`.
