# Star Rating

A display star rating out of 5 with smooth fractional fills (4.5 → four-and-a-half stars), an optional numeric value, and an editable caption. Set the rating in the settings; edit the caption inline.

- **Server-side required:** No — purely client-side (display only, not a rating-collection form).
- **External dependencies:** None.

## Embed code

```html
<div data-cb-type="star-rating" data-cb-rating="4.5" data-cb-size="medium" data-cb-show-value="true" data-cb-accent-color="#f59e0b" role="img" aria-label="Rated 4.5 out of 5">
    <span class="sr-stars" aria-hidden="true">
        <span class="sr-stars-bg">★★★★★</span>
        <span class="sr-stars-fill">★★★★★</span>
    </span>
    <span class="sr-value">4.5</span>
    <span class="sr-caption edit">Based on 128 reviews</span>
</div>
```

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-rating` | 0–5 (steps of 0.5) | `4.5` | The rating to display |
| `data-cb-show-value` | `true` / `false` | `true` | Show the numeric value beside the stars |
| `data-cb-size` | `small` / `medium` / `large` | `medium` | Star size |
| `data-cb-accent-color` | any CSS color | `#f59e0b` | Filled-star color |

## Structure notes

- The stars are two overlaid layers: `.sr-stars-bg` (empty/gray) and `.sr-stars-fill` (colored). `mount` sets the fill layer's width to `rating / 5`, so any fraction renders smoothly.
- `.sr-value` shows the number (hidden via `data-cb-show-value="false"`). `.sr-caption` carries `class="edit"`, so it is inline-editable — click it in the editor and type. Clear it to hide it (`:empty` hides it).
- `mount` keeps the block's `aria-label` in sync (`Rated X out of 5`); the stars themselves are `aria-hidden`.

## Dark mode

Dark mode for the rendered block is the site's responsibility. Colors are CSS variables and `style.css` ships a ready-made dark palette **commented out** — uncomment it and point the selector at your site's theme trigger. The star (accent) color stays as configured.

All styling is scoped under `[data-cb-type="star-rating"]`.
