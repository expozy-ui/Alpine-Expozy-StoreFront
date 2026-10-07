export default {
    name: 'click-counter',
    displayName: 'Click Counter',
    version: '1.0.0',

    mount: function (element, options) {
        var count = 0;

        // Update the text each time the block is clicked
        function handleClick() {
            count = count + 1;
            element.textContent = 'Clicks: ' + count;
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
