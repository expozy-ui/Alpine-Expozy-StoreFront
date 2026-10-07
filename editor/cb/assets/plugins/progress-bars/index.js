/*
Progress / Skill Bars plugin for ContentBuilder / ContentBox

A list of labelled bars with a percentage each; the fill animates in when the
block scrolls into view. Content lives in the HTML (SEO/a11y); mount() only
applies the accent, wires the scroll animation, and keeps ARIA in sync.

Usage (embed this HTML into your content):

<div data-cb-type="progress-bars" data-cb-accent-color="#3b82f6" data-cb-show-percent="true" data-cb-animate="true" data-cb-size="medium" data-cb-rounded="true" role="group" aria-label="Skills">
    <div class="pb-list">
        <div class="pb-item">
            <div class="pb-head"><span class="pb-label">HTML &amp; CSS</span><span class="pb-percent">90%</span></div>
            <div class="pb-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="90">
                <div class="pb-fill" data-value="90" style="width:90%"></div>
            </div>
        </div>
        <div class="pb-item">
            <div class="pb-head"><span class="pb-label">JavaScript</span><span class="pb-percent">80%</span></div>
            <div class="pb-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="80">
                <div class="pb-fill" data-value="80" style="width:80%"></div>
            </div>
        </div>
        <div class="pb-item">
            <div class="pb-head"><span class="pb-label">Design</span><span class="pb-percent">70%</span></div>
            <div class="pb-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="70">
                <div class="pb-fill" data-value="70" style="width:70%"></div>
            </div>
        </div>
    </div>
</div>
*/

export default {
    name: 'progress-bars',
    displayName: 'Progress / Skill Bars',
    version: '1.0.0',

    settings: {
        _groups: [
            { id: 'layout', label: 'Layout', fields: ['size'] },
            { id: 'display', label: 'Display', fields: ['showPercent', 'animate'] },
            { id: 'appearance', label: 'Appearance', fields: ['accentColor', 'rounded'] }
        ],
        size: {
            type: 'select',
            label: 'Bar Height',
            default: 'medium',
            options: [
                { value: 'small', label: 'Small' },
                { value: 'medium', label: 'Medium' },
                { value: 'large', label: 'Large' }
            ],
            group: 'layout'
        },
        showPercent: { type: 'boolean', label: 'Show Percentage', default: true, group: 'display' },
        animate: { type: 'boolean', label: 'Animate on View', default: true, group: 'display' },
        accentColor: { type: 'color', label: 'Accent Color', default: '#3b82f6', group: 'appearance' },
        rounded: { type: 'boolean', label: 'Rounded Ends', default: true, group: 'appearance' }
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

            const list = element.querySelector('.pb-list');
            if (!list) return container;

            const stack = document.createElement('div');
            stack.className = 'cbx-stack';
            container.appendChild(stack);

            const clamp = (n) => Math.max(0, Math.min(100, parseInt(n) || 0));

            const createEditor = (bar, index) => {
                const item = document.createElement('div');
                item.className = 'cbx-item';
                item.dataset.barId = bar.dataset.barId || `b-${Date.now()}-${index}`;
                bar.dataset.barId = item.dataset.barId;

                const head = document.createElement('div');
                head.className = 'cbx-item-head';
                const drag = document.createElement('span');
                drag.className = 'cbx-drag';
                drag.innerHTML = '⠿';
                const title = document.createElement('span');
                title.className = 'cbx-title';
                title.textContent = bar.querySelector('.pb-label')?.textContent || `${out('Bar')} ${index + 1}`;
                const del = document.createElement('button');
                del.type = 'button';
                del.className = 'cbx-iconbtn is-danger';
                del.setAttribute('aria-label', out('Delete bar'));
                del.innerHTML = '<svg><use xlink:href="#icon-trash2"></use></svg>';
                del.onclick = (e) => { e.preventDefault(); bar.remove(); item.remove(); onChange?.(); };
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

                // Label
                const labelIn = document.createElement('input');
                labelIn.type = 'text';
                labelIn.value = bar.querySelector('.pb-label')?.textContent || '';
                labelIn.placeholder = out('Label');
                labelIn.addEventListener('input', () => {
                    const el = bar.querySelector('.pb-label');
                    if (el) el.textContent = labelIn.value;
                    title.textContent = labelIn.value || `${out('Bar')} ${index + 1}`;
                    onChange?.();
                });
                addField(out('Label'), labelIn);

                // Percentage
                const pctIn = document.createElement('input');
                pctIn.type = 'number';
                pctIn.min = 0;
                pctIn.max = 100;
                pctIn.value = bar.querySelector('.pb-fill')?.dataset.value || '0';
                pctIn.addEventListener('input', () => {
                    const v = clamp(pctIn.value);
                    const fill = bar.querySelector('.pb-fill');
                    const track = bar.querySelector('.pb-track');
                    const pctEl = bar.querySelector('.pb-percent');
                    if (fill) { fill.dataset.value = String(v); fill.style.width = v + '%'; }
                    if (track) track.setAttribute('aria-valuenow', String(v));
                    if (pctEl) pctEl.textContent = v + '%';
                    onChange?.();
                });
                addField(out('Percentage'), pctIn);

                head.addEventListener('click', (e) => {
                    if (e.target.closest('.cbx-drag') || e.target.closest('button')) return;
                    body.style.display = body.style.display === 'none' ? '' : 'none';
                });

                item.append(head, body);
                return item;
            };

            list.querySelectorAll('.pb-item').forEach((bar, i) => stack.appendChild(createEditor(bar, i)));

            loadSortable().then((Sortable) => {
                new Sortable(stack, {
                    animation: 150,
                    handle: '.cbx-drag',
                    ghostClass: 'cbx-sortable-ghost',
                    onEnd: function () {
                        const map = new Map();
                        list.querySelectorAll('.pb-item').forEach((b) => { if (b.dataset.barId) map.set(b.dataset.barId, b); });
                        Array.from(stack.children).forEach((ed) => { const b = map.get(ed.dataset.barId); if (b) list.appendChild(b); });
                        onChange?.();
                    }
                });
            }).catch(() => { /* drag optional */ });

            const addBtn = document.createElement('button');
            addBtn.type = 'button';
            addBtn.textContent = out('+ Add Bar');
            addBtn.onclick = (e) => {
                e.preventDefault();
                const bar = document.createElement('div');
                bar.className = 'pb-item';
                bar.dataset.barId = `b-${Date.now()}`;
                bar.innerHTML = `
                    <div class="pb-head"><span class="pb-label">New Skill</span><span class="pb-percent">50%</span></div>
                    <div class="pb-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50">
                        <div class="pb-fill" data-value="50" style="width:50%"></div>
                    </div>
                `;
                list.appendChild(bar);
                stack.appendChild(createEditor(bar, stack.children.length));
                onChange?.();
            };
            container.appendChild(addBtn);

            return container;
        }
    },

    mount: function (element, options) {
        const opts = {
            accentColor: options.accentColor || '#3b82f6',
            animate: options.animate === true || options.animate === 'true'
        };

        const list = element.querySelector('.pb-list');
        if (!list) return {};

        element.style.setProperty('--pb-accent', opts.accentColor);

        const fills = Array.from(element.querySelectorAll('.pb-fill'));
        // Keep ARIA + label in sync (editor may have changed values)
        element.querySelectorAll('.pb-item').forEach((item) => {
            const fill = item.querySelector('.pb-fill');
            const track = item.querySelector('.pb-track');
            if (fill && track) track.setAttribute('aria-valuenow', fill.dataset.value || '0');
        });

        const setFinal = () => fills.forEach((f) => { f.style.width = (parseFloat(f.dataset.value) || 0) + '%'; });

        let io = null;
        if (opts.animate && 'IntersectionObserver' in window) {
            fills.forEach((f) => { f.style.width = '0%'; });
            io = new IntersectionObserver((entries, obs) => {
                entries.forEach((en) => {
                    if (en.isIntersecting) { setFinal(); obs.disconnect(); io = null; }
                });
            }, { threshold: 0.25 });
            io.observe(element);
        } else {
            setFinal();
        }

        return {
            destroy() { if (io) io.disconnect(); }
        };
    },

    unmount: function (element, instance) {
        if (instance && instance.destroy) instance.destroy();
    }
};
