/*
Usage:

<div data-cb-type="callout-box" data-cb-style="info" class="callout-box callout-info">
    <h3 class="edit">Important Information</h3>
    <div class="is-subblock edit">
        <p>This is an important message with <strong>formatting</strong>!</p>
        <p>You can add multiple paragraphs and <a href="#">links</a>.</p>
    </div>
</div>
*/

export default {
    name: 'callout-box',
    displayName: 'Callout Box',
    version: '1.0.0',

    settings: {
        style: {
            type: 'select',
            label: 'Style',
            defaultValue: 'info',
            options: [
                { value: 'info', label: 'Info' },
                { value: 'success', label: 'Success' },
                { value: 'warning', label: 'Warning' },
                { value: 'error', label: 'Error' }
            ]
        }
    },

    editor: {
        openContentEditor: function (element, builder, onChange) {
            const out = (s) => (builder && typeof builder.out === 'function') ? builder.out(s) : s;

            const container = document.createElement('div');
            container.className = 'cbx-stack';

            const info = document.createElement('div');
            info.className = 'cbx-hint';
            info.innerHTML = `
                <p><strong>${out('Editable content')}</strong></p>
                <ul>
                    <li><strong>${out('Title')}</strong> — ${out('single-line text')}</li>
                    <li><strong>${out('Content')}</strong> — ${out('rich text (formatting enabled)')}</li>
                </ul>
                <p><em>${out('Click the text in the preview to edit it.')}</em></p>
            `;

            container.appendChild(info);
            return container;
        }
    },

    mount: function (element, options) {
        // Apply style class
        const style = options.style || 'info';
        element.className = `callout-box callout-${style}`;
        
        return {};
    }
};