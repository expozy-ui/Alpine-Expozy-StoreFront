/*
Section Divider plugin for ContentBuilder / ContentBox

A decorative in-flow divider between sections. Pick a style (plain line, dashed,
dotted, gradient, dots, a centered icon, or a centered editable label), and set
the color, thickness, width, and vertical spacing. The label (label style) is
edited inline.

Usage (embed this HTML into your content):

<div data-cb-type="section-divider" data-cb-style="line" data-cb-color="#d1d5db" data-cb-thickness="1" data-cb-width="100" data-cb-space="24">
    <span class="sd-line sd-line-left"></span>
    <span class="sd-center"><span class="sd-label edit">Section</span></span>
    <span class="sd-line sd-line-right"></span>
</div>
*/

export default {
    name: 'section-divider',
    displayName: 'Section Divider',
    version: '1.0.0',

    settings: {
        _groups: [
            { id: 'style', label: 'Style', fields: ['style', 'color'] },
            { id: 'size', label: 'Size', fields: ['thickness', 'width', 'space'] }
        ],
        style: {
            type: 'select',
            label: 'Style',
            default: 'line',
            options: [
                { value: 'line', label: 'Line' },
                { value: 'dashed', label: 'Dashed' },
                { value: 'dotted', label: 'Dotted' },
                { value: 'gradient', label: 'Gradient' },
                { value: 'dots', label: 'Dots' },
                { value: 'icon', label: 'Icon' },
                { value: 'label', label: 'Label' }
            ],
            group: 'style'
        },
        color: { type: 'color', label: 'Color', default: '#d1d5db', group: 'style' },
        thickness: { type: 'number', label: 'Thickness', default: 1, min: 1, max: 8, unit: 'px', group: 'size' },
        width: { type: 'range', label: 'Width', default: 100, min: 20, max: 100, unit: '%', group: 'size' },
        space: { type: 'number', label: 'Spacing', default: 24, min: 0, max: 96, unit: 'px', group: 'size' }
    },

    mount: function (element, options) {
        element.style.setProperty('--sd-color', options.color || '#d1d5db');

        const t = parseInt(options.thickness, 10);
        element.style.setProperty('--sd-thickness', (isFinite(t) && t > 0 ? t : 1) + 'px');

        const w = parseInt(options.width, 10);
        element.style.setProperty('--sd-width', (isFinite(w) && w > 0 ? Math.min(100, w) : 100) + '%');

        const s = parseInt(options.space, 10);
        element.style.setProperty('--sd-space', (isFinite(s) && s >= 0 ? s : 24) + 'px');

        element.setAttribute('role', 'separator');
        element.setAttribute('aria-orientation', 'horizontal');

        return {};
    },

    unmount: function () {}
};
