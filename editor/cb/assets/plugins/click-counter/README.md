# Click Counter

A block that counts how many times it's clicked and updates its own text. It's the smallest kind of ContentBuilder plugin — a good starting point for learning how a plugin is put together.

## The whole plugin

A plugin is an object with a `name` and a `mount(element, options)` function. `mount` runs when the block is rendered (`element` is the block). Return an object — the plugin's "instance" — and an optional `unmount(element, instance)` runs when the block is removed or re-rendered, to undo what `mount` set up.

```js
export default {
    name: 'click-counter',
    displayName: 'Click Counter',

    mount: function (element, options) {
        var count = 0;
        function handleClick() {
            count = count + 1;
            element.textContent = 'Clicks: ' + count;
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

`unmount` removes the click listener that `mount` added, so a re-render doesn't stack up duplicate listeners.

## Use it

```html
<div data-cb-type="click-counter">Clicks: 0</div>
```

`data-cb-type` matches the plugin's `name` — that's what connects the block to the plugin.

## Options

None.

## Ideas to extend it

- Add a `settings` object to expose choices (a starting number, a custom label) as an auto-generated options panel.
- Add an `editor` with `openContentEditor` to edit the block's content from a side panel.
