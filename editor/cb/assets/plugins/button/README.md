# Button

A single call-to-action button — a styled link with a gradient background. Edit its text and URL in the content editor; set the two gradient colors in the settings.

- **Server-side required:** No — purely client-side.
- **External dependencies:** None.

## Embed code

```html
<div data-cb-type="button">
    <a href="https://example.com">Click me</a>
</div>
```

The button is the inner `<a>`; its text and `href` are edited in the content editor.

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-primary-color` | any CSS color | `#3b82f6` | Gradient start color |
| `data-cb-secondary-color` | any CSS color | `#8b5cf6` | Gradient end color |

`mount` applies `linear-gradient(135deg, primary, secondary)` as the button background.

## Notes

- Provide the inner `<a>` in the markup — `mount` styles it (and would error if it's missing).
- For a pair of buttons with independent styles (solid / outline / ghost, etc.), use the **CTA Buttons** plugin instead.
