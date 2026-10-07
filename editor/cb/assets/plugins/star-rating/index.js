/*
Star Rating plugin for ContentBuilder / ContentBox

A display star rating out of 5 (supports halves/fractions via a clipped overlay),
with an optional numeric value and an editable caption ("Based on 128 reviews").
Set the rating in the settings; edit the caption inline. mount() paints the fill.

Usage (embed this HTML into your content):

<div data-cb-type="star-rating" data-cb-rating="4.5" data-cb-size="medium" data-cb-show-value="true" data-cb-accent-color="#f59e0b" role="img" aria-label="Rated 4.5 out of 5">
    <span class="sr-stars" aria-hidden="true">
        <span class="sr-stars-bg">★★★★★</span>
        <span class="sr-stars-fill">★★★★★</span>
    </span>
    <span class="sr-value">4.5</span>
    <span class="sr-caption edit">Based on 128 reviews</span>
</div>
*/

export default {
    name: 'star-rating',
    displayName: 'Star Rating',
    version: '1.0.0',

    settings: {
        _groups: [
            { id: 'content', label: 'Rating', fields: ['rating', 'showValue'] },
            { id: 'appearance', label: 'Appearance', fields: ['size', 'accentColor'] }
        ],
        rating: { type: 'range', label: 'Rating', default: 4.5, min: 0, max: 5, step: 0.5, unit: ' / 5', group: 'content' },
        showValue: { type: 'boolean', label: 'Show Number', default: true, group: 'content' },
        size: {
            type: 'select',
            label: 'Size',
            default: 'medium',
            options: [
                { value: 'small', label: 'Small' },
                { value: 'medium', label: 'Medium' },
                { value: 'large', label: 'Large' }
            ],
            group: 'appearance'
        },
        accentColor: { type: 'color', label: 'Star Color', default: '#f59e0b', group: 'appearance' }
    },

    mount: function (element, options) {
        let rating = parseFloat(options.rating);
        if (!isFinite(rating)) rating = 0;
        rating = Math.max(0, Math.min(5, rating));

        element.style.setProperty('--sr-accent', options.accentColor || '#f59e0b');

        const fill = element.querySelector('.sr-stars-fill');
        if (fill) fill.style.width = (rating / 5 * 100) + '%';

        const valueEl = element.querySelector('.sr-value');
        if (valueEl) valueEl.textContent = rating % 1 === 0 ? String(rating) : rating.toFixed(1);

        element.setAttribute('role', 'img');
        element.setAttribute('aria-label', 'Rated ' + (rating % 1 === 0 ? rating : rating.toFixed(1)) + ' out of 5');

        return {};
    },

    unmount: function () {}
};
