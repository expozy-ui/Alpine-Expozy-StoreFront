export default {
    name: 'timeline',
    displayName: 'Interactive Timeline',
    version: '1.0.0',

    settings: {
        _groups: [
            {
                id: 'layout',
                label: 'Layout',
                fields: ['orientation', 'animate']
            },
            {
                id: 'appearance',
                label: 'Appearance',
                fields: ['accentColor', 'borderColor', 'rounded', 'hover', 'lineWidth', 'dotSize']
            }
        ],

        orientation: {
            type: 'select',
            label: 'Orientation',
            default: 'vertical',
            options: [
                { value: 'vertical', label: 'Vertical' },
                { value: 'horizontal', label: 'Horizontal' }
            ],
            group: 'layout'
        },
        animate: {
            type: 'boolean',
            label: 'Animate on Scroll',
            default: true,
            group: 'layout'
        },
        accentColor: {
            type: 'color',
            label: 'Accent Color',
            default: '#3b82f6',
            group: 'appearance'
        },
        borderColor: {
            type: 'color',
            label: 'Border Color',
            default: '#e5e7eb',
            group: 'appearance'
        },
        rounded: {
            type: 'boolean',
            label: 'Rounded Corners',
            default: true,
            group: 'appearance'
        },
        hover: {
            type: 'select',
            label: 'Hover Effect',
            default: 'lift',
            options: [
                { value: 'none', label: 'None' },
                { value: 'lift', label: 'Lift' },
                { value: 'lift-shadow', label: 'Lift + Shadow' }
            ],
            group: 'appearance'
        },
        lineWidth: {
            type: 'number',
            label: 'Line Width',
            default: 2,
            min: 1,
            max: 6,
            step: 1,
            unit: 'px',
            group: 'appearance'
        },
        dotSize: {
            type: 'number',
            label: 'Dot Size',
            default: 12,
            min: 8,
            max: 24,
            step: 2,
            unit: 'px',
            group: 'appearance'
        }
    },

    editor: {
        openContentEditor: function (element, builder, onChange) {
            const out = (s) => (builder && typeof builder.out === 'function') ? builder.out(s) : s;

            const container = document.createElement('div');
            container.className = 'cbx-stack';

            const stack = document.createElement('div');
            stack.className = 'cbx-stack';
            container.appendChild(stack);

            const items = element.querySelectorAll('.timeline-item');

            // labelled field (label + control)
            const makeField = (labelText, control) => {
                const f = document.createElement('div');
                f.className = 'cbx-field';
                const l = document.createElement('label');
                l.textContent = labelText;
                f.append(l, control);
                return f;
            };

            const createItemEditor = (item, index) => {
                item.dataset.itemId = item.dataset.itemId || `item-${Date.now()}-${index}`;

                const section = document.createElement('div');
                section.className = 'cbx-item';
                section.dataset.itemId = item.dataset.itemId;

                const title = item.querySelector('.timeline-title')?.textContent || `${out('Event')} ${index + 1}`;
                const date = item.querySelector('.timeline-date')?.textContent || '';

                // ── Head: drag + title + delete ──
                const head = document.createElement('div');
                head.className = 'cbx-item-head';

                const drag = document.createElement('span');
                drag.className = 'cbx-drag';
                drag.innerHTML = '⠿';
                drag.setAttribute('aria-label', out('Drag to reorder'));

                const titleText = document.createElement('span');
                titleText.className = 'cbx-title';
                const composeTitle = (t, d) => d ? `${t || out('Untitled Event')} — ${d}` : (t || out('Untitled Event'));
                titleText.textContent = composeTitle(title, date);

                const deleteBtn = document.createElement('button');
                deleteBtn.type = 'button';
                deleteBtn.className = 'cbx-iconbtn is-danger';
                deleteBtn.setAttribute('aria-label', out('Delete item'));
                deleteBtn.innerHTML = '<svg aria-hidden="true"><use xlink:href="#icon-trash2"></use></svg>';
                deleteBtn.onclick = (e) => { e.preventDefault(); item.remove(); section.remove(); onChange?.(); };

                head.append(drag, titleText, deleteBtn);

                // ── Body ──
                const body = document.createElement('div');
                body.className = 'cbx-item-body';
                body.style.display = 'none';

                // Date
                const dateInput = document.createElement('input');
                dateInput.type = 'text';
                dateInput.placeholder = out('e.g. Q1 2024, Jan 2024');
                dateInput.value = date;
                dateInput.addEventListener('input', () => {
                    const dateEl = item.querySelector('.timeline-date');
                    if (dateEl) dateEl.textContent = dateInput.value;
                    titleText.textContent = composeTitle(titleInput.value, dateInput.value);
                    onChange?.();
                });

                // Title
                const titleInput = document.createElement('input');
                titleInput.type = 'text';
                titleInput.placeholder = out('Title');
                titleInput.value = title;
                titleInput.addEventListener('input', () => {
                    const titleEl = item.querySelector('.timeline-title');
                    if (titleEl) titleEl.textContent = titleInput.value;
                    titleText.textContent = composeTitle(titleInput.value, dateInput.value);
                    onChange?.();
                });

                // Description
                const descInput = document.createElement('textarea');
                descInput.placeholder = out('Description');
                descInput.value = item.querySelector('.timeline-desc')?.textContent || '';
                descInput.rows = 4;
                let descTimer;
                descInput.addEventListener('input', () => {
                    clearTimeout(descTimer);
                    descTimer = setTimeout(() => {
                        const descEl = item.querySelector('.timeline-desc');
                        if (descEl) descEl.textContent = descInput.value;
                        onChange?.();
                    }, 400);
                });

                // Status
                const statusSelect = document.createElement('select');
                const statuses = [
                    { value: 'completed', label: `✓ ${out('Completed')}` },
                    { value: 'current', label: `→ ${out('Current')}` },
                    { value: 'upcoming', label: `○ ${out('Upcoming')}` }
                ];
                statuses.forEach(status => {
                    const option = document.createElement('option');
                    option.value = status.value;
                    option.textContent = status.label;
                    statusSelect.appendChild(option);
                });
                statusSelect.value = item.dataset.status || 'upcoming';
                statusSelect.addEventListener('change', () => {
                    item.dataset.status = statusSelect.value;
                    onChange?.();
                });

                body.append(
                    makeField(out('Date'), dateInput),
                    makeField(out('Title'), titleInput),
                    makeField(out('Description'), descInput),
                    makeField(out('Status'), statusSelect)
                );

                // Toggle body open/closed on head click
                head.addEventListener('click', (e) => {
                    if (e.target.closest('.cbx-drag') || e.target.closest('button')) return;
                    body.style.display = body.style.display === 'none' ? '' : 'none';
                });

                section.append(head, body);
                return section;
            };

            items.forEach((item, i) => stack.appendChild(createItemEditor(item, i)));

            const loadSortable = (() => {
                let sortablePromise = null;

                return () => {
                    if (window.Sortable) return Promise.resolve(window.Sortable);
                    if (sortablePromise) return sortablePromise; // already loading

                    sortablePromise = new Promise((resolve, reject) => {
                        // Check if a <script> already exists (maybe partially loaded)
                        const existing = document.querySelector('script[data-sortable-loader]');
                        if (existing) {
                            existing.addEventListener('load', () => resolve(window.Sortable));
                            existing.addEventListener('error', () => reject(new Error('SortableJS failed')));
                            return;
                        }

                        const script = document.createElement('script');
                        script.src = 'https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js';
                        script.dataset.sortableLoader = 'true';
                        script.onload = () => {
                            resolve(window.Sortable);
                        };
                        script.onerror = () => {
                            // console.warn('SortableJS failed to load, retrying in 1s...');
                            sortablePromise = null; // clear cache to allow retry
                            setTimeout(() => loadSortable(), 1000); // retry once after delay
                            reject(new Error('Failed to load SortableJS'));
                        };
                        document.head.appendChild(script);
                    });

                    return sortablePromise;
                };
            })();

            loadSortable().then((Sortable) => {
                new Sortable(stack, {
                    animation: 150,
                    handle: '.cbx-drag',
                    ghostClass: 'cbx-sortable-ghost',
                    onEnd: function() {
                        // .timeline-item lives inside an inner wrapper div (element.children[0])
                        const wrapper = element.children[0];
                        if (!wrapper) return;
                        const itemMap = new Map();
                        Array.from(wrapper.children).forEach(item => {
                            if (item.dataset.itemId) itemMap.set(item.dataset.itemId, item);
                        });
                        Array.from(stack.children).forEach(editorItem => {
                            const actualItem = itemMap.get(editorItem.dataset.itemId);
                            if (actualItem && actualItem.parentElement === wrapper) {
                                wrapper.appendChild(actualItem);
                            }
                        });
                        onChange?.();
                    }
                });
            }).catch(() => { /* drag optional */ });

            // Add Item button
            const addBtn = document.createElement('button');
            addBtn.type = 'button';
            addBtn.textContent = out('+ Add Timeline Item');
            addBtn.onclick = (e) => {
                e.preventDefault();
                const newItem = document.createElement('div');
                newItem.className = 'timeline-item';
                newItem.dataset.itemId = `item-${Date.now()}`;
                newItem.dataset.status = 'upcoming';
                newItem.innerHTML = `
                    <div class="timeline-marker" aria-hidden="true"></div>
                    <div class="timeline-content">
                        <span class="timeline-date">TBD</span>
                        <h3 class="timeline-title">New Event</h3>
                        <p class="timeline-desc">Add description here</p>
                    </div>
                `;

                // Append into the inner wrapper div (create it if missing)
                const wrapper = element.firstElementChild;
                if (wrapper && wrapper.tagName === 'DIV') {
                    wrapper.appendChild(newItem);
                } else {
                    const newWrapper = document.createElement('div');
                    element.appendChild(newWrapper);
                    newWrapper.appendChild(newItem);
                }

                stack.appendChild(createItemEditor(newItem, stack.children.length));
                onChange?.();
            };
            container.appendChild(addBtn);

            return container;
        }
    },

    mount: function (element, options) {
        const orientation = options.orientation || 'vertical';
        const animate = options.animate !== false;
        const accentColor = options.accentColor || '#3b82f6';
        const lineWidth = options.lineWidth || 2;
        const dotSize = options.dotSize || 12;

        // Set CSS variables
        element.style.setProperty('--timeline-accent', accentColor);
        // Card border color. Empty falls back to the stylesheet default so older
        // embeds without it are unchanged; the setting default matches that default
        // so the picker shows the true rendered color. (Rounded Corners is a boolean
        // handled in CSS off the data-cb-rounded attribute.)
        element.style.setProperty('--timeline-border', options.borderColor || '');
        element.style.setProperty('--timeline-line-width', `${lineWidth}px`);
        element.style.setProperty('--timeline-dot-size', `${dotSize}px`);

        // Set orientation class
        element.classList.remove('timeline-vertical', 'timeline-horizontal');
        element.classList.add(`timeline-${orientation}`);

        // Intersection Observer for animations
        if (animate && 'IntersectionObserver' in window) {
            const items = element.querySelectorAll('.timeline-item');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('timeline-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.2,
                rootMargin: '0px 0px -50px 0px'
            });

            items.forEach(item => {
                item.classList.add('timeline-animated');
                observer.observe(item);
            });

            return {
                unmount: () => observer.disconnect()
            };
        }

        return {};
    }
};