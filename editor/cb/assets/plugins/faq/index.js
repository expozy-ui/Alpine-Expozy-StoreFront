export default {
    name: 'faq',
    displayName: 'Accordion / FAQ',
    version: '1.1.0',

    settings: {
        allowMultiple: {
            type: 'boolean',
            label: 'Allow Multiple Open',
            default: false
        },
        openFirst: {
            type: 'boolean',
            label: 'Open First Item by Default',
            default: true
        },
        borderRadius: {
            type: 'number',
            label: 'Border Radius',
            default: 10,
            min: 0,
            max: 500,
            unit: 'px',
        }
    },

    editor: {
        openContentEditor: function (element, builder, onChange) {
            const out = (s) => (builder && typeof builder.out === 'function') ? builder.out(s) : s;

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
                        script.onload = () => resolve(window.Sortable);
                        script.onerror = () => {
                            sortablePromise = null; // clear cache to allow retry
                            setTimeout(() => loadSortable(), 1000); // retry once after delay
                            reject(new Error('Failed to load SortableJS'));
                        };
                        document.head.appendChild(script);
                    });

                    return sortablePromise;
                };
            })();

            const container = document.createElement('div');
            container.className = 'cbx-stack';

            const stack = document.createElement('div');
            stack.className = 'cbx-stack';
            container.appendChild(stack);

            // Collapsible item editor: head (drag + title + delete), body (Question field).
            // The answer is a rich-text .edit region, edited inline on the block.
            const createItemEditor = (item, index) => {
                const editor = document.createElement('div');
                editor.className = 'cbx-item';
                editor.dataset.itemId = item.dataset.itemId || `item-${Date.now()}-${index}`;
                item.dataset.itemId = editor.dataset.itemId;

                const head = document.createElement('div');
                head.className = 'cbx-item-head';

                const drag = document.createElement('span');
                drag.className = 'cbx-drag';
                drag.innerHTML = '⠿';
                drag.setAttribute('aria-label', out('Drag to reorder'));

                const title = document.createElement('span');
                title.className = 'cbx-title';
                title.textContent = item.querySelector('.accordion-question')?.textContent || `${out('Question')} ${index + 1}`;

                const del = document.createElement('button');
                del.type = 'button';
                del.className = 'cbx-iconbtn is-danger';
                del.setAttribute('aria-label', out('Delete this FAQ item'));
                del.innerHTML = '<svg aria-hidden="true"><use xlink:href="#icon-trash2"></use></svg>';
                del.onclick = (e) => {
                    e.preventDefault();
                    item.remove();
                    editor.remove();
                    onChange?.();
                };

                head.append(drag, title, del);

                const body = document.createElement('div');
                body.className = 'cbx-item-body';
                body.style.display = 'none';

                const field = document.createElement('div');
                field.className = 'cbx-field';
                const label = document.createElement('label');
                label.textContent = out('Question');
                const input = document.createElement('input');
                input.type = 'text';
                input.placeholder = out('Question');
                input.value = item.querySelector('.accordion-question')?.textContent || '';
                input.setAttribute('aria-label', out('Question text'));
                input.addEventListener('input', () => {
                    const q = item.querySelector('.accordion-question');
                    if (q) q.textContent = input.value;
                    title.textContent = input.value || `${out('Question')} ${index + 1}`;
                    onChange?.();
                });
                field.append(label, input);
                body.appendChild(field);

                head.addEventListener('click', (e) => {
                    if (e.target.closest('.cbx-drag') || e.target.closest('button')) return;
                    body.style.display = body.style.display === 'none' ? '' : 'none';
                });

                editor.append(head, body);
                return editor;
            };

            element.querySelectorAll('.accordion-item').forEach((item, i) => {
                stack.appendChild(createItemEditor(item, i));
            });

            loadSortable().then((Sortable) => {
                new Sortable(stack, {
                    animation: 150,
                    handle: '.cbx-drag',
                    ghostClass: 'cbx-sortable-ghost',
                    onEnd: function () {
                        const itemMap = new Map();
                        element.querySelectorAll('.accordion-item').forEach((item) => {
                            if (item.dataset.itemId) itemMap.set(item.dataset.itemId, item);
                        });
                        Array.from(stack.children).forEach((editorItem) => {
                            const actualItem = itemMap.get(editorItem.dataset.itemId);
                            if (actualItem && actualItem.parentElement === element) element.appendChild(actualItem);
                        });
                        onChange?.();
                    }
                });
            }).catch(() => { /* drag optional */ });

            const addBtn = document.createElement('button');
            addBtn.type = 'button';
            addBtn.textContent = out('+ Add FAQ Item');
            addBtn.setAttribute('aria-label', out('Add new FAQ item'));
            addBtn.onclick = (e) => {
                e.preventDefault();
                const newItem = document.createElement('div');
                newItem.className = 'accordion-item';
                newItem.dataset.itemId = `item-${Date.now()}`;
                newItem.innerHTML = `
                    <div class="accordion-header">
                        <span class="accordion-question edit">New Question</span>
                        <span class="accordion-icon">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                    </div>
                    <div class="accordion-content">
                        <div class="accordion-answer is-subblock edit">
                            <p>Your answer here...</p>
                        </div>
                    </div>
                `;
                element.appendChild(newItem);
                stack.appendChild(createItemEditor(newItem, stack.children.length));
                onChange?.();
            };

            container.appendChild(addBtn);
            return container;
        }
    },

    mount: function (element, options) {
        const allowMultiple = options.allowMultiple === true;
        const openFirst = options.openFirst !== false;

        element.style.setProperty('--border-radius', options.borderRadius + 'px');

        // Generate unique ID for this accordion instance
        const accordionId = `accordion-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        // Open first item by default if option is enabled
        if (openFirst) {
            const firstItem = element.querySelector('.accordion-item');
            if (firstItem) {
                firstItem.classList.add('active');
            }
        }

        // Content height is measured rather than capped. The stylesheet leaves an
        // open item at `max-height: none`, so an answer is never clipped however
        // long it is; these helpers supply the pixel values the transition needs.
        const openContent = (item, content, animate) => {
            if (!animate) {
                content.style.maxHeight = 'none';
                return;
            }
            content.style.maxHeight = content.scrollHeight + 'px';
            content.addEventListener('transitionend', function done(e) {
                if (e.propertyName !== 'max-height') return;
                content.removeEventListener('transitionend', done);
                // Release the cap once open, so the panel keeps fitting content
                // that grows later — inline editing, images, a narrower column.
                if (item.classList.contains('active')) content.style.maxHeight = 'none';
            });
        };

        const closeContent = (content, animate) => {
            if (!animate) {
                content.style.maxHeight = '';
                return;
            }
            // A transition needs a number to start from, so pin the current
            // height and force a reflow before collapsing.
            content.style.maxHeight = content.scrollHeight + 'px';
            void content.offsetHeight;
            content.style.maxHeight = '0px';
        };

        // Add click handlers to accordion items
        const items = element.querySelectorAll('.accordion-item');
        items.forEach((item, index) => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            
            if (header && content) {
                // Generate unique IDs
                const buttonId = `${accordionId}-button-${index}`;
                const panelId = `${accordionId}-panel-${index}`;
                
                // Convert header to button for accessibility
                const button = document.createElement('button');
                button.type = 'button';
                button.id = buttonId;
                button.className = 'accordion-header';
                button.innerHTML = header.innerHTML;
                button.setAttribute('aria-expanded', item.classList.contains('active') ? 'true' : 'false');
                button.setAttribute('aria-controls', panelId);
                
                // Copy styles from original header
                const headerStyles = window.getComputedStyle(header);
                button.style.cssText = header.style.cssText;
                button.style.width = '100%';
                button.style.textAlign = 'left';
                button.style.border = 'none';
                button.style.background = 'none';
                button.style.font = 'inherit';
                button.style.cursor = 'pointer';
                
                // Replace header with button
                header.replaceWith(button);
                
                // Set content attributes
                content.id = panelId;
                content.setAttribute('role', 'region');
                content.setAttribute('aria-labelledby', buttonId);
                content.setAttribute('aria-hidden', item.classList.contains('active') ? 'false' : 'true');

                // Items open on load (openFirst) start at full height, unanimated
                if (item.classList.contains('active')) openContent(item, content, false);

                // Add click handler
                button.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');

                    // If not allowing multiple, close all other items
                    if (!allowMultiple && !isActive) {
                        items.forEach(otherItem => {
                            if (otherItem !== item) {
                                otherItem.classList.remove('active');
                                const otherButton = otherItem.querySelector('.accordion-header');
                                const otherContent = otherItem.querySelector('.accordion-content');
                                if (otherButton) {
                                    otherButton.setAttribute('aria-expanded', 'false');
                                }
                                if (otherContent) {
                                    otherContent.setAttribute('aria-hidden', 'true');
                                    closeContent(otherContent, true);
                                }
                            }
                        });
                    }

                    // Toggle current item
                    item.classList.toggle('active');
                    const nowActive = item.classList.contains('active');
                    button.setAttribute('aria-expanded', nowActive ? 'true' : 'false');
                    content.setAttribute('aria-hidden', nowActive ? 'false' : 'true');
                    if (nowActive) openContent(item, content, true);
                    else closeContent(content, true);
                });
                
                // Keyboard navigation
                button.addEventListener('keydown', (e) => {
                    const currentIndex = Array.from(items).indexOf(item);
                    let targetIndex = -1;
                    
                    switch(e.key) {
                        case 'ArrowDown':
                            e.preventDefault();
                            targetIndex = (currentIndex + 1) % items.length;
                            break;
                        case 'ArrowUp':
                            e.preventDefault();
                            targetIndex = (currentIndex - 1 + items.length) % items.length;
                            break;
                        case 'Home':
                            e.preventDefault();
                            targetIndex = 0;
                            break;
                        case 'End':
                            e.preventDefault();
                            targetIndex = items.length - 1;
                            break;
                    }
                    
                    if (targetIndex >= 0) {
                        const targetButton = items[targetIndex].querySelector('.accordion-header');
                        if (targetButton) {
                            targetButton.focus();
                        }
                    }
                });
            }
        });

        return {};
    }
};