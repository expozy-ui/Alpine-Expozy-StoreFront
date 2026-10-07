# Social Share

A row of share buttons — X, Facebook, LinkedIn, WhatsApp, Copy Link, and a "More" dropdown (Reddit, Telegram, Email). Buttons open the platform's share dialog in a popup; Copy Link writes the current URL to the clipboard. Choose which platforms show, the alignment, and an optional label in the settings.

- **Server-side required:** No — purely client-side. Sharing uses each platform's public share URL; Copy Link uses the browser Clipboard API.
- **External dependencies:** None.

## Embed code

```html
<div data-cb-type="social-share" data-cb-alignment="left" data-cb-show-label="true" data-cb-label-text="Share" data-cb-show-x="true" data-cb-show-facebook="true" data-cb-show-linked-in="true" data-cb-show-whats-app="true" data-cb-show-copy-link="true" data-cb-show-more="true"></div>
```

The button row is built by `mount`, so the element can be empty in saved content — the `data-cb-*` attributes drive what renders.

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | Description |
|---|---|---|---|
| `data-cb-show-x` | `true` / `false` | `true` | Show X (Twitter) |
| `data-cb-show-facebook` | `true` / `false` | `true` | Show Facebook |
| `data-cb-show-linked-in` | `true` / `false` | `true` | Show LinkedIn |
| `data-cb-show-whats-app` | `true` / `false` | `true` | Show WhatsApp |
| `data-cb-show-copy-link` | `true` / `false` | `true` | Show Copy Link |
| `data-cb-show-more` | `true` / `false` | `true` | Show the "More" dropdown (Reddit / Telegram / Email) |
| `data-cb-share-title` | text | *(empty)* | Share title; empty falls back to the page `<title>` |
| `data-cb-share-text` | text | *(empty)* | Share description; empty falls back to the page meta description |
| `data-cb-alignment` | `left` / `center` / `right` | `left` | Row alignment |
| `data-cb-show-label` | `true` / `false` | `true` | Show the label before the buttons |
| `data-cb-label-text` | text | `Share` | Label text |

## Structure & behavior notes

- What's shared is the **current page** — `mount` reads `window.location.href`, falling back to the page title / meta description when `shareTitle` / `shareText` aren't set. So it shares the live URL, not a per-block value.
- Buttons carry ARIA roles/labels; the "More" dropdown is a keyboard-navigable menu (↑/↓/Home/End/Escape) and closes on outside click. Copy Link shows a ✓ and announces success to screen readers.
- The settings panel is auto-generated from the `settings` schema, so its field labels are translated by the editor's built-in mechanism — no custom editor code.

## Dark mode

Dark mode for the rendered block is the site's responsibility. Colors (label, button, dropdown surface/border/menu items) are CSS variables and `style.css` ships a ready-made dark palette **commented out** — uncomment it and point the selector at your site's theme trigger.

All styling is scoped under `[data-cb-type="social-share"]`.
