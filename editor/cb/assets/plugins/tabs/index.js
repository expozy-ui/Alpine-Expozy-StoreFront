/*
Tabs plugin for ContentBuilder / ContentBox

Tabbed panels with rich, inline-editable content per tab (.is-subblock edit) and
a custom editor to add / remove / reorder / rename tabs. The content lives in the
HTML (SEO); mount() wires the ARIA tab pattern, active state, and keyboard nav.
Because the builder re-mounts the plugin after every editor change, the editor
only manipulates structure — mount re-wires behavior each time.

Usage (embed this HTML into your content):

<div data-cb-type="tabs" data-cb-accent-color="#3b82f6" data-cb-tab-align="start" role="region" aria-label="Tabbed content">
    <div class="tabs-nav" role="tablist" aria-label="Tabs">
        <button class="tabs-tab is-active" type="button" role="tab">Overview</button>
        <button class="tabs-tab" type="button" role="tab">Features</button>
        <button class="tabs-tab" type="button" role="tab">Pricing</button>
    </div>
    <div class="tabs-panels">
        <div class="tabs-panel is-active" role="tabpanel">
            <div class="is-subblock edit"><h3>Overview</h3><p>Write the overview here. This content is editable directly on the page.</p></div>
        </div>
        <div class="tabs-panel" role="tabpanel">
            <div class="is-subblock edit"><h3>Features</h3><p>List your features here.</p></div>
        </div>
        <div class="tabs-panel" role="tabpanel">
            <div class="is-subblock edit"><h3>Pricing</h3><p>Describe your pricing here.</p></div>
        </div>
    </div>
</div>
*/

export default {
    name: 'tabs',
    displayName: 'Tabs',
    version: '1.0.0',

    settings: {
        _groups: [
            { id: 'layout', label: 'Layout', fields: ['tabAlign'] },
            { id: 'appearance', label: 'Appearance', fields: ['accentColor'] }
        ],
        tabAlign: {
            type: 'select',
            label: 'Tab Alignment',
            default: 'start',
            options: [
                { value: 'start', label: 'Left' },
                { value: 'center', label: 'Center' },
                { value: 'end', label: 'Right' },
                { value: 'stretch', label: 'Full width' }
            ],
            group: 'layout'
        },
        accentColor: { type: 'color', label: 'Accent Color', default: '#3b82f6', group: 'appearance' }
    },

    editor: {
        openContentEditor: function (element, builder, onChange) {
            // Translate editor-UI labels via the builder's language file (out()).
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

            const nav = element.querySelector('.tabs-nav');
            const panelsWrap = element.querySelector('.tabs-panels');
            if (!nav || !panelsWrap) return container;

            const stack = document.createElement('div');
            stack.className = 'cbx-stack';
            container.appendChild(stack);

            const createTabEditor = (tab, panel, index) => {
                const item = document.createElement('div');
                item.className = 'cbx-item';
                const tabId = tab.dataset.tabId || `tab-${Date.now()}-${index}`;
                item.dataset.tabId = tabId;
                tab.dataset.tabId = tabId;
                if (panel) panel.dataset.tabId = tabId;

                const head = document.createElement('div');
                head.className = 'cbx-item-head';
                const drag = document.createElement('span');
                drag.className = 'cbx-drag';
                drag.innerHTML = '⠿';
                const title = document.createElement('span');
                title.className = 'cbx-title';
                title.textContent = tab.textContent.trim() || `Tab ${index + 1}`;
                const del = document.createElement('button');
                del.type = 'button';
                del.className = 'cbx-iconbtn is-danger';
                del.setAttribute('aria-label', out('Delete tab'));
                del.innerHTML = '<svg><use xlink:href="#icon-trash2"></use></svg>';
                del.onclick = (e) => {
                    e.preventDefault();
                    tab.remove();
                    if (panel) panel.remove();
                    item.remove();
                    onChange?.();
                };
                head.append(drag, title, del);

                const body = document.createElement('div');
                body.className = 'cbx-item-body';
                body.style.display = 'none';

                const field = document.createElement('div');
                field.className = 'cbx-field';
                const label = document.createElement('label');
                label.textContent = out('Tab Label');
                const input = document.createElement('input');
                input.type = 'text';
                input.value = tab.textContent.trim();
                input.placeholder = out('Tab label');
                input.addEventListener('input', () => {
                    tab.textContent = input.value;
                    tab.dataset.tabId = tabId; // textContent reset clears nothing else, keep id
                    title.textContent = input.value || `Tab ${index + 1}`;
                    onChange?.();
                });
                field.append(label, input);
                body.appendChild(field);

                // Muted hint (a <div> avoids the default <p> margin that would
                // double against the body stack's gap; color/size aren't spacing).
                const hint = document.createElement('div');
                hint.textContent = out('Edit each tab’s content directly on the page.');
                hint.style.fontSize = '12px';
                hint.style.color = '#6b7280';
                body.appendChild(hint);

                head.addEventListener('click', (e) => {
                    if (e.target.closest('.cbx-drag') || e.target.closest('button')) return;
                    body.style.display = body.style.display === 'none' ? '' : 'none';
                });

                item.append(head, body);
                return item;
            };

            const tabs = Array.from(nav.querySelectorAll('.tabs-tab'));
            const panels = Array.from(panelsWrap.querySelectorAll('.tabs-panel'));
            tabs.forEach((tab, i) => stack.appendChild(createTabEditor(tab, panels[i], i)));

            loadSortable().then((Sortable) => {
                new Sortable(stack, {
                    animation: 150,
                    handle: '.cbx-drag',
                    ghostClass: 'cbx-sortable-ghost',
                    onEnd: function () {
                        // Reorder both the tab buttons and their panels to match the editor order
                        const tabMap = new Map();
                        const panelMap = new Map();
                        nav.querySelectorAll('.tabs-tab').forEach((t) => { if (t.dataset.tabId) tabMap.set(t.dataset.tabId, t); });
                        panelsWrap.querySelectorAll('.tabs-panel').forEach((p) => { if (p.dataset.tabId) panelMap.set(p.dataset.tabId, p); });
                        Array.from(stack.children).forEach((ed) => {
                            const id = ed.dataset.tabId;
                            const t = tabMap.get(id);
                            const p = panelMap.get(id);
                            if (t) nav.appendChild(t);
                            if (p) panelsWrap.appendChild(p);
                        });
                        onChange?.();
                    }
                });
            }).catch(() => { /* drag optional */ });

            const addBtn = document.createElement('button');
            addBtn.type = 'button';
            addBtn.textContent = out('+ Add Tab');
            addBtn.onclick = (e) => {
                e.preventDefault();
                const id = `tab-${Date.now()}`;
                const tab = document.createElement('button');
                tab.className = 'tabs-tab';
                tab.type = 'button';
                tab.setAttribute('role', 'tab');
                tab.dataset.tabId = id;
                tab.textContent = 'New Tab';

                const panel = document.createElement('div');
                panel.className = 'tabs-panel';
                panel.setAttribute('role', 'tabpanel');
                panel.dataset.tabId = id;
                panel.innerHTML = '<div class="is-subblock edit"><p>New tab content.</p></div>';

                nav.appendChild(tab);
                panelsWrap.appendChild(panel);
                
                stack.appendChild(createTabEditor(tab, panel, stack.children.length));
                onChange?.();
            };
            container.appendChild(addBtn);

            return container;
        }
    },

    mount: function (element, options) {
        const nav = element.querySelector('.tabs-nav');
        const panelsWrap = element.querySelector('.tabs-panels');
        if (!nav || !panelsWrap) return {};

        const tabs = Array.from(nav.querySelectorAll('.tabs-tab'));
        const panels = Array.from(panelsWrap.querySelectorAll('.tabs-panel'));
        if (tabs.length === 0) return {};

        element.style.setProperty('--tabs-accent', options.accentColor || '#3b82f6');
        nav.style.justifyContent = { center: 'center', end: 'flex-end' }[options.tabAlign] || 'flex-start';
        nav.classList.toggle('is-stretch', options.tabAlign === 'stretch');

        element.setAttribute('role', element.getAttribute('role') || 'region');
        if (!element.getAttribute('aria-label')) element.setAttribute('aria-label', 'Tabbed content');
        nav.setAttribute('role', 'tablist');

        const uid = Math.random().toString(36).slice(2, 8);

        // Preserve active tab across re-mounts: use the existing .is-active, else 0
        let active = tabs.findIndex((t) => t.classList.contains('is-active'));
        if (active < 0) active = parseInt(options.active) || 0;
        if (active >= tabs.length) active = 0;

        // Wire ARIA relationships
        tabs.forEach((tab, i) => {
            tab.setAttribute('role', 'tab');
            tab.type = 'button';
            const tabId = `tab-${uid}-${i}`;
            const panelId = `panel-${uid}-${i}`;
            tab.id = tabId;
            const panel = panels[i];
            if (panel) {
                panel.setAttribute('role', 'tabpanel');
                panel.id = panelId;
                panel.setAttribute('aria-labelledby', tabId);
                panel.setAttribute('tabindex', '0');
                tab.setAttribute('aria-controls', panelId);
            }
        });

        const activate = (i) => {
            tabs.forEach((tab, idx) => {
                const on = idx === i;
                tab.classList.toggle('is-active', on);
                tab.setAttribute('aria-selected', on ? 'true' : 'false');
                tab.setAttribute('tabindex', on ? '0' : '-1');
            });
            panels.forEach((panel, idx) => panel.classList.toggle('is-active', idx === i));
            active = i;
        };

        activate(active);

        const onClick = (e) => {
            const tab = e.target.closest('.tabs-tab');
            if (!tab || !nav.contains(tab)) return;
            const i = tabs.indexOf(tab);
            if (i >= 0) activate(i);
        };
        const onKey = (e) => {
            const i = tabs.indexOf(document.activeElement);
            if (i < 0) return;
            let next = null;
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % tabs.length;
            else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + tabs.length) % tabs.length;
            else if (e.key === 'Home') next = 0;
            else if (e.key === 'End') next = tabs.length - 1;
            if (next !== null) {
                e.preventDefault();
                tabs[next].focus();
                activate(next);
            }
        };
        nav.addEventListener('click', onClick);
        nav.addEventListener('keydown', onKey);

        return {
            destroy() {
                nav.removeEventListener('click', onClick);
                nav.removeEventListener('keydown', onKey);
            }
        };
    },

    unmount: function (element, instance) {
        if (instance && instance.destroy) instance.destroy();
    }
};
