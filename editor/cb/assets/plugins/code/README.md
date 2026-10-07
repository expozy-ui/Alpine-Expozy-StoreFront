# Code

A minimal placeholder plugin. It marks a block as `data-cb-type="code"` but currently has **no settings, no editor, and no runtime behavior** — its `mount` does nothing.

- **Server-side required:** No.
- **External dependencies:** None.

## Embed code

```html
<div data-cb-type="code">
    <pre><code>your code here</code></pre>
</div>
```

## Status

This is effectively a stub — the block's content is whatever markup you put inside it; the plugin adds nothing on top yet. If you want it to do something (syntax highlighting, a copy-to-clipboard button, language selection, etc.), that behavior still needs to be built.
