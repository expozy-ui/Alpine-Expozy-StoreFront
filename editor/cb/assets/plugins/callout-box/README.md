# Callout Box

A highlighted callout / admonition box — a heading plus rich-text body with a colored left border, in one of four styles (info, success, warning, error). Good for notes, tips, warnings, and important messages. Pick the style in the settings; edit the title and body directly in the content.

- **Server-side required:** No — purely client-side.
- **External dependencies:** None.

## Embed code

```html
<div data-cb-type="callout-box" data-cb-style="info" class="callout-box callout-info">
    <h3 class="edit">Important Information</h3>
    <div class="is-subblock edit">
        <p>This is an important message with <strong>formatting</strong>!</p>
        <p>You can add multiple paragraphs and <a href="#">links</a>.</p>
    </div>
</div>
```

- The `<h3 class="edit">` is a single-line editable title.
- The `<div class="is-subblock edit">` is the rich-text body (multiple paragraphs, formatting, links).
- The `callout-<style>` class drives the colors; `mount` keeps it in sync with the `style` setting.

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-style` | `info` / `success` / `warning` / `error` | `info` | Color scheme (background + left-border) |

## Structure & behavior notes

- `mount` sets the element's class to `callout-box callout-<style>` from the `style` setting; the CSS colors key off `callout-<style>`.
- The title and body use the editor's shared `.edit` editable-region convention, so they're edited inline in the content (not in a settings panel). The `openContentEditor` panel only shows a short usage hint — its strings run through `builder.out()` for translation.

## Dark mode

Dark mode for the rendered block is the site's responsibility. `style.css` ships a ready-made dark palette for the four variants **commented out** — uncomment it and point the selector at your site's theme trigger.

All styling is scoped under `[data-cb-type="callout-box"]`.
