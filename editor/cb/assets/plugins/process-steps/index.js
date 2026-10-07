/*
Process Steps / Stepper plugin for ContentBuilder / ContentBox

A numbered sequence of steps ("How it works") — horizontal or vertical, with a
connector line between the numbers. Add / remove / reorder steps and edit each
(title + description) from the editor. Numbers are assigned automatically by
mount() from position, so reordering just works.

Usage (embed this HTML into your content):

<div data-cb-type="process-steps" data-cb-layout="horizontal" data-cb-connector="true" data-cb-accent-color="#3b82f6" role="list" aria-label="Process steps">
    <div class="ps-list">
        <div class="ps-step" role="listitem">
            <div class="ps-num">1</div>
            <div class="ps-body"><h3 class="ps-title">Sign up</h3><p class="ps-desc">Create your free account in seconds.</p></div>
        </div>
        <div class="ps-step" role="listitem">
            <div class="ps-num">2</div>
            <div class="ps-body"><h3 class="ps-title">Customize</h3><p class="ps-desc">Set things up the way you like.</p></div>
        </div>
        <div class="ps-step" role="listitem">
            <div class="ps-num">3</div>
            <div class="ps-body"><h3 class="ps-title">Launch</h3><p class="ps-desc">Go live and share with the world.</p></div>
        </div>
    </div>
</div>
*/

export default {
    name: 'process-steps',
    displayName: 'Process Steps',
    version: '1.0.0',

    settings: {
        _groups: [
            { id: 'layout', label: 'Layout', fields: ['layout', 'connector'] },
            { id: 'appearance', label: 'Appearance', fields: ['accentColor'] }
        ],
        layout: {
            type: 'select',
            label: 'Layout',
            default: 'horizontal',
            options: [
                { value: 'horizontal', label: 'Horizontal' },
                { value: 'vertical', label: 'Vertical' }
            ],
            group: 'layout'
        },
        connector: { type: 'boolean', label: 'Connector Line', default: true, group: 'layout' },
        accentColor: { type: 'color', label: 'Accent Color', default: '#3b82f6', group: 'appearance' }
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

            const list = element.querySelector('.ps-list');
            if (!list) return container;

            const stack = document.createElement('div');
            stack.className = 'cbx-stack';
            container.appendChild(stack);

            const createEditor = (step, index) => {
                const item = document.createElement('div');
                item.className = 'cbx-item';
                item.dataset.stepId = step.dataset.stepId || `s-${Date.now()}-${index}`;
                step.dataset.stepId = item.dataset.stepId;

                const head = document.createElement('div');
                head.className = 'cbx-item-head';
                const drag = document.createElement('span');
                drag.className = 'cbx-drag';
                drag.innerHTML = '⠿';
                const title = document.createElement('span');
                title.className = 'cbx-title';
                title.textContent = step.querySelector('.ps-title')?.textContent || `${out('Step')} ${index + 1}`;
                const del = document.createElement('button');
                del.type = 'button';
                del.className = 'cbx-iconbtn is-danger';
                del.setAttribute('aria-label', out('Delete step'));
                del.innerHTML = '<svg><use xlink:href="#icon-trash2"></use></svg>';
                del.onclick = (e) => { e.preventDefault(); step.remove(); item.remove(); onChange?.(); };
                head.append(drag, title, del);

                const body = document.createElement('div');
                body.className = 'cbx-item-body';
                body.style.display = 'none';

                const addField = (labelText, control) => {
                    const f = document.createElement('div');
                    f.className = 'cbx-field';
                    const l = document.createElement('label');
                    l.textContent = labelText;
                    f.append(l, control);
                    body.appendChild(f);
                    return f;
                };
                const setText = (selector, tag, value) => {
                    let el = step.querySelector(selector);
                    if (!el && value) {
                        el = document.createElement(tag);
                        el.className = selector.replace('.', '');
                        step.querySelector('.ps-body')?.appendChild(el);
                    }
                    if (el) el.textContent = value;
                };

                const titleIn = document.createElement('input');
                titleIn.type = 'text';
                titleIn.value = step.querySelector('.ps-title')?.textContent || '';
                titleIn.placeholder = out('Step title');
                titleIn.addEventListener('input', () => {
                    setText('.ps-title', 'h3', titleIn.value);
                    title.textContent = titleIn.value || `${out('Step')} ${index + 1}`;
                    onChange?.();
                });
                addField(out('Title'), titleIn);

                const descIn = document.createElement('textarea');
                descIn.rows = 2;
                descIn.value = step.querySelector('.ps-desc')?.textContent || '';
                descIn.placeholder = out('Short description');
                descIn.addEventListener('input', () => { setText('.ps-desc', 'p', descIn.value); onChange?.(); });
                addField(out('Description'), descIn);

                head.addEventListener('click', (e) => {
                    if (e.target.closest('.cbx-drag') || e.target.closest('button')) return;
                    body.style.display = body.style.display === 'none' ? '' : 'none';
                });

                item.append(head, body);
                return item;
            };

            list.querySelectorAll('.ps-step').forEach((step, i) => stack.appendChild(createEditor(step, i)));

            loadSortable().then((Sortable) => {
                new Sortable(stack, {
                    animation: 150,
                    handle: '.cbx-drag',
                    ghostClass: 'cbx-sortable-ghost',
                    onEnd: function () {
                        const map = new Map();
                        list.querySelectorAll('.ps-step').forEach((s) => { if (s.dataset.stepId) map.set(s.dataset.stepId, s); });
                        Array.from(stack.children).forEach((ed) => { const s = map.get(ed.dataset.stepId); if (s) list.appendChild(s); });
                        onChange?.();
                    }
                });
            }).catch(() => { /* drag optional */ });

            const addBtn = document.createElement('button');
            addBtn.type = 'button';
            addBtn.textContent = out('+ Add Step');
            addBtn.onclick = (e) => {
                e.preventDefault();
                const step = document.createElement('div');
                step.className = 'ps-step';
                step.setAttribute('role', 'listitem');
                step.dataset.stepId = `s-${Date.now()}`;
                step.innerHTML = `
                    <div class="ps-num">${list.querySelectorAll('.ps-step').length + 1}</div>
                    <div class="ps-body"><h3 class="ps-title">New Step</h3><p class="ps-desc">Describe this step.</p></div>
                `;
                list.appendChild(step);
                stack.appendChild(createEditor(step, stack.children.length));
                onChange?.();
            };
            container.appendChild(addBtn);

            return container;
        }
    },

    mount: function (element, options) {
        const list = element.querySelector('.ps-list');
        if (!list) return {};

        const layout = options.layout === 'vertical' ? 'vertical' : 'horizontal';
        element.style.setProperty('--ps-accent', options.accentColor || '#3b82f6');

        const steps = Array.from(list.querySelectorAll('.ps-step'));
        // Auto-number by position, so reordering / add / remove stays sequential
        steps.forEach((s, i) => {
            const num = s.querySelector('.ps-num');
            if (num) num.textContent = String(i + 1);
        });

        // Horizontal = one row per step; vertical = stacked (CSS handles display)
        list.style.gridTemplateColumns = layout === 'horizontal' ? `repeat(${steps.length}, 1fr)` : '';

        element.setAttribute('role', 'list');
        if (!element.getAttribute('aria-label')) element.setAttribute('aria-label', 'Process steps');

        return {};
    },

    unmount: function () {}
};
