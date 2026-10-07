# Code View

A syntax-highlighted code block you type into directly on the page — no dialog, no panel. Highlighting follows the code as you type, with an optional file-name bar, line numbers and a copy button.

- **Server-side required:** No.
- **External dependencies:** None. The highlighter ships with the plugin.

## Embed code

```html
<div data-cb-type="code-view" data-cb-theme="light" data-cb-language="auto" data-cb-copy-button="true">
    <pre><code class="edit">const greet = (name) =&gt; `Hello, ${name}!`;
console.log(greet('World'));</code></pre>
</div>
```

The code lives in the block's own markup, so search engines see it and it reads correctly with JavaScript turned off.

## Options (`data-cb-*` attributes)

| Attribute | Values | Default | What it does |
|---|---|---|---|
| `data-cb-theme` | `light`, `dark`, `midnight` | `light` | Colour scheme of the block. |
| `data-cb-language` | `auto`, `html`, `css`, `javascript`, `typescript`, `json`, `python`, `php`, `bash`, `sql`, `plain` | `auto` | Language to highlight. `auto` detects it from the code. |
| `data-cb-filename` | any text | *(empty)* | Shows a file-name bar above the code. Empty means no bar. |
| `data-cb-line-numbers` | `true`, `false` | `false` | Numbers down the left side. |
| `data-cb-wrap` | `true`, `false` | `false` | Wrap long lines instead of scrolling them sideways. |
| `data-cb-copy-button` | `true`, `false` | `true` | Copy-to-clipboard button. |
| `data-cb-copy-label` | any text | `Copy` | Its tooltip. Change it for a non-English site. |
| `data-cb-copied-label` | any text | `Copied` | The tooltip after a successful copy. |
| `data-cb-tab-size` | `2`, `4` | `2` | Spaces per indent level, used by Tab and by auto-indent. |
| `data-cb-auto-close` | `true`, `false` | `true` | Typing `(`, `[`, `{`, `"`, `'` or `` ` `` inserts the closing half. |

## Editing the code

Click into the block and type. What the keys do:

| Key | Action |
|---|---|
| `Enter` | New line, keeping the current indentation. Between `{` and `}` it opens them onto three lines. |
| `Tab` / `Shift`+`Tab` | Indent or outdent. With lines selected, it shifts all of them. |
| `Cmd`/`Ctrl` + `/` | Comment or uncomment the selected lines, in the block's language. |
| `Alt` + `↑` / `↓` | Move the current line, or the selected lines, up or down. |
| `Shift`+`Alt` + `↑` / `↓` | Duplicate them. |
| `Home` | Jump to the first character of the line; press again for column 0. |
| `Cmd`/`Ctrl` + `A` | Select the code in this block only. |
| `Esc` | Leave the block, so `Tab` can move on to the next control. |

Pasted text always arrives as plain text — formatting from the source is dropped. A snippet copied from deep inside a file is re-indented to where you paste it, so it doesn't land with the original file's indentation in front of it.

## Structure notes

- The code must sit in `<pre><code class="edit">…</code></pre>`. The `edit` class is what makes it typeable in the editor; escape `<` as `&lt;` so the markup inside stays visible instead of rendering.
- Highlighting is written as `<span class="cbcode-*">` around the code. Those spans are part of the saved page, so a visitor sees colours even before JavaScript runs.
- The file-name bar, the line-number gutter and the copy button are built at runtime and are **not** part of the saved HTML. The file name itself is kept in `data-cb-filename`.
- On the published page, a block wider than its box gets `tabindex="0"` so it can be scrolled with the arrow keys; a block that fits takes no tab stop.
- Colours come from CSS variables (`--code-bg`, `--code-keyword`, …) defined per theme in `style.css`, so a site can override any of them.

## Dark mode

Set the Theme option (or `data-cb-theme`) to `dark` or `midnight`.
