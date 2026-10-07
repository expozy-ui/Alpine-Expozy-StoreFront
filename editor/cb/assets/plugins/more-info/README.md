# More Info

An inline tooltip / annotation: wrap a word or phrase in a trigger that reveals a rich-HTML popover on hover or click. Three visual styles cover the common needs.

- **Server-side required:** No — purely client-side.
- **External dependencies:** None.

## Styles

| Style | Looks like | Use for |
|---|---|---|
| **Info** | blue text, dotted underline, ⓘ | explanatory tooltips, definitions, abbreviations |
| **Citation** | green superscript `[…]` | references / sources |
| **Highlight** | yellow marker | fun facts, emphasis with a note |

## Embed code

```html
<span data-cb-type="more-info" class="more-info-trigger style-info"
      data-cb-content="&lt;strong&gt;Jupiter&lt;/strong&gt;&lt;br&gt;&lt;br&gt;The largest planet in the Solar System."
      role="button" tabindex="0" aria-expanded="false" aria-haspopup="true">Jupiter</span>
```

The trigger text is the visible word(s); the popover HTML lives in `data-cb-content`. In the editor you can also **select existing text and apply More Info** — from the Text panel in ContentBox, or the text toolbar in ContentBuilder (see `convertSelectionToPlugin` in the demo `src/index.js`, and pattern 8 in `plugin-patterns.md`).

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-style` | `info` / `citation` / `highlight` | `info` | Visual style |
| `data-cb-trigger` | `hover` / `click` | `hover` | Hover (click pins it) or click-only |
| `data-cb-max-width` | number (px) | `320` | Popover max width |
| `data-cb-position` | `top` / `bottom` / `auto` | `top` | Preferred popover placement |
| `data-cb-content` | HTML string | — | The popover's rich content |

## Structure notes

- **Two surfaces.** The **trigger** is `span[data-cb-type="more-info"]` — scoped and variable-driven. The **popover** is built by `mount()` and appended to `<body>`, so its classes (`.more-info-popover` / `.popover-content`) are **global by necessity** (namespaced to keep leak risk low). This is a deliberate exception to the usual "scope everything under the block" rule, because the popover can't live inside an inline span without being clipped.
- `mount()` handles smart positioning (viewport-aware), hover/click/keyboard, `aria-expanded`, outside-click close, and reposition on scroll/resize.
- The settings-panel editor uses the shared `.cbx-*` panel classes (including the `.cbx-rte` rich-text field); strings run through `builder.out()` for translation.

## Dark mode

Dark mode for the rendered block is the site's responsibility. Both surfaces are CSS-variable driven and `style.css` ships a ready-made dark palette **commented out** — uncomment it and point the selectors at your site's theme trigger. Note the popover override targets `.dark .more-info-popover` (global), since the popover lives at `<body>` level.
