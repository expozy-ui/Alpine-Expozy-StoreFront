export default {
    name: 'tooltip',
    displayName: 'Tooltip',
    version: '1.0.0',

    mount: function (element, options) {
        var tooltip = document.createElement('div');
        tooltip.textContent = options.text || 'Tooltip';
        tooltip.style.cssText = 'position:fixed; background:#333; color:#fff; ' +
                                'padding:5px 10px; border-radius:4px; font-family: system-ui, sans-serif;' +
                                'font-size:12px; display:none; z-index:9999;';
        document.body.appendChild(tooltip);

        // Show near the cursor on hover, hide on leave
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

        // Return the instance so unmount can clean up
        return { tooltip: tooltip, show: show, hide: hide };
    },

    // Called when the block is removed or re-rendered. The tooltip lives on
    // document.body, so it must be removed here or it would pile up on re-render.
    unmount: function (element, instance) {
        if (!instance) return;
        element.removeEventListener('mouseenter', instance.show);
        element.removeEventListener('mouseleave', instance.hide);
        if (instance.tooltip) instance.tooltip.remove();
    }
};
