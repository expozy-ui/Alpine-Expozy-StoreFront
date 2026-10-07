# Navigation Menu

> **ContentBox plugin.** Built for **ContentBox** pages (which wrap content in `div.is-section`), not for editing inside ContentBuilder. It lives in a section marked `div.is-section.nav-menu`, which is what its theme/sticky styles hook onto.

A responsive site navigation bar: a logo (text **or** image), a row of menu items with optional **dropdown submenus**, a mobile hamburger toggle, a subtle shadow on scroll, and a light / dark / "dark-on-start" theme.

- **Server-side required:** No — purely client-side.
- **External dependencies:** SortableJS is loaded on demand from a CDN **in the editor only**, for drag-to-reorder menu and submenu items. The rendered page needs nothing.

## Structure

The plugin element `[data-cb-type="nav-menu"]` contains a `.nav-wrapper` with the logo, a mobile `.menu-toggle` button, and the `.nav-list`:

```html
<div class="is-section is-box nav-menu">
    <div class="is-overlay">
        <div class="is-overlay-content">
            <div data-cb-type="nav-menu" data-cb-theme="light" data-cb-menu-item-border-radius="6" data-cb-dropdown-border-radius="8">
                <div class="nav-wrapper">
                    <a href="/" class="logo">My Website</a>
                    <button class="menu-toggle" aria-label="Toggle menu" aria-expanded="false"></button>
                    <ul class="nav-list" role="menubar">
                        <li class="nav-item" role="none">
                            <a href="#" class="nav-link" role="menuitem">Home</a>
                        </li>
                        <li class="nav-item has-submenu" role="none">
                            <a href="#" class="nav-link" role="menuitem" aria-haspopup="true" aria-expanded="false">
                                Products <span class="nav-arrow" aria-hidden="true"></span>
                            </a>
                            <button class="submenu-toggle" aria-label="Toggle Products submenu" aria-expanded="false"><!-- chevron --></button>
                            <ul class="submenu" role="menu" aria-label="Products submenu">
                                <li role="none"><a href="#" class="submenu-link" role="menuitem">Item</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
```

The editor rebuilds `.nav-list` from a model, so its exact inner HTML is generated for you — the classes above are the hooks the CSS and `mount` rely on.

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-theme` | `light` / `dark` / `dark-on-start` | `light` | Color theme. `dark-on-start` starts dark (e.g. over a hero) and switches to light after scrolling ~one viewport. |
| `data-cb-menu-item-border-radius` | 0–500 (px) | `6` | Corner radius of menu items |
| `data-cb-dropdown-border-radius` | 0–500 (px) | `8` | Corner radius of dropdown panels |

## Behavior notes

- `mount` sets the border-radius CSS variables, applies the theme by toggling `.dark` on the section wrapper, and wires: a scroll shadow (`.scrolled` on `.nav-wrapper`), the `dark-on-start` scroll switch, the mobile menu + submenu toggles, keyboard entry into submenus, close-on-outside-click, and a resize reset. Its returned instance's `destroy()` removes the `scroll` / `click` / `resize` listeners on `unmount` (they used to leak on re-mount). If there's no `.is-section` wrapper, theme toggling is skipped instead of throwing.
- The settings-panel editor uses the shared `.cbx-*` panel classes; strings run through `builder.out()` for translation. It manages menu items (label, link, optional submenu with its own reorderable sub-items) and the logo (text or image + alt + rounded + link).

## Dark mode

Dark mode here is a **plugin feature**, not a CSS-only theme: choose `theme: dark` (or `dark-on-start`), and `mount` toggles `.dark` on the section — the CSS under `div.is-section.nav-menu.dark [data-cb-type="nav-menu"] …` provides the dark palette. All styling is scoped under `[data-cb-type="nav-menu"]` (with the `div.is-section.nav-menu` section wrapper as the ContentBox integration point).
