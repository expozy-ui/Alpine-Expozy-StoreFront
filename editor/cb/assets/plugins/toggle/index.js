export default {
    name: 'toggle',
    displayName: 'Toggle',
    version: '1.0.0',

    mount: function (element, options) {
        var target = document.getElementById(options.target);

        if (!target) {
            console.error('Target element not found:', options.target);
            return null;
        }

        // Show/hide the target on click
        function handleClick() {
            target.style.display = (target.style.display === 'none') ? 'block' : 'none';
        }
        element.addEventListener('click', handleClick);

        // Return the instance so unmount can clean up
        return { handleClick: handleClick };
    },

    // Called when the block is removed or re-rendered — remove what mount added
    unmount: function (element, instance) {
        if (instance && instance.handleClick) {
            element.removeEventListener('click', instance.handleClick);
        }
    }
};
