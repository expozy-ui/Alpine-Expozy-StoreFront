/*
Text Ticker / Marquee plugin for ContentBuilder / ContentBox

A seamless, infinitely-scrolling strip of text items (announcements, headlines,
"now playing", etc.). The items live in an accessible <ul> (the source of truth);
mount() builds a duplicated track so the loop has no gap, and sets a constant
pixels-per-second speed by measuring one copy. Edit the items (add / remove /
reorder) from the content editor — inline-editing moving text isn't practical.
Respects prefers-reduced-motion (no animation; the strip becomes scrollable).

Usage (embed this HTML into your content):

<div data-cb-type="marquee" data-cb-direction="left" data-cb-speed="60" data-cb-separator="•" data-cb-pause-on-hover="true">
    <div class="mq-viewport">
        <div class="mq-track" aria-hidden="true"></div>
    </div>
    <ul class="mq-items">
        <li>Breaking news: we just shipped something great</li>
        <li>50% off for a limited time</li>
        <li>Free shipping worldwide</li>
    </ul>
</div>
*/

export default {
    name: 'marquee',
    displayName: 'Text Ticker',
    version: '1.0.0',

    settings: {
        _groups: [
            { id: 'motion', label: 'Motion', fields: ['direction', 'speed', 'pauseOnHover'] },
            { id: 'style', label: 'Style', fields: ['separator'] },
            { id: 'text', label: 'Text', fields: ['fontSize', 'useCustomColor', 'textColor'] }
        ],
        direction: {
            type: 'select',
            label: 'Direction',
            default: 'left',
            options: [
                { value: 'left', label: 'Left' },
                { value: 'right', label: 'Right' }
            ],
            group: 'motion'
        },
        speed: { type: 'number', label: 'Speed', default: 60, min: 5, max: 300, unit: 'px/s', group: 'motion' },
        pauseOnHover: { type: 'boolean', label: 'Pause on Hover', default: true, group: 'motion' },
        separator: { type: 'text', label: 'Separator', default: '•', placeholder: 'e.g. • or /', group: 'style' },
        fontSize: { type: 'number', label: 'Font Size', default: 16, min: 10, max: 64, unit: 'px', group: 'text' },
        useCustomColor: { type: 'boolean', label: 'Custom Text Color', default: false, group: 'text' },
        textColor: { type: 'color', label: 'Text Color', default: '#111827', group: 'text' }
    },

    editor: {
        openContentEditor: function (element, builder, onChange) {
            const out = (s) => (builder && typeof builder.out === 'function') ? builder.out(s) : s;

            const loadSortable = (() => {
                let p = null;
                return () => {
                    if (window.Sortable) return Promise.resolve(window.Sortable);
                    if (p) return p;
                    p = new Promise((resolve, reject) => {
                        const existing = document.querySelector('script[data-sortable-loader]');
                        if (existing) {
                            existing.addEventListener('load', () => resolve(window.Sortable));
                            existing.addEventListener('error', () => reject(new Error('SortableJS failed')));
                            return;
                        }
                        const s = document.createElement('script');
                        s.src = 'https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js';
                        s.dataset.sortableLoader = 'true';
                        s.onload = () => resolve(window.Sortable);
                        s.onerror = () => { p = null; reject(new Error('Failed to load SortableJS')); };
                        document.head.appendChild(s);
                    });
                    return p;
                };
            })();

            const container = document.createElement('div');
            container.className = 'cbx-stack';

            const list = element.querySelector('.mq-items');
            if (!list) return container;

            const stack = document.createElement('div');
            stack.className = 'cbx-stack';
            container.appendChild(stack);

            const createRow = (li, index) => {
                const row = document.createElement('div');
                row.className = 'cbx-row';
                row.dataset.rowId = li.dataset.rowId || `m-${Date.now()}-${index}`;
                li.dataset.rowId = row.dataset.rowId;

                const drag = document.createElement('span');
                drag.className = 'cbx-drag';
                drag.innerHTML = '⠿';
                drag.setAttribute('aria-label', out('Drag to reorder'));

                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'cbx-grow';
                input.placeholder = out('Ticker text');
                input.value = li.textContent.trim();
                input.setAttribute('aria-label', out('Ticker text'));
                input.addEventListener('input', () => { li.textContent = input.value; onChange?.(); });

                const del = document.createElement('button');
                del.type = 'button';
                del.className = 'cbx-iconbtn is-danger';
                del.setAttribute('aria-label', out('Delete item'));
                del.innerHTML = '<svg aria-hidden="true"><use xlink:href="#icon-trash2"></use></svg>';
                del.onclick = (e) => { e.preventDefault(); li.remove(); row.remove(); onChange?.(); };

                row.append(drag, input, del);
                return row;
            };

            list.querySelectorAll('li').forEach((li, i) => stack.appendChild(createRow(li, i)));

            loadSortable().then((Sortable) => {
                new Sortable(stack, {
                    animation: 150,
                    handle: '.cbx-drag',
                    ghostClass: 'cbx-sortable-ghost',
                    onEnd: function () {
                        const map = new Map();
                        list.querySelectorAll('li').forEach((li) => { if (li.dataset.rowId) map.set(li.dataset.rowId, li); });
                        Array.from(stack.children).forEach((row) => { const li = map.get(row.dataset.rowId); if (li) list.appendChild(li); });
                        onChange?.();
                    }
                });
            }).catch(() => { /* drag optional */ });

            const addBtn = document.createElement('button');
            addBtn.type = 'button';
            addBtn.textContent = out('+ Add Item');
            addBtn.onclick = (e) => {
                e.preventDefault();
                const li = document.createElement('li');
                li.dataset.rowId = `m-${Date.now()}`;
                li.textContent = 'New item';
                list.appendChild(li);
                stack.appendChild(createRow(li, stack.children.length));
                onChange?.();
            };
            container.appendChild(addBtn);

            return container;
        }
    },

    mount: function (element, options) {
        const viewport = element.querySelector('.mq-viewport');
        const track = element.querySelector('.mq-track');
        if (!viewport || !track) return {};

        const items = Array.prototype.map.call(element.querySelectorAll('.mq-items > li'), (li) => li.textContent.trim())
            .filter((t) => t.length);

        track.innerHTML = '';
        track.classList.remove('mq-static');
        track.style.animationDuration = '';
        viewport.style.overflowX = '';
        if (!items.length) return {};

        element.setAttribute('data-cb-direction', options.direction === 'right' ? 'right' : 'left');
        element.setAttribute('data-cb-pause-on-hover', options.pauseOnHover === false ? 'false' : 'true');
        const sep = options.separator == null ? '' : String(options.separator);

        const fs = parseInt(options.fontSize, 10);
        element.style.setProperty('--mq-font-size', (isFinite(fs) && fs > 0 ? fs : 16) + 'px');
        // Color is opt-in: off => inherit from the page (keeps auto light/dark).
        if (options.useCustomColor && options.textColor) {
            element.style.setProperty('--mq-color', options.textColor);
        } else {
            element.style.removeProperty('--mq-color');
        }

        const makeGroup = () => {
            const g = document.createElement('span');
            g.className = 'mq-group';
            items.forEach((text) => {
                const it = document.createElement('span');
                it.className = 'mq-item';
                it.textContent = text;
                g.appendChild(it);
                if (sep) {
                    const s = document.createElement('span');
                    s.className = 'mq-sep';
                    s.setAttribute('aria-hidden', 'true');
                    s.textContent = sep;
                    g.appendChild(s);
                }
            });
            return g;
        };

        const view = element.ownerDocument.defaultView;
        const reduce = view && view.matchMedia && view.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (reduce) {
            // No motion: show a single copy the user can scroll manually.
            track.classList.add('mq-static');
            track.appendChild(makeGroup());
            viewport.style.overflowX = 'auto';
            return {};
        }

        // Two identical copies -> animating the track by -50% loops seamlessly.
        track.appendChild(makeGroup());
        track.appendChild(makeGroup());

        const speed = Math.max(1, parseInt(options.speed, 10) || 60); // px per second

        // Duration must come from the rendered width so px/s is constant. That
        // width isn't reliable at mount time (layout / fonts / this plugin's CSS
        // may not be applied yet, especially on a fresh page load or in preview),
        // so measure with a ResizeObserver: it fires as soon as the real width is
        // known and again on every resize — keeping the speed correct and stable.
        const applySpeed = () => {
            const first = track.firstElementChild;
            if (!first) return;
            const w = first.getBoundingClientRect().width;
            if (w > 0) track.style.animationDuration = (w / speed).toFixed(2) + 's';
        };

        applySpeed(); // immediate — correct when already laid out (e.g. in the editor)

        let ro = null;
        if (view && view.ResizeObserver) {
            ro = new view.ResizeObserver(applySpeed);
            ro.observe(track.firstElementChild);
        } else if (view) {
            view.requestAnimationFrame(() => view.requestAnimationFrame(applySpeed));
        }
        if (element.ownerDocument.fonts && element.ownerDocument.fonts.ready) {
            element.ownerDocument.fonts.ready.then(applySpeed).catch(() => {});
        }

        return { destroy: function () { if (ro) ro.disconnect(); } };
    },

    unmount: function (element, instance) {
        if (instance && typeof instance.destroy === 'function') instance.destroy();
    }
};
