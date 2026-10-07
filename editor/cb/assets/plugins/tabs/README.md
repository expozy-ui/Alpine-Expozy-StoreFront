# Tabs

Tabbed panels with rich, **inline-editable** content per tab. Add, remove, reorder, and rename tabs from the editor; edit each tab's content directly on the page. Implements the ARIA tabs pattern (roles, `aria-selected`, `aria-controls`, roving tabindex, arrow-key navigation).

- **Server-side required:** No — purely client-side.
- **External dependencies:** None at runtime. (The editor loads SortableJS from a CDN on demand, only for drag-to-reorder inside the settings panel.)

## Embed code

```html
<div data-cb-type="tabs" data-cb-accent-color="#3b82f6" data-cb-tab-align="start" role="region" aria-label="Tabbed content">
    <div class="tabs-nav" role="tablist" aria-label="Tabs">
        <button class="tabs-tab is-active" type="button" role="tab">Overview</button>
        <button class="tabs-tab" type="button" role="tab">Features</button>
        <button class="tabs-tab" type="button" role="tab">Pricing</button>
    </div>
    <div class="tabs-panels">
        <div class="tabs-panel is-active" role="tabpanel">
            <div class="is-subblock edit"><h3>Overview</h3><p>Write the overview here. This content is editable directly on the page.</p></div>
        </div>
        <div class="tabs-panel" role="tabpanel">
            <div class="is-subblock edit"><h3>Features</h3><p>List your features here.</p></div>
        </div>
        <div class="tabs-panel" role="tabpanel">
            <div class="is-subblock edit"><h3>Pricing</h3><p>Describe your pricing here.</p></div>
        </div>
    </div>
</div>
```

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-tab-align` | `start` / `center` / `end` / `stretch` | `start` | Tab-bar alignment (`stretch` = full-width equal tabs) |
| `data-cb-accent-color` | any CSS color | `#3b82f6` | Active-tab underline and focus color |

## Structure notes

- **A tab and its panel are matched by order** — the *n*-th `.tabs-tab` controls the *n*-th `.tabs-panel`. The editor keeps them in sync when you add/remove/reorder. `mount` wires the ARIA ids and active state on load (and after every edit).
- **Editable content:** each panel wraps its content in `<div class="is-subblock edit">…</div>`, which ContentBuilder makes editable in place. Put any rich content there (headings, paragraphs, lists, images).
- **Default/active tab:** the tab and panel carrying `is-active` are shown first; `mount` preserves the active tab across edits.

All styling is scoped under `[data-cb-type="tabs"]`.

## Dark mode

**Dark mode is the site's responsibility** (your site owns its theme and toggle). To make it easy, every color is a CSS variable and `style.css` ships a ready-made dark palette **commented out**. To enable it: uncomment that block and change the selector (`.dark`, `[data-theme="dark"]`, `@media (prefers-color-scheme: dark)`, …) to match your site's theme system. The accent color stays as configured; the panel body text uses the `--tabs-content` variable (defaults to `inherit`, so it follows the page).

> `.dark` is also the ContentBuilder editor's own UI theme — on a page that runs the editor, key your site's dark mode to a *different* class so the editor doesn't repaint your content while you edit.
