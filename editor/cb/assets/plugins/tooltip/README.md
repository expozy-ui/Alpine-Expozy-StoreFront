# Tooltip

A block that shows a small text tooltip near the cursor on hover. It's a short example of a plugin that creates its own element and cleans it up afterwards.

## The whole plugin

`mount` builds a tooltip element, adds it to the page, and shows/hides it on hover. Because the tooltip is added to `document.body` (so it can sit above everything), `unmount` must remove it — otherwise re-rendering the block would leave old tooltips behind.

```js
export default {
    name: 'tooltip',
    displayName: 'Tooltip',

    mount: function (element, options) {
        var tooltip = document.createElement('div');
        tooltip.textContent = options.text || 'Tooltip';
        tooltip.style.cssText = 'position:fixed; background:#333; color:#fff; padding:5px 10px; border-radius:4px; font-size:12px; display:none; z-index:9999;';
        document.body.appendChild(tooltip);

        function show(e) {
            tooltip.style.display = 'block';
            tooltip.style.left = (e.clientX + 10) + 'px';
            tooltip.style.top = (e.clientY + 10) + 'px';
        }
        function hide() {
            tooltip.style.display = 'none';
        }
        element.addEventListener('mouseenter', show);
        element.addEventListener('mouseleave', hide);

        return { tooltip: tooltip, show: show, hide: hide };
    },

    unmount: function (element, instance) {
        if (!instance) return;
        element.removeEventListener('mouseenter', instance.show);
        element.removeEventListener('mouseleave', instance.hide);
        if (instance.tooltip) instance.tooltip.remove();
    }
};
```

## Use it

```html
<span data-cb-type="tooltip" data-cb-text="Hello from the tooltip!">Hover me</span>
```

## Options

| `data-cb-*` attribute | `options` key | Description |
|---|---|---|
| `data-cb-text` | `options.text` | The tooltip text (defaults to `Tooltip`) |

## Ideas to extend it

- Update the position on `mousemove` so the tooltip follows the cursor (this version positions it only on enter).
- Keep it on-screen when the cursor is near a window edge.
- Show it on keyboard focus too, and link it with `aria-describedby`, for accessibility.
