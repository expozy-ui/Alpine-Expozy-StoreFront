# Toggle

A block that shows or hides another element on the page when clicked. It's a small example of a plugin that reads an option and acts on a different element.

## The whole plugin

`mount` receives `options` (from the block's `data-cb-*` attributes). Here it reads the id of the element to toggle, checks it exists, and adds a click handler. `unmount` removes that handler on teardown.

```js
export default {
    name: 'toggle',
    displayName: 'Toggle',

    mount: function (element, options) {
        var target = document.getElementById(options.target);
        if (!target) {
            console.error('Target element not found:', options.target);
            return null;
        }
        function handleClick() {
            target.style.display = (target.style.display === 'none') ? 'block' : 'none';
        }
        element.addEventListener('click', handleClick);
        return { handleClick: handleClick };
    },

    unmount: function (element, instance) {
        if (instance && instance.handleClick) {
            element.removeEventListener('click', instance.handleClick);
        }
    }
};
```

## Use it

```html
<button data-cb-type="toggle" data-cb-target="details">Show / hide details</button>

<div id="details">
    <p>This panel is toggled by the button above.</p>
</div>
```

## Options

| `data-cb-*` attribute | `options` key | Description |
|---|---|---|
| `data-cb-target` | `options.target` | The `id` of the element to show/hide |

A `data-cb-<name>` attribute becomes `options.<name>` (camelCased), which is how options reach `mount`.

## Ideas to extend it

- Keep `aria-expanded` on the button and `aria-controls` pointing at the target in sync, for accessibility.
- Animate the show/hide instead of toggling `display`.
- Add a `settings` option to start collapsed.
