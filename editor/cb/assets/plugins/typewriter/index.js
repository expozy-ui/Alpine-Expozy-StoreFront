/*
Typewriter plugin for ContentBuilder / ContentBox

A headline with a rotating word/phrase — typed out character by character (or
cross-faded). Edit the prefix/suffix inline; manage the rotating words (add /
remove / reorder) from the content editor. Respects prefers-reduced-motion
(shows the first word statically). The effect runs in the editor too.

Usage (embed this HTML into your content):

<div data-cb-type="typewriter" data-cb-effect="type" data-cb-type-speed="70" data-cb-pause="1400" data-cb-cursor="true" data-cb-loop="true" data-cb-accent-color="#3b82f6">
    <h2 class="tw-line">
        <span class="tw-prefix edit">We build </span>
        <span class="tw-rotate" aria-hidden="true">websites</span>
        <span class="tw-suffix edit"></span>
    </h2>
    <ul class="tw-words">
        <li>websites</li>
        <li>brands</li>
        <li>experiences</li>
    </ul>
</div>

The heading level (h1/h2/h3 or plain paragraph) is chosen in the content editor
and saved into the HTML. The rotating word is pre-filled with the first word so the
phrase is complete before JS runs (better for crawlers, and no layout shift).
*/

export default {
    name: 'typewriter',
    displayName: 'Typewriter',
    version: '1.0.0',

    settings: {
        _groups: [
            { id: 'effect', label: 'Effect', fields: ['effect', 'cursor', 'loop'] },
            { id: 'timing', label: 'Timing', fields: ['typeSpeed', 'pause'] },
            { id: 'appearance', label: 'Appearance', fields: ['accentColor'] }
        ],
        effect: {
            type: 'select',
            label: 'Effect',
            default: 'type',
            options: [
                { value: 'type', label: 'Typewriter' },
                { value: 'fade', label: 'Fade' }
            ],
            group: 'effect'
        },
        cursor: { type: 'boolean', label: 'Show Cursor', default: true, group: 'effect' },
        loop: { type: 'boolean', label: 'Loop', default: true, group: 'effect' },
        typeSpeed: { type: 'number', label: 'Type Speed', default: 70, min: 10, max: 300, unit: 'ms', group: 'timing' },
        pause: { type: 'number', label: 'Hold', default: 1400, min: 200, max: 6000, unit: 'ms', group: 'timing' },
        accentColor: { type: 'color', label: 'Word Color', default: '#3b82f6', group: 'appearance' }
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

            const list = element.querySelector('.tw-words');
            if (!list) return container;

            // ── Heading level (structural — the tag is saved into the content so
            // search engines see a real heading). Wrap the line if it isn't already. ──
            const ensureLine = () => {
                let line = element.querySelector('.tw-line');
                if (!line) {
                    const parts = Array.from(element.querySelectorAll('.tw-prefix, .tw-rotate, .tw-suffix'));
                    line = document.createElement('h2');
                    line.className = 'tw-line';
                    if (parts.length && parts[0].parentNode) {
                        parts[0].parentNode.insertBefore(line, parts[0]);
                        parts.forEach((p) => line.appendChild(p));
                    } else {
                        element.insertBefore(line, element.firstChild);
                    }
                }
                return line;
            };
            const setLineTag = (tag) => {
                const line = ensureLine();
                if (line.tagName.toLowerCase() === tag) return;
                const el = document.createElement(tag);
                el.className = line.className;
                while (line.firstChild) el.appendChild(line.firstChild);
                line.parentNode.replaceChild(el, line);
                onChange?.();
            };

            const headingField = document.createElement('div');
            headingField.className = 'cbx-field';
            const headingLabel = document.createElement('label');
            headingLabel.textContent = out('Heading Level');
            const headingSelect = document.createElement('select');
            [
                ['h1', out('H1 — page title (once per page)')],
                ['h2', out('H2 — section heading (recommended)')],
                ['h3', out('H3 — subheading')],
                ['p', out('Paragraph — no heading')]
            ].forEach(([value, labelText]) => {
                const o = document.createElement('option');
                o.value = value;
                o.textContent = labelText;
                headingSelect.appendChild(o);
            });
            const curTag = ensureLine().tagName.toLowerCase();
            headingSelect.value = ['h1', 'h2', 'h3', 'p'].includes(curTag) ? curTag : 'h2';
            headingSelect.addEventListener('change', () => setLineTag(headingSelect.value));
            headingField.append(headingLabel, headingSelect);
            container.appendChild(headingField);

            const stack = document.createElement('div');
            stack.className = 'cbx-stack';
            container.appendChild(stack);

            const createRow = (li, index) => {
                const row = document.createElement('div');
                row.className = 'cbx-row';
                row.dataset.rowId = li.dataset.rowId || `w-${Date.now()}-${index}`;
                li.dataset.rowId = row.dataset.rowId;

                const drag = document.createElement('span');
                drag.className = 'cbx-drag';
                drag.innerHTML = '⠿';
                drag.setAttribute('aria-label', out('Drag to reorder'));

                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'cbx-grow';
                input.placeholder = out('Word or phrase');
                input.value = li.textContent.trim();
                input.setAttribute('aria-label', out('Word or phrase'));
                input.addEventListener('input', () => { li.textContent = input.value; onChange?.(); });

                const del = document.createElement('button');
                del.type = 'button';
                del.className = 'cbx-iconbtn is-danger';
                del.setAttribute('aria-label', out('Delete word'));
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
            addBtn.textContent = out('+ Add Word');
            addBtn.onclick = (e) => {
                e.preventDefault();
                const li = document.createElement('li');
                li.dataset.rowId = `w-${Date.now()}`;
                li.textContent = 'new';
                list.appendChild(li);
                stack.appendChild(createRow(li, stack.children.length));
                onChange?.();
            };
            container.appendChild(addBtn);

            return container;
        }
    },

    mount: function (element, options) {
        const rotate = element.querySelector('.tw-rotate');
        if (!rotate) return {};

        element.style.setProperty('--tw-accent', options.accentColor || '#3b82f6');
        element.setAttribute('data-cb-cursor', options.cursor === false ? 'false' : 'true');

        const words = Array.prototype.map.call(element.querySelectorAll('.tw-words > li'), (li) => li.textContent.trim())
            .filter((w) => w.length);
        if (!words.length) { rotate.textContent = ''; return {}; }

        const reduce = element.ownerDocument.defaultView.matchMedia
            && element.ownerDocument.defaultView.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) { rotate.textContent = words[0]; return {}; }

        const effect = options.effect === 'fade' ? 'fade' : 'type';
        const typeSpeed = Math.max(10, parseInt(options.typeSpeed, 10) || 70);
        const pause = Math.max(200, parseInt(options.pause, 10) || 1400);
        const loop = options.loop !== false;

        let timer = null;
        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        const typeTick = () => {
            const word = words[wordIndex];
            if (!deleting) {
                charIndex++;
                rotate.textContent = word.slice(0, charIndex);
                if (charIndex >= word.length) {
                    if (!loop && wordIndex === words.length - 1) return; // stop on last
                    deleting = true;
                    timer = setTimeout(typeTick, pause);
                    return;
                }
                timer = setTimeout(typeTick, typeSpeed);
            } else {
                charIndex--;
                rotate.textContent = word.slice(0, charIndex);
                if (charIndex <= 0) {
                    deleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                    timer = setTimeout(typeTick, typeSpeed * 3);
                    return;
                }
                timer = setTimeout(typeTick, Math.max(20, typeSpeed * 0.5));
            }
        };

        const fadeTick = () => {
            rotate.textContent = words[wordIndex];
            rotate.classList.remove('is-out');
            rotate.classList.add('is-in');
            timer = setTimeout(() => {
                rotate.classList.remove('is-in');
                rotate.classList.add('is-out');
                timer = setTimeout(() => {
                    if (!loop && wordIndex === words.length - 1) return;
                    wordIndex = (wordIndex + 1) % words.length;
                    fadeTick();
                }, 400);
            }, pause);
        };

        element.setAttribute('data-cb-effect', effect);
        if (effect === 'fade') fadeTick(); else typeTick();

        return { destroy: function () { if (timer) clearTimeout(timer); } };
    },

    unmount: function (element, instance) {
        if (instance && typeof instance.destroy === 'function') instance.destroy();
    }
};
