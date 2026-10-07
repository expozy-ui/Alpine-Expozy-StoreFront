/*
Flip Card plugin for ContentBuilder / ContentBox

A card with a front and a back face that flips on hover or click. Both faces are
inline-editable rich text. Because the back face is rotated away (and hidden by
backface-visibility) it can't be edited in place, so in the editor the flip is
flattened and a Front / Back switcher (in the content editor) chooses which side
you're editing.

Usage (embed this HTML into your content):

<div data-cb-type="flip-card" data-cb-trigger="hover" data-cb-axis="horizontal" data-cb-height="280" data-cb-accent-color="#3b82f6">
    <div class="fc-inner">
        <div class="fc-face fc-front">
            <div class="is-subblock edit">
                <h3>Hover to flip</h3>
                <p>The front of the card.</p>
            </div>
        </div>
        <div class="fc-face fc-back">
            <div class="is-subblock edit">
                <h3>The back</h3>
                <p>More details revealed on flip.</p>
            </div>
        </div>
    </div>
</div>
*/

export default {
    name: 'flip-card',
    displayName: 'Flip Card',
    version: '1.0.0',

    settings: {
        _groups: [
            { id: 'behavior', label: 'Behavior', fields: ['trigger', 'axis'] },
            { id: 'appearance', label: 'Appearance', fields: ['height', 'accentColor'] }
        ],
        trigger: {
            type: 'select',
            label: 'Flip On',
            default: 'hover',
            options: [
                { value: 'hover', label: 'Hover' },
                { value: 'click', label: 'Click' }
            ],
            group: 'behavior'
        },
        axis: {
            type: 'select',
            label: 'Direction',
            default: 'horizontal',
            options: [
                { value: 'horizontal', label: 'Horizontal' },
                { value: 'vertical', label: 'Vertical' }
            ],
            group: 'behavior'
        },
        height: { type: 'number', label: 'Height', default: 280, min: 120, max: 720, unit: 'px', group: 'appearance' },
        accentColor: { type: 'color', label: 'Back Color', default: '#3b82f6', group: 'appearance' }
    },

    mount: function (element, options) {
        const doc = element.ownerDocument;
        const inEditor = doc.body.classList.contains('data-editor');
        const trigger = options.trigger === 'click' ? 'click' : 'hover';

        element.style.setProperty('--fc-accent', options.accentColor || '#3b82f6');
        const h = parseInt(options.height, 10);
        element.style.setProperty('--fc-height', (isFinite(h) && h > 0 ? h : 280) + 'px');

        // Localize the editor-only "Click to flip" badge. The badge itself is a
        // CSS ::before that reads --fc-flip-label; here we resolve the string from
        // the same source builder.out() uses (the global _txt lang map) and hand
        // it to CSS as a quoted string. Editor-only, so nothing is set on the live
        // page (where the badge never shows anyway).
        if (inEditor) {
            const dict = doc.defaultView && doc.defaultView._txt;
            const label = (dict && dict['Click to flip']) || 'Click to flip';
            element.style.setProperty('--fc-flip-label', JSON.stringify(label));
        }

        // Reset interactive state from a previous mount
        element.classList.remove('is-flipped');
        element.removeAttribute('role');
        element.removeAttribute('tabindex');
        element.removeAttribute('aria-pressed');

        // Wire click-to-flip when the live trigger is "click", AND always in the
        // editor. In the editor, hover-flip is disabled (CSS) because it would
        // trap you on the back face with no way to reach the front — so the card
        // flips on click there instead: click an empty area of the card to flip,
        // click the text to edit it. The flip works live while you edit.
        let cleanup = null;
        const wantClick = inEditor || trigger === 'click';
        if (wantClick) {
            const asButton = trigger === 'click' && !inEditor;
            if (asButton) {
                element.setAttribute('role', 'button');
                element.setAttribute('tabindex', '0');
                element.setAttribute('aria-pressed', 'false');
            }
            const toggle = () => {
                const flipped = element.classList.toggle('is-flipped');
                if (element.hasAttribute('aria-pressed')) element.setAttribute('aria-pressed', flipped ? 'true' : 'false');
            };
            const onClick = (e) => {
                if (e.target.closest('a, button, input, textarea, select')) return; // real controls
                if (inEditor && e.target.closest('.edit')) return;                   // editing text — don't flip
                toggle();
            };
            element.addEventListener('click', onClick);
            let onKey = null;
            if (asButton) {
                onKey = (e) => {
                    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); toggle(); }
                };
                element.addEventListener('keydown', onKey);
            }
            cleanup = () => {
                element.removeEventListener('click', onClick);
                if (onKey) element.removeEventListener('keydown', onKey);
            };
        }

        return { destroy: function () { if (cleanup) cleanup(); } };
    },

    unmount: function (element, instance) {
        if (instance && typeof instance.destroy === 'function') instance.destroy();
    }
};
